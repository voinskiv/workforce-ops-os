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
          ? "rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 shadow-sm"
          : "mb-5 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-900 shadow-sm"
      }
    >
      Demo-Modus: Diese Ansicht nutzt lokale Beispieldaten, weil noch keine
      Datenbank verbunden ist.
    </div>
  );
}
