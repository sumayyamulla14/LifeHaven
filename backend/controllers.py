"""
LIFE HAVEN — API CONTROLLERS (PHASE 2 BACKEND)

Designed for BCA Student understanding:
Controllers receive parsed requests, validate the input, interact with our store/database,
and return standardized responses:
    Success: {"success": True, "data": ...}
    Error:   {"success": False, "error": "Reason"}
"""

from typing import Dict, Any, Tuple
from backend.store import store
from backend.models import PeriodRecord, PeriodSymptom


class ResponseHelper:
    @staticmethod
    def success(data: Any, status_code: int = 200) -> Tuple[int, Dict[str, Any]]:
        return status_code, {
            "success": True,
            "data": data
        }

    @staticmethod
    def error(message: str, status_code: int = 400) -> Tuple[int, Dict[str, Any]]:
        return status_code, {
            "success": False,
            "error": message
        }


# ==============================================================
# 1. DASHBOARD CONTROLLER
# ==============================================================

def get_dashboard_summary() -> Tuple[int, Dict[str, Any]]:
    """Retrieves high-level summary KPIs for the user's dashboard."""
    summary = store.get_dashboard_summary()
    return ResponseHelper.success(summary)


def get_daily_wellness() -> Tuple[int, Dict[str, Any]]:
    """Returns today's wellness action plan aligned with biological rhythm."""
    cycle_stats = store.calculate_cycle_stats()
    plan = {
        "greeting": f"Good day, {store.user.full_name.split()[0]}",
        "current_phase": cycle_stats["current_phase"],
        "recommendation": cycle_stats["phase_description"],
        "pillars": [
            {
                "id": 1,
                "title": "Morning Warm Hydration (500 mL)",
                "category": "Cellular Saturation",
                "completed": store.habits[0].completed
            },
            {
                "id": 2,
                "title": "15-Minute Sunlight Walk",
                "category": "Circadian Synchronization",
                "completed": store.habits[1].completed
            },
            {
                "id": 3,
                "title": "Nourishing Plant Protein & Iron Plate",
                "category": "Cellular Nutrition",
                "completed": store.habits[2].completed
            },
            {
                "id": 4,
                "title": "Gentle Movement: 20-min Mobility & Flow",
                "category": "Joint Decompression",
                "completed": store.habits[3].completed
            }
        ]
    }
    return ResponseHelper.success(plan)


# ==============================================================
# 2. WORKOUTS CONTROLLER
# ==============================================================

def get_workouts(category: str = None, level: str = None, focus: str = None, query: str = None) -> Tuple[int, Dict[str, Any]]:
    """Returns workout routines, optionally filtered by category, level, focus, or query."""
    workouts = store.workouts

    if category and category != "all":
        cat_lower = category.lower().strip()
        workouts = [
            w for w in workouts
            if w.category.lower() == cat_lower
            or w.level.lower() == cat_lower
            or w.focus.lower().replace(" ", "") == cat_lower.replace(" ", "")
            or cat_lower in w.category.lower()
            or cat_lower in w.title.lower()
        ]

    if level and level != "all":
        lvl_lower = level.lower().strip()
        workouts = [w for w in workouts if w.level.lower() == lvl_lower]

    if focus and focus != "all":
        foc_lower = focus.lower().replace(" ", "").replace("_", "")
        workouts = [
            w for w in workouts
            if w.focus.lower().replace(" ", "").replace("_", "") == foc_lower
            or foc_lower in w.category.lower()
        ]

    if query:
        q = query.lower().strip()
        workouts = [
            w for w in workouts
            if q in w.title.lower()
            or q in w.description.lower()
            or q in w.target_area.lower()
            or q in w.equipment.lower()
            or q in w.focus.lower()
            or q in w.level.lower()
        ]

    return ResponseHelper.success([w.to_dict() for w in workouts])


def get_workout_detail(workout_id: str) -> Tuple[int, Dict[str, Any]]:
    """Returns detailed flow sequence for a specific workout."""
    if not workout_id:
        return ResponseHelper.error("workout_id is required", 400)

    workout = next((w for w in store.workouts if w.id == workout_id), None)
    if not workout:
        return ResponseHelper.error(f"Workout '{workout_id}' not found", 404)

    return ResponseHelper.success(workout.to_dict())


def complete_workout(payload: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """Marks a workout session as completed and logs duration."""
    if not isinstance(payload, dict):
        return ResponseHelper.error("Payload must be a JSON object", 400)

    workout_id = payload.get("workout_id") or payload.get("id")
    if not workout_id:
        return ResponseHelper.error("workout_id is required", 400)

    duration = payload.get("duration_minutes")
    if duration is not None:
        try:
            duration = int(duration)
            if duration <= 0:
                raise ValueError()
        except ValueError:
            return ResponseHelper.error("duration_minutes must be a positive integer", 400)

    result = store.record_workout_completion(workout_id, duration)
    return ResponseHelper.success(result, 201)


def get_workout_history() -> Tuple[int, Dict[str, Any]]:
    """Returns completed workout history logs."""
    return ResponseHelper.success([h.to_dict() for h in store.workout_history])


# ==============================================================
# 3. PERIOD TRACKER CONTROLLER
# ==============================================================

def get_period_cycle() -> Tuple[int, Dict[str, Any]]:
    """Returns cycle calculations, current phase, and estimated dates."""
    stats = store.calculate_cycle_stats()
    return ResponseHelper.success(stats)


def save_period_records(payload: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """Updates user cycle parameters and logs a new cycle period."""
    if not isinstance(payload, dict):
        return ResponseHelper.error("Payload must be a JSON object", 400)

    start_date = payload.get("start_date")
    end_date = payload.get("end_date")

    if not start_date:
        return ResponseHelper.error("start_date (YYYY-MM-DD) is required", 400)

    if "cycle_length" in payload:
        try:
            cycle_len = int(payload["cycle_length"])
            if 20 <= cycle_len <= 45:
                store.period_settings["cycle_length"] = cycle_len
            else:
                return ResponseHelper.error("cycle_length must be between 20 and 45 days", 400)
        except ValueError:
            return ResponseHelper.error("cycle_length must be an integer", 400)

    if "period_length" in payload:
        try:
            period_len = int(payload["period_length"])
            if 2 <= period_len <= 10:
                store.period_settings["period_length"] = period_len
            else:
                return ResponseHelper.error("period_length must be between 2 and 10 days", 400)
        except ValueError:
            return ResponseHelper.error("period_length must be an integer", 400)

    store.period_settings["last_period_start"] = start_date
    if end_date:
        store.period_settings["last_period_end"] = end_date

    # Add to history record
    new_record = PeriodRecord(
        id=f"pr_{len(store.period_history) + 1}",
        user_id=store.user.id,
        start_date=start_date,
        end_date=end_date or start_date,
        cycle_length=store.period_settings["cycle_length"],
        period_length=store.period_settings["period_length"],
        notes=payload.get("notes", "")
    )
    store.period_history.insert(0, new_record)

    updated_stats = store.calculate_cycle_stats()
    return ResponseHelper.success(updated_stats, 200)


def get_period_history() -> Tuple[int, Dict[str, Any]]:
    """Returns past cycle records."""
    return ResponseHelper.success([r.to_dict() for r in store.period_history])


def save_period_symptoms(payload: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """Records daily cycle symptoms (flow, cramps, mood, energy, notes)."""
    if not isinstance(payload, dict):
        return ResponseHelper.error("Payload must be a JSON object", 400)

    flow = payload.get("flow", "None")
    cramps = payload.get("cramps", "None")
    mood = payload.get("mood", "Calm & Balanced")
    energy = payload.get("energy", "Good")
    symptoms = payload.get("symptoms", [])
    notes = payload.get("notes", "")

    store.period_symptoms = PeriodSymptom(
        id="ps-today",
        user_id=store.user.id,
        date=payload.get("date") or store.period_symptoms.date,
        flow=flow,
        cramps=cramps,
        mood=mood,
        energy=energy,
        symptoms=symptoms if isinstance(symptoms, list) else [],
        notes=notes
    )

    return ResponseHelper.success(store.period_symptoms.to_dict(), 200)


def get_period_symptoms() -> Tuple[int, Dict[str, Any]]:
    """Retrieves today's logged symptoms."""
    return ResponseHelper.success(store.period_symptoms.to_dict())


# ==============================================================
# 4. NUTRITION CONTROLLER
# ==============================================================

def get_nutrition_foods(category: str = None, query: str = None) -> Tuple[int, Dict[str, Any]]:
    """Returns curated superfoods, with optional category and search filters."""
    foods = store.nutrition_foods

    if category and category != "all":
        foods = [f for f in foods if f.category.lower() == category.lower()]

    if query:
        q = query.lower()
        foods = [
            f for f in foods
            if q in f.name.lower() or q in f.benefits.lower() or any(q in t.lower() for t in f.tags)
        ]

    return ResponseHelper.success([f.to_dict() for f in foods])


def get_nutrition_meals(meal_type: str = None, query: str = None) -> Tuple[int, Dict[str, Any]]:
    """Returns balanced meal ideas, optionally filtered by meal type or search query."""
    meals = store.nutrition_meals
    if meal_type and meal_type != "all":
        meals = [m for m in meals if m.type.lower() == meal_type.lower()]

    if query:
        q = query.lower().strip()
        meals = [
            m for m in meals
            if q in m.title.lower()
            or q in m.description.lower()
            or q in m.why_it_works.lower()
            or any(q in ing.lower() for ing in m.ingredients)
            or any(q in t.lower() for t in m.tags)
        ]

    return ResponseHelper.success([m.to_dict() for m in meals])


def get_nutrition_categories() -> Tuple[int, Dict[str, Any]]:
    """Returns the list of superfood categories."""
    categories = [
        {"id": "all", "name": "All Superfoods"},
        {"id": "fruits", "name": "Fruits"},
        {"id": "vegetables", "name": "Vegetables"},
        {"id": "protein", "name": "Protein-Rich"},
        {"id": "iron", "name": "Iron-Rich"},
        {"id": "calcium", "name": "Calcium-Rich"},
        {"id": "fiber", "name": "Fiber & Gut"},
        {"id": "fats", "name": "Healthy Fats"},
        {"id": "hydration", "name": "Hydrating Foods"}
    ]
    return ResponseHelper.success(categories)


# ==============================================================
# 5. HYDRATION CONTROLLER
# ==============================================================

def get_hydration_today() -> Tuple[int, Dict[str, Any]]:
    """Returns today's water consumption, target, and recent fluid logs."""
    remaining = max(0, store.water_target_ml - store.water_current_ml)
    pct = min(100, int((store.water_current_ml / store.water_target_ml) * 100))

    data = {
        "current_ml": store.water_current_ml,
        "target_ml": store.water_target_ml,
        "remaining_ml": remaining,
        "percentage": pct,
        "logs": [l.to_dict() for l in store.water_logs[:20]]
    }
    return ResponseHelper.success(data)


def add_hydration(payload: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """Adds a new water intake record."""
    if not isinstance(payload, dict):
        return ResponseHelper.error("Payload must be a JSON object", 400)

    amount = payload.get("amount_ml") or payload.get("amount")
    if amount is None:
        return ResponseHelper.error("amount_ml is required", 400)

    try:
        amount_ml = int(amount)
        source = payload.get("source", "Standard Water Glass")
        result = store.add_hydration(amount_ml, source)
        return ResponseHelper.success(result, 201)
    except ValueError as e:
        return ResponseHelper.error(str(e), 400)


def reset_hydration() -> Tuple[int, Dict[str, Any]]:
    """Resets today's water consumption to 0."""
    result = store.reset_hydration()
    return ResponseHelper.success(result)


def get_hydration_history() -> Tuple[int, Dict[str, Any]]:
    """Returns full hydration timeline history."""
    return ResponseHelper.success([l.to_dict() for l in store.water_logs])


# ==============================================================
# 6. SLEEP CONTROLLER
# ==============================================================

def save_sleep_record(payload: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """Logs a sleep record with duration, score, and quality."""
    if not isinstance(payload, dict):
        return ResponseHelper.error("Payload must be a JSON object", 400)

    hours = payload.get("duration_hours") or payload.get("hours")
    if hours is None:
        return ResponseHelper.error("duration_hours is required", 400)

    try:
        hours_val = float(hours)
        quality = payload.get("quality", "Good")
        bed_time = payload.get("bed_time", "11:00 PM")
        wake_time = payload.get("wake_time", "07:00 AM")

        record = store.record_sleep(hours_val, quality, bed_time, wake_time)
        return ResponseHelper.success(record, 201)
    except ValueError as e:
        return ResponseHelper.error(str(e), 400)


def get_sleep_history() -> Tuple[int, Dict[str, Any]]:
    """Returns sleep records history and 7-day averages."""
    durations = [r.duration_hours for r in store.sleep_history]
    avg_hours = round(sum(durations) / len(durations), 1) if durations else 7.5

    data = {
        "last_night": store.last_night_sleep.to_dict(),
        "weekly_average": avg_hours,
        "history": [s.to_dict() for s in store.sleep_history]
    }
    return ResponseHelper.success(data)


# ==============================================================
# 7. MOOD & WELLNESS CONTROLLER
# ==============================================================

def save_mood_entry(payload: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """Logs a daily mood, energy level, and reflection journal."""
    if not isinstance(payload, dict):
        return ResponseHelper.error("Payload must be a JSON object", 400)

    mood = payload.get("mood")
    if not mood:
        return ResponseHelper.error("mood is required", 400)

    energy = payload.get("energy_level") or payload.get("energy", 7)
    stress = payload.get("stress_level") or payload.get("stress", "Low")
    notes = payload.get("notes", "")

    try:
        energy_val = int(energy)
        record = store.record_mood(mood, energy_val, stress, notes)
        return ResponseHelper.success(record, 201)
    except ValueError as e:
        return ResponseHelper.error(str(e), 400)


def get_mood_history() -> Tuple[int, Dict[str, Any]]:
    """Returns mood history and latest reflection entry."""
    data = {
        "current": store.current_mood.to_dict(),
        "history": [m.to_dict() for m in store.mood_history]
    }
    return ResponseHelper.success(data)


def get_wellness_suggestions() -> Tuple[int, Dict[str, Any]]:
    """Returns breathwork presets and grounded calming techniques."""
    suggestions = {
        "breathwork_presets": [
            {
                "id": "box-breathing",
                "name": "4-4-4-4 Box Breathing",
                "purpose": "Navy SEAL technique for instant calm, mental clarity, and nervous system balance.",
                "inhale": 4, "hold1": 4, "exhale": 4, "hold2": 4
            },
            {
                "id": "calming-478",
                "name": "4-7-8 Relaxation Breath",
                "purpose": "Natural tranquilizer for the nervous system; ideal before bedtime or during stress.",
                "inhale": 4, "hold1": 7, "exhale": 8, "hold2": 0
            },
            {
                "id": "energizing-breath",
                "name": "Awakening Equal Breath",
                "purpose": "Sharpens focus and lifts midday fatigue.",
                "inhale": 4, "hold1": 0, "exhale": 4, "hold2": 0
            }
        ],
        "grounding_techniques": [
            {
                "title": "5-4-3-2-1 Sensory Grounding",
                "text": "Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste to immediately ground racing thoughts."
            },
            {
                "title": "Warm Magnesium Foot Soak",
                "text": "Soak feet in warm water with Epsom salts for 15 minutes before bed to soothe tense muscles and encourage melatonin."
            },
            {
                "title": "Gentle Physiological Sigh",
                "text": "Take two quick inhales through the nose, followed by one long, slow sigh out the mouth. Repeat 3 times to quickly lower heart rate."
            },
            {
                "title": "Nature Connection Walk",
                "text": "Step outside without screens for 15 minutes. Looking at natural greenery naturally reduces cortisol levels."
            }
        ]
    }
    return ResponseHelper.success(suggestions)


# ==============================================================
# 8. PROGRESS & HABITS CONTROLLER
# ==============================================================

def get_progress_weekly() -> Tuple[int, Dict[str, Any]]:
    """Returns 7-day consistency metrics and streak."""
    return ResponseHelper.success(store.progress_metrics)


def get_progress_monthly() -> Tuple[int, Dict[str, Any]]:
    """Returns monthly summary aggregations."""
    monthly_data = {
        "month": "September 2026",
        "adherence_rate": "89%",
        "total_active_days": 26,
        "water_compliance": "92%",
        "sleep_quality_avg": "86/100",
        "movement_sessions": 14
    }
    return ResponseHelper.success(monthly_data)


def get_progress_summary() -> Tuple[int, Dict[str, Any]]:
    """Returns aggregate summary across all pillars."""
    summary = {
        "streak_days": store.progress_metrics["week_streak"],
        "weekly_adherence": store.progress_metrics["weekly_completion_rate"],
        "completed_workouts_count": len(store.workout_history),
        "logged_sleep_days": len(store.sleep_history),
        "water_today_pct": min(100, int((store.water_current_ml / store.water_target_ml) * 100)),
        "habits_done": sum(1 for h in store.habits if h.completed),
        "habits_total": len(store.habits)
    }
    return ResponseHelper.success(summary)


def get_habits() -> Tuple[int, Dict[str, Any]]:
    """Returns all daily wellness habits."""
    return ResponseHelper.success([h.to_dict() for h in store.habits])


def toggle_habit(payload: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """Toggles completion status of a habit."""
    if not isinstance(payload, dict):
        return ResponseHelper.error("Payload must be a JSON object", 400)

    habit_id = payload.get("habit_id") or payload.get("id")
    if habit_id is None:
        return ResponseHelper.error("habit_id is required", 400)

    try:
        habit_int = int(habit_id)
        result = store.toggle_habit(habit_int)
        return ResponseHelper.success(result)
    except KeyError as e:
        return ResponseHelper.error(str(e), 404)
    except ValueError:
        return ResponseHelper.error("habit_id must be an integer", 400)
