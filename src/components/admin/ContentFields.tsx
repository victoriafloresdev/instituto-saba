import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BaseProps {
  label: string;
  className?: string;
  hint?: ReactNode;
  required?: boolean;
}

function FieldShell({
  label,
  className,
  hint,
  required,
  children,
}: BaseProps & { children: ReactNode }) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-sm">
        {label}
        {required && " *"}
      </Label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function TextField({
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  min,
  ...shell
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  min?: number;
}) {
  return (
    <FieldShell {...shell}>
      <Input
        value={value}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  value,
  onChange,
  rows = 4,
  maxLength,
  placeholder,
  ...shell
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <FieldShell {...shell}>
      <Textarea
        value={value}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}

export function SelectField<T extends string>({
  value,
  onChange,
  options,
  ...shell
}: BaseProps & {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <FieldShell {...shell}>
      <Select value={value} onValueChange={(next) => onChange(next as T)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}
