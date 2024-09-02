import { AuthLoginUser } from '../../application/authLogin'
import type { GitHubAuthLoginParams, GoogleAuthLoginParams } from '../../domain/IAuth'

export class AuthLoginController {
  constructor(private authLoginUser: AuthLoginUser) {}

  async runGitHub({ redirect, cookie }: GitHubAuthLoginParams) {
    try {
      const result = await this.authLoginUser.runGitHub({ redirect, cookie })
      return result
    } catch (error) {
      const err = error as Error
      return {
        code: 400,
        message: err.message,
      }
    }
  }

  async runGoogle({ redirect, cookie }: GoogleAuthLoginParams) {
    try {
      const result = await this.authLoginUser.runGoogle({ redirect, cookie })
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
