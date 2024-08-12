import { Elysia } from 'elysia'
import { createUserController, loginController } from '../server/dependencies'
import { createUserDTO, loginUserDTO } from './domain/UserDTO'

export const userRouter = new Elysia({ prefix: '/users' })
  .post(
    '/create',
    createUserController.run.bind(createUserController),
    createUserDTO
  )
  .post('/login', loginController.run.bind(loginController), loginUserDTO)
