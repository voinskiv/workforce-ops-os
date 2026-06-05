# Universal Operating Principles

These principles define how the Ops OS should be designed.

## 1. The OS controls productive workforce capacity

The product is not a generic HR system.

It controls whether a worker is actually operationally useful:

- announced
- onboarded
- assigned
- present
- working
- validated
- billable
- productive
- compliant

## 2. Everything operationally important has a status

Every critical object should have explicit status.

Examples:

- Employee: announced, created, planned, appeared, active, no-show, replaced, sick, vacation, inactive
- Time issue: unreviewed, suspicious, sent to foreman, sent to customer, corrected, final, billable
- Case: open, in progress, waiting for partner, waiting for customer, resolved, cancelled
- Assignment: planned, confirmed, partially staffed, critical, completed

Status creates control.

## 3. Every exception becomes a case

Do not create a large module for every edge case.

Use OperationalCase for exceptions such as:

- no-show
- time error
- missing document
- worker complaint
- fuel receipt
- fine
- reimbursement
- customer request
- partner issue
- vehicle problem

Each case needs:

- owner
- status
- due date
- related entity
- amount if relevant
- next step
- outcome

## 4. Customer systems are overlaid, not replaced

Customer systems such as Jager and FIEGE may already control goods, warehouse processes, and local time tracking.

The Ops OS should not replace them.

It should consolidate relevant workforce signals and create an internal truth layer for:

- planning
- validation
- performance
- billing
- management decisions

## 5. Customer-specific rules must be configurable

Each customer may have different rules:

- break logic
- first-day / trial-day treatment
- correction workflow
- billing logic
- contact persons
- data sources
- performance tracking availability

These rules must be modeled as CustomerRule, not hardcoded into random UI logic.

## 6. Workforce planning is constraint-based

Planning is not only about placing a person into a shift.

It depends on:

- shift
- position
- customer
- site
- accommodation
- transport
- vehicle group
- partner relationships
- couples/family constraints
- fixed customer positions
- vacation
- sickness
- no-shows
- language
- skills

The MVP does not need an automatic optimizer, but it must make constraints visible.

## 7. Management needs decision-ready signals

The dashboard should not show raw operational noise.

It should answer:

- Who was planned but did not appear?
- Which time issues are unresolved?
- Which customer/site is risky?
- Which partner creates problems?
- Which workers are not yet productive?
- Which projects may be unprofitable?
- Which cases are overdue?

## 8. Make reality visible before automating it

First build:

- visibility
- status
- ownership
- rules
- exceptions
- dashboard

Only later build:

- automation
- prediction
- optimization
- AI scheduling

## 9. Do not digitize bad or legally unclear processes blindly

Some real processes may be operationally common but legally sensitive or strategically wrong.

Examples:

- unpaid trial work
- informal fines
- collecting sensitive partner worker documents
- cash reimbursements
- unclear responsibility for vehicle damage

Model such processes carefully, usually as cases or status signals, not as normalized business logic unless legally approved.

## 10. Speed at the point of work matters

The UI must be fast and practical.

Operations users need:

- low clicks
- clear tables
- fast search
- filters
- status badges
- mobile-friendly pages
- simple actions
- clear ownership

If the system is slow or too complicated, it will not be used.
