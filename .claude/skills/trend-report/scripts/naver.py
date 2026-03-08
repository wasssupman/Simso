"""네이버 급상승 검색어 & 인기 뉴스 키워드 수집"""

import requests
from bs4 import BeautifulSoup
import json
import sys
import re
from collections import Counter


def fetch_naver_trending() -> list[dict]:
    """네이버에서 트렌드 키워드를 가져온다."""
    keywords = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    # 1. 네이버 실시간 인기 검색어 (시그널)
    try:
        url = "https://www.signal.bz/news"
        resp = requests.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        for i, item in enumerate(soup.select("a.trending-keyword, .rank-text"), 1):
            text = item.get_text(strip=True)
            if text and len(text) >= 2:
                keywords.append({
                    "rank": i,
                    "keyword": text,
                    "source": "signal",
                })
            if i >= 20:
                break
    except Exception as e:
        print(f"[naver] 시그널 수집 실패: {e}", file=sys.stderr)

    # 2. 네이버 뉴스 메인 헤드라인 키워드
    try:
        url = "https://news.naver.com/main/ranking/popularDay.naver"
        resp = requests.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        titles = []
        for item in soup.select(".rankingnews_name, .list_title, .rankingnews_list a"):
            text = item.get_text(strip=True)
            if text and len(text) > 5:
                titles.append(text)

        # 제목에서 명사 추출 (2글자 이상 한글 단어)
        stop_words = {"기자", "뉴스", "속보", "단독", "종합", "포토", "영상", "사진"}
        word_count: Counter = Counter()
        for title in titles:
            words = re.findall(r"[가-힣]{2,}", title)
            for word in words:
                if word not in stop_words:
                    word_count[word] += 1

        for i, (word, count) in enumerate(word_count.most_common(15), 1):
            if not any(k["keyword"] == word for k in keywords):
                keywords.append({
                    "rank": len(keywords) + 1,
                    "keyword": word,
                    "count": count,
                    "source": "naver_news",
                })
    except Exception as e:
        print(f"[naver] 뉴스 수집 실패: {e}", file=sys.stderr)

    return keywords


if __name__ == "__main__":
    results = fetch_naver_trending()
    print(json.dumps(results, ensure_ascii=False, indent=2))
