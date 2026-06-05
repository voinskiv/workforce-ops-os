# Implementation Plan

## Phase 0 — Setup

- create Next.js app
- install TypeScript, Tailwind, shadcn/ui
- configure Prisma
- connect PostgreSQL/Supabase
- create base layout
- create navigation
- create seed data

## Phase 1 — Domain Foundation

Implement:

- Employee
- PartnerCompany
- Coordinator
- Customer
- Site
- Shift
- Position
- Assignment
- OperationalCase
- CustomerRule

Deliverable:

- database schema
- migrations
- seed data
- basic list pages

## Phase 2 — Employees and Onboarding

Implement:

- employee list
- employee detail
- onboarding table/kanban
- status transitions
- first-day control
- no-show action that creates an OperationalCase

Deliverable:

- usable onboarding pipeline

## Phase 3 — Cases

Implement:

- case board
- case creation
- case detail
- status updates
- filters
- links to employee/customer/partner

Deliverable:

- generic exception management

## Phase 4 — Planning and Time Validation

Implement:

- simple assignment creation
- planning table
- time entries
- time issues
- correction statuses

Deliverable:

- visible planning and time correction workflow

## Phase 5 — Dashboard

Implement:

- KPI cards
- open onboarding items
- no-shows
- open cases
- open time issues
- customer/partner risk lists

Deliverable:

- management control tower V1

## Phase 6 — Review and Refine

- check domain fit
- improve UI speed
- add missing filters
- refine seed data
- prepare demo flow
