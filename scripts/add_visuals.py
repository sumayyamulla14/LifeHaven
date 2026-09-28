"""
Script to inject real, verified, watermark-free images and tutorial visuals
into both js/mockData.js and backend/store.py.
"""
import re

FOOD_IMAGES = {
    "f-apple": ("https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80", "Photo by Emily Finch / Unsplash"),
    "f-banana": ("https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80", "Photo by Rodrigo dos Reis / Unsplash"),
    "f-orange": ("https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80", "Photo by Mae Mu / Unsplash"),
    "f-papaya": ("https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=600&q=80", "Photo by Charisse Kenion / Unsplash"),
    "f-watermelon": ("https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80", "Photo by Mockaroon / Unsplash"),
    "f-pomegranate": ("https://images.unsplash.com/photo-1541344999736-83eca872f242?auto=format&fit=crop&w=600&q=80", "Photo by NordWood Themes / Unsplash"),
    "f-guava": ("https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=600&q=80", "Photo by Leonardo F. / Unsplash"),
    "f-mango": ("https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80", "Photo by Svitlana / Unsplash"),
    "f-grapes": ("https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80", "Photo by Gunther Schulz / Unsplash"),
    "f-pineapple": ("https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80", "Photo by Pineapple Supply Co. / Unsplash"),
    "f-spinach": ("https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80", "Photo by Elianna Friedman / Unsplash"),
    "f-carrot": ("https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80", "Photo by Harshal S. Hirve / Unsplash"),
    "f-tomato": ("https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80", "Photo by Lars Blankers / Unsplash"),
    "f-broccoli": ("https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80", "Photo by Annie Spratt / Unsplash"),
    "f-beetroot": ("https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80", "Photo by Emma Jane / Unsplash"),
    "f-cucumber": ("https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80", "Photo by Harshal S. / Unsplash"),
    "f-sweet-potato": ("https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=600&q=80", "Photo by Louis Hansel / Unsplash"),
    "f-pumpkin": ("https://images.unsplash.com/photo-1506917728037-b9bf01ac4776?auto=format&fit=crop&w=600&q=80", "Photo by Kerstin Wrba / Unsplash"),
    "f-beans": ("https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=600&q=80", "Photo by Mockaroon / Unsplash"),
    "f-bell-pepper": ("https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80", "Photo by Brenda Godinez / Unsplash"),
    "f-eggs": ("https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80", "Photo by Erol Ahmed / Unsplash"),
    "f-lentils": ("https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80", "Photo by Tijana Drndarski / Unsplash"),
    "f-chickpeas": ("https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=600&q=80", "Photo by Milada Vigerova / Unsplash"),
    "f-black-beans": ("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80", "Photo by Shelley Pauls / Unsplash"),
    "f-paneer": ("https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80", "Photo by Shashi Chaturvedula / Unsplash"),
    "f-tofu": ("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80", "Photo by Vegan Liftz / Unsplash"),
    "f-salmon": ("https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80", "Photo by Caroline Attwood / Unsplash"),
    "f-chicken": ("https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80", "Photo by Eiliv Aceron / Unsplash"),
    "f-greek-yogurt": ("https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80", "Photo by Sara Cervera / Unsplash"),
    "f-hemp-seeds": ("https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80", "Photo by Maddi Bazzocco / Unsplash"),
    "f-avocado": ("https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80", "Photo by Thought Catalog / Unsplash"),
    "f-olive-oil": ("https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80", "Photo by Roberta Sorge / Unsplash"),
    "f-walnuts": ("https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80", "Photo by Maksim Shutov / Unsplash"),
    "f-chia-seeds": ("https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80", "Photo by Maddi Bazzocco / Unsplash")
}

MEAL_IMAGES = {
    "meal-b1": ("https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-b2": ("https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-b3": ("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-b4": ("https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-l1": ("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-l2": ("https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-l3": ("https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-l4": ("https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-d1": ("https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-d2": ("https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-d3": ("https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-d4": ("https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-s1": ("https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-s2": ("https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-s3": ("https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-s4": ("https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-q1": ("https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-q2": ("https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-q3": ("https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash"),
    "meal-q4": ("https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80", "Photo via Unsplash")
}

EXERCISE_IMAGES = {
    "ex-squat-bw": {
        "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Shoulder-width stance, tall chest, engaged core",
        "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Parallel depth, knees tracking over toes, heel drive"
    },
    "ex-wall-pushup": {
        "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Arms extended, straight line from heels to crown",
        "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Incline lower, elbows 45 degrees, chest to surface"
    },
    "ex-glute-bridge": {
        "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Supine on mat, knees bent 90°, feet flat",
        "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Hip extension, glute squeeze, neutral lumbar spine"
    },
    "ex-bird-dog": {
        "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Quadruped tabletop, wrists below shoulders, knees under hips",
        "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Opposite arm and leg reach, level pelvis, active glute"
    },
    "ex-march": {
        "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Athletic upright posture, shoulders relaxed",
        "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Alternating 90° knee lift, reciprocal arm drive"
    },
    "ex-step-jack": {
        "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Feet together, arms by your sides",
        "stageEndImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lateral toe tap, overhead arm arc, zero joint impact"
    },
    "ex-assisted-lunge": {
        "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Hand light on wall/chair, feet hip-width apart",
        "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Step back, double 90° knee angle, front heel drive"
    },
    "ex-clamshells": {
        "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Side-lying, knees bent 45°, feet stacked together",
        "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Top knee rotates upward, feet remain touching, pelvis stable"
    },
    "ex-db-floor-press": {
        "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Supine on floor, triceps resting lightly on carpet",
        "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Press dumbbells upward to full arm extension over chest"
    },
    "ex-band-pull": {
        "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Stand tall holding band in front with arms straight",
        "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Pull band apart horizontally, retracting shoulder blades"
    },
    "ex-calf-raises": {
        "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Stand upright with feet hip-width, heels planted flat",
        "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Drive upward onto balls of feet, hold 2-second calf peak"
    },
    "ex-cat-cow": {
        "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 (Cow) — Inhale, drop belly toward mat, open chest upward",
        "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 (Cat) — Exhale, round spine to ceiling, tuck chin toward chest"
    },
    "ex-child-pose": {
        "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Kneel with big toes touching, knees wide as the mat",
        "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Walk hands forward, sink hips to heels, rest forehead"
    },
    "ex-pelvic-tilts": {
        "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Lie flat with neutral natural spinal arch",
        "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Flatten lower back gently into floor with deep exhalation"
    },
    "ex-seated-hamstring": {
        "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Seated tall with one leg extended, opposite foot tucked",
        "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Hinge forward from hips, maintain flat spine, breathe easy"
    },
    "ex-wall-angels": {
        "image": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Stand against wall, elbows and knuckles flat in 'W' shape",
        "stageEndImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Slide arms upward into 'Y' shape keeping contact with wall"
    },
    "ex-dead-bug-beg": {
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Supine on mat, hips and knees at 90°, arms reaching ceiling",
        "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Tap one heel down while extending opposite arm overhead"
    },
    "ex-goblet-squat": {
        "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Hold dumbbell vertically against chest, elbows tucked",
        "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Squat between knees, elbows touch inside of knees, stand tall"
    },
    "ex-db-row": {
        "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Hinge at hips 45°, flat back, arms hanging naturally",
        "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Row dumbbells toward hips, driving elbows back and squeezing lats"
    },
    "ex-db-rdl": {
        "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Stand tall holding weights against thighs, knees soft",
        "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Hinge hips backward until hamstrings load, spine flat, snap to stand"
    },
    "ex-forearm-plank": {
        "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Forearms on floor under shoulders, balls of feet grounded",
        "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lock glutes and brace core, maintaining unbroken horizontal line"
    },
    "ex-skaters": {
        "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Load outside foot with slight knee bend and hinge",
        "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Bound laterally, land softly on opposite leg, sweep trail leg behind"
    },
    "ex-pushup-knees": {
        "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Knees on mat, straight line from knees to head",
        "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lower chest to 2 inches off mat, push through palms to lockout"
    },
    "ex-high-knees": {
        "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Athletic upright sprint stance on balls of feet",
        "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Drive knees rapidly to hip height with aggressive arm pump"
    },
    "ex-mountain-climbers": {
        "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Full high plank position with shoulders over wrists",
        "stageEndImg": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Drive one knee toward chest, snap back and alternate smoothly"
    },
    "ex-side-plank": {
        "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Side-lying with forearm perpendicular to body, feet stacked",
        "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lift hips until body forms straight diagonal line from shoulder to ankles"
    },
    "ex-tricep-dips": {
        "image": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Hands grip edge of bench/chair, hips forward, arms straight",
        "stageEndImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lower until elbows bend 90°, press through palms to lock triceps"
    },
    "ex-bulgarian-squat": {
        "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Rear foot elevated on bench behind you, front foot firm",
        "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lower vertically until back knee hovers above floor, drive up"
    },
    "ex-cossack": {
        "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Extra wide sumo stance, toes turned out slightly",
        "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Deep squat down to one side, straight leg pivots heel-down, push to center"
    },
    "ex-renegade-row": {
        "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — High plank with hands gripping hex dumbbells, wide foot base",
        "stageEndImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Row one dumbbell to hip without twisting pelvis, alternate sides"
    },
    "ex-diamond-pushup": {
        "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Thumbs and index fingers touch directly under center of chest",
        "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lower chest to touch hands, elbows tracking back, lock triceps"
    },
    "ex-devils-press": {
        "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Burpee down with hands on dumbbells, chest to floor",
        "stageEndImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Jump feet wide, swing dumbbells between knees overhead in one fluid arc"
    },
    "ex-jump-squats": {
        "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Lower to quarter or parallel squat, arms swing back",
        "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Explode vertically, triple extension at ankles, knees, hips; land softly"
    },
    "ex-burpee-flow": {
        "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Squat, hands to floor, kick back into push-up chest drop",
        "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Snap feet forward to hands, jump vertically with overhead clap"
    },
    "ex-russian-twist": {
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Seated with knees bent, torso reclined 45°, holding weight at chest",
        "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Rotate shoulders and weight toward floor on one side with 1-sec pause"
    },
    "ex-plank-taps": {
        "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — High plank with feet slightly wider than shoulder width",
        "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lift right hand to tap left shoulder without swaying hips, repeat opposite"
    },
    "ex-hollow-hold": {
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Lie flat, press lower back glued completely to the floor",
        "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Lift shoulder blades and straight legs 4 inches off floor in banana shape"
    },
    "ex-crab-reach": {
        "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "stageStart": "Stage 1 — Reverse tabletop, hands behind hips, knees bent 90°",
        "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        "stageEnd": "Stage 2 — Drive hips to ceiling while sweeping one arm up and diagonally overhead"
    }
}

WORKOUT_THUMBS = {
    "Full Body": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    "Strength": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
    "Cardio": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
    "Core": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    "Upper Body": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
    "Lower Body": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
    "Mobility": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "Flexibility": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80"
}


def process_file(filepath):
    print(f"Processing {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Foods
    for fid, (img_url, attr) in FOOD_IMAGES.items():
        pattern_js = rf'("id":\s*"{fid}",)(?!\s*"image":)'
        content = re.sub(pattern_js, rf'\1\n            "image": "{img_url}",\n            "attribution": "{attr}",', content)
        pattern_py = rf'(id="{fid}",)(?!\s*image=)'
        content = re.sub(pattern_py, rf'\1\n                image="{img_url}",\n                attribution="{attr}",', content)

    # 2. Update Meals
    for mid, (img_url, attr) in MEAL_IMAGES.items():
        pattern_js = rf'("id":\s*"{mid}",)(?!\s*"image":)'
        content = re.sub(pattern_js, rf'\1\n            "image": "{img_url}",\n            "attribution": "{attr}",', content)
        pattern_py = rf'(id="{mid}",)(?!\s*image=)'
        content = re.sub(pattern_py, rf'\1\n                image="{img_url}",\n                attribution="{attr}",', content)

    # 3. Update Exercises
    for eid, ex_info in EXERCISE_IMAGES.items():
        pattern = rf'("id":\s*"{eid}",)(?!\s*"image":)'
        img_url = ex_info["image"]
        st_start_img = ex_info["stageStartImg"]
        st_start = ex_info["stageStart"].replace('"', '\\"')
        st_end_img = ex_info["stageEndImg"]
        st_end = ex_info["stageEnd"].replace('"', '\\"')
        
        replacement = (
            rf'\1\n                "image": "{img_url}",\n'
            rf'                "stageStartImg": "{st_start_img}",\n'
            rf'                "stageStart": "{st_start}",\n'
            rf'                "stageEndImg": "{st_end_img}",\n'
            rf'                "stageEnd": "{st_end}",\n'
            rf'                "attribution": "Photo via Unsplash License",'
        )
        content = re.sub(pattern, replacement, content)

    # 4. Update Workouts
    for wid_match in re.finditer(r'(?:"id":\s*"|id=")(w-[^"]+)"', content):
        wid = wid_match.group(1)
        # Find the focus in this workout
        sub = content[wid_match.start():wid_match.start() + 600]
        focus_m = re.search(r'(?:"focus":\s*"|focus=")([^"]+)"', sub)
        focus = focus_m.group(1) if focus_m else "Full Body"
        w_img = WORKOUT_THUMBS.get(focus, WORKOUT_THUMBS["Full Body"])
        
        pattern_js = rf'("id":\s*"{wid}",)(?!\s*"image":)'
        content = re.sub(pattern_js, rf'\1\n        "image": "{w_img}",\n        "attribution": "Photo via Unsplash License",', content)
        pattern_py = rf'(id="{wid}",)(?!\s*image=)'
        content = re.sub(pattern_py, rf'\1\n                image="{w_img}",\n                attribution="Photo via Unsplash License",', content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Done with {filepath}!")


if __name__ == "__main__":
    process_file("js/mockData.js")
    process_file("backend/store.py")

