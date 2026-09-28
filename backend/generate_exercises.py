"""
Full generator for Workouts & Nutrition datasets in Life Haven.
"""
import json

# Load base exercises
from backend.build_full_libraries import EXERCISES

# Additional exercises to round out every routine
EXERCISES.update({
    "pushup_knees": {
        "id": "ex-pushup-knees",
        "name": "Kneeling Push-Up",
        "targetArea": "Upper Body (Chest, Triceps, Shoulders)",
        "difficulty": "Beginner",
        "equipment": "Mat",
        "sets": 3,
        "reps": "8-10 reps",
        "rest": "45 sec",
        "instructions": [
            "Start on hands and knees with hands slightly wider than shoulder-width.",
            "Walk knees back until your body forms a straight diagonal line from knees to head.",
            "Lower chest toward floor by bending elbows to 45 degrees.",
            "Press firmly through palms to return to starting position."
        ],
        "properForm": "Do not let hips sag or stick hips up in the air; keep core tight.",
        "commonMistakes": ["Piking hips backward", "Flaring elbows to 90 degrees", "Dropping head"],
        "modification": "Perform with hands elevated on a couch or sturdy counter.",
        "progression": "Full standard floor push-up on toes.",
        "visualKey": "pushup"
    },
    "high_knees": {
        "id": "ex-high-knees",
        "name": "Rhythmic High Knees",
        "targetArea": "Cardiovascular, Hip Flexors, Calves",
        "difficulty": "Intermediate",
        "equipment": "No equipment",
        "sets": 3,
        "reps": "30 sec",
        "rest": "30 sec",
        "instructions": [
            "Stand tall with feet hip-width apart.",
            "Quickly drive right knee up toward chest while pumping left arm.",
            "Immediately alternate to left knee and right arm in a running cadence.",
            "Stay light on the balls of your feet."
        ],
        "properForm": "Keep torso upright; avoid leaning backward as knees rise.",
        "commonMistakes": ["Leaning backwards", "Stamping feet down heavily", "Hunching shoulders"],
        "modification": "Perform a brisk high march without the bounce.",
        "progression": "Increase cadence and drive knees above waist height.",
        "visualKey": "march"
    },
    "plank_taps": {
        "id": "ex-plank-taps",
        "name": "High Plank Shoulder Taps",
        "targetArea": "Core (Anti-Rotation, Deltoids, Serratus)",
        "difficulty": "Intermediate",
        "equipment": "Mat",
        "sets": 3,
        "reps": "16 reps (8 per side)",
        "rest": "45 sec",
        "instructions": [
            "Assume a high push-up plank with hands under shoulders, feet wide for balance.",
            "Keeping hips steady and parallel to floor, lift right hand to tap left shoulder.",
            "Place right hand down and lift left hand to tap right shoulder.",
            "Maintain steady breathing throughout."
        ],
        "properForm": "Resist the urge to sway your hips from side to side; keep pelvis locked.",
        "commonMistakes": ["Swiveling hips side to side", "Hands placed too far forward", "Sagging lower back"],
        "modification": "Perform from knees or on an elevated counter.",
        "progression": "Narrow foot stance or hold tap for 2 seconds.",
        "visualKey": "plank"
    },
    "mountain_climbers": {
        "id": "ex-mountain-climbers",
        "name": "Mountain Climbers",
        "targetArea": "Cardiovascular & Core (Transverse Abdominis, Hip Flexors)",
        "difficulty": "Intermediate",
        "equipment": "Mat",
        "sets": 3,
        "reps": "30 sec",
        "rest": "30 sec",
        "instructions": [
            "Start in a high plank position, hands under shoulders, body in straight line.",
            "Drive right knee forward toward chest without letting hips pike.",
            "Quickly switch legs, extending right leg back while driving left knee forward.",
            "Maintain a steady, rhythmic piston motion."
        ],
        "properForm": "Keep shoulders stacked directly over wrists; don't drift backward.",
        "commonMistakes": ["Piking hips high in air", "Bouncing hips up and down", "Shoulders drifting behind wrists"],
        "modification": "Perform slowly one knee at a time without jumping.",
        "progression": "Drive knees cross-body toward opposite elbow (Cross-Body Climbers).",
        "visualKey": "climber"
    },
    "side_plank": {
        "id": "ex-side-plank",
        "name": "Forearm Side Plank",
        "targetArea": "Core & Obliques (Quadratus Lumborum, Gluteus Medius)",
        "difficulty": "Intermediate",
        "equipment": "Mat",
        "sets": 3,
        "reps": "25-30 sec per side",
        "rest": "30 sec",
        "instructions": [
            "Lie on your right side with right elbow under right shoulder, forearm pointing forward.",
            "Stack feet and lift hips off the floor until body forms a straight diagonal line.",
            "Reach left arm toward ceiling or rest on top hip.",
            "Hold steady without letting bottom hip drop.",
            "Lower with control and repeat on opposite side."
        ],
        "properForm": "Press actively through bottom elbow to prevent collapsing into shoulder joint.",
        "commonMistakes": ["Hips sagging toward floor", "Top hip rolling forward or backward", "Neck straining"],
        "modification": "Bend bottom knee at 90 degrees on floor for knee-assisted side plank.",
        "progression": "Lift top leg into a side plank star.",
        "visualKey": "side_plank"
    },
    "tricep_dips": {
        "id": "ex-tricep-dips",
        "name": "Chair / Bench Tricep Dips",
        "targetArea": "Upper Body (Triceps, Anterior Deltoids, Pectorals)",
        "difficulty": "Intermediate",
        "equipment": "Sturdy Chair or Bench",
        "sets": 3,
        "reps": "10-12 reps",
        "rest": "45 sec",
        "instructions": [
            "Sit on the edge of a sturdy chair with palms gripping the edge beside hips.",
            "Slide hips off the chair with knees bent at 90 degrees, feet flat on floor.",
            "Bend elbows straight back to lower hips until upper arms are nearly parallel to floor.",
            "Press through palms to straighten arms and return to top."
        ],
        "properForm": "Keep your back skimming close to the chair edge; don't drift forward.",
        "commonMistakes": ["Drifting body far from chair (strains shoulders)", "Shrugging shoulders into neck", "Flaring elbows wide"],
        "modification": "Keep feet closer to chair with knees bent 90 degrees.",
        "progression": "Extend legs straight out with heels resting on floor.",
        "visualKey": "dip"
    },
    "devils_press": {
        "id": "ex-devils-press",
        "name": "Dumbbell Devil's Press",
        "targetArea": "Full Body Conditioning & Power (Posterior Chain, Chest, Shoulders)",
        "difficulty": "Advanced",
        "equipment": "Pair of Dumbbells",
        "sets": 3,
        "reps": "8-10 reps",
        "rest": "75 sec",
        "instructions": [
            "Stand holding dumbbells, drop down placing dumbbells on floor and jump feet back into plank.",
            "Lower chest to floor between dumbbells in a full burpee.",
            "Press up, jump feet forward outside dumbbells into a wide hip hinge.",
            "Swing dumbbells smoothly between legs and snatch/swing them in one explosive arc overhead.",
            "Lower dumbbells with control to chest then floor and repeat."
        ],
        "properForm": "Use the explosive hip snap (like a kettlebell swing) to send dumbbells overhead, not an arm curl.",
        "commonMistakes": ["Rounding lower back on swing", "Muscling weight with arms instead of hips", "Crashing down uncontrolled"],
        "modification": "Use single dumbbell with two hands or perform clean-and-press.",
        "progression": "Increase dumbbell weight or decrease rest intervals.",
        "visualKey": "burpee"
    },
    "jump_squats": {
        "id": "ex-jump-squats",
        "name": "Explosive Squat Jumps",
        "targetArea": "Lower Body Power & Plyometrics (Quads, Glutes, Calves)",
        "difficulty": "Advanced",
        "equipment": "Mat",
        "sets": 3,
        "reps": "10-12 reps",
        "rest": "60 sec",
        "instructions": [
            "Stand with feet shoulder-width apart, arms by sides.",
            "Lower into a parallel squat, swinging arms back.",
            "Explode upward through toes, extending hips and swinging arms overhead.",
            "Land softly toe-to-heel, immediately sinking into the next squat to absorb impact."
        ],
        "properForm": "Quiet landings are mandatory; land softly like a spring.",
        "commonMistakes": ["Landing stiff-legged", "Knees caving inward upon landing", "Loud, slapping foot strikes"],
        "modification": "Fast Bodyweight Air Squats with explosive calf raise at top (no flight).",
        "progression": "Tuck Jumps or continuous rhythmic tempo.",
        "visualKey": "squat"
    },
    "diamond_pushup": {
        "id": "ex-diamond-pushup",
        "name": "Diamond Tricep Push-Up",
        "targetArea": "Upper Body (Triceps, Inner Chest, Shoulders)",
        "difficulty": "Advanced",
        "equipment": "Mat",
        "sets": 3,
        "reps": "8-10 reps",
        "rest": "60 sec",
        "instructions": [
            "Start in high plank with index fingers and thumbs touching directly under chest to form a diamond shape.",
            "Maintain straight body line from heels to head.",
            "Lower chest toward diamond shape by bending elbows backward along ribcage.",
            "Press firmly through palms to lockout."
        ],
        "properForm": "Keep core tight to prevent hips from drooping.",
        "commonMistakes": ["Flaring elbows wide", "Sagging lower back", "Placing hands too far in front of shoulders"],
        "modification": "Perform from knees or on an incline bench.",
        "progression": "Elevate feet on a low step for deficit diamond push-ups.",
        "visualKey": "pushup"
    },
    "hollow_hold": {
        "id": "ex-hollow-hold",
        "name": "Gymnastic Hollow Body Hold",
        "targetArea": "Core (Rectus Abdominis, Deep Transverse, Hip Flexors)",
        "difficulty": "Advanced",
        "equipment": "Mat",
        "sets": 3,
        "reps": "25-35 sec hold",
        "rest": "45 sec",
        "instructions": [
            "Lie flat on back with legs together and arms extended overhead.",
            "Tilt pelvis so lower back is pressed completely into floor with zero daylight.",
            "Lift shoulder blades and feet 4-6 inches off the floor, creating a shallow banana curve.",
            "Gaze toward toes and hold full-body isometric tension."
        ],
        "properForm": "If lower back arches off floor, you have exceeded your current capacity; tuck knees slightly.",
        "commonMistakes": ["Lower back popping off floor", "Holding breath", "Straining neck"],
        "modification": "Hollow Tuck: bend knees to 90 degrees with hands reaching toward heels.",
        "progression": "Add slow hollow body rocks forward and backward.",
        "visualKey": "dead_bug"
    },
    "animal_flow_crab": {
        "id": "ex-crab-reach",
        "name": "Beast to Crab Reach Flow",
        "targetArea": "Mobility & Full Body (Thoracic Spine, Shoulders, Glute Extension)",
        "difficulty": "Advanced",
        "equipment": "Mat",
        "sets": 3,
        "reps": "6 reps per side",
        "rest": "45 sec",
        "instructions": [
            "Start in crab pose (sitting with hands behind hips, knees bent, feet flat).",
            "Drive through heels and right palm to lift hips toward ceiling in bridge.",
            "Reach left hand across body in a smooth arch over head, gazing at floor.",
            "Lower hips back to start, then alternate to opposite side."
        ],
        "properForm": "Press actively out of the supporting shoulder so you don't collapse into the joint.",
        "commonMistakes": ["Collapsing into base shoulder", "Not extending hips fully", "Rushing through the reach"],
        "modification": "Standard tabletop reverse bridge with both hands on floor.",
        "progression": "Dynamic transition from Quadruped Beast into Crab Reach.",
        "visualKey": "mobility"
    }
})

print("Total exercises compiled:", len(EXERCISES))
