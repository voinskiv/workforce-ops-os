import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeading } from "@/components/domain/page-heading";
import { StatusBadge } from "@/components/domain/status-badge";
import { EmptyTableRow, TableShell } from "@/components/domain/table-shell";
import { Button } from "@/components/ui/button";
import { getEmployeeDetail } from "@/lib/data/workforce";
import { formatCurrency, formatDate, formatLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

function formatHours(value?: number | null) {
  if (value === undefined || value === null) return "-";
  return `${value.toFixed(2)} h`;
}

export default async function EmployeeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const employee = await getEmployeeDetail(id);

  if (!employee) notFound();

  return (
    <>
      <PageHeading
        title={employee.displayName}
        description="Mitarbeiterprofil mit Startkontrolle, aktuellem Einsatz, Einschränkungen und offenen Vorgängen. Wichtig, um schnell zu prüfen, ob diese Person operativ einsatzbereit ist."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/onboarding">In Startkontrolle ansehen</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/cases?type=no_show">No-Show Vorgänge</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/time-validation">Zeitprüfung ansehen</Link>
        </Button>
      </div>

      <section className="grid gap-5 xl:grid-cols-[1fr_24rem]">
        <div className="space-y-5">
          <section className="rounded-md border bg-card p-4">
            <div className="mb-4 flex flex-wrap gap-2">
              <StatusBadge value={employee.status} />
              <StatusBadge value={employee.onboardingStatus} />
              {employee.currentAssignment?.status ? (
                <StatusBadge value={employee.currentAssignment.status} />
              ) : null}
            </div>
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem label="Telefon" value={employee.phone} />
              <DetailItem label="Sprache" value={employee.language} />
              <DetailItem label="Kartennummer" value={employee.cardNumber} />
              <DetailItem label="External ID" value={employee.externalSystemId} />
              <DetailItem label="erster Arbeitstag" value={formatDate(employee.firstWorkday)} />
              <DetailItem label="Coordinator" value={employee.coordinator} />
              <DetailItem label="Partnerfirma" value={employee.partnerCompany} />
              <DetailItem label="Kunde" value={employee.customer} />
              <DetailItem label="Standort" value={employee.site} />
            </dl>
          </section>

          <section className="rounded-md border bg-card p-4">
            <h2 className="text-sm font-semibold">Aktueller Einsatz</h2>
            {employee.currentAssignment ? (
              <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem
                  label="Datum"
                  value={formatDate(employee.currentAssignment.date)}
                />
                <DetailItem
                  label="Status"
                  value={<StatusBadge value={employee.currentAssignment.status} />}
                />
                <DetailItem label="Kunde" value={employee.currentAssignment.customer} />
                <DetailItem label="Standort" value={employee.currentAssignment.site} />
                <DetailItem label="Schicht" value={employee.currentAssignment.shift} />
                <DetailItem label="Position" value={employee.currentAssignment.position} />
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Kein Einsatz in den aktuellen Demodaten.
              </p>
            )}
          </section>

          <TableShell title="Zugehörige offene Vorgänge">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Titel</th>
                  <th className="px-4 py-3 font-medium">Typ</th>
                  <th className="px-4 py-3 font-medium">Priorität</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Betrag</th>
                </tr>
              </thead>
              <tbody>
                {employee.cases.length === 0 ? (
                  <EmptyTableRow colSpan={5} label="Keine zugehörigen Vorgänge." />
                ) : (
                  employee.cases.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-3">
                        <Link className="font-medium hover:underline" href="/cases">
                          {item.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{formatLabel(item.type)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge value={item.priority} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={item.status} />
                      </td>
                      <td className="px-4 py-3">
                        {formatCurrency(item.amount, item.currency)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableShell>

          <TableShell title="Zugehörige Zeitkorrekturen">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Thema</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">verantwortlich</th>
                  <th className="px-4 py-3 font-medium">Kunde / Standort</th>
                  <th className="px-4 py-3 font-medium">Kundenregel</th>
                  <th className="px-4 py-3 font-medium">nächster Schritt / Ergebnis</th>
                </tr>
              </thead>
              <tbody>
                {employee.timeIssues.length === 0 ? (
                  <EmptyTableRow colSpan={6} label="Keine zugehörigen Zeitkorrekturen." />
                ) : (
                  employee.timeIssues.map((issue) => (
                    <tr key={issue.id} className="border-t align-top">
                      <td className="px-4 py-3">{formatLabel(issue.type)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge value={issue.status} />
                      </td>
                      <td className="px-4 py-3">{issue.assignedTo}</td>
                      <td className="min-w-44 px-4 py-3">
                        {issue.customer}
                        {issue.site !== "-" ? ` / ${issue.site}` : ""}
                      </td>
                      <td className="min-w-56 px-4 py-3">
                        <p className="font-medium">{issue.relatedRule}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {issue.ruleImpact}
                        </p>
                      </td>
                      <td className="min-w-56 px-4 py-3">
                        {issue.status === "resolved" ? issue.resolution : issue.nextStep}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableShell>

          <TableShell title="Zeitbuchungen: offen, geprüft, final / abrechenbar">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Arbeitstag</th>
                  <th className="px-4 py-3 font-medium">Kunde / Standort</th>
                  <th className="px-4 py-3 font-medium">Quelle</th>
                  <th className="px-4 py-3 font-medium">Rohzeit</th>
                  <th className="px-4 py-3 font-medium">geprüfte Zeit</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Zeitproblem</th>
                </tr>
              </thead>
              <tbody>
                {employee.timeEntries.length === 0 ? (
                  <EmptyTableRow colSpan={7} label="Keine Zeitbuchungen vorhanden." />
                ) : (
                  employee.timeEntries.map((entry) => (
                    <tr key={entry.id} className="border-t align-top">
                      <td className="px-4 py-3">{formatDate(entry.workDate)}</td>
                      <td className="min-w-44 px-4 py-3">
                        {entry.customer}
                        {entry.site !== "-" ? ` / ${entry.site}` : ""}
                      </td>
                      <td className="px-4 py-3">{entry.source}</td>
                      <td className="px-4 py-3">{formatHours(entry.rawHours)}</td>
                      <td className="px-4 py-3">{formatHours(entry.validatedHours)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge value={entry.status} />
                      </td>
                      <td className="min-w-44 px-4 py-3">
                        {entry.issueCount > 0
                          ? entry.issueTypes.map(formatLabel).join(", ")
                          : "kein offenes Problem"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableShell>
        </div>

        <aside className="space-y-5">
          <section className="rounded-md border bg-card p-4">
            <h2 className="text-sm font-semibold">Operative Notizen</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {employee.notes}
            </p>
          </section>

          <section className="rounded-md border bg-card p-4">
            <h2 className="text-sm font-semibold">Einschränkungen</h2>
            {employee.restrictions.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Keine aktiven Einschränkungen.
              </p>
            ) : (
              <div className="mt-3 grid gap-3">
                {employee.restrictions.map((restriction) => (
                  <div key={restriction.id} className="rounded-md border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">
                        {formatLabel(restriction.type)}
                      </p>
                      <StatusBadge value={restriction.severity} />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {restriction.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </aside>
      </section>
    </>
  );
}
