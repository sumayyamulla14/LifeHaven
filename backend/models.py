"""
LIFE HAVEN — DATA MODELS & SCHEMAS (PHASE 2 BACKEND)

Designed for BCA Student comprehension:
These classes define the clean structure of our data entities.
In Phase 3, these dataclasses map 1:1 to Supabase PostgreSQL tables:
- users -> auth.users
- profiles -> public.profiles
- workouts -> public.workouts
- workout_history -> public.workout_history
- period_records -> public.period_records
- period_symptoms -> public.period_symptoms
- hydration_records -> public.hydration_records
- sleep_records -> public.sleep_records
- mood_records -> public.mood_records
- nutrition_content -> public.nutrition_content
- health_education -> public.health_education
- habits -> public.habits
- progress_history -> public.progress_history
"""

from dataclasses import dataclass, field, asdict
from typing import List, Optional, Dict, Any
from datetime import datetime


@dataclass
class UserProfile:
    id: str
    email: str
    full_name: str
    role: str = "member"  # 'member' or 'admin'
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class Workout:
    id: str
    title: str
    category: str  # 'beginner', 'intermediate', 'advanced', 'strength', 'cardio', 'core', 'upper', 'lower', 'mobility', 'flexibility'
    type: str
    duration_minutes: int
    difficulty: str
    intensity: str
    target_area: str
    calories_est: int
    equipment: str
    description: str
    instructions: List[str]
    level: str = "Beginner"       # 'Beginner', 'Intermediate', 'Advanced'
    focus: str = "Full Body"      # 'Full Body', 'Strength', 'Cardio', 'Upper Body', 'Lower Body', 'Core', 'Mobility', 'Flexibility'
    warmup: str = "5-minute dynamic joint warm-up and breathing"
    cooldown: str = "5-minute gentle static stretching and cool-down"
    exercises: List[Dict[str, Any]] = field(default_factory=list)
    image: str = ""
    attribution: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class WorkoutHistory:
    id: str
    user_id: str
    workout_id: str
    routine_title: str
    duration_minutes: int
    completed_at: str = field(default_factory=lambda: datetime.now().isoformat())

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class PeriodRecord:
    id: str
    user_id: str
    start_date: str  # 'YYYY-MM-DD'
    end_date: str    # 'YYYY-MM-DD'
    cycle_length: int = 28
    period_length: int = 5
    notes: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class PeriodSymptom:
    id: str
    user_id: str
    date: str  # 'YYYY-MM-DD'
    flow: str = "None"         # 'None', 'Spotting', 'Light', 'Medium', 'Heavy'
    cramps: str = "None"       # 'None', 'Mild', 'Moderate', 'Severe'
    mood: str = "Calm"
    energy: str = "Good"       # 'High', 'Good', 'Moderate', 'Low'
    symptoms: List[str] = field(default_factory=list)
    notes: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class HydrationRecord:
    id: str
    user_id: str
    amount_ml: int
    source: str
    logged_at: str = field(default_factory=lambda: datetime.now().strftime("%I:%M %p"))
    date: str = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class SleepRecord:
    id: str
    user_id: str
    date: str
    duration_hours: float
    quality: str = "Restful"   # 'Deep', 'Restful', 'Good', 'Light', 'Restless'
    score: int = 85
    bed_time: str = "11:00 PM"
    wake_time: str = "07:00 AM"

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class MoodRecord:
    id: str
    user_id: str
    mood: str
    energy_level: int          # 1 to 10
    stress_level: str          # 'Low', 'Moderate', 'Elevated'
    notes: str = ""
    logged_at: str = field(default_factory=lambda: datetime.now().strftime("%b %d, %I:%M %p"))

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class NutritionFood:
    id: str
    name: str
    category: str              # 'fruits', 'vegetables', 'protein', 'iron', 'calcium', 'fiber', 'fats', 'hydration'
    tags: List[str]
    benefits: str
    highlights: str
    serving_tip: str
    serving_size: str = "1 serving"
    calories: int = 100
    protein_g: float = 2.0
    carbs_g: float = 15.0
    fiber_g: float = 3.0
    fat_g: float = 0.5
    vitamins_minerals: List[str] = field(default_factory=list)
    meal_ideas: List[str] = field(default_factory=list)
    image: str = ""
    attribution: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class MealSuggestion:
    id: str
    type: str                  # 'breakfast', 'lunch', 'dinner', 'snack', 'quick'
    title: str
    prep_time: str
    calories: str
    tags: List[str]
    description: str
    ingredients: List[str]
    why_it_works: str
    instructions: List[str] = field(default_factory=list)
    image: str = ""
    attribution: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class Habit:
    id: int
    text: str
    category: str
    completed: bool = False

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
