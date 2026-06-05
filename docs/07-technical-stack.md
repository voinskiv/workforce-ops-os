# Technical Stack

## Recommended MVP Stack

- Next.js
- TypeScript
- PostgreSQL
- Supabase
- Prisma
- Tailwind CSS
- shadcn/ui
- Vercel
- GitHub
- Codex / ChatGPT for AI-assisted development

## Architecture Style

Use a monolithic full-stack web application for the MVP.

Do not introduce microservices.

## Suggested App Structure

```txt
app/
  dashboard/
  employees/
  onboarding/
  planning/
  time-validation/
  customer-rules/
  cases/
  customers/
components/
  ui/
  domain/
lib/
  db/
  auth/
  actions/
  utils/
prisma/
  schema.prisma
  seed.ts
docs/
tasks/
```

## Data Access

Use Prisma for schema definition and database access.

Use Supabase Postgres as the hosted database.

## Auth

Use Supabase Auth or a placeholder auth-ready structure in the first local build.

## UI

Use shadcn/ui components where helpful:

- Button
- Card
- Table
- Badge
- Dialog
- Form
- Input
- Select
- Tabs
- Dropdown menu

## Design Priorities

- fast tables
- clear status badges
- simple forms
- responsive layout
- dashboard cards
- low-click workflows
- practical internal tool feel

## Development Priorities

1. Clear schema
2. Seed data
3. Employees
4. Onboarding
5. Cases
6. Dashboard
7. Assignments
8. Time issues
9. Customer rules

## Quality Bar

The MVP must be:

- easy to run locally
- type-safe
- seeded with realistic demo data
- readable
- extendable
- not overengineered
