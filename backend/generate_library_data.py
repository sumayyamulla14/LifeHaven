"""
COMPLETE WORKOUTS & NUTRITION LIBRARY GENERATOR
Builds comprehensive, realistic datasets for Life Haven:
- 23 complete workouts across Beginner, Intermediate, Advanced (Strength, Cardio, Full Body, Upper, Lower, Core, Mobility, Flexibility)
- Every exercise with tutorial (steps, proper form, common mistakes, modifications, progressions)
- 30+ whole foods across Fruits, Vegetables, Protein, Iron, Calcium, Fiber, Healthy Fats
- 20 balanced meals (Breakfast, Lunch, Dinner, Snacks, Quick Meals)
- Balanced Plate Blueprint & Women's Health Nutrition education
- Updates both backend/store.py and js/mockData.js
"""

import json
import re

# ==============================================================================
# 1. EXERCISE TUTORIALS REPOSITORY
# ==============================================================================
EXERCISES = {
    # Lower Body
    "squat_bw": {
        "id": "ex-squat-bw",
        "name": "Bodyweight Squat",
        "targetArea": "Lower Body (Quadriceps, Glutes, Hamstrings)",
        "difficulty": "Beginner",
        "equipment": "Bodyweight",
        "sets": 3,
        "reps": "10-12 reps",
        "rest": "45 sec",
        "instructions": [
            "Stand with feet shoulder-width apart, toes pointing slightly outward (about 15 degrees).",
            "Keep your chest comfortably upright, eyes forward, and brace your core.",
            "Inhale as you bend your hips and knees simultaneously, lowering your hips as if sitting into an invisible chair.",
            "Lower until your thighs are parallel to the floor, ensuring your knees track in line with your second toe.",
            "Exhale and press firmly through your mid-foot and heels to drive back to standing."
        ],
        "properForm": "Keep heels planted flat on the floor throughout. Maintain an upright chest and neutral spine.",
        "commonMistakes": [
            "Knees caving inward (valgus collapse)",
            "Rounding the lower back or collapsing torso forward",
            "Rising onto the balls of the feet instead of staying balanced on heels",
            "Dropping too quickly without control"
        ],
        "modification": "Chair Squat: Place a sturdy chair behind you and tap your glutes lightly onto the seat before rising.",
        "progression": "Pause Squats: Hold at the bottom for 2 seconds, or hold a light dumbbell at your chest (Goblet Squat).",
        "visualKey": "squat"
    },
    "glute_bridge": {
        "id": "ex-glute-bridge",
        "name": "Glute Bridge",
        "targetArea": "Posterior Chain (Gluteus Maximus, Hamstrings, Core)",
        "difficulty": "Beginner",
        "equipment": "Mat",
        "sets": 3,
        "reps": "12-15 reps",
        "rest": "45 sec",
        "instructions": [
            "Lie on your back with knees bent and feet flat on the floor, hip-width apart.",
            "Place arms along your sides with palms flat on the mat.",
            "Gently tilt your pelvis to flatten your lower back against the mat.",
            "Drive through your heels to lift your hips until your knees, hips, and shoulders form a diagonal line.",
            "Squeeze your glutes firmly at the top for 2 seconds, then slowly lower back down."
        ],
        "properForm": "Avoid over-arching the lower back at the top; the extension must come purely from the glutes.",
        "commonMistakes": [
            "Arching lower back excessively rather than squeezing glutes",
            "Pushing through the toes instead of the heels",
            "Letting knees splay outward or knock inward"
        ],
        "modification": "Shorten range of motion or rest a light pillow under the lower back.",
        "progression": "Single-Leg Glute Bridge or place a mini-loop resistance band above knees.",
        "visualKey": "bridge"
    },
    "assisted_lunge": {
        "id": "ex-assisted-lunge",
        "name": "Supported Reverse Lunge",
        "targetArea": "Lower Body (Quadriceps, Glutes, Hamstrings, Balance)",
        "difficulty": "Beginner",
        "equipment": "Wall or Sturdy Chair for Support",
        "sets": 3,
        "reps": "8-10 reps per leg",
        "rest": "45 sec",
        "instructions": [
            "Stand tall holding the back of a sturdy chair or resting one hand against a wall for balance.",
            "Step your left foot straight back about 2 to 3 feet.",
            "Lower your hips straight down until both knees are bent at roughly 90 degrees.",
            "Ensure your front knee stays directly above your ankle and your back knee hovers just above the mat.",
            "Press firmly through your front heel to step back to standing, then repeat."
        ],
        "properForm": "Keep your torso tall and vertical; avoid leaning excessively over the front thigh.",
        "commonMistakes": [
            "Front knee driving far past the toes",
            "Stepping feet on a tightrope (keep them hip-width apart for stability)",
            "Dropping the back knee forcefully onto the floor"
        ],
        "modification": "Reduce the depth of the lunge into a shallow split stance.",
        "progression": "Remove hand support for a free-standing reverse lunge, or hold light dumbbells.",
        "visualKey": "lunge"
    },
    "calf_raises": {
        "id": "ex-calf-raises",
        "name": "Standing Calf Raises",
        "targetArea": "Lower Body (Gastrocnemius, Soleus, Ankle Stability)",
        "difficulty": "Beginner",
        "equipment": "Wall for Light Touch",
        "sets": 3,
        "reps": "15 reps",
        "rest": "30 sec",
        "instructions": [
            "Stand with feet hip-width apart, hands lightly touching a wall or countertop for balance.",
            "Slowly rise up onto the balls of both feet as high as comfortable.",
            "Hold at the top peak contraction for 1 full second, engaging the calf muscles.",
            "Lower your heels smoothly back down to the floor over 2 seconds."
        ],
        "properForm": "Keep ankles aligned; avoid letting your ankles roll outward onto the pinky toes.",
        "commonMistakes": [
            "Bouncing quickly without eccentric control",
            "Ankles rolling outward at the peak",
            "Leaning forward onto the wall"
        ],
        "modification": "Perform seated with feet flat on the floor pressing knees down lightly.",
        "progression": "Single-leg calf raises on the edge of a step for an increased stretch.",
        "visualKey": "calf"
    },
    "clamshells": {
        "id": "ex-clamshells",
        "name": "Side-Lying Clamshells",
        "targetArea": "Hip & Glutes (Gluteus Medius, Pelvic Stabilizers)",
        "difficulty": "Beginner",
        "equipment": "Mat",
        "sets": 3,
        "reps": "12-15 reps per side",
        "rest": "30 sec",
        "instructions": [
            "Lie on your right side with head supported by your right arm.",
            "Stack your hips, knees, and ankles at a 45-degree bend.",
            "Keeping your feet glued together, slowly raise your top (left) knee as high as possible without rolling your hips backward.",
            "Hold at the top for 1 second feeling the side glute engage.",
            "Slowly close the knee and repeat before switching sides."
        ],
        "properForm": "Place your top hand on your hip bone to verify it stays stacked perpendicular to the floor.",
        "commonMistakes": [
            "Rolling the top hip backward to cheat the range of motion",
            "Separating the feet",
            "Rushing through the movement"
        ],
        "modification": "Keep range of motion smaller (45 degrees of opening).",
        "progression": "Add a light mini-band around your thighs just above the knees.",
        "visualKey": "clamshell"
    },

    # Upper Body
    "wall_pushup": {
        "id": "ex-wall-pushup",
        "name": "Wall / Incline Push-Up",
        "targetArea": "Upper Body (Pectorals, Anterior Deltoids, Triceps, Core)",
        "difficulty": "Beginner",
        "equipment": "Wall or Kitchen Countertop",
        "sets": 3,
        "reps": "8-10 reps",
        "rest": "45 sec",
        "instructions": [
            "Stand an arm's length away from a solid wall or sturdy countertop.",
            "Place your palms flat against the surface at shoulder height, slightly wider than shoulder-width.",
            "Brace your core and glutes so your body forms a straight line from heels to head.",
            "Bend your elbows to lower your chest toward the surface in a smooth 2-second count.",
            "Keep elbows angled back at roughly 45 degrees (arrow shape, not T-shape).",
            "Press firmly through your palms to return to the starting position."
        ],
        "properForm": "Keep your neck relaxed and spine rigid; avoid letting your belly or lower back sag.",
        "commonMistakes": [
            "Flaring elbows wide out to the sides at 90 degrees",
            "Arching lower back and sagging belly forward",
            "Shrugging shoulders into the ears"
        ],
        "modification": "Step feet closer to the wall to decrease the angle and reduce resistance.",
        "progression": "Lower your hands to a sturdy countertop, bench, or move to knee push-ups on the mat.",
        "visualKey": "pushup"
    },
    "wall_angels": {
        "id": "ex-wall-angels",
        "name": "Wall Angels for Posture Alignment",
        "targetArea": "Upper Back & Shoulders (Rhomboids, Mid/Lower Trapezius, Thoracic Spine)",
        "difficulty": "Beginner",
        "equipment": "Flat Wall",
        "sets": 3,
        "reps": "10-12 smooth reps",
        "rest": "30 sec",
        "instructions": [
            "Stand with your back flat against a wall, heels 3-4 inches away from baseboard.",
            "Press your tailbone, upper back, and back of your head gently against the wall.",
            "Bring your arms into a goalpost position (elbows bent 90 degrees, backs of hands against wall).",
            "Slowly slide your arms overhead along the wall as high as you can without arching your back.",
            "Slowly slide elbows back down to your sides, squeezing shoulder blades together."
        ],
        "properForm": "Maintain ribcage engagement so your lower back does not bow away from the wall.",
        "commonMistakes": [
            "Arching lower back off the wall as arms reach up",
            "Elbows or wrists pulling away from the wall",
            "Holding breath during arm slide"
        ],
        "modification": "Perform lying on the floor in supine position with knees bent.",
        "progression": "Add a 2-second squeeze at the bottom contraction.",
        "visualKey": "posture"
    },
    "band_pull_apart": {
        "id": "ex-band-pull",
        "name": "Resistance Band Pull-Apart",
        "targetArea": "Upper Back & Shoulders (Rear Deltoids, Rhomboids, Posture)",
        "difficulty": "Beginner",
        "equipment": "Light Resistance Band",
        "sets": 3,
        "reps": "12-15 reps",
        "rest": "30 sec",
        "instructions": [
            "Stand tall holding a light resistance band in both hands at shoulder height, arms extended forward.",
            "Keep a slight micro-bend in elbows and hands shoulder-width apart.",
            "Exhale as you pull the band apart by squeezing your shoulder blades together.",
            "Bring the band horizontally across until it lightly touches your mid-chest.",
            "Slowly control the band back to the starting width over 2 seconds."
        ],
        "properForm": "Drive the movement entirely from your upper back muscles, not by flaring ribs.",
        "commonMistakes": [
            "Shrugging shoulders up toward ears",
            "Bending elbows excessively to jerk the band",
            "Letting the band snap back without resistance control"
        ],
        "modification": "Widen your grip on the band to reduce tension, or use bodyweight arm reaches.",
        "progression": "Narrow your hand grip or pause for 2 seconds at full contraction.",
        "visualKey": "pull_apart"
    },
    "db_floor_press": {
        "id": "ex-db-floor-press",
        "name": "Dumbbell Floor Chest Press",
        "targetArea": "Upper Body (Pectorals, Anterior Delts, Triceps)",
        "difficulty": "Beginner",
        "equipment": "Pair of Light Dumbbells & Mat",
        "sets": 3,
        "reps": "10-12 reps",
        "rest": "45 sec",
        "instructions": [
            "Lie on your back on the mat with knees bent and feet flat on the floor.",
            "Hold a dumbbell in each hand at chest level, elbows resting on the floor at a 45-degree angle to torso.",
            "Exhale as you press both dumbbells straight up toward the ceiling until arms are extended.",
            "Inhale and lower with control until the backs of your triceps gently tap the floor.",
            "Pause for half a second before pressing up again."
        ],
        "properForm": "The floor safely prevents hyperextension of the shoulder joint. Keep wrists stacked straight over elbows.",
        "commonMistakes": [
            "Bouncing elbows hard off the floor",
            "Flaring elbows straight out at 90 degrees",
            "Arching lower back off the mat"
        ],
        "modification": "Use water bottles or press one arm at a time.",
        "progression": "Perform on an elevated bench or increase dumbbell weight.",
        "visualKey": "press"
    },

    # Core & Spine
    "pelvic_tilts": {
        "id": "ex-pelvic-tilts",
        "name": "Pelvic Tilts with Diaphragmatic Breath",
        "targetArea": "Deep Core (Transverse Abdominis, Pelvic Floor, Lumbar Spine)",
        "difficulty": "Beginner",
        "equipment": "Mat",
        "sets": 3,
        "reps": "10-12 repetitions",
        "rest": "30 sec",
        "instructions": [
            "Lie on your back with knees bent, feet flat on the floor, and arms resting at your sides.",
            "Inhale through your nose, expanding your lower belly and ribcage 360 degrees.",
            "As you slowly exhale through your mouth, gently contract your deep lower abdominals and tilt your pelvis backward.",
            "Feel your lower back gently flatten against the floor.",
            "Inhale to release back to a neutral spine position."
        ],
        "properForm": "Movement should be subtle, smooth, and driven by deep abdominal engagement rather than squeezing glutes.",
        "commonMistakes": [
            "Pushing with heels instead of using deep core",
            "Gripping the neck and shoulders tightly",
            "Holding breath during the tilt"
        ],
        "modification": "Place a hand on lower belly to feel abdominal muscles activate.",
        "progression": "Add a gentle 3-second hold at the flat-back position before releasing.",
        "visualKey": "pelvic_tilt"
    },
    "dead_bug_beginner": {
        "id": "ex-dead-bug-beg",
        "name": "Dead Bug Heel Taps",
        "targetArea": "Core (Transverse Abdominis, Anti-Extension Stability)",
        "difficulty": "Beginner",
        "equipment": "Mat",
        "sets": 3,
        "reps": "10 reps alternating",
        "rest": "30 sec",
        "instructions": [
            "Lie on your back with knees bent at 90 degrees over hips and arms reaching up toward ceiling.",
            "Press your lower back firmly into the floor so there is zero gap.",
            "Keeping your right knee bent, slowly lower your right heel down to tap the floor.",
            "Bring right leg back up, then tap left heel down.",
            "Arms remain steady pointing up to ceiling throughout."
        ],
        "properForm": "The lower back must remain pinned to the floor 100% of the time. If it arches, decrease the reach.",
        "commonMistakes": [
            "Allowing lower back to arch off the floor",
            "Moving too quickly",
            "Bending the knee too much during the tap"
        ],
        "modification": "Keep feet on the floor and lift one knee up at a time instead.",
        "progression": "Full Dead Bug: extend the opposite arm overhead as the leg reaches forward.",
        "visualKey": "dead_bug"
    },
    "bird_dog": {
        "id": "ex-bird-dog",
        "name": "Quadruped Bird Dog",
        "targetArea": "Core & Back (Transverse Abdominis, Multifidus, Glutes)",
        "difficulty": "Beginner",
        "equipment": "Mat",
        "sets": 3,
        "reps": "8-10 reps per side",
        "rest": "30 sec",
        "instructions": [
            "Start on hands and knees with wrists under shoulders and knees under hips.",
            "Gaze down at the floor to keep neck neutral.",
            "Simultaneously reach your right arm straight forward and left leg straight backward.",
            "Hold for 2 seconds at hip and shoulder height without tilting your pelvis.",
            "Return to all fours with control and switch sides."
        ],
        "properForm": "Imagine balancing a glass of water on your lower back; your hips must remain level and square.",
        "commonMistakes": [
            "Rotating the pelvis open to lift leg too high",
            "Sagging the belly toward the floor",
            "Looking up and hyperextending the neck"
        ],
        "modification": "Perform the arm reach alone, then the leg reach alone, before combining them.",
        "progression": "Hold for 4 seconds at peak extension and tap elbow to opposite knee under torso between reps.",
        "visualKey": "bird_dog"
    },

    # Cardio & Mobility
    "march_in_place": {
        "id": "ex-march",
        "name": "Standing March in Place",
        "targetArea": "Cardiovascular, Hip Flexors, Calves, Balance",
        "difficulty": "Beginner",
        "equipment": "No equipment",
        "sets": 3,
        "reps": "30-40 sec",
        "rest": "30 sec",
        "instructions": [
            "Stand tall with feet hip-width apart and posture elongated.",
            "Lift your right knee toward hip level while swinging your left arm forward.",
            "Lower right foot softly and immediately lift left knee, swinging right arm.",
            "Maintain a steady, rhythmic breathing pattern."
        ],
        "properForm": "Keep core braced and chest tall so torso does not lean backward as knees lift.",
        "commonMistakes": [
            "Leaning backwards as knees lift",
            "Stamping feet down heavily on the floor",
            "Holding breath"
        ],
        "modification": "Hold a chair with one hand for balance support.",
        "progression": "Add overhead reach or increase speed into a gentle jog.",
        "visualKey": "march"
    },
    "step_jack": {
        "id": "ex-step-jack",
        "name": "Low-Impact Step Jack",
        "targetArea": "Cardiovascular (Aerobic Heart Rate, Shoulders, Calves)",
        "difficulty": "Beginner",
        "equipment": "No equipment",
        "sets": 3,
        "reps": "40 sec",
        "rest": "20 sec",
        "instructions": [
            "Stand with feet together and arms relaxed by your sides.",
            "Step right foot out to the side while sweeping both arms overhead.",
            "Step right foot back to center while lowering arms.",
            "Step left foot out to the side while sweeping arms overhead.",
            "Continue in a rhythmic, continuous flow."
        ],
        "properForm": "Land softly on the balls of your feet with a soft micro-bend in knees to absorb impact.",
        "commonMistakes": [
            "Stiff-legged landing",
            "Shortening the arm range of motion",
            "Shrugging shoulders"
        ],
        "modification": "Raise arms only to shoulder height.",
        "progression": "Increase cadence or perform standard jumping jacks.",
        "visualKey": "jack"
    },
    "cat_cow": {
        "id": "ex-cat-cow",
        "name": "Cat-Cow Spinal Waves",
        "targetArea": "Mobility (Thoracic & Lumbar Spine, Neck)",
        "difficulty": "Beginner",
        "equipment": "Mat",
        "sets": 2,
        "reps": "10 smooth cycles",
        "rest": "20 sec",
        "instructions": [
            "Start on hands and knees with wrists under shoulders, knees under hips.",
            "Inhale as you tilt your pelvis forward, dip belly, and gently open chest forward (Cow).",
            "Exhale as you press through palms, round spine up, and tuck chin and tailbone (Cat).",
            "Flow between the two postures smoothly, matching your breath."
        ],
        "properForm": "Let the movement ripple through the entire spine, initiating from the tailbone.",
        "commonMistakes": [
            "Cranking neck excessively in Cow",
            "Locking elbows rigidly",
            "Rushing without breath coordination"
        ],
        "modification": "Perform seated in a chair resting hands on thighs.",
        "progression": "Add gentle lateral rib circles between transitions.",
        "visualKey": "cat_cow"
    },
    "child_pose": {
        "id": "ex-child-pose",
        "name": "Child's Pose with Lateral Reach",
        "targetArea": "Flexibility (Lats, Ribcage, Hips, Lower Back)",
        "difficulty": "Beginner",
        "equipment": "Mat",
        "sets": 2,
        "reps": "45 sec per side",
        "rest": "20 sec",
        "instructions": [
            "Kneel on the mat with big toes touching and knees opened wide.",
            "Sink hips back toward heels and walk hands forward, resting forehead on the mat.",
            "Walk both hands 45 degrees to the right, feeling a stretch through the left ribcage.",
            "Breathe deeply for 45 seconds, then walk hands to the opposite side."
        ],
        "properForm": "Keep hips pinned toward your heels as hands walk forward to decompress the spine.",
        "commonMistakes": [
            "Hips lifting high off heels",
            "Tensing shoulders into ears",
            "Shallow breathing"
        ],
        "modification": "Place a bolster or pillow under your chest for torso support.",
        "progression": "Thread one arm underneath the opposite armpit for thoracic rotation.",
        "visualKey": "child_pose"
    },
    "seated_hamstring": {
        "id": "ex-seated-hamstring",
        "name": "Seated Hamstring & Posterior Stretch",
        "targetArea": "Flexibility (Hamstrings, Calves, Lower Back)",
        "difficulty": "Beginner",
        "equipment": "Mat or Chair",
        "sets": 3,
        "reps": "30 sec per leg",
        "rest": "20 sec",
        "instructions": [
            "Sit tall on the edge of a chair or on your mat with right leg extended straight, heel on floor.",
            "Flex your right foot so toes point toward the ceiling.",
            "Hinge gently forward from your hips with a flat back until a comfortable stretch is felt along the back of the thigh.",
            "Breathe deeply and hold for 30 seconds before switching legs."
        ],
        "properForm": "Hinge from the hips with a long spine; do not round your upper back to reach your toes.",
        "commonMistakes": [
            "Rounding the spine and dropping chest",
            "Locking knee joint aggressively",
            "Bouncing during the stretch"
        ],
        "modification": "Perform with a slight micro-bend in the knee.",
        "progression": "Loop a towel or strap around the ball of the foot to gently assist the hinge.",
        "visualKey": "stretch"
    },

    # Intermediate / Advanced Exercises
    "goblet_squat": {
        "id": "ex-goblet-squat",
        "name": "Dumbbell Goblet Squat",
        "targetArea": "Lower Body & Core (Quadriceps, Glutes, Core Bracing)",
        "difficulty": "Intermediate",
        "equipment": "1 Dumbbell (4-12 kg)",
        "sets": 3,
        "reps": "10-12 reps",
        "rest": "60 sec",
        "instructions": [
            "Hold a dumbbell vertically against your chest with both hands cupping the upper head.",
            "Set feet slightly wider than shoulder-width, toes angled slightly out.",
            "Brace core and lower hips into a deep squat, keeping chest proud.",
            "Ensure elbows travel naturally inside knees at the bottom.",
            "Drive through mid-foot and heels to stand tall, exhaling at the top."
        ],
        "properForm": "Keep weight touching your sternum; do not let it drift forward.",
        "commonMistakes": [
            "Weight pulling chest forward into a round back",
            "Knees caving inward on ascent",
            "Rising onto toes"
        ],
        "modification": "Use a lighter dumbbell or bodyweight with hands clasped at chest.",
        "progression": "Add a 2-second isometric pause at the bottom of every rep.",
        "visualKey": "squat"
    },
    "db_rdl": {
        "id": "ex-db-rdl",
        "name": "Dumbbell Romanian Deadlift (Hip Hinge)",
        "targetArea": "Posterior Chain (Hamstrings, Glutes, Erector Spinae)",
        "difficulty": "Intermediate",
        "equipment": "Pair of Dumbbells",
        "sets": 3,
        "reps": "10 reps",
        "rest": "60 sec",
        "instructions": [
            "Stand holding dumbbells in front of thighs, palms facing you, feet hip-width apart.",
            "Set a slight micro-bend in knees that remains constant throughout.",
            "Push hips straight back as if touching a wall behind you with your glutes.",
            "Slide dumbbells closely down your shins until you feel hamstrings stretch.",
            "Squeeze glutes and drive hips forward to return to standing tall."
        ],
        "properForm": "This is a horizontal hip hinge, NOT a knee squat. Spine stays flat like a tabletop.",
        "commonMistakes": [
            "Squatting down instead of hinging hips back",
            "Rounding the spine to reach lower",
            "Dumbbells drifting away from legs"
        ],
        "modification": "Practice hip hinge with hands on hips touching glutes to a wall.",
        "progression": "Single-Leg Romanian Deadlift to challenge balance and glute stability.",
        "visualKey": "deadlift"
    },
    "db_row": {
        "id": "ex-db-row",
        "name": "Dumbbell Bent-Over Row",
        "targetArea": "Upper Body (Rhomboids, Lats, Rear Deltoids, Biceps)",
        "difficulty": "Intermediate",
        "equipment": "Pair of Dumbbells",
        "sets": 3,
        "reps": "10-12 reps",
        "rest": "60 sec",
        "instructions": [
            "Hinge forward at hips to a 45-degree angle with flat spine.",
            "Hold dumbbells with arms extended downward, palms facing each other.",
            "Pull dumbbells toward your hip bones, driving elbows back toward ceiling.",
            "Squeeze shoulder blades together firmly at the top for 1 second.",
            "Lower weights smoothly back to full extension."
        ],
        "properForm": "Maintain a steady torso without jerking upward to swing the weights.",
        "commonMistakes": [
            "Rounding upper back or neck",
            "Standing too upright",
            "Using momentum instead of back muscles"
        ],
        "modification": "Support one knee and hand on a bench to row one arm at a time.",
        "progression": "Pause for 2 seconds at peak contraction or use heavier dumbbells.",
        "visualKey": "row"
    },
    "forearm_plank": {
        "id": "ex-forearm-plank",
        "name": "Forearm Plank with Active Bracing",
        "targetArea": "Core (Transverse Abdominis, Rectus Abdominis, Obliques)",
        "difficulty": "Intermediate",
        "equipment": "Mat",
        "sets": 3,
        "reps": "30-45 sec hold",
        "rest": "45 sec",
        "instructions": [
            "Lie prone on mat and place forearms on floor with elbows directly under shoulders.",
            "Tuck toes and raise hips until body forms a straight line from heels to crown.",
            "Squeeze glutes, pull belly button toward spine, and press forearms actively into the floor.",
            "Breathe steadily and hold tension throughout."
        ],
        "properForm": "Keep hips in line with shoulders; do not let hips dip or pike up.",
        "commonMistakes": [
            "Lower back sagging toward floor",
            "Holding breath",
            "Hips piked up in an inverted V"
        ],
        "modification": "Lower knees to the mat while keeping hips forward in a straight line.",
        "progression": "Plank Shoulder Taps or alternating toe taps outward.",
        "visualKey": "plank"
    },
    "bulgarian_split_squat": {
        "id": "ex-bulgarian-squat",
        "name": "Bulgarian Split Squat",
        "targetArea": "Unilateral Lower Body (Quadriceps, Gluteus Medius, Balance)",
        "difficulty": "Intermediate",
        "equipment": "Bench or Sturdy Chair",
        "sets": 3,
        "reps": "8-10 reps per leg",
        "rest": "60 sec",
        "instructions": [
            "Stand 2-3 feet in front of a bench or chair, facing forward.",
            "Place the top of your back foot on the bench.",
            "Lower your back knee toward the floor until front thigh is nearly parallel to mat.",
            "Keep torso tall or slightly hinged forward for glute emphasis.",
            "Drive through front heel to return to standing."
        ],
        "properForm": "Ensure front foot is positioned far enough forward that the front knee stays stacked over mid-foot.",
        "commonMistakes": [
            "Front foot placed too close to bench, crowding the knee",
            "Torso collapsing forward",
            "Knee collapsing inward"
        ],
        "modification": "Perform static split squats with both feet on the floor.",
        "progression": "Hold dumbbells at sides or add a 1.5 rep pulse at the bottom.",
        "visualKey": "lunge"
    },
    "skaters": {
        "id": "ex-skaters",
        "name": "Lateral Speed Skater Glides",
        "targetArea": "Cardiovascular, Gluteus Medius, Balance",
        "difficulty": "Intermediate",
        "equipment": "No equipment",
        "sets": 3,
        "reps": "40 sec",
        "rest": "20 sec",
        "instructions": [
            "Start on the right side of your space, knees soft, hinged slightly forward at hips.",
            "Bound laterally to the left, landing softly on your left foot while sweeping right foot behind.",
            "Immediately bound laterally back to the right, sweeping left foot behind.",
            "Pump arms naturally in a speed-skater motion."
        ],
        "properForm": "Absorb the landing by bending into the hip and knee; never land stiff-legged.",
        "commonMistakes": [
            "Landing heavily with stiff knees",
            "Rounding spine",
            "Knee buckling inward on landing"
        ],
        "modification": "Perform lateral step-behinds without the airborne jump.",
        "progression": "Add a floor tap with the opposite hand on each landing.",
        "visualKey": "skaters"
    },
    "renegade_row": {
        "id": "ex-renegade-row",
        "name": "Plank Renegade Rows with Push-Up",
        "targetArea": "Upper Body & Anti-Rotation Core (Lats, Chest, Obliques)",
        "difficulty": "Advanced",
        "equipment": "Pair of Hex Dumbbells",
        "sets": 3,
        "reps": "8-10 reps per side",
        "rest": "60 sec",
        "instructions": [
            "Assume a high plank position gripping hex dumbbells on the floor, feet wide for stability.",
            "Perform a strict push-up, lowering chest between weights and pressing up.",
            "Brace core and row right dumbbell to hip, keeping hips square to the floor.",
            "Lower right dumbbell, then row left dumbbell to hip.",
            "That counts as one full repetition."
        ],
        "properForm": "Do not rotate your hips when rowing; imagine balancing water glasses on your lower back.",
        "commonMistakes": [
            "Twisting hips open toward ceiling",
            "Feet too narrow causing balance loss",
            "Sagging lower back during the push-up"
        ],
        "modification": "Perform from knees or execute the rows without the push-up.",
        "progression": "Increase dumbbell weight or pause 2 seconds at the top of each row.",
        "visualKey": "row"
    },
    "russian_twist": {
        "id": "ex-russian-twist",
        "name": "Weighted Russian Twists with Pause",
        "targetArea": "Core (Internal & External Obliques, Transverse Abdominis)",
        "difficulty": "Advanced",
        "equipment": "1 Dumbbell (4-8 kg)",
        "sets": 3,
        "reps": "16 reps (8 per side)",
        "rest": "45 sec",
        "instructions": [
            "Sit on mat with knees bent and feet hovered 3 inches off floor (or heels lightly resting).",
            "Lean torso back to 45 degrees, keeping chest proud and spine long.",
            "Hold dumbbell with both hands and rotate torso to the right, tapping weight beside hip.",
            "Rotate through center to the left with control.",
            "Keep knees steady and prevent them from swaying."
        ],
        "properForm": "Rotate your entire ribcage and shoulders, not just your arms and hands.",
        "commonMistakes": [
            "Rounding the spine into a slouch",
            "Swinging arms without rotating torso",
            "Knees wobbling side to side"
        ],
        "modification": "Keep heels resting firmly on floor and use bodyweight.",
        "progression": "Extend legs straight out (V-sit position) with weight.",
        "visualKey": "twist"
    },
    "burpee_flow": {
        "id": "ex-burpee-flow",
        "name": "Athletic Burpee Flow",
        "targetArea": "Full Body Conditioning (Heart Rate, Chest, Legs, Core)",
        "difficulty": "Advanced",
        "equipment": "No equipment",
        "sets": 3,
        "reps": "10-12 reps",
        "rest": "60 sec",
        "instructions": [
            "Stand tall, feet hip-width apart.",
            "Drop hands to the floor inside your feet.",
            "Jump both feet back into a high plank position.",
            "Lower chest to floor for a full push-up, then press up.",
            "Jump feet forward outside hands into a low squat, then explode upward reaching overhead."
        ],
        "properForm": "Maintain high plank alignment; do not let hips sag when jumping back.",
        "commonMistakes": [
            "Collapsing hips toward floor when jumping back",
            "Landing stiff-legged from the jump",
            "Bending over at waist instead of squatting"
        ],
        "modification": "Step feet back one at a time, omit the push-up, and stand tall with calf raise.",
        "progression": "Add a tuck jump at the top.",
        "visualKey": "burpee"
    },
    "cossack_squat": {
        "id": "ex-cossack",
        "name": "Deep Cossack Squats & Lateral Mobility",
        "targetArea": "Mobility & Lower Body (Adductors, Ankle Dorsiflexion, Glutes)",
        "difficulty": "Advanced",
        "equipment": "Bodyweight or Light Dumbbell",
        "sets": 3,
        "reps": "6-8 reps per side",
        "rest": "60 sec",
        "instructions": [
            "Stand in an extra-wide stance, toes pointing slightly outward.",
            "Shift weight to right side, squatting deeply onto right leg while keeping left leg straight.",
            "Flex left foot so left toes point up toward ceiling, resting on left heel.",
            "Keep right heel firmly on floor and chest upright.",
            "Press through right heel to stand tall, then descend into left side."
        ],
        "properForm": "Keep the squatting heel flat on the floor; do not lift onto the toes.",
        "commonMistakes": [
            "Lifting the heel of the bent leg",
            "Collapsing chest forward",
            "Rushing through the bottom mobility stretch"
        ],
        "modification": "Hold a sturdy doorframe or post for assistance with depth.",
        "progression": "Hold a dumbbell in goblet position or pause 3 seconds at bottom.",
        "visualKey": "cossack"
    }
}

print("Base exercises populated. Total:", len(EXERCISES))
