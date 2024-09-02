import { t } from 'elysia'

export const authLoginGitHubDTO = {
  cookie: t.Cookie({
    github_oauth_state: t.Optional(t.String()),
  }),
}

export const authLoginGoogleDTO = {
  cookie: t.Cookie({
    google_oauth_state: t.Optional(t.String()),
    google_oauth_code_verifier: t.Optional(t.String()),
  }),
}
