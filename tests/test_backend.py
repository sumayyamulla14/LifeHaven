"""
LIFE HAVEN — BACKEND API TEST SUITE (PHASE 2)

Designed for BCA Student testing:
Uses standard Python 'unittest' library with zero external dependencies.
Tests every API domain:
- API availability & routing
- Valid and invalid request payloads
- Hydration (GET / POST / validation)
- Workouts (GET / details / completion)
- Period tracker (GET / POST / estimates)
- Sleep (GET / POST / score calculation)
- Mood & wellness (GET / POST / range validation)
- Progress & habits (GET / toggle)
- Nutrition (GET / filters)
"""

import sys
import os
import unittest

# Ensure project root is in sys.path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from backend.router import dispatch_request
from backend.store import store


class LifeHavenBackendTestCase(unittest.TestCase):

    def setUp(self):
        """Reset state before each test if necessary."""
        pass

    # 1. API Availability & Routing
    def test_api_availability(self):
        """Verifies dashboard summary endpoint is reachable and returns standard structure."""
        status, response = dispatch_request("GET", "/api/dashboard/summary", {})
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertIn("data", response)
        self.assertIn("water", response["data"])
        self.assertIn("sleep", response["data"])
        self.assertIn("cycle", response["data"])
        self.assertIn("mood", response["data"])

    def test_invalid_endpoint(self):
        """Verifies non-existent endpoints return 404 with error message."""
        status, response = dispatch_request("GET", "/api/nonexistent/path", {})
        self.assertEqual(status, 404)
        self.assertFalse(response["success"])
        self.assertIn("error", response)

    def test_daily_wellness(self):
        """Verifies daily wellness plan returns pillars and current phase."""
        status, response = dispatch_request("GET", "/api/dashboard/daily-wellness", {})
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertIn("pillars", response["data"])
        self.assertIn("current_phase", response["data"])

    # 2. Hydration
    def test_hydration_get_today(self):
        """Verifies hydration today returns target, current, and logs."""
        status, response = dispatch_request("GET", "/api/hydration/today", {})
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertIn("current_ml", response["data"])
        self.assertIn("target_ml", response["data"])
        self.assertIn("percentage", response["data"])

    def test_hydration_add_valid(self):
        """Verifies valid water logging increases total count."""
        initial_status, initial_resp = dispatch_request("GET", "/api/hydration/today", {})
        start_ml = initial_resp["data"]["current_ml"]

        status, response = dispatch_request("POST", "/api/hydration/add", {}, {"amount_ml": 250, "source": "Test Glass"})
        self.assertEqual(status, 201)
        self.assertTrue(response["success"])
        self.assertEqual(response["data"]["current_ml"], start_ml + 250)

    def test_hydration_add_invalid(self):
        """Verifies invalid water amount returns error."""
        status, response = dispatch_request("POST", "/api/hydration/add", {}, {"amount_ml": -50})
        self.assertEqual(status, 400)
        self.assertFalse(response["success"])
        self.assertIn("error", response)

        status, response = dispatch_request("POST", "/api/hydration/add", {}, {})
        self.assertEqual(status, 400)
        self.assertFalse(response["success"])

    # 3. Workouts
    def test_workouts_get_all(self):
        """Verifies workouts endpoint returns list of routines."""
        status, response = dispatch_request("GET", "/api/workouts", {})
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertIsInstance(response["data"], list)
        self.assertGreaterEqual(len(response["data"]), 6)

    def test_workouts_filter_category(self):
        """Verifies filtering workouts by category."""
        status, response = dispatch_request("GET", "/api/workouts", {"category": ["strength"]})
        self.assertEqual(status, 200)
        for w in response["data"]:
            self.assertEqual(w["category"], "strength")

    def test_workouts_get_by_id(self):
        """Verifies getting single workout details."""
        status, response = dispatch_request("GET", "/api/workouts/w-beg-1", {})
        self.assertEqual(status, 200)
        self.assertEqual(response["data"]["id"], "w-beg-1")
        self.assertIn("instructions", response["data"])

    def test_workout_completion(self):
        """Verifies completing a workout adds entry to history."""
        status, response = dispatch_request("POST", "/api/workouts/complete", {}, {
            "workout_id": "w-beg-1",
            "duration_minutes": 18
        })
        self.assertEqual(status, 201)
        self.assertTrue(response["success"])

        hist_status, hist_resp = dispatch_request("GET", "/api/workouts/history", {})
        self.assertEqual(hist_status, 200)
        self.assertTrue(any(item["workout_id"] == "w-beg-1" for item in hist_resp["data"]))

    # 4. Period Tracker
    def test_period_cycle_info(self):
        """Verifies period cycle calculations and predictions."""
        status, response = dispatch_request("GET", "/api/period/cycle", {})
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertIn("current_phase", response["data"])
        self.assertIn("next_period_estimate", response["data"])
        self.assertIn("disclaimer", response["data"])

    def test_period_record_save(self):
        """Verifies saving period record updates settings."""
        status, response = dispatch_request("POST", "/api/period/records", {}, {
            "start_date": "2026-09-15",
            "end_date": "2026-09-19",
            "cycle_length": 28,
            "period_length": 5
        })
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertEqual(response["data"]["last_period_start"], "2026-09-15")

    def test_period_symptoms_save(self):
        """Verifies saving cycle symptoms."""
        status, response = dispatch_request("POST", "/api/period/symptoms", {}, {
            "flow": "Light",
            "cramps": "Mild",
            "mood": "Calm",
            "energy": "Good",
            "symptoms": ["Clear skin", "Mild headache"],
            "notes": "Feeling centered today"
        })
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertEqual(response["data"]["flow"], "Light")

    # 5. Sleep
    def test_sleep_record_valid(self):
        """Verifies logging sleep duration and perceived quality."""
        status, response = dispatch_request("POST", "/api/sleep/record", {}, {
            "duration_hours": 8.0,
            "quality": "Restful",
            "bed_time": "10:45 PM",
            "wake_time": "06:45 AM"
        })
        self.assertEqual(status, 201)
        self.assertTrue(response["success"])
        self.assertEqual(response["data"]["duration_hours"], 8.0)
        self.assertGreater(response["data"]["score"], 80)

    def test_sleep_record_invalid(self):
        """Verifies invalid sleep duration is rejected."""
        status, response = dispatch_request("POST", "/api/sleep/record", {}, {
            "duration_hours": 30.0  # Invalid > 24h
        })
        self.assertEqual(status, 400)
        self.assertFalse(response["success"])

    # 6. Mood & Wellness
    def test_mood_entry_valid(self):
        """Verifies logging mood reflection."""
        status, response = dispatch_request("POST", "/api/mood/entry", {}, {
            "mood": "Calm & Centered",
            "energy_level": 8,
            "stress_level": "Low",
            "notes": "Enjoyed afternoon walk in fresh air."
        })
        self.assertEqual(status, 201)
        self.assertTrue(response["success"])
        self.assertEqual(response["data"]["mood"], "Calm & Centered")

    def test_mood_entry_invalid(self):
        """Verifies invalid energy scale (e.g. >10) is rejected."""
        status, response = dispatch_request("POST", "/api/mood/entry", {}, {
            "mood": "High Energy",
            "energy_level": 15
        })
        self.assertEqual(status, 400)
        self.assertFalse(response["success"])

    def test_wellness_suggestions(self):
        """Verifies wellness suggestions returns breathwork presets and grounding tools."""
        status, response = dispatch_request("GET", "/api/wellness/suggestions", {})
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertIn("breathwork_presets", response["data"])
        self.assertIn("grounding_techniques", response["data"])

    # 7. Progress & Habits
    def test_progress_weekly(self):
        """Verifies 7-day progress metrics."""
        status, response = dispatch_request("GET", "/api/progress/weekly", {})
        self.assertEqual(status, 200)
        self.assertTrue(response["success"])
        self.assertIn("week_streak", response["data"])

    def test_habits_get_and_toggle(self):
        """Verifies habit retrieval and toggle functionality."""
        status, response = dispatch_request("GET", "/api/habits", {})
        self.assertEqual(status, 200)
        habits = response["data"]
        self.assertGreaterEqual(len(habits), 6)

        target_id = habits[0]["id"]
        original_state = habits[0]["completed"]

        toggle_status, toggle_resp = dispatch_request("POST", "/api/habits/toggle", {}, {"habit_id": target_id})
        self.assertEqual(toggle_status, 200)
        self.assertEqual(toggle_resp["data"]["habit"]["completed"], not original_state)

    # 8. Nutrition
    def test_nutrition_foods_and_meals(self):
        """Verifies superfoods and meal ideas queries."""
        f_status, f_resp = dispatch_request("GET", "/api/nutrition/foods", {})
        self.assertEqual(f_status, 200)
        self.assertGreater(len(f_resp["data"]), 0)

        m_status, m_resp = dispatch_request("GET", "/api/nutrition/meals", {})
        self.assertEqual(m_status, 200)
        self.assertGreater(len(m_resp["data"]), 0)


if __name__ == "__main__":
    unittest.main(verbosity=2)
