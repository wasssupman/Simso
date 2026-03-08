import { PrismaClient, Season, BoardCategory } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 기존 데이터 삭제 (개발 환경)
  await prisma.empathy.deleteMany();
  await prisma.board.deleteMany();
  await prisma.post.deleteMany();
  await prisma.dailyPostLimit.deleteMany();
  await prisma.userKeyword.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleared existing data");

  // 테스트용 비밀번호 해시 (모든 사용자: "password123")
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 사용자 생성
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "user1@simso.com",
        password: hashedPassword,
        nickname: "조용한산책",
        bio: "매일 아침 동네 한 바퀴를 걷습니다",
        keywords: {
          create: [
            { keyword: "산책" },
            { keyword: "자연" },
            { keyword: "사진" },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "user2@simso.com",
        password: hashedPassword,
        nickname: "차한잔",
        bio: "오후의 따뜻한 차 한 잔",
        keywords: {
          create: [
            { keyword: "차" },
            { keyword: "독서" },
            { keyword: "음악" },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "user3@simso.com",
        password: hashedPassword,
        nickname: "소확행",
        bio: "작지만 확실한 행복을 찾아서",
        keywords: {
          create: [
            { keyword: "요리" },
            { keyword: "베이킹" },
            { keyword: "일상" },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "user4@simso.com",
        password: hashedPassword,
        nickname: "비움",
        bio: "하나씩 비워가는 중",
        keywords: {
          create: [
            { keyword: "미니멀" },
            { keyword: "정리" },
            { keyword: "비움" },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "user5@simso.com",
        password: hashedPassword,
        nickname: "느린호흡",
        bio: "천천히, 깊게",
        keywords: {
          create: [
            { keyword: "명상" },
            { keyword: "요가" },
            { keyword: "자연" },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // 게시글 생성
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        userId: users[0].id,
        content: "오늘 아침 산책길에서 만난 고양이. 따스한 햇살 아래서 기지개를 켜는 모습이 평화로웠다.",
        keywords: ["산책", "고양이", "아침"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
      },
    }),
    prisma.post.create({
      data: {
        userId: users[1].id,
        content: "비 오는 날엔 창가에 앉아 책을 읽는다. 빗소리와 차 한 잔이면 충분한 오후.",
        keywords: ["독서", "차", "비"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5시간 전
      },
    }),
    prisma.post.create({
      data: {
        userId: users[2].id,
        content: "처음 만든 식빵이 생각보다 잘 나왔다. 부엌에 가득한 빵 냄새가 집을 따뜻하게 만든다.",
        keywords: ["베이킹", "요리", "식빵"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8시간 전
      },
    }),
    prisma.post.create({
      data: {
        userId: users[3].id,
        content: "오늘은 서랍 하나를 비웠다. 3년간 안 쓴 물건들. 비우니 마음도 가벼워진다.",
        keywords: ["정리", "비움", "미니멀"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12시간 전
      },
    }),
    prisma.post.create({
      data: {
        userId: users[4].id,
        content: "아침 명상 20분. 호흡에 집중하다 보면 하루가 조금 더 천천히 흐르는 것 같다.",
        keywords: ["명상", "아침", "호흡"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16), // 16시간 전
      },
    }),
    prisma.post.create({
      data: {
        userId: users[0].id,
        content: "동네 공원에 매화가 피기 시작했다. 봄이 조금씩 다가오고 있다.",
        keywords: ["산책", "꽃", "봄"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
      },
    }),
    prisma.post.create({
      data: {
        userId: users[1].id,
        content: "오늘의 차는 얼그레이. 베르가못 향이 기분을 차분하게 만든다.",
        keywords: ["차", "향", "여유"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30), // 1.2일 전
      },
    }),
    prisma.post.create({
      data: {
        userId: users[2].id,
        content: "냉장고에 있던 재료로 만든 저녁. 뭘 만들지 고민하는 시간도 요리의 즐거움.",
        keywords: ["요리", "저녁", "냉장고"],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5일 전
      },
    }),
  ]);

  console.log(`✅ Created ${posts.length} posts`);

  // 공감 생성 (교차 공감)
  const empathies = await Promise.all([
    prisma.empathy.create({
      data: {
        userId: users[1].id,
        postId: posts[0].id,
      },
    }),
    prisma.empathy.create({
      data: {
        userId: users[2].id,
        postId: posts[0].id,
      },
    }),
    prisma.empathy.create({
      data: {
        userId: users[0].id,
        postId: posts[1].id,
      },
    }),
    prisma.empathy.create({
      data: {
        userId: users[3].id,
        postId: posts[1].id,
      },
    }),
    prisma.empathy.create({
      data: {
        userId: users[4].id,
        postId: posts[2].id,
      },
    }),
    prisma.empathy.create({
      data: {
        userId: users[0].id,
        postId: posts[3].id,
      },
    }),
    prisma.empathy.create({
      data: {
        userId: users[1].id,
        postId: posts[4].id,
      },
    }),
  ]);

  console.log(`✅ Created ${empathies.length} empathies`);

  // 게시판 글 생성 (계절별)
  const boards = await Promise.all([
    prisma.board.create({
      data: {
        userId: users[3].id,
        category: BoardCategory.EMPTY,
        season: Season.WINTER,
        title: "겨울 옷장 정리",
        content:
          "작년 겨울 내내 입지 않은 옷들을 기부했습니다. 10벌을 비우니 옷장이 숨을 쉬는 것 같아요. 남은 옷들이 더 잘 보이고, 아침에 옷을 고르는 시간도 줄었습니다.",
      },
    }),
    prisma.board.create({
      data: {
        userId: users[0].id,
        category: BoardCategory.WALK,
        season: Season.WINTER,
        title: "새벽 산책의 고요함",
        content:
          "요즘 새벽 6시에 일어나 동네를 한 바퀴 걷습니다. 아직 깨어나지 않은 도시, 차가운 공기, 가로등 불빛. 하루를 시작하는 조용한 의식 같습니다.",
      },
    }),
    prisma.board.create({
      data: {
        userId: users[2].id,
        category: BoardCategory.RECIPE,
        season: Season.WINTER,
        title: "생강차 끓이는 법",
        content:
          "생강 한 톨, 대추 5개, 꿀 한 숟가락. 천천히 끓여 마시는 생강차 한 잔이면 추운 겨울도 따뜻합니다. 매일 아침 마시는 작은 의식.",
      },
    }),
    prisma.board.create({
      data: {
        userId: users[1].id,
        category: BoardCategory.HOBBY,
        season: Season.WINTER,
        title: "필사의 즐거움",
        content:
          "좋아하는 시를 손으로 옮겨 적습니다. 한 글자 한 글자 따라 쓰다 보면 시인의 마음이 조금씩 느껴지는 것 같아요. 느린 시간이 주는 선물.",
      },
    }),
  ]);

  console.log(`✅ Created ${boards.length} board posts`);

  console.log("🌱 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
