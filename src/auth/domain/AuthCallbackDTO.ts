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
