export interface IAuth {
  signInGoogle(): Promise<void>
  signInGitHub(): Promise<void>
  callback(code: string, provider: string): Promise<any>
  signOut(): Promise<void>
}
