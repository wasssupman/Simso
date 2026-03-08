import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@simso/database";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, nickname, bio, keywords } = body;

    // 유효성 검증
    if (!email || !password || !nickname) {
      return NextResponse.json(
        { error: "이메일, 비밀번호, 닉네임은 필수입니다." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "비밀번호는 최소 8자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    if (!keywords || keywords.length < 3) {
      return NextResponse.json(
        { error: "관심 키워드는 최소 3개 이상 선택해야 합니다." },
        { status: 400 }
      );
    }

    // 이메일 중복 확인
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다." },
        { status: 400 }
      );
    }

    // 닉네임 중복 확인
    const existingNickname = await prisma.user.findUnique({
      where: { nickname },
    });

    if (existingNickname) {
      return NextResponse.json(
        { error: "이미 사용 중인 닉네임입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
        bio: bio || null,
        keywords: {
          create: keywords.map((keyword: string) => ({ keyword })),
        },
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        bio: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
