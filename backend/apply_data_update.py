"""
apply_data_update.py
Applies the generated Workouts & Nutrition libraries into:
- js/mockData.js
- backend/store.py
"""

import json
import re
from backend.generate_all_workouts import WORKOUTS
from backend.generate_all_nutrition import (
    NUTRITION_CATEGORIES, FOODS, MEALS, BALANCED_PLATE_BLUEPRINT, WOMENS_HEALTH_NUTRITION
)

def update_js_mockdata():
    path = "d:/LifeHaven/js/mockData.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Create the JS representation for nutrition
    nutrition_obj = {
        "categories": NUTRITION_CATEGORIES,
        "foods": FOODS,
        "meals": MEALS,
        "balancedPlate": BALANCED_PLATE_BLUEPRINT,
        "womensHealth": WOMENS_HEALTH_NUTRITION,
        "nutritionPhilosophy": {
            "headline": "Nourishment Over Restriction",
            "text": "At Life Haven, we reject extreme, one-size-fits-all medical diets. True wellness is about honoring your bio-individuality, eating colorful whole foods, listening to your hunger and fullness cues, and giving your cells the raw vitamins, minerals, and hydration they need to thrive every single day."
        }
    }
    nutrition_json = json.dumps(nutrition_obj, indent=4)

    # Create the JS representation for workouts
    workouts_json = json.dumps(WORKOUTS, indent=4)

    # Initial workout history
    workout_history_obj = [
        {
            "id": "wh-init-1",
            "routineId": "w-beg-1",
            "title": "Gentle Morning Mobility & Awakening",
            "durationMinutes": 18,
            "completedAt": "Yesterday, 07:30 AM",
            "targetArea": "Full Body & Spine"
        },
        {
            "id": "wh-init-2",
            "routineId": "w-str-1",
            "title": "Full Body Functional Strength",
            "durationMinutes": 32,
            "completedAt": "2 days ago, 06:15 PM",
            "targetArea": "Full Body (Glutes, Core, Back)"
        }
    ]
    workout_history_json = json.dumps(workout_history_obj, indent=4)

    # Replace nutrition: { ... } in mockData.js
    nutrition_pattern = re.compile(r'  // 5\. Food & Nutrition\s+nutrition:\s*\{.*?\n  \},\n\n  // 6\. Balanced Workouts', re.DOTALL)
    new_nutrition_block = f"  // 5. Food & Nutrition (Expanded Whole Food & Education Library)\n  nutrition: {nutrition_json},\n\n  // 6. Balanced Workouts"
    content = nutrition_pattern.sub(lambda m: new_nutrition_block, content)

    # Replace workouts: [ ... ] in mockData.js
    workouts_pattern = re.compile(r'  // 6\. Balanced Workouts.*?\s+workouts:\s*\[.*?\n  \],\n\n  // 7\. Mood & Mental Wellness', re.DOTALL)
    new_workouts_block = f"  // 6. Balanced Workouts (Expanded Library with 23 Routines & Form Tutorials)\n  workouts: {workouts_json},\n\n  // 6b. Workout History Log\n  workoutHistory: {workout_history_json},\n\n  // 7. Mood & Mental Wellness"
    content = workouts_pattern.sub(lambda m: new_workouts_block, content)

    # Update storage key in loadAppState / saveAppState to lifehaven_state_v3 to ensure fresh data
    content = content.replace("lifehaven_state_v2", "lifehaven_state_v3")
    content = content.replace(
        "if (!parsed.workouts) parsed.workouts = initialMockData.workouts;",
        "parsed.workouts = initialMockData.workouts;\n      parsed.nutrition = initialMockData.nutrition;\n      if (!parsed.workoutHistory) parsed.workoutHistory = initialMockData.workoutHistory;"
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Updated js/mockData.js successfully!")


def update_python_store():
    path = "d:/LifeHaven/backend/store.py"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Generate Python code for Workout dataclass instances
    workout_code_items = []
    for w in WORKOUTS:
        ex_dicts_str = json.dumps(w["exercises"], indent=20)
        instructions_str = json.dumps(w["instructions"], indent=20)
        desc_escaped = w["description"].replace('"', '\\"')
        title_escaped = w["title"].replace('"', '\\"')
        warmup_escaped = w["warmup"].replace('"', '\\"')
        cooldown_escaped = w["cooldown"].replace('"', '\\"')
        target_escaped = w["targetArea"].replace('"', '\\"')
        equip_escaped = w["equipment"].replace('"', '\\"')
        item = f"""            Workout(
                id="{w['id']}",
                title="{title_escaped}",
                category="{w['category']}",
                type="{w['type']}",
                duration_minutes={w['durationMinutes']},
                difficulty="{w['difficulty']}",
                intensity="{w['intensity']}",
                target_area="{target_escaped}",
                calories_est={w['caloriesEst']},
                equipment="{equip_escaped}",
                description="{desc_escaped}",
                instructions={instructions_str},
                level="{w['level']}",
                focus="{w['focus']}",
                warmup="{warmup_escaped}",
                cooldown="{cooldown_escaped}",
                exercises={ex_dicts_str}
            )"""
        workout_code_items.append(item)

    workouts_py_block = ",\n".join(workout_code_items)

    # Generate Python code for NutritionFood dataclass instances
    food_code_items = []
    for f in FOODS:
        tags_str = json.dumps(f["tags"])
        vitamins_str = json.dumps(f["vitaminsMinerals"])
        meal_ideas_str = json.dumps(f["mealIdeas"])
        name_escaped = f["name"].replace('"', '\\"')
        benefits_escaped = f["benefits"].replace('"', '\\"')
        highlights_escaped = f["highlights"].replace('"', '\\"')
        tip_escaped = f["servingTip"].replace('"', '\\"')
        size_escaped = f["servingSize"].replace('"', '\\"')
        item = f"""            NutritionFood(
                id="{f['id']}",
                name="{name_escaped}",
                category="{f['category']}",
                tags={tags_str},
                benefits="{benefits_escaped}",
                highlights="{highlights_escaped}",
                serving_tip="{tip_escaped}",
                serving_size="{size_escaped}",
                calories={f['calories']},
                protein_g={f['proteinG']},
                carbs_g={f['carbsG']},
                fiber_g={f['fiberG']},
                fat_g={f['fatG']},
                vitamins_minerals={vitamins_str},
                meal_ideas={meal_ideas_str}
            )"""
        food_code_items.append(item)

    foods_py_block = ",\n".join(food_code_items)

    # Generate Python code for MealSuggestion dataclass instances
    meal_code_items = []
    for m in MEALS:
        tags_str = json.dumps(m["tags"])
        ingredients_str = json.dumps(m["ingredients"], indent=20)
        instructions_str = json.dumps(m.get("instructions", []), indent=20)
        title_escaped = m["title"].replace('"', '\\"')
        desc_escaped = m["description"].replace('"', '\\"')
        why_escaped = m["whyItWorks"].replace('"', '\\"')
        item = f"""            MealSuggestion(
                id="{m['id']}",
                type="{m['type']}",
                title="{title_escaped}",
                prep_time="{m['prepTime']}",
                calories="{m['calories']}",
                tags={tags_str},
                description="{desc_escaped}",
                ingredients={ingredients_str},
                why_it_works="{why_escaped}",
                instructions={instructions_str}
            )"""
        meal_code_items.append(item)

    meals_py_block = ",\n".join(meal_code_items)

    # Replace self.workouts in store.py
    workouts_pattern = re.compile(r'        # 1\. Workouts\s+self\.workouts:\s*List\[Workout\]\s*=\s*\[.*?\n        \]\n\n        self\.workout_history', re.DOTALL)
    new_workouts_store = f"        # 1. Workouts (Expanded Library with 23 Routines)\n        self.workouts: List[Workout] = [\n{workouts_py_block}\n        ]\n\n        self.workout_history"
    content = workouts_pattern.sub(lambda m: new_workouts_store, content)

    # Replace self.nutrition_foods in store.py
    foods_pattern = re.compile(r'        # 6\. Nutrition.*?\s+self\.nutrition_foods:\s*List\[NutritionFood\]\s*=\s*\[.*?\n        \]\n\n        self\.nutrition_meals', re.DOTALL)
    new_foods_store = f"        # 6. Nutrition Superfoods (Expanded Whole Foods Library)\n        self.nutrition_foods: List[NutritionFood] = [\n{foods_py_block}\n        ]\n\n        self.nutrition_meals"
    content = foods_pattern.sub(lambda m: new_foods_store, content)

    # Replace self.nutrition_meals in store.py
    meals_pattern = re.compile(r'        self\.nutrition_meals:\s*List\[MealSuggestion\]\s*=\s*\[.*?\n        \]\n\n        # 7\. Habits', re.DOTALL)
    new_meals_store = f"        self.nutrition_meals: List[MealSuggestion] = [\n{meals_py_block}\n        ]\n\n        # 7. Habits"
    content = meals_pattern.sub(lambda m: new_meals_store, content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Updated backend/store.py successfully!")


if __name__ == "__main__":
    update_js_mockdata()
    update_python_store()
