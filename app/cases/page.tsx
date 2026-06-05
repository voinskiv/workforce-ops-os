import { DemoNotice } from "@/components/domain/demo-notice";
import { FilterSelect } from "@/components/domain/filter-select";
import { PageHeading } from "@/components/domain/page-heading";
import { StatusBadge } from "@/components/domain/status-badge";
import { EmptyTableRow, TableShell } from "@/components/domain/table-shell";
import { Button } from "@/components/ui/button";
import {
  createCaseAction,
  updateCaseStatusAction,
} from "@/lib/actions/workforce";
import {
  casePriorities,
  caseStatuses,
  caseTypes,
  getCases,
  getFilterOptions,
  type CaseFilters,
} from "@/lib/data/workforce";
import { formatCurrency, formatDate, formatLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CasesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filters: CaseFilters = {
    status: first(params.status),
    type: first(params.type),
    priority: first(params.priority),
  };
  const readonlyDemo = params.demo === "readonly";

  const [cases, options] = await Promise.all([
    getCases(filters),
    getFilterOptions(),
  ]);

  return (
    <>
      <PageHeading
        title="Offene Vorgänge"
        description="Sammelt operative Ausnahmen an einer Stelle: No-Shows, Zeitfehler, Kundenanfragen, Partnerklärungen und andere offene Punkte. Wichtig, damit jeder Vorgang einen Status, Verantwortlichen und nächsten Schritt hat."
      />
      <DemoNotice visible={readonlyDemo} />

      <section className="mb-5 rounded-md border bg-card p-4">
        <h2 className="text-sm font-semibold">Vorgang erstellen</h2>
        <form action={createCaseAction} className="mt-4 grid gap-3 xl:grid-cols-6">
          <label className="grid gap-1 text-xs font-medium text-muted-foreground xl:col-span-2">
            Titel
            <input
              name="title"
              required
              className="h-9 rounded-md border bg-background px-3 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-ring"
              placeholder="Operativer Klärungspunkt"
            />
          </label>
          <FilterSelect
            name="type"
            label="Typ"
            options={caseTypes.map((type) => ({ id: type, name: formatLabel(type) }))}
            allLabel="auswählen"
          />
          <FilterSelect
            name="priority"
            label="Priorität"
            options={casePriorities.map((priority) => ({
              id: priority,
              name: formatLabel(priority),
            }))}
            allLabel="auswählen"
          />
          <FilterSelect
            name="ownerId"
            label="verantwortlich"
            options={options.appUsers}
            allLabel="nicht zugeordnet"
          />
          <FilterSelect
            name="employeeId"
            label="Mitarbeiter"
            options={options.employees}
            allLabel="keiner"
          />
          <FilterSelect
            name="customerId"
            label="Kunde"
            options={options.customers}
            allLabel="keiner"
          />
          <FilterSelect
            name="partnerCompanyId"
            label="Partnerfirma"
            options={options.partnerCompanies}
            allLabel="keine"
          />
          <label className="grid gap-1 text-xs font-medium text-muted-foreground">
            fällig am
            <input
              name="dueDate"
              type="date"
              className="h-9 rounded-md border bg-background px-3 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-muted-foreground">
            Betrag
            <input
              name="amount"
              min="0"
              step="0.01"
              type="number"
              className="h-9 rounded-md border bg-background px-3 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-muted-foreground xl:col-span-2">
            nächster Schritt
            <input
              name="nextStep"
              className="h-9 rounded-md border bg-background px-3 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-ring"
              placeholder="Aktion des Verantwortlichen"
            />
          </label>
          <div className="flex items-end">
            <Button size="sm" type="submit">
              Erstellen
            </Button>
          </div>
        </form>
      </section>

      <form className="mb-5 flex flex-wrap items-end gap-3" action="/cases">
        <FilterSelect
          name="status"
          label="Status"
          value={filters.status}
          options={caseStatuses.map((status) => ({
            id: status,
            name: formatLabel(status),
          }))}
          allLabel="alle"
        />
        <FilterSelect
          name="type"
          label="Typ"
          value={filters.type}
          options={caseTypes.map((type) => ({ id: type, name: formatLabel(type) }))}
          allLabel="alle"
        />
        <FilterSelect
          name="priority"
          label="Priorität"
          value={filters.priority}
          options={casePriorities.map((priority) => ({
            id: priority,
            name: formatLabel(priority),
          }))}
          allLabel="alle"
        />
        <Button size="sm" type="submit">
          Anwenden
        </Button>
      </form>

      <TableShell>
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Vorgang</th>
              <th className="px-4 py-3 font-medium">Typ</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Priorität</th>
              <th className="px-4 py-3 font-medium">verantwortlich</th>
              <th className="px-4 py-3 font-medium">Mitarbeiter</th>
              <th className="px-4 py-3 font-medium">Kunde / Standort</th>
              <th className="px-4 py-3 font-medium">Partnerfirma</th>
              <th className="px-4 py-3 font-medium">erstellt</th>
              <th className="px-4 py-3 font-medium">fällig</th>
              <th className="px-4 py-3 font-medium">Betrag</th>
              <th className="px-4 py-3 font-medium">nächster Schritt / Ergebnis</th>
              <th className="px-4 py-3 font-medium">Aktualisieren</th>
            </tr>
          </thead>
          <tbody>
            {cases.length === 0 ? (
              <EmptyTableRow colSpan={13} label="Keine Vorgänge für diese Filter." />
            ) : (
              cases.map((item) => (
                <tr key={item.id} className="border-t align-top">
                  <td className="min-w-56 px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3">{formatLabel(item.type)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={item.status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={item.priority} />
                  </td>
                  <td className="px-4 py-3">{item.owner}</td>
                  <td className="min-w-40 px-4 py-3">{item.employee}</td>
                  <td className="min-w-44 px-4 py-3">
                    {item.customer}
                    {item.site !== "-" ? ` / ${item.site}` : ""}
                  </td>
                  <td className="min-w-40 px-4 py-3">{item.partnerCompany}</td>
                  <td className="px-4 py-3">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3">{formatDate(item.dueDate)}</td>
                  <td className="px-4 py-3">
                    {formatCurrency(item.amount, item.currency)}
                  </td>
                  <td className="min-w-56 px-4 py-3">
                    {["resolved", "cancelled"].includes(item.status)
                      ? item.outcome
                      : item.nextStep}
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateCaseStatusAction} className="flex gap-2">
                      <input name="caseId" type="hidden" value={item.id} />
                      <select
                        name="status"
                        defaultValue={item.status}
                        className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                      >
                        {caseStatuses.map((status) => (
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
    </>
  );
}
