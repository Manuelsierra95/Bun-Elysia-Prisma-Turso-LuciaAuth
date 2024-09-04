import type { IUser } from '../domain/IUser'
import { User } from '../domain/User'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)

export class UserRepository implements IUser {
  private db: PrismaClient

  constructor() {
    this.db = new PrismaClient({ adapter })
  }

  async create(email: string, password: string): Promise<User> {
    try {
      const user = await this.db.user.create({
        data: {
          email,
          password,
        },
      })
      return new User(user.id, user.email, user.password)
    } catch (e) {
      const error = e as Error
      throw new Error(error.message)
    }
  }

  async findByEmail(email: string) {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) return null

    return new User(user.id, user.email, user.password)
  }

  async update(id: string, data: Partial<{ email: string; password: string }>): Promise<User> {
    const userExists = await this.db.user.findUnique({ where: { id } })

    if (!userExists) {
      throw new Error('User not found')
    }

    const userData = await this.db.user.update({
      where: { id },
      data,
    })

    return new User(userData.id, userData.email, userData.password)
  }
}
