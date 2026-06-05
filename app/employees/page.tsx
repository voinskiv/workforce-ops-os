import Link from "next/link";

import { FilterSelect } from "@/components/domain/filter-select";
import { PageHeading } from "@/components/domain/page-heading";
import { StatusBadge } from "@/components/domain/status-badge";
import { EmptyTableRow, TableShell } from "@/components/domain/table-shell";
import { Button } from "@/components/ui/button";
import {
  employeeStatuses,
  getEmployees,
  getFilterOptions,
  onboardingStatuses,
  type EmployeeFilters,
} from "@/lib/data/workforce";
import { formatDate, formatLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filters: EmployeeFilters = {
    status: first(params.status),
    onboardingStatus: first(params.onboardingStatus),
    partnerCompanyId: first(params.partnerCompanyId),
    customerId: first(params.customerId),
  };

  const [employees, options] = await Promise.all([
    getEmployees(filters),
    getFilterOptions(),
  ]);

  return (
    <>
      <PageHeading
        title="Mitarbeiter"
        description="Zeigt den operativen Status jedes Mitarbeiters: Startkontrolle, aktueller Einsatz, Partnerfirma, Kunde und Einschränkungen. Wichtig, um sofort zu sehen, wer produktiv einsetzbar ist."
      />

      <form className="mb-5 flex flex-wrap items-end gap-3" action="/employees">
        <FilterSelect
          name="status"
          label="Status"
          value={filters.status}
          options={employeeStatuses.map((status) => ({
            id: status,
            name: formatLabel(status),
          }))}
          allLabel="alle"
        />
        <FilterSelect
          name="onboardingStatus"
          label="Startkontrolle"
          value={filters.onboardingStatus}
          options={onboardingStatuses.map((status) => ({
            id: status,
            name: formatLabel(status),
          }))}
          allLabel="alle"
        />
        <FilterSelect
          name="partnerCompanyId"
          label="Partnerfirma"
          value={filters.partnerCompanyId}
          options={options.partnerCompanies}
          allLabel="alle"
        />
        <FilterSelect
          name="customerId"
          label="Kunde"
          value={filters.customerId}
          options={options.customers}
          allLabel="alle"
        />
        <Button size="sm" type="submit">
          Anwenden
        </Button>
        <Button asChild size="sm" type="button" variant="outline">
          <Link href="/employees">Zurücksetzen</Link>
        </Button>
      </form>

      <TableShell>
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Startkontrolle</th>
              <th className="px-4 py-3 font-medium">Partnerfirma</th>
              <th className="px-4 py-3 font-medium">Kunde</th>
              <th className="px-4 py-3 font-medium">Standort</th>
              <th className="px-4 py-3 font-medium">Schicht</th>
              <th className="px-4 py-3 font-medium">Position</th>
              <th className="px-4 py-3 font-medium">Karte</th>
              <th className="px-4 py-3 font-medium">Einschränkungen</th>
              <th className="px-4 py-3 font-medium">Aktualisiert</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <EmptyTableRow colSpan={11} label="Keine Mitarbeiter für diese Filter." />
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="border-t align-top">
                  <td className="px-4 py-3">
                    <Link
                      className="font-medium text-foreground hover:underline"
                      href={`/employees/${employee.id}`}
                    >
                      {employee.displayName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={employee.status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={employee.onboardingStatus} />
                  </td>
                  <td className="px-4 py-3">{employee.partnerCompany}</td>
                  <td className="px-4 py-3">{employee.customer}</td>
                  <td className="px-4 py-3">{employee.site}</td>
                  <td className="px-4 py-3">{employee.shift}</td>
                  <td className="px-4 py-3">{employee.position}</td>
                  <td className="px-4 py-3">{employee.cardNumber}</td>
                  <td className="px-4 py-3">
                    {employee.restrictionCount > 0 ? (
                      <span className="inline-flex rounded-md border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800">
                        {employee.restrictionCount} Einschränkung
                        {employee.restrictionCount === 1 ? "" : "en"}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{formatDate(employee.updatedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableShell>
    </>
  );
}
