# MVP Scope

## MVP Goal

Build the first working vertical slice of a Workforce Operations Control OS.

The MVP should make daily operational reality visible:

- who is planned
- who appeared
- who is active
- who is not yet productive
- which time issues are open
- which cases are open
- which customer rules apply
- which areas need management attention

## Build First

### 1. Employees

- create employee
- list employees
- view employee detail
- update employee status
- assign partner company
- assign customer/site/shift/position
- store card number/external ID
- store restrictions

### 2. Partner Companies and Coordinators

- create partner company
- create coordinator
- link employees to partner companies and coordinators

### 3. Customers and Sites

- create customer
- create site
- view customer/site relationships

### 4. Onboarding Pipeline

- list announced and new employees
- track onboarding status
- assign card number
- mark system-created
- mark foreman-informed
- mark first pick confirmed
- mark active or no-show
- create no-show case when relevant

### 5. Assignments

- create simple assignment
- assign employee to date/customer/site/shift/position
- show assignment status
- flag restriction conflicts manually or with simple validation

### 6. Customer Rules

- create customer rule
- select type
- store description and JSON config
- view rules by customer/site

### 7. Time Issues

- create time entry manually
- create time issue manually
- update issue status
- link issue to employee and customer/site
- show open time issues in dashboard

### 8. Operational Case Board

- create case
- assign owner
- set status, priority, due date, amount
- link to employee/customer/partner/vehicle group
- update next step and outcome
- filter by status/priority/type/owner

### 9. Management Dashboard

Show:

- active employees
- planned employees today
- no-shows
- open onboarding items
- open time issues
- open cases
- high-priority cases
- customers with open issues
- partner companies with no-shows or open cases

## Build Later

- automatic import from customer systems
- advanced performance analytics
- profitability engine
- transport and accommodation deep modules
- document storage
- payroll/accounting integration
- native mobile app
- AI scheduling
- automatic route optimization
- complex role permissions

## MVP Success

The MVP succeeds if management, dispatch, backoffice, and foremen can see and update the operational state of workers and exceptions without relying only on Excel, paper, and memory.
