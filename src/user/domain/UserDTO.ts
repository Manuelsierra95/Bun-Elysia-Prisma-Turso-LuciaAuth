import { t } from 'elysia'

export const createUserDTO = {
  body: t.Object({
    email: t.String(),
    password: t.String({
      minLength: 6,
    }),
  }),
}

export const loginUserDTO = {
  body: t.Object({
    email: t.String(),
    password: t.String({
      minLength: 6,
    }),
  }),
  cookie: t.Object({}),
}
