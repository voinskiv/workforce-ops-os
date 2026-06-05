import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { DataModeIndicator } from "@/components/domain/data-mode-indicator";
import { AppNav } from "@/components/layout/app-nav";
import { cn } from "@/lib/utils";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Workforce Ops OS",
  description: "MVP scaffold for a workforce operations control layer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={cn(geistSans.variable, geistMono.variable)}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_28rem),linear-gradient(180deg,_#ffffff_0%,_#f7faff_42%,_#f8fafc_100%)] md:grid md:grid-cols-[18rem_1fr]">
          <AppNav />
          <main className="min-w-0 px-5 py-6 md:px-8 lg:px-10">
            <div className="mb-4">
              <DataModeIndicator />
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
