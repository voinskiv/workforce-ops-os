import Link from "next/link";

import { PageHeading } from "@/components/domain/page-heading";
import { StatusBadge } from "@/components/domain/status-badge";
import { EmptyTableRow, TableShell } from "@/components/domain/table-shell";
import { Button } from "@/components/ui/button";
import { getCustomerRules } from "@/lib/data/workforce";
import { formatLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CustomerRulesPage() {
  const rules = await getCustomerRules();

  return (
    <>
      <PageHeading
        title="Kundenregeln"
        description="Zeigt kundenspezifische Pausenlogik, Ersttag-Regeln, Korrekturwege und Abrechnungslogik. Wichtig, damit Zeitprüfung nicht nach Bauchgefühl läuft, sondern nach klar sichtbaren Regeln pro Kunde und Standort."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/time-validation">Zur Zeitprüfung</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/time-validation?status=sent_to_customer">
            Zeitprobleme beim Kunden
          </Link>
        </Button>
      </div>

      <TableShell>
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60 text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Kunde</th>
              <th className="px-4 py-3 font-medium">Standort</th>
              <th className="px-4 py-3 font-medium">Regeltyp</th>
              <th className="px-4 py-3 font-medium">Regel</th>
              <th className="px-4 py-3 font-medium">aktiv</th>
              <th className="px-4 py-3 font-medium">operative Erklärung</th>
              <th className="px-4 py-3 font-medium">Beispielauswirkung</th>
              <th className="px-4 py-3 font-medium">Konfiguration</th>
            </tr>
          </thead>
          <tbody>
            {rules.length === 0 ? (
              <EmptyTableRow colSpan={8} label="Keine Kundenregeln vorhanden." />
            ) : (
              rules.map((rule) => (
                <tr key={rule.id} className="border-t align-top">
                  <td className="px-4 py-3">{rule.customer}</td>
                  <td className="min-w-44 px-4 py-3">{rule.site}</td>
                  <td className="min-w-44 px-4 py-3">{formatLabel(rule.type)}</td>
                  <td className="min-w-56 px-4 py-3 font-medium">{rule.name}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={rule.active ? "active" : "inactive"} />
                  </td>
                  <td className="min-w-72 px-4 py-3">{rule.description}</td>
                  <td className="min-w-72 px-4 py-3">{rule.exampleImpact}</td>
                  <td className="min-w-64 px-4 py-3 text-xs leading-5 text-muted-foreground">
                    {rule.configSummary}
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
