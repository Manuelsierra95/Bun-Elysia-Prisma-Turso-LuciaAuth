export interface IJWT {
  sing(payload: string): Promise<string>;
  verify(token: string): string;
}
