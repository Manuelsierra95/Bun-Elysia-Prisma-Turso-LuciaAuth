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
      console.log(error.message)
      throw new Error(error.message)
    }
  }

  async find(email: string) {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) return null

    return new User(user.id, user.email, user.password)
  }
}
