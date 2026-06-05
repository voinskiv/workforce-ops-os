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
        "flex min-h-screen w-full flex-col border-r bg-sidebar px-4 py-5 text-sidebar-foreground md:w-72",
        className,
      )}
    >
      <Link href="/dashboard" className="mb-7 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
          <BriefcaseBusiness className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold">Workforce Ops OS</span>
          <span className="block text-xs text-sidebar-foreground/65">
            Operative Steuerung
          </span>
        </span>
      </Link>

      <nav aria-label="Main navigation" className="grid gap-1">
        {navItems.map((item) => (
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/78 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
