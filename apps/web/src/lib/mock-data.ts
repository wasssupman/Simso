export interface Post {
  id: string;
  author: string;
  content: string;
  keyword: string;
  imageUrl?: string;
  empathyCount: number;
  hasEmpathized: boolean;
  createdAt: string;
}

export interface BoardPost {
  id: string;
  author: string;
  title: string;
  content: string;
  empathyCount: number;
  createdAt: string;
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: '조용한 산책자',
    content: '퇴근길에 평소 안 가던 골목으로 돌아왔다. 담벼락 틈에 핀 작은 꽃을 발견했다. 이름은 모르지만, 괜히 반가웠다.',
    keyword: '산책',
    empathyCount: 12,
    hasEmpathized: false,
    createdAt: '2시간 전',
  },
  {
    id: '2',
    author: '차 한 잔',
    content: '오늘은 아무것도 하지 않기로 했다. 창문을 열고 따뜻한 보이차를 우려 마셨다. 그것만으로 충분한 오후.',
    keyword: '차',
    empathyCount: 8,
    hasEmpathized: true,
    createdAt: '4시간 전',
  },
  {
    id: '3',
    author: '느린 독서가',
    content: '요즘 읽는 책을 하루에 다섯 페이지만 읽는다. 빨리 끝내고 싶은 마음을 내려놓으니, 문장 하나하나가 다르게 보인다.',
    keyword: '독서',
    empathyCount: 15,
    hasEmpathized: false,
    createdAt: '6시간 전',
  },
  {
    id: '4',
    author: '비움 연습생',
    content: '서랍 속 안 쓰는 펜 열두 자루를 정리했다. 쓸 수 있는 세 자루만 남기니 서랍이 한결 가벼워졌다.',
    keyword: '비움',
    empathyCount: 20,
    hasEmpathized: false,
    createdAt: '8시간 전',
  },
  {
    id: '5',
    author: '작은 텃밭',
    content: '베란다 화분에 심은 상추가 드디어 한 뼘 자랐다. 내일은 이걸로 쌈 한 입 해먹어야지.',
    keyword: '텃밭',
    empathyCount: 6,
    hasEmpathized: false,
    createdAt: '12시간 전',
  },
];

export const MOCK_BOARD_POSTS: BoardPost[] = [
  {
    id: '1',
    author: '비움 연습생',
    title: '안 입는 옷 스무 벌을 보냈다',
    content: '옷장을 열 때마다 눈에 밟히던 옷들. "언젠간 입겠지"를 3년째 반복하다가, 오늘 드디어 기부함에 넣었다. 옷장에 빈 공간이 생기니 마음에도 빈 공간이 생긴 기분.',
    empathyCount: 24,
    createdAt: '오늘',
  },
  {
    id: '2',
    author: '단순한 아침',
    title: 'SNS 앱 세 개를 지웠다',
    content: '출퇴근 시간에 무의식적으로 열던 앱들. 일주일만 지워보기로 했다. 3일째인데 지하철에서 창밖을 보는 시간이 생겼다.',
    empathyCount: 31,
    createdAt: '어제',
  },
  {
    id: '3',
    author: '고요한 저녁',
    title: '매일 쓰던 머그컵을 하나만 남겼다',
    content: '찬장에 일곱 개나 있던 머그컵. 가장 손에 익은 하나만 남기고 나머지는 이웃에게 나눠줬다. 설거지가 간단해지니 저녁 시간이 조금 더 여유로워졌다.',
    empathyCount: 18,
    createdAt: '2일 전',
  },
];
