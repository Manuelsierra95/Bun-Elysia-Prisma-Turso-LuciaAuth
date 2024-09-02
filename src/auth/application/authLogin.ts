import type { AuthLoginParams, IAuth } from '../domain/IAuth'
import { GitHub, generateState } from 'arctic'

export class AuthLoginUser {
  private github: GitHub

  constructor(private authRepository: IAuth) {
    this.github = new GitHub(
      process.env.GITHUB_CLIENT_ID ?? '',
      process.env.GITHUB_CLIENT_SECRET ?? ''
    )
  }

  async run({ redirect, cookie }: AuthLoginParams) {
    const state = generateState()
    const url = await this.github.createAuthorizationURL(state)

    await this.authRepository.saveAuthState(state)

    cookie.github_oauth_state.value = state

    return redirect(url.toString())
  }
}
