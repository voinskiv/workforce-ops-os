import {
  appUsers,
  assignments,
  byId,
  cases,
  coordinators,
  customerRules,
  customers,
  employees,
  partnerCompanies,
  positions,
  restrictions,
  shifts,
  sites,
  timeEntries,
  timeIssues,
  type CasePriority,
  type CaseStatus,
  type CaseType,
  type EmployeeStatus,
  type OnboardingStatus,
  type TimeIssueStatus,
} from "@/lib/data/demo-data";
import { hasDatabaseUrl, prisma } from "@/lib/db/prisma";
import { formatLabel } from "@/lib/format";

export const employeeStatuses: EmployeeStatus[] = [
  "announced",
  "created",
  "planned",
  "appeared",
  "active",
  "no_show",
  "replaced",
  "sick",
  "vacation",
  "inactive",
];

export const onboardingStatuses: OnboardingStatus[] = [
  "not_started",
  "announced",
  "document_received",
  "card_assigned",
  "customer_system_created",
  "foreman_informed",
  "first_workday_planned",
  "first_pick_confirmed",
  "active",
  "no_show",
  "replacement_requested",
];

export const caseStatuses: CaseStatus[] = [
  "open",
  "in_progress",
  "waiting_for_partner",
  "waiting_for_customer",
  "waiting_for_management",
  "resolved",
  "cancelled",
];

export const caseTypes: CaseType[] = [
  "no_show",
  "time_error",
  "worker_complaint",
  "missing_document",
  "customer_document_request",
  "fuel_receipt",
  "reimbursement",
  "fine",
  "partner_claim",
  "vehicle_problem",
  "customer_problem",
  "other",
];

export const casePriorities: CasePriority[] = ["low", "normal", "high", "critical"];

export const timeIssueStatuses: TimeIssueStatus[] = [
  "open",
  "assigned_to_foreman",
  "sent_to_customer",
  "corrected",
  "rejected",
  "resolved",
];

export const timeEntryStatuses = [
  "imported",
  "unreviewed",
  "suspicious",
  "under_review",
  "corrected",
  "final",
  "billable",
  "excluded",
];

const openCaseStatuses = new Set<CaseStatus>([
  "open",
  "in_progress",
  "waiting_for_partner",
  "waiting_for_customer",
  "waiting_for_management",
]);

const openTimeIssueStatuses = new Set([
  "open",
  "assigned_to_foreman",
  "sent_to_customer",
]);

const openOnboardingStatuses = new Set<OnboardingStatus>([
  "not_started",
  "announced",
  "document_received",
  "card_assigned",
  "customer_system_created",
  "foreman_informed",
  "first_workday_planned",
  "first_pick_confirmed",
  "replacement_requested",
]);

const demoUpdatedAt = new Date("2026-06-05T12:00:00.000Z");

export type EmployeeFilters = {
  status?: string;
  onboardingStatus?: string;
  partnerCompanyId?: string;
  customerId?: string;
};

export type CaseFilters = {
  status?: string;
  type?: string;
  priority?: string;
};

export type TimeValidationFilters = {
  status?: string;
  customerId?: string;
  issueType?: string;
};

export type EmployeeRow = {
  id: string;
  displayName: string;
  status: string;
  onboardingStatus: string;
  partnerCompany: string;
  customer: string;
  site: string;
  shift: string;
  position: string;
  cardNumber: string;
  restrictionCount: number;
  firstWorkday?: Date | null;
  assignmentDate?: Date | null;
  assignmentStatus?: string | null;
  assignmentCustomer: string;
  assignmentSite: string;
  assignmentShift: string;
  assignmentPosition: string;
  updatedAt?: Date | null;
};

export type AssignmentView = {
  id: string;
  date: Date;
  status: string;
  customer: string;
  site: string;
  shift: string;
  position: string;
};

export type EmployeeDetail = EmployeeRow & {
  firstName: string;
  lastName: string;
  phone: string;
  language: string;
  externalSystemId: string;
  firstWorkday?: Date | null;
  notes: string;
  coordinator: string;
  currentAssignment?: AssignmentView | null;
  restrictions: {
    id: string;
    type: string;
    severity: string;
    reason: string;
    active: boolean;
  }[];
  cases: CaseRow[];
  timeIssues: TimeIssueRow[];
  timeEntries: TimeEntryRow[];
};

export type CaseRow = {
  id: string;
  type: string;
  status: string;
  priority: string;
  title: string;
  owner: string;
  employee: string;
  customer: string;
  site: string;
  partnerCompany: string;
  dueDate?: Date | null;
  amount?: number | null;
  currency: string;
  nextStep: string;
  outcome: string;
  createdAt?: Date | null;
};

export type TimeIssueRow = {
  id: string;
  type: string;
  status: string;
  employee: string;
  employeeId: string;
  customer: string;
  site: string;
  assignedTo: string;
  notes: string;
  nextStep: string;
  resolution: string;
  relatedRule: string;
  ruleImpact: string;
  detectedAt?: Date | null;
};

export type TimeEntryRow = {
  id: string;
  employee: string;
  employeeId: string;
  customer: string;
  site: string;
  workDate: Date;
  source: string;
  rawHours?: number | null;
  validatedHours?: number | null;
  breakMinutes?: number | null;
  status: string;
  notes: string;
  issueCount: number;
  issueTypes: string[];
};

export type CustomerRuleRow = {
  id: string;
  customer: string;
  site: string;
  type: string;
  name: string;
  active: boolean;
  description: string;
  exampleImpact: string;
  configSummary: string;
};

export type TimeValidationData = {
  entries: TimeEntryRow[];
  issues: TimeIssueRow[];
  filters: {
    statuses: string[];
    issueTypes: string[];
    customers: SelectOption[];
  };
};

export type SelectOption = {
  id: string;
  name: string;
};

export type DashboardData = {
  cards: {
    totalEmployees: number;
    activeEmployees: number;
    plannedEmployees: number;
    noShows: number;
    openOnboardingItems: number;
    openTimeIssues: number;
    openCases: number;
    highPriorityCases: number;
    criticalTimeIssues: number;
    waitingCustomerTimeIssues: number;
    correctedFinalExamples: number;
  };
  latestNoShows: EmployeeRow[];
  openTimeIssues: TimeIssueRow[];
  timeSignals: {
    criticalIssues: TimeIssueRow[];
    waitingForCustomer: TimeIssueRow[];
    correctedFinalEntries: TimeEntryRow[];
  };
  urgentCases: CaseRow[];
  newEmployees: EmployeeRow[];
};

export type WeeklyDecisionRow = {
  id: string;
  topic: string;
  area: string;
  risk: "stabil" | "beobachten" | "kritisch";
  owner: string;
  nextStep: string;
  dueDate?: Date | null;
  status: string;
  href: string;
};

export type WeeklyCustomerSiteRiskRow = {
  id: string;
  customer: string;
  site: string;
  openTimeIssues: number;
  noShows: number;
  openCases: number;
  highPriorityCases: number;
  risk: "stabil" | "beobachten" | "kritisch";
  href: string;
};

export type WeeklyPartnerQualityRow = {
  id: string;
  partnerCompany: string;
  activeEmployees: number;
  noShows: number;
  openCases: number;
  risk: "stabil" | "beobachten" | "kritisch";
  href: string;
};

export type WeeklyControlData = {
  cards: {
    plannedEmployees: number;
    activeEmployees: number;
    noShows: number;
    openOnboardingItems: number;
    openTimeIssues: number;
    openCases: number;
    highPriorityCases: number;
    casesWithoutOwner: number;
  };
  managementSummary: string;
  criticalDecisions: WeeklyDecisionRow[];
  customerSiteRisks: WeeklyCustomerSiteRiskRow[];
  partnerQuality: WeeklyPartnerQualityRow[];
  billingReadiness: {
    open: number;
    assignedToForeman: number;
    sentToCustomer: number;
    corrected: number;
    finalBillableExamples: TimeEntryRow[];
  };
};

type WeeklyAssignmentRow = {
  employeeId: string;
  customer: string;
  site: string;
  date: Date;
  status: string;
};

function issueRuleType(type: string) {
  if (type.includes("pause") || type.includes("break")) return "break_rule";
  if (type.includes("first_day")) return "first_day_rule";
  if (type.includes("billing")) return "billing_rule";
  if (
    type.includes("check_out") ||
    type.includes("manual_correction") ||
    type.includes("customer_correction")
  ) {
    return "correction_workflow";
  }
  return "correction_workflow";
}

function issueNextStep(status: string, assignedTo?: string | null) {
  if (status === "open") return "an Vorarbeiter zuweisen";
  if (status === "assigned_to_foreman") return "Vorarbeiter prueft Ist-Zeit";
  if (status === "sent_to_customer") return "an Kunde zur Korrektur";
  if (status === "corrected") return "validieren und final setzen";
  if (status === "resolved") return "abgeschlossen";
  if (status === "rejected") return "Ablehnung pruefen";
  return assignedTo ? `${assignedTo} klaert naechsten Schritt` : "-";
}

function ruleImpact(type: string) {
  const impacts: Record<string, string> = {
    break_rule: "Erklaert, ob eine Pause automatisch abgezogen wurde oder zu lang wirkt.",
    first_day_rule: "Erklaert Sonderbehandlung am ersten Arbeitstag.",
    correction_workflow: "Legt fest, ob Vorarbeiter oder Kunde die Korrektur bestaetigen muss.",
    billing_rule: "Zeigt, welche Stunden als final / abrechenbar gelten.",
    performance_data_rule: "Erklaert, wie Kundendaten mit Mitarbeiter-IDs abgeglichen werden.",
    contact_rule: "Legt den Eskalationsweg fuer operative Rueckfragen fest.",
  };
  return impacts[type] ?? "Kundenspezifische Regel fuer operative Klaerung.";
}

function ruleConfigSummary(config: unknown) {
  if (!config || typeof config !== "object") return "-";
  return Object.entries(config as Record<string, unknown>)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(", ");
}

function findDemoRule(customerId?: string | null, siteId?: string | null, type?: string) {
  return customerRules.find(
    (rule) =>
      rule.customerId === customerId &&
      rule.type === type &&
      (!rule.siteId || !siteId || rule.siteId === siteId),
  );
}

function startOfWeek(value: Date) {
  const date = new Date(value);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function endOfWeek(value: Date) {
  const date = startOfWeek(value);
  date.setDate(date.getDate() + 7);
  return date;
}

function inRange(value: Date | null | undefined, start: Date, end: Date) {
  if (!value) return false;
  const time = value.getTime();
  return time >= start.getTime() && time < end.getTime();
}

function riskLabel(score: {
  highPriorityCases?: number;
  openTimeIssues?: number;
  noShows?: number;
  openCases?: number;
}) {
  if (
    (score.highPriorityCases ?? 0) > 0 ||
    (score.openTimeIssues ?? 0) >= 2 ||
    (score.noShows ?? 0) >= 2
  ) {
    return "kritisch" as const;
  }
  if (
    (score.openTimeIssues ?? 0) > 0 ||
    (score.noShows ?? 0) > 0 ||
    (score.openCases ?? 0) > 0
  ) {
    return "beobachten" as const;
  }
  return "stabil" as const;
}

function decisionRiskFromCase(item: CaseRow) {
  if (["critical", "high"].includes(item.priority)) return "kritisch" as const;
  if (openCaseStatuses.has(item.status as CaseStatus)) return "beobachten" as const;
  return "stabil" as const;
}

function decisionRiskFromIssue(item: TimeIssueRow) {
  if (["missing_check_out", "unusually_long_shift"].includes(item.type)) {
    return "kritisch" as const;
  }
  if (openTimeIssueStatuses.has(item.status)) return "beobachten" as const;
  return "stabil" as const;
}

async function tryDb<T>(query: () => Promise<T>, fallback: () => T | Promise<T>) {
  if (!hasDatabaseUrl()) return fallback();

  try {
    return await query();
  } catch {
    return fallback();
  }
}

function entityName(items: SelectOption[], id?: string | null) {
  return byId(items, id)?.name ?? "-";
}

function toEmployeeRow(employee: {
  id: string;
  firstName: string;
  lastName: string;
  displayName?: string | null;
  status: string;
  onboardingStatus: string;
  externalCardNumber?: string | null;
  firstWorkday?: Date | null;
  updatedAt?: Date;
  _count?: { restrictions: number };
  partnerCompany?: { name: string } | null;
  currentCustomer?: { name: string } | null;
  currentSite?: { name: string } | null;
  currentShift?: { name: string } | null;
  currentPosition?: { name: string } | null;
  assignments?: {
    date: Date;
    status: string;
    customer: { name: string };
    site?: { name: string } | null;
    shift?: { name: string } | null;
    position?: { name: string } | null;
  }[];
}): EmployeeRow {
  const assignment = employee.assignments?.[0];

  return {
    id: employee.id,
    displayName:
      employee.displayName ?? `${employee.firstName} ${employee.lastName}`,
    status: employee.status,
    onboardingStatus: employee.onboardingStatus,
    partnerCompany: employee.partnerCompany?.name ?? "-",
    customer: employee.currentCustomer?.name ?? "-",
    site: employee.currentSite?.name ?? "-",
    shift: employee.currentShift?.name ?? "-",
    position: employee.currentPosition?.name ?? "-",
    cardNumber: employee.externalCardNumber ?? "-",
    restrictionCount: employee._count?.restrictions ?? 0,
    firstWorkday: employee.firstWorkday,
    assignmentDate: assignment?.date,
    assignmentStatus: assignment?.status,
    assignmentCustomer: assignment?.customer.name ?? employee.currentCustomer?.name ?? "-",
    assignmentSite: assignment?.site?.name ?? employee.currentSite?.name ?? "-",
    assignmentShift: assignment?.shift?.name ?? employee.currentShift?.name ?? "-",
    assignmentPosition:
      assignment?.position?.name ?? employee.currentPosition?.name ?? "-",
    updatedAt: employee.updatedAt,
  };
}

function demoEmployeeRow(employee: (typeof employees)[number]): EmployeeRow {
  const assignment = assignments
    .filter((item) => item.employeeId === employee.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

  return {
    id: employee.id,
    displayName: employee.displayName,
    status: employee.status,
    onboardingStatus: employee.onboardingStatus,
    partnerCompany: entityName(partnerCompanies, employee.partnerCompanyId),
    customer: entityName(customers, employee.currentCustomerId),
    site: entityName(sites, employee.currentSiteId),
    shift: entityName(shifts, employee.currentShiftId),
    position: entityName(positions, employee.currentPositionId),
    cardNumber: employee.externalCardNumber ?? "-",
    restrictionCount: restrictions.filter((item) => item.employeeId === employee.id)
      .length,
    firstWorkday: employee.firstWorkday,
    assignmentDate: assignment?.date,
    assignmentStatus: assignment?.status,
    assignmentCustomer: entityName(customers, assignment?.customerId ?? employee.currentCustomerId),
    assignmentSite: entityName(sites, assignment?.siteId ?? employee.currentSiteId),
    assignmentShift: entityName(shifts, assignment?.shiftId ?? employee.currentShiftId),
    assignmentPosition: entityName(
      positions,
      assignment?.positionId ?? employee.currentPositionId,
    ),
    updatedAt: demoUpdatedAt,
  };
}

function demoCaseRow(item: (typeof cases)[number]): CaseRow {
  const employee = byId(employees, item.employeeId);
  return {
    id: item.id,
    type: item.type,
    status: item.status,
    priority: item.priority,
    title: item.title,
    owner: entityName(appUsers, item.ownerId),
    employee: employee?.displayName ?? "-",
    customer: entityName(customers, item.customerId),
    site: entityName(sites, item.siteId),
    partnerCompany: entityName(partnerCompanies, item.partnerCompanyId),
    dueDate: item.dueDate,
    amount: item.amount,
    currency: item.currency,
    nextStep: item.nextStep ?? "-",
    outcome: item.outcome ?? "-",
    createdAt: item.createdAt,
  };
}

function demoTimeIssueRow(item: (typeof timeIssues)[number]): TimeIssueRow {
  const employee = byId(employees, item.employeeId);
  const timeEntry = byId(timeEntries, item.timeEntryId);
  const ruleType = issueRuleType(item.type);
  const rule = findDemoRule(timeEntry?.customerId, timeEntry?.siteId, ruleType);
  return {
    id: item.id,
    type: item.type,
    status: item.status,
    employee: employee?.displayName ?? "-",
    employeeId: item.employeeId,
    customer: entityName(customers, timeEntry?.customerId),
    site: entityName(sites, timeEntry?.siteId),
    assignedTo: item.assignedTo ?? "-",
    notes: item.notes ?? item.resolution ?? "-",
    nextStep: issueNextStep(item.status, item.assignedTo),
    resolution: item.resolution ?? "-",
    relatedRule: rule?.name ?? "-",
    ruleImpact: rule ? ruleImpact(rule.type) : "-",
    detectedAt: item.detectedAt,
  };
}

function demoTimeEntryRow(item: (typeof timeEntries)[number]): TimeEntryRow {
  const employee = byId(employees, item.employeeId);
  const entryIssues = timeIssues.filter((issue) => issue.timeEntryId === item.id);
  return {
    id: item.id,
    employee: employee?.displayName ?? "-",
    employeeId: item.employeeId,
    customer: entityName(customers, item.customerId),
    site: entityName(sites, item.siteId),
    workDate: item.workDate,
    source: item.source ?? "-",
    rawHours: item.rawHours,
    validatedHours: item.validatedHours,
    breakMinutes: item.breakMinutes,
    status: item.status,
    notes: item.notes ?? "-",
    issueCount: entryIssues.length,
    issueTypes: entryIssues.map((issue) => issue.type),
  };
}

function filterTimeEntries(rows: TimeEntryRow[], filters: TimeValidationFilters) {
  return rows.filter((entry) => {
    if (filters.status && timeEntryStatuses.includes(filters.status)) {
      if (entry.status !== filters.status) return false;
    }
    if (
      filters.status &&
      timeIssueStatuses.includes(filters.status as TimeIssueStatus)
    ) {
      const entryIssues = timeIssues.filter((issue) => issue.timeEntryId === entry.id);
      if (!entryIssues.some((issue) => issue.status === filters.status)) return false;
    }
    if (
      filters.customerId &&
      entry.customer !== entityName(customers, filters.customerId)
    ) {
      return false;
    }
    if (filters.issueType && !entry.issueTypes.includes(filters.issueType)) {
      return false;
    }
    return true;
  });
}

function filterTimeIssues(rows: TimeIssueRow[], filters: TimeValidationFilters) {
  return rows.filter((issue) => {
    if (
      filters.status &&
      timeIssueStatuses.includes(filters.status as TimeIssueStatus) &&
      issue.status !== filters.status
    ) {
      return false;
    }
    if (filters.status && timeEntryStatuses.includes(filters.status)) {
      const sourceIssue = timeIssues.find((item) => item.id === issue.id);
      const sourceEntry = timeEntries.find(
        (entry) => entry.id === sourceIssue?.timeEntryId,
      );
      if (sourceEntry?.status !== filters.status) return false;
    }
    if (
      filters.customerId &&
      issue.customer !== entityName(customers, filters.customerId)
    ) {
      return false;
    }
    if (filters.issueType && issue.type !== filters.issueType) return false;
    return true;
  });
}

function toCustomerRuleRow(rule: {
  id: string;
  type: string;
  name: string;
  description?: string | null;
  active: boolean;
  configJson?: unknown;
  customer?: { name: string } | null;
  site?: { name: string } | null;
}): CustomerRuleRow {
  return {
    id: rule.id,
    customer: rule.customer?.name ?? "-",
    site: rule.site?.name ?? "alle Standorte",
    type: rule.type,
    name: rule.name,
    active: rule.active,
    description: rule.description ?? "-",
    exampleImpact: ruleImpact(rule.type),
    configSummary: ruleConfigSummary(rule.configJson),
  };
}

function demoCustomerRuleRow(rule: (typeof customerRules)[number]): CustomerRuleRow {
  return toCustomerRuleRow({
    ...rule,
    customer: byId(customers, rule.customerId),
    site: byId(sites, rule.siteId),
  });
}

function filterEmployees(rows: EmployeeRow[], filters: EmployeeFilters) {
  return rows.filter((employee) => {
    if (filters.status && employee.status !== filters.status) return false;
    if (
      filters.onboardingStatus &&
      employee.onboardingStatus !== filters.onboardingStatus
    ) {
      return false;
    }
    if (
      filters.partnerCompanyId &&
      employee.partnerCompany !== entityName(partnerCompanies, filters.partnerCompanyId)
    ) {
      return false;
    }
    if (
      filters.customerId &&
      employee.customer !== entityName(customers, filters.customerId)
    ) {
      return false;
    }
    return true;
  });
}

function filterCases(rows: CaseRow[], filters: CaseFilters) {
  return rows.filter((item) => {
    if (filters.status && item.status !== filters.status) return false;
    if (filters.type && item.type !== filters.type) return false;
    if (filters.priority && item.priority !== filters.priority) return false;
    return true;
  });
}

export async function getFilterOptions() {
  return tryDb(
    async () => {
      const [partnerOptions, customerOptions, userOptions, employeeOptions] =
        await Promise.all([
          prisma.partnerCompany.findMany({ orderBy: { name: "asc" } }),
          prisma.customer.findMany({ orderBy: { name: "asc" } }),
          prisma.appUser.findMany({ orderBy: { name: "asc" } }),
          prisma.employee.findMany({
            orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
            select: { id: true, displayName: true, firstName: true, lastName: true },
          }),
        ]);

      return {
        partnerCompanies: partnerOptions.map(({ id, name }) => ({ id, name })),
        customers: customerOptions.map(({ id, name }) => ({ id, name })),
        appUsers: userOptions.map(({ id, name }) => ({ id, name })),
        employees: employeeOptions.map((employee) => ({
          id: employee.id,
          name:
            employee.displayName ??
            `${employee.firstName} ${employee.lastName}`,
        })),
      };
    },
    () => ({
      partnerCompanies,
      customers,
      appUsers,
      employees: employees.map((employee) => ({
        id: employee.id,
        name: employee.displayName,
      })),
    }),
  );
}

export async function getEmployees(filters: EmployeeFilters = {}) {
  return tryDb(
    async () => {
      const rows = await prisma.employee.findMany({
        where: {
          status: filters.status ? (filters.status as never) : undefined,
          onboardingStatus: filters.onboardingStatus
            ? (filters.onboardingStatus as never)
            : undefined,
          partnerCompanyId: filters.partnerCompanyId || undefined,
          currentCustomerId: filters.customerId || undefined,
        },
        include: {
          partnerCompany: true,
          currentCustomer: true,
          currentSite: true,
          currentShift: true,
          currentPosition: true,
          _count: { select: { restrictions: true } },
          assignments: {
            include: {
              customer: true,
              site: true,
              shift: true,
              position: true,
            },
            orderBy: { date: "desc" },
            take: 1,
          },
        },
        orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
      });

      return rows.map(toEmployeeRow);
    },
    () => filterEmployees(employees.map(demoEmployeeRow), filters),
  );
}

export async function getEmployeeDetail(id: string) {
  return tryDb<EmployeeDetail | null>(
    async () => {
      const employee = await prisma.employee.findUnique({
        where: { id },
        include: {
          partnerCompany: true,
          coordinator: true,
          currentCustomer: true,
          currentSite: true,
          currentShift: true,
          currentPosition: true,
          restrictions: { orderBy: { severity: "desc" } },
          assignments: {
            include: {
              customer: true,
              site: true,
              shift: true,
              position: true,
            },
            orderBy: { date: "desc" },
            take: 1,
          },
          cases: {
            include: {
              owner: true,
              customer: true,
              site: true,
              partnerCompany: true,
              employee: true,
            },
            orderBy: { updatedAt: "desc" },
            take: 8,
          },
          timeIssues: {
            include: {
              timeEntry: { include: { customer: true, site: true } },
            },
            orderBy: { detectedAt: "desc" },
            take: 8,
          },
          timeEntries: {
            include: {
              customer: true,
              site: true,
              issues: true,
            },
            orderBy: { workDate: "desc" },
            take: 8,
          },
        },
      });

      if (!employee) return null;

      const row = toEmployeeRow(employee);
      const assignment = employee.assignments[0];

      return {
        ...row,
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone ?? "-",
        language: employee.language ?? "-",
        externalSystemId: employee.externalSystemId ?? "-",
        firstWorkday: employee.firstWorkday,
        notes: employee.notes ?? "-",
        coordinator: employee.coordinator?.name ?? "-",
        currentAssignment: assignment
          ? {
              id: assignment.id,
              date: assignment.date,
              status: assignment.status,
              customer: assignment.customer.name,
              site: assignment.site?.name ?? "-",
              shift: assignment.shift?.name ?? "-",
              position: assignment.position?.name ?? "-",
            }
          : null,
        restrictions: employee.restrictions.map((restriction) => ({
          id: restriction.id,
          type: restriction.type,
          severity: restriction.severity,
          reason: restriction.reason ?? "-",
          active: restriction.active,
        })),
        cases: employee.cases.map((item) => ({
          id: item.id,
          type: item.type,
          status: item.status,
          priority: item.priority,
          title: item.title,
          owner: item.owner?.name ?? "-",
          employee: employee.displayName ?? `${employee.firstName} ${employee.lastName}`,
          customer: item.customer?.name ?? "-",
          site: item.site?.name ?? "-",
          partnerCompany: item.partnerCompany?.name ?? "-",
          dueDate: item.dueDate,
          amount: item.amount,
          currency: item.currency,
          nextStep: item.nextStep ?? "-",
          outcome: item.outcome ?? "-",
          createdAt: item.createdAt,
        })),
        timeIssues: employee.timeIssues.map((issue) => {
          const ruleType = issueRuleType(issue.type);
          return {
            id: issue.id,
            type: issue.type,
            status: issue.status,
            employee: row.displayName,
            employeeId: employee.id,
            customer: issue.timeEntry?.customer?.name ?? "-",
            site: issue.timeEntry?.site?.name ?? "-",
            assignedTo: issue.assignedTo ?? "-",
            notes: issue.notes ?? issue.resolution ?? "-",
            nextStep: issueNextStep(issue.status, issue.assignedTo),
            resolution: issue.resolution ?? "-",
            relatedRule: formatLabel(ruleType),
            ruleImpact: ruleImpact(ruleType),
            detectedAt: issue.detectedAt,
          };
        }),
        timeEntries: employee.timeEntries.map((entry) => ({
          id: entry.id,
          employee: row.displayName,
          employeeId: employee.id,
          customer: entry.customer?.name ?? "-",
          site: entry.site?.name ?? "-",
          workDate: entry.workDate,
          source: entry.source ?? "-",
          rawHours: entry.rawHours,
          validatedHours: entry.validatedHours,
          breakMinutes: entry.breakMinutes,
          status: entry.status,
          notes: entry.notes ?? "-",
          issueCount: entry.issues.length,
          issueTypes: entry.issues.map((issue) => issue.type),
        })),
      };
    },
    () => {
      const employee = byId(employees, id);
      if (!employee) return null;
      const row = demoEmployeeRow(employee);
      const assignment = assignments
        .filter((item) => item.employeeId === id)
        .sort((a, b) => b.date.getTime() - a.date.getTime())[0];

      return {
        ...row,
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone ?? "-",
        language: employee.language ?? "-",
        externalSystemId: employee.externalSystemId ?? "-",
        firstWorkday: employee.firstWorkday,
        notes: employee.notes ?? "-",
        coordinator: entityName(coordinators, employee.coordinatorId),
        currentAssignment: assignment
          ? {
              id: assignment.id,
              date: assignment.date,
              status: assignment.status,
              customer: entityName(customers, assignment.customerId),
              site: entityName(sites, assignment.siteId),
              shift: entityName(shifts, assignment.shiftId),
              position: entityName(positions, assignment.positionId),
            }
          : null,
        restrictions: restrictions
          .filter((restriction) => restriction.employeeId === id)
          .map((restriction) => ({
            ...restriction,
            reason: restriction.reason ?? "-",
          })),
        cases: cases.filter((item) => item.employeeId === id).map(demoCaseRow),
        timeIssues: timeIssues
          .filter((issue) => issue.employeeId === id)
          .map(demoTimeIssueRow),
        timeEntries: timeEntries
          .filter((entry) => entry.employeeId === id)
          .map(demoTimeEntryRow),
      };
    },
  );
}

export async function getOnboardingEmployees() {
  const rows = await getEmployees();
  return onboardingStatuses.map((status) => ({
    status,
    employees: rows.filter((employee) => employee.onboardingStatus === status),
  }));
}

export async function getCases(filters: CaseFilters = {}) {
  return tryDb(
    async () => {
      const rows = await prisma.operationalCase.findMany({
        where: {
          status: filters.status ? (filters.status as never) : undefined,
          type: filters.type ? (filters.type as never) : undefined,
          priority: filters.priority ? (filters.priority as never) : undefined,
        },
        include: {
          owner: true,
          employee: true,
          customer: true,
          site: true,
          partnerCompany: true,
        },
        orderBy: [{ priority: "desc" }, { dueDate: "asc" }],
      });

      return rows.map((item) => ({
        id: item.id,
        type: item.type,
        status: item.status,
        priority: item.priority,
        title: item.title,
        owner: item.owner?.name ?? "-",
        employee: item.employee?.displayName ?? "-",
        customer: item.customer?.name ?? "-",
        site: item.site?.name ?? "-",
        partnerCompany: item.partnerCompany?.name ?? "-",
        dueDate: item.dueDate,
        amount: item.amount,
        currency: item.currency,
        nextStep: item.nextStep ?? "-",
        outcome: item.outcome ?? "-",
        createdAt: item.createdAt,
      }));
    },
    () => filterCases(cases.map(demoCaseRow), filters),
  );
}

export async function getCustomerRules(): Promise<CustomerRuleRow[]> {
  return tryDb(
    async () => {
      const rows = await prisma.customerRule.findMany({
        include: {
          customer: true,
          site: true,
        },
        orderBy: [{ customer: { name: "asc" } }, { type: "asc" }],
      });

      return rows.map(toCustomerRuleRow);
    },
    () => customerRules.map(demoCustomerRuleRow),
  );
}

export async function getTimeValidationData(
  filters: TimeValidationFilters = {},
): Promise<TimeValidationData> {
  return tryDb(
    async () => {
      const entryStatus = timeEntryStatuses.includes(filters.status ?? "")
        ? filters.status
        : undefined;
      const issueStatus = timeIssueStatuses.includes(
        filters.status as TimeIssueStatus,
      )
        ? filters.status
        : undefined;

      const issueRelationFilter =
        filters.issueType || issueStatus
          ? {
              some: {
                type: filters.issueType || undefined,
                status: issueStatus ? (issueStatus as never) : undefined,
              },
            }
          : undefined;

      const where = {
        status: entryStatus ? (entryStatus as never) : undefined,
        customerId: filters.customerId || undefined,
        issues: issueRelationFilter,
      };

      const [entryRows, issueRows, ruleRows, customerOptions] = await Promise.all([
        prisma.timeEntry.findMany({
          where,
          include: {
            employee: true,
            customer: true,
            site: true,
            issues: true,
          },
          orderBy: [{ workDate: "desc" }, { updatedAt: "desc" }],
        }),
        prisma.timeIssue.findMany({
          where: {
            status: issueStatus ? (issueStatus as never) : undefined,
            type: filters.issueType || undefined,
            timeEntry: {
              customerId: filters.customerId || undefined,
              status: entryStatus ? (entryStatus as never) : undefined,
            },
          },
          include: {
            employee: true,
            timeEntry: {
              include: {
                customer: true,
                site: true,
              },
            },
          },
          orderBy: { detectedAt: "desc" },
        }),
        prisma.customerRule.findMany({
          include: { customer: true, site: true },
          where: {
            active: true,
            customerId: filters.customerId || undefined,
          },
        }),
        prisma.customer.findMany({ orderBy: { name: "asc" } }),
      ]);

      const ruleForIssue = (issue: (typeof issueRows)[number]) => {
        const ruleType = issueRuleType(issue.type);
        return ruleRows.find(
          (rule) =>
            rule.customerId === issue.timeEntry?.customerId &&
            rule.type === ruleType &&
            (!rule.siteId ||
              !issue.timeEntry?.siteId ||
              rule.siteId === issue.timeEntry.siteId),
        );
      };

      const entries = entryRows.map((entry) => ({
        id: entry.id,
        employee:
          entry.employee.displayName ??
          `${entry.employee.firstName} ${entry.employee.lastName}`,
        employeeId: entry.employeeId,
        customer: entry.customer?.name ?? "-",
        site: entry.site?.name ?? "-",
        workDate: entry.workDate,
        source: entry.source ?? "-",
        rawHours: entry.rawHours,
        validatedHours: entry.validatedHours,
        breakMinutes: entry.breakMinutes,
        status: entry.status,
        notes: entry.notes ?? "-",
        issueCount: entry.issues.length,
        issueTypes: entry.issues.map((issue) => issue.type),
      }));

      const issues = issueRows.map((issue) => {
        const rule = ruleForIssue(issue);
        return {
          id: issue.id,
          type: issue.type,
          status: issue.status,
          employee:
            issue.employee.displayName ??
            `${issue.employee.firstName} ${issue.employee.lastName}`,
          employeeId: issue.employeeId,
          customer: issue.timeEntry?.customer?.name ?? "-",
          site: issue.timeEntry?.site?.name ?? "-",
          assignedTo: issue.assignedTo ?? "-",
          notes: issue.notes ?? "-",
          nextStep: issueNextStep(issue.status, issue.assignedTo),
          resolution: issue.resolution ?? "-",
          relatedRule: rule?.name ?? formatLabel(issueRuleType(issue.type)),
          ruleImpact: rule ? ruleImpact(rule.type) : ruleImpact(issueRuleType(issue.type)),
          detectedAt: issue.detectedAt,
        };
      });

      return {
        entries,
        issues,
        filters: {
          statuses: Array.from(
            new Set([
              ...entryRows.map((entry) => entry.status),
              ...timeIssueStatuses,
            ]),
          ),
          issueTypes: Array.from(new Set(issueRows.map((issue) => issue.type))),
          customers: customerOptions.map(({ id, name }) => ({ id, name })),
        },
      };
    },
    () => {
      const entries = filterTimeEntries(timeEntries.map(demoTimeEntryRow), filters);
      const issues = filterTimeIssues(timeIssues.map(demoTimeIssueRow), filters);

      return {
        entries,
        issues,
        filters: {
          statuses: Array.from(
            new Set([
              ...timeEntries.map((entry) => entry.status),
              ...timeIssueStatuses,
            ]),
          ),
          issueTypes: Array.from(new Set(timeIssues.map((issue) => issue.type))),
          customers,
        },
      };
    },
  );
}

async function getWeeklyAssignments(
  weekStart: Date,
  weekEnd: Date,
): Promise<WeeklyAssignmentRow[]> {
  return tryDb(
    async () => {
      const rows = await prisma.assignment.findMany({
        where: {
          date: {
            gte: weekStart,
            lt: weekEnd,
          },
        },
        include: {
          customer: true,
          site: true,
        },
      });

      return rows.map((assignment) => ({
        employeeId: assignment.employeeId,
        customer: assignment.customer.name,
        site: assignment.site?.name ?? "-",
        date: assignment.date,
        status: assignment.status,
      }));
    },
    () =>
      assignments
        .filter((assignment) => inRange(assignment.date, weekStart, weekEnd))
        .map((assignment) => ({
          employeeId: assignment.employeeId,
          customer: entityName(customers, assignment.customerId),
          site: entityName(sites, assignment.siteId),
          date: assignment.date,
          status: assignment.status,
        })),
  );
}

export async function getWeeklyControlData(): Promise<WeeklyControlData> {
  const referenceDate = hasDatabaseUrl() ? new Date() : demoUpdatedAt;
  const weekStart = startOfWeek(referenceDate);
  const weekEnd = endOfWeek(referenceDate);

  const [employeeRows, caseRows, timeData, filterOptions, weeklyAssignments] =
    await Promise.all([
      getEmployees(),
      getCases(),
      getTimeValidationData(),
      getFilterOptions(),
      getWeeklyAssignments(weekStart, weekEnd),
    ]);

  const openCases = caseRows.filter((item) =>
    openCaseStatuses.has(item.status as CaseStatus),
  );
  const highPriorityCases = openCases.filter((item) =>
    ["high", "critical"].includes(item.priority),
  );
  const casesWithoutOwner = openCases.filter((item) => item.owner === "-");
  const openIssues = timeData.issues.filter((issue) =>
    openTimeIssueStatuses.has(issue.status),
  );
  const noShowEmployees = employeeRows.filter(
    (employee) =>
      employee.status === "no_show" &&
      (inRange(employee.assignmentDate, weekStart, weekEnd) ||
        !employee.assignmentDate),
  );
  const newEmployees = employeeRows.filter((employee) =>
    openOnboardingStatuses.has(employee.onboardingStatus as OnboardingStatus),
  );
  const plannedEmployeeIds = new Set(
    weeklyAssignments
      .filter((assignment) => assignment.status !== "cancelled")
      .map((assignment) => assignment.employeeId),
  );
  const finalBillableExamples = timeData.entries.filter((entry) =>
    ["corrected", "final", "billable"].includes(entry.status),
  );

  const cards = {
    plannedEmployees: plannedEmployeeIds.size,
    activeEmployees: employeeRows.filter((employee) => employee.status === "active")
      .length,
    noShows: noShowEmployees.length,
    openOnboardingItems: newEmployees.length,
    openTimeIssues: openIssues.length,
    openCases: openCases.length,
    highPriorityCases: highPriorityCases.length,
    casesWithoutOwner: casesWithoutOwner.length,
  };

  const managementSummary = `Diese Woche sind ${cards.openCases} Vorgänge offen, davon ${cards.highPriorityCases} kritisch. ${cards.openTimeIssues} Zeitkorrekturen blockieren die Abrechnungsfreigabe. ${cards.openOnboardingItems} neue Mitarbeiter sind noch nicht aktiv bestätigt.`;

  const caseDecisions: WeeklyDecisionRow[] = openCases
    .filter(
      (item) =>
        ["high", "critical"].includes(item.priority) ||
        item.owner === "-" ||
        inRange(item.dueDate, weekStart, weekEnd) ||
        ["no_show", "fuel_receipt", "fine", "partner_claim", "customer_problem"].includes(
          item.type,
        ),
    )
    .map((item) => ({
      id: `case-${item.id}`,
      topic: item.title,
      area: formatLabel(item.type),
      risk: decisionRiskFromCase(item),
      owner: item.owner,
      nextStep:
        ["resolved", "cancelled"].includes(item.status) && item.outcome !== "-"
          ? item.outcome
          : item.nextStep,
      dueDate: item.dueDate,
      status: item.status,
      href: `/cases?type=${item.type}`,
    }));

  const issueDecisions: WeeklyDecisionRow[] = openIssues.map((issue) => ({
    id: `issue-${issue.id}`,
    topic: formatLabel(issue.type),
    area: "Zeitprüfung",
    risk: decisionRiskFromIssue(issue),
    owner: issue.assignedTo,
    nextStep: issue.nextStep,
    dueDate: issue.detectedAt,
    status: issue.status,
    href: `/time-validation?issueType=${issue.type}`,
  }));

  const onboardingDecisions: WeeklyDecisionRow[] = newEmployees
    .slice(0, 6)
    .map((employee) => ({
      id: `onboarding-${employee.id}`,
      topic: `${employee.displayName} noch nicht aktiv`,
      area: "Startkontrolle",
      risk:
        employee.onboardingStatus === "replacement_requested" ||
        employee.onboardingStatus === "no_show"
          ? ("kritisch" as const)
          : ("beobachten" as const),
      owner: employee.partnerCompany,
      nextStep: "Startkontrolle abschliessen oder Ersatz klaeren",
      dueDate: employee.assignmentDate,
      status: employee.onboardingStatus,
      href: "/onboarding",
    }));

  const criticalDecisions = [
    ...caseDecisions,
    ...issueDecisions,
    ...onboardingDecisions,
  ]
    .sort((a, b) => {
      const riskOrder = { kritisch: 0, beobachten: 1, stabil: 2 };
      return riskOrder[a.risk] - riskOrder[b.risk];
    })
    .slice(0, 14);

  const customerIdByName = new Map(
    filterOptions.customers.map((customer) => [customer.name, customer.id]),
  );
  const partnerIdByName = new Map(
    filterOptions.partnerCompanies.map((partner) => [partner.name, partner.id]),
  );

  const customerSiteMap = new Map<string, WeeklyCustomerSiteRiskRow>();
  const ensureCustomerSite = (customer: string, site: string) => {
    const key = `${customer}::${site}`;
    const existing = customerSiteMap.get(key);
    if (existing) return existing;
    const row: WeeklyCustomerSiteRiskRow = {
      id: key,
      customer,
      site,
      openTimeIssues: 0,
      noShows: 0,
      openCases: 0,
      highPriorityCases: 0,
      risk: "stabil",
      href: customerIdByName.has(customer)
        ? `/time-validation?customerId=${customerIdByName.get(customer)}`
        : "/time-validation",
    };
    customerSiteMap.set(key, row);
    return row;
  };

  weeklyAssignments.forEach((assignment) => {
    ensureCustomerSite(assignment.customer, assignment.site);
  });
  openIssues.forEach((issue) => {
    const row = ensureCustomerSite(issue.customer, issue.site);
    row.openTimeIssues += 1;
  });
  noShowEmployees.forEach((employee) => {
    const row = ensureCustomerSite(employee.assignmentCustomer, employee.assignmentSite);
    row.noShows += 1;
  });
  openCases.forEach((item) => {
    const row = ensureCustomerSite(item.customer, item.site);
    row.openCases += 1;
    if (["high", "critical"].includes(item.priority)) row.highPriorityCases += 1;
  });

  const customerSiteRisks = Array.from(customerSiteMap.values())
    .map((row) => ({
      ...row,
      risk: riskLabel(row),
    }))
    .sort((a, b) => {
      const riskOrder = { kritisch: 0, beobachten: 1, stabil: 2 };
      return (
        riskOrder[a.risk] - riskOrder[b.risk] ||
        b.openCases + b.openTimeIssues + b.noShows -
          (a.openCases + a.openTimeIssues + a.noShows)
      );
    });

  const partnerMap = new Map<string, WeeklyPartnerQualityRow>();
  filterOptions.partnerCompanies.forEach((partner) => {
    partnerMap.set(partner.name, {
      id: partner.id,
      partnerCompany: partner.name,
      activeEmployees: 0,
      noShows: 0,
      openCases: 0,
      risk: "stabil",
      href: `/employees?partnerCompanyId=${partner.id}`,
    });
  });
  employeeRows.forEach((employee) => {
    if (employee.partnerCompany === "-") return;
    const row =
      partnerMap.get(employee.partnerCompany) ??
      {
        id: employee.partnerCompany,
        partnerCompany: employee.partnerCompany,
        activeEmployees: 0,
        noShows: 0,
        openCases: 0,
        risk: "stabil" as const,
        href: partnerIdByName.has(employee.partnerCompany)
          ? `/employees?partnerCompanyId=${partnerIdByName.get(employee.partnerCompany)}`
          : "/employees",
      };
    if (employee.status === "active") row.activeEmployees += 1;
    if (employee.status === "no_show") row.noShows += 1;
    partnerMap.set(employee.partnerCompany, row);
  });
  openCases.forEach((item) => {
    if (item.partnerCompany === "-") return;
    const row = partnerMap.get(item.partnerCompany);
    if (row) row.openCases += 1;
  });

  const partnerQuality = Array.from(partnerMap.values())
    .map((row) => ({
      ...row,
      risk: riskLabel({
        noShows: row.noShows,
        openCases: row.openCases,
      }),
    }))
    .sort((a, b) => {
      const riskOrder = { kritisch: 0, beobachten: 1, stabil: 2 };
      return (
        riskOrder[a.risk] - riskOrder[b.risk] ||
        b.openCases + b.noShows - (a.openCases + a.noShows)
      );
    });

  return {
    cards,
    managementSummary,
    criticalDecisions,
    customerSiteRisks,
    partnerQuality,
    billingReadiness: {
      open: timeData.issues.filter((issue) => issue.status === "open").length,
      assignedToForeman: timeData.issues.filter(
        (issue) => issue.status === "assigned_to_foreman",
      ).length,
      sentToCustomer: timeData.issues.filter(
        (issue) => issue.status === "sent_to_customer",
      ).length,
      corrected: timeData.issues.filter((issue) => issue.status === "corrected")
        .length,
      finalBillableExamples,
    },
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const [employeeRows, caseRows] = await Promise.all([getEmployees(), getCases()]);

  const issueRows = await tryDb(
    async () => {
      const rows = await prisma.timeIssue.findMany({
        where: {
          status: {
            in: ["open", "assigned_to_foreman", "sent_to_customer"],
          },
        },
        include: {
          employee: true,
          timeEntry: { include: { customer: true, site: true } },
        },
        orderBy: { detectedAt: "desc" },
        take: 8,
      });

      return rows.map((issue) => ({
        id: issue.id,
        type: issue.type,
        status: issue.status,
        employee:
          issue.employee.displayName ??
          `${issue.employee.firstName} ${issue.employee.lastName}`,
        employeeId: issue.employeeId,
        customer: issue.timeEntry?.customer?.name ?? "-",
        site: issue.timeEntry?.site?.name ?? "-",
        assignedTo: issue.assignedTo ?? "-",
        notes: issue.notes ?? issue.resolution ?? "-",
        nextStep: issueNextStep(issue.status, issue.assignedTo),
        resolution: issue.resolution ?? "-",
        relatedRule: formatLabel(issueRuleType(issue.type)),
        ruleImpact: ruleImpact(issueRuleType(issue.type)),
        detectedAt: issue.detectedAt,
      }));
    },
    () =>
      timeIssues
        .filter((issue) => openTimeIssueStatuses.has(issue.status))
        .map(demoTimeIssueRow),
  );

  const correctedFinalEntries = await tryDb(
    async () => {
      const rows = await prisma.timeEntry.findMany({
        where: { status: { in: ["corrected", "final", "billable"] } },
        include: {
          employee: true,
          customer: true,
          site: true,
          issues: true,
        },
        orderBy: { workDate: "desc" },
        take: 5,
      });

      return rows.map((entry) => ({
        id: entry.id,
        employee:
          entry.employee.displayName ??
          `${entry.employee.firstName} ${entry.employee.lastName}`,
        employeeId: entry.employeeId,
        customer: entry.customer?.name ?? "-",
        site: entry.site?.name ?? "-",
        workDate: entry.workDate,
        source: entry.source ?? "-",
        rawHours: entry.rawHours,
        validatedHours: entry.validatedHours,
        breakMinutes: entry.breakMinutes,
        status: entry.status,
        notes: entry.notes ?? "-",
        issueCount: entry.issues.length,
        issueTypes: entry.issues.map((issue) => issue.type),
      }));
    },
    () =>
      timeEntries
        .filter((entry) => ["corrected", "final", "billable"].includes(entry.status))
        .map(demoTimeEntryRow),
  );

  const openCases = caseRows.filter((item) =>
    openCaseStatuses.has(item.status as CaseStatus),
  );
  const highPriorityCases = openCases.filter((item) =>
    ["high", "critical"].includes(item.priority),
  );

  return {
    cards: {
      totalEmployees: employeeRows.length,
      activeEmployees: employeeRows.filter((employee) => employee.status === "active")
        .length,
      plannedEmployees: employeeRows.filter(
        (employee) => employee.status === "planned",
      ).length,
      noShows: employeeRows.filter((employee) => employee.status === "no_show")
        .length,
      openOnboardingItems: employeeRows.filter((employee) =>
        openOnboardingStatuses.has(employee.onboardingStatus as OnboardingStatus),
      ).length,
      openTimeIssues: issueRows.length,
      openCases: openCases.length,
      highPriorityCases: highPriorityCases.length,
      criticalTimeIssues: issueRows.filter((issue) =>
        ["missing_check_out", "unusually_long_shift"].includes(issue.type),
      ).length,
      waitingCustomerTimeIssues: issueRows.filter(
        (issue) => issue.status === "sent_to_customer",
      ).length,
      correctedFinalExamples: correctedFinalEntries.length,
    },
    latestNoShows: employeeRows.filter((employee) => employee.status === "no_show"),
    openTimeIssues: issueRows,
    timeSignals: {
      criticalIssues: issueRows.filter((issue) =>
        ["missing_check_out", "unusually_long_shift"].includes(issue.type),
      ),
      waitingForCustomer: issueRows.filter(
        (issue) => issue.status === "sent_to_customer",
      ),
      correctedFinalEntries,
    },
    urgentCases: highPriorityCases.length > 0 ? highPriorityCases : openCases.slice(0, 5),
    newEmployees: employeeRows.filter((employee) =>
      openOnboardingStatuses.has(employee.onboardingStatus as OnboardingStatus),
    ),
  };
}

export function getNextOnboardingStatus(status: string) {
  const currentIndex = onboardingStatuses.indexOf(status as OnboardingStatus);
  if (currentIndex < 0 || currentIndex >= onboardingStatuses.length - 1) {
    return null;
  }

  const next = onboardingStatuses[currentIndex + 1];
  if (next === "no_show" || next === "replacement_requested") {
    return null;
  }
  return next;
}
