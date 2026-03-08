/** 오늘의 소소함 글자 수 제한 */
export const POST_MAX_LENGTH = 300;

/** 하루 최대 게시물 수 */
export const DAILY_POST_LIMIT = 1;

/** 편지함 주간 제한 */
export const WEEKLY_LETTER_LIMIT = 1;

/** 피드 관심 키워드 비율 (60%) */
export const FEED_INTEREST_RATIO = 0.6;

/** 피드 다양성 비율 (40%) */
export const FEED_DIVERSITY_RATIO = 0.4;

/** 관심 키워드 목록 */
export const INTEREST_KEYWORDS = [
  '산책',
  '요리',
  '독서',
  '비움',
  '뜨개질',
  '필사',
  '그림',
  '텃밭',
  '차',
  '날씨',
] as const;

export type InterestKeyword = (typeof INTEREST_KEYWORDS)[number];
