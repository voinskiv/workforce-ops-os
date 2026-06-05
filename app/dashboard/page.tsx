import Link from "next/link";

import { PageHeading } from "@/components/domain/page-heading";
import { StatusBadge } from "@/components/domain/status-badge";
import { EmptyTableRow, TableShell } from "@/components/domain/table-shell";
import { getDashboardData } from "@/lib/data/workforce";
import { formatDate, formatLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

const cardLabels = [
  ["totalEmployees", "Mitarbeiter gesamt", "/employees"],
  ["activeEmployees", "aktive Mitarbeiter", "/employees?status=active"],
  ["plannedEmployees", "geplante Mitarbeiter", "/employees?status=planned"],
  ["noShows", "No-Shows", "/employees?status=no_show"],
  ["openOnboardingItems", "Startkontrolle offen", "/onboarding"],
  ["openTimeIssues", "offene Zeitkorrekturen", "/time-validation"],
  ["criticalTimeIssues", "kritische Zeitprobleme", "/time-validation?issueType=missing_check_out"],
  ["waitingCustomerTimeIssues", "beim Kunden zur Korrektur", "/time-validation?status=sent_to_customer"],
  ["correctedFinalExamples", "final / abrechenbar", "/time-validation?status=final"],
  ["openCases", "offene Vorgänge", "/cases?status=open"],
  ["highPriorityCases", "kritische Fälle", "/cases?priority=high"],
] as const;

const demoFlow = [
  "Mitarbeiter angekündigt",
  "Startkontrolle",
  "Einsatz geplant",
  "No-Show erkannt",
  "Vorgang erstellt",
  "Management sieht Risiko",
];

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <>
      <PageHeading
        title="Steuerungsübersicht"
        description="Zeigt auf einen Blick, welche Mitarbeiter einsatzbereit sind, wo Risiken entstehen und welche Vorgänge aktiv gesteuert werden müssen."
      />

      <section className="mb-5 rounded-md border bg-card p-4">
        <h2 className="text-sm font-semibold">Demo Flow</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Die Kernstory der Steuerung: vom angekündigten Mitarbeiter bis zum
          sichtbaren Management-Risiko.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {demoFlow.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-md border bg-muted px-3 py-2 font-medium">
                {step}
              </span>
              {index < demoFlow.length - 1 ? (
                <span className="text-muted-foreground">→</span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cardLabels.map(([key, label, href]) => (
          <Link
            href={href}
            key={key}
            className="rounded-md border bg-card p-4 transition-colors hover:bg-accent"
          >
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {data.cards[key]}
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        <TableShell title="No-Shows mit Einsatzkontext">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Mitarbeiter</th>
                <th className="px-4 py-3 font-medium">Partnerfirma</th>
                <th className="px-4 py-3 font-medium">Standort</th>
                <th className="px-4 py-3 font-medium">Schicht</th>
                <th className="px-4 py-3 font-medium">Position</th>
                <th className="px-4 py-3 font-medium">Vorgang</th>
              </tr>
            </thead>
            <tbody>
              {data.latestNoShows.length === 0 ? (
                <EmptyTableRow colSpan={6} label="Keine No-Shows in den Demodaten." />
              ) : (
                data.latestNoShows.map((employee) => (
                  <tr key={employee.id} className="border-t">
                    <td className="px-4 py-3">
                      <Link className="font-medium hover:underline" href={`/employees/${employee.id}`}>
                        {employee.displayName}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{employee.partnerCompany}</td>
                    <td className="px-4 py-3">{employee.assignmentSite}</td>
                    <td className="px-4 py-3">{employee.assignmentShift}</td>
                    <td className="px-4 py-3">{employee.assignmentPosition}</td>
                    <td className="px-4 py-3">
                      <Link className="text-sm font-medium hover:underline" href="/cases?type=no_show">
                        No-Show Vorgänge
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>

        <TableShell title="Offene Zeitkorrekturen">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Mitarbeiter</th>
                <th className="px-4 py-3 font-medium">Thema</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">verantwortlich</th>
                <th className="px-4 py-3 font-medium">nächster Schritt</th>
              </tr>
            </thead>
            <tbody>
              {data.openTimeIssues.length === 0 ? (
                <EmptyTableRow colSpan={5} label="Keine offenen Zeitkorrekturen." />
              ) : (
                data.openTimeIssues.map((issue) => (
                  <tr key={issue.id} className="border-t">
                    <td className="px-4 py-3">
                      <Link
                        className="font-medium hover:underline"
                        href={`/employees/${issue.employeeId}`}
                      >
                        {issue.employee}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        className="hover:underline"
                        href={`/time-validation?issueType=${issue.type}`}
                      >
                        {formatLabel(issue.type)}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={issue.status} />
                    </td>
                    <td className="px-4 py-3">{issue.assignedTo}</td>
                    <td className="min-w-48 px-4 py-3">{issue.nextStep}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>

        <TableShell title="Zeitprüfung: Management-Signale">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Signal</th>
                <th className="px-4 py-3 font-medium">Mitarbeiter</th>
                <th className="px-4 py-3 font-medium">Kunde / Standort</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Bedeutung</th>
              </tr>
            </thead>
            <tbody>
              {data.timeSignals.criticalIssues.length === 0 &&
              data.timeSignals.waitingForCustomer.length === 0 &&
              data.timeSignals.correctedFinalEntries.length === 0 ? (
                <EmptyTableRow colSpan={5} label="Keine Zeitprüfungssignale vorhanden." />
              ) : (
                <>
                  {data.timeSignals.criticalIssues.slice(0, 3).map((issue) => (
                    <tr key={`critical-${issue.id}`} className="border-t">
                      <td className="px-4 py-3">
                        <Link
                          className="font-medium hover:underline"
                          href={`/time-validation?issueType=${issue.type}`}
                        >
                          kritisch
                        </Link>
                      </td>
                      <td className="px-4 py-3">{issue.employee}</td>
                      <td className="px-4 py-3">
                        {issue.customer}
                        {issue.site !== "-" ? ` / ${issue.site}` : ""}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={issue.status} />
                      </td>
                      <td className="min-w-56 px-4 py-3">{issue.nextStep}</td>
                    </tr>
                  ))}
                  {data.timeSignals.waitingForCustomer.slice(0, 3).map((issue) => (
                    <tr key={`customer-${issue.id}`} className="border-t">
                      <td className="px-4 py-3">
                        <Link
                          className="font-medium hover:underline"
                          href="/time-validation?status=sent_to_customer"
                        >
                          Kunde wartet
                        </Link>
                      </td>
                      <td className="px-4 py-3">{issue.employee}</td>
                      <td className="px-4 py-3">
                        {issue.customer}
                        {issue.site !== "-" ? ` / ${issue.site}` : ""}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={issue.status} />
                      </td>
                      <td className="min-w-56 px-4 py-3">{issue.notes}</td>
                    </tr>
                  ))}
                  {data.timeSignals.correctedFinalEntries.slice(0, 3).map((entry) => (
                    <tr key={`final-${entry.id}`} className="border-t">
                      <td className="px-4 py-3">
                        <Link
                          className="font-medium hover:underline"
                          href={`/time-validation?status=${entry.status}`}
                        >
                          final / abrechenbar
                        </Link>
                      </td>
                      <td className="px-4 py-3">{entry.employee}</td>
                      <td className="px-4 py-3">
                        {entry.customer}
                        {entry.site !== "-" ? ` / ${entry.site}` : ""}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={entry.status} />
                      </td>
                      <td className="min-w-56 px-4 py-3">
                        Zeit ist geprüft und kann als kontrolliertes Beispiel dienen.
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </TableShell>

        <TableShell title="Kritische Fälle und offene Vorgänge">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Vorgang</th>
                <th className="px-4 py-3 font-medium">Priorität</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">verantwortlich</th>
                <th className="px-4 py-3 font-medium">fällig</th>
                <th className="px-4 py-3 font-medium">nächster Schritt</th>
              </tr>
            </thead>
            <tbody>
              {data.urgentCases.length === 0 ? (
                <EmptyTableRow colSpan={6} label="Keine kritischen Vorgänge." />
              ) : (
                data.urgentCases.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3">
                      <Link
                        className="font-medium hover:underline"
                        href={`/cases?priority=${item.priority}`}
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={item.priority} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={item.status} />
                    </td>
                    <td className="px-4 py-3">{item.owner}</td>
                    <td className="px-4 py-3">{formatDate(item.dueDate)}</td>
                    <td className="min-w-56 px-4 py-3">{item.nextStep}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>

        <TableShell title="Neue Mitarbeiter noch nicht aktiv">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Mitarbeiter</th>
                <th className="px-4 py-3 font-medium">Onboarding</th>
                <th className="px-4 py-3 font-medium">Partnerfirma</th>
                <th className="px-4 py-3 font-medium">Kunde</th>
              </tr>
            </thead>
            <tbody>
              {data.newEmployees.length === 0 ? (
                <EmptyTableRow colSpan={4} label="Keine offenen Startkontrollen." />
              ) : (
                data.newEmployees.slice(0, 8).map((employee) => (
                  <tr key={employee.id} className="border-t">
                    <td className="px-4 py-3">
                      <Link className="font-medium hover:underline" href={`/employees/${employee.id}`}>
                        {employee.displayName}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={employee.onboardingStatus} />
                    </td>
                    <td className="px-4 py-3">{employee.partnerCompany}</td>
                    <td className="px-4 py-3">{employee.customer}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>
      </section>
    </>
  );
}
