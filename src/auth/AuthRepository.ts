import type { IAuth } from './domain/IAuth'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import { User } from '../user/domain/User'
import { UserRepository } from '../user/infraestructure/UserRepository'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)

export class AuthRepository implements IAuth {
  private db: PrismaClient
  private userRepository: UserRepository

  constructor() {
    this.db = new PrismaClient({ adapter })
    this.userRepository = new UserRepository()
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email)
  }

  async createUser(email: string, githubId: number): Promise<User> {
    try {
      const user = await this.db.user.create({
        data: {
          email,
          githubId,
          password: '',
        },
      })

      return new User(user.id, user.email, user.password, user.githubId)
    } catch (e) {
      const error = e as Error
      console.log(error.message)
      throw new Error(error.message)
    }
  }

  async updateUser(id: string, data: Partial<{ email: string; password: string }>): Promise<User> {
    return this.userRepository.update(id, data)
  }

  async createSession(userId: string): Promise<string> {
    const session = await this.db.session.create({
      data: {
        userId,
      },
    })
    return session.id
  }

  async saveAuthState(state: string): Promise<void> {
    await this.db.authState.create({
      data: { state },
    })
  }
}
