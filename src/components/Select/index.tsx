import React from "react";

// Định nghĩa kiểu dữ liệu cho option
interface Option {
  label: string;
  value: string;
}

// Định nghĩa kiểu props cho component Select
interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Component Select với TypeScript
const Select: React.FC<SelectProps> = ({
  options = [],
  value = "",
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}) => {
  return (
    <select
      className={`select-component ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
