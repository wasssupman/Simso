# 심소(SIMSO) 디자인 가이드라인

> "소소한 일상 & 단순한 삶으로의 회귀"를 시각적으로 표현하는 디자인 시스템

---

## 컬러 시스템

### 기본 팔레트

| 변수명 | 색상 코드 | 용도 |
|--------|----------|------|
| `--color-ivory` | `#FAF8F5` | 기본 배경 |
| `--color-beige` | `#F0EBE3` | 구분선, 비활성 테두리, 서브 배경 |
| `--color-warm-gray` | `#8A827A` | 보조 텍스트, 메타 정보, 플레이스홀더 |
| `--color-olive` | `#6B7F5A` | 포인트 컬러 (호버, 활성 상태, 액센트) |
| `--color-ink` | `#1A1A1A` | 주요 텍스트, 버튼 배경 |
| `--color-ink-light` | `#4A4540` | 본문 텍스트 |

### 컬러 사용 규칙

- **배경**: 기본 ivory, 카드/구분 영역은 beige
- **텍스트**: 제목은 ink, 본문은 ink-light, 보조는 warm-gray
- **액션 요소**: 기본 ink, 호버/활성은 olive
- **구분선**: beige
- **포인트**: olive (최소한으로 사용)

---

## 타이포그래피

### 서체

**주 서체**: Noto Serif KR (Google Fonts)
- 한글 세리프체로 따뜻하고 차분한 인상
- 가독성과 심미성 균형

**Next.js 폰트 설정:**
```typescript
import { Noto_Serif_KR } from "next/font/google";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// layout.tsx
<body className={notoSerifKR.className}>
```

**CSS 설정:**
```css
body {
  font-family: var(--font-serif-kr, "Noto Serif KR", Georgia, serif);
}
```

### 폰트 웨이트 규칙

| 웨이트 | 값 | Tailwind | 용도 |
|--------|-----|----------|------|
| `font-light` | 300 | `font-light` | 본문 텍스트 (최소 권장) |
| `font-normal` | 400 | `font-normal` | 기본 텍스트, 버튼, 레이블 |
| `font-medium` | 500 | `font-medium` | 강조 텍스트, 소제목 |
| `font-semibold` | 600 | `font-semibold` | 섹션 제목 |
| `font-bold` | 700 | `font-bold` | 주제목 (h1, h2) |

**금지**:
- ❌ `font-extralight` (200) — 가독성 문제로 사용 금지
- ❌ `font-black` (900) — 과도하게 무거움
- ❌ `font-extrabold` (800) — 필요 없음

### 텍스트 크기와 Line Height

| 요소 | 크기 | 웨이트 | Line Height | Tailwind |
|------|------|--------|-------------|----------|
| **제목 (h1)** | 2.5rem (40px) | 700 (bold) | 1.2 (tight) | `text-4xl font-bold leading-tight` |
| **제목 (h2)** | 2rem (32px) | 600 (semibold) | 1.3 | `text-3xl font-semibold leading-snug` |
| **제목 (h3)** | 1.5rem (24px) | 600 (semibold) | 1.4 | `text-2xl font-semibold` |
| **소제목 (h4)** | 1.25rem (20px) | 500 (medium) | 1.5 | `text-xl font-medium` |
| **강조 텍스트** | 1.125rem (18px) | 500 (medium) | 1.6 | `text-lg font-medium leading-relaxed` |
| **본문 (기본)** | 1rem (16px) | 300 (light) | 1.6 (relaxed) | `text-base font-light leading-relaxed` |
| **본문 (강조)** | 1rem (16px) | 400 (normal) | 1.6 | `text-base font-normal leading-relaxed` |
| **작은 텍스트** | 0.875rem (14px) | 300 (light) | 1.5 | `text-sm font-light` |
| **레이블/버튼** | 0.875rem (14px) | 400 (normal) | 1.5 | `text-sm font-normal` |
| **캡션/메타** | 0.75rem (12px) | 400 (normal) | 1.4 | `text-xs font-normal` |

**Line Height 규칙:**
- 제목: `leading-tight` (1.2) ~ `leading-snug` (1.375)
- 본문: `leading-relaxed` (1.625)
- 짧은 텍스트 (버튼, 레이블): `leading-normal` (1.5)

---

## 레이아웃 원칙

### 여백 (Spacing)

심소는 **넉넉한 여백**을 강조합니다.

```css
/* 섹션 간 여백 */
section: py-12 ~ py-16 (3rem ~ 4rem)

/* 카드 내부 여백 */
card: p-6 ~ p-8 (1.5rem ~ 2rem)

/* 요소 간 여백 */
gap: 1rem ~ 1.5rem (16px ~ 24px)
```

### 그리드 시스템

- 최대 너비: `max-w-2xl` (672px) — 읽기 편한 폭
- 피드/리스트: 단일 컬럼
- 게시판: 카드 그리드 (모바일 1열, 태블릿 2열)

### 경계선

```css
/* 기본 테두리 */
border: 1px solid var(--color-beige)

/* 포커스 테두리 */
focus: 2px solid var(--color-olive)

/* 둥근 모서리 */
card: rounded-xl (12px)
button: rounded-lg (8px)
input: rounded-lg (8px)
```

---

## 컴포넌트 스타일

### 버튼

**Primary 버튼** (주요 액션)
```css
background: var(--color-ink)
color: white
hover:background: var(--color-olive)
padding: 0.75rem 1.5rem
rounded: lg
```

**Secondary 버튼** (보조 액션)
```css
background: transparent
color: var(--color-ink)
border: 1px solid var(--color-beige)
hover:background: var(--color-beige)
padding: 0.75rem 1.5rem
rounded: lg
```

**Text 버튼** (링크형)
```css
color: var(--color-warm-gray)
hover:color: var(--color-olive)
```

### 입력 필드

```css
background: white
border: 1px solid var(--color-beige)
focus:border: var(--color-olive)
padding: 0.75rem 1rem
rounded: lg
placeholder:color: var(--color-warm-gray)
```

### 카드

```css
background: white
border: 1px solid var(--color-beige)
padding: 1.5rem ~ 2rem
rounded: xl
shadow: none (기본) / sm (호버)
```

---

## 애니메이션

### 원칙
- **최소한으로** — 필요한 곳에만
- **부드럽게** — ease-in-out
- **빠르게** — 150ms ~ 300ms

### 허용되는 애니메이션

```css
/* 페이드인 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 호버 트랜지션 */
transition: all 150ms ease-in-out

/* 포커스 트랜지션 */
transition: border-color 150ms ease
```

### 금지 사항
- 스피너 애니메이션 (로딩 시 간단한 텍스트 사용)
- 바운스, 슬라이드 등 과도한 모션
- 자동 재생 애니메이션

---

## 아이콘

### 스타일
- **선형 아이콘** (stroke) 사용
- `strokeWidth: 1.8` (얇게)
- 색상: ink (기본), olive (활성)

### 크기
```css
small: 1rem (16px)
medium: 1.25rem (20px)
large: 1.5rem (24px)
```

---

## UI 패턴

### 네비게이션

**상단 헤더**
```
- 고정 (sticky)
- 배경: white/80 + backdrop-blur
- 테두리: 하단 1px beige
- 높이: 4rem (64px)
```

**하단 네비게이션** (모바일)
```
- 고정 (fixed bottom)
- 배경: white
- 테두리: 상단 1px beige
- 높이: 4rem (64px)
- 아이콘 4개 (피드, 기록, 게시판, 나)
```

### 피드 카드

```
- 작성자 정보 (아바타 + 닉네임)
- 본문 (300자 제한)
- 이미지 (1장, 16:9 비율)
- 메타 정보 (시간, 공감 수)
- 간격: 1.5rem
```

---

## 반응형 원칙

### 브레이크포인트

```css
sm: 640px   /* 모바일 가로 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크탑 */
```

### 모바일 우선

- 기본 스타일은 모바일
- 큰 화면에서 점진적 개선
- 핵심 기능은 모든 화면에서 동일

---

## 접근성

### 색상 대비

모든 텍스트는 **WCAG AA 기준** 충족:
- 본문 텍스트: 4.5:1 이상
- 큰 텍스트 (18px+): 3:1 이상

### 포커스 표시

```css
focus:outline: 2px solid var(--color-olive)
focus:outline-offset: 2px
```

### 키보드 네비게이션

- 모든 인터랙티브 요소 접근 가능
- 탭 순서 논리적
- Skip to content 링크 제공

---

## 금지 사항

❌ **사용하지 말 것**
- 자극적인 색상 (빨강, 주황 등)
- 네온 컬러, 그라데이션
- 그림자 남발 (shadow-lg, shadow-xl)
- 복잡한 애니메이션
- 과도한 장식
- 숫자 강조 (팔로워 수, 좋아요 수 등)

✅ **지향할 것**
- 여백을 통한 호흡
- 절제된 색상
- 읽기 편한 타이포그래피
- 최소한의 인터랙션
- 조용한 UI

---

## 적용 예시

### 올바른 예시 ✅

```tsx
<div className="rounded-xl border border-[var(--color-beige)] bg-white p-6">
  <h3 className="text-xl font-semibold text-[var(--color-ink)] mb-4">
    제목
  </h3>
  <p className="text-base font-light text-[var(--color-ink-light)] leading-relaxed">
    본문 내용
  </p>
  <button className="mt-6 rounded-lg bg-[var(--color-ink)] px-6 py-3 text-white hover:bg-[var(--color-olive)] transition">
    버튼
  </button>
</div>
```

### 잘못된 예시 ❌

```tsx
<div className="rounded-3xl shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-12 animate-bounce">
  <h3 className="text-5xl font-black text-white drop-shadow-lg">
    🎉 제목 🎉
  </h3>
  <p className="text-2xl font-bold text-yellow-300 animate-pulse">
    본문 내용
  </p>
  <button className="mt-8 rounded-full bg-red-600 px-12 py-6 text-3xl font-black text-white shadow-xl hover:scale-110 transform transition-all duration-500">
    클릭!!!
  </button>
</div>
```

---

## 모든 앱에 적용

심소 생태계의 **모든 앱**(web, mobile, avatar 등)은 이 디자인 가이드라인을 따릅니다.

- 일관된 사용자 경험
- 브랜드 정체성 강화
- 유지보수 효율성
