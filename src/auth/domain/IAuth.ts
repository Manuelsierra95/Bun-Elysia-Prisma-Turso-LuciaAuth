import { User } from '../../user/domain/User'

export type GitHubCookieType = {
  github_oauth_state: {
    value: string
  }
  user_session?: {
    value: {
      id: string
      name: string
      sessionId: string
    }
  }
}

type RedirectFunction = (url: string) => void

export interface AuthLoginParams {
  cookie: GitHubCookieType
  redirect: RedirectFunction
}

export interface AuthCallbackParams {
  query: any
  cookie: GitHubCookieType
  redirect: RedirectFunction
}

export interface IAuth {
  findUserByEmail(email: string): Promise<User | null>
  createUser(email: string, githubId: number): Promise<User>
  updateUser(id: string, data: Partial<{ email: string; password: string }>): Promise<User>
  createSession(userId: string): Promise<string>
  saveAuthState(state: string): Promise<void>
}
