# 데이터베이스 설정 가이드

심소 프로젝트는 PostgreSQL 16을 사용합니다.

---

## 방법 1: Homebrew로 설치 (권장)

### 1. PostgreSQL 설치

```bash
brew install postgresql@16
```

### 2. PostgreSQL 서비스 시작

```bash
brew services start postgresql@16
```

### 3. 데이터베이스 및 사용자 생성

```bash
# PostgreSQL 접속
psql postgres

# SQL 실행
CREATE DATABASE simso;
CREATE USER simso WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE simso TO simso;
ALTER DATABASE simso OWNER TO simso;

# 종료
\q
```

### 4. 환경변수 설정

`packages/database/.env` 파일이 이미 생성되어 있습니다.
필요시 비밀번호를 수정하세요.

```bash
DATABASE_URL="postgresql://simso:password@localhost:5432/simso?schema=public"
```

### 5. Prisma 설정

```bash
# 루트 디렉토리에서 실행
npm run db:generate  # Prisma Client 생성
npm run db:push      # 스키마를 데이터베이스에 적용
npm run db:seed      # Seed 데이터 삽입
```

### 6. 확인

```bash
# Prisma Studio로 데이터 확인
npm run db:studio
```

브라우저에서 http://localhost:5555 열림

---

## 방법 2: Docker 사용

### 1. Docker Desktop 설치

https://www.docker.com/products/docker-desktop

### 2. PostgreSQL 컨테이너 실행

```bash
docker run --name simso-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=simso \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### 3. 환경변수 설정

`packages/database/.env`:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/simso?schema=public"
```

### 4. Prisma 설정

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 5. Docker 컨테이너 관리

```bash
# 중지
docker stop simso-postgres

# 시작
docker start simso-postgres

# 삭제
docker rm -f simso-postgres
```

---

## 방법 3: PostgreSQL.app (macOS GUI)

### 1. PostgreSQL.app 다운로드

https://postgresapp.com/

### 2. 앱 실행 및 서버 시작

- PostgreSQL.app 열기
- "Initialize" 클릭
- 서버 자동 시작

### 3. 데이터베이스 생성

앱 내 터미널을 열거나 `psql` 실행:

```bash
CREATE DATABASE simso;
```

### 4. 환경변수 설정

```bash
DATABASE_URL="postgresql://postgres@localhost:5432/simso?schema=public"
```

### 5. Prisma 설정

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

---

## 데이터베이스 스키마

### 주요 테이블

| 테이블 | 설명 |
|--------|------|
| `users` | 사용자 (이메일, 닉네임, 프로필) |
| `user_keywords` | 사용자 관심 키워드 (다대다) |
| `posts` | 게시글 (300자, 이미지 1장, 키워드) |
| `empathies` | 공감 (좋아요 대신) |
| `boards` | 계절 게시판 (비움 일지, 산책 기록 등) |
| `daily_post_limits` | 1일 1글 제한 추적 |

### 관계

```
User 1:N UserKeyword
User 1:N Post
User 1:N Empathy
User 1:N Board
Post 1:N Empathy
```

---

## 유용한 명령어

### Prisma

```bash
# Client 재생성
npm run db:generate

# 스키마 푸시 (개발)
npm run db:push

# 마이그레이션 생성
npm run db:migrate

# Prisma Studio (GUI)
npm run db:studio

# Seed 데이터 삽입
npm run db:seed
```

### PostgreSQL

```bash
# PostgreSQL 접속
psql simso

# 테이블 목록
\dt

# 테이블 구조 확인
\d users

# 쿼리 실행
SELECT * FROM users;

# 종료
\q
```

---

## 문제 해결

### "relation does not exist" 오류

스키마가 아직 적용되지 않았습니다:
```bash
npm run db:push
```

### "database does not exist" 오류

데이터베이스를 생성하지 않았습니다:
```bash
psql postgres
CREATE DATABASE simso;
\q
```

### 포트 5432가 이미 사용 중

다른 PostgreSQL이 실행 중일 수 있습니다:
```bash
# Homebrew PostgreSQL 중지
brew services stop postgresql

# 또는 특정 버전
brew services stop postgresql@16
```

### Prisma Client 타입 오류

Client를 재생성하세요:
```bash
npm run db:generate
```

---

## 다음 단계

데이터베이스 설정이 완료되면:

1. ✅ `npm run db:studio`로 데이터 확인
2. ✅ `apps/web`에서 API 라우트 생성
3. ✅ 인증 시스템 연동
4. ✅ 게시글 CRUD 구현

관련 TODO: `docs/todo.md` 참고
