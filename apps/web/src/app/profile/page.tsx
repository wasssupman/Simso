import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@simso/database";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { LogoutButton } from "./logout-button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // 사용자 정보 가져오기
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      keywords: {
        select: { keyword: true },
      },
      posts: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          id: true,
          content: true,
          keywords: true,
          createdAt: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // 닉네임 첫 글자
  const firstChar = user.nickname.charAt(0);

  // 날짜 포맷 함수
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "오늘";
    if (days === 1) return "어제";
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    return `${Math.floor(days / 30)}개월 전`;
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Header title="나의 기록" />

      <main className="mx-auto max-w-lg pb-24">
        {/* 프로필 */}
        <div className="flex flex-col items-center gap-5 px-6 py-12">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.nickname}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-beige)]">
              <span className="text-2xl font-light text-[var(--color-ink-light)]">
                {firstChar}
              </span>
            </div>
          )}

          <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg tracking-wider text-[var(--color-ink)]">
              {user.nickname}
            </h2>
            {user.bio && (
              <p className="text-sm text-[var(--color-warm-gray)]">{user.bio}</p>
            )}
          </div>

          {user.keywords.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {user.keywords.map((kw) => (
                <span
                  key={kw.keyword}
                  className="rounded-full border border-[var(--color-beige)] px-3 py-1 text-xs text-[var(--color-warm-gray)]"
                >
                  {kw.keyword}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="h-px w-full bg-[var(--color-beige)]" />

        <div className="flex justify-center gap-6 px-6 py-4">
          <button className="text-xs tracking-wider text-[var(--color-warm-gray)] transition-colors hover:text-[var(--color-ink-light)]">
            프로필 수정
          </button>
          <LogoutButton />
        </div>

        <div className="h-px w-full bg-[var(--color-beige)]" />

        {/* 내 글 목록 */}
        <div className="px-6 pt-8">
          <p className="mb-6 text-xs tracking-wider text-[var(--color-warm-gray)]">
            나의 소소함 ({user.posts.length}개)
          </p>
          {user.posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-[var(--color-warm-gray)]">
                아직 작성한 글이 없어요.
              </p>
              <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                오늘의 소소함을 기록해보세요.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {user.posts.map((post) => (
                <div
                  key={post.id}
                  className="border-b border-[var(--color-beige)] pb-6"
                >
                  <p className="mb-3 text-[15px] leading-7 text-[var(--color-ink-light)]">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.keywords.slice(0, 2).map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs text-[var(--color-warm-gray)]"
                        >
                          #{keyword}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-[var(--color-warm-gray)]">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
