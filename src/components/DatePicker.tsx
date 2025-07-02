"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  label: string;
  selectedDate?: Date | null;
  onDateChange: (date: Date | undefined) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

export function DatePicker({
  label,
  selectedDate,
  onDateChange,
  id = "date-picker",
  placeholder = "Select date",
  className,
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`flex flex-col gap-2  ${className ?? ""}`}>
      <Label htmlFor={id} className="px-1">
        {label}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className="w-full justify-between font-normal p-6"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 overflow-hidden"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(date: Date | undefined) => {
              onDateChange(date);
              setOpen(false);
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
