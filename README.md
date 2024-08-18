# Authentication Page with Next.js and Supabase

## Features
- Next.js
- tailwindcss
- Supabase
- shadcn/ui
- zod
- biome

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/obizip/auth-page-with-supabase.git
cd auth-page-with-supabase
```

### 2. Set Up Environment Variables

Rename the `.env.template` file to `.env.local` and update it with your Supabase project details.

```bash
mv .env.template .env.local
# Update .env.local with your Supabase project details
```

### 3. Create Database Table

Set up your database table in Supabase as follows:

```sql
auth_users {
    id: int8 -> unique id
    name: varchar
    auth_id: uuid -> link to authentication id
}
```

### 4. Install Dependencies and Run the Project

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
