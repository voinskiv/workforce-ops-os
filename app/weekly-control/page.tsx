import Link from "next/link";

import { PageHeading } from "@/components/domain/page-heading";
import { StatusBadge } from "@/components/domain/status-badge";
import { EmptyTableRow, TableShell } from "@/components/domain/table-shell";
import { Button } from "@/components/ui/button";
import {
  getWeeklyControlData,
  type WeeklyControlData,
} from "@/lib/data/workforce";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const summaryCards: {
  key: keyof WeeklyControlData["cards"];
  label: string;
  href: string;
}[] = [
  {
    key: "plannedEmployees",
    label: "geplante Mitarbeiter",
    href: "/employees?status=planned",
  },
  {
    key: "activeEmployees",
    label: "aktive Mitarbeiter",
    href: "/employees?status=active",
  },
  { key: "noShows", label: "No-Shows", href: "/employees?status=no_show" },
  {
    key: "openOnboardingItems",
    label: "offene Startkontrollen",
    href: "/onboarding",
  },
  {
    key: "openTimeIssues",
    label: "offene Zeitkorrekturen",
    href: "/time-validation",
  },
  { key: "openCases", label: "offene Vorgänge", href: "/cases?status=open" },
  {
    key: "highPriorityCases",
    label: "kritische Fälle",
    href: "/cases?priority=high",
  },
  {
    key: "casesWithoutOwner",
    label: "ohne Verantwortlichen",
    href: "/cases",
  },
];

const readinessCards = [
  ["open", "offen", "/time-validation?status=open"],
  [
    "assignedToForeman",
    "an Vorarbeiter",
    "/time-validation?status=assigned_to_foreman",
  ],
  [
    "sentToCustomer",
    "an Kunde zur Korrektur",
    "/time-validation?status=sent_to_customer",
  ],
  ["corrected", "korrigiert", "/time-validation?status=corrected"],
] as const;

function formatHours(value?: number | null) {
  if (value === undefined || value === null) return "-";
  return `${value.toFixed(2)} h`;
}

export default async function WeeklyControlPage() {
  const data = await getWeeklyControlData();

  return (
    <>
      <PageHeading
        title="Wochensteuerung"
        description="Management-Blick auf die operative Woche: kritische Vorgänge, Zeitkorrekturen, Startkontrollen, Kunden-/Standortrisiken und Partnerqualität. Die Seite verdichtet bestehende MVP-Daten zu klaren Verantwortlichkeiten und nächsten Schritten."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard">Steuerungsübersicht</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/cases">Offene Vorgänge</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/time-validation">Zeitprüfung</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/onboarding">Startkontrolle</Link>
        </Button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Link
            className="rounded-md border bg-card p-4 transition-colors hover:bg-accent"
            href={card.href}
            key={card.key}
          >
            <p className="text-xs font-medium text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {data.cards[card.key]}
            </p>
          </Link>
        ))}
      </section>

      <section className="my-5 rounded-md border bg-card p-4">
        <h2 className="text-sm font-semibold">Management Summary</h2>
        <p className="mt-2 max-w-5xl text-sm leading-6 text-muted-foreground">
          {data.managementSummary}
        </p>
      </section>

      <TableShell title="Kritische Entscheidungen">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Thema</th>
              <th className="px-4 py-3 font-medium">Bereich</th>
              <th className="px-4 py-3 font-medium">Risiko</th>
              <th className="px-4 py-3 font-medium">Verantwortlich</th>
              <th className="px-4 py-3 font-medium">nächster Schritt</th>
              <th className="px-4 py-3 font-medium">Frist</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.criticalDecisions.length === 0 ? (
              <EmptyTableRow colSpan={7} label="Keine kritischen Entscheidungen." />
            ) : (
              data.criticalDecisions.map((item) => (
                <tr key={item.id} className="border-t align-top">
                  <td className="min-w-64 px-4 py-3">
                    <Link className="font-medium hover:underline" href={item.href}>
                      {item.topic}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{item.area}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={item.risk} />
                  </td>
                  <td className="min-w-40 px-4 py-3">{item.owner}</td>
                  <td className="min-w-72 px-4 py-3">{item.nextStep}</td>
                  <td className="px-4 py-3">{formatDate(item.dueDate)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={item.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableShell>

      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <TableShell title="Kunden- und Standort-Risiko">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Kunde</th>
                <th className="px-4 py-3 font-medium">Standort</th>
                <th className="px-4 py-3 font-medium">Zeitkorrekturen</th>
                <th className="px-4 py-3 font-medium">No-Shows</th>
                <th className="px-4 py-3 font-medium">Vorgänge</th>
                <th className="px-4 py-3 font-medium">Risiko</th>
              </tr>
            </thead>
            <tbody>
              {data.customerSiteRisks.length === 0 ? (
                <EmptyTableRow colSpan={6} label="Keine Kundenrisiken sichtbar." />
              ) : (
                data.customerSiteRisks.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="px-4 py-3">
                      <Link className="font-medium hover:underline" href={row.href}>
                        {row.customer}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{row.site}</td>
                    <td className="px-4 py-3">{row.openTimeIssues}</td>
                    <td className="px-4 py-3">{row.noShows}</td>
                    <td className="px-4 py-3">{row.openCases}</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={row.risk} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>

        <TableShell title="Partnerqualität">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Partnerfirma</th>
                <th className="px-4 py-3 font-medium">aktive Mitarbeiter</th>
                <th className="px-4 py-3 font-medium">No-Shows</th>
                <th className="px-4 py-3 font-medium">offene Vorgänge</th>
                <th className="px-4 py-3 font-medium">Bewertung</th>
              </tr>
            </thead>
            <tbody>
              {data.partnerQuality.length === 0 ? (
                <EmptyTableRow colSpan={5} label="Keine Partnerdaten sichtbar." />
              ) : (
                data.partnerQuality.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="px-4 py-3">
                      <Link className="font-medium hover:underline" href={row.href}>
                        {row.partnerCompany}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{row.activeEmployees}</td>
                    <td className="px-4 py-3">{row.noShows}</td>
                    <td className="px-4 py-3">{row.openCases}</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={row.risk} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[24rem_1fr]">
        <section className="rounded-md border bg-card p-4">
          <h2 className="text-sm font-semibold">
            Abrechnungsbereitschaft / Zeitrisiko
          </h2>
          <div className="mt-4 grid gap-3">
            {readinessCards.map(([key, label, href]) => (
              <Link
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent"
                href={href}
                key={key}
              >
                <span>{label}</span>
                <span className="text-lg font-semibold">
                  {data.billingReadiness[key]}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <TableShell title="final / abrechenbar Beispiele">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Mitarbeiter</th>
                <th className="px-4 py-3 font-medium">Kunde / Standort</th>
                <th className="px-4 py-3 font-medium">Datum</th>
                <th className="px-4 py-3 font-medium">Rohzeit</th>
                <th className="px-4 py-3 font-medium">geprüfte Zeit</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.billingReadiness.finalBillableExamples.length === 0 ? (
                <EmptyTableRow colSpan={6} label="Keine finalen Zeitbeispiele." />
              ) : (
                data.billingReadiness.finalBillableExamples.slice(0, 6).map((entry) => (
                  <tr key={entry.id} className="border-t">
                    <td className="px-4 py-3">
                      <Link
                        className="font-medium hover:underline"
                        href={`/employees/${entry.employeeId}`}
                      >
                        {entry.employee}
                      </Link>
                    </td>
                    <td className="min-w-44 px-4 py-3">
                      {entry.customer}
                      {entry.site !== "-" ? ` / ${entry.site}` : ""}
                    </td>
                    <td className="px-4 py-3">{formatDate(entry.workDate)}</td>
                    <td className="px-4 py-3">{formatHours(entry.rawHours)}</td>
                    <td className="px-4 py-3">
                      {formatHours(entry.validatedHours)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={entry.status} />
                    </td>
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
