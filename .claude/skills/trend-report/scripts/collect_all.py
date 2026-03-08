"""모든 소스에서 트렌드 키워드를 수집하고 통합 JSON으로 출력한다."""

import json
import sys
import os
from datetime import datetime

# 스크립트 디렉토리를 path에 추가
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from naver import fetch_naver_trending
from google_trends import fetch_google_trends
from dc import fetch_dc_trending
from instagram import fetch_instagram_trending


def collect_all() -> dict:
    """전체 소스에서 키워드를 수집한다."""
    all_keywords = []
    errors = []

    # 각 소스 수집
    collectors = [
        ("naver", fetch_naver_trending),
        ("google_trends", fetch_google_trends),
        ("dcinside", fetch_dc_trending),
        ("instagram", fetch_instagram_trending),
    ]

    for name, fetcher in collectors:
        try:
            results = fetcher()
            all_keywords.extend(results)
            print(f"[OK] {name}: {len(results)}개 수집", file=sys.stderr)
        except Exception as e:
            errors.append(f"{name}: {e}")
            print(f"[FAIL] {name}: {e}", file=sys.stderr)

    # 키워드 통합 (중복 제거, 빈도 집계)
    keyword_map: dict[str, dict] = {}
    for item in all_keywords:
        kw = item["keyword"]
        if kw in keyword_map:
            keyword_map[kw]["sources"].append(item["source"])
            keyword_map[kw]["mention_count"] += 1
        else:
            keyword_map[kw] = {
                "keyword": kw,
                "sources": [item["source"]],
                "mention_count": 1,
                "first_rank": item.get("rank", 0),
            }

    # 여러 소스에서 언급된 키워드를 상위로
    merged = sorted(
        keyword_map.values(),
        key=lambda x: (x["mention_count"], -x["first_rank"]),
        reverse=True,
    )

    return {
        "collected_at": datetime.now().isoformat(),
        "total_keywords": len(merged),
        "sources": {
            "naver": len([k for k in all_keywords if k["source"].startswith("naver")]),
            "google_trends": len([k for k in all_keywords if k["source"].startswith("google")]),
            "dcinside": len([k for k in all_keywords if k["source"] == "dcinside"]),
            "instagram": len([k for k in all_keywords if k["source"].startswith("instagram")]),
        },
        "errors": errors,
        "keywords": merged[:50],  # 상위 50개
    }


if __name__ == "__main__":
    result = collect_all()
    print(json.dumps(result, ensure_ascii=False, indent=2))
