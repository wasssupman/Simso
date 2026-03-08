import type { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { WriteForm } from './write-form';

export const metadata: Metadata = {
  title: '오늘의 소소함 - 심소',
  description: '오늘 하루, 소소한 한 줄을 남겨보세요.',
};

export default async function WritePage() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Header title="오늘의 소소함" />

      <main className="mx-auto max-w-lg px-6 pb-24 pt-8">
        {/* 안내 문구 */}
        <p className="mb-8 text-center text-sm leading-7 text-[var(--color-warm-gray)]">
          오늘 하루, 소소한 한 줄을 남겨보세요.
        </p>

        <WriteForm />
      </main>

      <BottomNav />
    </div>
  );
}
