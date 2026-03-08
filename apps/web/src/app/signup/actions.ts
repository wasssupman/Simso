"use server";

import { prisma } from "@simso/database";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function signupAction(
  prevState: { error: string } | undefined,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nickname = formData.get("nickname") as string;
  const bio = (formData.get("bio") as string) || null;
  const keywords: string[] = JSON.parse(formData.get("keywords") as string);

  // 유효성 검증
  if (!email || !password || !nickname) {
    return { error: "이메일, 비밀번호, 닉네임은 필수입니다." };
  }

  if (password.length < 8) {
    return { error: "비밀번호는 최소 8자 이상이어야 합니다." };
  }

  if (!keywords || keywords.length < 3) {
    return { error: "관심 키워드는 최소 3개 이상 선택해야 합니다." };
  }

  try {
    // 이메일 중복 확인
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return { error: "이미 사용 중인 이메일입니다." };
    }

    // 닉네임 중복 확인
    const existingNickname = await prisma.user.findUnique({
      where: { nickname },
    });

    if (existingNickname) {
      return { error: "이미 사용 중인 닉네임입니다." };
    }

    // 비밀번호 해시 + 사용자 생성
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
        bio,
        keywords: {
          create: keywords.map((keyword: string) => ({ keyword })),
        },
      },
    });

    // 자동 로그인
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "회원가입은 완료되었지만 로그인에 실패했습니다. 로그인 페이지에서 다시 시도해주세요." };
    }
    return { error: "회원가입 중 오류가 발생했습니다." };
  }

  redirect("/feed");
}
