import jwt from 'jsonwebtoken'
import type { IJWT } from './interfaces/IJWT'

export class JWT implements IJWT {
  async sing(payload: string): Promise<string> {
    return jwt.sign({ data: payload }, 'secret', { expiresIn: '1h' })
  }
  verify(token: string): string {
    return jwt.verify(token, 'secret') as string
  }
}
