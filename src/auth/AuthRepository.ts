import type { IAuth } from './domain/IAuth'
import { Auth } from '../services/auth'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)

export class AuthRepository implements IAuth {
  private db: PrismaClient

  constructor() {
    this.db = new PrismaClient({ adapter })
  }

  async signInGoogle(): Promise<void> {
    // Aquí podrías registrar una sesión o realizar alguna operación en la base de datos si es necesario
    console.log('Google sign in handled.')
  }

  async signInGitHub(): Promise<void> {
    // Aquí podrías registrar una sesión o realizar alguna operación en la base de datos si es necesario
    console.log('GitHub sign in handled.')
  }

  async callback(code: string, provider: string): Promise<any> {
    // Aquí puedes manejar la lógica del callback, como almacenar tokens en la base de datos si es necesario
    console.log(`Callback handled for provider: ${provider} with code: ${code}`)
  }

  async signOut(): Promise<void> {
    // Aquí podrías eliminar la sesión o realizar alguna operación en la base de datos si es necesario
    console.log('User signed out.')
  }
}
