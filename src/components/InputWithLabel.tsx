import { Input } from "./ui/input";
import { Label } from "./ui/label";

import React, { ChangeEvent } from "react";

const InputWithLabel: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">{label}</Label>
      <Input
        type={type}
        id="email"
        placeholder={placeholder}
        className="p-6"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputWithLabel;
