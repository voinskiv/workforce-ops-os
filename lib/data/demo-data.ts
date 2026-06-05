export type EmployeeStatus =
  | "announced"
  | "created"
  | "planned"
  | "appeared"
  | "active"
  | "no_show"
  | "replaced"
  | "sick"
  | "vacation"
  | "inactive";

export type OnboardingStatus =
  | "not_started"
  | "announced"
  | "document_received"
  | "card_assigned"
  | "customer_system_created"
  | "foreman_informed"
  | "first_workday_planned"
  | "first_pick_confirmed"
  | "active"
  | "no_show"
  | "replacement_requested";

export type AssignmentStatus =
  | "planned"
  | "confirmed"
  | "appeared"
  | "missed"
  | "replaced"
  | "completed"
  | "cancelled";

export type CaseStatus =
  | "open"
  | "in_progress"
  | "waiting_for_partner"
  | "waiting_for_customer"
  | "waiting_for_management"
  | "resolved"
  | "cancelled";

export type CasePriority = "low" | "normal" | "high" | "critical";

export type CaseType =
  | "no_show"
  | "time_error"
  | "worker_complaint"
  | "missing_document"
  | "customer_document_request"
  | "fuel_receipt"
  | "reimbursement"
  | "fine"
  | "partner_claim"
  | "vehicle_problem"
  | "customer_problem"
  | "other";

export type TimeIssueStatus =
  | "open"
  | "assigned_to_foreman"
  | "sent_to_customer"
  | "corrected"
  | "rejected"
  | "resolved";

export type SimpleEntity = {
  id: string;
  name: string;
};

export type DemoEmployee = {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  status: EmployeeStatus;
  onboardingStatus: OnboardingStatus;
  externalCardNumber?: string;
  externalSystemId?: string;
  phone?: string;
  language?: string;
  firstWorkday?: Date;
  notes?: string;
  partnerCompanyId?: string;
  coordinatorId?: string;
  currentCustomerId?: string;
  currentSiteId?: string;
  currentShiftId?: string;
  currentPositionId?: string;
};

export type DemoAssignment = {
  id: string;
  date: Date;
  status: AssignmentStatus;
  employeeId: string;
  customerId: string;
  siteId?: string;
  shiftId?: string;
  positionId?: string;
};

export type DemoRestriction = {
  id: string;
  employeeId: string;
  type: string;
  severity: string;
  reason?: string;
  active: boolean;
};

export type DemoCase = {
  id: string;
  type: CaseType;
  status: CaseStatus;
  priority: CasePriority;
  title: string;
  description?: string;
  ownerId?: string;
  employeeId?: string;
  customerId?: string;
  siteId?: string;
  partnerCompanyId?: string;
  dueDate?: Date;
  amount?: number;
  currency: string;
  nextStep?: string;
  outcome?: string;
  createdAt: Date;
};

export type DemoTimeEntry = {
  id: string;
  workDate: Date;
  source?: string;
  breakMinutes?: number;
  rawHours?: number;
  validatedHours?: number;
  status: string;
  notes?: string;
  employeeId: string;
  customerId?: string;
  siteId?: string;
  assignmentId?: string;
};

export type DemoTimeIssue = {
  id: string;
  type: string;
  status: TimeIssueStatus;
  detectedAt: Date;
  assignedTo?: string;
  resolution?: string;
  notes?: string;
  timeEntryId?: string;
  employeeId: string;
};

export type DemoCustomerRule = {
  id: string;
  customerId: string;
  siteId?: string;
  type: string;
  name: string;
  description?: string;
  active: boolean;
  configJson?: Record<string, unknown>;
};

const d = (value: string) => new Date(value);

export const appUsers: SimpleEntity[] = [
  { id: "user-management", name: "Management" },
  { id: "user-backoffice", name: "Backoffice" },
  { id: "user-foreman", name: "Vorarbeiter" },
];

export const customers: SimpleEntity[] = [
  { id: "customer-jager", name: "Jager" },
  { id: "customer-fiege", name: "FIEGE" },
];

export const sites: (SimpleEntity & { customerId: string })[] = [
  { id: "site-jager-erfurt", customerId: "customer-jager", name: "Jager Erfurt DC" },
  { id: "site-jager-halle", customerId: "customer-jager", name: "Jager Halle Outbound" },
  { id: "site-fiege-leipzig", customerId: "customer-fiege", name: "FIEGE Leipzig" },
];

export const partnerCompanies: SimpleEntity[] = [
  { id: "partner-baltic-staffing", name: "Baltic Staffing" },
  { id: "partner-euroshift", name: "EuroShift Services" },
  { id: "partner-nova-workforce", name: "Nova Workforce" },
];

export const coordinators: (SimpleEntity & { partnerCompanyId: string })[] = [
  { id: "coord-ana", partnerCompanyId: "partner-baltic-staffing", name: "Ana Petrauskas" },
  { id: "coord-marek", partnerCompanyId: "partner-baltic-staffing", name: "Marek Nowak" },
  { id: "coord-ewa", partnerCompanyId: "partner-euroshift", name: "Ewa Zielinska" },
  { id: "coord-victor", partnerCompanyId: "partner-nova-workforce", name: "Victor Ionescu" },
  { id: "coord-irina", partnerCompanyId: "partner-nova-workforce", name: "Irina Popescu" },
];

export const shifts: (SimpleEntity & { startsAt?: string; endsAt?: string })[] = [
  { id: "shift-jager-early", name: "Fruehschicht", startsAt: "06:00", endsAt: "14:30" },
  { id: "shift-jager-late", name: "Spaetschicht", startsAt: "14:00", endsAt: "22:30" },
  { id: "shift-fiege-day", name: "Tagschicht", startsAt: "07:00", endsAt: "15:30" },
];

export const positions: SimpleEntity[] = [
  { id: "position-picking", name: "Kommissionierung" },
  { id: "position-packing", name: "Verpackung" },
  { id: "position-goods-in", name: "Wareneingang" },
  { id: "position-sortation", name: "Sortierung" },
  { id: "position-loading", name: "Verladung" },
  { id: "position-quality-check", name: "Qualitaetskontrolle" },
];

export const employees: DemoEmployee[] = [
  ["emp-001", "Tomas", "Kazlauskas", "active", "active", "JG-1001", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-picking", "partner-baltic-staffing", "coord-ana"],
  ["emp-002", "Karolina", "Nowicka", "active", "active", "JG-1002", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-packing", "partner-euroshift", "coord-ewa"],
  ["emp-003", "Marius", "Petraitis", "planned", "first_workday_planned", "JG-1003", "customer-jager", "site-jager-halle", "shift-jager-late", "position-goods-in", "partner-baltic-staffing", "coord-marek"],
  ["emp-004", "Andrei", "Popa", "announced", "document_received", undefined, "customer-fiege", "site-fiege-leipzig", undefined, undefined, "partner-nova-workforce", "coord-irina"],
  ["emp-005", "Elena", "Ionescu", "created", "customer_system_created", "FG-2101", "customer-fiege", "site-fiege-leipzig", "shift-fiege-day", "position-sortation", "partner-nova-workforce", "coord-victor"],
  ["emp-006", "Piotr", "Kowalski", "appeared", "first_pick_confirmed", "FG-2102", "customer-fiege", "site-fiege-leipzig", "shift-fiege-day", "position-loading", "partner-euroshift", "coord-ewa"],
  ["emp-007", "Lukas", "Jankauskas", "no_show", "no_show", undefined, "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-picking", "partner-baltic-staffing", "coord-marek"],
  ["emp-008", "Monika", "Zielinska", "replaced", "replacement_requested", undefined, "customer-jager", "site-jager-halle", "shift-jager-late", "position-quality-check", "partner-euroshift", "coord-ewa"],
  ["emp-009", "Rasa", "Stankeviciute", "sick", "active", "JG-1009", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-packing", "partner-baltic-staffing", "coord-ana"],
  ["emp-010", "Gabriel", "Marin", "vacation", "active", "FG-2110", "customer-fiege", "site-fiege-leipzig", "shift-fiege-day", "position-loading", "partner-nova-workforce", "coord-victor"],
  ["emp-011", "Oksana", "Melnyk", "active", "active", "JG-1011", "customer-jager", "site-jager-halle", "shift-jager-late", "position-goods-in", "partner-euroshift", "coord-ewa"],
  ["emp-012", "Darius", "Banys", "planned", "foreman_informed", "JG-1012", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-picking", "partner-baltic-staffing", "coord-ana"],
  ["emp-013", "Alexandru", "Dobre", "created", "card_assigned", "FG-2113", "customer-fiege", "site-fiege-leipzig", undefined, undefined, "partner-nova-workforce", "coord-irina"],
  ["emp-014", "Agnieszka", "Kaczmarek", "announced", "announced", undefined, "customer-jager", "site-jager-erfurt", undefined, undefined, "partner-euroshift", "coord-ewa"],
  ["emp-015", "Mindaugas", "Sakalauskas", "inactive", "active", "JG-1015", "customer-jager", "site-jager-halle", undefined, undefined, "partner-baltic-staffing", "coord-marek"],
  ["emp-016", "Nicoleta", "Stan", "active", "active", "FG-2116", "customer-fiege", "site-fiege-leipzig", "shift-fiege-day", "position-sortation", "partner-nova-workforce", "coord-victor"],
  ["emp-017", "Pawel", "Wisniewski", "active", "active", "JG-1017", "customer-jager", "site-jager-halle", "shift-jager-late", "position-quality-check", "partner-euroshift", "coord-ewa"],
  ["emp-018", "Justina", "Mikalauskaite", "appeared", "first_pick_confirmed", "JG-1018", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-packing", "partner-baltic-staffing", "coord-ana"],
  ["emp-019", "Cristian", "Enache", "planned", "first_workday_planned", "FG-2119", "customer-fiege", "site-fiege-leipzig", "shift-fiege-day", "position-loading", "partner-nova-workforce", "coord-irina"],
  ["emp-020", "Greta", "Vaitkute", "created", "not_started", undefined, undefined, undefined, undefined, undefined, "partner-baltic-staffing", "coord-marek"],
].map(
  ([
    id,
    firstName,
    lastName,
    status,
    onboardingStatus,
    externalCardNumber,
    currentCustomerId,
    currentSiteId,
    currentShiftId,
    currentPositionId,
    partnerCompanyId,
    coordinatorId,
  ]) => ({
    id: id as string,
    firstName: firstName as string,
    lastName: lastName as string,
    displayName: `${firstName} ${lastName}`,
    status: status as EmployeeStatus,
    onboardingStatus: onboardingStatus as OnboardingStatus,
    externalCardNumber: externalCardNumber as string | undefined,
    phone: "+49 demo",
    language: "multi",
    firstWorkday: ["active", "appeared"].includes(status as string)
      ? d("2026-06-03T06:00:00.000Z")
      : undefined,
    currentCustomerId: currentCustomerId as string | undefined,
    currentSiteId: currentSiteId as string | undefined,
    currentShiftId: currentShiftId as string | undefined,
    currentPositionId: currentPositionId as string | undefined,
    partnerCompanyId: partnerCompanyId as string | undefined,
    coordinatorId: coordinatorId as string | undefined,
    notes:
      id === "emp-007"
        ? "Nach Wochenendbestaetigung nicht zur geplanten Schicht erschienen."
        : undefined,
  }),
);

export const assignments: DemoAssignment[] = [
  ["assignment-001", "emp-001", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-picking", "appeared", "2026-06-05T06:00:00.000Z"],
  ["assignment-002", "emp-002", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-packing", "confirmed", "2026-06-05T06:00:00.000Z"],
  ["assignment-003", "emp-011", "customer-jager", "site-jager-halle", "shift-jager-late", "position-goods-in", "planned", "2026-06-05T14:00:00.000Z"],
  ["assignment-004", "emp-006", "customer-fiege", "site-fiege-leipzig", "shift-fiege-day", "position-loading", "appeared", "2026-06-05T07:00:00.000Z"],
  ["assignment-005", "emp-016", "customer-fiege", "site-fiege-leipzig", "shift-fiege-day", "position-sortation", "confirmed", "2026-06-05T07:00:00.000Z"],
  ["assignment-006", "emp-003", "customer-jager", "site-jager-halle", "shift-jager-late", "position-goods-in", "planned", "2026-06-06T06:00:00.000Z"],
  ["assignment-007", "emp-007", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-picking", "missed", "2026-06-06T06:00:00.000Z"],
  ["assignment-008", "emp-017", "customer-jager", "site-jager-halle", "shift-jager-late", "position-quality-check", "confirmed", "2026-06-06T14:00:00.000Z"],
  ["assignment-009", "emp-019", "customer-fiege", "site-fiege-leipzig", "shift-fiege-day", "position-loading", "planned", "2026-06-07T07:00:00.000Z"],
  ["assignment-010", "emp-018", "customer-jager", "site-jager-erfurt", "shift-jager-early", "position-packing", "confirmed", "2026-06-07T06:00:00.000Z"],
].map(([id, employeeId, customerId, siteId, shiftId, positionId, status, date]) => ({
  id,
  employeeId,
  customerId,
  siteId,
  shiftId,
  positionId,
  status: status as AssignmentStatus,
  date: d(date),
}));

export const restrictions: DemoRestriction[] = [
  { id: "restriction-001", employeeId: "emp-003", type: "only_second_shift", severity: "normal", active: true, reason: "Transport von der Unterkunft ist nur fuer die Spaetschicht verfuegbar." },
  { id: "restriction-002", employeeId: "emp-005", type: "must_travel_with_group", severity: "high", active: true, reason: "Kein eigener Transport verfuegbar." },
  { id: "restriction-003", employeeId: "emp-012", type: "fixed_position", severity: "normal", active: true, reason: "Kunde hat den Mitarbeiter nur fuer Kommissionierung eingearbeitet." },
  { id: "restriction-004", employeeId: "emp-016", type: "customer_preference", severity: "low", active: true, reason: "Vorarbeiter bevorzugt den Mitarbeiter im Bereich Sortierung." },
  { id: "restriction-005", employeeId: "emp-019", type: "language_support_needed", severity: "normal", active: true, reason: "Braucht in der ersten Woche eine rumaenischsprachige Ansprechperson." },
];

export const cases: DemoCase[] = [
  { id: "case-001", type: "no_show", status: "open", priority: "high", title: "No-Show nach Wochenende", description: "Mitarbeiter ist trotz Bestaetigung nach dem Wochenende nicht zur geplanten Jager-Fruehschicht erschienen.", ownerId: "user-backoffice", employeeId: "emp-007", customerId: "customer-jager", siteId: "site-jager-erfurt", partnerCompanyId: "partner-baltic-staffing", dueDate: d("2026-06-06T12:00:00.000Z"), currency: "EUR", nextStep: "Partner muss Ersatz liefern und die Ersatzperson bestaetigen.", createdAt: d("2026-06-05T09:30:00.000Z") },
  { id: "case-002", type: "time_error", status: "in_progress", priority: "normal", title: "Fehlendes Pick-out im Kundensystem", description: "Im Jager-System fehlt der Abschluss der Schicht; die tatsaechliche Endzeit ist unklar.", ownerId: "user-backoffice", employeeId: "emp-001", customerId: "customer-jager", siteId: "site-jager-erfurt", dueDate: d("2026-06-09T12:00:00.000Z"), currency: "EUR", nextStep: "Vorarbeiter soll die tatsaechliche Endzeit bestaetigen.", createdAt: d("2026-06-05T10:00:00.000Z") },
  { id: "case-003", type: "missing_document", status: "waiting_for_partner", priority: "normal", title: "Mitarbeiter noch nicht aktiv: Dokumentenbestaetigung fehlt", description: "Der Partner hat den Mitarbeiter angekuendigt, aber die aktualisierte Dokumentenbestaetigung fehlt noch.", ownerId: "user-backoffice", employeeId: "emp-004", partnerCompanyId: "partner-nova-workforce", dueDate: d("2026-06-10T12:00:00.000Z"), currency: "EUR", nextStep: "Partnerkoordination soll den Dokumentenstatus bestaetigen.", createdAt: d("2026-06-04T12:00:00.000Z") },
  { id: "case-004", type: "fuel_receipt", status: "open", priority: "low", title: "Offener Tankbeleg muss zugeordnet werden", description: "Ein Tankbeleg fuer die Erfurter Fahrzeuggruppe ist offen und muss Fahrer und Route zugeordnet werden.", ownerId: "user-backoffice", amount: 86.4, currency: "EUR", dueDate: d("2026-06-12T12:00:00.000Z"), nextStep: "Tankbeleg mit Fahrer und Routennotiz abgleichen.", createdAt: d("2026-06-03T13:00:00.000Z") },
  { id: "case-005", type: "fine", status: "waiting_for_management", priority: "high", title: "Bussgeld/Fahrzeugthema: Verantwortung unklar", description: "Ein Parkbussgeld ist eingegangen; Zuordnung zu Fahrer, Partner oder interner Verantwortung ist noch offen.", ownerId: "user-management", amount: 35, currency: "EUR", dueDate: d("2026-06-11T12:00:00.000Z"), nextStep: "Management entscheidet die Behandlung vor Ruecksprache mit dem Partner.", createdAt: d("2026-06-02T08:00:00.000Z") },
  { id: "case-006", type: "worker_complaint", status: "in_progress", priority: "normal", title: "Pause zu lang: Mitarbeiter wartet auf Korrektur", description: "Mitarbeiter meldet 30 Minuten Pause, das Kundensystem zeigt 60 Minuten.", ownerId: "user-backoffice", employeeId: "emp-006", customerId: "customer-fiege", siteId: "site-fiege-leipzig", dueDate: d("2026-06-09T12:00:00.000Z"), currency: "EUR", nextStep: "Kundenbuchung mit Vorarbeiter-Notiz vergleichen.", createdAt: d("2026-06-05T08:00:00.000Z") },
  { id: "case-007", type: "partner_claim", status: "waiting_for_partner", priority: "normal", title: "Partner muss Ersatz liefern: Kostenklaerung offen", description: "Partner fragt nach der Kostenklaerung fuer eine Ersatzstellung nach Ausfall.", ownerId: "user-management", partnerCompanyId: "partner-euroshift", amount: 120, currency: "EUR", dueDate: d("2026-06-13T12:00:00.000Z"), nextStep: "Vorgangshistorie und Einsatzdetails an den Partner senden.", createdAt: d("2026-06-01T08:00:00.000Z") },
  { id: "case-008", type: "customer_problem", status: "open", priority: "critical", title: "Kunde wartet auf Korrektur: FIEGE Montag bestaetigen", description: "FIEGE wartet auf Rueckmeldung zur geplanten Besetzung und zu neuen Mitarbeitern fuer Montag.", ownerId: "user-management", customerId: "customer-fiege", siteId: "site-fiege-leipzig", dueDate: d("2026-06-06T16:00:00.000Z"), currency: "EUR", nextStep: "Geplante Kopfzahl und neue Mitarbeiter fuer den ersten Einsatztag bestaetigen.", createdAt: d("2026-06-05T11:00:00.000Z") },
];

export const timeEntries: DemoTimeEntry[] = [
  { id: "time-entry-001", workDate: d("2026-06-05T00:00:00.000Z"), source: "jager_customer_system", breakMinutes: 30, rawHours: 8.55, validatedHours: 8.05, status: "final", employeeId: "emp-001", customerId: "customer-jager", siteId: "site-jager-erfurt", assignmentId: "assignment-001" },
  { id: "time-entry-002", workDate: d("2026-06-05T00:00:00.000Z"), source: "jager_customer_system", breakMinutes: 30, rawHours: 0, status: "suspicious", employeeId: "emp-002", customerId: "customer-jager", siteId: "site-jager-erfurt", assignmentId: "assignment-002", notes: "Fehlender Schichtabschluss im Kundenexport." },
  { id: "time-entry-003", workDate: d("2026-06-05T00:00:00.000Z"), source: "fiege_customer_system", breakMinutes: 60, rawHours: 8.57, validatedHours: 7.57, status: "under_review", employeeId: "emp-006", customerId: "customer-fiege", siteId: "site-fiege-leipzig", assignmentId: "assignment-004" },
  { id: "time-entry-004", workDate: d("2026-06-05T00:00:00.000Z"), source: "fiege_customer_system", breakMinutes: 30, rawHours: 8.42, validatedHours: 7.92, status: "billable", employeeId: "emp-016", customerId: "customer-fiege", siteId: "site-fiege-leipzig", assignmentId: "assignment-005" },
  { id: "time-entry-005", workDate: d("2026-06-04T00:00:00.000Z"), source: "manual_timesheet", breakMinutes: 30, rawHours: 8.6, validatedHours: 8.1, status: "corrected", employeeId: "emp-011", customerId: "customer-jager", siteId: "site-jager-halle" },
  { id: "time-entry-006", workDate: d("2026-06-04T00:00:00.000Z"), source: "jager_customer_system", breakMinutes: 30, rawHours: 16.25, status: "suspicious", employeeId: "emp-018", customerId: "customer-jager", siteId: "site-jager-erfurt", notes: "Vermutlich fehlende Pausenrueckmeldung oder doppelte Buchung." },
];

export const timeIssues: DemoTimeIssue[] = [
  { id: "time-issue-001", timeEntryId: "time-entry-002", employeeId: "emp-002", type: "missing_check_out", status: "assigned_to_foreman", assignedTo: "Vorarbeiter", notes: "Tatsaechliche Endzeit muss bestaetigt werden.", detectedAt: d("2026-06-05T15:30:00.000Z") },
  { id: "time-issue-002", timeEntryId: "time-entry-003", employeeId: "emp-006", type: "worker_complaint", status: "sent_to_customer", assignedTo: "Backoffice", notes: "Mitarbeiter meldet 30 Minuten Pause, das Kundensystem zeigt 60 Minuten.", detectedAt: d("2026-06-05T16:00:00.000Z") },
  { id: "time-issue-003", timeEntryId: "time-entry-006", employeeId: "emp-018", type: "unusually_long_shift", status: "open", assignedTo: "Backoffice", notes: "16-Stunden-Tag muss vor Abrechnung geprueft werden.", detectedAt: d("2026-06-04T23:00:00.000Z") },
  { id: "time-issue-004", timeEntryId: "time-entry-005", employeeId: "emp-011", type: "manual_correction", status: "resolved", assignedTo: "Backoffice", resolution: "Vorarbeiter hat die manuelle Korrektur bestaetigt.", detectedAt: d("2026-06-05T09:00:00.000Z") },
];

export const customerRules: DemoCustomerRule[] = [
  {
    id: "rule-001",
    customerId: "customer-jager",
    siteId: "site-jager-erfurt",
    type: "break_rule",
    name: "Jager Erfurt automatische Pausenabziehung",
    description: "Das Kundensystem zieht nach sechs Stunden automatisch 30 Minuten Pause ab.",
    active: true,
    configJson: { thresholdHours: 6, deductedBreakMinutes: 30 },
  },
  {
    id: "rule-002",
    customerId: "customer-jager",
    siteId: "site-jager-halle",
    type: "correction_workflow",
    name: "Jager Halle Korrekturen ueber Vorarbeiter",
    description: "Korrekturen brauchen eine Vorarbeiter-Bestaetigung vor Kontakt mit dem Kunden.",
    active: true,
    configJson: { firstContact: "foreman", customerEscalationAfterDays: 2 },
  },
  {
    id: "rule-003",
    customerId: "customer-jager",
    type: "performance_data_rule",
    name: "Jager Leistungsabgleich ueber Mitarbeiter-ID",
    description: "Leistungssignale werden ueber die externe Mitarbeiter-ID abgeglichen, wenn vorhanden.",
    active: true,
    configJson: { source: "customer_portal", matchingKey: "externalSystemId" },
  },
  {
    id: "rule-004",
    customerId: "customer-fiege",
    siteId: "site-fiege-leipzig",
    type: "first_day_rule",
    name: "FIEGE Bestaetigung am ersten Arbeitstag",
    description: "Neue Mitarbeiter brauchen Ankunftsbestaetigung und eine zugewiesene Ansprechperson.",
    active: true,
    configJson: { requiresForemanConfirmation: true, trainingLeadRequired: true },
  },
  {
    id: "rule-005",
    customerId: "customer-fiege",
    siteId: "site-fiege-leipzig",
    type: "billing_rule",
    name: "FIEGE nur gepruefte Stunden",
    description: "Abrechnungsvorbereitung nutzt gepruefte Stunden, nicht rohe Importwerte.",
    active: true,
    configJson: { billFromField: "validatedHours", allowManualCorrection: true },
  },
  {
    id: "rule-006",
    customerId: "customer-fiege",
    type: "contact_rule",
    name: "FIEGE Eskalationskontakte",
    description: "Operative Eskalationen laufen zuerst ueber den internen Vorarbeiter.",
    active: true,
    configJson: { firstContact: "internal_foreman", escalationWindowHours: 4 },
  },
];

export function byId<T extends { id: string; name?: string; displayName?: string }>(
  collection: T[],
  id?: string | null,
) {
  if (!id) return null;
  return collection.find((item) => item.id === id) ?? null;
}
