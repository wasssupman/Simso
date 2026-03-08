import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { PostCard } from '@/components/post-card';
import { MOCK_POSTS } from '@/lib/mock-data';
import { KeywordFilter } from './keyword-filter';

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Header />

      <KeywordFilter />

      <main className="mx-auto max-w-lg pb-20">
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* 피드 끝 안내 */}
        <div className="flex flex-col items-center gap-3 py-16">
          <div className="h-px w-8 bg-[var(--color-beige)]" />
          <p className="text-xs font-light tracking-wider text-[var(--color-warm-gray)]">
            오늘의 소소함을 모두 읽었어요.
          </p>
          <p className="text-xs font-light text-[var(--color-warm-gray)]">
            내일 다시 만나요.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
