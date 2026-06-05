import type { Metadata } from "next";

import { DataModeIndicator } from "@/components/domain/data-mode-indicator";
import { AppNav } from "@/components/layout/app-nav";

import "./globals.css";

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
    <html lang="en">
      <body>
        <div className="min-h-screen md:grid md:grid-cols-[18rem_1fr]">
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
