import type { GitHubAuthCallbackParams, GoogleAuthCallbackParams, IAuth } from '../domain/IAuth'
import { GitHub, Google } from 'arctic'

export class AuthCallbackUser {
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

  async runGitHub({ query, cookie, redirect }: GitHubAuthCallbackParams) {
    const code = query.code?.toString() ?? null
    const state = query.state?.toString() ?? null
    const storedState = cookie.github_oauth_state?.value ?? null

    if (!code || !state || !storedState || state !== storedState) {
      return {
        status: 400,
        body: 'Invalid state or code.',
      }
    }

    try {
      const tokens = await this.github.validateAuthorizationCode(code)
      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      })

      if (!githubUserResponse.ok) {
        throw new Error('Failed to fetch user data from GitHub.')
      }

      const githubUser = await githubUserResponse.json()

      let user = await this.authRepository.findUserByEmail(githubUser.email)
      if (!user) {
        user = await this.authRepository.createUser(githubUser.email)
      }

      const sessionId = await this.authRepository.createSession(user.id)

      cookie.user_session = {
        value: {
          id: githubUser.id,
          name: githubUser.email,
          sessionId,
        },
      }

      return redirect('http://localhost:4321/landing')
    } catch (error) {
      return {
        status: 500,
        body: 'Error during authentication.',
      }
    }
  }

  async runGoogle({ query, cookie, redirect }: GoogleAuthCallbackParams) {
    const code = query.code?.toString() ?? null
    const state = query.state?.toString() ?? null
    const storedState = cookie.google_oauth_state?.value ?? null
    const storedCodeVerifier = cookie.google_oauth_code_verifier?.value ?? null

    if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
      return {
        status: 400,
        body: 'Invalid state or code.',
      }
    }

    try {
      const tokens = await this.google.validateAuthorizationCode(code, storedCodeVerifier)
      const googleUserResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      })

      if (!googleUserResponse.ok) {
        throw new Error('Failed to fetch user data from Google.')
      }

      const googleUser = await googleUserResponse.json()

      let user = await this.authRepository.findUserByEmail(googleUser.email)
      if (!user) {
        user = await this.authRepository.createUser(googleUser.email)
      }

      const sessionId = await this.authRepository.createSession(user.id)

      cookie.user_session = {
        value: {
          id: googleUser.id,
          name: googleUser.email,
          sessionId,
        },
      }
      return redirect('http://localhost:4321/landing')
    } catch (error) {
      return {
        status: 500,
        body: 'Error during authentication.',
      }
    }
  }
}
