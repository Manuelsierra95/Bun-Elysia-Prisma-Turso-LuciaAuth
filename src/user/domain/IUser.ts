import { User } from './User'

export interface IUser {
  create(email: string, password: string): Promise<User>
  findByEmail(email: string): Promise<User | null>
  update(id: string, data: Partial<{ email: string; password: string }>): Promise<User | null>
}

export type UserLoginParams = {
  body: {
    email: string
    password: string
  }
  cookie: {
    token: {
      value: string
      set: (options: any) => void
    }
  }
}
