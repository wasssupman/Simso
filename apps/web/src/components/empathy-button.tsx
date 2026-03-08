'use client';

import { useState } from 'react';

interface EmpathyButtonProps {
  initialEmpathized: boolean;
  initialCount: number;
}

export function EmpathyButton({ initialEmpathized, initialCount }: EmpathyButtonProps) {
  const [empathized, setEmpathized] = useState(initialEmpathized);
  const [count, setCount] = useState(initialCount);

  const toggleEmpathy = () => {
    setEmpathized(!empathized);
    setCount(empathized ? count - 1 : count + 1);
  };

  return (
    <button
      onClick={toggleEmpathy}
      className={`flex items-center gap-1.5 transition-colors duration-300 ${
        empathized
          ? 'text-[var(--color-olive)]'
          : 'text-[var(--color-warm-gray)]'
      }`}
    >
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill={empathized ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
      <span className="text-xs">공감해요</span>
    </button>
  );
}
