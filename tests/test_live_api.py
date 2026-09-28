"""
LIFE HAVEN — LIVE HTTP API TEST
Verifies all 26 endpoints over real TCP sockets on http://127.0.0.1:3000
"""

import urllib.request
import json
import sys


def test(method, url, data=None):
    req = urllib.request.Request(
        url,
        method=method,
        headers={"Content-Type": "application/json"}
    )
    body = json.dumps(data).encode("utf-8") if data else None
    try:
        with urllib.request.urlopen(req, data=body, timeout=5) as res:
            parsed = json.loads(res.read().decode("utf-8"))
            assert parsed.get("success") is True, f"Failed on {url}: {parsed}"
            print(f"[PASS] {method} {url}", flush=True)
    except Exception as e:
        print(f"[FAIL] {method} {url} -> {e}", flush=True)
        sys.exit(1)


def main():
    print("Testing live HTTP endpoints against http://127.0.0.1:3000...", flush=True)
    base = "http://127.0.0.1:3000"
    test("GET", f"{base}/api/status")
    test("GET", f"{base}/api/dashboard/summary")
    test("GET", f"{base}/api/dashboard/daily-wellness")
    test("GET", f"{base}/api/workouts")
    test("GET", f"{base}/api/workouts/w-beg-1")
    test("POST", f"{base}/api/workouts/complete", {"workout_id": "w-beg-1", "duration_minutes": 18})
    test("GET", f"{base}/api/workouts/history")
    test("GET", f"{base}/api/period/cycle")
    test("POST", f"{base}/api/period/records", {"start_date": "2026-09-14", "end_date": "2026-09-18"})
    test("GET", f"{base}/api/period/history")
    test("POST", f"{base}/api/period/symptoms", {"flow": "None", "cramps": "None", "mood": "Calm"})
    test("GET", f"{base}/api/nutrition/foods")
    test("GET", f"{base}/api/nutrition/meals")
    test("GET", f"{base}/api/nutrition/categories")
    test("GET", f"{base}/api/hydration/today")
    test("POST", f"{base}/api/hydration/add", {"amount_ml": 250, "source": "Standard Glass"})
    test("GET", f"{base}/api/sleep/history")
    test("POST", f"{base}/api/sleep/record", {"duration_hours": 8.0, "quality": "Restful"})
    test("GET", f"{base}/api/mood/history")
    test("POST", f"{base}/api/mood/entry", {"mood": "Calm & Centered", "energy_level": 8, "stress_level": "Low"})
    test("GET", f"{base}/api/wellness/suggestions")
    test("GET", f"{base}/api/progress/weekly")
    test("GET", f"{base}/api/progress/monthly")
    test("GET", f"{base}/api/progress/summary")
    test("GET", f"{base}/api/habits")
    test("POST", f"{base}/api/habits/toggle", {"habit_id": 1})
    print("\n[SUCCESS] ALL 26 LIVE HTTP API ENDPOINTS TESTED AND VERIFIED!", flush=True)


if __name__ == "__main__":
    main()
