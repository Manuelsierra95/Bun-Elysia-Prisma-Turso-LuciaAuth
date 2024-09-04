import { User } from '../../user/domain/User'

export interface IAuth {
  findUserByEmail(email: string): Promise<User | null>
  createUser(email: string): Promise<User>
  updateUser(id: string, data: Partial<{ email: string; password: string }>): Promise<User>
  createSession(userId: string): Promise<string>
  saveAuthState(state: string): Promise<void>
}

type UserSession = {
  value: {
    id: string
    email: string
    sessionId: string
  }
  domain?: string
  httpOnly?: boolean
  maxAge?: number
}

export type GitHubCookieType = {
  github_oauth_state: {
    value: string
  }
  user_session?: UserSession
}

export type GoogleCookieType = {
  google_oauth_state: {
    value: string
  }
  google_oauth_code_verifier: {
    value: string
  }
  user_session?: UserSession
}

type RedirectFunction = (url: string) => void

export interface GitHubAuthLoginParams {
  cookie: GitHubCookieType
  redirect: RedirectFunction
}

export interface GitHubAuthCallbackParams {
  query: any
  cookie: GitHubCookieType
  redirect: RedirectFunction
}

export interface GoogleAuthLoginParams {
  cookie: GoogleCookieType
  redirect: RedirectFunction
}

export interface GoogleAuthCallbackParams {
  query: any
  cookie: GoogleCookieType
  redirect: RedirectFunction
}
