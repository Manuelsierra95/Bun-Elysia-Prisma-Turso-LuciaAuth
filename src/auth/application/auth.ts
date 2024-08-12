import type { IAuth } from '../domain/IAuth'
import type { AuthCallbackDTO } from '../domain/AuthDTO'

export class AuthUser {
  constructor(private authRepository: IAuth) {}

  async signInGoogle() {
    return this.authRepository.signInGoogle()
  }

  async signInGitHub() {
    return this.authRepository.signInGitHub()
  }

  async handleCallback(data: AuthCallbackDTO) {
    const { code, provider } = data
    return this.authRepository.callback(code, provider)
  }

  async signOut() {
    return this.authRepository.signOut()
  }
}
