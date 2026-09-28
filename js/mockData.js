/**
 * LIFEHAVEN — COMPLETE HEALTH & WELLNESS DATA REPOSITORY
 * 
 * Designed for BCA Student understanding:
 * Clean, structured JavaScript objects representing our local database.
 * Every section stores data in localStorage so changes persist across page refreshes.
 * When Supabase is connected in Phase 2, these structures map directly to tables:
 *   - settings       -> profiles
 *   - periodTracker  -> cycle_logs, period_symptoms
 *   - nutrition      -> food_items, meal_ideas
 *   - workouts       -> workout_routines, completed_sessions
 *   - hydration      -> hydration_logs
 *   - sleep          -> sleep_logs
 *   - moodWellness   -> mood_logs, reflection_entries
 *   - habits         -> daily_habits
 *   - education      -> health_articles
 */

const initialMockData = {
  // 1. User Profile & Settings
  settings: {
    userName: 'Elena',
    theme: 'rose', // 'rose', 'emerald', 'nordic', 'sunset'
    waterTarget: 2500, // mL
    sleepTargetHours: 8,
    activeMinutesTarget: 45,
    cycleLengthDays: 28,
    periodLengthDays: 5
  },

  // 2. Hydration Lab
  water: {
    current: 1750,
    target: 2500,
    logs: [
      { id: 1, time: '08:00 AM', amount: 350, source: 'Warm Morning Lemon Water' },
      { id: 2, time: '10:30 AM', amount: 400, source: 'Hydration Flask' },
      { id: 3, time: '01:15 PM', amount: 500, source: 'Post-Lunch Water' },
      { id: 4, time: '03:45 PM', amount: 500, source: 'Herbal Infusion' }
    ]
  },

  // 3. Sleep & Recovery
  sleep: {
    lastNight: {
      durationHours: 7.5,
      bedTime: '11:15 PM',
      wakeTime: '06:45 AM',
      quality: 'Restful', // 'Restful', 'Good', 'Light', 'Restless'
      deepSleepHours: 2.1,
      remSleepHours: 1.8,
      score: 88
    },
    weeklyAverage: 7.6,
    history: [
      { date: 'Yesterday', duration: 7.5, quality: 'Restful', score: 88 },
      { date: 'Friday', duration: 8.0, quality: 'Deep', score: 94 },
      { date: 'Thursday', duration: 7.2, quality: 'Good', score: 82 },
      { date: 'Wednesday', duration: 6.8, quality: 'Light', score: 75 },
      { date: 'Tuesday', duration: 7.8, quality: 'Deep', score: 90 },
      { date: 'Monday', duration: 7.4, quality: 'Good', score: 84 },
      { date: 'Sunday', duration: 8.2, quality: 'Restful', score: 95 }
    ],
    tips: [
      { title: 'Circadian Sunlight', text: 'View 10-15 minutes of natural sunlight within 1 hour of waking to anchor your body clock.' },
      { title: 'Digital Sunset', text: 'Dim overhead bright lights and reduce blue light exposure 60 minutes before bedtime.' },
      { title: 'Optimal Temperature', text: 'Keep your sleeping space cool (around 18-20°C / 65-68°F) to facilitate natural body cooling.' },
      { title: 'Caffeine Curfew', text: 'Avoid caffeine 8-10 hours before sleep to allow adenosine receptors to function naturally.' }
    ]
  },

  // 4. Period & Menstrual Cycle Tracker
  periodTracker: {
    cycleLength: 28, // average days
    periodLength: 5,  // average days of bleeding
    lastPeriodStart: '2026-09-14', // YYYY-MM-DD
    lastPeriodEnd: '2026-09-18',
    // History of past cycles
    history: [
      { startDate: '2026-09-14', endDate: '2026-09-18', cycleLength: 28, periodLength: 5, notes: 'Normal flow, mild cramps on day 1' },
      { startDate: '2026-08-17', endDate: '2026-08-21', cycleLength: 28, periodLength: 5, notes: 'Energetic follicular phase, light spotting' },
      { startDate: '2026-07-20', endDate: '2026-07-25', cycleLength: 29, periodLength: 6, notes: 'Moderate cramps day 1-2, hydrated well' }
    ],
    // Today's logged symptoms
    todaySymptoms: {
      date: '2026-09-27',
      flow: 'None', // 'None', 'Spotting', 'Light', 'Medium', 'Heavy'
      cramps: 'None', // 'None', 'Mild', 'Moderate', 'Severe'
      mood: 'Calm & Balanced', // 'Calm & Balanced', 'High Energy', 'Sensitive', 'Low Energy', 'Irritable'
      energy: 'Good', // 'High', 'Good', 'Moderate', 'Low'
      symptoms: ['clear skin', 'good focus'], // array of tags
      notes: 'Feeling energetic today. Approaching luteal phase soon.'
    },
    // Common symptoms list for logger
    availableSymptoms: [
      'Mild Cramps', 'Lower Back Ache', 'Bloating', 'Headache', 'Breast Tenderness',
      'Food Cravings', 'Clear Skin', 'Fatigue', 'High Energy', 'Mood Swings',
      'Brain Fog', 'Sound Sleep', 'Digestive Sensitivity', 'Calm Mind'
    ]
  },

  // 5. Food & Nutrition (Expanded Whole Food & Education Library)
  nutrition: {
    "categories": [
        {
            "id": "all",
            "name": "All Superfoods",
            "icon": "all"
        },
        {
            "id": "fruits",
            "name": "Fruits",
            "icon": "fruits"
        },
        {
            "id": "vegetables",
            "name": "Vegetables",
            "icon": "vegetables"
        },
        {
            "id": "protein",
            "name": "Protein-Rich",
            "icon": "protein"
        },
        {
            "id": "iron",
            "name": "Iron-Rich",
            "icon": "iron"
        },
        {
            "id": "calcium",
            "name": "Calcium-Rich",
            "icon": "calcium"
        },
        {
            "id": "fiber",
            "name": "Fiber & Gut",
            "icon": "fiber"
        },
        {
            "id": "fats",
            "name": "Healthy Fats",
            "icon": "fats"
        },
        {
            "id": "hydration",
            "name": "Hydrating Foods",
            "icon": "hydration"
        }
    ],
    "foods": [
        {
            "id": "f-apple",
            "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Emily Finch / Unsplash",
            "name": "Crisp Red & Green Apples",
            "category": "fruits",
            "tags": [
                "Pectin Fiber",
                "Quercetin",
                "Gut Health",
                "Low Glycemic"
            ],
            "servingSize": "1 medium apple (182g)",
            "calories": 95,
            "proteinG": 0.5,
            "carbsG": 25.0,
            "fiberG": 4.4,
            "fatG": 0.3,
            "vitaminsMinerals": [
                "Vitamin C (14% DV)",
                "Potassium (6% DV)",
                "Vitamin K (5% DV)"
            ],
            "benefits": "Rich in pectin, a prebiotic soluble fiber that feeds beneficial gut microbiota and buffers against blood glucose spikes. Quercetin supports cellular resilience.",
            "highlights": "Packed with dietary fiber and bioflavonoids without disturbing metabolic balance.",
            "servingTip": "Slice and pair with stone-ground almond butter, or dice into warm cinnamon morning oats.",
            "mealIdeas": [
                "Apple almond butter dip",
                "Cinnamon baked apple slices",
                "Shaved apple & walnut arugula salad"
            ]
        },
        {
            "id": "f-banana",
            "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Rodrigo dos Reis / Unsplash",
            "name": "Natural Ripe Bananas",
            "category": "fruits",
            "tags": [
                "Potassium",
                "Vitamin B6",
                "Glycogen Fuel",
                "Electrolytes"
            ],
            "servingSize": "1 medium banana (118g)",
            "calories": 105,
            "proteinG": 1.3,
            "carbsG": 27.0,
            "fiberG": 3.1,
            "fatG": 0.4,
            "vitaminsMinerals": [
                "Potassium (422mg, 9% DV)",
                "Vitamin B6 (33% DV)",
                "Vitamin C (11% DV)",
                "Magnesium (8% DV)"
            ],
            "benefits": "Provides bioavailable potassium and magnesium to support nervous transmission, muscular contraction, and prevent muscle cramps. Natural carbohydrates replenish muscle glycogen after movement.",
            "highlights": "Exceptional Vitamin B6 which helps synthesize dopamine and serotonin for emotional balance.",
            "servingTip": "Blend into post-movement smoothies, slice onto sourdough with nut butter, or freeze for healthy soft-serve.",
            "mealIdeas": [
                "Pre-workout banana & peanut butter toast",
                "Creamy berry banana smoothie bowl",
                "Oat & mashed banana breakfast pancakes"
            ]
        },
        {
            "id": "f-orange",
            "image": "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Mae Mu / Unsplash",
            "name": "Fresh Sweet Oranges & Citrus",
            "category": "fruits",
            "tags": [
                "Vitamin C",
                "Hesperidin",
                "Immune Defense",
                "Cellular Hydration"
            ],
            "servingSize": "1 medium orange (140g)",
            "calories": 69,
            "proteinG": 1.3,
            "carbsG": 17.6,
            "fiberG": 3.1,
            "fatG": 0.2,
            "vitaminsMinerals": [
                "Vitamin C (83mg, 92% DV)",
                "Folate (9% DV)",
                "Thiamine B1 (9% DV)",
                "Calcium (6% DV)"
            ],
            "benefits": "Contains over 90% of your daily Vitamin C needs. Ascorbic acid significantly enhances non-heme iron absorption from plant greens when consumed together.",
            "highlights": "Flavanone antioxidants like hesperidin assist healthy vascular blood flow and endothelium function.",
            "servingTip": "Enjoy whole segments with the white pith intact to capture the highest concentration of bioflavonoid fibers.",
            "mealIdeas": [
                "Fresh citrus segments with mint",
                "Citrus vinaigrette over baby greens",
                "Orange, fennel, and olive salad"
            ]
        },
        {
            "id": "f-papaya",
            "image": "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Charisse Kenion / Unsplash",
            "name": "Golden Papaya",
            "category": "fruits",
            "tags": [
                "Papain Enzyme",
                "Carotenoids",
                "Digestive Ease",
                "Skin Glow"
            ],
            "servingSize": "1 cup cubed (145g)",
            "calories": 62,
            "proteinG": 0.7,
            "carbsG": 15.7,
            "fiberG": 2.5,
            "fatG": 0.4,
            "vitaminsMinerals": [
                "Vitamin C (88mg, 98% DV)",
                "Vitamin A (33% DV)",
                "Folate (14% DV)",
                "Magnesium (7% DV)"
            ],
            "benefits": "Contains the proteolytic enzyme papain, which gently assists in breaking down dietary proteins and relieves digestive heaviness or bloating.",
            "highlights": "Vibrant orange hue is derived from lycopene and beta-carotene, supporting mucosal barrier health.",
            "servingTip": "Squeeze fresh lime juice over ripe cubed papaya and top with a sprinkle of crushed chia seeds.",
            "mealIdeas": [
                "Chilled papaya wedges with lime",
                "Papaya & Greek yogurt parfait",
                "Tropical papaya ginger smoothie"
            ]
        },
        {
            "id": "f-watermelon",
            "image": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Mockaroon / Unsplash",
            "name": "Hydrating Watermelon",
            "category": "fruits",
            "tags": [
                "Lycopene",
                "L-Citrulline",
                "92% Water",
                "Cooling Hydration"
            ],
            "servingSize": "1 cup diced (152g)",
            "calories": 46,
            "proteinG": 0.9,
            "carbsG": 11.5,
            "fiberG": 0.6,
            "fatG": 0.2,
            "vitaminsMinerals": [
                "Vitamin C (14% DV)",
                "Vitamin A (5% DV)",
                "Potassium (4% DV)",
                "Lycopene (6500mcg)"
            ],
            "benefits": "92% structured water infused with natural electrolyte minerals. L-citrulline promotes nitric oxide synthesis for smooth micro-circulation and post-walk recovery.",
            "highlights": "One of nature's richest whole-food sources of lycopene, a potent lipid-protective antioxidant.",
            "servingTip": "Cube cold and pair with crumbled sheep feta, fresh mint leaves, and a drizzle of olive oil.",
            "mealIdeas": [
                "Watermelon feta & mint salad",
                "Blended watermelon lime agua fresca",
                "Frozen watermelon electrolyte cubes"
            ]
        },
        {
            "id": "f-pomegranate",
            "image": "https://images.unsplash.com/photo-1541344999736-83eca872f242?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by NordWood Themes / Unsplash",
            "name": "Ruby Pomegranate Arils",
            "category": "fruits",
            "tags": [
                "Punicalagins",
                "Iron Absorption",
                "Vascular Health",
                "Polyphenols"
            ],
            "servingSize": "1/2 cup arils (87g)",
            "calories": 72,
            "proteinG": 1.5,
            "carbsG": 16.3,
            "fiberG": 3.5,
            "fatG": 1.0,
            "vitaminsMinerals": [
                "Vitamin C (12% DV)",
                "Vitamin K (14% DV)",
                "Folate (8% DV)",
                "Copper (6% DV)"
            ],
            "benefits": "Punicalagins and punicic acid provide deep anti-inflammatory polyphenol power that protects endothelial blood vessels and supports red blood cell function.",
            "highlights": "High natural Vitamin C accelerates iron assimilation from companion grain or lentil meals.",
            "servingTip": "Scatter 2 tablespoons of crunchy ruby arils over creamy Greek yogurt, lentil salads, or grain bowls.",
            "mealIdeas": [
                "Pomegranate grain bowl topper",
                "Yogurt & pomegranate breakfast bowl",
                "Warm spiced pomegranate tea"
            ]
        },
        {
            "id": "f-guava",
            "image": "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Leonardo F. / Unsplash",
            "name": "Fiber-Rich Pink Guava",
            "category": "fruits",
            "tags": [
                "Ultra Vitamin C",
                "Soluble Fiber",
                "Immune Resilience",
                "Gut Balance"
            ],
            "servingSize": "1 medium fruit (55g)",
            "calories": 37,
            "proteinG": 1.4,
            "carbsG": 7.9,
            "fiberG": 3.0,
            "fatG": 0.5,
            "vitaminsMinerals": [
                "Vitamin C (125mg, 140% DV)",
                "Folate (7% DV)",
                "Potassium (6% DV)",
                "Lycopene (2900mcg)"
            ],
            "benefits": "Delivers over twice the Vitamin C of an orange per 100g, alongside exceptional dietary fiber that encourages gentle, regular gastrointestinal elimination.",
            "highlights": "A low-glycemic, deeply nourishing fruit that supports collagen production and immune defense.",
            "servingTip": "Eat fresh with a light dusting of sea salt and chili, or slice into vibrant tropical fruit salads.",
            "mealIdeas": [
                "Fresh sliced guava with lime and salt",
                "Pink guava breakfast smoothie",
                "Guava spinach green salad"
            ]
        },
        {
            "id": "f-mango",
            "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Svitlana / Unsplash",
            "name": "Juicy Sun-Ripened Mango",
            "category": "fruits",
            "tags": [
                "Beta-Carotene",
                "Amylase Enzymes",
                "Eye Health",
                "Radiant Skin"
            ],
            "servingSize": "1 cup sliced (165g)",
            "calories": 99,
            "proteinG": 1.4,
            "carbsG": 24.7,
            "fiberG": 2.6,
            "fatG": 0.6,
            "vitaminsMinerals": [
                "Vitamin C (67% DV)",
                "Vitamin A (10% DV)",
                "Folate (18% DV)",
                "Vitamin B6 (12% DV)"
            ],
            "benefits": "Rich in amylase digestive enzymes that assist carbohydrate breakdown. Carotenoid antioxidants support retinal health and natural dermal elasticity.",
            "highlights": "Abundant folate (Vitamin B9), which plays a foundational role in cellular regeneration and DNA repair.",
            "servingTip": "Dice and toss with red onions, cilantro, and lime juice for a vibrant, mineral-rich meal topping.",
            "mealIdeas": [
                "Mango avocado black bean salsa",
                "Coconut milk & mango chia pudding",
                "Curried lentils with diced fresh mango"
            ]
        },
        {
            "id": "f-grapes",
            "image": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Gunther Schulz / Unsplash",
            "name": "Sweet Purple & Green Grapes",
            "category": "fruits",
            "tags": [
                "Resveratrol",
                "Flavonoids",
                "Hydration",
                "Heart Support"
            ],
            "servingSize": "1 cup whole (151g)",
            "calories": 104,
            "proteinG": 1.1,
            "carbsG": 27.3,
            "fiberG": 1.4,
            "fatG": 0.2,
            "vitaminsMinerals": [
                "Vitamin K (18% DV)",
                "Copper (21% DV)",
                "Vitamin B1 (7% DV)",
                "Potassium (6% DV)"
            ],
            "benefits": "The deep purple skins are abundant in resveratrol, a polyphenol that activates sirtuin pathways linked with longevity and cardiovascular elasticity.",
            "highlights": "Over 80% water by weight, providing convenient cellular hydration during work hours.",
            "servingTip": "Freeze grapes for 2 hours for a refreshing, sorbet-like chilled afternoon treat.",
            "mealIdeas": [
                "Chilled frozen grape bites",
                "Roasted grape & goat cheese sourdough toast",
                "Grape, walnut & celery salad"
            ]
        },
        {
            "id": "f-pineapple",
            "image": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Pineapple Supply Co. / Unsplash",
            "name": "Tropical Golden Pineapple",
            "category": "fruits",
            "tags": [
                "Bromelain",
                "Manganese",
                "Anti-Inflammatory",
                "Joint Comfort"
            ],
            "servingSize": "1 cup chunks (165g)",
            "calories": 82,
            "proteinG": 0.9,
            "carbsG": 21.6,
            "fiberG": 2.3,
            "fatG": 0.2,
            "vitaminsMinerals": [
                "Vitamin C (79mg, 88% DV)",
                "Manganese (1.5mg, 67% DV)",
                "Vitamin B6 (9% DV)",
                "Copper (20% DV)"
            ],
            "benefits": "Bromelain is a bio-active enzyme mixture that assists protein digestion and helps down-regulate systemic inflammation in muscles and joints post-movement.",
            "highlights": "Remarkably rich in manganese, an essential trace mineral required for bone matrix synthesis.",
            "servingTip": "Pair grilled or fresh pineapple chunks with protein sources like grilled salmon, paneer, or tofu.",
            "mealIdeas": [
                "Fresh pineapple & cottage cheese bowl",
                "Grilled pineapple with cinnamon glaze",
                "Pineapple cucumber hydrating juice"
            ]
        },
        {
            "id": "f-spinach",
            "image": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Elianna Friedman / Unsplash",
            "name": "Tender Baby Spinach & Dark Greens",
            "category": "vegetables",
            "tags": [
                "Non-Heme Iron",
                "Folate",
                "Magnesium",
                "Chlorophyll"
            ],
            "servingSize": "2 cups raw / 1 cup cooked (180g cooked)",
            "calories": 41,
            "proteinG": 5.3,
            "carbsG": 6.7,
            "fiberG": 4.3,
            "fatG": 0.5,
            "vitaminsMinerals": [
                "Iron (6.4mg, 36% DV)",
                "Vitamin A (377% DV)",
                "Folate (66% DV)",
                "Magnesium (37% DV)",
                "Calcium (24% DV)"
            ],
            "benefits": "Crucial for replenishing blood iron reserves, supporting tissue oxygenation, and soothing menstrual muscle cramps via natural magnesium.",
            "highlights": "One of the dense whole-food sources of plant iron, folate, and bone-building Vitamin K.",
            "servingTip": "Pair with a squeeze of fresh lemon juice or sliced tomatoes; Vitamin C triples plant non-heme iron absorption!",
            "mealIdeas": [
                "Saut\u00e9ed garlic lemon spinach",
                "Wilted spinach in red lentil dal",
                "Spinach, egg, and feta breakfast wrap"
            ]
        },
        {
            "id": "f-carrot",
            "image": "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Harshal S. Hirve / Unsplash",
            "name": "Sweet Crisp Carrots",
            "category": "vegetables",
            "tags": [
                "Beta-Carotene",
                "Lutein",
                "Cellular Repair",
                "Soluble Fiber"
            ],
            "servingSize": "1 cup chopped (128g)",
            "calories": 52,
            "proteinG": 1.2,
            "carbsG": 12.3,
            "fiberG": 3.6,
            "fatG": 0.3,
            "vitaminsMinerals": [
                "Vitamin A (119% DV)",
                "Vitamin K (14% DV)",
                "Potassium (9% DV)",
                "Biotin (8% DV)"
            ],
            "benefits": "Beta-carotene is converted into Vitamin A in the liver as needed, safeguarding mucosal lining integrity, ocular health, and glowing dermal tissue.",
            "highlights": "Carrot fiber binds gently to metabolized bile acids in the digestive tract, encouraging healthy hormonal clearance.",
            "servingTip": "Roast whole with cumin seeds and a drizzle of olive oil, or grate raw into lemon-dressed slaws.",
            "mealIdeas": [
                "Roasted cumin glazed carrots",
                "Carrot & ginger warming soup",
                "Raw carrot ribbon salad with tahini"
            ]
        },
        {
            "id": "f-tomato",
            "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Lars Blankers / Unsplash",
            "name": "Ripe Vine Tomatoes",
            "category": "vegetables",
            "tags": [
                "Lycopene",
                "Vitamin C",
                "Potassium",
                "Endothelial Health"
            ],
            "servingSize": "1 medium tomato (123g)",
            "calories": 22,
            "proteinG": 1.1,
            "carbsG": 4.8,
            "fiberG": 1.5,
            "fatG": 0.2,
            "vitaminsMinerals": [
                "Vitamin C (17mg, 19% DV)",
                "Potassium (292mg, 6% DV)",
                "Vitamin K (10% DV)",
                "Folate (5% DV)"
            ],
            "benefits": "Cooked or olive oil-paired tomatoes release high concentrations of bioavailable lycopene, protecting cells against oxidative stress.",
            "highlights": "Natural glutamic acid gives tomatoes rich savory umami that elevates simple whole-grain and bean dishes.",
            "servingTip": "Simmer gently with garlic, olive oil, and herbs; cooking with healthy fats increases lycopene absorption up to 4-fold.",
            "mealIdeas": [
                "Mediterranean tomato & cucumber salad",
                "Slow-simmered tomato basil pasta sauce",
                "Warm shakshuka with poached eggs"
            ]
        },
        {
            "id": "f-broccoli",
            "image": "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Annie Spratt / Unsplash",
            "name": "Fresh Broccoli & Cruciferous Florets",
            "category": "vegetables",
            "tags": [
                "Sulforaphane",
                "DIM",
                "Hormone Balance",
                "Calcium"
            ],
            "servingSize": "1 cup cooked florets (156g)",
            "calories": 55,
            "proteinG": 3.7,
            "carbsG": 11.2,
            "fiberG": 5.1,
            "fatG": 0.6,
            "vitaminsMinerals": [
                "Vitamin C (101mg, 112% DV)",
                "Vitamin K (183% DV)",
                "Folate (42% DV)",
                "Calcium (62mg, 6% DV)"
            ],
            "benefits": "Contains diindolylmethane (DIM) and sulforaphane, bioactive phytochemicals that support the liver's natural ability to safely metabolize estrogen.",
            "highlights": "More Vitamin C per cup than an orange, coupled with bioavailable bone-supporting minerals.",
            "servingTip": "Lightly steam for 3 to 4 minutes to preserve heat-sensitive myrosinase enzymes, then finish with olive oil.",
            "mealIdeas": [
                "Steamed sesame garlic broccoli",
                "Roasted broccoli with lemon and parmesan",
                "Broccoli & lentil nourish soup"
            ]
        },
        {
            "id": "f-beetroot",
            "image": "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Emma Jane / Unsplash",
            "name": "Earthy Sweet Beetroot",
            "category": "vegetables",
            "tags": [
                "Dietary Nitrates",
                "Betalains",
                "Blood Flow",
                "Liver Support"
            ],
            "servingSize": "1 cup boiled slices (170g)",
            "calories": 75,
            "proteinG": 2.9,
            "carbsG": 16.9,
            "fiberG": 3.4,
            "fatG": 0.3,
            "vitaminsMinerals": [
                "Folate (136mcg, 34% DV)",
                "Manganese (28% DV)",
                "Potassium (518mg, 11% DV)",
                "Iron (7% DV)"
            ],
            "benefits": "Dietary nitrates convert into nitric oxide, dilating blood vessels to enhance oxygen delivery, reduce blood pressure, and ease cycle fatigue.",
            "highlights": "Betalain pigments lend deep crimson color and provide antioxidant support to hepatic detoxification pathways.",
            "servingTip": "Roast whole in skins, peel, and toss with crumbled goat cheese, toasted walnuts, and balsamic vinegar.",
            "mealIdeas": [
                "Warm roasted beet & feta salad",
                "Grated raw beet and apple slaw",
                "Blended crimson beet & berry smoothie"
            ]
        },
        {
            "id": "f-cucumber",
            "image": "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Harshal S. / Unsplash",
            "name": "Crisp Garden Cucumbers",
            "category": "vegetables",
            "tags": [
                "Silica",
                "96% Cellular Water",
                "Electrolytes",
                "Cooling"
            ],
            "servingSize": "1 cup sliced with peel (104g)",
            "calories": 16,
            "proteinG": 0.7,
            "carbsG": 3.8,
            "fiberG": 0.6,
            "fatG": 0.1,
            "vitaminsMinerals": [
                "Vitamin K (17% DV)",
                "Potassium (152mg, 3% DV)",
                "Magnesium (3% DV)",
                "Silica"
            ],
            "benefits": "96% cellular structured water that hydrates deeply on an intracellular level. Silica supports connective tissue strength and glowing skin.",
            "highlights": "Low in calories, cooling to the digestive system, and rich in natural cucurbitacin phytonutrients.",
            "servingTip": "Slice thinly with peel on, sprinkle with sea salt, lemon juice, and fresh dill, or dip into homemade hummus.",
            "mealIdeas": [
                "Classic Greek cucumber salad",
                "Chilled cucumber yogurt tzatziki",
                "Cucumber batons with herbed tahini"
            ]
        },
        {
            "id": "f-sweet-potato",
            "image": "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Louis Hansel / Unsplash",
            "name": "Roasted Sweet Potatoes",
            "category": "vegetables",
            "tags": [
                "Complex Carbs",
                "Beta-Carotene",
                "Adrenal Calm",
                "Serotonin"
            ],
            "servingSize": "1 medium baked potato (114g)",
            "calories": 103,
            "proteinG": 2.3,
            "carbsG": 23.6,
            "fiberG": 3.8,
            "fatG": 0.2,
            "vitaminsMinerals": [
                "Vitamin A (438% DV)",
                "Vitamin C (25% DV)",
                "Potassium (542mg, 12% DV)",
                "Manganese (25% DV)"
            ],
            "benefits": "Slow-digesting complex carbohydrates support steady evening serotonin synthesis and soothe adrenal cortisol spikes during the luteal phase.",
            "highlights": "Exceptional beta-carotene and potassium content with a gentle, satisfying natural sweetness.",
            "servingTip": "Bake whole at 200\u00b0C until caramelized, slice open and top with black beans, tahini, and cilantro.",
            "mealIdeas": [
                "Stuffed black bean baked sweet potato",
                "Roasted sweet potato nourish bowl",
                "Mashed sweet potato with coconut milk"
            ]
        },
        {
            "id": "f-pumpkin",
            "image": "https://images.unsplash.com/photo-1506917728037-b9bf01ac4776?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Kerstin Wrba / Unsplash",
            "name": "Hearty Winter Pumpkin",
            "category": "vegetables",
            "tags": [
                "Prebiotic Fiber",
                "Zinc",
                "Potassium",
                "Gut Soothing"
            ],
            "servingSize": "1 cup cooked cubes (245g)",
            "calories": 49,
            "proteinG": 1.8,
            "carbsG": 12.0,
            "fiberG": 2.7,
            "fatG": 0.2,
            "vitaminsMinerals": [
                "Vitamin A (245% DV)",
                "Vitamin C (19% DV)",
                "Potassium (564mg, 12% DV)",
                "Copper (11% DV)"
            ],
            "benefits": "Gentle, soluble prebiotic pectin fiber soothes the mucosal stomach lining while supporting immune defense through rich carotenoids.",
            "highlights": "High potassium and low sodium ratio encourages natural fluid balance and reduces water retention.",
            "servingTip": "Simmer into a velvety soup with coconut milk, ginger, and turmeric, or roast alongside hearty legumes.",
            "mealIdeas": [
                "Creamy spiced pumpkin soup",
                "Roasted spiced pumpkin wedges",
                "Pumpkin and black bean curry"
            ]
        },
        {
            "id": "f-beans",
            "image": "https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Mockaroon / Unsplash",
            "name": "Tender Green Beans & Pods",
            "category": "vegetables",
            "tags": [
                "Chlorophyll",
                "Silicon",
                "Folate",
                "Fiber"
            ],
            "servingSize": "1 cup cooked (125g)",
            "calories": 44,
            "proteinG": 2.4,
            "carbsG": 9.9,
            "fiberG": 4.0,
            "fatG": 0.4,
            "vitaminsMinerals": [
                "Vitamin K (25% DV)",
                "Vitamin C (14% DV)",
                "Folate (9% DV)",
                "Silicon"
            ],
            "benefits": "Supplies easily absorbable silicon for bone density and connective tissue maintenance, alongside gentle soluble fiber for gut regularity.",
            "highlights": "A versatile vegetable that maintains texture and nutrients easily when lightly blanched or saut\u00e9ed.",
            "servingTip": "Saut\u00e9 with minced garlic, toasted slivered almonds, and a touch of extra virgin olive oil.",
            "mealIdeas": [
                "Garlic & toasted almond green beans",
                "Steamed green beans with lemon tahini",
                "Tossed green bean and potato salad"
            ]
        },
        {
            "id": "f-bell-pepper",
            "image": "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Brenda Godinez / Unsplash",
            "name": "Sweet Red & Yellow Bell Peppers",
            "category": "vegetables",
            "tags": [
                "Super Vitamin C",
                "Capsanthin",
                "Skin Collagen",
                "Immunity"
            ],
            "servingSize": "1 medium red pepper (119g)",
            "calories": 37,
            "proteinG": 1.2,
            "carbsG": 7.2,
            "fiberG": 2.5,
            "fatG": 0.4,
            "vitaminsMinerals": [
                "Vitamin C (152mg, 169% DV)",
                "Vitamin A (75% DV)",
                "Vitamin B6 (20% DV)",
                "Folate (14% DV)"
            ],
            "benefits": "Red bell peppers deliver over 160% of daily Vitamin C needs, stimulating natural collagen synthesis and dramatically amplifying iron uptake.",
            "highlights": "Crisp, sweet, and bursting with capsanthin and violaxanthin carotenoid antioxidants.",
            "servingTip": "Slice raw into colorful dipping batons for homemade hummus or saut\u00e9 with onions for fajita bowls.",
            "mealIdeas": [
                "Raw bell pepper batons with hummus",
                "Saut\u00e9ed pepper & onion fajita plate",
                "Roasted red pepper & walnut dip"
            ]
        },
        {
            "id": "f-eggs",
            "image": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Erol Ahmed / Unsplash",
            "name": "Pasture-Raised Whole Eggs",
            "category": "protein",
            "tags": [
                "Complete Protein",
                "Choline",
                "B12",
                "Lutein"
            ],
            "servingSize": "2 large eggs (100g)",
            "calories": 144,
            "proteinG": 12.6,
            "carbsG": 0.8,
            "fiberG": 0.0,
            "fatG": 9.6,
            "vitaminsMinerals": [
                "Choline (294mg, 54% DV)",
                "Vitamin B12 (44% DV)",
                "Selenium (56% DV)",
                "Riboflavin B2 (38% DV)",
                "Iron (10% DV)"
            ],
            "benefits": "Features a biological value of nearly 100, providing all 9 essential amino acids in perfect human proportions. Choline is indispensable for brain cell membranes and liver bile production.",
            "highlights": "The nutrient-dense yolk contains brain-supporting choline, bioavailable B12, and eye-protective lutein.",
            "servingTip": "Poach, soft-boil, or scramble in olive oil alongside saut\u00e9ed greens and sliced avocado.",
            "mealIdeas": [
                "Soft-poached eggs over sourdough & spinach",
                "Veggie & herb frittata",
                "Hard-boiled egg & avocado snack plate"
            ]
        },
        {
            "id": "f-lentils",
            "image": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Tijana Drndarski / Unsplash",
            "name": "Hearty Red & Brown Lentils",
            "category": "protein",
            "tags": [
                "Plant Protein",
                "Soluble Fiber",
                "Non-Heme Iron",
                "Prebiotics"
            ],
            "servingSize": "1 cup cooked (198g)",
            "calories": 230,
            "proteinG": 17.9,
            "carbsG": 39.9,
            "fiberG": 15.6,
            "fatG": 0.8,
            "vitaminsMinerals": [
                "Folate (358mcg, 90% DV)",
                "Iron (6.6mg, 37% DV)",
                "Manganese (43% DV)",
                "Phosphorus (28% DV)",
                "Zinc (17% DV)"
            ],
            "benefits": "Dual powerhouse of plant protein and exceptional soluble fiber that stabilizes blood glucose for 4+ hours while nourishing the colon microbiome.",
            "highlights": "Over 17g of pure plant protein and 15g of prebiotic fiber per single cup.",
            "servingTip": "Simmer into rich yellow or red dal with turmeric and ginger, or fold cold French green lentils into grain salads.",
            "mealIdeas": [
                "Golden turmeric red lentil dal",
                "French lentil & roasted beet salad",
                "Comforting vegetable lentil stew"
            ]
        },
        {
            "id": "f-chickpeas",
            "image": "https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Milada Vigerova / Unsplash",
            "name": "Nutty Chickpeas (Garbanzo Beans)",
            "category": "protein",
            "tags": [
                "Plant Protein",
                "Zinc",
                "Resistant Starch",
                "Hormone Care"
            ],
            "servingSize": "1 cup cooked (164g)",
            "calories": 269,
            "proteinG": 14.5,
            "carbsG": 45.0,
            "fiberG": 12.5,
            "fatG": 4.2,
            "vitaminsMinerals": [
                "Folate (71% DV)",
                "Copper (64% DV)",
                "Manganese (73% DV)",
                "Iron (26% DV)",
                "Zinc (14% DV)"
            ],
            "benefits": "Rich in resistant starch that ferments in the large intestine into butyrate, a short-chain fatty acid that strengthens gut barrier integrity.",
            "highlights": "Versatile texture that roasts into crunchy snacks or mashes into velvety Mediterranean dips.",
            "servingTip": "Toss with olive oil, smoked paprika, and sea salt, then roast at 200\u00b0C for 25 minutes for a crunchy snack.",
            "mealIdeas": [
                "Crispy roasted paprika chickpeas",
                "Homemade lemon garlic hummus",
                "Mediterranean chickpea & cucumber bowl"
            ]
        },
        {
            "id": "f-black-beans",
            "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Shelley Pauls / Unsplash",
            "name": "Black Beans & Kidney Beans",
            "category": "protein",
            "tags": [
                "Anthocyanins",
                "Plant Iron",
                "Slow Carbs",
                "Satiety"
            ],
            "servingSize": "1 cup cooked black beans (172g)",
            "calories": 227,
            "proteinG": 15.2,
            "carbsG": 40.8,
            "fiberG": 15.0,
            "fatG": 0.9,
            "vitaminsMinerals": [
                "Folate (64% DV)",
                "Magnesium (30% DV)",
                "Iron (20% DV)",
                "Thiamine B1 (28% DV)"
            ],
            "benefits": "The dark skins are rich in antioxidant anthocyanins (similar to berries) that protect arterial walls while providing steady amino acids.",
            "highlights": "Low glycemic index prevents afternoon fatigue and keeps hunger hormones balanced.",
            "servingTip": "Simmer with cumin, diced tomatoes, and garlic, then pair with brown rice or baked sweet potatoes.",
            "mealIdeas": [
                "Black bean & sweet potato nourish bowl",
                "Hearty vegetarian three-bean chili",
                "Avocado & black bean salad"
            ]
        },
        {
            "id": "f-paneer",
            "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Shashi Chaturvedula / Unsplash",
            "name": "Fresh Artisanal Paneer",
            "category": "protein",
            "tags": [
                "Casein Protein",
                "Bioavailable Calcium",
                "Phosphorus",
                "Steady Fuel"
            ],
            "servingSize": "100g fresh paneer",
            "calories": 265,
            "proteinG": 18.3,
            "carbsG": 1.2,
            "fiberG": 0.0,
            "fatG": 20.8,
            "vitaminsMinerals": [
                "Calcium (480mg, 48% DV)",
                "Phosphorus (33% DV)",
                "Vitamin A (12% DV)",
                "Riboflavin B2 (14% DV)"
            ],
            "benefits": "Slow-digesting casein protein provides a sustained release of amino acids for tissue repair, paired with bioavailable calcium for bone mineral integrity.",
            "highlights": "Naturally very low in carbohydrates with rich calcium and healthy dairy fats that encourage satiety.",
            "servingTip": "Lightly pan-sear cubes in olive oil with turmeric, ginger, and cumin, and fold into palak (spinach) or vegetable curries.",
            "mealIdeas": [
                "Pan-seared turmeric paneer cubes",
                "Classic palak paneer with baby spinach",
                "Grilled paneer and bell pepper skewers"
            ]
        },
        {
            "id": "f-tofu",
            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Vegan Liftz / Unsplash",
            "name": "Organic Firm Tofu",
            "category": "protein",
            "tags": [
                "Complete Plant Protein",
                "Isoflavones",
                "Calcium",
                "Versatile"
            ],
            "servingSize": "100g firm tofu",
            "calories": 144,
            "proteinG": 15.7,
            "carbsG": 2.8,
            "fiberG": 2.3,
            "fatG": 8.7,
            "vitaminsMinerals": [
                "Calcium (350mg, 35% DV)",
                "Iron (2.7mg, 15% DV)",
                "Manganese (54% DV)",
                "Selenium (20% DV)"
            ],
            "benefits": "Contains all 9 essential amino acids plus mild phytoestrogenic isoflavones (genistein and daidzein) that gently support hormonal receptor balance.",
            "highlights": "Calcium-set tofu provides an outstanding plant-based bone mineral boost with zero cholesterol.",
            "servingTip": "Press out moisture, cube, toss with tamari and sesame oil, and bake at 200\u00b0C for 25 minutes until golden and crisp.",
            "mealIdeas": [
                "Crispy baked sesame tofu bowl",
                "Tofu scramble with turmeric and greens",
                "Miso broth with cubed tofu and bok choy"
            ]
        },
        {
            "id": "f-salmon",
            "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Caroline Attwood / Unsplash",
            "name": "Wild Alaskan Salmon",
            "category": "protein",
            "tags": [
                "Omega-3 EPA/DHA",
                "Complete Protein",
                "Vitamin D",
                "Anti-Inflammatory"
            ],
            "servingSize": "150g fillet cooked",
            "calories": 232,
            "proteinG": 25.4,
            "carbsG": 0.0,
            "fiberG": 0.0,
            "fatG": 13.8,
            "vitaminsMinerals": [
                "Vitamin D (700 IU, 88% DV)",
                "Vitamin B12 (120% DV)",
                "Selenium (65% DV)",
                "Omega-3 Fatty Acids (2200mg)"
            ],
            "benefits": "World-class source of long-chain marine Omega-3s (EPA and DHA) that dramatically quiet cellular inflammatory pathways, alleviate period cramps, and support deep REM sleep.",
            "highlights": "Natural food source of Vitamin D3, essential for calcium assimilation and immune health.",
            "servingTip": "Pan-sear skin-side down in a hot skillet with olive oil for 4 minutes, flip gently, and finish with fresh lemon and dill.",
            "mealIdeas": [
                "Pan-seared lemon dill salmon",
                "Ginger turmeric glazed salmon bowl",
                "Flaked salmon & quinoa grain salad"
            ]
        },
        {
            "id": "f-chicken",
            "image": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Eiliv Aceron / Unsplash",
            "name": "Tender Lean Chicken Breast",
            "category": "protein",
            "tags": [
                "Lean Complete Protein",
                "Niacin B3",
                "B6",
                "Muscle Repair"
            ],
            "servingSize": "120g cooked breast",
            "calories": 198,
            "proteinG": 37.0,
            "carbsG": 0.0,
            "fiberG": 0.0,
            "fatG": 4.3,
            "vitaminsMinerals": [
                "Niacin B3 (76% DV)",
                "Vitamin B6 (42% DV)",
                "Selenium (54% DV)",
                "Phosphorus (26% DV)"
            ],
            "benefits": "High protein density per calorie, providing the raw essential branched-chain amino acids (leucine, isoleucine, valine) required for muscle tissue recovery.",
            "highlights": "Rich in B vitamins that facilitate cellular energy metabolism and reduce fatigue.",
            "servingTip": "Marinate in extra virgin olive oil, garlic, lemon juice, and oregano before grilling or baking.",
            "mealIdeas": [
                "Lemon herb grilled chicken breast",
                "Shredded chicken and vegetable soup",
                "Warm chicken, avocado, and spinach wrap"
            ]
        },
        {
            "id": "f-greek-yogurt",
            "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Sara Cervera / Unsplash",
            "name": "Authentic Greek Yogurt & Kefir",
            "category": "protein",
            "tags": [
                "Live Probiotics",
                "High Protein",
                "Bone Minerals",
                "Gut Microbiome"
            ],
            "servingSize": "1 cup plain Greek yogurt (200g)",
            "calories": 146,
            "proteinG": 20.0,
            "carbsG": 7.8,
            "fiberG": 0.0,
            "fatG": 3.8,
            "vitaminsMinerals": [
                "Calcium (230mg, 23% DV)",
                "Vitamin B12 (43% DV)",
                "Phosphorus (22% DV)",
                "Riboflavin B2 (34% DV)"
            ],
            "benefits": "Contains billions of active live probiotic cultures (Lactobacillus and Bifidobacterium) that replenish beneficial intestinal flora and optimize immune surveillance.",
            "highlights": "Delivers 20 grams of concentrated protein per serving to keep morning fullness steady for hours.",
            "servingTip": "Swirl with raw local honey, ground flaxseeds, and antioxidant-rich pomegranate arils or berries.",
            "mealIdeas": [
                "Greek yogurt & berry chia bowl",
                "Savory garlic herb yogurt dip",
                "High-protein morning smoothie base"
            ]
        },
        {
            "id": "f-hemp-seeds",
            "image": "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Maddi Bazzocco / Unsplash",
            "name": "Raw Hemp Hearts & Pumpkin Seeds",
            "category": "protein",
            "tags": [
                "Plant Complete Protein",
                "Magnesium",
                "Zinc",
                "Omega-3/6 Balance"
            ],
            "servingSize": "3 tablespoons hemp seeds (30g)",
            "calories": 166,
            "proteinG": 9.5,
            "carbsG": 2.6,
            "fiberG": 1.2,
            "fatG": 14.6,
            "vitaminsMinerals": [
                "Magnesium (210mg, 50% DV)",
                "Zinc (3mg, 28% DV)",
                "Iron (20% DV)",
                "Phosphorus (45% DV)"
            ],
            "benefits": "Contains a biologically complete plant protein profile with the ideal 3:1 ratio of Omega-6 to Omega-3 essential fatty acids. Magnesium calms nervous tension.",
            "highlights": "Abundant zinc assists enzyme synthesis, skin healing, and progesterone balance.",
            "servingTip": "Sprinkle 2 tablespoons over avocado toast, leafy green salads, or warm morning oatmeal bowls.",
            "mealIdeas": [
                "Avocado toast dusted with hemp hearts",
                "Pumpkin seed trail mix",
                "Hemp seed & berry breakfast oats"
            ]
        },
        {
            "id": "f-avocado",
            "image": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Thought Catalog / Unsplash",
            "name": "Fresh Hass Avocado",
            "category": "fats",
            "tags": [
                "Monounsaturated Fats",
                "Oleic Acid",
                "Potassium",
                "Hormone Precursor"
            ],
            "servingSize": "1/2 medium avocado (100g)",
            "calories": 160,
            "proteinG": 2.0,
            "carbsG": 8.5,
            "fiberG": 6.7,
            "fatG": 14.7,
            "vitaminsMinerals": [
                "Potassium (485mg, 10% DV)",
                "Folate (20% DV)",
                "Vitamin K (26% DV)",
                "Vitamin E (14% DV)"
            ],
            "benefits": "Monounsaturated oleic acid provides the lipid backbone necessary for steroidal hormone production while enhancing the absorption of fat-soluble vitamins (A, D, E, K).",
            "highlights": "Contains more potassium than a banana, along with almost 7 grams of prebiotic dietary fiber per half.",
            "servingTip": "Mash onto artisan sourdough with lemon, sea salt, and a soft-poached egg, or dice into leafy salads.",
            "mealIdeas": [
                "Avocado sourdough toast",
                "Creamy avocado cilantro dressing",
                "Cubed avocado & black bean salad"
            ]
        },
        {
            "id": "f-olive-oil",
            "image": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Roberta Sorge / Unsplash",
            "name": "Cold-Pressed Extra Virgin Olive Oil",
            "category": "fats",
            "tags": [
                "Oleocanthal",
                "Polyphenols",
                "Heart Health",
                "Anti-Inflammatory"
            ],
            "servingSize": "1 tablespoon (15mL)",
            "calories": 119,
            "proteinG": 0.0,
            "carbsG": 0.0,
            "fiberG": 0.0,
            "fatG": 13.5,
            "vitaminsMinerals": [
                "Vitamin E (13% DV)",
                "Vitamin K (7% DV)",
                "Oleocanthal Antioxidant"
            ],
            "benefits": "Oleocanthal acts as a natural, gentle cyclooxygenase (COX) down-regulator similar to gentle anti-inflammatory compounds, soothing cellular oxidative stress.",
            "highlights": "The cornerstone of Mediterranean wellness, supporting vascular flexibility and cellular membrane health.",
            "servingTip": "Drizzle raw over warm steamed greens, fresh grain bowls, or mix with lemon for homemade salad dressings.",
            "mealIdeas": [
                "Extra virgin olive oil & lemon vinaigrette",
                "Drizzled over warm lentil dal",
                "Herb-infused olive oil bread dip"
            ]
        },
        {
            "id": "f-walnuts",
            "image": "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Maksim Shutov / Unsplash",
            "name": "Raw Walnuts & Almonds",
            "category": "fats",
            "tags": [
                "Plant Omega-3 ALA",
                "Vitamin E",
                "Brain Health",
                "Bone Minerals"
            ],
            "servingSize": "1 ounce handful (28g)",
            "calories": 185,
            "proteinG": 4.3,
            "carbsG": 3.9,
            "fiberG": 1.9,
            "fatG": 18.5,
            "vitaminsMinerals": [
                "Copper (50% DV)",
                "Manganese (42% DV)",
                "Magnesium (11% DV)",
                "Vitamin E (25% DV for almonds)"
            ],
            "benefits": "Walnuts are among the richest nut sources of plant-based Omega-3 ALA, promoting neurovascular health, cognitive focus, and balanced mood.",
            "highlights": "Almonds deliver calcium and natural Vitamin E (alpha-tocopherol) to guard against lipid peroxidation.",
            "servingTip": "Enjoy a small palm-sized handful (25-30g) as an afternoon focus snack or fold into morning oatmeal.",
            "mealIdeas": [
                "Raw walnut & almond afternoon snack",
                "Toasted walnut beet salad",
                "Almond-crusted roasted salmon"
            ]
        },
        {
            "id": "f-chia-seeds",
            "image": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo by Maddi Bazzocco / Unsplash",
            "name": "Chia & Whole Golden Flaxseeds",
            "category": "fiber",
            "tags": [
                "Soluble Mucilage",
                "Omega-3 ALA",
                "Lignans",
                "Hormone Clearance"
            ],
            "servingSize": "2 tablespoons (24g)",
            "calories": 115,
            "proteinG": 4.0,
            "carbsG": 10.0,
            "fiberG": 8.2,
            "fatG": 7.2,
            "vitaminsMinerals": [
                "Calcium (15% DV)",
                "Magnesium (24% DV)",
                "Phosphorus (18% DV)",
                "Plant Omega-3 (4500mg)"
            ],
            "benefits": "Forms a soothing hydrophilic gel in the digestive tract that slows glucose absorption, lubricates intestinal walls, and binds used estrogen metabolites for healthy elimination.",
            "highlights": "One of the densest plant sources of anti-inflammatory Omega-3 fats and lignans on Earth.",
            "servingTip": "Stir 2 tablespoons into almond or oat milk with cinnamon and berries; let sit for 15 minutes to form pudding.",
            "mealIdeas": [
                "Overnight chia berry pudding",
                "Ground flaxseed sprinkled over oatmeal",
                "Chia lemon hydration water"
            ]
        }
    ],
    "meals": [
        {
            "id": "meal-b1",
            "image": "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "breakfast",
            "title": "Vitality Berry & Seed Oatmeal Bowl",
            "prepTime": "10 mins",
            "calories": "~380 kcal",
            "tags": [
                "Fiber-Rich",
                "Sustained Energy",
                "Plant Iron"
            ],
            "description": "Rolled whole oats cooked with almond milk, topped with antioxidant blueberries, ground flaxseed, hemp hearts, and a swirl of almond butter.",
            "ingredients": [
                "1/2 cup rolled whole oats",
                "1 cup unsweetened almond or oat milk",
                "1/2 cup fresh wild blueberries",
                "1 tbsp ground golden flaxseed",
                "1 tbsp raw hemp hearts",
                "1 tbsp stone-ground almond butter",
                "Pinch of Ceylon cinnamon"
            ],
            "instructions": [
                "Simmer rolled oats in unsweetened milk over medium heat for 5-7 minutes until creamy.",
                "Remove from heat and stir in ground flaxseed and cinnamon.",
                "Pour into your favorite breakfast bowl and top with blueberries, hemp hearts, and almond butter drizzle."
            ],
            "whyItWorks": "The beta-glucan soluble fiber in oats provides slow-burning glucose while healthy fats and seeds maintain satiety for 4+ hours without morning crashes."
        },
        {
            "id": "meal-b2",
            "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "breakfast",
            "title": "Avocado & Sourdough Sunshine Plate",
            "prepTime": "8 mins",
            "calories": "~420 kcal",
            "tags": [
                "Healthy Fats",
                "Complete Protein",
                "Choline & B12"
            ],
            "description": "Toasted artisan sourdough rubbed with garlic, mashed ripe avocado with lemon juice, two pasture-raised soft-poached eggs, and microgreens.",
            "ingredients": [
                "1 thick slice whole-grain sourdough bread",
                "1/2 ripe Hass avocado",
                "2 pasture-raised eggs",
                "1 tsp fresh lemon juice",
                "Pinch of flaky sea salt & red chili flakes",
                "Handful of fresh microgreens or baby arugula"
            ],
            "instructions": [
                "Toast sourdough until golden and crisp.",
                "Mash avocado with lemon juice and a pinch of sea salt; spread generously over toast.",
                "Gently poach or soft-boil eggs (6 minutes) and place on top.",
                "Garnish with microgreens and red pepper flakes."
            ],
            "whyItWorks": "Choline from egg yolks and potassium-rich monounsaturated fats from avocado provide ideal neurochemical fuel for sustained morning focus."
        },
        {
            "id": "meal-b3",
            "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "breakfast",
            "title": "High-Protein Greek Yogurt & Chia Parfait",
            "prepTime": "5 mins",
            "calories": "~340 kcal",
            "tags": [
                "22g Protein",
                "Probiotics",
                "Bone Minerals"
            ],
            "description": "Thick unsweetened Greek yogurt layered with chia seed pudding, fresh pomegranate arils, sliced almonds, and a drizzle of raw honey.",
            "ingredients": [
                "3/4 cup plain Greek yogurt (or coconut yogurt)",
                "2 tbsp chia seeds soaked in 1/4 cup almond milk",
                "2 tbsp ruby pomegranate arils",
                "1 tbsp toasted sliced almonds",
                "1 tsp raw honey or pure maple syrup"
            ],
            "instructions": [
                "In a wide glass or bowl, spoon half of the Greek yogurt as the base layer.",
                "Add the pre-soaked chia seed pudding layer.",
                "Top with remaining yogurt, pomegranate arils, almonds, and honey."
            ],
            "whyItWorks": "Live probiotic cultures replenish beneficial gut microbes while delivering over 20g of bioavailable casein and whey proteins."
        },
        {
            "id": "meal-b4",
            "image": "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "breakfast",
            "title": "Warm Spiced Apple & Quinoa Porridge",
            "prepTime": "12 mins",
            "calories": "~390 kcal",
            "tags": [
                "Gluten-Free",
                "Plant Iron",
                "Comforting Warmth"
            ],
            "description": "Fluffy cooked quinoa simmered in warm spiced milk with diced saut\u00e9ed apples, crushed walnuts, and pumpkin seeds.",
            "ingredients": [
                "3/4 cup cooked fluffy quinoa",
                "1/2 cup warm unsweetened milk",
                "1 small apple, diced and lightly saut\u00e9ed in coconut oil",
                "1 tbsp raw chopped walnuts",
                "1 tbsp pumpkin seeds",
                "1/4 tsp ground cardamom & cinnamon"
            ],
            "instructions": [
                "Warm cooked quinoa in milk with cardamom and cinnamon for 3 minutes.",
                "Lightly saut\u00e9 diced apples in a pan until tender and fragrant.",
                "Combine warm quinoa in a bowl, top with warm apples, walnuts, and pumpkin seeds."
            ],
            "whyItWorks": "Quinoa supplies a complete amino acid profile, paired with apple pectin fiber and calming cardamom for digestive comfort."
        },
        {
            "id": "meal-l1",
            "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "lunch",
            "title": "Mediterranean Quinoa & Chickpea Bowl",
            "prepTime": "15 mins",
            "calories": "~490 kcal",
            "tags": [
                "Plant Protein",
                "Iron-Rich",
                "Digestive Ease"
            ],
            "description": "Fluffy quinoa tossed with crisp diced cucumbers, cherry tomatoes, spiced chickpeas, Kalamata olives, fresh parsley, and extra virgin olive oil.",
            "ingredients": [
                "3/4 cup cooked quinoa",
                "1/2 cup roasted spiced chickpeas",
                "1/2 cup diced cucumbers & cherry tomatoes",
                "2 tbsp Kalamata olives, pitted",
                "2 tbsp fresh chopped flat-leaf parsley",
                "1 tbsp extra virgin olive oil",
                "1 tbsp lemon tahini drizzle"
            ],
            "instructions": [
                "Arrange cooked quinoa as the base in a wide bowl.",
                "Top with spiced chickpeas, cucumbers, tomatoes, and olives.",
                "Whisk tahini, lemon juice, olive oil, and 1 tbsp water into a dressing.",
                "Drizzle over bowl and garnish with fresh parsley."
            ],
            "whyItWorks": "Complete plant amino acids combined with Vitamin C from tomatoes ensures optimal non-heme iron absorption."
        },
        {
            "id": "meal-l2",
            "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "lunch",
            "title": "Warm Lentil & Roasted Beet Plate",
            "prepTime": "20 mins",
            "calories": "~450 kcal",
            "tags": [
                "Iron Booster",
                "Liver Support",
                "Nitric Oxide"
            ],
            "description": "French green lentils served warm over tender roasted baby beets, tossed with baby spinach, crumbled sheep feta or goat cheese, and toasted walnuts.",
            "ingredients": [
                "3/4 cup cooked French green lentils",
                "1 medium roasted beet, diced",
                "2 cups fresh baby spinach leaves",
                "2 tbsp crumbled feta or goat cheese",
                "2 tbsp toasted chopped walnuts",
                "1 tbsp balsamic glaze & olive oil"
            ],
            "instructions": [
                "Warm cooked lentils in a pan and fold in baby spinach until just slightly wilted.",
                "Transfer to a plate and arrange roasted beet cubes over top.",
                "Crumble goat cheese or feta over the warm lentils.",
                "Sprinkle with toasted walnuts and drizzle with balsamic glaze."
            ],
            "whyItWorks": "Beet nitrates enhance blood vessel dilation while iron-rich lentils restore energy levels without heavy sluggishness."
        },
        {
            "id": "meal-l3",
            "image": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "lunch",
            "title": "Rainbow Tofu & Edamame Crunch Wrap",
            "prepTime": "12 mins",
            "calories": "~430 kcal",
            "tags": [
                "Plant Protein",
                "Colorful Fiber",
                "Isoflavones"
            ],
            "description": "Whole grain wrap stuffed with crisp baked tofu, steamed shelled edamame, shredded purple cabbage, grated carrots, and peanut lime sauce.",
            "ingredients": [
                "1 large whole-grain or sprouted tortilla",
                "100g baked firm tofu strips",
                "1/4 cup shelled edamame beans",
                "1/2 cup shredded purple cabbage",
                "1/3 cup grated carrots",
                "1.5 tbsp peanut lime dressing (peanut butter, lime, tamari)"
            ],
            "instructions": [
                "Warm tortilla lightly on a dry skillet for 20 seconds.",
                "Spread peanut lime sauce down the center.",
                "Layer purple cabbage, carrots, tofu strips, and edamame.",
                "Roll tightly, tucking in sides, and slice diagonally."
            ],
            "whyItWorks": "Delivers over 20g of clean plant protein and anti-inflammatory anthocyanins from purple cabbage."
        },
        {
            "id": "meal-l4",
            "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "lunch",
            "title": "Lemon Herb Salmon & Brown Rice Bowl",
            "prepTime": "18 mins",
            "calories": "~510 kcal",
            "tags": [
                "Omega-3 Rich",
                "High Protein",
                "Whole Grains"
            ],
            "description": "Pan-seared wild salmon fillet over warm jasmine brown rice, accompanied by steamed broccoli florets and lemon herb olive oil.",
            "ingredients": [
                "130g wild salmon fillet",
                "3/4 cup cooked jasmine brown rice",
                "1 cup steamed broccoli florets",
                "1 tbsp extra virgin olive oil",
                "Juice of 1/2 lemon & fresh dill",
                "Pinch of sea salt"
            ],
            "instructions": [
                "Pan-sear salmon in olive oil for 4 minutes per side until flaky.",
                "Steam broccoli for 3 minutes until vibrant emerald green.",
                "Assemble brown rice, steamed broccoli, and salmon in a bowl.",
                "Squeeze fresh lemon juice over everything and sprinkle with fresh dill."
            ],
            "whyItWorks": "Potent marine EPA/DHA Omega-3 fats combat inflammation while cruciferous broccoli assists hepatic hormone balance."
        },
        {
            "id": "meal-d1",
            "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "dinner",
            "title": "Ginger Turmeric Salmon or Tofu with Greens",
            "prepTime": "25 mins",
            "calories": "~520 kcal",
            "tags": [
                "Omega-3 Anti-Inflammatory",
                "High Protein",
                "Hormone Care"
            ],
            "description": "Pan-seared wild salmon fillet (or pressed organic tofu) glazed with freshly grated ginger, raw honey, and turmeric, served over jasmine brown rice and steamed sesame broccoli.",
            "ingredients": [
                "150g wild salmon fillet or firm organic tofu",
                "1 cup steamed broccoli florets",
                "1/2 cup cooked brown rice",
                "1 tbsp grated fresh ginger root",
                "1 tsp ground turmeric & sesame oil",
                "1 tsp raw honey & coconut aminos"
            ],
            "instructions": [
                "Whisk ginger, turmeric, honey, and coconut aminos into a glaze.",
                "Brush glaze over salmon or tofu and sear in skillet for 4-5 minutes per side.",
                "Steam broccoli florets until tender-crisp.",
                "Serve over warm brown rice with a drizzle of toasted sesame oil."
            ],
            "whyItWorks": "Curcumin in turmeric and gingerols soothe muscular soreness and period cramps while omega-3s promote restorative sleep."
        },
        {
            "id": "meal-d2",
            "image": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "dinner",
            "title": "Sweet Potato & Black Bean Nourish Pot",
            "prepTime": "25 mins",
            "calories": "~460 kcal",
            "tags": [
                "Magnesium-Rich",
                "Gut Friendly",
                "Comforting"
            ],
            "description": "Caramelized roasted sweet potato cubes simmered with black beans, sweet corn, baby spinach, cumin, and mild roasted poblanos, topped with creamy avocado.",
            "ingredients": [
                "1 medium cubed sweet potato",
                "3/4 cup cooked black beans",
                "1 cup baby spinach wilted in",
                "1/4 ripe avocado, sliced",
                "1/2 tsp ground cumin, coriander & sea salt",
                "Squeeze of fresh lime juice"
            ],
            "instructions": [
                "Roast cubed sweet potatoes at 200\u00b0C for 20 minutes until tender and caramelized.",
                "In a pot, warm black beans with cumin, coriander, and 2 tbsp water.",
                "Stir in spinach until gently wilted.",
                "Transfer to bowl, top with roasted sweet potatoes, sliced avocado, and lime."
            ],
            "whyItWorks": "Magnesium and complex carbohydrates support evening serotonin release to prepare the nervous system for deep restorative rest."
        },
        {
            "id": "meal-d3",
            "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "dinner",
            "title": "Comforting Red Lentil Dal with Wilted Spinach",
            "prepTime": "22 mins",
            "calories": "~440 kcal",
            "tags": [
                "Plant Iron",
                "Warming Spices",
                "Easy Digestion"
            ],
            "description": "Creamy split red lentils simmered with coconut milk, fresh ginger, garlic, cumin, and coriander, folded with tender baby spinach.",
            "ingredients": [
                "3/4 cup split red lentils, rinsed",
                "1/3 cup light coconut milk",
                "2 cups water or vegetable broth",
                "2 cups fresh baby spinach",
                "1 tbsp grated ginger & 2 cloves minced garlic",
                "1 tsp cumin, turmeric, and sea salt"
            ],
            "instructions": [
                "Saut\u00e9 garlic and ginger in 1 tsp olive oil for 1 minute.",
                "Add red lentils, broth, turmeric, and cumin; bring to a boil, then simmer for 15 minutes.",
                "Stir in coconut milk and fold in baby spinach until wilted.",
                "Serve warm with a squeeze of fresh lemon."
            ],
            "whyItWorks": "Split red lentils break down into a comforting, highly digestible source of protein and plant iron that is gentle on evening digestion."
        },
        {
            "id": "meal-d4",
            "image": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "dinner",
            "title": "Herb-Roasted Chicken & Colorful Root Vegetables",
            "prepTime": "30 mins",
            "calories": "~490 kcal",
            "tags": [
                "Lean Protein",
                "Carotenoids",
                "Nourishing Dinner"
            ],
            "description": "Juicy chicken breast roasted with rosemary and thyme alongside rainbow carrots, sweet potato wedges, and zucchini ribbons.",
            "ingredients": [
                "130g chicken breast",
                "1 medium carrot & 1/2 sweet potato, wedged",
                "1/2 zucchini, sliced into rounds",
                "1 tbsp extra virgin olive oil",
                "1 tsp fresh rosemary & thyme",
                "Pinch of garlic powder and sea salt"
            ],
            "instructions": [
                "Toss carrots, sweet potatoes, and zucchini in olive oil, herbs, and sea salt.",
                "Spread on baking sheet alongside seasoned chicken breast.",
                "Roast at 190\u00b0C (375\u00b0F) for 25-28 minutes until chicken is cooked through and vegetables are tender.",
                "Let chicken rest 5 minutes before slicing and serving."
            ],
            "whyItWorks": "A complete whole-food plate balancing 35g+ of lean muscle-repairing protein with colorful vitamin-dense root carbohydrates."
        },
        {
            "id": "meal-s1",
            "image": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "snack",
            "title": "Apple Slices with Creamy Almond Butter & Chia",
            "prepTime": "3 mins",
            "calories": "~210 kcal",
            "tags": [
                "Quick Energy",
                "Pectin Fiber",
                "Healthy Fats"
            ],
            "description": "Crisp honeycrisp or green apple slices dipped in stone-ground almond butter and dusted with chia seeds and cinnamon.",
            "ingredients": [
                "1 crisp organic apple, sliced",
                "1.5 tbsp stone-ground almond butter",
                "1 tsp chia seeds",
                "Pinch of Ceylon cinnamon"
            ],
            "instructions": [
                "Core and slice apple into wedges.",
                "Place almond butter in small ramekin, dust with cinnamon and chia seeds.",
                "Dip and enjoy immediately."
            ],
            "whyItWorks": "Apple pectin fiber combined with healthy fats from almonds stabilizes blood glucose and curtails mid-afternoon sugar cravings."
        },
        {
            "id": "meal-s2",
            "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "snack",
            "title": "Golden Turmeric Latte (Moon Milk)",
            "prepTime": "5 mins",
            "calories": "~120 kcal",
            "tags": [
                "Calming",
                "Anti-Inflammatory",
                "Caffeine-Free"
            ],
            "description": "Warmed oat or almond milk whisked with organic turmeric, cinnamon, ground ginger, a drop of pure vanilla, and a hint of raw honey.",
            "ingredients": [
                "1 cup unsweetened warm almond or oat milk",
                "1/2 tsp ground turmeric",
                "1/4 tsp ground cinnamon & pinch of ginger",
                "Pinch of black pepper (enhances turmeric absorption by 2000%)",
                "1 tsp raw honey"
            ],
            "instructions": [
                "Gently warm milk in a small saucepan over low heat.",
                "Whisk in turmeric, cinnamon, ginger, black pepper, and honey until frothy.",
                "Pour into a warm mug and sip mindfully before bedtime."
            ],
            "whyItWorks": "Curcumin combined with soothing warm fluids relaxes smooth muscle tension and prepares your nervous system for restful sleep."
        },
        {
            "id": "meal-s3",
            "image": "https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "snack",
            "title": "Roasted Crunchy Garlic Chickpeas",
            "prepTime": "25 mins",
            "calories": "~180 kcal",
            "tags": [
                "High Fiber",
                "Savory Crunch",
                "Plant Zinc"
            ],
            "description": "Spiced whole chickpeas roasted until delightfully crisp with olive oil, smoked paprika, garlic, and sea salt.",
            "ingredients": [
                "1 cup cooked chickpeas, patted completely dry",
                "1 tsp extra virgin olive oil",
                "1/2 tsp smoked paprika & garlic powder",
                "1/4 tsp sea salt"
            ],
            "instructions": [
                "Pat chickpeas thoroughly dry with a paper towel (critical for crunchiness).",
                "Toss with olive oil, paprika, garlic powder, and salt.",
                "Roast on a baking sheet at 200\u00b0C for 22-25 minutes, shaking pan halfway.",
                "Let cool completely to achieve maximum crunch."
            ],
            "whyItWorks": "Delivers 7g of protein and 6g of fiber in a savory, crunchy whole-food format that replaces processed chips."
        },
        {
            "id": "meal-s4",
            "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "snack",
            "title": "Cucumber Batons with Herbed Tahini Dip",
            "prepTime": "4 mins",
            "calories": "~150 kcal",
            "tags": [
                "Hydrating",
                "Calcium-Rich",
                "Cooling"
            ],
            "description": "Crisp cucumber batons and sweet bell pepper slices served with a creamy lemon, garlic, and tahini dip.",
            "ingredients": [
                "1 medium garden cucumber, cut into spears",
                "1/2 red bell pepper, sliced into strips",
                "2 tbsp sesame tahini",
                "1 tbsp fresh lemon juice",
                "1 tbsp warm water to thin",
                "Pinch of garlic powder and sea salt"
            ],
            "instructions": [
                "Whisk tahini, lemon juice, warm water, garlic, and salt until smooth and creamy.",
                "Arrange cucumber and bell pepper batons on a plate with the tahini dip."
            ],
            "whyItWorks": "Sesame tahini is an outstanding source of non-dairy calcium, while crisp cucumbers replenish intracellular water."
        },
        {
            "id": "meal-q1",
            "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "quick",
            "title": "10-Minute Stir-Fried Greens & Scrambled Eggs",
            "prepTime": "10 mins",
            "calories": "~310 kcal",
            "tags": [
                "Fast & Simple",
                "High Protein",
                "Iron Booster"
            ],
            "description": "Soft scrambled pasture-raised eggs served alongside flash-saut\u00e9ed baby spinach, cherry tomatoes, and garlic olive oil.",
            "ingredients": [
                "2 pasture-raised eggs, whisked",
                "2 cups baby spinach",
                "6 cherry tomatoes, halved",
                "1 tsp extra virgin olive oil",
                "Pinch of sea salt and black pepper"
            ],
            "instructions": [
                "Heat olive oil in a skillet over medium heat.",
                "Add tomatoes and spinach, tossing for 2 minutes until wilted; push to side of pan.",
                "Pour in whisked eggs and gently fold for 90 seconds until soft curds form.",
                "Transfer to plate and season with salt and pepper."
            ],
            "whyItWorks": "Ready in under 10 minutes, providing 14g of complete protein, bioavailable iron, and Vitamin C with minimal cleanup."
        },
        {
            "id": "meal-q2",
            "image": "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "quick",
            "title": "Quick Avocado Chickpea Mash Toast",
            "prepTime": "7 mins",
            "calories": "~350 kcal",
            "tags": [
                "Plant Protein",
                "Healthy Fats",
                "100% Vegan"
            ],
            "description": "Mashed canned chickpeas and ripe avocado seasoned with lemon juice, cumin, and sea salt atop toasted whole grain sourdough.",
            "ingredients": [
                "1 slice toasted whole-grain sourdough",
                "1/3 cup rinsed cooked chickpeas",
                "1/3 ripe avocado",
                "1 tsp fresh lemon juice",
                "Pinch of cumin, salt, and chili flakes"
            ],
            "instructions": [
                "In a shallow bowl, mash chickpeas and avocado together with a fork.",
                "Stir in lemon juice, cumin, and salt.",
                "Spread over warm toasted sourdough and finish with chili flakes."
            ],
            "whyItWorks": "No cooking required. Combines healthy monounsaturated fats with filling legume fiber for instant sustained vitality."
        },
        {
            "id": "meal-q3",
            "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "quick",
            "title": "5-Minute Green Energy Blender Smoothie",
            "prepTime": "5 mins",
            "calories": "~280 kcal",
            "tags": [
                "Fast Nourishment",
                "Liquid Hydration",
                "Chlorophyll"
            ],
            "description": "A velvety blend of baby spinach, frozen banana, chia seeds, unsweetened almond milk, and a scoop of plant protein.",
            "ingredients": [
                "1.5 cups fresh baby spinach",
                "1 frozen ripe banana",
                "1 tbsp chia seeds",
                "1 cup unsweetened almond milk",
                "1 tbsp almond butter or plant protein powder"
            ],
            "instructions": [
                "Add almond milk and spinach to blender first and blend for 20 seconds.",
                "Add frozen banana, chia seeds, and almond butter.",
                "Blend on high until completely silky green and pour into a glass."
            ],
            "whyItWorks": "Effortless cellular nutrition when you're short on time, supplying electrolytes, natural glycogen, and clean greens."
        },
        {
            "id": "meal-q4",
            "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
            "attribution": "Photo via Unsplash",
            "type": "quick",
            "title": "Warming Miso & Veggie Broth with Poached Egg",
            "prepTime": "8 mins",
            "calories": "~220 kcal",
            "tags": [
                "Gut Prebiotics",
                "Warm & Comforting",
                "Hydrating"
            ],
            "description": "Fermented organic miso broth with cubed firm tofu, baby spinach, green onions, and a soft-poached egg.",
            "ingredients": [
                "1.5 cups warm water or light vegetable broth",
                "1 tbsp organic white or red miso paste",
                "1/2 cup cubed firm tofu",
                "1 cup fresh baby spinach",
                "1 poached or soft-boiled egg",
                "1 chopped green scallion"
            ],
            "instructions": [
                "Warm broth in a small pot; dissolve miso paste in 2 tbsp warm broth first, then stir back in (do not boil miso).",
                "Add tofu cubes and baby spinach, allowing spinach to wilt for 60 seconds.",
                "Pour into a bowl, gently nestle soft egg on top, and sprinkle with scallions."
            ],
            "whyItWorks": "Gentle fermented probiotics nourish the microbiome while warm fluid and bioavailable egg protein deeply soothe an overstimulated nervous system."
        }
    ],
    "balancedPlate": {
        "headline": "The Balanced Plate Blueprint",
        "subtitle": "A sustainable, joyful framework for whole-food nourishment without calorie-counting or restriction.",
        "pillars": [
            {
                "name": "1/2 Plate: Colorful Vegetables & Fruits",
                "share": "50%",
                "color": "#10b981",
                "desc": "Fiber, phytonutrients, vitamins, and digestive enzymes that nourish the microbiome, buffer blood glucose, and support hepatic elimination."
            },
            {
                "name": "1/4 Plate: Quality Clean Protein",
                "share": "25%",
                "color": "#0d9488",
                "desc": "Complete amino acids for muscle repair, enzyme production, neurotransmitter balance, and long-lasting satiety (e.g. eggs, lentils, fish, tofu, paneer)."
            },
            {
                "name": "1/4 Plate: Complex Carbs & Whole Grains",
                "share": "25%",
                "color": "#f59e0b",
                "desc": "Slow-digesting fuel sources that sustain adrenal stability, brain glycogen, and thyroid function (e.g. sweet potatoes, brown rice, oats, quinoa)."
            },
            {
                "name": "1\u20132 Tbsp: Healthy Essential Fats",
                "share": "Bonus",
                "color": "#8b5cf6",
                "desc": "The raw building blocks for hormone synthesis and fat-soluble vitamin absorption (e.g. avocado, extra virgin olive oil, nuts, seeds)."
            },
            {
                "name": "Intracellular Hydration",
                "share": "Essential",
                "color": "#0284c7",
                "desc": "250\u2013500 mL water or mineral-rich herbal infusion alongside meals to support digestive fluid secretion and cellular vitality."
            }
        ]
    },
    "womensHealth": {
        "headline": "Women's Health & Cycle-Aware Nutrition",
        "disclaimer": "Educational guide only. Not intended to diagnose, treat, or replace professional medical care.",
        "topics": [
            {
                "title": "Iron Replenishment & Energy Resilience",
                "icon": "iron",
                "summary": "During monthly menstruation, the body loses between 15\u201340 mg of iron. Low iron stores can cause fatigue, brain fog, cold extremities, and brittle nails.",
                "keyPoints": [
                    "Pair plant-based non-heme iron (spinach, lentils, seeds) with Vitamin C (citrus, tomatoes, peppers) to increase absorption up to 300%.",
                    "Avoid drinking strong black tea or coffee immediately with iron-rich meals, as tannins can inhibit mineral uptake.",
                    "Incorporate warming iron boosters like lentil dal, pumpkin seeds, and dark leafy greens during and right after your period."
                ]
            },
            {
                "title": "Calcium & Vitamin D Synergy for Bone Density",
                "icon": "calcium",
                "summary": "Peak bone mineral density is built and preserved through proper calcium intake paired with synergistic Vitamin D3 and Vitamin K2.",
                "keyPoints": [
                    "Enjoy diverse calcium sources: fresh paneer, Greek yogurt, calcium-set tofu, sesame tahini, almonds, and steamed broccoli.",
                    "Safe, regular 15-minute daylight exposure supports endogenous Vitamin D synthesis, which triggers intestinal calcium transporters.",
                    "Weight-bearing movement (like bodyweight squats) works synergistically with dietary calcium to stimulate bone remodeling."
                ]
            },
            {
                "title": "Cycle-Synced Nutritional Wisdom",
                "icon": "cycle",
                "summary": "Hormones fluctuate across your 28-day rhythm. Aligning meals with your internal biological phases supports steady vitality.",
                "keyPoints": [
                    "Menstrual Phase (Days 1\u20135): Hormones at baseline. Prioritize warm, mineral-rich broths, iron-dense stews, and gentle hydration.",
                    "Follicular Phase (Days 6\u201312): Rising estrogen boosts energy and insulin sensitivity. Enjoy vibrant raw salads, fermented foods, and sprouted grains.",
                    "Ovulatory Phase (Days 13\u201316): Estrogen peaks. Emphasize cruciferous vegetables (broccoli, cabbage) and soluble fiber to naturally metabolize excess estrogen.",
                    "Luteal Phase (Days 17\u201328): Progesterone increases metabolic rate. Nourish with slow complex carbs (sweet potatoes), magnesium (pumpkin seeds, cacao), and calming warm teas."
                ]
            },
            {
                "title": "Electrolyte Hydration for Cramp & Bloat Ease",
                "icon": "hydration",
                "summary": "Water retention during PMS is often caused by an imbalance between sodium and potassium, not by drinking 'too much' water.",
                "keyPoints": [
                    "Drink 2,000\u20132,500 mL of clean fluid daily. When fluid is restricted, the body triggers aldosterone to retain water.",
                    "Eat potassium-rich foods (bananas, avocados, sweet potatoes, coconut water) to flush excess intracellular sodium.",
                    "Enjoy natural diuretic and soothing herbal teas like peppermint, ginger, and chamomile."
                ]
            }
        ]
    },
    "nutritionPhilosophy": {
        "headline": "Nourishment Over Restriction",
        "text": "At Life Haven, we reject extreme, one-size-fits-all medical diets. True wellness is about honoring your bio-individuality, eating colorful whole foods, listening to your hunger and fullness cues, and giving your cells the raw vitamins, minerals, and hydration they need to thrive every single day."
    }
},

  // 6. Balanced Workouts (Expanded Library with 23 Routines & Form Tutorials)
  workouts: [
    {
        "id": "w-beg-fullbody",
        "image": "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Standing shoulder rolls, hip circles, gentle marching in place, cat-cow stretches.",
        "cooldown": "5 minutes \u2014 Seated forward fold, gentle child's pose, deep diaphragmatic belly breathing.",
        "exercises": [
            {
                "id": "ex-squat-bw",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Shoulder-width stance, tall chest, engaged core",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Parallel depth, knees tracking over toes, heel drive",
                "attribution": "Photo via Unsplash License",
                "name": "Bodyweight Squat",
                "targetArea": "Lower Body (Quadriceps, Glutes, Hamstrings)",
                "difficulty": "Beginner",
                "equipment": "Bodyweight",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "45 sec",
                "instructions": [
                    "Stand with feet approximately shoulder-width apart, toes turned outward 15 degrees.",
                    "Keep your chest comfortably upright, eyes forward, and brace your core.",
                    "Inhale as you bend your hips and knees simultaneously, lowering yourself as if sitting into an invisible chair.",
                    "Lower until your thighs are parallel to the floor, ensuring knees track in line with your feet.",
                    "Exhale and push firmly through your mid-foot and heels to return to standing."
                ],
                "properForm": "Keep heels planted flat on the floor throughout. Maintain an upright chest and neutral spine.",
                "commonMistakes": [
                    "Knees collapsing inward (valgus collapse)",
                    "Rounding the back or collapsing chest forward",
                    "Rising onto toes instead of staying balanced on heels",
                    "Dropping too quickly without control"
                ],
                "modification": "Use a sturdy chair for sit-to-stand support.",
                "progression": "Hold a 2-second pause at the bottom or hold a light dumbbell at your chest (Goblet Squat).",
                "visualKey": "squat"
            },
            {
                "id": "ex-wall-pushup",
                "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Arms extended, straight line from heels to crown",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Incline lower, elbows 45 degrees, chest to surface",
                "attribution": "Photo via Unsplash License",
                "name": "Wall / Incline Push-Up",
                "targetArea": "Upper Body (Pectorals, Anterior Deltoids, Triceps, Core)",
                "difficulty": "Beginner",
                "equipment": "Wall or Kitchen Countertop",
                "sets": 3,
                "reps": "8-10 reps",
                "rest": "45 sec",
                "instructions": [
                    "Stand an arm's length away from a solid wall or sturdy countertop.",
                    "Place palms flat against the surface at shoulder height, slightly wider than shoulder-width.",
                    "Brace core and glutes so body forms a straight line from heels to head.",
                    "Bend elbows to lower chest toward the surface in a smooth 2-second count.",
                    "Keep elbows angled back at roughly 45 degrees (arrow shape, not T-shape).",
                    "Press firmly through palms to return to the starting position."
                ],
                "properForm": "Keep neck relaxed and spine rigid; avoid letting belly or lower back sag.",
                "commonMistakes": [
                    "Flaring elbows wide out to the sides at 90 degrees",
                    "Arching lower back and sagging belly forward",
                    "Shrugging shoulders into the ears"
                ],
                "modification": "Step feet closer to the wall to decrease the angle and reduce resistance.",
                "progression": "Lower your hands to a sturdy countertop, bench, or move to knee push-ups on the mat.",
                "visualKey": "pushup"
            },
            {
                "id": "ex-glute-bridge",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, knees bent 90°, feet flat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hip extension, glute squeeze, neutral lumbar spine",
                "attribution": "Photo via Unsplash License",
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
                    "Drive through your heels to lift your hips until knees, hips, and shoulders form a diagonal line.",
                    "Squeeze your glutes firmly at the top for 2 seconds, then slowly lower back down."
                ],
                "properForm": "Avoid over-arching the lower back at the top; the extension must come purely from the glutes.",
                "commonMistakes": [
                    "Arching lower back excessively rather than squeezing glutes",
                    "Pushing through toes instead of heels",
                    "Letting knees splay outward or knock inward"
                ],
                "modification": "Shorten range of motion or rest a light pillow under the lower back.",
                "progression": "Single-Leg Glute Bridge or place a mini-loop resistance band above knees.",
                "visualKey": "bridge"
            },
            {
                "id": "ex-bird-dog",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Quadruped tabletop, wrists below shoulders, knees under hips",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Opposite arm and leg reach, level pelvis, active glute",
                "attribution": "Photo via Unsplash License",
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
                    "Hold for 2 seconds at hip and shoulder height without tilting pelvis.",
                    "Return to all fours with control and switch sides."
                ],
                "properForm": "Imagine balancing a glass of water on your lower back; hips must remain level and square.",
                "commonMistakes": [
                    "Rotating pelvis open to lift leg too high",
                    "Sagging belly toward the floor",
                    "Looking up and hyperextending neck"
                ],
                "modification": "Perform the arm reach alone, then the leg reach alone, before combining them.",
                "progression": "Hold for 4 seconds at peak extension and tap elbow to opposite knee under torso between reps.",
                "visualKey": "bird_dog"
            },
            {
                "id": "ex-march",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Athletic upright posture, shoulders relaxed",
                "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Alternating 90° knee lift, reciprocal arm drive",
                "attribution": "Photo via Unsplash License",
                "name": "Standing March in Place",
                "targetArea": "Cardiovascular, Hip Flexors, Calves, Balance",
                "difficulty": "Beginner",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "30-40 sec",
                "rest": "30 sec",
                "instructions": [
                    "Stand tall with feet hip-width apart and posture elongated.",
                    "Lift right knee toward hip level while swinging left arm forward.",
                    "Lower right foot softly and immediately lift left knee, swinging right arm.",
                    "Maintain a steady, rhythmic breathing pattern."
                ],
                "properForm": "Keep core braced and chest tall so torso does not lean backward as knees lift.",
                "commonMistakes": [
                    "Leaning backwards as knees lift",
                    "Stamping feet down heavily on floor",
                    "Holding breath"
                ],
                "modification": "Hold a chair with one hand for balance support.",
                "progression": "Add overhead reach or increase speed into a gentle jog.",
                "visualKey": "march"
            }
        ],
        "instructions": [
            "Bodyweight Squat \u2014 3 sets of 10 controlled reps. Focus on chest up and heels planted.",
            "Wall / Incline Push-Up \u2014 3 sets of 8 reps. Keep core tight and elbows at 45 degrees.",
            "Glute Bridge \u2014 3 sets of 12 reps with 2-second pause at the peak.",
            "Quadruped Bird Dog \u2014 3 sets of 8 reps per side focusing on hip stability.",
            "Standing March in Place \u2014 3 sets of 30 seconds for gentle stamina."
        ]
    },
    {
        "id": "w-beg-cardio",
        "image": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Gentle ankle rotations, side-to-side weight shifts, arm sweeps with deep inhales.",
        "cooldown": "5 minutes \u2014 Slow arm reaches, standing calf stretch, chest opening stretch.",
        "exercises": [
            {
                "id": "ex-march",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Athletic upright posture, shoulders relaxed",
                "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Alternating 90° knee lift, reciprocal arm drive",
                "attribution": "Photo via Unsplash License",
                "name": "Standing March in Place",
                "targetArea": "Cardiovascular, Hip Flexors, Calves, Balance",
                "difficulty": "Beginner",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "30-40 sec",
                "rest": "30 sec",
                "instructions": [
                    "Stand tall with feet hip-width apart and posture elongated.",
                    "Lift right knee toward hip level while swinging left arm forward.",
                    "Lower right foot softly and immediately lift left knee, swinging right arm.",
                    "Maintain a steady, rhythmic breathing pattern."
                ],
                "properForm": "Keep core braced and chest tall so torso does not lean backward as knees lift.",
                "commonMistakes": [
                    "Leaning backwards as knees lift",
                    "Stamping feet down heavily on floor",
                    "Holding breath"
                ],
                "modification": "Hold a chair with one hand for balance support.",
                "progression": "Add overhead reach or increase speed into a gentle jog.",
                "visualKey": "march"
            },
            {
                "id": "ex-step-jack",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Feet together, arms by your sides",
                "stageEndImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lateral toe tap, overhead arm arc, zero joint impact",
                "attribution": "Photo via Unsplash License",
                "name": "Low-Impact Step Jack",
                "targetArea": "Cardiovascular (Aerobic Heart Rate, Shoulders, Calves)",
                "difficulty": "Beginner",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "40 sec",
                "rest": "20 sec",
                "instructions": [
                    "Stand with feet together and arms relaxed by sides.",
                    "Step right foot out to the side while sweeping both arms overhead.",
                    "Step right foot back to center while lowering arms.",
                    "Step left foot out to the side while sweeping arms overhead.",
                    "Continue in a rhythmic, continuous flow."
                ],
                "properForm": "Land softly on balls of feet with a soft micro-bend in knees to absorb impact.",
                "commonMistakes": [
                    "Stiff-legged landing",
                    "Shortening the arm range of motion",
                    "Shrugging shoulders"
                ],
                "modification": "Raise arms only to shoulder height.",
                "progression": "Increase cadence or perform standard jumping jacks.",
                "visualKey": "jack"
            },
            {
                "id": "ex-assisted-lunge",
                "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hand light on wall/chair, feet hip-width apart",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Step back, double 90° knee angle, front heel drive",
                "attribution": "Photo via Unsplash License",
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
                    "Ensure front knee stays directly above ankle and back knee hovers just above the mat.",
                    "Press firmly through front heel to step back to standing, then repeat."
                ],
                "properForm": "Keep torso tall and vertical; avoid leaning excessively over the front thigh.",
                "commonMistakes": [
                    "Front knee driving far past the toes",
                    "Stepping feet on a tightrope (keep them hip-width apart for stability)",
                    "Dropping back knee forcefully onto the floor"
                ],
                "modification": "Reduce the depth of the lunge into a shallow split stance.",
                "progression": "Remove hand support for a free-standing reverse lunge, or hold light dumbbells.",
                "visualKey": "lunge"
            },
            {
                "id": "ex-clamshells",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Side-lying, knees bent 45°, feet stacked together",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Top knee rotates upward, feet remain touching, pelvis stable",
                "attribution": "Photo via Unsplash License",
                "name": "Side-Lying Clamshells",
                "targetArea": "Hip & Glutes (Gluteus Medius, Pelvic Stabilizers)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 3,
                "reps": "12-15 reps per side",
                "rest": "30 sec",
                "instructions": [
                    "Lie on your side with head supported by your lower arm.",
                    "Stack your hips, knees, and ankles at a 45-degree bend.",
                    "Keeping your feet glued together, slowly raise your top knee as high as possible without rolling your hips backward.",
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
            }
        ],
        "instructions": [
            "Standing March with Arm Reach \u2014 3 rounds of 40 seconds on, 20 seconds rest.",
            "Low-Impact Step Jack \u2014 3 rounds of 40 seconds on, 20 seconds rest.",
            "Supported Reverse Lunge \u2014 3 sets of 8 reps per leg with smooth control.",
            "Side-Lying Clamshells \u2014 3 sets of 12 reps per side targeting glute stabilizers."
        ]
    },
    {
        "id": "w-beg-strength",
        "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Arm circles, torso twists, wrist rolls, gentle unweighted squats.",
        "cooldown": "5 minutes \u2014 Standing quad stretch, cross-body shoulder stretch, neck release.",
        "exercises": [
            {
                "id": "ex-squat-bw",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Shoulder-width stance, tall chest, engaged core",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Parallel depth, knees tracking over toes, heel drive",
                "attribution": "Photo via Unsplash License",
                "name": "Bodyweight Squat",
                "targetArea": "Lower Body (Quadriceps, Glutes, Hamstrings)",
                "difficulty": "Beginner",
                "equipment": "Bodyweight",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "45 sec",
                "instructions": [
                    "Stand with feet approximately shoulder-width apart, toes turned outward 15 degrees.",
                    "Keep your chest comfortably upright, eyes forward, and brace your core.",
                    "Inhale as you bend your hips and knees simultaneously, lowering yourself as if sitting into an invisible chair.",
                    "Lower until your thighs are parallel to the floor, ensuring knees track in line with your feet.",
                    "Exhale and push firmly through your mid-foot and heels to return to standing."
                ],
                "properForm": "Keep heels planted flat on the floor throughout. Maintain an upright chest and neutral spine.",
                "commonMistakes": [
                    "Knees collapsing inward (valgus collapse)",
                    "Rounding the back or collapsing chest forward",
                    "Rising onto toes instead of staying balanced on heels",
                    "Dropping too quickly without control"
                ],
                "modification": "Use a sturdy chair for sit-to-stand support.",
                "progression": "Hold a 2-second pause at the bottom or hold a light dumbbell at your chest (Goblet Squat).",
                "visualKey": "squat"
            },
            {
                "id": "ex-db-floor-press",
                "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on floor, triceps resting lightly on carpet",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Press dumbbells upward to full arm extension over chest",
                "attribution": "Photo via Unsplash License",
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
                    "Exhale as you press both dumbbells straight up toward ceiling until arms are extended.",
                    "Inhale and lower with control until backs of triceps gently tap the floor.",
                    "Pause for half a second before pressing up again."
                ],
                "properForm": "The floor safely prevents hyperextension of shoulder joints. Keep wrists stacked straight over elbows.",
                "commonMistakes": [
                    "Bouncing elbows hard off the floor",
                    "Flaring elbows straight out at 90 degrees",
                    "Arching lower back off the mat"
                ],
                "modification": "Use light water bottles or press one arm at a time.",
                "progression": "Perform on an elevated bench or increase dumbbell weight.",
                "visualKey": "press"
            },
            {
                "id": "ex-band-pull",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand tall holding band in front with arms straight",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Pull band apart horizontally, retracting shoulder blades",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Drive movement entirely from your upper back muscles, not by flaring ribs.",
                "commonMistakes": [
                    "Shrugging shoulders up toward ears",
                    "Bending elbows excessively to jerk the band",
                    "Letting band snap back without resistance control"
                ],
                "modification": "Widen your grip on the band to reduce tension, or use bodyweight arm reaches.",
                "progression": "Narrow your hand grip or pause for 2 seconds at full contraction.",
                "visualKey": "pull_apart"
            },
            {
                "id": "ex-glute-bridge",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, knees bent 90°, feet flat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hip extension, glute squeeze, neutral lumbar spine",
                "attribution": "Photo via Unsplash License",
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
                    "Drive through your heels to lift your hips until knees, hips, and shoulders form a diagonal line.",
                    "Squeeze your glutes firmly at the top for 2 seconds, then slowly lower back down."
                ],
                "properForm": "Avoid over-arching the lower back at the top; the extension must come purely from the glutes.",
                "commonMistakes": [
                    "Arching lower back excessively rather than squeezing glutes",
                    "Pushing through toes instead of heels",
                    "Letting knees splay outward or knock inward"
                ],
                "modification": "Shorten range of motion or rest a light pillow under the lower back.",
                "progression": "Single-Leg Glute Bridge or place a mini-loop resistance band above knees.",
                "visualKey": "bridge"
            },
            {
                "id": "ex-calf-raises",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand upright with feet hip-width, heels planted flat",
                "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive upward onto balls of feet, hold 2-second calf peak",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Keep ankles aligned; avoid letting ankles roll outward onto the pinky toes.",
                "commonMistakes": [
                    "Bouncing quickly without eccentric control",
                    "Ankles rolling outward at the peak",
                    "Leaning forward onto the wall"
                ],
                "modification": "Perform seated with feet flat on the floor pressing knees down lightly.",
                "progression": "Single-leg calf raises on the edge of a step for an increased stretch.",
                "visualKey": "calf"
            }
        ],
        "instructions": [
            "Bodyweight Squats \u2014 3 sets of 10-12 reps keeping spine upright.",
            "Dumbbell Floor Chest Press \u2014 3 sets of 10 reps with light dumbbells.",
            "Resistance Band Pull-Apart \u2014 3 sets of 12 reps for upper back posture.",
            "Glute Bridge with 2-sec Squeeze \u2014 3 sets of 12 reps driving through heels.",
            "Standing Calf Raises \u2014 3 sets of 15 reps with steady 2-second lowering."
        ]
    },
    {
        "id": "w-beg-1",
        "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "3 minutes \u2014 Deep diaphragmatic breathing in easy seated pose.",
        "cooldown": "3 minutes \u2014 Reclined restorative butterfly with hands over belly.",
        "exercises": [
            {
                "id": "ex-cat-cow",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 (Cow) — Inhale, drop belly toward mat, open chest upward",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 (Cat) — Exhale, round spine to ceiling, tuck chin toward chest",
                "attribution": "Photo via Unsplash License",
                "name": "Cat-Cow Spinal Waves",
                "targetArea": "Mobility (Thoracic & Lumbar Spine, Neck)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "10 smooth cycles",
                "rest": "20 sec",
                "instructions": [
                    "Start on hands and knees with wrists under shoulders, knees under hips.",
                    "Inhale as you tilt pelvis forward, dip belly, and gently open chest forward (Cow).",
                    "Exhale as you press through palms, round spine up, and tuck chin and tailbone (Cat).",
                    "Flow between the two postures smoothly, matching breath."
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
            {
                "id": "ex-child-pose",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Kneel with big toes touching, knees wide as the mat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Walk hands forward, sink hips to heels, rest forehead",
                "attribution": "Photo via Unsplash License",
                "name": "Child's Pose with Lateral Reach",
                "targetArea": "Flexibility (Lats, Ribcage, Hips, Lower Back)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "45 sec per side",
                "rest": "20 sec",
                "instructions": [
                    "Kneel on the mat with big toes touching and knees opened wide.",
                    "Sink hips back toward heels and walk hands forward, resting forehead on mat.",
                    "Walk both hands 45 degrees to the right, feeling a stretch through left ribcage.",
                    "Breathe deeply for 45 seconds, then walk hands to the opposite side."
                ],
                "properForm": "Keep hips pinned toward heels as hands walk forward to decompress spine.",
                "commonMistakes": [
                    "Hips lifting high off heels",
                    "Tensing shoulders into ears",
                    "Shallow breathing"
                ],
                "modification": "Place a bolster or pillow under chest for torso support.",
                "progression": "Thread one arm underneath opposite armpit for thoracic rotation.",
                "visualKey": "child_pose"
            },
            {
                "id": "ex-pelvic-tilts",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Lie flat with neutral natural spinal arch",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Flatten lower back gently into floor with deep exhalation",
                "attribution": "Photo via Unsplash License",
                "name": "Pelvic Tilts with Diaphragmatic Breath",
                "targetArea": "Deep Core (Transverse Abdominis, Pelvic Floor, Lumbar Spine)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 3,
                "reps": "10-12 repetitions",
                "rest": "30 sec",
                "instructions": [
                    "Lie on your back with knees bent, feet flat on the floor, and arms resting at your sides.",
                    "Inhale through your nose, expanding lower belly and ribcage 360 degrees.",
                    "As you slowly exhale through mouth, gently contract deep lower abdominals and tilt pelvis backward.",
                    "Feel your lower back gently flatten against the floor.",
                    "Inhale to release back to a neutral spine position."
                ],
                "properForm": "Movement should be subtle, smooth, and driven by deep abdominal engagement rather than squeezing glutes.",
                "commonMistakes": [
                    "Pushing with heels instead of using deep core",
                    "Gripping neck and shoulders tightly",
                    "Holding breath during the tilt"
                ],
                "modification": "Place a hand on lower belly to feel abdominal muscles activate.",
                "progression": "Add a gentle 3-second hold at the flat-back position before releasing.",
                "visualKey": "pelvic_tilt"
            },
            {
                "id": "ex-seated-hamstring",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Seated tall with one leg extended, opposite foot tucked",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hinge forward from hips, maintain flat spine, breathe easy",
                "attribution": "Photo via Unsplash License",
                "name": "Seated Hamstring & Posterior Stretch",
                "targetArea": "Flexibility (Hamstrings, Calves, Lower Back)",
                "difficulty": "Beginner",
                "equipment": "Mat or Chair",
                "sets": 3,
                "reps": "30 sec per leg",
                "rest": "20 sec",
                "instructions": [
                    "Sit tall on the edge of a chair or mat with right leg extended straight, heel on floor.",
                    "Flex right foot so toes point toward ceiling.",
                    "Hinge gently forward from hips with flat back until comfortable stretch is felt along back of thigh.",
                    "Breathe deeply and hold for 30 seconds before switching legs."
                ],
                "properForm": "Hinge from hips with long spine; do not round upper back to reach toes.",
                "commonMistakes": [
                    "Rounding spine and dropping chest",
                    "Locking knee joint aggressively",
                    "Bouncing during stretch"
                ],
                "modification": "Perform with a slight micro-bend in the knee.",
                "progression": "Loop a towel or strap around the ball of foot to assist the hinge.",
                "visualKey": "stretch"
            }
        ],
        "instructions": [
            "Cat-Cow Spinal Waves \u2014 10 gentle repetitions inhaling as spine dips, exhaling as back arches.",
            "Child\u2019s Pose with Lateral Reach \u2014 60 seconds holding each side to open ribcage and lats.",
            "Pelvic Tilts with Diaphragmatic Breath \u2014 10 slow reps soothing the lower back.",
            "Seated Hamstring Stretch \u2014 45 seconds per leg with tall spine."
        ]
    },
    {
        "id": "w-beg-flex",
        "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "3 minutes \u2014 Shoulder rolls and neck lateral drops.",
        "cooldown": "3 minutes \u2014 Mindful stillness and box breathing.",
        "exercises": [
            {
                "id": "ex-child-pose",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Kneel with big toes touching, knees wide as the mat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Walk hands forward, sink hips to heels, rest forehead",
                "attribution": "Photo via Unsplash License",
                "name": "Child's Pose with Lateral Reach",
                "targetArea": "Flexibility (Lats, Ribcage, Hips, Lower Back)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "45 sec per side",
                "rest": "20 sec",
                "instructions": [
                    "Kneel on the mat with big toes touching and knees opened wide.",
                    "Sink hips back toward heels and walk hands forward, resting forehead on mat.",
                    "Walk both hands 45 degrees to the right, feeling a stretch through left ribcage.",
                    "Breathe deeply for 45 seconds, then walk hands to the opposite side."
                ],
                "properForm": "Keep hips pinned toward heels as hands walk forward to decompress spine.",
                "commonMistakes": [
                    "Hips lifting high off heels",
                    "Tensing shoulders into ears",
                    "Shallow breathing"
                ],
                "modification": "Place a bolster or pillow under chest for torso support.",
                "progression": "Thread one arm underneath opposite armpit for thoracic rotation.",
                "visualKey": "child_pose"
            },
            {
                "id": "ex-seated-hamstring",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Seated tall with one leg extended, opposite foot tucked",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hinge forward from hips, maintain flat spine, breathe easy",
                "attribution": "Photo via Unsplash License",
                "name": "Seated Hamstring & Posterior Stretch",
                "targetArea": "Flexibility (Hamstrings, Calves, Lower Back)",
                "difficulty": "Beginner",
                "equipment": "Mat or Chair",
                "sets": 3,
                "reps": "30 sec per leg",
                "rest": "20 sec",
                "instructions": [
                    "Sit tall on the edge of a chair or mat with right leg extended straight, heel on floor.",
                    "Flex right foot so toes point toward ceiling.",
                    "Hinge gently forward from hips with flat back until comfortable stretch is felt along back of thigh.",
                    "Breathe deeply and hold for 30 seconds before switching legs."
                ],
                "properForm": "Hinge from hips with long spine; do not round upper back to reach toes.",
                "commonMistakes": [
                    "Rounding spine and dropping chest",
                    "Locking knee joint aggressively",
                    "Bouncing during stretch"
                ],
                "modification": "Perform with a slight micro-bend in the knee.",
                "progression": "Loop a towel or strap around the ball of foot to assist the hinge.",
                "visualKey": "stretch"
            },
            {
                "id": "ex-cat-cow",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 (Cow) — Inhale, drop belly toward mat, open chest upward",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 (Cat) — Exhale, round spine to ceiling, tuck chin toward chest",
                "attribution": "Photo via Unsplash License",
                "name": "Cat-Cow Spinal Waves",
                "targetArea": "Mobility (Thoracic & Lumbar Spine, Neck)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "10 smooth cycles",
                "rest": "20 sec",
                "instructions": [
                    "Start on hands and knees with wrists under shoulders, knees under hips.",
                    "Inhale as you tilt pelvis forward, dip belly, and gently open chest forward (Cow).",
                    "Exhale as you press through palms, round spine up, and tuck chin and tailbone (Cat).",
                    "Flow between the two postures smoothly, matching breath."
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
            {
                "id": "ex-wall-angels",
                "image": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand against wall, elbows and knuckles flat in 'W' shape",
                "stageEndImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Slide arms upward into 'Y' shape keeping contact with wall",
                "attribution": "Photo via Unsplash License",
                "name": "Wall Angels for Posture Alignment",
                "targetArea": "Upper Back & Shoulders (Rhomboids, Mid/Lower Trapezius, Thoracic Spine)",
                "difficulty": "Beginner",
                "equipment": "Flat Wall",
                "sets": 3,
                "reps": "10-12 smooth reps",
                "rest": "30 sec",
                "instructions": [
                    "Stand with your back flat against a wall, heels 3-4 inches away from baseboard.",
                    "Press tailbone, upper back, and back of head gently against the wall.",
                    "Bring arms into a goalpost position (elbows bent 90 degrees, backs of hands against wall).",
                    "Slowly slide arms overhead along the wall as high as you can without arching your back.",
                    "Slowly slide elbows back down to your sides, squeezing shoulder blades together."
                ],
                "properForm": "Maintain ribcage engagement so lower back does not bow away from the wall.",
                "commonMistakes": [
                    "Arching lower back off the wall as arms reach up",
                    "Elbows or wrists pulling away from the wall",
                    "Holding breath during arm slide"
                ],
                "modification": "Perform lying on the floor in supine position with knees bent.",
                "progression": "Add a 2-second squeeze at the bottom contraction.",
                "visualKey": "posture"
            }
        ],
        "instructions": [
            "Child's Pose with Side Stretch \u2014 2 minutes gently opening latissimus dorsi.",
            "Seated Hamstring & Posterior Stretch \u2014 60 seconds per leg with smooth breathing.",
            "Cat-Cow Spinal Waves \u2014 10 slow fluid repetitions.",
            "Wall Angels for Posture \u2014 10 reps against wall opening chest and shoulders."
        ]
    },
    {
        "id": "w-beg-core",
        "image": "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "3 minutes \u2014 Pelvic clock breathing on the mat.",
        "cooldown": "3 minutes \u2014 Full body pencil stretch reaching fingertips away from toes.",
        "exercises": [
            {
                "id": "ex-pelvic-tilts",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Lie flat with neutral natural spinal arch",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Flatten lower back gently into floor with deep exhalation",
                "attribution": "Photo via Unsplash License",
                "name": "Pelvic Tilts with Diaphragmatic Breath",
                "targetArea": "Deep Core (Transverse Abdominis, Pelvic Floor, Lumbar Spine)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 3,
                "reps": "10-12 repetitions",
                "rest": "30 sec",
                "instructions": [
                    "Lie on your back with knees bent, feet flat on the floor, and arms resting at your sides.",
                    "Inhale through your nose, expanding lower belly and ribcage 360 degrees.",
                    "As you slowly exhale through mouth, gently contract deep lower abdominals and tilt pelvis backward.",
                    "Feel your lower back gently flatten against the floor.",
                    "Inhale to release back to a neutral spine position."
                ],
                "properForm": "Movement should be subtle, smooth, and driven by deep abdominal engagement rather than squeezing glutes.",
                "commonMistakes": [
                    "Pushing with heels instead of using deep core",
                    "Gripping neck and shoulders tightly",
                    "Holding breath during the tilt"
                ],
                "modification": "Place a hand on lower belly to feel abdominal muscles activate.",
                "progression": "Add a gentle 3-second hold at the flat-back position before releasing.",
                "visualKey": "pelvic_tilt"
            },
            {
                "id": "ex-dead-bug-beg",
                "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, hips and knees at 90°, arms reaching ceiling",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Tap one heel down while extending opposite arm overhead",
                "attribution": "Photo via Unsplash License",
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
                    "Keeping your right knee bent, slowly lower right heel down to tap the floor.",
                    "Bring right leg back up, then tap left heel down.",
                    "Arms remain steady pointing up to ceiling throughout."
                ],
                "properForm": "Lower back must remain pinned to the floor 100% of the time. If it arches, decrease the reach.",
                "commonMistakes": [
                    "Allowing lower back to arch off the floor",
                    "Moving too quickly",
                    "Bending the knee too much during the tap"
                ],
                "modification": "Keep feet on the floor and lift one knee up at a time instead.",
                "progression": "Full Dead Bug: extend opposite arm overhead as leg reaches forward.",
                "visualKey": "dead_bug"
            },
            {
                "id": "ex-bird-dog",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Quadruped tabletop, wrists below shoulders, knees under hips",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Opposite arm and leg reach, level pelvis, active glute",
                "attribution": "Photo via Unsplash License",
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
                    "Hold for 2 seconds at hip and shoulder height without tilting pelvis.",
                    "Return to all fours with control and switch sides."
                ],
                "properForm": "Imagine balancing a glass of water on your lower back; hips must remain level and square.",
                "commonMistakes": [
                    "Rotating pelvis open to lift leg too high",
                    "Sagging belly toward the floor",
                    "Looking up and hyperextending neck"
                ],
                "modification": "Perform the arm reach alone, then the leg reach alone, before combining them.",
                "progression": "Hold for 4 seconds at peak extension and tap elbow to opposite knee under torso between reps.",
                "visualKey": "bird_dog"
            },
            {
                "id": "ex-glute-bridge",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, knees bent 90°, feet flat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hip extension, glute squeeze, neutral lumbar spine",
                "attribution": "Photo via Unsplash License",
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
                    "Drive through your heels to lift your hips until knees, hips, and shoulders form a diagonal line.",
                    "Squeeze your glutes firmly at the top for 2 seconds, then slowly lower back down."
                ],
                "properForm": "Avoid over-arching the lower back at the top; the extension must come purely from the glutes.",
                "commonMistakes": [
                    "Arching lower back excessively rather than squeezing glutes",
                    "Pushing through toes instead of heels",
                    "Letting knees splay outward or knock inward"
                ],
                "modification": "Shorten range of motion or rest a light pillow under the lower back.",
                "progression": "Single-Leg Glute Bridge or place a mini-loop resistance band above knees.",
                "visualKey": "bridge"
            }
        ],
        "instructions": [
            "Pelvic Tilts with Diaphragmatic Breath \u2014 12 slow reps connecting to deep core.",
            "Dead Bug Heel Taps \u2014 3 sets of 10 alternating reps maintaining flat lower back.",
            "Quadruped Bird Dog \u2014 3 sets of 8 reps per side holding 2 seconds at top.",
            "Glute Bridge \u2014 3 sets of 12 reps focusing on glute and pelvic floor coordination."
        ]
    },
    {
        "id": "w-beg-lower",
        "image": "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Ankle circles, standing knee lifts, gentle hip hinges.",
        "cooldown": "5 minutes \u2014 Standing quad stretch and seated figure-4 glute stretch.",
        "exercises": [
            {
                "id": "ex-squat-bw",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Shoulder-width stance, tall chest, engaged core",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Parallel depth, knees tracking over toes, heel drive",
                "attribution": "Photo via Unsplash License",
                "name": "Bodyweight Squat",
                "targetArea": "Lower Body (Quadriceps, Glutes, Hamstrings)",
                "difficulty": "Beginner",
                "equipment": "Bodyweight",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "45 sec",
                "instructions": [
                    "Stand with feet approximately shoulder-width apart, toes turned outward 15 degrees.",
                    "Keep your chest comfortably upright, eyes forward, and brace your core.",
                    "Inhale as you bend your hips and knees simultaneously, lowering yourself as if sitting into an invisible chair.",
                    "Lower until your thighs are parallel to the floor, ensuring knees track in line with your feet.",
                    "Exhale and push firmly through your mid-foot and heels to return to standing."
                ],
                "properForm": "Keep heels planted flat on the floor throughout. Maintain an upright chest and neutral spine.",
                "commonMistakes": [
                    "Knees collapsing inward (valgus collapse)",
                    "Rounding the back or collapsing chest forward",
                    "Rising onto toes instead of staying balanced on heels",
                    "Dropping too quickly without control"
                ],
                "modification": "Use a sturdy chair for sit-to-stand support.",
                "progression": "Hold a 2-second pause at the bottom or hold a light dumbbell at your chest (Goblet Squat).",
                "visualKey": "squat"
            },
            {
                "id": "ex-assisted-lunge",
                "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hand light on wall/chair, feet hip-width apart",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Step back, double 90° knee angle, front heel drive",
                "attribution": "Photo via Unsplash License",
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
                    "Ensure front knee stays directly above ankle and back knee hovers just above the mat.",
                    "Press firmly through front heel to step back to standing, then repeat."
                ],
                "properForm": "Keep torso tall and vertical; avoid leaning excessively over the front thigh.",
                "commonMistakes": [
                    "Front knee driving far past the toes",
                    "Stepping feet on a tightrope (keep them hip-width apart for stability)",
                    "Dropping back knee forcefully onto the floor"
                ],
                "modification": "Reduce the depth of the lunge into a shallow split stance.",
                "progression": "Remove hand support for a free-standing reverse lunge, or hold light dumbbells.",
                "visualKey": "lunge"
            },
            {
                "id": "ex-glute-bridge",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, knees bent 90°, feet flat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hip extension, glute squeeze, neutral lumbar spine",
                "attribution": "Photo via Unsplash License",
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
                    "Drive through your heels to lift your hips until knees, hips, and shoulders form a diagonal line.",
                    "Squeeze your glutes firmly at the top for 2 seconds, then slowly lower back down."
                ],
                "properForm": "Avoid over-arching the lower back at the top; the extension must come purely from the glutes.",
                "commonMistakes": [
                    "Arching lower back excessively rather than squeezing glutes",
                    "Pushing through toes instead of heels",
                    "Letting knees splay outward or knock inward"
                ],
                "modification": "Shorten range of motion or rest a light pillow under the lower back.",
                "progression": "Single-Leg Glute Bridge or place a mini-loop resistance band above knees.",
                "visualKey": "bridge"
            },
            {
                "id": "ex-clamshells",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Side-lying, knees bent 45°, feet stacked together",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Top knee rotates upward, feet remain touching, pelvis stable",
                "attribution": "Photo via Unsplash License",
                "name": "Side-Lying Clamshells",
                "targetArea": "Hip & Glutes (Gluteus Medius, Pelvic Stabilizers)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 3,
                "reps": "12-15 reps per side",
                "rest": "30 sec",
                "instructions": [
                    "Lie on your side with head supported by your lower arm.",
                    "Stack your hips, knees, and ankles at a 45-degree bend.",
                    "Keeping your feet glued together, slowly raise your top knee as high as possible without rolling your hips backward.",
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
            {
                "id": "ex-calf-raises",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand upright with feet hip-width, heels planted flat",
                "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive upward onto balls of feet, hold 2-second calf peak",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Keep ankles aligned; avoid letting ankles roll outward onto the pinky toes.",
                "commonMistakes": [
                    "Bouncing quickly without eccentric control",
                    "Ankles rolling outward at the peak",
                    "Leaning forward onto the wall"
                ],
                "modification": "Perform seated with feet flat on the floor pressing knees down lightly.",
                "progression": "Single-leg calf raises on the edge of a step for an increased stretch.",
                "visualKey": "calf"
            }
        ],
        "instructions": [
            "Bodyweight Squat to Chair \u2014 3 sets of 10 reps driving through heels.",
            "Supported Reverse Lunge \u2014 3 sets of 8 reps per leg.",
            "Glute Bridge \u2014 3 sets of 12 reps with 2-second hold at top.",
            "Side-Lying Clamshells \u2014 3 sets of 12 reps each side for hip stabilization.",
            "Standing Calf Raises \u2014 3 sets of 15 smooth reps."
        ]
    },
    {
        "id": "w-beg-upper",
        "image": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Shoulder shrugs, arm circles, chest openers with deep breathing.",
        "cooldown": "5 minutes \u2014 Doorway pectoral stretch and child's pose.",
        "exercises": [
            {
                "id": "ex-wall-pushup",
                "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Arms extended, straight line from heels to crown",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Incline lower, elbows 45 degrees, chest to surface",
                "attribution": "Photo via Unsplash License",
                "name": "Wall / Incline Push-Up",
                "targetArea": "Upper Body (Pectorals, Anterior Deltoids, Triceps, Core)",
                "difficulty": "Beginner",
                "equipment": "Wall or Kitchen Countertop",
                "sets": 3,
                "reps": "8-10 reps",
                "rest": "45 sec",
                "instructions": [
                    "Stand an arm's length away from a solid wall or sturdy countertop.",
                    "Place palms flat against the surface at shoulder height, slightly wider than shoulder-width.",
                    "Brace core and glutes so body forms a straight line from heels to head.",
                    "Bend elbows to lower chest toward the surface in a smooth 2-second count.",
                    "Keep elbows angled back at roughly 45 degrees (arrow shape, not T-shape).",
                    "Press firmly through palms to return to the starting position."
                ],
                "properForm": "Keep neck relaxed and spine rigid; avoid letting belly or lower back sag.",
                "commonMistakes": [
                    "Flaring elbows wide out to the sides at 90 degrees",
                    "Arching lower back and sagging belly forward",
                    "Shrugging shoulders into the ears"
                ],
                "modification": "Step feet closer to the wall to decrease the angle and reduce resistance.",
                "progression": "Lower your hands to a sturdy countertop, bench, or move to knee push-ups on the mat.",
                "visualKey": "pushup"
            },
            {
                "id": "ex-wall-angels",
                "image": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand against wall, elbows and knuckles flat in 'W' shape",
                "stageEndImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Slide arms upward into 'Y' shape keeping contact with wall",
                "attribution": "Photo via Unsplash License",
                "name": "Wall Angels for Posture Alignment",
                "targetArea": "Upper Back & Shoulders (Rhomboids, Mid/Lower Trapezius, Thoracic Spine)",
                "difficulty": "Beginner",
                "equipment": "Flat Wall",
                "sets": 3,
                "reps": "10-12 smooth reps",
                "rest": "30 sec",
                "instructions": [
                    "Stand with your back flat against a wall, heels 3-4 inches away from baseboard.",
                    "Press tailbone, upper back, and back of head gently against the wall.",
                    "Bring arms into a goalpost position (elbows bent 90 degrees, backs of hands against wall).",
                    "Slowly slide arms overhead along the wall as high as you can without arching your back.",
                    "Slowly slide elbows back down to your sides, squeezing shoulder blades together."
                ],
                "properForm": "Maintain ribcage engagement so lower back does not bow away from the wall.",
                "commonMistakes": [
                    "Arching lower back off the wall as arms reach up",
                    "Elbows or wrists pulling away from the wall",
                    "Holding breath during arm slide"
                ],
                "modification": "Perform lying on the floor in supine position with knees bent.",
                "progression": "Add a 2-second squeeze at the bottom contraction.",
                "visualKey": "posture"
            },
            {
                "id": "ex-band-pull",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand tall holding band in front with arms straight",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Pull band apart horizontally, retracting shoulder blades",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Drive movement entirely from your upper back muscles, not by flaring ribs.",
                "commonMistakes": [
                    "Shrugging shoulders up toward ears",
                    "Bending elbows excessively to jerk the band",
                    "Letting band snap back without resistance control"
                ],
                "modification": "Widen your grip on the band to reduce tension, or use bodyweight arm reaches.",
                "progression": "Narrow your hand grip or pause for 2 seconds at full contraction.",
                "visualKey": "pull_apart"
            },
            {
                "id": "ex-db-floor-press",
                "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on floor, triceps resting lightly on carpet",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Press dumbbells upward to full arm extension over chest",
                "attribution": "Photo via Unsplash License",
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
                    "Exhale as you press both dumbbells straight up toward ceiling until arms are extended.",
                    "Inhale and lower with control until backs of triceps gently tap the floor.",
                    "Pause for half a second before pressing up again."
                ],
                "properForm": "The floor safely prevents hyperextension of shoulder joints. Keep wrists stacked straight over elbows.",
                "commonMistakes": [
                    "Bouncing elbows hard off the floor",
                    "Flaring elbows straight out at 90 degrees",
                    "Arching lower back off the mat"
                ],
                "modification": "Use light water bottles or press one arm at a time.",
                "progression": "Perform on an elevated bench or increase dumbbell weight.",
                "visualKey": "press"
            }
        ],
        "instructions": [
            "Wall / Incline Push-Up \u2014 3 sets of 8 reps focusing on smooth chest lowering.",
            "Wall Angels for Posture \u2014 3 sets of 10 reps against wall.",
            "Resistance Band Pull-Apart \u2014 3 sets of 12 reps squeezing upper shoulder blades.",
            "Dumbbell Floor Chest Press \u2014 3 sets of 10 reps with light weights."
        ]
    },
    {
        "id": "w-int-fullbody",
        "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 High knees, inchworms, arm swings, bodyweight squats.",
        "cooldown": "5 minutes \u2014 Downward dog to cobra flow, child's pose, deep breathing.",
        "exercises": [
            {
                "id": "ex-goblet-squat",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hold dumbbell vertically against chest, elbows tucked",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Squat between knees, elbows touch inside of knees, stand tall",
                "attribution": "Photo via Unsplash License",
                "name": "Dumbbell Goblet Squat",
                "targetArea": "Lower Body & Core (Quadriceps, Glutes, Core Bracing)",
                "difficulty": "Intermediate",
                "equipment": "1 Dumbbell (4-12 kg)",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "60 sec",
                "instructions": [
                    "Hold a dumbbell vertically against chest with both hands cupping the upper head.",
                    "Set feet slightly wider than shoulder-width, toes angled slightly out.",
                    "Brace core and lower hips into deep squat, keeping chest proud.",
                    "Ensure elbows travel naturally inside knees at the bottom.",
                    "Drive through mid-foot and heels to stand tall, exhaling at top."
                ],
                "properForm": "Keep weight touching sternum; do not let it drift forward.",
                "commonMistakes": [
                    "Weight pulling chest forward into a round back",
                    "Knees caving inward on ascent",
                    "Rising onto toes"
                ],
                "modification": "Use a lighter dumbbell or bodyweight with hands clasped at chest.",
                "progression": "Add a 2-second isometric pause at the bottom of every rep.",
                "visualKey": "squat"
            },
            {
                "id": "ex-db-row",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hinge at hips 45°, flat back, arms hanging naturally",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Row dumbbells toward hips, driving elbows back and squeezing lats",
                "attribution": "Photo via Unsplash License",
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
                    "Pull dumbbells toward hip bones, driving elbows back toward ceiling.",
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
            {
                "id": "ex-db-rdl",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand tall holding weights against thighs, knees soft",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hinge hips backward until hamstrings load, spine flat, snap to stand",
                "attribution": "Photo via Unsplash License",
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
                    "Push hips straight back as if touching a wall behind you with glutes.",
                    "Slide dumbbells closely down shins until hamstrings stretch.",
                    "Squeeze glutes and drive hips forward to return to standing tall."
                ],
                "properForm": "This is a horizontal hip hinge, NOT a knee squat. Spine stays flat like a tabletop.",
                "commonMistakes": [
                    "Squatting down instead of hinging hips back",
                    "Rounding spine to reach lower",
                    "Dumbbells drifting away from legs"
                ],
                "modification": "Practice hip hinge with hands on hips touching glutes to a wall.",
                "progression": "Single-Leg Romanian Deadlift to challenge balance and glute stability.",
                "visualKey": "deadlift"
            },
            {
                "id": "ex-forearm-plank",
                "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Forearms on floor under shoulders, balls of feet grounded",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lock glutes and brace core, maintaining unbroken horizontal line",
                "attribution": "Photo via Unsplash License",
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
                    "Squeeze glutes, pull belly button toward spine, and press forearms actively into floor.",
                    "Breathe steadily and hold tension throughout."
                ],
                "properForm": "Keep hips in line with shoulders; do not let hips dip or pike up.",
                "commonMistakes": [
                    "Lower back sagging toward floor",
                    "Holding breath",
                    "Hips piked up in an inverted V"
                ],
                "modification": "Lower knees to mat while keeping hips forward in a straight line.",
                "progression": "Plank Shoulder Taps or alternating toe taps outward.",
                "visualKey": "plank"
            },
            {
                "id": "ex-skaters",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Load outside foot with slight knee bend and hinge",
                "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Bound laterally, land softly on opposite leg, sweep trail leg behind",
                "attribution": "Photo via Unsplash License",
                "name": "Lateral Speed Skater Glides",
                "targetArea": "Cardiovascular, Gluteus Medius, Balance",
                "difficulty": "Intermediate",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "40 sec",
                "rest": "20 sec",
                "instructions": [
                    "Start on right side of space, knees soft, hinged slightly forward at hips.",
                    "Bound laterally to left, landing softly on left foot while sweeping right foot behind.",
                    "Immediately bound laterally back to right, sweeping left foot behind.",
                    "Pump arms naturally in a speed-skater motion."
                ],
                "properForm": "Absorb landing by bending into hip and knee; never land stiff-legged.",
                "commonMistakes": [
                    "Landing heavily with stiff knees",
                    "Rounding spine",
                    "Knee buckling inward on landing"
                ],
                "modification": "Perform lateral step-behinds without the airborne jump.",
                "progression": "Add a floor tap with opposite hand on each landing.",
                "visualKey": "skaters"
            }
        ],
        "instructions": [
            "Dumbbell Goblet Squat \u2014 3 sets of 10-12 reps keeping chest tall.",
            "Dumbbell Bent-Over Row \u2014 3 sets of 10-12 reps squeezing back at top.",
            "Dumbbell Romanian Deadlift \u2014 3 sets of 10 reps hinging hips back.",
            "Forearm Plank \u2014 3 sets of 40-second hold with active glute squeeze.",
            "Lateral Speed Skaters \u2014 3 sets of 40 seconds for heart rate elevation."
        ]
    },
    {
        "id": "w-str-1",
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Arm circles, hip openers, bodyweight air squats.",
        "cooldown": "5 minutes \u2014 Reclined spinal twist, quad stretch, deep relaxation.",
        "exercises": [
            {
                "id": "ex-goblet-squat",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hold dumbbell vertically against chest, elbows tucked",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Squat between knees, elbows touch inside of knees, stand tall",
                "attribution": "Photo via Unsplash License",
                "name": "Dumbbell Goblet Squat",
                "targetArea": "Lower Body & Core (Quadriceps, Glutes, Core Bracing)",
                "difficulty": "Intermediate",
                "equipment": "1 Dumbbell (4-12 kg)",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "60 sec",
                "instructions": [
                    "Hold a dumbbell vertically against chest with both hands cupping the upper head.",
                    "Set feet slightly wider than shoulder-width, toes angled slightly out.",
                    "Brace core and lower hips into deep squat, keeping chest proud.",
                    "Ensure elbows travel naturally inside knees at the bottom.",
                    "Drive through mid-foot and heels to stand tall, exhaling at top."
                ],
                "properForm": "Keep weight touching sternum; do not let it drift forward.",
                "commonMistakes": [
                    "Weight pulling chest forward into a round back",
                    "Knees caving inward on ascent",
                    "Rising onto toes"
                ],
                "modification": "Use a lighter dumbbell or bodyweight with hands clasped at chest.",
                "progression": "Add a 2-second isometric pause at the bottom of every rep.",
                "visualKey": "squat"
            },
            {
                "id": "ex-db-rdl",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand tall holding weights against thighs, knees soft",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hinge hips backward until hamstrings load, spine flat, snap to stand",
                "attribution": "Photo via Unsplash License",
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
                    "Push hips straight back as if touching a wall behind you with glutes.",
                    "Slide dumbbells closely down shins until hamstrings stretch.",
                    "Squeeze glutes and drive hips forward to return to standing tall."
                ],
                "properForm": "This is a horizontal hip hinge, NOT a knee squat. Spine stays flat like a tabletop.",
                "commonMistakes": [
                    "Squatting down instead of hinging hips back",
                    "Rounding spine to reach lower",
                    "Dumbbells drifting away from legs"
                ],
                "modification": "Practice hip hinge with hands on hips touching glutes to a wall.",
                "progression": "Single-Leg Romanian Deadlift to challenge balance and glute stability.",
                "visualKey": "deadlift"
            },
            {
                "id": "ex-db-row",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hinge at hips 45°, flat back, arms hanging naturally",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Row dumbbells toward hips, driving elbows back and squeezing lats",
                "attribution": "Photo via Unsplash License",
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
                    "Pull dumbbells toward hip bones, driving elbows back toward ceiling.",
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
            {
                "id": "ex-pushup-knees",
                "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Knees on mat, straight line from knees to head",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lower chest to 2 inches off mat, push through palms to lockout",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Piking hips backward",
                    "Flaring elbows to 90 degrees",
                    "Dropping head"
                ],
                "modification": "Perform with hands elevated on a couch or sturdy counter.",
                "progression": "Full standard floor push-up on toes.",
                "visualKey": "pushup"
            },
            {
                "id": "ex-glute-bridge",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, knees bent 90°, feet flat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hip extension, glute squeeze, neutral lumbar spine",
                "attribution": "Photo via Unsplash License",
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
                    "Drive through your heels to lift your hips until knees, hips, and shoulders form a diagonal line.",
                    "Squeeze your glutes firmly at the top for 2 seconds, then slowly lower back down."
                ],
                "properForm": "Avoid over-arching the lower back at the top; the extension must come purely from the glutes.",
                "commonMistakes": [
                    "Arching lower back excessively rather than squeezing glutes",
                    "Pushing through toes instead of heels",
                    "Letting knees splay outward or knock inward"
                ],
                "modification": "Shorten range of motion or rest a light pillow under the lower back.",
                "progression": "Single-Leg Glute Bridge or place a mini-loop resistance band above knees.",
                "visualKey": "bridge"
            }
        ],
        "instructions": [
            "Goblet Squats \u2014 3 sets of 10-12 controlled reps. Keep chest proud.",
            "Dumbbell Romanian Deadlifts \u2014 3 sets of 10 reps focusing on hip hinge.",
            "Dumbbell Bent-Over Row \u2014 3 sets of 12 reps engaging shoulder blades.",
            "Push-Ups (Floor or Kneeling) \u2014 3 sets of 8-10 reps maintaining rigid core plank.",
            "Glute Bridges with 2-sec Pause \u2014 3 sets of 15 reps squeezing glutes at the top."
        ]
    },
    {
        "id": "w-cardio-1",
        "image": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "4 minutes \u2014 Brisk march with arm reaches and deep breathing.",
        "cooldown": "4 minutes \u2014 Walking step-touches and standing calf stretches.",
        "exercises": [
            {
                "id": "ex-march",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Athletic upright posture, shoulders relaxed",
                "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Alternating 90° knee lift, reciprocal arm drive",
                "attribution": "Photo via Unsplash License",
                "name": "Standing March in Place",
                "targetArea": "Cardiovascular, Hip Flexors, Calves, Balance",
                "difficulty": "Beginner",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "30-40 sec",
                "rest": "30 sec",
                "instructions": [
                    "Stand tall with feet hip-width apart and posture elongated.",
                    "Lift right knee toward hip level while swinging left arm forward.",
                    "Lower right foot softly and immediately lift left knee, swinging right arm.",
                    "Maintain a steady, rhythmic breathing pattern."
                ],
                "properForm": "Keep core braced and chest tall so torso does not lean backward as knees lift.",
                "commonMistakes": [
                    "Leaning backwards as knees lift",
                    "Stamping feet down heavily on floor",
                    "Holding breath"
                ],
                "modification": "Hold a chair with one hand for balance support.",
                "progression": "Add overhead reach or increase speed into a gentle jog.",
                "visualKey": "march"
            },
            {
                "id": "ex-skaters",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Load outside foot with slight knee bend and hinge",
                "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Bound laterally, land softly on opposite leg, sweep trail leg behind",
                "attribution": "Photo via Unsplash License",
                "name": "Lateral Speed Skater Glides",
                "targetArea": "Cardiovascular, Gluteus Medius, Balance",
                "difficulty": "Intermediate",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "40 sec",
                "rest": "20 sec",
                "instructions": [
                    "Start on right side of space, knees soft, hinged slightly forward at hips.",
                    "Bound laterally to left, landing softly on left foot while sweeping right foot behind.",
                    "Immediately bound laterally back to right, sweeping left foot behind.",
                    "Pump arms naturally in a speed-skater motion."
                ],
                "properForm": "Absorb landing by bending into hip and knee; never land stiff-legged.",
                "commonMistakes": [
                    "Landing heavily with stiff knees",
                    "Rounding spine",
                    "Knee buckling inward on landing"
                ],
                "modification": "Perform lateral step-behinds without the airborne jump.",
                "progression": "Add a floor tap with opposite hand on each landing.",
                "visualKey": "skaters"
            },
            {
                "id": "ex-high-knees",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Athletic upright sprint stance on balls of feet",
                "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive knees rapidly to hip height with aggressive arm pump",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Leaning backwards",
                    "Stamping feet down heavily",
                    "Hunching shoulders"
                ],
                "modification": "Perform a brisk high march without the bounce.",
                "progression": "Increase cadence and drive knees above waist height.",
                "visualKey": "march"
            },
            {
                "id": "ex-mountain-climbers",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Full high plank position with shoulders over wrists",
                "stageEndImg": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive one knee toward chest, snap back and alternate smoothly",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Piking hips high in air",
                    "Bouncing hips up and down",
                    "Shoulders drifting behind wrists"
                ],
                "modification": "Perform slowly one knee at a time without jumping.",
                "progression": "Drive knees cross-body toward opposite elbow (Cross-Body Climbers).",
                "visualKey": "climber"
            }
        ],
        "instructions": [
            "Brisk March with Arm Reach \u2014 3 minutes continuous rhythmic flow.",
            "Side-to-Side Skater Glides \u2014 40 seconds on, 20 seconds recovery (3 rounds).",
            "Rhythmic High Knees \u2014 30 seconds on, 30 seconds recovery (3 rounds).",
            "Controlled Mountain Climbers \u2014 30 seconds on, 30 seconds recovery (3 rounds)."
        ]
    },
    {
        "id": "w-core-1",
        "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "3 minutes \u2014 Diaphragmatic ribcage breathing on mat.",
        "cooldown": "3 minutes \u2014 Cobra stretch and child's pose.",
        "exercises": [
            {
                "id": "ex-pelvic-tilts",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Lie flat with neutral natural spinal arch",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Flatten lower back gently into floor with deep exhalation",
                "attribution": "Photo via Unsplash License",
                "name": "Pelvic Tilts with Diaphragmatic Breath",
                "targetArea": "Deep Core (Transverse Abdominis, Pelvic Floor, Lumbar Spine)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 3,
                "reps": "10-12 repetitions",
                "rest": "30 sec",
                "instructions": [
                    "Lie on your back with knees bent, feet flat on the floor, and arms resting at your sides.",
                    "Inhale through your nose, expanding lower belly and ribcage 360 degrees.",
                    "As you slowly exhale through mouth, gently contract deep lower abdominals and tilt pelvis backward.",
                    "Feel your lower back gently flatten against the floor.",
                    "Inhale to release back to a neutral spine position."
                ],
                "properForm": "Movement should be subtle, smooth, and driven by deep abdominal engagement rather than squeezing glutes.",
                "commonMistakes": [
                    "Pushing with heels instead of using deep core",
                    "Gripping neck and shoulders tightly",
                    "Holding breath during the tilt"
                ],
                "modification": "Place a hand on lower belly to feel abdominal muscles activate.",
                "progression": "Add a gentle 3-second hold at the flat-back position before releasing.",
                "visualKey": "pelvic_tilt"
            },
            {
                "id": "ex-dead-bug-beg",
                "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, hips and knees at 90°, arms reaching ceiling",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Tap one heel down while extending opposite arm overhead",
                "attribution": "Photo via Unsplash License",
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
                    "Keeping your right knee bent, slowly lower right heel down to tap the floor.",
                    "Bring right leg back up, then tap left heel down.",
                    "Arms remain steady pointing up to ceiling throughout."
                ],
                "properForm": "Lower back must remain pinned to the floor 100% of the time. If it arches, decrease the reach.",
                "commonMistakes": [
                    "Allowing lower back to arch off the floor",
                    "Moving too quickly",
                    "Bending the knee too much during the tap"
                ],
                "modification": "Keep feet on the floor and lift one knee up at a time instead.",
                "progression": "Full Dead Bug: extend opposite arm overhead as leg reaches forward.",
                "visualKey": "dead_bug"
            },
            {
                "id": "ex-bird-dog",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Quadruped tabletop, wrists below shoulders, knees under hips",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Opposite arm and leg reach, level pelvis, active glute",
                "attribution": "Photo via Unsplash License",
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
                    "Hold for 2 seconds at hip and shoulder height without tilting pelvis.",
                    "Return to all fours with control and switch sides."
                ],
                "properForm": "Imagine balancing a glass of water on your lower back; hips must remain level and square.",
                "commonMistakes": [
                    "Rotating pelvis open to lift leg too high",
                    "Sagging belly toward the floor",
                    "Looking up and hyperextending neck"
                ],
                "modification": "Perform the arm reach alone, then the leg reach alone, before combining them.",
                "progression": "Hold for 4 seconds at peak extension and tap elbow to opposite knee under torso between reps.",
                "visualKey": "bird_dog"
            },
            {
                "id": "ex-side-plank",
                "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Side-lying with forearm perpendicular to body, feet stacked",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lift hips until body forms straight diagonal line from shoulder to ankles",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Hips sagging toward floor",
                    "Top hip rolling forward or backward",
                    "Neck straining"
                ],
                "modification": "Bend bottom knee at 90 degrees on floor for knee-assisted side plank.",
                "progression": "Lift top leg into a side plank star.",
                "visualKey": "side_plank"
            },
            {
                "id": "ex-forearm-plank",
                "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Forearms on floor under shoulders, balls of feet grounded",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lock glutes and brace core, maintaining unbroken horizontal line",
                "attribution": "Photo via Unsplash License",
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
                    "Squeeze glutes, pull belly button toward spine, and press forearms actively into floor.",
                    "Breathe steadily and hold tension throughout."
                ],
                "properForm": "Keep hips in line with shoulders; do not let hips dip or pike up.",
                "commonMistakes": [
                    "Lower back sagging toward floor",
                    "Holding breath",
                    "Hips piked up in an inverted V"
                ],
                "modification": "Lower knees to mat while keeping hips forward in a straight line.",
                "progression": "Plank Shoulder Taps or alternating toe taps outward.",
                "visualKey": "plank"
            }
        ],
        "instructions": [
            "Pelvic Tilts with Diaphragmatic Breath \u2014 10 reps feeling deep lower abdominal connection.",
            "Dead Bugs with Controlled Reach \u2014 3 sets of 12 alternating reps keeping lower back glued to floor.",
            "Bird-Dog Extension with Hold \u2014 3 sets of 8 reps per side holding 3 seconds at top.",
            "Side Plank on Forearm \u2014 30 seconds hold per side.",
            "Forearm Plank \u2014 30-40 seconds hold focusing on stable pelvis."
        ]
    },
    {
        "id": "w-upper-1",
        "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "4 minutes \u2014 Arm circles, doorway chest stretch, wrist rolls.",
        "cooldown": "4 minutes \u2014 Cross-arm shoulder stretch and overhead tricep stretch.",
        "exercises": [
            {
                "id": "ex-band-pull",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand tall holding band in front with arms straight",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Pull band apart horizontally, retracting shoulder blades",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Drive movement entirely from your upper back muscles, not by flaring ribs.",
                "commonMistakes": [
                    "Shrugging shoulders up toward ears",
                    "Bending elbows excessively to jerk the band",
                    "Letting band snap back without resistance control"
                ],
                "modification": "Widen your grip on the band to reduce tension, or use bodyweight arm reaches.",
                "progression": "Narrow your hand grip or pause for 2 seconds at full contraction.",
                "visualKey": "pull_apart"
            },
            {
                "id": "ex-db-row",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hinge at hips 45°, flat back, arms hanging naturally",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Row dumbbells toward hips, driving elbows back and squeezing lats",
                "attribution": "Photo via Unsplash License",
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
                    "Pull dumbbells toward hip bones, driving elbows back toward ceiling.",
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
            {
                "id": "ex-tricep-dips",
                "image": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hands grip edge of bench/chair, hips forward, arms straight",
                "stageEndImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lower until elbows bend 90°, press through palms to lock triceps",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Drifting body far from chair (strains shoulders)",
                    "Shrugging shoulders into neck",
                    "Flaring elbows wide"
                ],
                "modification": "Keep feet closer to chair with knees bent 90 degrees.",
                "progression": "Extend legs straight out with heels resting on floor.",
                "visualKey": "dip"
            },
            {
                "id": "ex-db-floor-press",
                "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on floor, triceps resting lightly on carpet",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Press dumbbells upward to full arm extension over chest",
                "attribution": "Photo via Unsplash License",
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
                    "Exhale as you press both dumbbells straight up toward ceiling until arms are extended.",
                    "Inhale and lower with control until backs of triceps gently tap the floor.",
                    "Pause for half a second before pressing up again."
                ],
                "properForm": "The floor safely prevents hyperextension of shoulder joints. Keep wrists stacked straight over elbows.",
                "commonMistakes": [
                    "Bouncing elbows hard off the floor",
                    "Flaring elbows straight out at 90 degrees",
                    "Arching lower back off the mat"
                ],
                "modification": "Use light water bottles or press one arm at a time.",
                "progression": "Perform on an elevated bench or increase dumbbell weight.",
                "visualKey": "press"
            }
        ],
        "instructions": [
            "Band Pull-Aparts \u2014 3 sets of 15 reps targeting rear deltoids and rhomboids.",
            "Dumbbell Bent-Over Row \u2014 3 sets of 12 reps engaging shoulder blades at peak contraction.",
            "Tricep Bench or Chair Dips \u2014 3 sets of 12 reps keeping back close to bench.",
            "Dumbbell Floor Press \u2014 3 sets of 10-12 reps with controlled descent."
        ]
    },
    {
        "id": "w-int-lower",
        "image": "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Glute bridges, air squats, leg swings forward and back.",
        "cooldown": "5 minutes \u2014 Pigeon pose and standing quad stretch.",
        "exercises": [
            {
                "id": "ex-goblet-squat",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hold dumbbell vertically against chest, elbows tucked",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Squat between knees, elbows touch inside of knees, stand tall",
                "attribution": "Photo via Unsplash License",
                "name": "Dumbbell Goblet Squat",
                "targetArea": "Lower Body & Core (Quadriceps, Glutes, Core Bracing)",
                "difficulty": "Intermediate",
                "equipment": "1 Dumbbell (4-12 kg)",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "60 sec",
                "instructions": [
                    "Hold a dumbbell vertically against chest with both hands cupping the upper head.",
                    "Set feet slightly wider than shoulder-width, toes angled slightly out.",
                    "Brace core and lower hips into deep squat, keeping chest proud.",
                    "Ensure elbows travel naturally inside knees at the bottom.",
                    "Drive through mid-foot and heels to stand tall, exhaling at top."
                ],
                "properForm": "Keep weight touching sternum; do not let it drift forward.",
                "commonMistakes": [
                    "Weight pulling chest forward into a round back",
                    "Knees caving inward on ascent",
                    "Rising onto toes"
                ],
                "modification": "Use a lighter dumbbell or bodyweight with hands clasped at chest.",
                "progression": "Add a 2-second isometric pause at the bottom of every rep.",
                "visualKey": "squat"
            },
            {
                "id": "ex-db-rdl",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand tall holding weights against thighs, knees soft",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hinge hips backward until hamstrings load, spine flat, snap to stand",
                "attribution": "Photo via Unsplash License",
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
                    "Push hips straight back as if touching a wall behind you with glutes.",
                    "Slide dumbbells closely down shins until hamstrings stretch.",
                    "Squeeze glutes and drive hips forward to return to standing tall."
                ],
                "properForm": "This is a horizontal hip hinge, NOT a knee squat. Spine stays flat like a tabletop.",
                "commonMistakes": [
                    "Squatting down instead of hinging hips back",
                    "Rounding spine to reach lower",
                    "Dumbbells drifting away from legs"
                ],
                "modification": "Practice hip hinge with hands on hips touching glutes to a wall.",
                "progression": "Single-Leg Romanian Deadlift to challenge balance and glute stability.",
                "visualKey": "deadlift"
            },
            {
                "id": "ex-bulgarian-squat",
                "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Rear foot elevated on bench behind you, front foot firm",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lower vertically until back knee hovers above floor, drive up",
                "attribution": "Photo via Unsplash License",
                "name": "Bulgarian Split Squat",
                "targetArea": "Unilateral Lower Body (Quadriceps, Gluteus Medius, Balance)",
                "difficulty": "Intermediate",
                "equipment": "Bench or Sturdy Chair",
                "sets": 3,
                "reps": "8-10 reps per leg",
                "rest": "60 sec",
                "instructions": [
                    "Stand 2-3 feet in front of a bench or chair, facing forward.",
                    "Place top of back foot on the bench.",
                    "Lower back knee toward floor until front thigh is nearly parallel to mat.",
                    "Keep torso tall or slightly hinged forward for glute emphasis.",
                    "Drive through front heel to return to standing."
                ],
                "properForm": "Ensure front foot is positioned far enough forward that front knee stays stacked over mid-foot.",
                "commonMistakes": [
                    "Front foot placed too close to bench, crowding the knee",
                    "Torso collapsing forward",
                    "Knee collapsing inward"
                ],
                "modification": "Perform static split squats with both feet on floor.",
                "progression": "Hold dumbbells at sides or add a 1.5 rep pulse at bottom.",
                "visualKey": "lunge"
            },
            {
                "id": "ex-glute-bridge",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, knees bent 90°, feet flat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hip extension, glute squeeze, neutral lumbar spine",
                "attribution": "Photo via Unsplash License",
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
                    "Drive through your heels to lift your hips until knees, hips, and shoulders form a diagonal line.",
                    "Squeeze your glutes firmly at the top for 2 seconds, then slowly lower back down."
                ],
                "properForm": "Avoid over-arching the lower back at the top; the extension must come purely from the glutes.",
                "commonMistakes": [
                    "Arching lower back excessively rather than squeezing glutes",
                    "Pushing through toes instead of heels",
                    "Letting knees splay outward or knock inward"
                ],
                "modification": "Shorten range of motion or rest a light pillow under the lower back.",
                "progression": "Single-Leg Glute Bridge or place a mini-loop resistance band above knees.",
                "visualKey": "bridge"
            },
            {
                "id": "ex-calf-raises",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand upright with feet hip-width, heels planted flat",
                "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive upward onto balls of feet, hold 2-second calf peak",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Keep ankles aligned; avoid letting ankles roll outward onto the pinky toes.",
                "commonMistakes": [
                    "Bouncing quickly without eccentric control",
                    "Ankles rolling outward at the peak",
                    "Leaning forward onto the wall"
                ],
                "modification": "Perform seated with feet flat on the floor pressing knees down lightly.",
                "progression": "Single-leg calf raises on the edge of a step for an increased stretch.",
                "visualKey": "calf"
            }
        ],
        "instructions": [
            "Dumbbell Goblet Squat \u2014 3 sets of 10-12 reps with 2-second eccentric lowering.",
            "Dumbbell Romanian Deadlift \u2014 3 sets of 10 reps focusing on hamstring stretch.",
            "Bulgarian Split Squat \u2014 3 sets of 8 reps per leg with tall torso.",
            "Glute Bridge with 2-sec Pause \u2014 3 sets of 15 reps.",
            "Standing Calf Raises \u2014 3 sets of 15 reps with peak pause."
        ]
    },
    {
        "id": "w-int-mobility",
        "image": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "4 minutes \u2014 Easy cat-cow cycles and shoulder sweeps.",
        "cooldown": "4 minutes \u2014 Supta Baddha Konasana (Reclined Butterfly) with mindful breathing.",
        "exercises": [
            {
                "id": "ex-cat-cow",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 (Cow) — Inhale, drop belly toward mat, open chest upward",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 (Cat) — Exhale, round spine to ceiling, tuck chin toward chest",
                "attribution": "Photo via Unsplash License",
                "name": "Cat-Cow Spinal Waves",
                "targetArea": "Mobility (Thoracic & Lumbar Spine, Neck)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "10 smooth cycles",
                "rest": "20 sec",
                "instructions": [
                    "Start on hands and knees with wrists under shoulders, knees under hips.",
                    "Inhale as you tilt pelvis forward, dip belly, and gently open chest forward (Cow).",
                    "Exhale as you press through palms, round spine up, and tuck chin and tailbone (Cat).",
                    "Flow between the two postures smoothly, matching breath."
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
            {
                "id": "ex-child-pose",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Kneel with big toes touching, knees wide as the mat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Walk hands forward, sink hips to heels, rest forehead",
                "attribution": "Photo via Unsplash License",
                "name": "Child's Pose with Lateral Reach",
                "targetArea": "Flexibility (Lats, Ribcage, Hips, Lower Back)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "45 sec per side",
                "rest": "20 sec",
                "instructions": [
                    "Kneel on the mat with big toes touching and knees opened wide.",
                    "Sink hips back toward heels and walk hands forward, resting forehead on mat.",
                    "Walk both hands 45 degrees to the right, feeling a stretch through left ribcage.",
                    "Breathe deeply for 45 seconds, then walk hands to the opposite side."
                ],
                "properForm": "Keep hips pinned toward heels as hands walk forward to decompress spine.",
                "commonMistakes": [
                    "Hips lifting high off heels",
                    "Tensing shoulders into ears",
                    "Shallow breathing"
                ],
                "modification": "Place a bolster or pillow under chest for torso support.",
                "progression": "Thread one arm underneath opposite armpit for thoracic rotation.",
                "visualKey": "child_pose"
            },
            {
                "id": "ex-cossack",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Extra wide sumo stance, toes turned out slightly",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Deep squat down to one side, straight leg pivots heel-down, push to center",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Keep the squatting heel flat on floor; do not lift onto toes.",
                "commonMistakes": [
                    "Lifting heel of bent leg",
                    "Collapsing chest forward",
                    "Rushing through the bottom mobility stretch"
                ],
                "modification": "Hold a sturdy doorframe or post for assistance with depth.",
                "progression": "Hold a dumbbell in goblet position or pause 3 seconds at bottom.",
                "visualKey": "cossack"
            },
            {
                "id": "ex-bird-dog",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Quadruped tabletop, wrists below shoulders, knees under hips",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Opposite arm and leg reach, level pelvis, active glute",
                "attribution": "Photo via Unsplash License",
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
                    "Hold for 2 seconds at hip and shoulder height without tilting pelvis.",
                    "Return to all fours with control and switch sides."
                ],
                "properForm": "Imagine balancing a glass of water on your lower back; hips must remain level and square.",
                "commonMistakes": [
                    "Rotating pelvis open to lift leg too high",
                    "Sagging belly toward the floor",
                    "Looking up and hyperextending neck"
                ],
                "modification": "Perform the arm reach alone, then the leg reach alone, before combining them.",
                "progression": "Hold for 4 seconds at peak extension and tap elbow to opposite knee under torso between reps.",
                "visualKey": "bird_dog"
            }
        ],
        "instructions": [
            "Cat-Cow Spinal Waves \u2014 10 smooth fluid cycles.",
            "Child's Pose with Lateral Reach \u2014 60 seconds per side.",
            "Deep Cossack Squats \u2014 3 sets of 6-8 reps per side for hip adductor mobility.",
            "Quadruped Bird Dog \u2014 3 sets of 8 reps per side with 3-second hold."
        ]
    },
    {
        "id": "w-mob-1",
        "image": "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "3 minutes \u2014 Deep diaphragmatic belly breathing.",
        "cooldown": "4 minutes \u2014 Legs-Up-The-Wall (Viparita Karani) effortless relaxation.",
        "exercises": [
            {
                "id": "ex-child-pose",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Kneel with big toes touching, knees wide as the mat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Walk hands forward, sink hips to heels, rest forehead",
                "attribution": "Photo via Unsplash License",
                "name": "Child's Pose with Lateral Reach",
                "targetArea": "Flexibility (Lats, Ribcage, Hips, Lower Back)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "45 sec per side",
                "rest": "20 sec",
                "instructions": [
                    "Kneel on the mat with big toes touching and knees opened wide.",
                    "Sink hips back toward heels and walk hands forward, resting forehead on mat.",
                    "Walk both hands 45 degrees to the right, feeling a stretch through left ribcage.",
                    "Breathe deeply for 45 seconds, then walk hands to the opposite side."
                ],
                "properForm": "Keep hips pinned toward heels as hands walk forward to decompress spine.",
                "commonMistakes": [
                    "Hips lifting high off heels",
                    "Tensing shoulders into ears",
                    "Shallow breathing"
                ],
                "modification": "Place a bolster or pillow under chest for torso support.",
                "progression": "Thread one arm underneath opposite armpit for thoracic rotation.",
                "visualKey": "child_pose"
            },
            {
                "id": "ex-seated-hamstring",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Seated tall with one leg extended, opposite foot tucked",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hinge forward from hips, maintain flat spine, breathe easy",
                "attribution": "Photo via Unsplash License",
                "name": "Seated Hamstring & Posterior Stretch",
                "targetArea": "Flexibility (Hamstrings, Calves, Lower Back)",
                "difficulty": "Beginner",
                "equipment": "Mat or Chair",
                "sets": 3,
                "reps": "30 sec per leg",
                "rest": "20 sec",
                "instructions": [
                    "Sit tall on the edge of a chair or mat with right leg extended straight, heel on floor.",
                    "Flex right foot so toes point toward ceiling.",
                    "Hinge gently forward from hips with flat back until comfortable stretch is felt along back of thigh.",
                    "Breathe deeply and hold for 30 seconds before switching legs."
                ],
                "properForm": "Hinge from hips with long spine; do not round upper back to reach toes.",
                "commonMistakes": [
                    "Rounding spine and dropping chest",
                    "Locking knee joint aggressively",
                    "Bouncing during stretch"
                ],
                "modification": "Perform with a slight micro-bend in the knee.",
                "progression": "Loop a towel or strap around the ball of foot to assist the hinge.",
                "visualKey": "stretch"
            },
            {
                "id": "ex-cat-cow",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 (Cow) — Inhale, drop belly toward mat, open chest upward",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 (Cat) — Exhale, round spine to ceiling, tuck chin toward chest",
                "attribution": "Photo via Unsplash License",
                "name": "Cat-Cow Spinal Waves",
                "targetArea": "Mobility (Thoracic & Lumbar Spine, Neck)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "10 smooth cycles",
                "rest": "20 sec",
                "instructions": [
                    "Start on hands and knees with wrists under shoulders, knees under hips.",
                    "Inhale as you tilt pelvis forward, dip belly, and gently open chest forward (Cow).",
                    "Exhale as you press through palms, round spine up, and tuck chin and tailbone (Cat).",
                    "Flow between the two postures smoothly, matching breath."
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
            {
                "id": "ex-wall-angels",
                "image": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand against wall, elbows and knuckles flat in 'W' shape",
                "stageEndImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Slide arms upward into 'Y' shape keeping contact with wall",
                "attribution": "Photo via Unsplash License",
                "name": "Wall Angels for Posture Alignment",
                "targetArea": "Upper Back & Shoulders (Rhomboids, Mid/Lower Trapezius, Thoracic Spine)",
                "difficulty": "Beginner",
                "equipment": "Flat Wall",
                "sets": 3,
                "reps": "10-12 smooth reps",
                "rest": "30 sec",
                "instructions": [
                    "Stand with your back flat against a wall, heels 3-4 inches away from baseboard.",
                    "Press tailbone, upper back, and back of head gently against the wall.",
                    "Bring arms into a goalpost position (elbows bent 90 degrees, backs of hands against wall).",
                    "Slowly slide arms overhead along the wall as high as you can without arching your back.",
                    "Slowly slide elbows back down to your sides, squeezing shoulder blades together."
                ],
                "properForm": "Maintain ribcage engagement so lower back does not bow away from the wall.",
                "commonMistakes": [
                    "Arching lower back off the wall as arms reach up",
                    "Elbows or wrists pulling away from the wall",
                    "Holding breath during arm slide"
                ],
                "modification": "Perform lying on the floor in supine position with knees bent.",
                "progression": "Add a 2-second squeeze at the bottom contraction.",
                "visualKey": "posture"
            }
        ],
        "instructions": [
            "Child's Pose with Bolster \u2014 3 minutes breathing into posterior ribcage.",
            "Seated Hamstring Fold with Soft Knees \u2014 2 minutes breathing into hamstrings.",
            "Cat-Cow Spinal Waves \u2014 10 slow gentle repetitions.",
            "Gentle Reclined Spinal Twist \u2014 2 minutes each side releasing lower back tension."
        ]
    },
    {
        "id": "w-adv-strength",
        "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "6 minutes \u2014 World's greatest stretch, bodyweight squats, plank shoulder taps, arm swings.",
        "cooldown": "5 minutes \u2014 Deep pigeon stretch, seated forward fold, diaphragmatic box breathing.",
        "exercises": [
            {
                "id": "ex-goblet-squat",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hold dumbbell vertically against chest, elbows tucked",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Squat between knees, elbows touch inside of knees, stand tall",
                "attribution": "Photo via Unsplash License",
                "name": "Dumbbell Goblet Squat",
                "targetArea": "Lower Body & Core (Quadriceps, Glutes, Core Bracing)",
                "difficulty": "Intermediate",
                "equipment": "1 Dumbbell (4-12 kg)",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "60 sec",
                "instructions": [
                    "Hold a dumbbell vertically against chest with both hands cupping the upper head.",
                    "Set feet slightly wider than shoulder-width, toes angled slightly out.",
                    "Brace core and lower hips into deep squat, keeping chest proud.",
                    "Ensure elbows travel naturally inside knees at the bottom.",
                    "Drive through mid-foot and heels to stand tall, exhaling at top."
                ],
                "properForm": "Keep weight touching sternum; do not let it drift forward.",
                "commonMistakes": [
                    "Weight pulling chest forward into a round back",
                    "Knees caving inward on ascent",
                    "Rising onto toes"
                ],
                "modification": "Use a lighter dumbbell or bodyweight with hands clasped at chest.",
                "progression": "Add a 2-second isometric pause at the bottom of every rep.",
                "visualKey": "squat"
            },
            {
                "id": "ex-db-rdl",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand tall holding weights against thighs, knees soft",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hinge hips backward until hamstrings load, spine flat, snap to stand",
                "attribution": "Photo via Unsplash License",
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
                    "Push hips straight back as if touching a wall behind you with glutes.",
                    "Slide dumbbells closely down shins until hamstrings stretch.",
                    "Squeeze glutes and drive hips forward to return to standing tall."
                ],
                "properForm": "This is a horizontal hip hinge, NOT a knee squat. Spine stays flat like a tabletop.",
                "commonMistakes": [
                    "Squatting down instead of hinging hips back",
                    "Rounding spine to reach lower",
                    "Dumbbells drifting away from legs"
                ],
                "modification": "Practice hip hinge with hands on hips touching glutes to a wall.",
                "progression": "Single-Leg Romanian Deadlift to challenge balance and glute stability.",
                "visualKey": "deadlift"
            },
            {
                "id": "ex-renegade-row",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — High plank with hands gripping hex dumbbells, wide foot base",
                "stageEndImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Row one dumbbell to hip without twisting pelvis, alternate sides",
                "attribution": "Photo via Unsplash License",
                "name": "Plank Renegade Rows with Push-Up",
                "targetArea": "Upper Body & Anti-Rotation Core (Lats, Chest, Obliques)",
                "difficulty": "Advanced",
                "equipment": "Pair of Hex Dumbbells",
                "sets": 3,
                "reps": "8-10 reps per side",
                "rest": "60 sec",
                "instructions": [
                    "Assume high plank position gripping hex dumbbells on floor, feet wide for stability.",
                    "Perform a strict push-up, lowering chest between weights and pressing up.",
                    "Brace core and row right dumbbell to hip, keeping hips square to floor.",
                    "Lower right dumbbell, then row left dumbbell to hip.",
                    "That counts as one full repetition."
                ],
                "properForm": "Do not rotate hips when rowing; imagine balancing water glasses on your lower back.",
                "commonMistakes": [
                    "Twisting hips open toward ceiling",
                    "Feet too narrow causing balance loss",
                    "Sagging lower back during push-up"
                ],
                "modification": "Perform from knees or execute rows without the push-up.",
                "progression": "Increase dumbbell weight or pause 2 seconds at the top of each row.",
                "visualKey": "row"
            },
            {
                "id": "ex-bulgarian-squat",
                "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Rear foot elevated on bench behind you, front foot firm",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lower vertically until back knee hovers above floor, drive up",
                "attribution": "Photo via Unsplash License",
                "name": "Bulgarian Split Squat",
                "targetArea": "Unilateral Lower Body (Quadriceps, Gluteus Medius, Balance)",
                "difficulty": "Intermediate",
                "equipment": "Bench or Sturdy Chair",
                "sets": 3,
                "reps": "8-10 reps per leg",
                "rest": "60 sec",
                "instructions": [
                    "Stand 2-3 feet in front of a bench or chair, facing forward.",
                    "Place top of back foot on the bench.",
                    "Lower back knee toward floor until front thigh is nearly parallel to mat.",
                    "Keep torso tall or slightly hinged forward for glute emphasis.",
                    "Drive through front heel to return to standing."
                ],
                "properForm": "Ensure front foot is positioned far enough forward that front knee stays stacked over mid-foot.",
                "commonMistakes": [
                    "Front foot placed too close to bench, crowding the knee",
                    "Torso collapsing forward",
                    "Knee collapsing inward"
                ],
                "modification": "Perform static split squats with both feet on floor.",
                "progression": "Hold dumbbells at sides or add a 1.5 rep pulse at bottom.",
                "visualKey": "lunge"
            },
            {
                "id": "ex-diamond-pushup",
                "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Thumbs and index fingers touch directly under center of chest",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lower chest to touch hands, elbows tracking back, lock triceps",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Flaring elbows wide",
                    "Sagging lower back",
                    "Placing hands too far in front of shoulders"
                ],
                "modification": "Perform from knees or on an incline bench.",
                "progression": "Elevate feet on a low step for deficit diamond push-ups.",
                "visualKey": "pushup"
            }
        ],
        "instructions": [
            "Heavy Dumbbell Goblet Squats \u2014 4 sets of 8-10 reps with 3-second descent.",
            "Dumbbell Romanian Deadlifts \u2014 4 sets of 10 reps with heavy hinge tension.",
            "Plank Renegade Rows with Push-Up \u2014 3 sets of 8 reps per side.",
            "Weighted Bulgarian Split Squats \u2014 3 sets of 8 reps per leg.",
            "Diamond Tricep Push-Ups \u2014 3 sets of 8-10 reps to fatigue."
        ]
    },
    {
        "id": "w-adv-fullbody",
        "image": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "6 minutes \u2014 High knees, skaters, inchworms, hip openers.",
        "cooldown": "5 minutes \u2014 Child's pose, gentle spinal twists, slow walking recovery.",
        "exercises": [
            {
                "id": "ex-devils-press",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Burpee down with hands on dumbbells, chest to floor",
                "stageEndImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Jump feet wide, swing dumbbells between knees overhead in one fluid arc",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Rounding lower back on swing",
                    "Muscling weight with arms instead of hips",
                    "Crashing down uncontrolled"
                ],
                "modification": "Use single dumbbell with two hands or perform clean-and-press.",
                "progression": "Increase dumbbell weight or decrease rest intervals.",
                "visualKey": "burpee"
            },
            {
                "id": "ex-jump-squats",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Lower to quarter or parallel squat, arms swing back",
                "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Explode vertically, triple extension at ankles, knees, hips; land softly",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Landing stiff-legged",
                    "Knees caving inward upon landing",
                    "Loud, slapping foot strikes"
                ],
                "modification": "Fast Bodyweight Air Squats with explosive calf raise at top (no flight).",
                "progression": "Tuck Jumps or continuous rhythmic tempo.",
                "visualKey": "squat"
            },
            {
                "id": "ex-renegade-row",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — High plank with hands gripping hex dumbbells, wide foot base",
                "stageEndImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Row one dumbbell to hip without twisting pelvis, alternate sides",
                "attribution": "Photo via Unsplash License",
                "name": "Plank Renegade Rows with Push-Up",
                "targetArea": "Upper Body & Anti-Rotation Core (Lats, Chest, Obliques)",
                "difficulty": "Advanced",
                "equipment": "Pair of Hex Dumbbells",
                "sets": 3,
                "reps": "8-10 reps per side",
                "rest": "60 sec",
                "instructions": [
                    "Assume high plank position gripping hex dumbbells on floor, feet wide for stability.",
                    "Perform a strict push-up, lowering chest between weights and pressing up.",
                    "Brace core and row right dumbbell to hip, keeping hips square to floor.",
                    "Lower right dumbbell, then row left dumbbell to hip.",
                    "That counts as one full repetition."
                ],
                "properForm": "Do not rotate hips when rowing; imagine balancing water glasses on your lower back.",
                "commonMistakes": [
                    "Twisting hips open toward ceiling",
                    "Feet too narrow causing balance loss",
                    "Sagging lower back during push-up"
                ],
                "modification": "Perform from knees or execute rows without the push-up.",
                "progression": "Increase dumbbell weight or pause 2 seconds at the top of each row.",
                "visualKey": "row"
            },
            {
                "id": "ex-burpee-flow",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Squat, hands to floor, kick back into push-up chest drop",
                "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Snap feet forward to hands, jump vertically with overhead clap",
                "attribution": "Photo via Unsplash License",
                "name": "Athletic Burpee Flow",
                "targetArea": "Full Body Conditioning (Heart Rate, Chest, Legs, Core)",
                "difficulty": "Advanced",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "60 sec",
                "instructions": [
                    "Stand tall, feet hip-width apart.",
                    "Drop hands to floor inside feet.",
                    "Jump both feet back into a high plank position.",
                    "Lower chest to floor for a full push-up, then press up.",
                    "Jump feet forward outside hands into low squat, then explode upward reaching overhead."
                ],
                "properForm": "Maintain high plank alignment; do not let hips sag when jumping back.",
                "commonMistakes": [
                    "Collapsing hips toward floor when jumping back",
                    "Landing stiff-legged from jump",
                    "Bending over at waist instead of squatting"
                ],
                "modification": "Step feet back one at a time, omit the push-up, and stand tall with calf raise.",
                "progression": "Add a tuck jump at the top.",
                "visualKey": "burpee"
            },
            {
                "id": "ex-russian-twist",
                "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Seated with knees bent, torso reclined 45°, holding weight at chest",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Rotate shoulders and weight toward floor on one side with 1-sec pause",
                "attribution": "Photo via Unsplash License",
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
                    "Hold dumbbell with both hands and rotate torso to right, tapping weight beside hip.",
                    "Rotate through center to left with control.",
                    "Keep knees steady and prevent them from swaying."
                ],
                "properForm": "Rotate your entire ribcage and shoulders, not just your arms and hands.",
                "commonMistakes": [
                    "Rounding spine into a slouch",
                    "Swinging arms without rotating torso",
                    "Knees wobbling side to side"
                ],
                "modification": "Keep heels resting firmly on floor and use bodyweight.",
                "progression": "Extend legs straight out (V-sit position) with weight.",
                "visualKey": "twist"
            }
        ],
        "instructions": [
            "Dumbbell Devil's Press \u2014 3 sets of 8-10 reps with explosive hip drive.",
            "Explosive Squat Jumps \u2014 3 sets of 10 reps with soft, spring-like landings.",
            "Renegade Rows with Push-Up \u2014 3 sets of 8 reps each arm.",
            "Athletic Burpee Flow \u2014 3 sets of 10 reps.",
            "Weighted Russian Twists \u2014 3 sets of 16 reps with 2-second hold at edges."
        ]
    },
    {
        "id": "w-adv-upper",
        "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Arm circles, band pull-aparts, scapular push-ups.",
        "cooldown": "5 minutes \u2014 Doorway pec stretch, cross-body shoulder stretch, wrist stretches.",
        "exercises": [
            {
                "id": "ex-renegade-row",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — High plank with hands gripping hex dumbbells, wide foot base",
                "stageEndImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Row one dumbbell to hip without twisting pelvis, alternate sides",
                "attribution": "Photo via Unsplash License",
                "name": "Plank Renegade Rows with Push-Up",
                "targetArea": "Upper Body & Anti-Rotation Core (Lats, Chest, Obliques)",
                "difficulty": "Advanced",
                "equipment": "Pair of Hex Dumbbells",
                "sets": 3,
                "reps": "8-10 reps per side",
                "rest": "60 sec",
                "instructions": [
                    "Assume high plank position gripping hex dumbbells on floor, feet wide for stability.",
                    "Perform a strict push-up, lowering chest between weights and pressing up.",
                    "Brace core and row right dumbbell to hip, keeping hips square to floor.",
                    "Lower right dumbbell, then row left dumbbell to hip.",
                    "That counts as one full repetition."
                ],
                "properForm": "Do not rotate hips when rowing; imagine balancing water glasses on your lower back.",
                "commonMistakes": [
                    "Twisting hips open toward ceiling",
                    "Feet too narrow causing balance loss",
                    "Sagging lower back during push-up"
                ],
                "modification": "Perform from knees or execute rows without the push-up.",
                "progression": "Increase dumbbell weight or pause 2 seconds at the top of each row.",
                "visualKey": "row"
            },
            {
                "id": "ex-diamond-pushup",
                "image": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Thumbs and index fingers touch directly under center of chest",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lower chest to touch hands, elbows tracking back, lock triceps",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Flaring elbows wide",
                    "Sagging lower back",
                    "Placing hands too far in front of shoulders"
                ],
                "modification": "Perform from knees or on an incline bench.",
                "progression": "Elevate feet on a low step for deficit diamond push-ups.",
                "visualKey": "pushup"
            },
            {
                "id": "ex-db-row",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hinge at hips 45°, flat back, arms hanging naturally",
                "stageEndImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Row dumbbells toward hips, driving elbows back and squeezing lats",
                "attribution": "Photo via Unsplash License",
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
                    "Pull dumbbells toward hip bones, driving elbows back toward ceiling.",
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
            {
                "id": "ex-tricep-dips",
                "image": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Hands grip edge of bench/chair, hips forward, arms straight",
                "stageEndImg": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lower until elbows bend 90°, press through palms to lock triceps",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Drifting body far from chair (strains shoulders)",
                    "Shrugging shoulders into neck",
                    "Flaring elbows wide"
                ],
                "modification": "Keep feet closer to chair with knees bent 90 degrees.",
                "progression": "Extend legs straight out with heels resting on floor.",
                "visualKey": "dip"
            },
            {
                "id": "ex-plank-taps",
                "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — High plank with feet slightly wider than shoulder width",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lift right hand to tap left shoulder without swaying hips, repeat opposite",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Swiveling hips side to side",
                    "Hands placed too far forward",
                    "Sagging lower back"
                ],
                "modification": "Perform from knees or on an elevated counter.",
                "progression": "Narrow foot stance or hold tap for 2 seconds.",
                "visualKey": "plank"
            }
        ],
        "instructions": [
            "Plank Renegade Rows with Push-Up \u2014 3 sets of 10 reps each side.",
            "Diamond Tricep Push-Ups \u2014 3 sets of 10 reps with strict form.",
            "Heavy Dumbbell Bent-Over Row \u2014 3 sets of 10 reps holding 1 second at top.",
            "Bench Tricep Dips with Straight Legs \u2014 3 sets of 12 reps.",
            "High Plank Shoulder Taps \u2014 3 sets of 20 alternating taps with zero hip sway."
        ]
    },
    {
        "id": "w-adv-lower",
        "image": "https://images.unsplash.com/photo-1567598508481-65985588e295?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "6 minutes \u2014 Leg swings, lateral lunges, glute bridges, ankle rolls.",
        "cooldown": "5 minutes \u2014 Couch stretch for hip flexors, pigeon pose, hamstring fold.",
        "exercises": [
            {
                "id": "ex-bulgarian-squat",
                "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Rear foot elevated on bench behind you, front foot firm",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lower vertically until back knee hovers above floor, drive up",
                "attribution": "Photo via Unsplash License",
                "name": "Bulgarian Split Squat",
                "targetArea": "Unilateral Lower Body (Quadriceps, Gluteus Medius, Balance)",
                "difficulty": "Intermediate",
                "equipment": "Bench or Sturdy Chair",
                "sets": 3,
                "reps": "8-10 reps per leg",
                "rest": "60 sec",
                "instructions": [
                    "Stand 2-3 feet in front of a bench or chair, facing forward.",
                    "Place top of back foot on the bench.",
                    "Lower back knee toward floor until front thigh is nearly parallel to mat.",
                    "Keep torso tall or slightly hinged forward for glute emphasis.",
                    "Drive through front heel to return to standing."
                ],
                "properForm": "Ensure front foot is positioned far enough forward that front knee stays stacked over mid-foot.",
                "commonMistakes": [
                    "Front foot placed too close to bench, crowding the knee",
                    "Torso collapsing forward",
                    "Knee collapsing inward"
                ],
                "modification": "Perform static split squats with both feet on floor.",
                "progression": "Hold dumbbells at sides or add a 1.5 rep pulse at bottom.",
                "visualKey": "lunge"
            },
            {
                "id": "ex-db-rdl",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Stand tall holding weights against thighs, knees soft",
                "stageEndImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hinge hips backward until hamstrings load, spine flat, snap to stand",
                "attribution": "Photo via Unsplash License",
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
                    "Push hips straight back as if touching a wall behind you with glutes.",
                    "Slide dumbbells closely down shins until hamstrings stretch.",
                    "Squeeze glutes and drive hips forward to return to standing tall."
                ],
                "properForm": "This is a horizontal hip hinge, NOT a knee squat. Spine stays flat like a tabletop.",
                "commonMistakes": [
                    "Squatting down instead of hinging hips back",
                    "Rounding spine to reach lower",
                    "Dumbbells drifting away from legs"
                ],
                "modification": "Practice hip hinge with hands on hips touching glutes to a wall.",
                "progression": "Single-Leg Romanian Deadlift to challenge balance and glute stability.",
                "visualKey": "deadlift"
            },
            {
                "id": "ex-jump-squats",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Lower to quarter or parallel squat, arms swing back",
                "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Explode vertically, triple extension at ankles, knees, hips; land softly",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Landing stiff-legged",
                    "Knees caving inward upon landing",
                    "Loud, slapping foot strikes"
                ],
                "modification": "Fast Bodyweight Air Squats with explosive calf raise at top (no flight).",
                "progression": "Tuck Jumps or continuous rhythmic tempo.",
                "visualKey": "squat"
            },
            {
                "id": "ex-cossack",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Extra wide sumo stance, toes turned out slightly",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Deep squat down to one side, straight leg pivots heel-down, push to center",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Keep the squatting heel flat on floor; do not lift onto toes.",
                "commonMistakes": [
                    "Lifting heel of bent leg",
                    "Collapsing chest forward",
                    "Rushing through the bottom mobility stretch"
                ],
                "modification": "Hold a sturdy doorframe or post for assistance with depth.",
                "progression": "Hold a dumbbell in goblet position or pause 3 seconds at bottom.",
                "visualKey": "cossack"
            },
            {
                "id": "ex-glute-bridge",
                "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Supine on mat, knees bent 90°, feet flat",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Hip extension, glute squeeze, neutral lumbar spine",
                "attribution": "Photo via Unsplash License",
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
                    "Drive through your heels to lift your hips until knees, hips, and shoulders form a diagonal line.",
                    "Squeeze your glutes firmly at the top for 2 seconds, then slowly lower back down."
                ],
                "properForm": "Avoid over-arching the lower back at the top; the extension must come purely from the glutes.",
                "commonMistakes": [
                    "Arching lower back excessively rather than squeezing glutes",
                    "Pushing through toes instead of heels",
                    "Letting knees splay outward or knock inward"
                ],
                "modification": "Shorten range of motion or rest a light pillow under the lower back.",
                "progression": "Single-Leg Glute Bridge or place a mini-loop resistance band above knees.",
                "visualKey": "bridge"
            }
        ],
        "instructions": [
            "Weighted Bulgarian Split Squats \u2014 3 sets of 10 reps per leg with dumbbells.",
            "Heavy Dumbbell Romanian Deadlift \u2014 3 sets of 10 reps with slow 3-second lowering.",
            "Explosive Squat Jumps \u2014 3 sets of 10 reps for vertical power.",
            "Deep Cossack Squats \u2014 3 sets of 8 reps per side with full range of motion.",
            "Single-Leg Glute Bridge \u2014 3 sets of 12 reps per leg."
        ]
    },
    {
        "id": "w-adv-core",
        "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "4 minutes \u2014 Cat-cow waves and quadruped thoracic rotations.",
        "cooldown": "4 minutes \u2014 Sphinx pose, gentle seal stretch, child's pose.",
        "exercises": [
            {
                "id": "ex-hollow-hold",
                "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Lie flat, press lower back glued completely to the floor",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lift shoulder blades and straight legs 4 inches off floor in banana shape",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Lower back popping off floor",
                    "Holding breath",
                    "Straining neck"
                ],
                "modification": "Hollow Tuck: bend knees to 90 degrees with hands reaching toward heels.",
                "progression": "Add slow hollow body rocks forward and backward.",
                "visualKey": "dead_bug"
            },
            {
                "id": "ex-russian-twist",
                "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Seated with knees bent, torso reclined 45°, holding weight at chest",
                "stageEndImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Rotate shoulders and weight toward floor on one side with 1-sec pause",
                "attribution": "Photo via Unsplash License",
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
                    "Hold dumbbell with both hands and rotate torso to right, tapping weight beside hip.",
                    "Rotate through center to left with control.",
                    "Keep knees steady and prevent them from swaying."
                ],
                "properForm": "Rotate your entire ribcage and shoulders, not just your arms and hands.",
                "commonMistakes": [
                    "Rounding spine into a slouch",
                    "Swinging arms without rotating torso",
                    "Knees wobbling side to side"
                ],
                "modification": "Keep heels resting firmly on floor and use bodyweight.",
                "progression": "Extend legs straight out (V-sit position) with weight.",
                "visualKey": "twist"
            },
            {
                "id": "ex-plank-taps",
                "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — High plank with feet slightly wider than shoulder width",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lift right hand to tap left shoulder without swaying hips, repeat opposite",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Swiveling hips side to side",
                    "Hands placed too far forward",
                    "Sagging lower back"
                ],
                "modification": "Perform from knees or on an elevated counter.",
                "progression": "Narrow foot stance or hold tap for 2 seconds.",
                "visualKey": "plank"
            },
            {
                "id": "ex-side-plank",
                "image": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Side-lying with forearm perpendicular to body, feet stacked",
                "stageEndImg": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Lift hips until body forms straight diagonal line from shoulder to ankles",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Hips sagging toward floor",
                    "Top hip rolling forward or backward",
                    "Neck straining"
                ],
                "modification": "Bend bottom knee at 90 degrees on floor for knee-assisted side plank.",
                "progression": "Lift top leg into a side plank star.",
                "visualKey": "side_plank"
            },
            {
                "id": "ex-mountain-climbers",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Full high plank position with shoulders over wrists",
                "stageEndImg": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive one knee toward chest, snap back and alternate smoothly",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Piking hips high in air",
                    "Bouncing hips up and down",
                    "Shoulders drifting behind wrists"
                ],
                "modification": "Perform slowly one knee at a time without jumping.",
                "progression": "Drive knees cross-body toward opposite elbow (Cross-Body Climbers).",
                "visualKey": "climber"
            }
        ],
        "instructions": [
            "Gymnastic Hollow Body Hold \u2014 3 sets of 30 seconds with lower back glued to floor.",
            "Weighted Russian Twists \u2014 3 sets of 16 controlled reps with dumbbell.",
            "High Plank Shoulder Taps \u2014 3 sets of 20 alternating taps without hip sway.",
            "Forearm Side Plank with Top Leg Lift \u2014 3 sets of 25 seconds per side.",
            "Cross-Body Mountain Climbers \u2014 3 sets of 30 seconds for dynamic core drive."
        ]
    },
    {
        "id": "w-adv-cardio",
        "image": "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Jog in place, dynamic leg swings, arm circles, air squats.",
        "cooldown": "5 minutes \u2014 Slow walking, chest opening stretches, forward fold with deep inhales.",
        "exercises": [
            {
                "id": "ex-burpee-flow",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Squat, hands to floor, kick back into push-up chest drop",
                "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Snap feet forward to hands, jump vertically with overhead clap",
                "attribution": "Photo via Unsplash License",
                "name": "Athletic Burpee Flow",
                "targetArea": "Full Body Conditioning (Heart Rate, Chest, Legs, Core)",
                "difficulty": "Advanced",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "10-12 reps",
                "rest": "60 sec",
                "instructions": [
                    "Stand tall, feet hip-width apart.",
                    "Drop hands to floor inside feet.",
                    "Jump both feet back into a high plank position.",
                    "Lower chest to floor for a full push-up, then press up.",
                    "Jump feet forward outside hands into low squat, then explode upward reaching overhead."
                ],
                "properForm": "Maintain high plank alignment; do not let hips sag when jumping back.",
                "commonMistakes": [
                    "Collapsing hips toward floor when jumping back",
                    "Landing stiff-legged from jump",
                    "Bending over at waist instead of squatting"
                ],
                "modification": "Step feet back one at a time, omit the push-up, and stand tall with calf raise.",
                "progression": "Add a tuck jump at the top.",
                "visualKey": "burpee"
            },
            {
                "id": "ex-jump-squats",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Lower to quarter or parallel squat, arms swing back",
                "stageEndImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Explode vertically, triple extension at ankles, knees, hips; land softly",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Landing stiff-legged",
                    "Knees caving inward upon landing",
                    "Loud, slapping foot strikes"
                ],
                "modification": "Fast Bodyweight Air Squats with explosive calf raise at top (no flight).",
                "progression": "Tuck Jumps or continuous rhythmic tempo.",
                "visualKey": "squat"
            },
            {
                "id": "ex-skaters",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Load outside foot with slight knee bend and hinge",
                "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Bound laterally, land softly on opposite leg, sweep trail leg behind",
                "attribution": "Photo via Unsplash License",
                "name": "Lateral Speed Skater Glides",
                "targetArea": "Cardiovascular, Gluteus Medius, Balance",
                "difficulty": "Intermediate",
                "equipment": "No equipment",
                "sets": 3,
                "reps": "40 sec",
                "rest": "20 sec",
                "instructions": [
                    "Start on right side of space, knees soft, hinged slightly forward at hips.",
                    "Bound laterally to left, landing softly on left foot while sweeping right foot behind.",
                    "Immediately bound laterally back to right, sweeping left foot behind.",
                    "Pump arms naturally in a speed-skater motion."
                ],
                "properForm": "Absorb landing by bending into hip and knee; never land stiff-legged.",
                "commonMistakes": [
                    "Landing heavily with stiff knees",
                    "Rounding spine",
                    "Knee buckling inward on landing"
                ],
                "modification": "Perform lateral step-behinds without the airborne jump.",
                "progression": "Add a floor tap with opposite hand on each landing.",
                "visualKey": "skaters"
            },
            {
                "id": "ex-high-knees",
                "image": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Athletic upright sprint stance on balls of feet",
                "stageEndImg": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive knees rapidly to hip height with aggressive arm pump",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Leaning backwards",
                    "Stamping feet down heavily",
                    "Hunching shoulders"
                ],
                "modification": "Perform a brisk high march without the bounce.",
                "progression": "Increase cadence and drive knees above waist height.",
                "visualKey": "march"
            },
            {
                "id": "ex-mountain-climbers",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Full high plank position with shoulders over wrists",
                "stageEndImg": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive one knee toward chest, snap back and alternate smoothly",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Piking hips high in air",
                    "Bouncing hips up and down",
                    "Shoulders drifting behind wrists"
                ],
                "modification": "Perform slowly one knee at a time without jumping.",
                "progression": "Drive knees cross-body toward opposite elbow (Cross-Body Climbers).",
                "visualKey": "climber"
            }
        ],
        "instructions": [
            "Athletic Burpee Flow \u2014 40 seconds work, 20 seconds rest (3 rounds).",
            "Explosive Squat Jumps \u2014 30 seconds work, 30 seconds rest (3 rounds).",
            "Lateral Speed Skaters \u2014 40 seconds work, 20 seconds rest (3 rounds).",
            "Sprinting High Knees \u2014 30 seconds work, 30 seconds rest (3 rounds).",
            "Fast Mountain Climbers \u2014 30 seconds work, 30 seconds rest (3 rounds)."
        ]
    },
    {
        "id": "w-adv-mobility",
        "image": "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=600&q=80",
        "attribution": "Photo via Unsplash License",
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
        "warmup": "5 minutes \u2014 Wrist prep, downward dog to cobra, deep squat pry.",
        "cooldown": "5 minutes \u2014 Reclined butterfly pose, child's pose, diaphragmatic relaxation.",
        "exercises": [
            {
                "id": "ex-crab-reach",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Reverse tabletop, hands behind hips, knees bent 90°",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Drive hips to ceiling while sweeping one arm up and diagonally overhead",
                "attribution": "Photo via Unsplash License",
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
                "commonMistakes": [
                    "Collapsing into base shoulder",
                    "Not extending hips fully",
                    "Rushing through the reach"
                ],
                "modification": "Standard tabletop reverse bridge with both hands on floor.",
                "progression": "Dynamic transition from Quadruped Beast into Crab Reach.",
                "visualKey": "mobility"
            },
            {
                "id": "ex-cossack",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Extra wide sumo stance, toes turned out slightly",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Deep squat down to one side, straight leg pivots heel-down, push to center",
                "attribution": "Photo via Unsplash License",
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
                "properForm": "Keep the squatting heel flat on floor; do not lift onto toes.",
                "commonMistakes": [
                    "Lifting heel of bent leg",
                    "Collapsing chest forward",
                    "Rushing through the bottom mobility stretch"
                ],
                "modification": "Hold a sturdy doorframe or post for assistance with depth.",
                "progression": "Hold a dumbbell in goblet position or pause 3 seconds at bottom.",
                "visualKey": "cossack"
            },
            {
                "id": "ex-cat-cow",
                "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 (Cow) — Inhale, drop belly toward mat, open chest upward",
                "stageEndImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 (Cat) — Exhale, round spine to ceiling, tuck chin toward chest",
                "attribution": "Photo via Unsplash License",
                "name": "Cat-Cow Spinal Waves",
                "targetArea": "Mobility (Thoracic & Lumbar Spine, Neck)",
                "difficulty": "Beginner",
                "equipment": "Mat",
                "sets": 2,
                "reps": "10 smooth cycles",
                "rest": "20 sec",
                "instructions": [
                    "Start on hands and knees with wrists under shoulders, knees under hips.",
                    "Inhale as you tilt pelvis forward, dip belly, and gently open chest forward (Cow).",
                    "Exhale as you press through palms, round spine up, and tuck chin and tailbone (Cat).",
                    "Flow between the two postures smoothly, matching breath."
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
            {
                "id": "ex-bird-dog",
                "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStartImg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "stageStart": "Stage 1 — Quadruped tabletop, wrists below shoulders, knees under hips",
                "stageEndImg": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                "stageEnd": "Stage 2 — Opposite arm and leg reach, level pelvis, active glute",
                "attribution": "Photo via Unsplash License",
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
                    "Hold for 2 seconds at hip and shoulder height without tilting pelvis.",
                    "Return to all fours with control and switch sides."
                ],
                "properForm": "Imagine balancing a glass of water on your lower back; hips must remain level and square.",
                "commonMistakes": [
                    "Rotating pelvis open to lift leg too high",
                    "Sagging belly toward the floor",
                    "Looking up and hyperextending neck"
                ],
                "modification": "Perform the arm reach alone, then the leg reach alone, before combining them.",
                "progression": "Hold for 4 seconds at peak extension and tap elbow to opposite knee under torso between reps.",
                "visualKey": "bird_dog"
            }
        ],
        "instructions": [
            "Beast to Crab Reach Flow \u2014 3 sets of 6 smooth repetitions per side.",
            "Deep Cossack Squats to Overhead Reach \u2014 3 sets of 8 reps per side.",
            "Thoracic Cat-Cow Waves with Lateral Rib Circles \u2014 12 slow cycles.",
            "Quadruped Bird Dog with 5-Second Iso-Hold \u2014 3 sets of 6 reps per side."
        ]
    }
],

  // 6b. Workout History Log
  workoutHistory: [
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
],

  // 7. Mood & Mental Wellness
  moodWellness: {
    currentMood: 'Calm & Centered',
    energyLevel: 8, // 1 to 10
    stressLevel: 'Low', // 'Low', 'Moderate', 'Elevated'
    recentLogs: [
      { id: 1, date: 'Today, 2:30 PM', mood: 'Calm & Centered', energy: 8, stress: 'Low', note: 'Took a 15-min walk outside in natural sunlight. Felt recharged.' },
      { id: 2, date: 'Yesterday, 8:00 PM', mood: 'Grateful & Relaxed', energy: 7, stress: 'Low', note: 'Finished reading a book chapter and drank chamomile tea.' },
      { id: 3, date: 'Sep 25, 2026', mood: 'Focused & Energized', energy: 9, stress: 'Moderate', note: 'Busy workday but accomplished key tasks efficiently.' }
    ],
    // Breathing Exercise Presets
    breathingExercises: [
      {
        id: 'box-breathing',
        name: '4-4-4-4 Box Breathing',
        purpose: 'Navy SEAL technique for instant calm, mental clarity, and nervous system balance.',
        inhale: 4,
        hold1: 4,
        exhale: 4,
        hold2: 4,
        recommendedCycles: 4
      },
      {
        id: 'calming-478',
        name: '4-7-8 Relaxation Breath',
        purpose: 'Dr. Weil natural tranquilizer for the nervous system; ideal before bedtime or during stress.',
        inhale: 4,
        hold1: 7,
        exhale: 8,
        hold2: 0,
        recommendedCycles: 4
      },
      {
        id: 'energizing-breath',
        name: 'Awakening Breath (Equal Ratio)',
        purpose: 'Balanced 4-second inhale and 4-second exhale to sharpen focus and lift midday fatigue.',
        inhale: 4,
        hold1: 0,
        exhale: 4,
        hold2: 0,
        recommendedCycles: 6
      }
    ],
    // Relaxation suggestions
    suggestions: [
      { title: '5-4-3-2-1 Sensory Grounding', text: 'Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste to immediately ground racing thoughts.' },
      { title: 'Warm Magnesium Foot Soak', text: 'Soak feet in warm water with Epsom salts for 15 minutes before bed to soothe tense muscles and encourage melatonin.' },
      { title: 'Gentle Physiological Sigh', text: 'Take two quick inhales through the nose, followed by one long, slow sigh out the mouth. Repeat 3 times to quickly lower heart rate.' },
      { title: 'Nature Connection Walk', text: 'Step outside without screens for 15 minutes. Looking at natural greenery naturally reduces cortisol levels.' }
    ]
  },

  // 8. Health Education Library
  education: [
    {
      id: 'edu-1',
      category: 'womens_health',
      badge: "Women's Health",
      title: 'Understanding the Four Phases of Your Menstrual Cycle',
      readTime: '4 min read',
      summary: 'Your cycle is more than just your period. Learn how hormones fluctuate across Menstrual, Follicular, Ovulatory, and Luteal phases to support your energy, workouts, and nutrition.',
      content: `
        <h3>The Female Infradian Rhythm</h3>
        <p>Unlike men who operate on a 24-hour hormonal cycle, women experience a roughly 28-day infradian rhythm that shifts metabolism, brain chemistry, and energy.</p>
        <h4>1. Menstrual Phase (Days 1–5)</h4>
        <p>Progesterone and estrogen are at their baseline. The body is shedding the uterine lining. Restorative movement (gentle yoga, leisurely walks), warm nourishing soups, and iron-replenishing foods (spinach, lentils, dark berries) are ideal.</p>
        <h4>2. Follicular Phase (Days 6–13)</h4>
        <p>Estrogen and FSH rise as follicles mature. Energy, cognitive sharpness, and openness to new projects increase. Great time for strength training, higher-intensity cardio, and fresh fermented probiotic foods.</p>
        <h4>3. Ovulatory Phase (Days 14–16)</h4>
        <p>Luteinizing Hormone (LH) surges and estrogen peaks. You are likely at peak confidence, communication skills, and physical endurance. Focus on fibrous cruciferous veggies to assist estrogen metabolism.</p>
        <h4>4. Luteal Phase (Days 17–28)</h4>
        <p>Progesterone rises to build the lining, raising basal metabolic rate by 100-300 kcal/day. Slower-paced strength, pilates, magnesium-rich foods (sweet potatoes, pumpkin seeds, dark chocolate), and honoring rest help ease PMS naturally.</p>
      `
    },
    {
      id: 'edu-2',
      category: 'nutrition',
      badge: 'Nutrition',
      title: 'The Balanced Plate: Fueling Cells Without Food Anxiety',
      readTime: '5 min read',
      summary: 'How to build sustainable meals with high-fiber carbs, quality protein, healthy fats, and micronutrients without counting every single calorie.',
      content: `
        <h3>A Joyful, Science-Backed Approach to Eating</h3>
        <p>Diet culture often preaches restriction, eliminating entire food groups, and guilt. In nutritional biology, food is foundational information for your cells, thyroid, and hormones.</p>
        <h4>The 4 Pillars of a Nourishing Plate:</h4>
        <ul>
          <li><strong>1/2 Plate Color & Fiber:</strong> Leafy greens, roasted broccoli, sweet peppers, or crisp berries provide antioxidants and prebiotic fiber to nourish your gut microbiome.</li>
          <li><strong>1/4 Plate Quality Protein:</strong> Eggs, tofu, lentils, fish, or tempeh supply the amino acids necessary for neurotransmitter synthesis (serotonin, dopamine) and muscle repair.</li>
          <li><strong>1/4 Plate Complex Carbohydrates:</strong> Sweet potatoes, quinoa, brown rice, or oats provide steady glucose to power brain function and maintain stable thyroid output.</li>
          <li><strong>1–2 Thumb-Sized Healthy Fats:</strong> Avocado, extra virgin olive oil, nuts, or seeds are required to absorb fat-soluble vitamins (A, D, E, K).</li>
        </ul>
      `
    },
    {
      id: 'edu-3',
      category: 'sleep',
      badge: 'Sleep Science',
      title: 'Circadian Architecture: Why Sleep is Non-Negotiable Recovery',
      readTime: '4 min read',
      summary: 'Discover how sleep cleanses neuro-toxins through the glymphatic system and stabilizes metabolic hormones like ghrelin and leptin.',
      content: `
        <h3>The Nightly Reset</h3>
        <p>During deep slow-wave sleep, cerebrospinal fluid flushes through brain tissue via the glymphatic system, clearing metabolic waste accumulated during waking hours.</p>
        <h4>Hormonal Regulation in Sleep:</h4>
        <p>A single night of restricted sleep elevates ghrelin (the hunger hormone) and suppresses leptin (the satiety signal), leading to intense carb cravings the following afternoon. Prioritizing consistent 7–9 hours of sleep is the single highest-return health habit available.</p>
      `
    },
    {
      id: 'edu-4',
      category: 'wellness',
      badge: 'Mind & Stress',
      title: 'Down-Regulating Your Vagus Nerve: Practical Stress Relief',
      readTime: '3 min read',
      summary: 'Actionable techniques to switch your autonomic nervous system from sympathetic fight-or-flight into parasympathetic rest-and-digest.',
      content: `
        <h3>The Power of the Vagus Nerve</h3>
        <p>The vagus nerve is the primary highway connecting your brain to your heart, lungs, and gut. When stress becomes chronic, it remains in overdrive.</p>
        <h4>Daily Vagal Reset Tools:</h4>
        <ul>
          <li><strong>Extended Exhalations:</strong> When your exhale is longer than your inhale (like 4-7-8 breathing), the heart rate slows and parasympathetic tone surges.</li>
          <li><strong>Cool Water Facial Splash:</strong> Splashing cool water on the face triggers the mammalian dive reflex, instantly lowering heart rate.</li>
          <li><strong>Humming or Singing:</strong> The vagus nerve innervates vocal cords; gentle humming vibrates and stimulates calming tone.</li>
        </ul>
      `
    }
  ],

  // 9. Habit Tracker & Weekly Consistency
  habits: [
    { id: 1, text: 'Morning Hydration (500 mL warm water)', category: 'Hydration', completed: true },
    { id: 2, text: '15-min Natural Daylight Sunlight Walk', category: 'Circadian', completed: true },
    { id: 3, text: 'Nourishing Plate with Quality Protein & Fiber', category: 'Nutrition', completed: true },
    { id: 4, text: '20-min Gentle Movement or Stretch', category: 'Movement', completed: false },
    { id: 5, text: 'Mindful Breathing or 5-min Reflection', category: 'Mindfulness', completed: true },
    { id: 6, text: 'Screens Off 45-min Before Bed', category: 'Sleep', completed: false }
  ],

  // 10. Weekly / Monthly Progress History
  progress: {
    weekStreak: 8,
    weeklyCompletionRate: '86%',
    metrics: [
      { day: 'Mon', water: 2400, sleep: 7.4, workoutMinutes: 30, mood: 'Good' },
      { day: 'Tue', water: 2600, sleep: 7.8, workoutMinutes: 45, mood: 'Energized' },
      { day: 'Wed', water: 2100, sleep: 6.8, workoutMinutes: 20, mood: 'Calm' },
      { day: 'Thu', water: 2500, sleep: 7.2, workoutMinutes: 35, mood: 'Focused' },
      { day: 'Fri', water: 2800, sleep: 8.0, workoutMinutes: 40, mood: 'Happy' },
      { day: 'Sat', water: 2300, sleep: 8.2, workoutMinutes: 25, mood: 'Relaxed' },
      { day: 'Sun (Today)', water: 1750, sleep: 7.5, workoutMinutes: 20, mood: 'Calm' }
    ]
  }
};

/**
 * Storage Helpers
 * Encapsulate localStorage so later they can seamlessly transition to Supabase API calls.
 */
function loadAppState() {
  const saved = localStorage.getItem('lifehaven_state_v3');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Ensure all major keys are populated if user had older version
      if (!parsed.periodTracker) parsed.periodTracker = initialMockData.periodTracker;
      if (!parsed.nutrition) parsed.nutrition = initialMockData.nutrition;
      if (!parsed.moodWellness) parsed.moodWellness = initialMockData.moodWellness;
      if (!parsed.education) parsed.education = initialMockData.education;
      if (!parsed.sleep) parsed.sleep = initialMockData.sleep;
      if (!parsed.settings) parsed.settings = initialMockData.settings;
      parsed.workouts = initialMockData.workouts;
      parsed.nutrition = initialMockData.nutrition;
      if (!parsed.workoutHistory) parsed.workoutHistory = initialMockData.workoutHistory;
      if (!parsed.habits) parsed.habits = initialMockData.habits;
      return parsed;
    } catch (e) {
      console.warn('Could not parse saved state, using mock presets.', e);
    }
  }
  return JSON.parse(JSON.stringify(initialMockData));
}

function saveAppState(state) {
  localStorage.setItem('lifehaven_state_v3', JSON.stringify(state));
}
