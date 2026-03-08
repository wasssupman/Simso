# Docker로 PostgreSQL 설치 및 실행

---

## 1. Docker Desktop 설치

### macOS

1. **Docker Desktop 다운로드**
   - https://www.docker.com/products/docker-desktop
   - "Download for Mac" 클릭
   - Intel Chip 또는 Apple Chip (M1/M2/M3) 선택

2. **설치**
   - 다운로드한 `.dmg` 파일 실행
   - Docker.app을 Applications 폴더로 드래그

3. **Docker Desktop 실행**
   - Applications에서 Docker 실행
   - 초기 설정 완료 (약 1-2분 소요)
   - 상단 메뉴바에 고래 아이콘이 나타나면 준비 완료

4. **Docker 확인**
   ```bash
   docker --version
   # Docker version 24.0.0 이상
   ```

---

## 2. PostgreSQL 컨테이너 실행

### 방법 A: 단일 명령어로 실행 (빠른 시작)

```bash
docker run --name simso-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=simso \
  -p 5432:5432 \
  -d postgres:16-alpine
```

**설명:**
- `--name simso-postgres`: 컨테이너 이름
- `-e POSTGRES_PASSWORD=password`: PostgreSQL 비밀번호
- `-e POSTGRES_DB=simso`: 자동 생성할 데이터베이스 이름
- `-p 5432:5432`: 포트 매핑 (호스트:컨테이너)
- `-d`: 백그라운드 실행
- `postgres:16-alpine`: 이미지 (PostgreSQL 16, 경량 Alpine 리눅스)

### 방법 B: Docker Compose 사용 (권장)

**`docker-compose.yml` 파일 생성 (루트):**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: simso-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: simso
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

**실행:**
```bash
docker compose up -d
```

---

## 3. 컨테이너 상태 확인

```bash
# 실행 중인 컨테이너 확인
docker ps

# 출력 예시:
# CONTAINER ID   IMAGE               STATUS         PORTS                    NAMES
# abc123def456   postgres:16-alpine  Up 10 seconds  0.0.0.0:5432->5432/tcp   simso-postgres

# 로그 확인
docker logs simso-postgres

# 마지막 출력: "database system is ready to accept connections"
```

---

## 4. 환경변수 확인

`packages/database/.env` 파일이 이미 생성되어 있습니다:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/simso?schema=public"
```

이 설정은 Docker 기본값과 일치합니다. ✅

---

## 5. Prisma 설정 및 Seed

```bash
cd /Users/sy/dev/projects/simso

# 1. Prisma Client 생성
npm run db:generate

# 2. 스키마를 데이터베이스에 적용
npm run db:push

# 3. Seed 데이터 삽입 (5명 사용자, 8개 게시글 등)
npm run db:seed

# 4. Prisma Studio 실행 (GUI)
npm run db:studio
```

**Prisma Studio**: http://localhost:5555

---

## 6. Docker 컨테이너 관리

### 자주 사용하는 명령어

```bash
# 컨테이너 시작
docker start simso-postgres

# 컨테이너 중지
docker stop simso-postgres

# 컨테이너 재시작
docker restart simso-postgres

# 컨테이너 상태 확인
docker ps -a

# 컨테이너 로그 확인
docker logs simso-postgres

# 컨테이너 삭제 (데이터는 volume에 보존)
docker rm -f simso-postgres

# 컨테이너 + 데이터 완전 삭제
docker rm -f simso-postgres
docker volume rm postgres_data  # compose 사용 시
```

### PostgreSQL 접속

```bash
# 컨테이너 내부 접속
docker exec -it simso-postgres psql -U postgres -d simso

# SQL 실행 예시
SELECT * FROM users;

# 종료
\q
```

---

## 7. Docker Compose 사용 시 (권장)

### 시작
```bash
docker compose up -d
```

### 중지
```bash
docker compose down
```

### 중지 + 데이터 삭제
```bash
docker compose down -v
```

### 로그 확인
```bash
docker compose logs -f postgres
```

---

## 문제 해결

### 1. 포트 5432가 이미 사용 중

**오류:**
```
Error: bind: address already in use
```

**해결:**
```bash
# 포트 사용 중인 프로세스 찾기
lsof -i :5432

# Homebrew PostgreSQL이 실행 중이면 중지
brew services stop postgresql
brew services stop postgresql@16

# 또는 다른 포트 사용 (예: 5433)
docker run --name simso-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=simso \
  -p 5433:5432 \
  -d postgres:16-alpine

# .env 수정
DATABASE_URL="postgresql://postgres:password@localhost:5433/simso?schema=public"
```

### 2. "database system is ready" 메시지가 안 보임

```bash
# 로그 확인
docker logs simso-postgres

# 컨테이너 재시작
docker restart simso-postgres

# 10초 정도 기다린 후 다시 확인
docker logs simso-postgres
```

### 3. "role does not exist" 오류

기본 사용자는 `postgres`입니다. `.env` 확인:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/simso?schema=public"
#                          ^^^^^^^^ 사용자 이름
```

### 4. Prisma Client 생성 오류

```bash
# Node 모듈 재설치
npm install

# Prisma Client 강제 재생성
rm -rf node_modules/.prisma
npm run db:generate
```

---

## 빠른 시작 스크립트

전체 과정을 한 번에:

```bash
#!/bin/bash

# 1. PostgreSQL 컨테이너 실행
docker run --name simso-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=simso \
  -p 5432:5432 \
  -d postgres:16-alpine

# 2. 데이터베이스 준비 대기 (10초)
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# 3. Prisma 설정
echo "🔧 Setting up Prisma..."
npm run db:generate
npm run db:push
npm run db:seed

# 4. 완료
echo "✅ Database ready!"
echo "📊 Run 'npm run db:studio' to open Prisma Studio"
```

**저장 후 실행:**
```bash
chmod +x setup-db.sh
./setup-db.sh
```

---

## Docker Desktop 대안: Colima (경량)

Docker Desktop 대신 Colima 사용 (무료, 경량):

```bash
# Colima 설치
brew install colima docker

# Colima 시작
colima start

# PostgreSQL 실행 (동일한 명령어)
docker run --name simso-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=simso \
  -p 5432:5432 \
  -d postgres:16-alpine
```

---

## 다음 단계

Docker PostgreSQL 실행 후:

1. ✅ `docker ps`로 컨테이너 실행 확인
2. ✅ `npm run db:generate` — Prisma Client 생성
3. ✅ `npm run db:push` — 스키마 적용
4. ✅ `npm run db:seed` — Seed 데이터 삽입
5. ✅ `npm run db:studio` — 데이터 확인 (http://localhost:5555)

설정 완료 후 **TODO #3 (인증 시스템 구현)**으로 진행!
