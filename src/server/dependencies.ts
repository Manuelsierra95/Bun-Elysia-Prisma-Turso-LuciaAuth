// Services
import { Hash } from '../services/hash'
import { JWT } from '../services/jwt'

// Repositories
import { UserRepository } from '../user/infraestructure/UserRepository'
import { AuthRepository } from '../auth/infraestructure/AuthRepository'

// Applications
import { CreateUser } from '../user/application/create'
import { LoginUser } from '../user/application/login'
import { AuthLoginUser } from '../auth/application/authLogin'
import { AuthCallbackUser } from '../auth/application/authCallback'

// Controllers
import { CreateUserController } from '../user/infraestructure/controllers/createController'
import { LoginController } from '../user/infraestructure/controllers/loginController'
import { AuthLoginController } from '../auth/infraestructure/controllers/authLoginController'
import { AuthCallbackController } from '../auth/infraestructure/controllers/authCallbackController'

// Service instance
const hashService = new Hash()
const jwtService = new JWT()

// Repository instance
const userRepository = new UserRepository()
const authRepository = new AuthRepository()

// Application instance
const createUser = new CreateUser(userRepository, hashService)
const loginUser = new LoginUser(userRepository, hashService, jwtService)
const authLoginUser = new AuthLoginUser(authRepository)
const authCallbackUser = new AuthCallbackUser(authRepository)

// Controller instance
export const createUserController = new CreateUserController(createUser)
export const loginController = new LoginController(loginUser)
export const authLoginController = new AuthLoginController(authLoginUser)
export const authCallbackController = new AuthCallbackController(authCallbackUser)
