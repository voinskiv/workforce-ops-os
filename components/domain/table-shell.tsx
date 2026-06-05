import { cn } from "@/lib/utils";

type TableShellProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function TableShell({ title, children, className }: TableShellProps) {
  return (
    <section className={cn("overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm shadow-blue-950/[0.03]", className)}>
      {title ? (
        <div className="border-b border-blue-100 bg-blue-50/55 px-4 py-3">
          <h2 className="text-sm font-semibold tracking-tight text-slate-950">{title}</h2>
        </div>
      ) : null}
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

export function EmptyTableRow({ colSpan, label }: { colSpan: number; label: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center text-sm text-slate-500">
        {label}
      </td>
    </tr>
  );
}
