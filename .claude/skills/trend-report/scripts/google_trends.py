"""구글 트렌드 (한국) 급상승 검색어 수집"""

import json
import sys
import feedparser


def fetch_google_trends() -> list[dict]:
    """구글 트렌드 한국 급상승 검색어를 가져온다."""
    keywords = []

    # Google Trends RSS (한국)
    try:
        rss_url = "https://trends.google.co.kr/trending/rss?geo=KR"
        feed = feedparser.parse(rss_url)
        for i, entry in enumerate(feed.entries[:20], 1):
            title = entry.title.strip()

            # 영어·외국어 키워드 필터 (한국어만)
            if not any('\uac00' <= c <= '\ud7a3' for c in title):
                continue

            traffic = ""
            if hasattr(entry, "ht_approx_traffic"):
                traffic = entry.ht_approx_traffic

            keywords.append({
                "rank": len(keywords) + 1,
                "keyword": title,
                "traffic": traffic,
                "source": "google_trends",
            })
    except Exception as e:
        print(f"[google] RSS 수집 실패: {e}", file=sys.stderr)

    return keywords


if __name__ == "__main__":
    results = fetch_google_trends()
    print(json.dumps(results, ensure_ascii=False, indent=2))
