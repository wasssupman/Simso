import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { MOCK_BOARD_POSTS } from '@/lib/mock-data';
import { BoardCard } from './board-card';
import { SeasonBadge } from './season-badge';

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Header title="계절 게시판" />

      <main className="mx-auto max-w-lg pb-24">
        {/* 현재 계절 */}
        <div className="flex flex-col items-center gap-4 px-6 py-10">
          <SeasonBadge />
          <h2 className="text-xl font-light tracking-wider text-[var(--color-ink)]">
            비움 일지
          </h2>
          <p className="text-center text-sm leading-6 text-[var(--color-warm-gray)]">
            버린 것, 정리한 것, 놓아준 것.
            <br />
            비움의 기록을 나눠보세요.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--color-beige)]" />

        {/* 게시물 목록 */}
        {MOCK_BOARD_POSTS.map((post) => (
          <BoardCard key={post.id} post={post} />
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
