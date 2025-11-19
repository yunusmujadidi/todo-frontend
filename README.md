# todo app

simple todo list app pake next.js

## requirements

- node.js 18+
- pnpm
- backend api todo list([backend repo](https://github.com/yunusmujadidi/todo-backend))

## install

```bash
git clone https://github.com/yunusmujadidi/todo-frontend
cd todo-frontend
pnpm i
```

buat file `.env` menggunakan template `.env.example`

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## run

development:

```bash
pnpm dev
```

production:

```bash
pnpm build
pnpm start
```

buka http://localhost:3000

## fitur

- login/register
- crud tasks (create, read, update, delete)
- filter tasks by status (all, pending, in progress, done)
- update status via dropdown
- delete confirmation dialog
- toast notifications
- dark mode
- tabel task (otw)

## struktur folder

```
src/
├── app/         # pages (login, register, tasks)
├── components/  # ui components (forms, cards, modals)
├── hooks/       # custom hooks (auth, confirm, task)
├── lib/         # api calls, types, utils
└── providers/   # providers
```

## tech stack

next.js 16, typescript, tailwind, shadcn/ui, zustand, react-hook-form, zod
