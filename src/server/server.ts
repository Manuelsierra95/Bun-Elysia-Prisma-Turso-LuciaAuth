import Elysia from 'elysia'
import { userRouter } from '../user/userRouter'
import cors from '@elysiajs/cors'

export class Server {
  private app: Elysia

  constructor() {
    this.app = new Elysia()
    this.app.use(
      cors({
        // origin: /^192\.168\.1\.[0-9]+$/,
        origin: true,
        methods: ['GET', 'PUT', 'POST', 'PATCH'],
      })
    )
    this.app.derive(({ headers }) => {
      // Esto lo bueno que podemos usar los headers para pasar el token, como por ejemplo en el loginController
      // ver el LoginController para ver el ejemplo de pasar el token en header
      const auth = headers['authorization']
      return {
        token: auth?.startsWith('Bearer ') ? auth.slice(7) : null,
      }
    })
    this.app.group('/api/v1', (app) => app.use(userRouter))
  }

  public start() {
    const PORT = process.env.PORT ?? 1234
    this.app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`)
    })
  }
}
