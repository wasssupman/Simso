export function SeasonBadge() {
  const month = new Date().getMonth() + 1;
  const season = getSeason(month);

  return (
    <span className="rounded-full border border-[var(--color-beige)] px-4 py-1 text-xs font-extralight tracking-widest text-[var(--color-warm-gray)]">
      {season.label}
    </span>
  );
}

function getSeason(month: number) {
  if (month >= 3 && month <= 5) return { label: '봄' };
  if (month >= 6 && month <= 8) return { label: '여름' };
  if (month >= 9 && month <= 11) return { label: '가을' };
  return { label: '겨울' };
}
