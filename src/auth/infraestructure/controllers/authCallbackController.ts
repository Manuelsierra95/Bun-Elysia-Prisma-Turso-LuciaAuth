import { AuthCallbackUser } from '../../application/authCallback'
import type { GitHubAuthCallbackParams, GoogleAuthCallbackParams } from '../../domain/IAuth'

export class AuthCallbackController {
  constructor(private authCallbackUser: AuthCallbackUser) {}

  async runGitHub({ query, cookie, redirect }: GitHubAuthCallbackParams) {
    try {
      const result = await this.authCallbackUser.runGitHub({ query, cookie, redirect })
      return result
    } catch (error) {
      const err = error as Error
      return {
        code: 400,
        message: err.message,
      }
    }
  }

  async runGoogle({ query, cookie, redirect }: GoogleAuthCallbackParams) {
    try {
      const result = await this.authCallbackUser.runGoogle({ query, cookie, redirect })
      return result
    } catch (error) {
      const err = error as Error
      return {
        code: 400,
        message: err.message,
      }
    }
  }
}
