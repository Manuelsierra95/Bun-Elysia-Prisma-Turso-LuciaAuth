import bcrypt from 'bcrypt'
import type { IHash } from './interfaces/IHash'

export class Hash implements IHash {
  async hash(password: string) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}
