/**
 * 심소 디자인 시스템 - 공용 폰트 설정
 *
 * 모든 앱에서 동일한 폰트 설정 사용
 */

import { Noto_Serif_KR } from "next/font/google";

export const notoSerifKR = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Next.js layout.tsx에서 사용:
 *
 * import { notoSerifKR } from "@simso/shared/styles/fonts";
 *
 * <body className={notoSerifKR.className}>
 *   {children}
 * </body>
 */
