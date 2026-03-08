"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <form className="flex w-full flex-col gap-5" action={formAction}>
      {state?.error && (
        <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
          {state.error}
        </div>
      )}
      <input
        type="email"
        name="email"
        placeholder="이메일"
        required
        className="w-full border-b border-[var(--color-beige)] bg-transparent py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-warm-gray)] focus:border-[var(--color-olive)] focus:outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        required
        className="w-full border-b border-[var(--color-beige)] bg-transparent py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-warm-gray)] focus:border-[var(--color-olive)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full rounded-full bg-[var(--color-ink)] py-3.5 text-sm tracking-wider text-[var(--color-ivory)] transition-colors duration-500 hover:bg-[var(--color-olive)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
