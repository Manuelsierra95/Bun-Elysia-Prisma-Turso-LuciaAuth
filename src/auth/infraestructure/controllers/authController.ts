import { Context } from 'elysia'
import { AuthUser } from '../../application/auth'

type AuthLogin = {
  code: number
  user: {
    email: string
    password: string
  }
  token: string
  message: string
}

export class AuthController {
  constructor(private authLogin: AuthUser) {}

  async signInGoogle(ctx: Context): AuthLogin {
    try {
      const user = await this.authLogin.signInGoogle()
      return {
        code: 200,
        user,
        message: 'User logged in with Google',
      }
    } catch (e) {
      const error = e as Error
      return {
        code: 400,
        message: error.message,
      }
    }
  }
  async signInGitHub(ctx: Context): AuthLogin {
    try {
      const user = await this.authLogin.signInGitHub()
      return {
        code: 200,
        user,
        message: 'User logged in with GitHub',
      }
    } catch (e) {
      const error = e as Error
      return {
        code: 400,
        message: error.message,
      }
    }
  }

  async callback(ctx: Context): AuthLogin {
    const { code, provider } = ctx.req.query as {
      code: string
      provider: string
    }
    await this.authLogin.callback(code, provider)
    ctx.response.body = { message: 'Callback processed' }
  }

  async signOut(ctx: Context): AuthLogin {
    try {
      const user = await this.authLogin.signOut()
      return {
        code: 200,
        user,
        message: 'User logged out',
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
