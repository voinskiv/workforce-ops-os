# Research Summary — Business and Operations Findings

This summary is based on management interviews and operational observation.

## Business Context

The company provides workforce services for logistics and operational customer sites. Workers are deployed across customers such as Jager and FIEGE. The company also deals with accommodation, transport, partner companies, onboarding, time tracking, payroll-adjacent documents, and customer billing.

## Core Business Pattern

The company is an operational matching system:

Worker → Customer → Site → Shift → Position → Transport → Accommodation → Time → Performance → Billing → Profitability

A change in one part often affects several other parts.

## Main Management Problems

### Lack of weekly profitability visibility

Management wants to see project profitability weekly, not after months.

Profitability must include:

- worker hours
- customer billing
- direct labor cost
- transport
- accommodation
- vehicle costs
- repairs
- administration
- dispatching
- backoffice
- management overhead

### High person dependency

Critical knowledge is held by individual people:

- who lives where
- who drives with whom
- who is assigned to which shift
- which time entries need correction
- which documents are missing
- which customer rules apply
- which vehicles have issues

The OS must reduce person dependency.

### Manual reconciliation

Important processes still require manual work:

- paper time sheets
- customer time system checks
- handwritten notes
- scans
- emails
- printed documents
- manual correction workflows
- manual fuel receipt matching
- manual document updates

## Planning Complexity

Planning depends on:

- shift
- worker availability
- customer demand
- position
- transport
- accommodation
- couples or groups
- private cars
- customer preferences
- fixed positions
- vacation
- sickness
- no-shows

Small changes can create domino effects.

## Time Validation Problems

Customer systems provide time data, but these data are not always billable or correct.

Typical issues:

- missing check-out
- forgotten pause return
- very long pauses
- 16-hour days caused by missing booking
- customer-specific automatic deductions
- first-day special rules
- worker complaints about missing time

Time data require validation.

## Customer System Dependency

Customer systems are useful but not enough.

The company needs its own control layer because:

- customer systems are slow or fragmented
- access may be read-only
- rules vary by customer
- performance data are customer-owned
- internal billing and planning needs differ from customer needs

## Onboarding Problems

New workers move through several states:

- announced by partner
- document received
- card number assigned
- created in customer system
- foreman informed
- first workday planned
- first pick confirmed
- active
- no-show / replaced

A planned worker is not a real operational resource until they appear and start working.

## No-Show and Discipline Problems

No-shows after weekends or holidays can be significant.

Impact:

- customer reputation loss
- lost revenue
- shift disruption
- replacement effort
- training cost
- accommodation/transport changes
- team instability

No-shows should be tracked as incidents or cases.

## Transport and Accommodation

Transport and accommodation are not side details. They affect planning, cost, and profitability.

Transport includes:

- buses
- private cars
- vehicle groups
- drivers
- passengers
- fuel cards
- fines
- repairs
- partner reimbursements

Accommodation includes:

- addresses
- rooms
- beds
- occupancy
- move-in/move-out
- costs
- revenue / deductions

These should not all be first MVP modules, but the core data model must allow future integration.

## Backoffice Case Load

Backoffice is full of small operational cases:

- fuel receipt missing
- reimbursement pending
- fine needs driver assignment
- partner owes money
- document updated
- worker complaint
- customer requests proof
- time correction pending

The MVP should include a generic OperationalCase board.

## Jager Site Observation

Jager has its own digital warehouse processes:

- barcode scanning
- mobile devices
- goods receiving
- storage guidance
- customer-specific warehouse areas
- expiry-date logic
- order picking
- time tracking
- break tracking
- performance tracking per worker ID

The Ops OS should not replace Jager's warehouse system.

It should use or mirror relevant workforce signals from customer systems and create an internal multi-site standard for workforce control and performance visibility.

## Key Product Conclusion

The product should be a Workforce Operations Control OS.

It should control worker readiness, assignments, time validation, exceptions, customer rules, performance, and management visibility.

It should not become a generic ERP or warehouse management system.
