'use client';

import { useState } from 'react';

const KEYWORDS = ['전체', '산책', '요리', '독서', '비움', '차', '텃밭', '그림', '필사'];

export function KeywordFilter() {
  const [selected, setSelected] = useState('전체');

  return (
    <div className="sticky top-[57px] z-30 border-b border-[var(--color-beige)] bg-[var(--color-ivory)]/90 backdrop-blur-sm">
      <div className="mx-auto max-w-lg overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-6 py-3">
          {KEYWORDS.map((keyword) => (
            <button
              key={keyword}
              onClick={() => setSelected(keyword)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs tracking-wider transition-all duration-300 ${
                selected === keyword
                  ? 'bg-[var(--color-ink)] text-[var(--color-ivory)]'
                  : 'border border-[var(--color-beige)] text-[var(--color-warm-gray)] hover:border-[var(--color-warm-gray)]'
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
