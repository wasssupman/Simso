import Link from 'next/link';

export function Header({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-beige)] bg-[var(--color-ivory)]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-center px-6 py-4">
        {title ? (
          <h1 className="text-sm tracking-[0.15em] text-[var(--color-ink)]">
            {title}
          </h1>
        ) : (
          <Link href="/feed" className="flex flex-col items-center">
            <span className="text-lg font-light tracking-[0.3em] text-[var(--color-ink)]">
              심소
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
