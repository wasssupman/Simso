"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { INTEREST_KEYWORDS } from "@simso/shared";
import { signupAction } from "./actions";

type Step = "info" | "keywords";

export function SignupForm() {
  const [step, setStep] = useState<Step>("info");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [clientError, setClientError] = useState("");
  const [state, formAction, isPending] = useActionState(signupAction, undefined);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : prev.length < 5
          ? [...prev, keyword]
          : prev
    );
  };

  const handleInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError("");

    if (password.length < 8) {
      setClientError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    setStep("keywords");
  };

  const error = clientError || state?.error;

  // 키워드 선택 단계
  if (step === "keywords") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <main className="flex w-full max-w-sm flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-xl tracking-wider text-[var(--color-ink)]">
              어떤 소소함에 관심이 있으세요?
            </h1>
            <p className="text-sm text-[var(--color-warm-gray)]">
              최소 3개, 최대 5개까지 고를 수 있어요.
            </p>
          </div>

          {error && (
            <div className="w-full rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            {INTEREST_KEYWORDS.map((keyword) => {
              const isSelected = selectedKeywords.includes(keyword);
              return (
                <button
                  key={keyword}
                  onClick={() => toggleKeyword(keyword)}
                  type="button"
                  className={`rounded-full px-5 py-2 text-sm tracking-wider transition-all duration-300 ${
                    isSelected
                      ? "bg-[var(--color-ink)] text-[var(--color-ivory)]"
                      : "border border-[var(--color-beige)] text-[var(--color-warm-gray)] hover:border-[var(--color-warm-gray)]"
                  }`}
                >
                  {keyword}
                </button>
              );
            })}
          </div>

          <div className="flex w-full gap-3">
            <button
              onClick={() => { setStep("info"); setClientError(""); }}
              type="button"
              className="flex-1 rounded-full border border-[var(--color-beige)] py-3.5 text-sm tracking-wider text-[var(--color-ink)] transition-colors duration-500 hover:border-[var(--color-warm-gray)]"
            >
              이전
            </button>
            <form action={formAction} className="flex-1">
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="password" value={password} />
              <input type="hidden" name="nickname" value={nickname} />
              <input type="hidden" name="bio" value={bio} />
              <input type="hidden" name="keywords" value={JSON.stringify(selectedKeywords)} />
              <button
                type="submit"
                disabled={selectedKeywords.length < 3 || isPending}
                className={`w-full rounded-full py-3.5 text-sm tracking-wider transition-all duration-500 ${
                  selectedKeywords.length >= 3 && !isPending
                    ? "bg-[var(--color-ink)] text-[var(--color-ivory)] hover:bg-[var(--color-olive)]"
                    : "cursor-not-allowed bg-[var(--color-beige)] text-[var(--color-warm-gray)]"
                }`}
              >
                {isPending ? "가입 중..." : "심소 시작하기"}
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // 정보 입력 단계
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <main className="flex w-full max-w-sm flex-col items-center gap-12">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-light tracking-[0.3em] text-[var(--color-ink)]">
            심소
          </h1>
          <p className="text-sm text-[var(--color-warm-gray)]">
            반가워요, 천천히 시작해볼까요?
          </p>
        </div>

        {/* 가입 폼 */}
        <form className="flex w-full flex-col gap-5" onSubmit={handleInfoSubmit}>
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="닉네임"
            maxLength={12}
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full border-b border-[var(--color-beige)] bg-transparent py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-warm-gray)] focus:border-[var(--color-olive)] focus:outline-none"
          />
          <input
            type="text"
            placeholder="한 줄 소개 (선택)"
            maxLength={30}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border-b border-[var(--color-beige)] bg-transparent py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-warm-gray)] focus:border-[var(--color-olive)] focus:outline-none"
          />
          <input
            type="email"
            placeholder="이메일"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-[var(--color-beige)] bg-transparent py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-warm-gray)] focus:border-[var(--color-olive)] focus:outline-none"
          />
          <input
            type="password"
            placeholder="비밀번호 (최소 8자)"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-[var(--color-beige)] bg-transparent py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-warm-gray)] focus:border-[var(--color-olive)] focus:outline-none"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[var(--color-ink)] py-3.5 text-sm tracking-wider text-[var(--color-ivory)] transition-colors duration-500 hover:bg-[var(--color-olive)]"
          >
            다음
          </button>
        </form>

        {/* 로그인 링크 */}
        <Link
          href="/login"
          className="text-sm text-[var(--color-ink-light)] transition-colors hover:text-[var(--color-olive)]"
        >
          이미 계정이 있으신가요? 로그인
        </Link>

        <span className="text-xs font-light tracking-widest text-[var(--color-warm-gray)]">
          오늘도 소소하게.
        </span>
      </main>
    </div>
  );
}
