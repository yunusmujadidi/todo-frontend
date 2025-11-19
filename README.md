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
- tabel task dengan pagination & sorting
- settings page

## struktur folder

```
src/
├── app/                          # next.js app router
│   ├── (auth)/                   # auth route group
│   │   ├── (routes)/
│   │   │   ├── login/           # halaman login
│   │   │   └── register/        # halaman register
│   │   └── layout.tsx           # auth layout
│   │
│   ├── (dashboard)/             # dashboard route group
│   │   ├── (routes)/
│   │   │   ├── (main)/         # halaman utama dashboard
│   │   │   ├── settings/       # halaman settings
│   │   │   └── tasks/          # halaman tasks table
│   │   └── layout.tsx          # dashboard layout (sidebar)
│   │
│   └── layout.tsx               # root layout
│
├── components/                  # react components
│   ├── cards/                  # card components
│   ├── forms/                  # form components (login, register, task)
│   ├── layout/                 # layout components (navbar, navigation)
│   ├── modal/                  # modal components (create, edit task)
│   ├── sidebar/                # sidebar components
│   ├── tables/                 # table components (columns, data-table)
│   ├── tasks/                  # tasks components (list, table view)
│   └── ui/                     # shadcn ui components
│
├── hooks/                      # custom react hooks
│   ├── use-auth.ts            # authentication state
│   ├── use-confirm.tsx        # confirmation dialog
│   ├── use-mobile.ts          # mobile detection
│   └── use-task.ts            # task modal state
│
├── lib/                       # utilities & helpers
│   ├── api.ts                 # api calls
│   ├── const.ts               # constants
│   ├── types.ts               # typescript types
│   ├── utils.ts               # utility functions
│   └── zod-schema.ts          # validation schemas
│
└── providers/                 # react providers
    └── dialog-providers.tsx   # modal providers
```

## tech stack

next.js 16, typescript, tailwind, shadcn/ui, zustand, react-hook-form, zod
