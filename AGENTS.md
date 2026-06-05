# AGENTS.md — Codex Project Instructions

## Mission

Build the MVP of a Workforce Operations Control OS.

The application is a control layer above customer systems such as Jager or FIEGE. It is not a warehouse management system, not an ERP, and not a replacement for customer systems.

## Required Reading Before Work

Before proposing or implementing changes, read:

- `docs/00-product-vision.md`
- `docs/01-operating-principles.md`
- `docs/02-research-summary.md`
- `docs/03-domain-model.md`
- `docs/04-mvp-scope.md`
- `docs/05-user-roles.md`
- `docs/06-screen-spec.md`
- `docs/07-technical-stack.md`

For the first task, also read:

- `tasks/001-initial-implementation-plan.md`

## Core Rule

Do not expand the product beyond the MVP scope.

If a real-world detail seems important but does not belong to the MVP, model it as an `OperationalCase` rather than creating a large new module.

## Product Boundary

Build a workforce operations control layer.

Do not build:

- warehouse management
- barcode goods scanning
- full ERP
- accounting integration
- payroll system
- full HR suite
- automatic shift optimizer
- native mobile app
- full document archive
- full fleet management
- AI scheduler
- complex route optimization

## Architecture Rules

Prefer:

- simple, clean, extensible architecture
- type-safe code
- explicit domain enums
- readable database schema
- seed data for demo workflows
- fast internal UI
- practical workflows over overengineered abstractions

Avoid:

- hardcoding customer-specific business rules into random UI code
- building Jager-specific logic that cannot generalize
- creating separate modules for every edge case
- modeling legally sensitive processes as if they are approved business logic
- unnecessary complexity before the vertical slice works

## First Vertical Slice

The first useful build should include:

1. Employees
2. Partner companies
3. Customers and sites
4. Onboarding pipeline
5. Assignments
6. Operational cases
7. Customer rules
8. Simple dashboard

## Implementation Behavior

Before writing code for a major task:

1. Briefly restate the task.
2. Confirm the relevant docs inspected.
3. Propose a short implementation plan.
4. Then implement only the agreed scope.

## UI Philosophy

Operations users are busy. The UI must be fast, clear, and low-click.

Use:

- tables
- filters
- status badges
- clear actions
- dashboards
- detail pages
- simple forms

Do not prioritize visual complexity over operational speed.
