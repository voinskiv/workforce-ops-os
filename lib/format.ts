export function formatLabel(value?: string | null) {
  if (!value) return "-";
  const labels: Record<string, string> = {
    announced: "angekündigt",
    created: "angelegt",
    planned: "geplant",
    appeared: "erschienen",
    active: "aktiv",
    no_show: "No-Show",
    replaced: "ersetzt",
    sick: "krank",
    vacation: "Urlaub",
    inactive: "inaktiv",
    not_started: "nicht gestartet",
    document_received: "Dokument erhalten",
    card_assigned: "Karte zugeordnet",
    customer_system_created: "im Kundensystem angelegt",
    foreman_informed: "Vorarbeiter informiert",
    first_workday_planned: "erster Arbeitstag geplant",
    first_pick_confirmed: "erstes Pick-out bestätigt",
    replacement_requested: "Ersatz angefragt",
    confirmed: "bestätigt",
    missed: "verpasst",
    completed: "abgeschlossen",
    cancelled: "storniert",
    imported: "importiert",
    unreviewed: "ungeprüft",
    suspicious: "auffällig",
    under_review: "in Prüfung",
    final: "final",
    billable: "abrechenbar",
    excluded: "ausgeschlossen",
    open: "offen",
    in_progress: "in Bearbeitung",
    waiting_for_partner: "wartet auf Partner",
    waiting_for_customer: "wartet auf Kunde",
    waiting_for_management: "wartet auf Management",
    resolved: "gelöst",
    low: "niedrig",
    normal: "normal",
    high: "hoch",
    critical: "kritisch",
    stabil: "stabil",
    beobachten: "beobachten",
    kritisch: "kritisch",
    time_error: "Zeitfehler",
    worker_complaint: "Mitarbeiterbeschwerde",
    missing_document: "fehlendes Dokument",
    customer_document_request: "Kundennachweis",
    fuel_receipt: "Tankbeleg",
    reimbursement: "Erstattung",
    fine: "Strafe",
    partner_claim: "Partnerklärung",
    vehicle_problem: "Fahrzeugthema",
    customer_problem: "Kundenthema",
    other: "Sonstiges",
    assigned_to_foreman: "beim Vorarbeiter",
    sent_to_customer: "an Kunde gesendet",
    corrected: "korrigiert",
    rejected: "abgelehnt",
    missing_check_out: "fehlendes Pick-out",
    missing_pause_return: "Rückkehr aus Pause nicht gebucht",
    unusually_long_pause: "Pause zu lang",
    unusually_long_shift: "ungewöhnlich lange Schicht",
    first_day_rule: "erster Arbeitstag / Sonderregel",
    manual_correction: "manuelle Korrektur",
    customer_correction_needed: "Kunde muss korrigieren",
    break_rule: "Pausenregel",
    correction_workflow: "Korrekturweg",
    billing_rule: "Abrechnungsregel",
    performance_data_rule: "Leistungsdatenregel",
    contact_rule: "Kontaktregel",
  };
  if (labels[value]) return labels[value];
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatDate(value?: Date | string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatCurrency(value?: number | null, currency = "EUR") {
  if (value === undefined || value === null) return "-";
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
