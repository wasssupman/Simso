'use client';

import { useState } from 'react';
import type { BoardPost } from '@/lib/mock-data';

export function BoardCard({ post }: { post: BoardPost }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="border-b border-[var(--color-beige)] px-6 py-7">
      {/* 제목 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mb-2 w-full text-left text-[15px] text-[var(--color-ink)] transition-colors hover:text-[var(--color-olive)]"
      >
        {post.title}
      </button>

      {/* 작성자 + 시간 */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-xs text-[var(--color-warm-gray)]">
          {post.author}
        </span>
        <span className="text-xs text-[var(--color-beige)]">·</span>
        <span className="text-xs text-[var(--color-warm-gray)]">
          {post.createdAt}
        </span>
      </div>

      {/* 펼침 본문 */}
      {expanded && (
        <p className="mb-4 text-sm leading-7 text-[var(--color-ink-light)] animate-[fadeIn_0.3s_ease]">
          {post.content}
        </p>
      )}

      {/* 공감 */}
      <div className="flex items-center gap-1.5 text-[var(--color-warm-gray)]">
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        <span className="text-xs">공감해요</span>
      </div>
    </article>
  );
}
