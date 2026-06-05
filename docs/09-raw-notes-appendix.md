# Raw Notes Appendix — Condensed

This appendix gives background context. It should not override the product scope.

## Management Needs

- weekly profitability by customer/project
- visibility into direct and indirect costs
- control of open issues
- reduction of person dependency
- better planning visibility
- support for new customer acquisition without operational chaos

## Recurring Operational Issues

- manual time reconciliation
- paper time sheets
- scans and emails
- customer system corrections
- no-shows
- onboarding uncertainty
- unclear responsibility chains
- document updates
- fuel receipt handling
- vehicle fine assignment
- partner reimbursements

## Site Reality

At Jager-like sites:

- goods flow is already digitally managed by customer systems
- workers scan goods and use mobile devices
- warehouse processes follow customer rules
- performance may be tracked by customer system IDs
- the company still needs its own workforce control layer
- some workers informally train others due to language and experience

## Important Product Boundary

Do not build the goods-flow system.

Build the workforce-flow system.

Goods flow:

Goods → Barcode → Storage → Order → Picking → Output

Workforce flow:

Worker → Onboarding → Shift → Work → Time → Performance → Billing → Profitability

## Edge Cases

Edge cases are real but should not become first-class modules unless repeated and strategically important.

Use OperationalCase for:

- fines
- reimbursements
- missing fuel receipts
- complaints
- document requests
- partner follow-up
- unclear driver responsibility
