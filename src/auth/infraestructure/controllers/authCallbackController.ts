import { AuthCallbackUser } from '../../application/authCallback'
import type { AuthCallbackParams } from '../../domain/IAuth'

export class AuthCallbackController {
  constructor(private authCallbackUser: AuthCallbackUser) {}

  async run({ query, cookie, redirect }: AuthCallbackParams) {
    try {
      const result = await this.authCallbackUser.run({ query, cookie, redirect })
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
