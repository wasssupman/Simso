# 심소 (SIMSO)

> 소소한 일상 & 단순한 삶으로의 회귀

빠르고 자극적인 콘텐츠가 넘치는 시대에, 느리게 읽고 · 작게 기록하고 · 조용히 공감하는 커뮤니티.

## 주요 기능

- **오늘의 소소함** — 하루 1글, 300자, 사진 1장. 단순한 기록
- **공감해요** — 좋아요 대신 단일 리액션
- **계절 게시판** — 비움 일지, 산책 기록, 소소 레시피, 고요한 취미
- **편지함** — 주 1통, 느린 대화 (2차 개발)
- **AI 콘텐츠 검사** — 금지 소재, AI 생성물 탐지, 논조 넛지, 이미지 안전성

## 기술 스택

| 영역 | 기술 |
|------|------|
| 모노레포 | Turborepo + npm workspaces |
| 웹 | Next.js 16 (App Router), Tailwind CSS, TypeScript |
| 모바일 | React Native Expo (WebView) |
| DB | PostgreSQL + Prisma |
| 인증 | Auth.js v5 |
| AI | Claude API |

## 프로젝트 구조

```
apps/
  web/      → Next.js 웹 앱
  mobile/   → Expo WebView 래퍼
  avatar/   → 아바타 생성기
packages/
  shared/   → 공유 상수·타입·컴포넌트
  database/ → Prisma 스키마·마이그레이션
```

## 시작하기

```bash
nvm use           # Node 22
npm install
npm run dev:web   # localhost:3000
```

## 디자인 원칙

- 여백을 넉넉히. 한 화면에 하나의 행동만 유도
- 팔로워 수, 게시물 수 등 숫자 비노출
- 알고리즘 랭킹 없음 — 시간순 기반
- AI는 무대 뒤에서 일하고, 무대 위엔 사람만 선다
