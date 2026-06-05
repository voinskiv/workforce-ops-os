import { DemoNotice } from "@/components/domain/demo-notice";
import { isDemoDataMode } from "@/lib/db/prisma";

export function DataModeIndicator() {
  return <DemoNotice compact visible={isDemoDataMode()} />;
}
