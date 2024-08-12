import type { IUser } from '../domain/IUser'
import type { IHash } from '../../services/interfaces/IHash'
import type { IJWT } from '../../services/interfaces/IJWT'
import type { User } from '../domain/User'

export class LoginUser {
  constructor(
    private userRepository: IUser,
    private hash: IHash,
    private jwt: IJWT
  ) {}

  async run(email: string, password: string): Promise<User> {
    const user = await this.userRepository.find(email)
    if (!user) throw new Error('User not found')
    const isValid = this.hash.compare(password, user.password)
    if (!isValid) throw new Error('Invalid password')
    const token = await this.jwt.sing(user.id)
    user.setToken(token)
    return user
  }
}
