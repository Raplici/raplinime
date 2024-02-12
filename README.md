
# Anime Vibe

A website created to be a source of information for anime lovers


## Tech Stack

Next.js, PostgreSql, Prisma, TailwindCSS

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_BASE_URL=https://api.jikan.moe/v4`

`NEXT_PUBLIC_APP_URL="http://localhost:3000"`

`NEXTAUTH_SECRET=`

`GITHUB_CLIENT_ID=`

`GITHUB_SECRET_SECRET=`

`GOOGLE_CLIENT_ID=`

`GOOGLE_CLIENT_SECRET=`

`DATABASE_URL=`

`DIRECT_URL=`

`RESEND_API_KEY=`
## Run Locally

1. Clone the project

```bash
  git clone https://github.com/rafliferdian/raplinime.git
```

2. add an .env file with the following environment variables

3. Install dependencies

```bash
  npm install
```

4. Generating Prisma Client

```bash
  npx prisma generate
```

5. Start the server

```bash
  npm run dev
```

