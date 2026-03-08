#!/bin/bash

echo "🐳 Starting PostgreSQL with Docker..."

# PostgreSQL 컨테이너 실행
docker run --name simso-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=simso \
  -p 5432:5432 \
  -d postgres:16-alpine

# 데이터베이스 준비 대기
echo "⏳ Waiting for PostgreSQL to be ready (10 seconds)..."
sleep 10

# Prisma 설정
echo "🔧 Setting up Prisma..."
npm run db:generate
echo ""

echo "📤 Pushing schema to database..."
npm run db:push
echo ""

echo "🌱 Seeding database..."
npm run db:seed
echo ""

# 완료
echo "✅ Database setup complete!"
echo ""
echo "📊 Next steps:"
echo "   npm run db:studio    # Open Prisma Studio"
echo "   docker ps            # Check container status"
echo "   docker logs simso-postgres  # View logs"
