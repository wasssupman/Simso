import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[var(--color-beige)] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-[var(--color-ink)]">Avatar</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/create"
                className="rounded-lg bg-[var(--color-ink)] px-4 py-2 text-sm font-normal text-white hover:bg-[var(--color-olive)] transition"
              >
                시작하기
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl leading-tight">
            나만의 아바타로
            <br />
            가상 피팅 경험
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-[var(--color-ink-light)] max-w-xl mx-auto">
            내 사진 한 장으로 개인화된 아바타를 생성하고,
            다양한 상품을 가상으로 착용해보세요.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/create"
              className="rounded-lg bg-[var(--color-ink)] px-6 py-3 text-base font-normal text-white hover:bg-[var(--color-olive)] transition"
            >
              아바타 만들기
            </Link>
            <Link
              href="#how-it-works"
              className="text-base font-normal text-[var(--color-warm-gray)] hover:text-[var(--color-olive)] transition"
            >
              어떻게 작동하나요
            </Link>
          </div>
        </div>

        <div id="how-it-works" className="mt-32">
          <h3 className="text-2xl font-medium text-center text-[var(--color-ink)] mb-16">
            간단한 3단계
          </h3>
          <div className="space-y-12">
            <div className="rounded-xl border border-[var(--color-beige)] bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--color-beige)] bg-[var(--color-ivory)]">
                  <span className="text-xl font-medium text-[var(--color-ink)]">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[var(--color-ink)] mb-2">
                    사진 업로드
                  </h4>
                  <p className="text-base font-light text-[var(--color-ink-light)] leading-relaxed">
                    얼굴이 잘 보이는 정면 사진을 업로드하세요
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-beige)] bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--color-beige)] bg-[var(--color-ivory)]">
                  <span className="text-xl font-medium text-[var(--color-ink)]">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[var(--color-ink)] mb-2">
                    아바타 생성
                  </h4>
                  <p className="text-base font-light text-[var(--color-ink-light)] leading-relaxed">
                    AI가 자동으로 나만의 3D 아바타를 생성합니다
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-beige)] bg-white p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--color-beige)] bg-[var(--color-ivory)]">
                  <span className="text-xl font-medium text-[var(--color-ink)]">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-[var(--color-ink)] mb-2">
                    가상 피팅
                  </h4>
                  <p className="text-base font-light text-[var(--color-ink-light)] leading-relaxed">
                    다양한 상품을 아바타에 입혀보고 결정하세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 rounded-xl border border-[var(--color-beige)] bg-[var(--color-beige)] p-12 text-center">
          <h3 className="text-2xl font-medium text-[var(--color-ink)]">
            지금 바로 시작해보세요
          </h3>
          <p className="mt-4 text-base font-light text-[var(--color-ink-light)]">
            무료로 아바타를 생성하고 가상 피팅을 체험해보세요
          </p>
          <Link
            href="/create"
            className="mt-8 inline-block rounded-lg bg-[var(--color-ink)] px-6 py-3 text-base font-normal text-white hover:bg-[var(--color-olive)] transition"
          >
            시작하기
          </Link>
        </div>
      </main>

      <footer className="mt-32 border-t border-[var(--color-beige)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-light text-[var(--color-warm-gray)]">
            © 2026 Avatar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
