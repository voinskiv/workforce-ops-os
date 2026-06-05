# Domain Model V1

## Core Entities

### Employee

A person who may be assigned to work.

Key fields:

- id
- firstName
- lastName
- displayName
- status
- partnerCompanyId
- coordinatorId
- externalCardNumber
- externalSystemId
- phone
- language
- currentCustomerId
- currentSiteId
- currentShiftId
- currentPositionId
- accommodationId
- vehicleGroupId
- firstWorkday
- notes
- createdAt
- updatedAt

### PartnerCompany

External company or workforce supplier.

Key fields:

- id
- name
- country
- status
- notes

### Coordinator

Contact person responsible for workers from a partner company.

Key fields:

- id
- name
- phone
- email
- partnerCompanyId
- role
- notes

### Customer

Customer company such as Jager or FIEGE.

Key fields:

- id
- name
- status
- notes

### Site

Customer site or operational location.

Key fields:

- id
- customerId
- name
- address
- status
- notes

### Shift

Time window or shift type.

Key fields:

- id
- customerId
- siteId
- name
- startsAt
- endsAt
- status
- notes

### Position

Operational role or customer department.

Key fields:

- id
- customerId
- siteId
- name
- description
- status

### Assignment

A worker's planned or actual assignment.

Key fields:

- id
- employeeId
- customerId
- siteId
- shiftId
- positionId
- date
- status
- plannedBy
- confirmedBy
- notes

### Restriction

Planning restriction or operational constraint.

Key fields:

- id
- employeeId
- type
- severity
- reason
- active
- notes

Examples:

- only_first_shift
- only_second_shift
- fixed_position
- must_travel_with_group
- must_work_with_partner
- cannot_switch_shift
- customer_preference
- transport_dependency
- accommodation_dependency

### VehicleGroup

Transport group, bus, private car, or travel group.

Key fields:

- id
- name
- type
- capacity
- driverEmployeeId
- notes

### Accommodation

Accommodation object.

Key fields:

- id
- name
- address
- capacity
- status
- notes

### TimeEntry

Recorded time from customer system or internal source.

Key fields:

- id
- employeeId
- customerId
- siteId
- assignmentId
- workDate
- source
- startTime
- endTime
- breakMinutes
- rawHours
- validatedHours
- status
- notes

### TimeIssue

Problem or correction linked to a TimeEntry.

Key fields:

- id
- timeEntryId
- employeeId
- type
- status
- detectedAt
- assignedTo
- resolution
- notes

Examples:

- missing_check_out
- missing_pause_return
- unusually_long_pause
- unusually_long_shift
- first_day_rule
- worker_complaint
- customer_correction_needed

### CustomerRule

Customer-specific operational and billing rule.

Key fields:

- id
- customerId
- siteId
- type
- name
- description
- active
- configJson

Examples:

- break_rule
- first_day_rule
- correction_workflow
- billing_rule
- performance_data_rule

### PerformanceMetric

Performance signal by employee, customer, site, shift, or date.

Key fields:

- id
- employeeId
- customerId
- siteId
- shiftId
- metricDate
- metricType
- value
- unit
- source
- notes

Examples:

- orders_per_hour
- units_processed
- error_count
- productivity_score
- training_needed

### OperationalCase

Generic case for exceptions and open work.

Key fields:

- id
- type
- status
- priority
- title
- description
- ownerId
- employeeId
- customerId
- siteId
- partnerCompanyId
- vehicleGroupId
- dueDate
- amount
- currency
- nextStep
- outcome
- createdAt
- updatedAt

### DocumentStatus

Status-level tracking for documents without necessarily storing sensitive files.

Key fields:

- id
- employeeId
- partnerCompanyId
- documentType
- status
- validFrom
- validUntil
- source
- externalLocation
- notes

### ProjectFinancialSnapshot

Weekly or monthly profitability snapshot.

Key fields:

- id
- customerId
- siteId
- periodStart
- periodEnd
- expectedRevenue
- directLaborCost
- transportCost
- accommodationCost
- overheadCost
- otherCost
- grossMargin
- status
- notes

## Key Relationships

- PartnerCompany has many Employees
- PartnerCompany has many Coordinators
- Customer has many Sites
- Customer has many CustomerRules
- Site has many Shifts
- Site has many Positions
- Employee has many Assignments
- Employee has many TimeEntries
- TimeEntry has many TimeIssues
- Employee can belong to one VehicleGroup
- Employee can belong to one Accommodation
- OperationalCase can link to Employee, Customer, Site, PartnerCompany, VehicleGroup
- ProjectFinancialSnapshot belongs to Customer and optionally Site

## Critical Status Enums

### EmployeeStatus

- announced
- created
- planned
- appeared
- active
- no_show
- replaced
- sick
- vacation
- inactive

### AssignmentStatus

- planned
- confirmed
- appeared
- missed
- replaced
- completed
- cancelled

### TimeEntryStatus

- imported
- unreviewed
- suspicious
- under_review
- corrected
- final
- billable
- excluded

### TimeIssueStatus

- open
- assigned_to_foreman
- sent_to_customer
- corrected
- rejected
- resolved

### CaseStatus

- open
- in_progress
- waiting_for_partner
- waiting_for_customer
- waiting_for_management
- resolved
- cancelled

### CasePriority

- low
- normal
- high
- critical
