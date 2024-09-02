import { AuthLoginUser } from '../../application/authLogin'
import type { AuthLoginParams } from '../../domain/IAuth'

export class AuthLoginController {
  constructor(private authLoginUser: AuthLoginUser) {}

  async run({ redirect, cookie }: AuthLoginParams) {
    try {
      const result = await this.authLoginUser.run({ redirect, cookie })
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
