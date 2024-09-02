import type { AuthCallbackParams, IAuth } from '../domain/IAuth'
import { GitHub } from 'arctic'

export class AuthCallbackUser {
  private github: GitHub

  constructor(private authRepository: IAuth) {
    this.github = new GitHub(
      process.env.GITHUB_CLIENT_ID ?? '',
      process.env.GITHUB_CLIENT_SECRET ?? ''
    )
  }

  async run({ query, cookie, redirect }: AuthCallbackParams) {
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

      const user = await this.authRepository.findUserByEmail(githubUser.email)
      if (!user) {
        await this.authRepository.createUser(githubUser.email, githubUser.id)
      }

      if (user) {
        const sessionId = await this.authRepository.createSession(user.id)

        cookie.user_session = {
          value: {
            id: githubUser.id,
            name: githubUser.email,
            sessionId,
          },
        }
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
