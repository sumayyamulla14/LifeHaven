-- ============================================================================
-- LIFE HAVEN — PRODUCTION POSTGRESQL DATABASE SCHEMA (SUPABASE)
-- ============================================================================
-- Compatible with Supabase PostgreSQL 15+
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- It creates all tables, indexes, triggers, and Row Level Security (RLS) policies.
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. USER PROFILES TABLE (Linked to auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL DEFAULT 'Elena Vance',
    role TEXT NOT NULL DEFAULT 'member', -- 'member' or 'admin'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ============================================================================
-- 3. WORKOUTS LIBRARY (Public Movement Studio Catalog)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.workouts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,           -- 'beginner', 'intermediate', 'advanced', etc.
    type TEXT NOT NULL,               -- 'Full Body Foundations', etc.
    duration_minutes INTEGER NOT NULL DEFAULT 20,
    difficulty TEXT NOT NULL DEFAULT 'Beginner',
    intensity TEXT NOT NULL DEFAULT 'Moderate',
    target_area TEXT NOT NULL,
    calories_est INTEGER NOT NULL DEFAULT 120,
    equipment TEXT NOT NULL DEFAULT 'Bodyweight',
    description TEXT NOT NULL,
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    level TEXT NOT NULL DEFAULT 'Beginner',
    focus TEXT NOT NULL DEFAULT 'Full Body',
    warmup TEXT NOT NULL DEFAULT '5-minute dynamic joint warm-up and breathing',
    cooldown TEXT NOT NULL DEFAULT '5-minute gentle static stretching and cool-down',
    exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
    image TEXT DEFAULT '',
    attribution TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workouts_category ON public.workouts(category);
CREATE INDEX IF NOT EXISTS idx_workouts_level ON public.workouts(level);
CREATE INDEX IF NOT EXISTS idx_workouts_focus ON public.workouts(focus);

-- ============================================================================
-- 4. WORKOUT HISTORY (User Completed Routines)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.workout_history (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    workout_id TEXT REFERENCES public.workouts(id) ON DELETE SET NULL,
    routine_title TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 20,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workout_history_user ON public.workout_history(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_history_completed ON public.workout_history(completed_at DESC);

-- ============================================================================
-- 5. MENSTRUAL CYCLE & PERIOD RECORDS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.period_records (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    cycle_length INTEGER NOT NULL DEFAULT 28,
    period_length INTEGER NOT NULL DEFAULT 5,
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_period_records_user ON public.period_records(user_id);
CREATE INDEX IF NOT EXISTS idx_period_records_start ON public.period_records(start_date DESC);

-- ============================================================================
-- 6. DAILY PERIOD & CYCLE SYMPTOMS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.period_symptoms (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    flow TEXT DEFAULT 'None',           -- 'None', 'Spotting', 'Light', 'Medium', 'Heavy'
    cramps TEXT DEFAULT 'None',         -- 'None', 'Mild', 'Moderate', 'Severe'
    mood TEXT DEFAULT 'Calm',
    energy TEXT DEFAULT 'Good',         -- 'High', 'Good', 'Moderate', 'Low'
    symptoms JSONB DEFAULT '[]'::jsonb,
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_period_symptoms_user_date ON public.period_symptoms(user_id, date);

-- ============================================================================
-- 7. HYDRATION RECORDS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.hydration_records (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount_ml INTEGER NOT NULL DEFAULT 250,
    source TEXT NOT NULL DEFAULT 'Standard Glass (250 mL)',
    logged_at TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hydration_user_date ON public.hydration_records(user_id, date);

-- ============================================================================
-- 8. SLEEP RECORDS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.sleep_records (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    duration_hours NUMERIC(3,1) NOT NULL DEFAULT 8.0,
    quality TEXT NOT NULL DEFAULT 'Restful', -- 'Deep', 'Restful', 'Good', 'Light', 'Restless'
    score INTEGER NOT NULL DEFAULT 85,
    bed_time TEXT DEFAULT '11:00 PM',
    wake_time TEXT DEFAULT '07:00 AM',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sleep_user_date ON public.sleep_records(user_id, date DESC);

-- ============================================================================
-- 9. MOOD & JOURNAL RECORDS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.mood_records (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    mood TEXT NOT NULL DEFAULT 'Grounded & Serene',
    energy_level INTEGER NOT NULL DEFAULT 7,
    stress_level TEXT NOT NULL DEFAULT 'Low', -- 'Low', 'Moderate', 'Elevated'
    notes TEXT DEFAULT '',
    logged_at TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mood_user ON public.mood_records(user_id, created_at DESC);

-- ============================================================================
-- 10. NUTRITION WHOLE FOODS LIBRARY
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.nutrition_foods (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,             -- 'fruits', 'vegetables', 'protein', 'iron', 'calcium', 'fiber', 'fats', 'hydration'
    tags JSONB DEFAULT '[]'::jsonb,
    benefits TEXT NOT NULL,
    highlights TEXT NOT NULL,
    serving_tip TEXT NOT NULL,
    serving_size TEXT NOT NULL DEFAULT '1 serving',
    calories INTEGER NOT NULL DEFAULT 100,
    protein_g NUMERIC(5,1) NOT NULL DEFAULT 0.0,
    carbs_g NUMERIC(5,1) NOT NULL DEFAULT 0.0,
    fiber_g NUMERIC(5,1) NOT NULL DEFAULT 0.0,
    fat_g NUMERIC(5,1) NOT NULL DEFAULT 0.0,
    vitamins_minerals JSONB DEFAULT '[]'::jsonb,
    meal_ideas JSONB DEFAULT '[]'::jsonb,
    image TEXT DEFAULT '',
    attribution TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_nutrition_foods_category ON public.nutrition_foods(category);

-- ============================================================================
-- 11. MEAL SUGGESTIONS & PREPARATION BLUEPRINTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.meal_suggestions (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,                 -- 'breakfast', 'lunch', 'dinner', 'snack', 'quick'
    title TEXT NOT NULL,
    prep_time TEXT NOT NULL DEFAULT '15 mins',
    calories TEXT NOT NULL DEFAULT '350 kcal',
    tags JSONB DEFAULT '[]'::jsonb,
    description TEXT NOT NULL,
    ingredients JSONB DEFAULT '[]'::jsonb,
    why_it_works TEXT NOT NULL,
    instructions JSONB DEFAULT '[]'::jsonb,
    image TEXT DEFAULT '',
    attribution TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_meal_suggestions_type ON public.meal_suggestions(type);

-- ============================================================================
-- 12. HABITS & WELLNESS RITUALS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.habits (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'wellness',
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_habits_user ON public.habits(user_id);

-- ============================================================================
-- 13. AUTOMATED PROFILE PROVISIONING TRIGGER (auth.users -> public.profiles)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Elena Vance'),
        'member'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.period_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.period_symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hydration_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

-- Catalog Tables: Public Read-Only for All Users
CREATE POLICY "Workouts are viewable by everyone" ON public.workouts FOR SELECT USING (true);
CREATE POLICY "Foods are viewable by everyone" ON public.nutrition_foods FOR SELECT USING (true);
CREATE POLICY "Meals are viewable by everyone" ON public.meal_suggestions FOR SELECT USING (true);

-- User Profiles: Read and Update Own Profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Workout History: User-isolated CRUD
CREATE POLICY "Users can view own workout history" ON public.workout_history FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert own workout history" ON public.workout_history FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Period Records: User-isolated CRUD
CREATE POLICY "Users can view own period records" ON public.period_records FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can manage own period records" ON public.period_records FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- Period Symptoms: User-isolated CRUD
CREATE POLICY "Users can view own period symptoms" ON public.period_symptoms FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can manage own period symptoms" ON public.period_symptoms FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- Hydration Records: User-isolated CRUD
CREATE POLICY "Users can view own hydration" ON public.hydration_records FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can manage own hydration" ON public.hydration_records FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- Sleep Records: User-isolated CRUD
CREATE POLICY "Users can view own sleep records" ON public.sleep_records FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can manage own sleep records" ON public.sleep_records FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- Mood Records: User-isolated CRUD
CREATE POLICY "Users can view own mood records" ON public.mood_records FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can manage own mood records" ON public.mood_records FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- Habits: User-isolated CRUD
CREATE POLICY "Users can view own habits" ON public.habits FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can manage own habits" ON public.habits FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);
