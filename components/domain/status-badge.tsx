import { formatLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

const toneByValue: Record<string, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  appeared: "border-cyan-200 bg-cyan-50 text-cyan-800",
  planned: "border-blue-200 bg-blue-50 text-blue-800",
  confirmed: "border-blue-200 bg-blue-50 text-blue-800",
  announced: "border-sky-200 bg-sky-50 text-sky-800",
  created: "border-sky-200 bg-sky-50 text-sky-800",
  no_show: "border-red-200 bg-red-50 text-red-800",
  missed: "border-red-200 bg-red-50 text-red-800",
  high: "border-amber-200 bg-amber-50 text-amber-900",
  critical: "border-red-200 bg-red-50 text-red-800",
  open: "border-blue-200 bg-blue-50 text-blue-800",
  in_progress: "border-cyan-200 bg-cyan-50 text-cyan-800",
  waiting_for_partner: "border-amber-200 bg-amber-50 text-amber-900",
  waiting_for_customer: "border-amber-200 bg-amber-50 text-amber-900",
  waiting_for_management: "border-orange-200 bg-orange-50 text-orange-900",
  assigned_to_foreman: "border-cyan-200 bg-cyan-50 text-cyan-800",
  sent_to_customer: "border-amber-200 bg-amber-50 text-amber-900",
  corrected: "border-emerald-200 bg-emerald-50 text-emerald-800",
  final: "border-emerald-200 bg-emerald-50 text-emerald-800",
  billable: "border-emerald-200 bg-emerald-50 text-emerald-800",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-800",
  replacement_requested: "border-orange-200 bg-orange-50 text-orange-900",
  inactive: "border-slate-200 bg-slate-50 text-slate-600",
  cancelled: "border-slate-200 bg-slate-50 text-slate-600",
  stabil: "border-emerald-200 bg-emerald-50 text-emerald-800",
  beobachten: "border-amber-200 bg-amber-50 text-amber-900",
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
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none shadow-sm shadow-slate-950/[0.02]",
        tone ?? "border-blue-100 bg-blue-50 text-blue-800",
        className,
      )}
    >
      {formatLabel(value)}
    </span>
  );
}
