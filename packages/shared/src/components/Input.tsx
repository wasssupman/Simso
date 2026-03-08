import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-lg border border-[var(--color-beige)] bg-white px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-warm-gray)] focus:border-[var(--color-olive)] focus:outline-none transition ${className}`}
        {...props}
      />
    </div>
  );
}
