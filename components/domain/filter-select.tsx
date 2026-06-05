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
    <label className="grid gap-1 text-xs font-medium text-muted-foreground">
      {label}
      <select
        name={name}
        defaultValue={value ?? ""}
        className="h-9 rounded-md border bg-background px-3 text-sm font-normal text-foreground outline-none focus:ring-2 focus:ring-ring"
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
