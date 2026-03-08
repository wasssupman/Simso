import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <main className="flex flex-col items-center gap-14 text-center">
        {/* 로고 */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl font-light tracking-[0.3em] text-[var(--color-ink)]">
            심소
          </h1>
          <span className="text-sm tracking-[0.15em] text-[var(--color-warm-gray)]">
            SIMSO
          </span>
        </div>

        {/* 슬로건 */}
        <p className="max-w-xs text-lg leading-9 text-[var(--color-ink-light)]">
          소소한 일상,
          <br />
          단순한 삶으로의 회귀.
        </p>

        {/* 구분선 */}
        <div className="h-px w-12 bg-[var(--color-beige)]" />

        {/* 설명 */}
        <p className="max-w-sm text-sm leading-7 text-[var(--color-warm-gray)]">
          느리게 읽고 · 작게 기록하고 · 조용히 공감하는 공간.
          <br />
          오늘 하루, 소소한 한 줄을 남겨보세요.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/feed"
            className="rounded-full bg-[var(--color-ink)] px-10 py-3.5 text-sm tracking-wider text-[var(--color-ivory)] transition-colors duration-500 hover:bg-[var(--color-olive)]"
          >
            둘러보기
          </Link>
          <Link
            href="/login"
            className="text-sm text-[var(--color-warm-gray)] transition-colors hover:text-[var(--color-ink-light)]"
          >
            로그인
          </Link>
        </div>

        {/* 하단 문구 */}
        <span className="text-xs font-light tracking-widest text-[var(--color-warm-gray)]">
          오늘도 소소하게.
        </span>
      </main>
    </div>
  );
}
