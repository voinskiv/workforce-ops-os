import { formatLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

const toneByValue: Record<string, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  appeared: "border-sky-200 bg-sky-50 text-sky-800",
  planned: "border-blue-200 bg-blue-50 text-blue-800",
  confirmed: "border-blue-200 bg-blue-50 text-blue-800",
  announced: "border-slate-200 bg-slate-50 text-slate-700",
  created: "border-slate-200 bg-slate-50 text-slate-700",
  no_show: "border-red-200 bg-red-50 text-red-800",
  missed: "border-red-200 bg-red-50 text-red-800",
  high: "border-orange-200 bg-orange-50 text-orange-800",
  critical: "border-red-200 bg-red-50 text-red-800",
  open: "border-amber-200 bg-amber-50 text-amber-800",
  in_progress: "border-blue-200 bg-blue-50 text-blue-800",
  waiting_for_partner: "border-violet-200 bg-violet-50 text-violet-800",
  waiting_for_customer: "border-violet-200 bg-violet-50 text-violet-800",
  waiting_for_management: "border-orange-200 bg-orange-50 text-orange-800",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-800",
  replacement_requested: "border-orange-200 bg-orange-50 text-orange-800",
  stabil: "border-emerald-200 bg-emerald-50 text-emerald-800",
  beobachten: "border-amber-200 bg-amber-50 text-amber-800",
  kritisch: "border-red-200 bg-red-50 text-red-800",
};

type StatusBadgeProps = {
  value?: string | null;
  className?: string;
};

export function StatusBadge({ value, className }: StatusBadgeProps) {
  const tone = value ? toneByValue[value] : undefined;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium leading-none",
        tone ?? "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      {formatLabel(value)}
    </span>
  );
}
