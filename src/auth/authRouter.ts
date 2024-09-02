import { Elysia } from 'elysia'
import { authLoginController, authCallbackController } from '../server/dependencies'
import { authLoginGitHubDTO, authLoginGoogleDTO } from './domain/AuthLoginDTO'
import { authCallbackGitHubDTO, authCallbackGoogleDTO } from './domain/AuthCallbackDTO'

export const authUserRouter = new Elysia({ prefix: '/auth' })
  .get('/github', authLoginController.runGitHub.bind(authLoginController), authLoginGitHubDTO)
  .get('/github/callback', authCallbackController.runGitHub.bind(authCallbackController), authCallbackGitHubDTO)
  .get('/google', authLoginController.runGoogle.bind(authLoginController), authLoginGoogleDTO)
  .get('/google/callback', authCallbackController.runGoogle.bind(authCallbackController), authCallbackGoogleDTO)
