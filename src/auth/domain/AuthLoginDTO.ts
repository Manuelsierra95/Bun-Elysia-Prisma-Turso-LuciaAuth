import { t } from 'elysia'

export const authLoginGitHubDTO = {
  cookie: t.Cookie({
    github_oauth_state: t.Optional(t.String()),
  }),
}
