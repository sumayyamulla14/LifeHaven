"""
build_database.py
Generates the complete datasets for Workouts & Nutrition and writes them
into js/mockData.js and backend/store.py with high fidelity and zero syntax errors.
"""

import json
from backend.build_full_libraries import EXERCISES as E1
from backend.generate_exercises import EXERCISES as E2

# Merge all exercises
ALL_EXERCISES = {**E1, **E2}

# ==============================================================================
# WORKOUT ROUTINES (23 DISTINCT ROUTINES)
# ==============================================================================

WORKOUTS = [
    # --------------------------------------------------------------------------
    # BEGINNER WORKOUTS (8)
    # --------------------------------------------------------------------------
    {
        "id": "w-beg-fullbody",
        "title": "Full Body Beginner Routine",
        "level": "Beginner",
        "category": "beginner",
        "focus": "Full Body",
        "type": "Full Body Foundations",
        "durationMinutes": 20,
        "difficulty": "Beginner",
        "intensity": "Gentle-Moderate",
        "targetArea": "Full Body (Quads, Chest, Glutes, Core)",
        "caloriesEst": 120,
        "equipment": "Mat only",
        "description": "A balanced whole-body introduction that teaches foundational movement patterns: squat, push, hinge, and core stabilization.",
        "warmup": "5 minutes — Standing shoulder rolls, hip circles, gentle marching in place, cat-cow stretches.",
        "cooldown": "5 minutes — Seated forward fold, gentle child's pose, deep diaphragmatic belly breathing.",
        "exercises": [
            ALL_EXERCISES["squat_bw"],
            ALL_EXERCISES["wall_pushup"],
            ALL_EXERCISES["glute_bridge"],
            ALL_EXERCISES["bird_dog"],
            ALL_EXERCISES["march_in_place"]
        ],
        "instructions": [
            "Bodyweight Squat — 3 sets of 10 controlled reps. Focus on chest up and heels planted.",
            "Wall / Incline Push-Up — 3 sets of 8 reps. Keep core tight and elbows at 45 degrees.",
            "Glute Bridge — 3 sets of 12 reps with 2-second pause at the peak.",
            "Quadruped Bird Dog — 3 sets of 8 reps per side focusing on hip stability.",
            "Standing March in Place — 3 sets of 30 seconds for gentle stamina."
        ]
    },
    {
        "id": "w-beg-cardio",
        "title": "Beginner Low-Impact Cardio Flow",
        "level": "Beginner",
        "category": "cardio",
        "focus": "Cardio",
        "type": "Low-Impact Aerobic",
        "durationMinutes": 20,
        "difficulty": "Beginner",
        "intensity": "Moderate",
        "targetArea": "Cardiovascular, Legs & Lungs",
        "caloriesEst": 130,
        "equipment": "No equipment needed",
        "description": "A joint-friendly cardiovascular routine designed to elevate heart rate without jumping or putting excess pressure on knees and ankles.",
        "warmup": "5 minutes — Gentle ankle rotations, side-to-side weight shifts, arm sweeps with deep inhales.",
        "cooldown": "5 minutes — Slow arm reaches, standing calf stretch, chest opening stretch.",
        "exercises": [
            ALL_EXERCISES["march_in_place"],
            ALL_EXERCISES["step_jack"],
            ALL_EXERCISES["assisted_lunge"],
            ALL_EXERCISES["clamshells"]
        ],
        "instructions": [
            "Standing March with Arm Reach — 3 rounds of 40 seconds on, 20 seconds rest.",
            "Low-Impact Step Jack — 3 rounds of 40 seconds on, 20 seconds rest.",
            "Supported Reverse Lunge — 3 sets of 8 reps per leg with smooth control.",
            "Side-Lying Clamshells — 3 sets of 12 reps per side targeting glute stabilizers."
        ]
    },
    {
        "id": "w-beg-strength",
        "title": "Beginner Foundational Strength",
        "level": "Beginner",
        "category": "strength",
        "focus": "Strength",
        "type": "Foundational Resistance",
        "durationMinutes": 25,
        "difficulty": "Beginner",
        "intensity": "Moderate",
        "targetArea": "Full Body Strength",
        "caloriesEst": 140,
        "equipment": "Light Dumbbells or Water Bottles & Mat",
        "description": "Learn safe resistance training technique with light weights to protect bone density, strengthen connective tissue, and feel capable.",
        "warmup": "5 minutes — Arm circles, torso twists, wrist rolls, gentle unweighted squats.",
        "cooldown": "5 minutes — Standing quad stretch, cross-body shoulder stretch, neck release.",
        "exercises": [
            ALL_EXERCISES["squat_bw"],
            ALL_EXERCISES["db_floor_press"],
            ALL_EXERCISES["band_pull_apart"],
            ALL_EXERCISES["glute_bridge"],
            ALL_EXERCISES["calf_raises"]
        ],
        "instructions": [
            "Bodyweight Squats — 3 sets of 10-12 reps keeping spine upright.",
            "Dumbbell Floor Chest Press — 3 sets of 10 reps with light dumbbells.",
            "Resistance Band Pull-Apart — 3 sets of 12 reps for upper back posture.",
            "Glute Bridge with 2-sec Squeeze — 3 sets of 12 reps driving through heels.",
            "Standing Calf Raises — 3 sets of 15 reps with steady 2-second lowering."
        ]
    },
    {
        "id": "w-beg-1",
        "title": "Gentle Morning Mobility & Awakening",
        "level": "Beginner",
        "category": "beginner",
        "focus": "Mobility",
        "type": "Flexibility & Mobility",
        "durationMinutes": 18,
        "difficulty": "Beginner",
        "intensity": "Gentle",
        "targetArea": "Full Body & Spine",
        "caloriesEst": 85,
        "equipment": "Mat only",
        "description": "A soothing routine to unlock tight joints, gently lengthen the spine, and stimulate circulation after waking up.",
        "warmup": "3 minutes — Deep diaphragmatic breathing in easy seated pose.",
        "cooldown": "3 minutes — Reclined restorative butterfly with hands over belly.",
        "exercises": [
            ALL_EXERCISES["cat_cow"],
            ALL_EXERCISES["child_pose"],
            ALL_EXERCISES["pelvic_tilts"],
            ALL_EXERCISES["seated_hamstring"]
        ],
        "instructions": [
            "Cat-Cow Spinal Waves — 10 gentle repetitions inhaling as spine dips, exhaling as back arches.",
            "Child’s Pose with Lateral Reach — 60 seconds holding each side to open ribcage and lats.",
            "Pelvic Tilts with Diaphragmatic Breath — 10 slow reps soothing the lower back.",
            "Seated Hamstring Stretch — 45 seconds per leg with tall spine."
        ]
    },
    {
        "id": "w-beg-flex",
        "title": "Beginner Full Body Flexibility & Release",
        "level": "Beginner",
        "category": "flexibility",
        "focus": "Flexibility",
        "type": "Restorative Stretch",
        "durationMinutes": 20,
        "difficulty": "Beginner",
        "intensity": "Gentle / Restorative",
        "targetArea": "Hips, Hamstrings, Neck & Chest",
        "caloriesEst": 75,
        "equipment": "Mat only",
        "description": "Slow, restorative stretches designed to relieve sitting stiffness, release hip tension, and ease nervous system stress.",
        "warmup": "3 minutes — Shoulder rolls and neck lateral drops.",
        "cooldown": "3 minutes — Mindful stillness and box breathing.",
        "exercises": [
            ALL_EXERCISES["child_pose"],
            ALL_EXERCISES["seated_hamstring"],
            ALL_EXERCISES["cat_cow"],
            ALL_EXERCISES["wall_angels"]
        ],
        "instructions": [
            "Child's Pose with Side Stretch — 2 minutes gently opening latissimus dorsi.",
            "Seated Hamstring & Posterior Stretch — 60 seconds per leg with smooth breathing.",
            "Cat-Cow Spinal Waves — 10 slow fluid repetitions.",
            "Wall Angels for Posture — 10 reps against wall opening chest and shoulders."
        ]
    },
    {
        "id": "w-beg-core",
        "title": "Beginner Core & Pelvic Floor Foundations",
        "level": "Beginner",
        "category": "core",
        "focus": "Core",
        "type": "Deep Core Stabilization",
        "durationMinutes": 18,
        "difficulty": "Beginner",
        "intensity": "Gentle-Moderate",
        "targetArea": "Deep Transverse Abdominis & Pelvic Floor",
        "caloriesEst": 95,
        "equipment": "Mat",
        "description": "Safe, gentle activation of the deep core stabilizers that protect your lower back, improve posture, and support pelvic balance.",
        "warmup": "3 minutes — Pelvic clock breathing on the mat.",
        "cooldown": "3 minutes — Full body pencil stretch reaching fingertips away from toes.",
        "exercises": [
            ALL_EXERCISES["pelvic_tilts"],
            ALL_EXERCISES["dead_bug_beginner"],
            ALL_EXERCISES["bird_dog"],
            ALL_EXERCISES["glute_bridge"]
        ],
        "instructions": [
            "Pelvic Tilts with Diaphragmatic Breath — 12 slow reps connecting to deep core.",
            "Dead Bug Heel Taps — 3 sets of 10 alternating reps maintaining flat lower back.",
            "Quadruped Bird Dog — 3 sets of 8 reps per side holding 2 seconds at top.",
            "Glute Bridge — 3 sets of 12 reps focusing on glute and pelvic floor coordination."
        ]
    },
    {
        "id": "w-beg-lower",
        "title": "Beginner Lower Body Awakening",
        "level": "Beginner",
        "category": "lower",
        "focus": "Lower Body",
        "type": "Lower Body Foundations",
        "durationMinutes": 22,
        "difficulty": "Beginner",
        "intensity": "Moderate",
        "targetArea": "Glutes, Quads, Hamstrings & Calves",
        "caloriesEst": 125,
        "equipment": "Mat & Chair for balance",
        "description": "Strengthen and stabilize the legs and hips with accessible movements that build confidence in everyday bending, walking, and climbing.",
        "warmup": "5 minutes — Ankle circles, standing knee lifts, gentle hip hinges.",
        "cooldown": "5 minutes — Standing quad stretch and seated figure-4 glute stretch.",
        "exercises": [
            ALL_EXERCISES["squat_bw"],
            ALL_EXERCISES["assisted_lunge"],
            ALL_EXERCISES["glute_bridge"],
            ALL_EXERCISES["clamshells"],
            ALL_EXERCISES["calf_raises"]
        ],
        "instructions": [
            "Bodyweight Squat to Chair — 3 sets of 10 reps driving through heels.",
            "Supported Reverse Lunge — 3 sets of 8 reps per leg.",
            "Glute Bridge — 3 sets of 12 reps with 2-second hold at top.",
            "Side-Lying Clamshells — 3 sets of 12 reps each side for hip stabilization.",
            "Standing Calf Raises — 3 sets of 15 smooth reps."
        ]
    },
    {
        "id": "w-beg-upper",
        "title": "Beginner Upper Body & Posture Alignment",
        "level": "Beginner",
        "category": "upper",
        "focus": "Upper Body",
        "type": "Upper Body Posture",
        "durationMinutes": 20,
        "difficulty": "Beginner",
        "intensity": "Moderate",
        "targetArea": "Chest, Shoulders, Upper Back & Arms",
        "caloriesEst": 110,
        "equipment": "Light Band or Light Dumbbells & Wall",
        "description": "Counteract hours spent looking at phones and computer screens by strengthening upper back rhomboids and opening tight chest muscles.",
        "warmup": "5 minutes — Shoulder shrugs, arm circles, chest openers with deep breathing.",
        "cooldown": "5 minutes — Doorway pectoral stretch and child's pose.",
        "exercises": [
            ALL_EXERCISES["wall_pushup"],
            ALL_EXERCISES["wall_angels"],
            ALL_EXERCISES["band_pull_apart"],
            ALL_EXERCISES["db_floor_press"]
        ],
        "instructions": [
            "Wall / Incline Push-Up — 3 sets of 8 reps focusing on smooth chest lowering.",
            "Wall Angels for Posture — 3 sets of 10 reps against wall.",
            "Resistance Band Pull-Apart — 3 sets of 12 reps squeezing upper shoulder blades.",
            "Dumbbell Floor Chest Press — 3 sets of 10 reps with light weights."
        ]
    },

    # --------------------------------------------------------------------------
    # INTERMEDIATE WORKOUTS (8)
    # --------------------------------------------------------------------------
    {
        "id": "w-int-fullbody",
        "title": "Intermediate Total Body Conditioning",
        "level": "Intermediate",
        "category": "full_body",
        "focus": "Full Body",
        "type": "Total Body Resistance",
        "durationMinutes": 30,
        "difficulty": "Intermediate",
        "intensity": "Moderate-High",
        "targetArea": "Full Body (Quads, Lats, Shoulders, Core)",
        "caloriesEst": 210,
        "equipment": "Pair of Dumbbells & Mat",
        "description": "Multi-joint compound exercises combined with core intervals to challenge muscular endurance and lean muscle preservation.",
        "warmup": "5 minutes — High knees, inchworms, arm swings, bodyweight squats.",
        "cooldown": "5 minutes — Downward dog to cobra flow, child's pose, deep breathing.",
        "exercises": [
            ALL_EXERCISES["goblet_squat"],
            ALL_EXERCISES["db_row"],
            ALL_EXERCISES["db_rdl"],
            ALL_EXERCISES["forearm_plank"],
            ALL_EXERCISES["skaters"]
        ],
        "instructions": [
            "Dumbbell Goblet Squat — 3 sets of 10-12 reps keeping chest tall.",
            "Dumbbell Bent-Over Row — 3 sets of 10-12 reps squeezing back at top.",
            "Dumbbell Romanian Deadlift — 3 sets of 10 reps hinging hips back.",
            "Forearm Plank — 3 sets of 40-second hold with active glute squeeze.",
            "Lateral Speed Skaters — 3 sets of 40 seconds for heart rate elevation."
        ]
    },
    {
        "id": "w-str-1",
        "title": "Full Body Functional Strength",
        "level": "Intermediate",
        "category": "strength",
        "focus": "Strength",
        "type": "Strength & Toning",
        "durationMinutes": 32,
        "difficulty": "Intermediate",
        "intensity": "Moderate-High",
        "targetArea": "Full Body (Glutes, Core, Back)",
        "caloriesEst": 220,
        "equipment": "Dumbbells or Bodyweight",
        "description": "Compound multi-joint movements designed to preserve lean muscle, enhance bone density, and improve everyday posture.",
        "warmup": "5 minutes — Arm circles, hip openers, bodyweight air squats.",
        "cooldown": "5 minutes — Reclined spinal twist, quad stretch, deep relaxation.",
        "exercises": [
            ALL_EXERCISES["goblet_squat"],
            ALL_EXERCISES["db_rdl"],
            ALL_EXERCISES["db_row"],
            ALL_EXERCISES["pushup_knees"],
            ALL_EXERCISES["glute_bridge"]
        ],
        "instructions": [
            "Goblet Squats — 3 sets of 10-12 controlled reps. Keep chest proud.",
            "Dumbbell Romanian Deadlifts — 3 sets of 10 reps focusing on hip hinge.",
            "Dumbbell Bent-Over Row — 3 sets of 12 reps engaging shoulder blades.",
            "Push-Ups (Floor or Kneeling) — 3 sets of 8-10 reps maintaining rigid core plank.",
            "Glute Bridges with 2-sec Pause — 3 sets of 15 reps squeezing glutes at the top."
        ]
    },
    {
        "id": "w-cardio-1",
        "title": "Low-Impact Aerobic Flow & Stamina",
        "level": "Intermediate",
        "category": "cardio",
        "focus": "Cardio",
        "type": "Cardio Stamina",
        "durationMinutes": 24,
        "difficulty": "Intermediate",
        "intensity": "Moderate",
        "targetArea": "Cardiovascular & Legs",
        "caloriesEst": 180,
        "equipment": "No equipment needed",
        "description": "A joint-friendly cardio session that elevates heart rate without jarring knees or ankles. Perfect for lymphatic drainage and vitality.",
        "warmup": "4 minutes — Brisk march with arm reaches and deep breathing.",
        "cooldown": "4 minutes — Walking step-touches and standing calf stretches.",
        "exercises": [
            ALL_EXERCISES["march_in_place"],
            ALL_EXERCISES["skaters"],
            ALL_EXERCISES["high_knees"],
            ALL_EXERCISES["mountain_climbers"]
        ],
        "instructions": [
            "Brisk March with Arm Reach — 3 minutes continuous rhythmic flow.",
            "Side-to-Side Skater Glides — 40 seconds on, 20 seconds recovery (3 rounds).",
            "Rhythmic High Knees — 30 seconds on, 30 seconds recovery (3 rounds).",
            "Controlled Mountain Climbers — 30 seconds on, 30 seconds recovery (3 rounds)."
        ]
    },
    {
        "id": "w-core-1",
        "title": "Pilates Core & Pelvic Floor Stability",
        "level": "Intermediate",
        "category": "core",
        "focus": "Core",
        "type": "Core & Stability",
        "durationMinutes": 20,
        "difficulty": "Intermediate",
        "intensity": "Moderate",
        "targetArea": "Deep Transverse Abdominis & Pelvic Floor",
        "caloriesEst": 110,
        "equipment": "Yoga Mat",
        "description": "Targeted deep core conditioning that supports lower back comfort, pelvic health, and long-term spinal alignment.",
        "warmup": "3 minutes — Diaphragmatic ribcage breathing on mat.",
        "cooldown": "3 minutes — Cobra stretch and child's pose.",
        "exercises": [
            ALL_EXERCISES["pelvic_tilts"],
            ALL_EXERCISES["dead_bug_beginner"],
            ALL_EXERCISES["bird_dog"],
            ALL_EXERCISES["side_plank"],
            ALL_EXERCISES["forearm_plank"]
        ],
        "instructions": [
            "Pelvic Tilts with Diaphragmatic Breath — 10 reps feeling deep lower abdominal connection.",
            "Dead Bugs with Controlled Reach — 3 sets of 12 alternating reps keeping lower back glued to floor.",
            "Bird-Dog Extension with Hold — 3 sets of 8 reps per side holding 3 seconds at top.",
            "Side Plank on Forearm — 30 seconds hold per side.",
            "Forearm Plank — 30-40 seconds hold focusing on stable pelvis."
        ]
    },
    {
        "id": "w-upper-1",
        "title": "Upper Body Posture & Shoulder Sculpt",
        "level": "Intermediate",
        "category": "upper",
        "focus": "Upper Body",
        "type": "Upper Body Strength",
        "durationMinutes": 25,
        "difficulty": "Intermediate",
        "intensity": "Moderate",
        "targetArea": "Shoulders, Upper Back, Arms",
        "caloriesEst": 160,
        "equipment": "Light Dumbbells or Resistance Band",
        "description": "Combat desk slouching and build strong, sculpted shoulders and upper back with targeted resistance exercises.",
        "warmup": "4 minutes — Arm circles, doorway chest stretch, wrist rolls.",
        "cooldown": "4 minutes — Cross-arm shoulder stretch and overhead tricep stretch.",
        "exercises": [
            ALL_EXERCISES["band_pull_apart"],
            ALL_EXERCISES["db_row"],
            ALL_EXERCISES["tricep_dips"],
            ALL_EXERCISES["db_floor_press"]
        ],
        "instructions": [
            "Band Pull-Aparts — 3 sets of 15 reps targeting rear deltoids and rhomboids.",
            "Dumbbell Bent-Over Row — 3 sets of 12 reps engaging shoulder blades at peak contraction.",
            "Tricep Bench or Chair Dips — 3 sets of 12 reps keeping back close to bench.",
            "Dumbbell Floor Press — 3 sets of 10-12 reps with controlled descent."
        ]
    },
    {
        "id": "w-int-lower",
        "title": "Intermediate Lower Body Sculpt & Glute Burn",
        "level": "Intermediate",
        "category": "lower",
        "focus": "Lower Body",
        "type": "Lower Body Strength",
        "durationMinutes": 28,
        "difficulty": "Intermediate",
        "intensity": "Moderate-High",
        "targetArea": "Glutes, Hamstrings, Quadriceps",
        "caloriesEst": 200,
        "equipment": "Pair of Dumbbells & Mat",
        "description": "Targeted lower body hypertrophy focusing on glute development, hamstring strength, and knee stability.",
        "warmup": "5 minutes — Glute bridges, air squats, leg swings forward and back.",
        "cooldown": "5 minutes — Pigeon pose and standing quad stretch.",
        "exercises": [
            ALL_EXERCISES["goblet_squat"],
            ALL_EXERCISES["db_rdl"],
            ALL_EXERCISES["bulgarian_split_squat"],
            ALL_EXERCISES["glute_bridge"],
            ALL_EXERCISES["calf_raises"]
        ],
        "instructions": [
            "Dumbbell Goblet Squat — 3 sets of 10-12 reps with 2-second eccentric lowering.",
            "Dumbbell Romanian Deadlift — 3 sets of 10 reps focusing on hamstring stretch.",
            "Bulgarian Split Squat — 3 sets of 8 reps per leg with tall torso.",
            "Glute Bridge with 2-sec Pause — 3 sets of 15 reps.",
            "Standing Calf Raises — 3 sets of 15 reps with peak pause."
        ]
    },
    {
        "id": "w-int-mobility",
        "title": "Dynamic Joint Mobility & Hip Opener",
        "level": "Intermediate",
        "category": "mobility",
        "focus": "Mobility",
        "type": "Joint Health & Flow",
        "durationMinutes": 24,
        "difficulty": "Intermediate",
        "intensity": "Moderate",
        "targetArea": "Hips, Thoracic Spine, Ankles",
        "caloriesEst": 100,
        "equipment": "Yoga Mat",
        "description": "Release stubborn pelvic and spine stiffness with dynamic mobility sequences that restore natural range of motion.",
        "warmup": "4 minutes — Easy cat-cow cycles and shoulder sweeps.",
        "cooldown": "4 minutes — Supta Baddha Konasana (Reclined Butterfly) with mindful breathing.",
        "exercises": [
            ALL_EXERCISES["cat_cow"],
            ALL_EXERCISES["child_pose"],
            ALL_EXERCISES["cossack_squat"],
            ALL_EXERCISES["bird_dog"]
        ],
        "instructions": [
            "Cat-Cow Spinal Waves — 10 smooth fluid cycles.",
            "Child's Pose with Lateral Reach — 60 seconds per side.",
            "Deep Cossack Squats — 3 sets of 6-8 reps per side for hip adductor mobility.",
            "Quadruped Bird Dog — 3 sets of 8 reps per side with 3-second hold."
        ]
    },
    {
        "id": "w-mob-1",
        "title": "De-Stressing Evening Yoga & Stretch",
        "level": "Intermediate",
        "category": "flexibility",
        "focus": "Flexibility",
        "type": "Restorative & Flexibility",
        "durationMinutes": 22,
        "difficulty": "Intermediate",
        "intensity": "Low / Restorative",
        "targetArea": "Hips, Hamstrings & Shoulders",
        "caloriesEst": 70,
        "equipment": "Yoga Mat, Cushion/Block",
        "description": "Slow, restorative postures that down-regulate the nervous system from fight-or-flight into rest-and-digest before bedtime.",
        "warmup": "3 minutes — Deep diaphragmatic belly breathing.",
        "cooldown": "4 minutes — Legs-Up-The-Wall (Viparita Karani) effortless relaxation.",
        "exercises": [
            ALL_EXERCISES["child_pose"],
            ALL_EXERCISES["seated_hamstring"],
            ALL_EXERCISES["cat_cow"],
            ALL_EXERCISES["wall_angels"]
        ],
        "instructions": [
            "Child's Pose with Bolster — 3 minutes breathing into posterior ribcage.",
            "Seated Hamstring Fold with Soft Knees — 2 minutes breathing into hamstrings.",
            "Cat-Cow Spinal Waves — 10 slow gentle repetitions.",
            "Gentle Reclined Spinal Twist — 2 minutes each side releasing lower back tension."
        ]
    },

    # --------------------------------------------------------------------------
    # ADVANCED WORKOUTS (7)
    # --------------------------------------------------------------------------
    {
        "id": "w-adv-strength",
        "title": "Advanced Hypertrophy & Power Strength",
        "level": "Advanced",
        "category": "strength",
        "focus": "Strength",
        "type": "Heavy Strength & Hypertrophy",
        "durationMinutes": 40,
        "difficulty": "Advanced",
        "intensity": "High",
        "targetArea": "Full Body (Quads, Glutes, Back, Chest)",
        "caloriesEst": 290,
        "equipment": "Moderate-Heavy Dumbbells & Mat",
        "description": "Demanding resistance session utilizing progressive overload, strict tempo, and compound lifts to build dense functional power.",
        "warmup": "6 minutes — World's greatest stretch, bodyweight squats, plank shoulder taps, arm swings.",
        "cooldown": "5 minutes — Deep pigeon stretch, seated forward fold, diaphragmatic box breathing.",
        "exercises": [
            ALL_EXERCISES["goblet_squat"],
            ALL_EXERCISES["db_rdl"],
            ALL_EXERCISES["renegade_row"],
            ALL_EXERCISES["bulgarian_split_squat"],
            ALL_EXERCISES["diamond_pushup"]
        ],
        "instructions": [
            "Heavy Dumbbell Goblet Squats — 4 sets of 8-10 reps with 3-second descent.",
            "Dumbbell Romanian Deadlifts — 4 sets of 10 reps with heavy hinge tension.",
            "Plank Renegade Rows with Push-Up — 3 sets of 8 reps per side.",
            "Weighted Bulgarian Split Squats — 3 sets of 8 reps per leg.",
            "Diamond Tricep Push-Ups — 3 sets of 8-10 reps to fatigue."
        ]
    },
    {
        "id": "w-adv-fullbody",
        "title": "Advanced Total Body Athletic Conditioning",
        "level": "Advanced",
        "category": "full_body",
        "focus": "Full Body",
        "type": "Athletic Conditioning",
        "durationMinutes": 35,
        "difficulty": "Advanced",
        "intensity": "High",
        "targetArea": "Full Body Power & Stamina",
        "caloriesEst": 270,
        "equipment": "Pair of Dumbbells & Mat",
        "description": "High-intensity athletic circuit combining explosive movements and compound resistance for peak cardiovascular output.",
        "warmup": "6 minutes — High knees, skaters, inchworms, hip openers.",
        "cooldown": "5 minutes — Child's pose, gentle spinal twists, slow walking recovery.",
        "exercises": [
            ALL_EXERCISES["devils_press"],
            ALL_EXERCISES["jump_squats"],
            ALL_EXERCISES["renegade_row"],
            ALL_EXERCISES["burpee_flow"],
            ALL_EXERCISES["russian_twist"]
        ],
        "instructions": [
            "Dumbbell Devil's Press — 3 sets of 8-10 reps with explosive hip drive.",
            "Explosive Squat Jumps — 3 sets of 10 reps with soft, spring-like landings.",
            "Renegade Rows with Push-Up — 3 sets of 8 reps each arm.",
            "Athletic Burpee Flow — 3 sets of 10 reps.",
            "Weighted Russian Twists — 3 sets of 16 reps with 2-second hold at edges."
        ]
    },
    {
        "id": "w-adv-upper",
        "title": "Advanced Upper Body Definition & Power",
        "level": "Advanced",
        "category": "upper",
        "focus": "Upper Body",
        "type": "Upper Body Hypertrophy",
        "durationMinutes": 32,
        "difficulty": "Advanced",
        "intensity": "High",
        "targetArea": "Chest, Lats, Deltoids & Triceps",
        "caloriesEst": 230,
        "equipment": "Dumbbells & Mat",
        "description": "Push-pull supersets designed to sculpt upper body definition, build strict pushing strength, and develop upper back posture.",
        "warmup": "5 minutes — Arm circles, band pull-aparts, scapular push-ups.",
        "cooldown": "5 minutes — Doorway pec stretch, cross-body shoulder stretch, wrist stretches.",
        "exercises": [
            ALL_EXERCISES["renegade_row"],
            ALL_EXERCISES["diamond_pushup"],
            ALL_EXERCISES["db_row"],
            ALL_EXERCISES["tricep_dips"],
            ALL_EXERCISES["plank_taps"]
        ],
        "instructions": [
            "Plank Renegade Rows with Push-Up — 3 sets of 10 reps each side.",
            "Diamond Tricep Push-Ups — 3 sets of 10 reps with strict form.",
            "Heavy Dumbbell Bent-Over Row — 3 sets of 10 reps holding 1 second at top.",
            "Bench Tricep Dips with Straight Legs — 3 sets of 12 reps.",
            "High Plank Shoulder Taps — 3 sets of 20 alternating taps with zero hip sway."
        ]
    },
    {
        "id": "w-adv-lower",
        "title": "Advanced Lower Body Power & Single-Leg Control",
        "level": "Advanced",
        "category": "lower",
        "focus": "Lower Body",
        "type": "Lower Body Power",
        "durationMinutes": 35,
        "difficulty": "Advanced",
        "intensity": "High",
        "targetArea": "Glutes, Hamstrings, Quadriceps, Core",
        "caloriesEst": 260,
        "equipment": "Dumbbells & Bench / Step",
        "description": "Challenging single-leg unilateral work and explosive power to bulletproof knees, maximize glute activation, and enhance athletic agility.",
        "warmup": "6 minutes — Leg swings, lateral lunges, glute bridges, ankle rolls.",
        "cooldown": "5 minutes — Couch stretch for hip flexors, pigeon pose, hamstring fold.",
        "exercises": [
            ALL_EXERCISES["bulgarian_split_squat"],
            ALL_EXERCISES["db_rdl"],
            ALL_EXERCISES["jump_squats"],
            ALL_EXERCISES["cossack_squat"],
            ALL_EXERCISES["glute_bridge"]
        ],
        "instructions": [
            "Weighted Bulgarian Split Squats — 3 sets of 10 reps per leg with dumbbells.",
            "Heavy Dumbbell Romanian Deadlift — 3 sets of 10 reps with slow 3-second lowering.",
            "Explosive Squat Jumps — 3 sets of 10 reps for vertical power.",
            "Deep Cossack Squats — 3 sets of 8 reps per side with full range of motion.",
            "Single-Leg Glute Bridge — 3 sets of 12 reps per leg."
        ]
    },
    {
        "id": "w-adv-core",
        "title": "Advanced Core Shred & Rotational Power",
        "level": "Advanced",
        "category": "core",
        "focus": "Core",
        "type": "Advanced Core & Anti-Rotation",
        "durationMinutes": 25,
        "difficulty": "Advanced",
        "intensity": "Moderate-High",
        "targetArea": "Obliques, Rectus Abdominis, Deep Transverse",
        "caloriesEst": 160,
        "equipment": "Mat & 1 Dumbbell",
        "description": "High-tension anti-extension, rotational power, and isometric holds to forge bulletproof midline stability and sculpted obliques.",
        "warmup": "4 minutes — Cat-cow waves and quadruped thoracic rotations.",
        "cooldown": "4 minutes — Sphinx pose, gentle seal stretch, child's pose.",
        "exercises": [
            ALL_EXERCISES["hollow_hold"],
            ALL_EXERCISES["russian_twist"],
            ALL_EXERCISES["plank_taps"],
            ALL_EXERCISES["side_plank"],
            ALL_EXERCISES["mountain_climbers"]
        ],
        "instructions": [
            "Gymnastic Hollow Body Hold — 3 sets of 30 seconds with lower back glued to floor.",
            "Weighted Russian Twists — 3 sets of 16 controlled reps with dumbbell.",
            "High Plank Shoulder Taps — 3 sets of 20 alternating taps without hip sway.",
            "Forearm Side Plank with Top Leg Lift — 3 sets of 25 seconds per side.",
            "Cross-Body Mountain Climbers — 3 sets of 30 seconds for dynamic core drive."
        ]
    },
    {
        "id": "w-adv-cardio",
        "title": "Advanced High-Intensity Interval Training (HIIT)",
        "level": "Advanced",
        "category": "cardio",
        "focus": "Cardio",
        "type": "High-Intensity Conditioning",
        "durationMinutes": 28,
        "difficulty": "Advanced",
        "intensity": "Very High",
        "targetArea": "Cardiovascular Capacity & Caloric Burn",
        "caloriesEst": 260,
        "equipment": "No equipment needed",
        "description": "Short bursts of maximum anaerobic effort followed by brief recovery intervals to push VO2 max and stimulate metabolic afterburn.",
        "warmup": "5 minutes — Jog in place, dynamic leg swings, arm circles, air squats.",
        "cooldown": "5 minutes — Slow walking, chest opening stretches, forward fold with deep inhales.",
        "exercises": [
            ALL_EXERCISES["burpee_flow"],
            ALL_EXERCISES["jump_squats"],
            ALL_EXERCISES["skaters"],
            ALL_EXERCISES["high_knees"],
            ALL_EXERCISES["mountain_climbers"]
        ],
        "instructions": [
            "Athletic Burpee Flow — 40 seconds work, 20 seconds rest (3 rounds).",
            "Explosive Squat Jumps — 30 seconds work, 30 seconds rest (3 rounds).",
            "Lateral Speed Skaters — 40 seconds work, 20 seconds rest (3 rounds).",
            "Sprinting High Knees — 30 seconds work, 30 seconds rest (3 rounds).",
            "Fast Mountain Climbers — 30 seconds work, 30 seconds rest (3 rounds)."
        ]
    },
    {
        "id": "w-adv-mobility",
        "title": "Advanced Animal Flow & Movement Transitions",
        "level": "Advanced",
        "category": "mobility",
        "focus": "Mobility",
        "type": "Ground-Based Movement",
        "durationMinutes": 30,
        "difficulty": "Advanced",
        "intensity": "Moderate-High",
        "targetArea": "Full Body (Wrist, Shoulder, Hip, Ankle Mobility)",
        "caloriesEst": 140,
        "equipment": "Yoga Mat",
        "description": "Ground-based fluid movement transitions integrating animal flow patterns, dynamic spinal waves, and deep multi-planar hip mobility.",
        "warmup": "5 minutes — Wrist prep, downward dog to cobra, deep squat pry.",
        "cooldown": "5 minutes — Reclined butterfly pose, child's pose, diaphragmatic relaxation.",
        "exercises": [
            ALL_EXERCISES["animal_flow_crab"],
            ALL_EXERCISES["cossack_squat"],
            ALL_EXERCISES["cat_cow"],
            ALL_EXERCISES["bird_dog"]
        ],
        "instructions": [
            "Beast to Crab Reach Flow — 3 sets of 6 smooth repetitions per side.",
            "Deep Cossack Squats to Overhead Reach — 3 sets of 8 reps per side.",
            "Thoracic Cat-Cow Waves with Lateral Rib Circles — 12 slow cycles.",
            "Quadruped Bird Dog with 5-Second Iso-Hold — 3 sets of 6 reps per side."
        ]
    }
]

print("Total workouts compiled:", len(WORKOUTS))
