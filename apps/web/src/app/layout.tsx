import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "심소 — 소소한 일상, 단순한 삶",
  description: "느리게 읽고, 작게 기록하고, 조용히 공감하는 커뮤니티",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSerifKR.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
