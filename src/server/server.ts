import Elysia from 'elysia'
import { userRouter } from '../user/userRouter'
import cors from '@elysiajs/cors'
import { cookie } from '@elysiajs/cookie'
import { authUserRouter } from '../auth/authRouter'

export class Server {
  private app: Elysia

  constructor() {
    this.app = new Elysia()
    this.app.use(cookie())
    this.app.use(
      cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'PATCH'],
      })
    )
    this.app.derive(({ headers }) => {
      const auth = headers['authorization']
      return {
        token: auth?.startsWith('Bearer ') ? auth.slice(7) : null,
      }
    })
    this.app.group('/api/v1', (app) => app
      .use(userRouter)
      .use(authUserRouter))
  }

  public start() {
    const PORT = process.env.PORT ?? 1234
    this.app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`)
    })
  }
}
