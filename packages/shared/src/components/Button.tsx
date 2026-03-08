import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-lg px-6 py-3 font-normal transition-all duration-150";

  const variantStyles = {
    primary:
      "bg-[var(--color-ink)] text-white hover:bg-[var(--color-olive)]",
    secondary:
      "bg-transparent text-[var(--color-ink)] border border-[var(--color-beige)] hover:bg-[var(--color-beige)]",
    text: "bg-transparent text-[var(--color-warm-gray)] hover:text-[var(--color-olive)] px-0",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
