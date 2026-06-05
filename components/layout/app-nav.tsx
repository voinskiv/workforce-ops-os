"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex min-h-screen w-full flex-col border-r border-blue-100 bg-white px-4 py-5 text-sidebar-foreground md:w-72",
        className,
      )}
    >
      <Link href="/dashboard" className="mb-7 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
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
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-100 hover:bg-blue-50 hover:text-blue-700",
                isActive && "border-blue-100 bg-blue-50 text-blue-700",
              )}
              href={item.href}
              key={item.href}
            >
              <item.icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
