import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md'
}) => {
  const [focused, setFocused] = useState(false);

  const baseStyle = "rounded transition-colors w-full";
  const sizeStyles = {
    sm: "p-2 text-sm",
    md: "p-3 text-base",
    lg: "p-4 text-lg"
  };
  const variantStyles = {
    filled: "bg-gray-100 border border-gray-300",
    outlined: "border border-gray-400",
    ghost: "border-none bg-transparent"
  };
  const stateStyles = disabled ? "opacity-50 cursor-not-allowed" :
                     invalid ? "border-red-500" :
                     focused ? "border-blue-500" : "";

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium">{label}</label>}
      <div className="relative">
        <input
          type="text"
          className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${stateStyles}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
      {helperText && !invalid && <span className="text-gray-500 text-sm">{helperText}</span>}
      {invalid && errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
    </div>
  );
};
