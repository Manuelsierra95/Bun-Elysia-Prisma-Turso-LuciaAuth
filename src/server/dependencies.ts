import { UserRepository } from '../user/infraestructure/UserRepository'
import { CreateUser } from '../user/application/create'
import { CreateUserController } from '../user/infraestructure/controllers/createController'
import { Hash } from '../services/hash'
import { LoginUser } from '../user/application/login'
import { LoginController } from '../user/infraestructure/controllers/loginController'
import { JWT } from '../services/jwt'
import { AuthController } from '../auth/infraestructure/controllers/authController'
import { AuthUser } from '../auth/application/auth'
import { AuthRepository } from '../auth/AuthRepository'

const userRepository = new UserRepository()
const hashService = new Hash()
const jwtService = new JWT()
const authRepository = new AuthRepository()

const createUser = new CreateUser(userRepository, hashService)
export const createUserController = new CreateUserController(createUser)

const loginUser = new LoginUser(userRepository, hashService, jwtService)
export const loginController = new LoginController(loginUser)

const authUser = new AuthUser(authRepository)
export const authController = new AuthController(authUser)
