import type { IUser, UserLoginParams } from '../domain/IUser'
import type { IHash } from '../../services/interfaces/IHash'
import type { IJWT } from '../../services/interfaces/IJWT'
import type { User } from '../domain/User'

export class LoginUser {
  constructor(private userRepository: IUser, private hash: IHash, private jwt: IJWT) {}

  async run({ body, cookie }: UserLoginParams): Promise<User> {
    const { email, password } = body
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error('User not found')
    const isValid = this.hash.compare(password, user.password ?? '')
    if (!isValid) throw new Error('Invalid password')
    const token = await this.jwt.sing(user.id)

    // Para devolver el token en la response
    // user.setToken(token)

    cookie.token.set({
      value: token,
      httpOnly: true,
      maxAge: 7 * 86400,
    })

    return user
  }
}
