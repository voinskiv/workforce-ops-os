import Link from "next/link";

import { DemoNotice } from "@/components/domain/demo-notice";
import { FilterSelect } from "@/components/domain/filter-select";
import { PageHeading } from "@/components/domain/page-heading";
import { StatusBadge } from "@/components/domain/status-badge";
import { EmptyTableRow, TableShell } from "@/components/domain/table-shell";
import { Button } from "@/components/ui/button";
import { updateTimeIssueStatusAction } from "@/lib/actions/workforce";
import {
  getTimeValidationData,
  timeIssueStatuses,
  type TimeValidationFilters,
} from "@/lib/data/workforce";
import { formatDate, formatLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function formatHours(value?: number | null) {
  if (value === undefined || value === null) return "-";
  return `${value.toFixed(2)} h`;
}

export default async function TimeValidationPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filters: TimeValidationFilters = {
    status: first(params.status),
    customerId: first(params.customerId),
    issueType: first(params.issueType),
  };
  const readonlyDemo = params.demo === "readonly";
  const data = await getTimeValidationData(filters);

  return (
    <>
      <PageHeading
        title="Zeitprüfung"
        description="Zeigt, welche Zeiten aus Kundensystemen ungeprüft, auffällig, korrigiert oder final / abrechenbar sind. Wichtig, weil Kundendaten nicht automatisch vertrauenswürdig sind und jede Korrektur einen Verantwortlichen braucht."
      />
      <DemoNotice visible={readonlyDemo} />

      <form className="mb-5 flex flex-wrap items-end gap-3" action="/time-validation">
        <FilterSelect
          name="status"
          label="Status"
          value={filters.status}
          options={data.filters.statuses.map((status) => ({
            id: status,
            name: formatLabel(status),
          }))}
          allLabel="alle"
        />
        <FilterSelect
          name="customerId"
          label="Kunde"
          value={filters.customerId}
          options={data.filters.customers}
          allLabel="alle"
        />
        <FilterSelect
          name="issueType"
          label="Zeitproblem"
          value={filters.issueType}
          options={data.filters.issueTypes.map((type) => ({
            id: type,
            name: formatLabel(type),
          }))}
          allLabel="alle"
        />
        <Button size="sm" type="submit">
          Anwenden
        </Button>
        <Button asChild size="sm" type="button" variant="outline">
          <Link href="/time-validation">Zuruecksetzen</Link>
        </Button>
      </form>

      <div className="grid gap-5">
        <TableShell title="Zeitbuchungen aus Kundensystemen">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Mitarbeiter</th>
                <th className="px-4 py-3 font-medium">Kunde / Standort</th>
                <th className="px-4 py-3 font-medium">Arbeitstag</th>
                <th className="px-4 py-3 font-medium">Quelle</th>
                <th className="px-4 py-3 font-medium">Rohzeit</th>
                <th className="px-4 py-3 font-medium">geprüfte Zeit</th>
                <th className="px-4 py-3 font-medium">Pause</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Problem</th>
                <th className="px-4 py-3 font-medium">Hinweis</th>
              </tr>
            </thead>
            <tbody>
              {data.entries.length === 0 ? (
                <EmptyTableRow colSpan={10} label="Keine Zeitbuchungen fuer diese Filter." />
              ) : (
                data.entries.map((entry) => (
                  <tr key={entry.id} className="border-t align-top">
                    <td className="min-w-44 px-4 py-3">
                      <Link
                        className="font-medium hover:underline"
                        href={`/employees/${entry.employeeId}`}
                      >
                        {entry.employee}
                      </Link>
                    </td>
                    <td className="min-w-48 px-4 py-3">
                      {entry.customer}
                      {entry.site !== "-" ? ` / ${entry.site}` : ""}
                    </td>
                    <td className="px-4 py-3">{formatDate(entry.workDate)}</td>
                    <td className="px-4 py-3">{entry.source}</td>
                    <td className="px-4 py-3">{formatHours(entry.rawHours)}</td>
                    <td className="px-4 py-3">{formatHours(entry.validatedHours)}</td>
                    <td className="px-4 py-3">
                      {entry.breakMinutes === undefined || entry.breakMinutes === null
                        ? "-"
                        : `${entry.breakMinutes} min`}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={entry.status} />
                    </td>
                    <td className="min-w-44 px-4 py-3">
                      {entry.issueCount > 0
                        ? entry.issueTypes.map(formatLabel).join(", ")
                        : "-"}
                    </td>
                    <td className="min-w-56 px-4 py-3">{entry.notes}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>

        <TableShell title="Offene Zeitprobleme und Korrekturverantwortung">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Mitarbeiter</th>
                <th className="px-4 py-3 font-medium">Zeitproblem</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">verantwortlich</th>
                <th className="px-4 py-3 font-medium">Kunde / Standort</th>
                <th className="px-4 py-3 font-medium">Erklärung</th>
                <th className="px-4 py-3 font-medium">Kundenregel</th>
                <th className="px-4 py-3 font-medium">nächster Schritt / Ergebnis</th>
                <th className="px-4 py-3 font-medium">Aktualisieren</th>
              </tr>
            </thead>
            <tbody>
              {data.issues.length === 0 ? (
                <EmptyTableRow colSpan={9} label="Keine Zeitprobleme fuer diese Filter." />
              ) : (
                data.issues.map((issue) => (
                  <tr key={issue.id} className="border-t align-top">
                    <td className="min-w-44 px-4 py-3">
                      <Link
                        className="font-medium hover:underline"
                        href={`/employees/${issue.employeeId}`}
                      >
                        {issue.employee}
                      </Link>
                    </td>
                    <td className="min-w-44 px-4 py-3">{formatLabel(issue.type)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={issue.status} />
                    </td>
                    <td className="px-4 py-3">{issue.assignedTo}</td>
                    <td className="min-w-48 px-4 py-3">
                      {issue.customer}
                      {issue.site !== "-" ? ` / ${issue.site}` : ""}
                    </td>
                    <td className="min-w-64 px-4 py-3">{issue.notes}</td>
                    <td className="min-w-64 px-4 py-3">
                      <p className="font-medium">{issue.relatedRule}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {issue.ruleImpact}
                      </p>
                    </td>
                    <td className="min-w-56 px-4 py-3">
                      {issue.status === "resolved" ? issue.resolution : issue.nextStep}
                    </td>
                    <td className="px-4 py-3">
                      <form action={updateTimeIssueStatusAction} className="flex gap-2">
                        <input name="issueId" type="hidden" value={issue.id} />
                        <select
                          name="status"
                          defaultValue={issue.status}
                          className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                        >
                          {timeIssueStatuses
                            .filter((status) => status !== "rejected")
                            .map((status) => (
                              <option key={status} value={status}>
                                {formatLabel(status)}
                              </option>
                            ))}
                        </select>
                        <Button size="sm" type="submit" variant="outline">
                          Speichern
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>
      </div>
    </>
  );
}
