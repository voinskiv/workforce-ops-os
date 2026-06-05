import Link from "next/link";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock3,
  Gauge,
  Handshake,
  ShieldCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Steuerungsübersicht", icon: Gauge },
  { href: "/weekly-control", label: "Wochensteuerung", icon: CalendarCheck },
  { href: "/employees", label: "Mitarbeiter", icon: Users },
  { href: "/onboarding", label: "Onboarding / Startkontrolle", icon: BadgeCheck },
  { href: "/planning", label: "Einsatzplanung", icon: CalendarDays },
  { href: "/time-validation", label: "Zeitprüfung", icon: Clock3 },
  { href: "/customer-rules", label: "Kundenregeln", icon: ShieldCheck },
  { href: "/cases", label: "Offene Vorgänge", icon: ClipboardList },
  { href: "/customers", label: "Kunden", icon: Building2 },
  { href: "/partner-companies", label: "Partnerfirmen", icon: Handshake },
] as const;

type AppNavProps = {
  className?: string;
};

export function AppNav({ className }: AppNavProps) {
  return (
    <aside
      className={cn(
        "flex min-h-screen w-full flex-col border-r border-blue-100/80 bg-white/92 px-4 py-5 text-sidebar-foreground shadow-[8px_0_30px_rgba(15,23,42,0.04)] backdrop-blur md:w-72",
        className,
      )}
    >
      <Link href="/dashboard" className="mb-7 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-3 transition-colors hover:bg-blue-50">
        <span className="flex size-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/25">
          <BriefcaseBusiness className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold tracking-tight text-slate-950">Workforce Ops OS</span>
          <span className="block text-xs font-medium text-blue-700">
            Operative Steuerung
          </span>
        </span>
      </Link>

      <nav aria-label="Main navigation" className="grid gap-1.5">
        {navItems.map((item, index) => (
          <Link
            className={cn(
              "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-blue-100 hover:bg-blue-50 hover:text-blue-700",
              index === 0 && "border-blue-100 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/80",
            )}
            href={item.href}
            key={item.href}
          >
            <item.icon className="size-4" aria-hidden="true" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
