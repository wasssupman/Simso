import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const hoverStyles = hover ? "hover:shadow-sm transition-shadow" : "";

  return (
    <div
      className={`rounded-xl border border-[var(--color-beige)] bg-white p-6 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
