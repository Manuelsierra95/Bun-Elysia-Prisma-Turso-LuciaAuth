import { User } from './User'

export interface IUser {
  create(email: string, password: string): Promise<User>
  findByEmail(email: string): Promise<User | null>
  update(id: string, data: Partial<{ email: string; password: string }>): Promise<User | null>
}
