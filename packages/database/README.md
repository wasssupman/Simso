# @simso/database

심소 프로젝트의 데이터베이스 패키지 (Prisma + PostgreSQL)

## 설치

### 1. PostgreSQL 설치

**macOS (Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Docker:**
```bash
docker run --name simso-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=simso \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### 2. 데이터베이스 생성

```bash
# PostgreSQL 접속
psql postgres

# 데이터베이스 생성
CREATE DATABASE simso;
CREATE USER simso WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE simso TO simso;

# 종료
\q
```

### 3. 환경변수 설정

```bash
# packages/database/.env 파일 생성
cp .env.example .env

# DATABASE_URL 수정
# postgresql://simso:password@localhost:5432/simso?schema=public
```

## 사용법

### Prisma Client 생성

```bash
npm run db:generate
```

### 데이터베이스 스키마 푸시 (개발)

```bash
npm run db:push
```

### 마이그레이션 (프로덕션)

```bash
npm run db:migrate
```

### Seed 데이터 삽입

```bash
npm run db:seed
```

### Prisma Studio (GUI)

```bash
npm run db:studio
```

## 스키마 구조

### User (사용자)
- 이메일, 닉네임, 한 줄 소개
- 관심 키워드 (다대다)

### Post (게시글 - 오늘의 소소함)
- 본문 (300자 제한)
- 이미지 (1장)
- 키워드 (최대 3개)

### Empathy (공감)
- 좋아요 대신 "공감해요"
- 한 사용자당 한 글에 한 번만

### Board (계절 게시판)
- 카테고리: 비움 일지, 산책 기록, 소소 레시피, 고요한 취미
- 계절: 봄, 여름, 가을, 겨울

### DailyPostLimit (일일 게시 제한)
- 1일 1글 제한 추적

## 다른 패키지에서 사용

```typescript
import { prisma, User, Post } from "@simso/database";

// 사용자 조회
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" },
  include: { keywords: true },
});

// 게시글 생성
const post = await prisma.post.create({
  data: {
    userId: user.id,
    content: "오늘의 소소함",
    keywords: ["산책", "자연"],
  },
});
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run db:generate` | Prisma Client 생성 |
| `npm run db:push` | 스키마 푸시 (개발) |
| `npm run db:migrate` | 마이그레이션 생성/실행 |
| `npm run db:studio` | Prisma Studio 실행 |
| `npm run db:seed` | Seed 데이터 삽입 |

## 루트에서 실행

```bash
# 루트 디렉토리에서도 실행 가능
npm run db:generate
npm run db:push
npm run db:seed
npm run db:studio
```
