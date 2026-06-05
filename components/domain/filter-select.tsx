import { formatLabel } from "@/lib/format";

type FilterSelectProps = {
  name: string;
  label: string;
  value?: string;
  options: { id: string; name: string }[];
  allLabel?: string;
};

export function FilterSelect({
  name,
  label,
  value,
  options,
  allLabel = "All",
}: FilterSelectProps) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-slate-600">
      {label}
      <select
        name={name}
        defaultValue={value ?? ""}
        className="h-9 rounded-xl border border-blue-100 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name || formatLabel(option.id)}
          </option>
        ))}
      </select>
    </label>
  );
}
