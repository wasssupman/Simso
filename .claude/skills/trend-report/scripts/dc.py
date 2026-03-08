"""DC인사이드 실시간 베스트 키워드 수집"""

import requests
from bs4 import BeautifulSoup
import json
import sys
from collections import Counter
import re


def fetch_dc_trending() -> list[dict]:
    """DC인사이드 실시간 베스트 글 제목에서 키워드를 추출한다."""
    keywords = []

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    # DC인사이드 실시간 베스트 (데스크톱)
    try:
        url = "https://gall.dcinside.com/board/lists/?id=dcbest&page=1"
        resp = requests.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        titles = []
        for item in soup.select(".gall_tit a"):
            text = item.get_text(strip=True)
            if text and len(text) > 2 and text != "AD":
                titles.append(text)

        # 제목이 안 잡히면 다른 셀렉터 시도
        if not titles:
            for item in soup.select("td.gall_tit > a:first-child"):
                text = item.get_text(strip=True)
                if text and len(text) > 2:
                    titles.append(text)

        # 제목에서 주요 단어 빈도 분석
        stop_words = {
            "진짜", "ㅋㅋ", "ㅋㅋㅋ", "ㅋㅋㅋㅋ", "ㄹㅇ", "이거", "그거",
            "근데", "아니", "이게", "그냥", "왜", "뭐", "좀", "다",
            "것", "수", "등", "더", "또", "안", "잘", "못", "이",
            "대", "중", "내", "네", "저", "제", "우리", "너", "걍",
            "사람", "ㅎㅎ", "진자", "요즘", "오늘", "어제",
        }

        word_count: Counter = Counter()
        for title in titles:
            words = re.findall(r"[가-힣]{2,}", title)
            for word in words:
                if word not in stop_words and len(word) >= 2:
                    word_count[word] += 1

        for i, (word, count) in enumerate(word_count.most_common(20), 1):
            keywords.append({
                "rank": i,
                "keyword": word,
                "count": count,
                "source": "dcinside",
            })

    except Exception as e:
        print(f"[dc] 수집 실패: {e}", file=sys.stderr)

    return keywords


if __name__ == "__main__":
    results = fetch_dc_trending()
    print(json.dumps(results, ensure_ascii=False, indent=2))
