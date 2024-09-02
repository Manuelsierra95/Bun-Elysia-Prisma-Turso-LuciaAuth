import { t } from 'elysia'

export const authCallbackGitHubDTO = {
  query: t.Object({
    code: t.String(),
    state: t.String(),
  }),
  cookie: t.Cookie({
    github_oauth_state: t.String(),
  }),
  redirect: t.Any(),
}

export const authCallbackGoogleDTO = {
  query: t.Object({
    code: t.String(),
    state: t.String(),
  }),
  cookie: t.Cookie({
    google_oauth_state: t.String(),
    google_oauth_code_verifier: t.String(),
  }),
  redirect: t.Any(),
}
