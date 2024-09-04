import { LoginUser } from '../../application/login'
import { UserLoginParams } from '../../domain/IUser'

export class LoginController {
  constructor(private loginUser: LoginUser) {}

  async run({ body, cookie }: UserLoginParams) {
    try {
      const user = await this.loginUser.run({ body, cookie })
      return {
        code: 200,
        user,
        message: 'User logged in',
      }
    } catch (e) {
      const error = e as Error
      return {
        code: 400,
        message: error.message,
      }
    }
  }
}
