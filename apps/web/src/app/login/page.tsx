import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "로그인 - 심소",
  description: "다시 돌아오셨군요. 오늘도 소소하게.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <main className="flex w-full max-w-sm flex-col items-center gap-12">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-light tracking-[0.3em] text-[var(--color-ink)]">
            심소
          </h1>
          <p className="text-sm text-[var(--color-warm-gray)]">
            다시 돌아오셨군요.
          </p>
        </div>

        {/* 로그인 폼 */}
        <LoginForm />

        {/* 구분선 */}
        <div className="flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-[var(--color-beige)]" />
          <span className="text-xs text-[var(--color-warm-gray)]">또는</span>
          <div className="h-px flex-1 bg-[var(--color-beige)]" />
        </div>

        {/* 회원가입 링크 */}
        <Link
          href="/signup"
          className="text-sm text-[var(--color-ink-light)] transition-colors hover:text-[var(--color-olive)]"
        >
          처음이신가요? 가입하기
        </Link>

        <span className="text-xs font-light tracking-widest text-[var(--color-warm-gray)]">
          오늘도 소소하게.
        </span>
      </main>
    </div>
  );
}
