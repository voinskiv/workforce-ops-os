import { cn } from "@/lib/utils";

type TableShellProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function TableShell({ title, children, className }: TableShellProps) {
  return (
    <section className={cn("rounded-md border bg-card", className)}>
      {title ? (
        <div className="border-b px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        </div>
      ) : null}
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

export function EmptyTableRow({ colSpan, label }: { colSpan: number; label: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center text-sm text-muted-foreground">
        {label}
      </td>
    </tr>
  );
}
