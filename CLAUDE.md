# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**심소(SIMSO)** — 소소한 일상 & 단순한 삶으로의 회귀를 지향하는 커뮤니티 서비스.
"심플한 소소함"의 줄임말. 과잉 연결·과잉 소비 시대에 느린 호흡과 작은 만족을 나누는 공간.

기획 상세: `docs/concept.md` / 기술 스택: `docs/tech-stack.md`

## Commands

```bash
# Node 버전 (v22 필수, .nvmrc 참고)
nvm use

# 개발 서버
npm run dev:web          # Next.js (localhost:3000)
npm run dev:mobile       # Expo 개발 서버

# 빌드 & 린트
npm run build:web        # Next.js 프로덕션 빌드
npm run lint             # 전체 린트
```

## Architecture

Turborepo 모노레포. npm workspaces.

```
apps/
  web/      → @simso/web    : Next.js 16 (App Router, Tailwind v4, TypeScript)
  mobile/   → @simso/mobile : React Native Expo (WebView로 web 도메인 로드)
packages/
  shared/   → @simso/shared : 공유 상수·타입 (POST_MAX_LENGTH, 피드 비율 등)
```

**핵심 전략**: Next.js 단일 코드베이스로 웹·앱 동시 커버. 모바일 앱은 같은 도메인을 WebView로 로드하므로, 웹 배포 한 번이면 양쪽 반영.

### Web 앱 구조 (`apps/web/src/`)

- `app/` — Next.js App Router 페이지
  - `page.tsx` — 랜딩
  - `feed/` — 메인 피드 (키워드 필터 + PostCard)
  - `write/` — 글 작성 (300자 제한, 사진 1장, 키워드 선택)
  - `board/` — 계절 게시판 (비움 일지)
  - `profile/` — 프로필 (닉네임, 한 줄 소개, 내 글 목록)
  - `login/`, `signup/` — 인증 (2단계 가입: 정보 → 관심 키워드)
- `components/` — 공통 UI (Header, BottomNav, PostCard)
- `lib/` — 유틸리티, 목업 데이터

### Mobile 앱 (`apps/mobile/`)

`App.tsx` 하나가 WebView로 웹을 로드. 네이티브 브릿지는 `src/bridges/`에 추가 예정 (푸시 알림, 카메라).

## Design System

디자인 변수는 `globals.css`의 CSS 커스텀 프로퍼티로 관리:

| 변수 | 값 | 용도 |
|------|-----|------|
| `--color-ivory` | `#FAF8F5` | 배경 |
| `--color-beige` | `#F0EBE3` | 구분선, 비활성 테두리 |
| `--color-warm-gray` | `#8A827A` | 보조 텍스트, 메타 정보 |
| `--color-olive` | `#6B7F5A` | 포인트 (호버, 활성 상태) |
| `--color-ink` | `#1A1A1A` | 주요 텍스트, 버튼 배경 |
| `--color-ink-light` | `#4A4540` | 본문 텍스트 |

서체: Noto Serif KR (Google Fonts, weight: 300/400/500/600/700)

**폰트 설정 (Next.js):**
```typescript
import { Noto_Serif_KR } from "next/font/google";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// body className={notoSerifKR.className}
```

### 디자인 원칙

- 여백을 넉넉히. 한 화면에 하나의 행동만 유도.
- 폰트 웨이트: 최소 `font-light`(300) 이상 사용
  - ❌ 금지: `font-extralight`(200) — 가독성 문제
  - ✅ 권장: 본문 `font-light`(300), 버튼 `font-normal`(400), 제목 `font-semibold`(600)
- 팔로워 수, 게시물 수 등 숫자 비노출.
- 알고리즘 랭킹 없음 — 시간순 기반.

## Key Business Rules

- **1일 1글 제한**: 오늘의 소소함은 하루 최대 1개만 작성 가능.
- **300자 제한**: 게시물 본문 최대 300자.
- **사진 1장**: 게시물당 이미지 최대 1장.
- **피드 비율**: 관심 키워드 매칭 60% + 다양한 관심사 40%.
- **공감해요**: 좋아요 대신 단일 리액션 "공감해요"만 존재.
- **편지함**: 주 1통 제한 (2차 개발).

## AI Policy

> "AI는 무대 뒤에서 일하고, 무대 위엔 사람만 선다."

- **뒷단 적극 도입**: 금지 소재 검사, AI 생성물 탐지, 논조 분석(넛지), 이미지 안전성 검사.
- **앞단 엄격 금지**: AI 생성 글·이미지, 정치, 종교, 혐오, 상업 홍보 게시 금지.
- 넛지는 차단이 아닌 안내: "다른 분의 감정도 생각해주세요" 형태.
- AI 파이프라인은 콘텐츠 기능보다 먼저 개발 (MVP Phase 0).

## 디렉토리 컨벤션

### Skills (`.claude/skills/`)
- 스킬 정의와 관련 스크립트는 반드시 `.claude/skills/{skill-name}/` 하위에 배치
- 구조: `SKILL.md` (frontmatter 포함) + `scripts/`
- 프로젝트 루트에 별도 스크립트 디렉토리를 만들지 않는다

```
.claude/skills/{skill-name}/
├── SKILL.md           # 스킬 지침 (필수)
└── scripts/           # 실행 스크립트
    └── *.py / *.sh
```

### Agents (`.claude/agents/`)
- 에이전트 정의는 `.claude/agents/{name}.md` 단일 파일

## Tone of Voice (운영 톤)

- 공지도 편지처럼 쓴다.
- "~하세요" 대신 "~하면 좋겠어요".
- UI 문구 예: "오늘의 소소함을 모두 읽었어요. 내일 다시 만나요."
