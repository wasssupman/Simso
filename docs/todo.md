# 심소(SIMSO) 프로젝트 TODO

> 최종 업데이트: 2026-02-09

---

## 📦 완료된 작업

### 프로젝트 초기화
- [x] Turborepo 모노레포 구조 설정
- [x] npm workspaces 설정
- [x] TypeScript 기본 설정
- [x] Node.js 22 환경 구성 (.nvmrc)

### 문서화
- [x] `docs/concept.md` — 컨셉 기획서
- [x] `docs/tech-stack.md` — 기술 스택 문서
- [x] `docs/design-guidelines.md` — 디자인 시스템 가이드라인
- [x] `docs/content-plan.md` — 콘텐츠 기획 (simso-service-planner 에이전트)
- [x] `docs/trend-report.md` — 트렌드 키워드 리포트
- [x] `CLAUDE.md` — Claude Code 프로젝트 가이드

### 심소 웹 메인 (`apps/web`)
- [x] Next.js 16 App Router 설정
- [x] Tailwind CSS v4 설정
- [x] Noto Serif KR 폰트 적용 (300/400/500/600/700)
- [x] 디자인 시스템 CSS 변수 설정
- [x] 페이지 구현
  - [x] 랜딩 페이지 (`/`)
  - [x] 피드 페이지 (`/feed`)
  - [x] 글 작성 페이지 (`/write`)
  - [x] 계절 게시판 (`/board`)
  - [x] 프로필 페이지 (`/profile`)
  - [x] 로그인 페이지 (`/login`)
  - [x] 회원가입 페이지 (`/signup`)
- [x] 공통 컴포넌트
  - [x] Header (sticky)
  - [x] BottomNav (모바일 4-tab)
  - [x] PostCard
  - [x] KeywordFilter
  - [x] BoardCard
  - [x] SeasonBadge
- [x] 목업 데이터 (`lib/mock-data.ts`)
- [x] 심소 디자인 테마 적용 (Ivory, Beige, Olive, Ink 컬러)

### Avatar 앱 (`apps/avatar`)
- [x] Next.js 16 설정 (port 3001)
- [x] Tailwind CSS v4 + @tailwindcss/postcss 설정
- [x] Noto Serif KR 폰트 적용
- [x] 심소 디자인 시스템 적용
- [x] 페이지 구현
  - [x] 랜딩 페이지 (`/`) — 서비스 소개, 3단계 설명
  - [x] 아바타 생성 페이지 (`/create`) — 사진 업로드 → 프로필 입력 → 생성 완료
- [x] 3단계 플로우 UI (Step Indicator)
- [x] 파일 업로드 UI
- [x] 프로필 입력 폼 (성별, 연령대, 체형)

### 모바일 앱 (`apps/mobile`)
- [x] React Native Expo 54 설정
- [x] WebView 설정 (심소 웹 로드)
- [x] 환경변수 설정 (SIMSO_URL)

### 공용 패키지 (`packages/shared`)
- [x] 상수 정의 (`constants.ts`)
  - POST_MAX_LENGTH (300)
  - DAILY_POST_LIMIT (1)
  - FEED_INTEREST_RATIO (0.6)
  - INTEREST_KEYWORDS (35개)
- [x] 공용 컴포넌트
  - [x] Button (Primary/Secondary/Text)
  - [x] Card
  - [x] Input
- [x] 공용 스타일
  - [x] `styles/theme.css` — CSS 변수, 유틸리티
  - [x] `styles/fonts.ts` — Noto Serif KR 설정

### Claude Code 설정
- [x] `.claude/agents/` — 커스텀 에이전트
  - [x] `ux-writer.md` — UI 카피 작성
  - [x] `content-guard.md` — 콘텐츠 정책 검사
  - [x] `design-review.md` — 디자인 시스템 검증
  - [x] `trendy-keyword-reporter.md` — 트렌드 키워드 분석
- [x] `.claude/skills/` — 실행 가능한 스킬
  - [x] `trend-report/` — 트렌드 키워드 수집 & 리포트 생성
    - [x] `SKILL.md`
    - [x] `scripts/naver.py` — 네이버 뉴스 키워드
    - [x] `scripts/google_trends.py` — 구글 트렌드
    - [x] `scripts/dc.py` — DC인사이드 실시간 베스트
    - [x] `scripts/instagram.py` — 인스타그램 해시태그 (fallback)
    - [x] `scripts/collect_all.py` — 통합 수집 스크립트
    - [x] `scripts/requirements.txt`

### 디자인 시스템
- [x] 컬러 팔레트 확정
  - Ivory (#FAF8F5), Beige (#F0EBE3), Warm Gray (#8A827A)
  - Olive (#6B7F5A), Ink (#1A1A1A), Ink Light (#4A4540)
- [x] 타이포그래피 규칙 정립
  - Noto Serif KR (300/400/500/600/700)
  - font-extralight(200) 금지
- [x] 컴포넌트 스타일 가이드
  - 버튼, 카드, 입력 필드, 네비게이션
- [x] 애니메이션 규칙 (최소한, 150ms-300ms)
- [x] 접근성 기준 (WCAG AA)

---

## 🚧 진행 중인 작업

없음

---

## 📝 다음 작업 (우선순위별)

### 🔴 우선순위 높음 (MVP Phase 0)

#### 1. AI 콘텐츠 검증 파이프라인 구축
**목표**: 심소 컨셉의 핵심인 AI 뒷단 검증 시스템 구축

- [ ] 금지 소재 검사 API
  - 정치, 종교, 혐오, 상업 홍보 키워드 필터
  - 텍스트 분류 모델 (OpenAI API or Custom)
- [ ] AI 생성물 탐지 API
  - AI 작성 글 탐지 (GPTZero, OpenAI Text Classifier 등)
  - AI 생성 이미지 탐지
- [ ] 논조 분석 & 넛지 시스템
  - 부정적/공격적 톤 감지
  - "다른 분의 감정도 생각해주세요" 넛지 UI
- [ ] 이미지 안전성 검사
  - NSFW 필터
  - 부적절한 콘텐츠 탐지

**관련 문서**: `docs/concept.md` AI Policy 섹션

#### 2. 데이터베이스 설계 & 연동
**목표**: PostgreSQL + Prisma 기본 구조 구축

- [ ] PostgreSQL 로컬 환경 설정
- [ ] Prisma ORM 설정
  - `packages/database` 패키지 생성
  - 스키마 설계
- [ ] 기본 테이블 설계
  - `users` — 사용자 (닉네임, 프로필, 관심 키워드)
  - `posts` — 게시글 (본문, 이미지, 키워드, 작성일)
  - `empathy` — 공감 (user_id, post_id)
  - `boards` — 게시판 글 (계절별)
  - `keywords` — 관심 키워드 목록
- [ ] 마이그레이션 실행
- [ ] Seed 데이터 생성

#### 3. 인증 시스템 구현
**목표**: NextAuth.js 기반 이메일 로그인

- [ ] NextAuth.js 설정
  - `apps/web/src/app/api/auth/[...nextauth]/route.ts`
- [ ] 이메일 로그인 구현
  - Magic Link or 비밀번호 기반
- [ ] 회원가입 플로우
  - 1단계: 이메일, 닉네임, 한 줄 소개
  - 2단계: 관심 키워드 선택 (최소 3개)
- [ ] 세션 관리
  - 미들웨어 설정
  - 보호된 라우트 (feed, write, profile)
- [ ] 프로필 편집 API

---

### 🟡 우선순위 중간

#### 4. 심소 웹 - 글 작성 기능 완성
**목표**: 실제 게시글 작성 가능하도록 구현

- [ ] 이미지 업로드
  - 1장 제한
  - 리사이징 (max 1200px)
  - S3 or Cloudinary 연동
- [ ] 키워드 자동 추천
  - 본문 텍스트 기반 키워드 추출
  - 기존 INTEREST_KEYWORDS와 매칭
- [ ] 실시간 글자 수 카운터
  - 300자 제한 표시
  - 초과 시 입력 차단
- [ ] 1일 1글 제한 검증
  - 오늘 이미 작성했는지 체크
  - 제한 초과 시 안내 메시지
- [ ] API 엔드포인트
  - `POST /api/posts` — 글 작성
  - `GET /api/posts` — 피드 조회 (60/40 알고리즘)
  - `POST /api/posts/:id/empathy` — 공감하기

#### 5. Avatar 앱 - 가상 피팅 페이지
**목표**: 아바타에 상품 착용 시뮬레이션

- [ ] `/fitting` 페이지 생성
- [ ] 아바타 뷰어 컴포넌트
  - 생성된 아바타 표시 (3D or 2D 이미지)
  - 회전/확대 컨트롤
- [ ] 상품 카탈로그
  - 카테고리별 상품 목록 (상의, 하의, 아우터 등)
  - 상품 썸네일 그리드
- [ ] 가상 착용 시뮬레이션
  - 상품 클릭 → 아바타에 적용
  - 여러 상품 조합 가능
- [ ] 저장/공유 기능
  - 피팅 결과 이미지 저장
  - SNS 공유 (추후)

#### 6. 공용 컴포넌트 확장
**목표**: 재사용 가능한 UI 컴포넌트 라이브러리 구축

- [ ] `packages/shared/src/components/` 추가
  - [ ] `Select.tsx` — 드롭다운
  - [ ] `Textarea.tsx` — 여러 줄 입력
  - [ ] `Modal.tsx` — 모달 다이얼로그
  - [ ] `Avatar.tsx` — 프로필 아바타
  - [ ] `Badge.tsx` — 뱃지 (계절, 키워드)
  - [ ] `Loading.tsx` — 로딩 상태 (pulse 점)
  - [ ] `Toast.tsx` — 토스트 알림
- [ ] Form 유틸리티
  - [ ] `useForm` 훅
  - [ ] 유효성 검증 헬퍼

---

### 🟢 우선순위 낮음

#### 7. 반응형 디자인 점검
- [ ] 모바일 뷰 최적화 (320px~)
- [ ] 태블릿 레이아웃 (768px~)
- [ ] 데스크탑 레이아웃 (1024px~)
- [ ] 터치 인터랙션 개선

#### 8. 성능 최적화
- [ ] Next.js Image 컴포넌트 적용
- [ ] 번들 크기 분석 (`@next/bundle-analyzer`)
- [ ] 코드 스플리팅 점검
- [ ] 폰트 최적화 (preload)
- [ ] 이미지 최적화 (WebP, AVIF)

#### 9. 테스트 작성
- [ ] 컴포넌트 단위 테스트 (Vitest + Testing Library)
- [ ] API 엔드포인트 테스트
- [ ] E2E 테스트 (Playwright)
  - 회원가입 플로우
  - 글 작성 플로우
  - 피드 스크롤

#### 10. 배포 준비
- [ ] Vercel 배포 설정
  - `apps/web` → simso.vercel.app
  - `apps/avatar` → avatar.simso.vercel.app
- [ ] 환경변수 설정 (프로덕션)
- [ ] 도메인 연결
- [ ] CI/CD 파이프라인 (GitHub Actions)

#### 11. 추가 기능 (Phase 2)
- [ ] 편지함 기능 (랜덤 매칭, 주 1통 제한)
- [ ] 조용한 챌린지 (자기 기록 중심)
- [ ] 알림 시스템 (하루 1회 이하)
- [ ] 검색 기능 (키워드, 사용자)
- [ ] 신고 시스템

---

## 🐛 알려진 이슈

없음

---

## 📚 참고 문서

- [컨셉 기획서](./concept.md)
- [기술 스택](./tech-stack.md)
- [디자인 가이드라인](./design-guidelines.md)
- [콘텐츠 기획](./content-plan.md)
- [트렌드 리포트](./trend-report.md)

---

## 🔗 실행 중인 서버

- **심소 웹**: http://localhost:3000
- **Avatar 앱**: http://localhost:3001

```bash
# 개발 서버 실행
npm run dev:web      # 심소 웹 메인
npm run dev:avatar   # Avatar 앱
npm run dev:mobile   # React Native Expo

# 빌드
npm run build:web
npm run build:avatar
```

---

## 💡 노트

- 모든 앱은 심소 디자인 시스템을 따름 (Ivory, Beige, Olive, Ink 컬러)
- Noto Serif KR 폰트, weight 300/400/500/600/700 사용
- font-extralight(200) 사용 금지
- AI는 뒷단에서만 작동, 앞단은 사람의 콘텐츠만
