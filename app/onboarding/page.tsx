import Link from "next/link";

import { DemoNotice } from "@/components/domain/demo-notice";
import { PageHeading } from "@/components/domain/page-heading";
import { StatusBadge } from "@/components/domain/status-badge";
import { Button } from "@/components/ui/button";
import {
  advanceOnboardingAction,
  markNoShowAction,
} from "@/lib/actions/workforce";
import {
  getNextOnboardingStatus,
  getOnboardingEmployees,
} from "@/lib/data/workforce";
import { formatDate, formatLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const readonlyDemo = params.demo === "readonly";
  const groups = await getOnboardingEmployees();

  return (
    <>
      <PageHeading
        title="Onboarding / Startkontrolle"
        description="Zeigt, welche neuen Mitarbeiter wirklich startklar sind: Dokumente, Karte, Kundensystem, erster Arbeitstag und geplanter Einsatz. Wichtig, weil angekündigte Mitarbeiter erst nach Erscheinen produktive Kapazität sind."
      />
      <DemoNotice visible={readonlyDemo} />

      <div className="mb-5 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/cases?type=no_show">No-Show Vorgänge ansehen</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/employees">Mitarbeiterliste öffnen</Link>
        </Button>
      </div>

      <section className="grid gap-4 xl:grid-cols-2">
        {groups
          .filter((group) => group.employees.length > 0)
          .map((group) => (
            <div key={group.status} className="rounded-md border bg-card">
              <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                <h2 className="text-sm font-semibold">
                  {formatLabel(group.status)}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {group.employees.length}
                </span>
              </div>

              <div className="divide-y">
                {group.employees.map((employee) => {
                  const nextStatus = getNextOnboardingStatus(
                    employee.onboardingStatus,
                  );

                  return (
                    <div key={employee.id} className="grid gap-3 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/employees/${employee.id}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {employee.displayName}
                          </Link>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {employee.partnerCompany} · {employee.customer}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <StatusBadge value={employee.status} />
                          <StatusBadge value={employee.onboardingStatus} />
                        </div>
                      </div>

                      <dl className="grid gap-3 rounded-md bg-muted/50 p-3 text-sm sm:grid-cols-3">
                        <div>
                          <dt className="text-xs font-medium text-muted-foreground">
                            erster Arbeitstag
                          </dt>
                          <dd className="mt-1">
                            {formatDate(
                              employee.firstWorkday ?? employee.assignmentDate,
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium text-muted-foreground">
                            Standort
                          </dt>
                          <dd className="mt-1">{employee.assignmentSite}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium text-muted-foreground">
                            Schicht
                          </dt>
                          <dd className="mt-1">{employee.assignmentShift}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium text-muted-foreground">
                            Position
                          </dt>
                          <dd className="mt-1">{employee.assignmentPosition}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium text-muted-foreground">
                            Einsatz
                          </dt>
                          <dd className="mt-1">
                            {employee.assignmentStatus ? (
                              <StatusBadge value={employee.assignmentStatus} />
                            ) : (
                              "-"
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-medium text-muted-foreground">
                            aktualisiert
                          </dt>
                          <dd className="mt-1">{formatDate(employee.updatedAt)}</dd>
                        </div>
                      </dl>

                      <div className="flex flex-wrap gap-2">
                        {nextStatus ? (
                          <form action={advanceOnboardingAction}>
                            <input
                              name="employeeId"
                              type="hidden"
                              value={employee.id}
                            />
                            <input
                              name="nextStatus"
                              type="hidden"
                              value={nextStatus}
                            />
                            <Button size="sm" type="submit" variant="outline">
                              Weiter zu {formatLabel(nextStatus)}
                            </Button>
                          </form>
                        ) : null}

                        {employee.status !== "no_show" ? (
                          <form action={markNoShowAction}>
                            <input
                              name="employeeId"
                              type="hidden"
                              value={employee.id}
                            />
                            <input
                              name="employeeName"
                              type="hidden"
                              value={employee.displayName}
                            />
                            <Button size="sm" type="submit" variant="outline">
                              No-Show markieren + Vorgang erstellen
                            </Button>
                          </form>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
