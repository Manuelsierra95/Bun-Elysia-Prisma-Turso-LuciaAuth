# API Bun-Elysia-Prisma-Turso-LuciaAuth

## Getting Started

## Instalar Bun Js:

MacOs:

```bash
curl -fsSL https://bun.sh/install | bash
```

Windows:

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

### Instalar el CLI de Turso:

MacOs:

```bash
brew install tursodatabase/tap/turso
```

Windows:

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

### Instalar dependencias

```bash
bun i
```

## Development

Inciar el server:

```bash
bun run dev
```

## Prisma y Turso

### Instalación

```bash
bun i @prisma/client @libsql/client @prisma/adapter-libsql
```

### Crear una DB nueva:

```bash
turso db create nombre-de-la-DB
```

Ver info de la DB, de aqui sacamos el `TURSO_DATABASE_URL` que tenemos que añadir al .env, que será algo como esto: =`libsql://nombre-de-la-DB-usuario.turso.io`

```bash
turso db show nombre-de-la-DB
```

Generamos el token, que tenemos que añadirlo al .env en `TURSO_AUTH_TOKEN`

```bash
turso db tokens create nombre-de-la-DB
```

Crear una tabla:

- Iniciamos prisma:

  ```bash
  prisma init
  ```

- Pegamos el `driver adapter` en prisma/schema.prisma

  ```javascript
  generator client {
  	provider        = "prisma-client-js"
  	previewFeatures = ["driverAdapters"]
  }
  ```

- Creamos los modelos que necesitemos en prisma/schema.prisma, como por ejemplo:

  ```javascript
  model User {
    id String @id @default(uuid())
    email String @unique
    password String?
    sessions  Session[]
  }
  ```

- Generamos el esquema de la DB:
  ```bash
  bunx prisma generate
  ```

Para crear una migracion:

```bash
bunx prisma migrate dev --name nombre
```

Para pasarle la migracion (esquema de tablas, datos si los hay, etc) a Turso: (hay que cambiar la parte de `20240808072031_init` por la que se nos genere)

```bash
turso db shell test-turso-prisma < ./prisma/migrations/20240808072031_init/migration.sql
```
