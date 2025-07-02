import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type CommonSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  id?: string;
  placeholder?: string;
};

export default function CommonSelect({
  label,
  value,
  onChange,
  options,
  id,
  placeholder,
}: CommonSelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={selectId} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={selectId} className="w-full p-6">
          <SelectValue
            placeholder={placeholder || `Select ${label.toLowerCase()}`}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
