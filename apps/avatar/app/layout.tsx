import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif-kr",
});

export const metadata: Metadata = {
  title: "Avatar - AI 아바타 & 가상 피팅",
  description: "내 사진으로 아바타를 만들고 상품을 가상으로 착용해보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSerifKR.className}>{children}</body>
    </html>
  );
}
