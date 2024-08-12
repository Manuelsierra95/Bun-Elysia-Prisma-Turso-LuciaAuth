import { Elysia } from 'elysia'
import { AuthController } from './infraestructure/controllers/authController'

export const userRouter = new Elysia({ prefix: '/users' })
  .get('/google', authController.run.bind(auth))
  .get('/github', authController.signInGitHub.bind(authController))
  .get('/callback', authController.callback.bind(authController))
  .post('/signout', authController.signOut.bind(authController))

// 	import { Elysia } from 'elysia'
// import { createUserController, loginController } from '../server/dependencies'
// import { createUserDTO, loginUserDTO } from './domain/UserDTO'

// export const userRouter = new Elysia({ prefix: '/users' })
//   .post(
//     '/create',
//     createUserController.run.bind(createUserController),
//     createUserDTO
//   )
//   .post('/login', loginController.run.bind(loginController), loginUserDTO)
