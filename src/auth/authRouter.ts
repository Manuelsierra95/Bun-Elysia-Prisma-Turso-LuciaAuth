import { Elysia } from 'elysia'
import { authLoginController, authCallbackController } from '../server/dependencies'
import { authLoginGitHubDTO } from './domain/AuthLoginDTO'
import { authCallbackGitHubDTO } from './domain/AuthCallbackDTO'

export const authUserRouter = new Elysia({ prefix: '/auth' })
  .get('/github', authLoginController.run.bind(authLoginController), authLoginGitHubDTO)
  .get('/github/callback', authCallbackController.run.bind(authCallbackController), authCallbackGitHubDTO)