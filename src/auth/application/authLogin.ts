import type { GitHubAuthLoginParams, GoogleAuthLoginParams, IAuth } from '../domain/IAuth'
import { GitHub, Google, generateCodeVerifier, generateState } from 'arctic'

export class AuthLoginUser {
  private github: GitHub
  private google: Google

  constructor(private authRepository: IAuth) {
    this.github = new GitHub(process.env.GITHUB_CLIENT_ID ?? '', process.env.GITHUB_CLIENT_SECRET ?? '')
    this.google = new Google(
      process.env.GOOGLE_CLIENT_ID ?? '',
      process.env.GOOGLE_CLIENT_SECRET ?? '',
      process.env.GOOGLE_REDIRECT_URI ?? ''
    )
  }

  async runGitHub({ redirect, cookie }: GitHubAuthLoginParams) {
    const state = generateState()
    const url = await this.github.createAuthorizationURL(state)

    await this.authRepository.saveAuthState(state)

    cookie.github_oauth_state.value = state

    return redirect(url.toString())
  }

  async runGoogle({ redirect, cookie }: GoogleAuthLoginParams) {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    const url = await this.google.createAuthorizationURL(state, codeVerifier, {
      scopes: ['profile', 'email'],
    })

    await this.authRepository.saveAuthState(state)

    cookie.google_oauth_state.value = state
    cookie.google_oauth_code_verifier.value = codeVerifier

    console.log(url.toString())

    return redirect(url.toString())
  }
}
