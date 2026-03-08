import type { Post } from '@/lib/mock-data';
import { EmpathyButton } from './empathy-button';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-b border-[var(--color-beige)] px-6 py-8">
      {/* 작성자 + 시간 */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-[var(--color-ink)]">
          {post.author}
        </span>
        <span className="text-xs text-[var(--color-warm-gray)]">
          {post.createdAt}
        </span>
      </div>

      {/* 본문 */}
      <p className="mb-5 text-[15px] leading-8 text-[var(--color-ink-light)]">
        {post.content}
      </p>

      {/* 키워드 + 공감 */}
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-[var(--color-beige)] px-3 py-1 text-xs text-[var(--color-warm-gray)]">
          {post.keyword}
        </span>
        <EmpathyButton
          initialEmpathized={post.hasEmpathized}
          initialCount={post.empathyCount}
        />
      </div>
    </article>
  );
}
