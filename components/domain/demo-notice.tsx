type DemoNoticeProps = {
  visible?: boolean;
  compact?: boolean;
};

export function DemoNotice({ visible, compact }: DemoNoticeProps) {
  if (!visible) return null;

  return (
    <div
      className={
        compact
          ? "rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900"
          : "mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
      }
    >
      This local view is using read-only demo data because no database is
      configured.
    </div>
  );
}
