"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs tracking-wider text-[var(--color-warm-gray)] transition-colors hover:text-[var(--color-ink-light)]"
    >
      로그아웃
    </button>
  );
}
