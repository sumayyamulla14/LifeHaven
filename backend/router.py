"""
LIFE HAVEN — API ROUTER (PHASE 2 BACKEND)

Designed for BCA Student understanding:
The router receives HTTP method, path, query parameters, and JSON body.
It matches the route to the proper controller function and returns the HTTP status and JSON response.
"""

from urllib.parse import urlparse, parse_qs
from typing import Dict, Any, Tuple
from backend import controllers


def dispatch_request(method: str, path: str, query_params: Dict[str, Any], body: Dict[str, Any] = None) -> Tuple[int, Dict[str, Any]]:
    """
    Main dispatching function that routes an incoming HTTP request.
    Returns: (status_code, response_dict)
    """
    body = body or {}
    clean_path = path.rstrip("/").lower()

    # ==========================================================
    # GET ROUTES
    # ==========================================================
    if method == "GET":
        # 1. Dashboard
        if clean_path == "/api/dashboard/summary":
            return controllers.get_dashboard_summary()
        elif clean_path == "/api/dashboard/daily-wellness":
            return controllers.get_daily_wellness()

        # 2. Workouts
        elif clean_path == "/api/workouts":
            workout_id = query_params.get("id", [None])[0]
            if workout_id:
                return controllers.get_workout_detail(workout_id)
            category = query_params.get("category", [None])[0]
            level = query_params.get("level", [None])[0]
            focus = query_params.get("focus", [None])[0]
            query = query_params.get("query", [None])[0]
            return controllers.get_workouts(category=category, level=level, focus=focus, query=query)
        elif clean_path.startswith("/api/workouts/"):
            parts = clean_path.split("/")
            if len(parts) == 4 and parts[3] == "history":
                return controllers.get_workout_history()
            elif len(parts) == 4:
                return controllers.get_workout_detail(parts[3])

        # 3. Period Tracker
        elif clean_path == "/api/period/cycle":
            return controllers.get_period_cycle()
        elif clean_path == "/api/period/history":
            return controllers.get_period_history()
        elif clean_path == "/api/period/symptoms":
            return controllers.get_period_symptoms()

        # 4. Nutrition
        elif clean_path == "/api/nutrition/foods":
            cat = query_params.get("category", [None])[0]
            query = query_params.get("query", [None])[0]
            return controllers.get_nutrition_foods(category=cat, query=query)
        elif clean_path == "/api/nutrition/meals":
            meal_type = query_params.get("type", [None])[0]
            query = query_params.get("query", [None])[0]
            return controllers.get_nutrition_meals(meal_type=meal_type, query=query)
        elif clean_path == "/api/nutrition/categories":
            return controllers.get_nutrition_categories()

        # 5. Hydration
        elif clean_path == "/api/hydration/today":
            return controllers.get_hydration_today()
        elif clean_path == "/api/hydration/history":
            return controllers.get_hydration_history()

        # 6. Sleep
        elif clean_path == "/api/sleep/history":
            return controllers.get_sleep_history()

        # 7. Mood & Wellness
        elif clean_path == "/api/mood/history":
            return controllers.get_mood_history()
        elif clean_path == "/api/wellness/suggestions":
            return controllers.get_wellness_suggestions()

        # 8. Progress & Habits
        elif clean_path == "/api/progress/weekly":
            return controllers.get_progress_weekly()
        elif clean_path == "/api/progress/monthly":
            return controllers.get_progress_monthly()
        elif clean_path == "/api/progress/summary":
            return controllers.get_progress_summary()
        elif clean_path == "/api/habits":
            return controllers.get_habits()

    # ==========================================================
    # POST ROUTES
    # ==========================================================
    elif method == "POST":
        # 1. Workouts
        if clean_path == "/api/workouts/complete":
            return controllers.complete_workout(body)

        # 2. Period Tracker
        elif clean_path == "/api/period/records":
            return controllers.save_period_records(body)
        elif clean_path == "/api/period/symptoms":
            return controllers.save_period_symptoms(body)

        # 3. Hydration
        elif clean_path == "/api/hydration/add":
            return controllers.add_hydration(body)
        elif clean_path == "/api/hydration/reset":
            return controllers.reset_hydration()

        # 4. Sleep
        elif clean_path == "/api/sleep/record":
            return controllers.save_sleep_record(body)

        # 5. Mood
        elif clean_path == "/api/mood/entry":
            return controllers.save_mood_entry(body)

        # 6. Habits
        elif clean_path == "/api/habits/toggle":
            return controllers.toggle_habit(body)

    # Method not allowed or not found
    return 404, {
        "success": False,
        "error": f"Endpoint '{clean_path}' not found for method '{method}'"
    }
