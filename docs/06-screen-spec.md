# Screen Specification V1

## 1. Dashboard

Purpose:
Management control tower.

Widgets:

- Active employees
- Planned today
- Appeared today
- No-shows today
- Open onboarding items
- Open time issues
- Open operational cases
- High-priority cases
- Customers with open issues
- Partner companies with open issues

Tables:

- Latest no-shows
- Open time issues
- Overdue cases
- New employees starting soon

## 2. Employees

List columns:

- Name
- Status
- Partner company
- Customer
- Site
- Shift
- Position
- Card number
- Restrictions
- Updated at

Filters:

- status
- partner company
- customer
- site
- shift
- no-shows
- active/inactive

Actions:

- create employee
- update status
- open detail
- create assignment
- create case

## 3. Employee Detail

Sections:

- profile
- current status
- partner/coordinator
- current assignment
- restrictions
- onboarding status
- recent time issues
- recent cases
- document statuses
- notes

## 4. Onboarding

Kanban or table by status:

- announced
- document received
- card assigned
- customer system created
- foreman informed
- first pick confirmed
- active
- no-show / replacement needed

Actions:

- advance status
- assign card number
- mark foreman informed
- mark first pick confirmed
- mark no-show
- create replacement case

## 5. Planning

MVP table view.

Columns:

- date
- employee
- customer
- site
- shift
- position
- assignment status
- restrictions
- notes

Actions:

- create assignment
- update status
- flag conflict
- create case

## 6. Time Validation

Tables:

- time entries
- open time issues
- suspicious entries

Columns:

- date
- employee
- customer
- site
- raw hours
- validated hours
- issue type
- status
- assigned to
- next step

Actions:

- create time entry
- create issue
- update status
- mark final
- mark billable

## 7. Customer Rules

List:

- customer
- site
- rule type
- name
- active
- summary

Detail:

- description
- JSON config
- examples
- notes

## 8. Operational Cases

Board/list with filters.

Columns:

- type
- title
- status
- priority
- owner
- related employee
- related customer/site
- partner
- amount
- due date
- next step

Actions:

- create case
- update status
- assign owner
- link entity
- add outcome
- close case

## 9. Customers and Sites

Basic master data.

Views:

- customer list
- site list
- customer detail with sites, rules, open cases, assignments
