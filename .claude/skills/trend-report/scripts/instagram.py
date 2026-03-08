"""인스타그램 인기 해시태그 수집"""

import requests
from bs4 import BeautifulSoup
import json
import sys
import re
from collections import Counter


def fetch_instagram_trending() -> list[dict]:
    """인스타그램에서 트렌드 해시태그를 가져온다.

    Note: 인스타그램은 공식 API가 제한적이고 로그인 필요.
    대안으로 해시태그 추천 사이트나 서드파티 API 활용.
    """
    keywords = []

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    # 방법 1: Best-hashtags.com (인스타그램 인기 해시태그 집계 사이트)
    try:
        # 한국 관련 카테고리들
        categories = [
            "korea",
            "korean",
            "daily",
            "lifestyle",
            "food",
            "cafe",
            "nature",
        ]

        all_tags = []

        for category in categories[:3]:  # 처음 3개만 수집 (속도 고려)
            try:
                url = f"https://best-hashtags.com/hashtag/{category}/"
                resp = requests.get(url, headers=headers, timeout=10)
                resp.raise_for_status()
                soup = BeautifulSoup(resp.text, "html.parser")

                # 해시태그 추출
                for tag_elem in soup.select(".tag-box .tag1"):
                    tag = tag_elem.get_text(strip=True)
                    if tag.startswith("#"):
                        tag = tag[1:]
                    # 한글 포함 태그만
                    if any('\uac00' <= c <= '\ud7a3' for c in tag):
                        all_tags.append(tag)

            except Exception as e:
                print(f"[instagram] {category} 카테고리 수집 실패: {e}", file=sys.stderr)
                continue

        # 빈도 집계
        tag_count = Counter(all_tags)

        for i, (tag, count) in enumerate(tag_count.most_common(15), 1):
            keywords.append({
                "rank": i,
                "keyword": tag,
                "count": count,
                "source": "instagram",
            })

    except Exception as e:
        print(f"[instagram] best-hashtags 수집 실패: {e}", file=sys.stderr)

    # 방법 2: 한국 라이프스타일 블로거들이 많이 쓰는 해시태그 패턴
    # (실제 수집 불가 시 대안으로 알려진 인기 태그 사용)
    if not keywords:
        print("[instagram] 실시간 수집 실패, 알려진 라이프스타일 해시태그 사용", file=sys.stderr)

        # 심소 컨셉에 맞는 일반적인 인기 해시태그
        fallback_tags = [
            "일상", "데일리", "소확행", "오늘의기록",
            "커피", "카페", "홈카페", "베이킹",
            "독서", "책스타그램", "북스타그램",
            "산책", "날씨", "하늘", "풍경",
            "미니멀", "정리", "심플라이프",
            "감성", "무드", "힐링", "여유",
            "요리", "집밥", "홈쿡",
        ]

        for i, tag in enumerate(fallback_tags[:15], 1):
            keywords.append({
                "rank": i,
                "keyword": tag,
                "source": "instagram_fallback",
            })

    return keywords


if __name__ == "__main__":
    results = fetch_instagram_trending()
    print(json.dumps(results, ensure_ascii=False, indent=2))
