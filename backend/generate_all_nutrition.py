"""
generate_all_nutrition.py
Defines the complete comprehensive nutrition database for Life Haven.
"""

NUTRITION_CATEGORIES = [
    {"id": "all", "name": "All Superfoods", "icon": "all"},
    {"id": "fruits", "name": "Fruits", "icon": "fruits"},
    {"id": "vegetables", "name": "Vegetables", "icon": "vegetables"},
    {"id": "protein", "name": "Protein-Rich", "icon": "protein"},
    {"id": "iron", "name": "Iron-Rich", "icon": "iron"},
    {"id": "calcium", "name": "Calcium-Rich", "icon": "calcium"},
    {"id": "fiber", "name": "Fiber & Gut", "icon": "fiber"},
    {"id": "fats", "name": "Healthy Fats", "icon": "fats"},
    {"id": "hydration", "name": "Hydrating Foods", "icon": "hydration"}
]

FOODS = [
    # --------------------------------------------------------------------------
    # FRUITS (10)
    # --------------------------------------------------------------------------
    {
        "id": "f-apple",
        "name": "Crisp Red & Green Apples",
        "category": "fruits",
        "tags": ["Pectin Fiber", "Quercetin", "Gut Health", "Low Glycemic"],
        "servingSize": "1 medium apple (182g)",
        "calories": 95,
        "proteinG": 0.5,
        "carbsG": 25.0,
        "fiberG": 4.4,
        "fatG": 0.3,
        "vitaminsMinerals": ["Vitamin C (14% DV)", "Potassium (6% DV)", "Vitamin K (5% DV)"],
        "benefits": "Rich in pectin, a prebiotic soluble fiber that feeds beneficial gut microbiota and buffers against blood glucose spikes. Quercetin supports cellular resilience.",
        "highlights": "Packed with dietary fiber and bioflavonoids without disturbing metabolic balance.",
        "servingTip": "Slice and pair with stone-ground almond butter, or dice into warm cinnamon morning oats.",
        "mealIdeas": ["Apple almond butter dip", "Cinnamon baked apple slices", "Shaved apple & walnut arugula salad"]
    },
    {
        "id": "f-banana",
        "name": "Natural Ripe Bananas",
        "category": "fruits",
        "tags": ["Potassium", "Vitamin B6", "Glycogen Fuel", "Electrolytes"],
        "servingSize": "1 medium banana (118g)",
        "calories": 105,
        "proteinG": 1.3,
        "carbsG": 27.0,
        "fiberG": 3.1,
        "fatG": 0.4,
        "vitaminsMinerals": ["Potassium (422mg, 9% DV)", "Vitamin B6 (33% DV)", "Vitamin C (11% DV)", "Magnesium (8% DV)"],
        "benefits": "Provides bioavailable potassium and magnesium to support nervous transmission, muscular contraction, and prevent muscle cramps. Natural carbohydrates replenish muscle glycogen after movement.",
        "highlights": "Exceptional Vitamin B6 which helps synthesize dopamine and serotonin for emotional balance.",
        "servingTip": "Blend into post-movement smoothies, slice onto sourdough with nut butter, or freeze for healthy soft-serve.",
        "mealIdeas": ["Pre-workout banana & peanut butter toast", "Creamy berry banana smoothie bowl", "Oat & mashed banana breakfast pancakes"]
    },
    {
        "id": "f-orange",
        "name": "Fresh Sweet Oranges & Citrus",
        "category": "fruits",
        "tags": ["Vitamin C", "Hesperidin", "Immune Defense", "Cellular Hydration"],
        "servingSize": "1 medium orange (140g)",
        "calories": 69,
        "proteinG": 1.3,
        "carbsG": 17.6,
        "fiberG": 3.1,
        "fatG": 0.2,
        "vitaminsMinerals": ["Vitamin C (83mg, 92% DV)", "Folate (9% DV)", "Thiamine B1 (9% DV)", "Calcium (6% DV)"],
        "benefits": "Contains over 90% of your daily Vitamin C needs. Ascorbic acid significantly enhances non-heme iron absorption from plant greens when consumed together.",
        "highlights": "Flavanone antioxidants like hesperidin assist healthy vascular blood flow and endothelium function.",
        "servingTip": "Enjoy whole segments with the white pith intact to capture the highest concentration of bioflavonoid fibers.",
        "mealIdeas": ["Fresh citrus segments with mint", "Citrus vinaigrette over baby greens", "Orange, fennel, and olive salad"]
    },
    {
        "id": "f-papaya",
        "name": "Golden Papaya",
        "category": "fruits",
        "tags": ["Papain Enzyme", "Carotenoids", "Digestive Ease", "Skin Glow"],
        "servingSize": "1 cup cubed (145g)",
        "calories": 62,
        "proteinG": 0.7,
        "carbsG": 15.7,
        "fiberG": 2.5,
        "fatG": 0.4,
        "vitaminsMinerals": ["Vitamin C (88mg, 98% DV)", "Vitamin A (33% DV)", "Folate (14% DV)", "Magnesium (7% DV)"],
        "benefits": "Contains the proteolytic enzyme papain, which gently assists in breaking down dietary proteins and relieves digestive heaviness or bloating.",
        "highlights": "Vibrant orange hue is derived from lycopene and beta-carotene, supporting mucosal barrier health.",
        "servingTip": "Squeeze fresh lime juice over ripe cubed papaya and top with a sprinkle of crushed chia seeds.",
        "mealIdeas": ["Chilled papaya wedges with lime", "Papaya & Greek yogurt parfait", "Tropical papaya ginger smoothie"]
    },
    {
        "id": "f-watermelon",
        "name": "Hydrating Watermelon",
        "category": "fruits",
        "tags": ["Lycopene", "L-Citrulline", "92% Water", "Cooling Hydration"],
        "servingSize": "1 cup diced (152g)",
        "calories": 46,
        "proteinG": 0.9,
        "carbsG": 11.5,
        "fiberG": 0.6,
        "fatG": 0.2,
        "vitaminsMinerals": ["Vitamin C (14% DV)", "Vitamin A (5% DV)", "Potassium (4% DV)", "Lycopene (6500mcg)"],
        "benefits": "92% structured water infused with natural electrolyte minerals. L-citrulline promotes nitric oxide synthesis for smooth micro-circulation and post-walk recovery.",
        "highlights": "One of nature's richest whole-food sources of lycopene, a potent lipid-protective antioxidant.",
        "servingTip": "Cube cold and pair with crumbled sheep feta, fresh mint leaves, and a drizzle of olive oil.",
        "mealIdeas": ["Watermelon feta & mint salad", "Blended watermelon lime agua fresca", "Frozen watermelon electrolyte cubes"]
    },
    {
        "id": "f-pomegranate",
        "name": "Ruby Pomegranate Arils",
        "category": "fruits",
        "tags": ["Punicalagins", "Iron Absorption", "Vascular Health", "Polyphenols"],
        "servingSize": "1/2 cup arils (87g)",
        "calories": 72,
        "proteinG": 1.5,
        "carbsG": 16.3,
        "fiberG": 3.5,
        "fatG": 1.0,
        "vitaminsMinerals": ["Vitamin C (12% DV)", "Vitamin K (14% DV)", "Folate (8% DV)", "Copper (6% DV)"],
        "benefits": "Punicalagins and punicic acid provide deep anti-inflammatory polyphenol power that protects endothelial blood vessels and supports red blood cell function.",
        "highlights": "High natural Vitamin C accelerates iron assimilation from companion grain or lentil meals.",
        "servingTip": "Scatter 2 tablespoons of crunchy ruby arils over creamy Greek yogurt, lentil salads, or grain bowls.",
        "mealIdeas": ["Pomegranate grain bowl topper", "Yogurt & pomegranate breakfast bowl", "Warm spiced pomegranate tea"]
    },
    {
        "id": "f-guava",
        "name": "Fiber-Rich Pink Guava",
        "category": "fruits",
        "tags": ["Ultra Vitamin C", "Soluble Fiber", "Immune Resilience", "Gut Balance"],
        "servingSize": "1 medium fruit (55g)",
        "calories": 37,
        "proteinG": 1.4,
        "carbsG": 7.9,
        "fiberG": 3.0,
        "fatG": 0.5,
        "vitaminsMinerals": ["Vitamin C (125mg, 140% DV)", "Folate (7% DV)", "Potassium (6% DV)", "Lycopene (2900mcg)"],
        "benefits": "Delivers over twice the Vitamin C of an orange per 100g, alongside exceptional dietary fiber that encourages gentle, regular gastrointestinal elimination.",
        "highlights": "A low-glycemic, deeply nourishing fruit that supports collagen production and immune defense.",
        "servingTip": "Eat fresh with a light dusting of sea salt and chili, or slice into vibrant tropical fruit salads.",
        "mealIdeas": ["Fresh sliced guava with lime and salt", "Pink guava breakfast smoothie", "Guava spinach green salad"]
    },
    {
        "id": "f-mango",
        "name": "Juicy Sun-Ripened Mango",
        "category": "fruits",
        "tags": ["Beta-Carotene", "Amylase Enzymes", "Eye Health", "Radiant Skin"],
        "servingSize": "1 cup sliced (165g)",
        "calories": 99,
        "proteinG": 1.4,
        "carbsG": 24.7,
        "fiberG": 2.6,
        "fatG": 0.6,
        "vitaminsMinerals": ["Vitamin C (67% DV)", "Vitamin A (10% DV)", "Folate (18% DV)", "Vitamin B6 (12% DV)"],
        "benefits": "Rich in amylase digestive enzymes that assist carbohydrate breakdown. Carotenoid antioxidants support retinal health and natural dermal elasticity.",
        "highlights": "Abundant folate (Vitamin B9), which plays a foundational role in cellular regeneration and DNA repair.",
        "servingTip": "Dice and toss with red onions, cilantro, and lime juice for a vibrant, mineral-rich meal topping.",
        "mealIdeas": ["Mango avocado black bean salsa", "Coconut milk & mango chia pudding", "Curried lentils with diced fresh mango"]
    },
    {
        "id": "f-grapes",
        "name": "Sweet Purple & Green Grapes",
        "category": "fruits",
        "tags": ["Resveratrol", "Flavonoids", "Hydration", "Heart Support"],
        "servingSize": "1 cup whole (151g)",
        "calories": 104,
        "proteinG": 1.1,
        "carbsG": 27.3,
        "fiberG": 1.4,
        "fatG": 0.2,
        "vitaminsMinerals": ["Vitamin K (18% DV)", "Copper (21% DV)", "Vitamin B1 (7% DV)", "Potassium (6% DV)"],
        "benefits": "The deep purple skins are abundant in resveratrol, a polyphenol that activates sirtuin pathways linked with longevity and cardiovascular elasticity.",
        "highlights": "Over 80% water by weight, providing convenient cellular hydration during work hours.",
        "servingTip": "Freeze grapes for 2 hours for a refreshing, sorbet-like chilled afternoon treat.",
        "mealIdeas": ["Chilled frozen grape bites", "Roasted grape & goat cheese sourdough toast", "Grape, walnut & celery salad"]
    },
    {
        "id": "f-pineapple",
        "name": "Tropical Golden Pineapple",
        "category": "fruits",
        "tags": ["Bromelain", "Manganese", "Anti-Inflammatory", "Joint Comfort"],
        "servingSize": "1 cup chunks (165g)",
        "calories": 82,
        "proteinG": 0.9,
        "carbsG": 21.6,
        "fiberG": 2.3,
        "fatG": 0.2,
        "vitaminsMinerals": ["Vitamin C (79mg, 88% DV)", "Manganese (1.5mg, 67% DV)", "Vitamin B6 (9% DV)", "Copper (20% DV)"],
        "benefits": "Bromelain is a bio-active enzyme mixture that assists protein digestion and helps down-regulate systemic inflammation in muscles and joints post-movement.",
        "highlights": "Remarkably rich in manganese, an essential trace mineral required for bone matrix synthesis.",
        "servingTip": "Pair grilled or fresh pineapple chunks with protein sources like grilled salmon, paneer, or tofu.",
        "mealIdeas": ["Fresh pineapple & cottage cheese bowl", "Grilled pineapple with cinnamon glaze", "Pineapple cucumber hydrating juice"]
    },

    # --------------------------------------------------------------------------
    # VEGETABLES (10)
    # --------------------------------------------------------------------------
    {
        "id": "f-spinach",
        "name": "Tender Baby Spinach & Dark Greens",
        "category": "vegetables",
        "tags": ["Non-Heme Iron", "Folate", "Magnesium", "Chlorophyll"],
        "servingSize": "2 cups raw / 1 cup cooked (180g cooked)",
        "calories": 41,
        "proteinG": 5.3,
        "carbsG": 6.7,
        "fiberG": 4.3,
        "fatG": 0.5,
        "vitaminsMinerals": ["Iron (6.4mg, 36% DV)", "Vitamin A (377% DV)", "Folate (66% DV)", "Magnesium (37% DV)", "Calcium (24% DV)"],
        "benefits": "Crucial for replenishing blood iron reserves, supporting tissue oxygenation, and soothing menstrual muscle cramps via natural magnesium.",
        "highlights": "One of the dense whole-food sources of plant iron, folate, and bone-building Vitamin K.",
        "servingTip": "Pair with a squeeze of fresh lemon juice or sliced tomatoes; Vitamin C triples plant non-heme iron absorption!",
        "mealIdeas": ["Sautéed garlic lemon spinach", "Wilted spinach in red lentil dal", "Spinach, egg, and feta breakfast wrap"]
    },
    {
        "id": "f-carrot",
        "name": "Sweet Crisp Carrots",
        "category": "vegetables",
        "tags": ["Beta-Carotene", "Lutein", "Cellular Repair", "Soluble Fiber"],
        "servingSize": "1 cup chopped (128g)",
        "calories": 52,
        "proteinG": 1.2,
        "carbsG": 12.3,
        "fiberG": 3.6,
        "fatG": 0.3,
        "vitaminsMinerals": ["Vitamin A (119% DV)", "Vitamin K (14% DV)", "Potassium (9% DV)", "Biotin (8% DV)"],
        "benefits": "Beta-carotene is converted into Vitamin A in the liver as needed, safeguarding mucosal lining integrity, ocular health, and glowing dermal tissue.",
        "highlights": "Carrot fiber binds gently to metabolized bile acids in the digestive tract, encouraging healthy hormonal clearance.",
        "servingTip": "Roast whole with cumin seeds and a drizzle of olive oil, or grate raw into lemon-dressed slaws.",
        "mealIdeas": ["Roasted cumin glazed carrots", "Carrot & ginger warming soup", "Raw carrot ribbon salad with tahini"]
    },
    {
        "id": "f-tomato",
        "name": "Ripe Vine Tomatoes",
        "category": "vegetables",
        "tags": ["Lycopene", "Vitamin C", "Potassium", "Endothelial Health"],
        "servingSize": "1 medium tomato (123g)",
        "calories": 22,
        "proteinG": 1.1,
        "carbsG": 4.8,
        "fiberG": 1.5,
        "fatG": 0.2,
        "vitaminsMinerals": ["Vitamin C (17mg, 19% DV)", "Potassium (292mg, 6% DV)", "Vitamin K (10% DV)", "Folate (5% DV)"],
        "benefits": "Cooked or olive oil-paired tomatoes release high concentrations of bioavailable lycopene, protecting cells against oxidative stress.",
        "highlights": "Natural glutamic acid gives tomatoes rich savory umami that elevates simple whole-grain and bean dishes.",
        "servingTip": "Simmer gently with garlic, olive oil, and herbs; cooking with healthy fats increases lycopene absorption up to 4-fold.",
        "mealIdeas": ["Mediterranean tomato & cucumber salad", "Slow-simmered tomato basil pasta sauce", "Warm shakshuka with poached eggs"]
    },
    {
        "id": "f-broccoli",
        "name": "Fresh Broccoli & Cruciferous Florets",
        "category": "vegetables",
        "tags": ["Sulforaphane", "DIM", "Hormone Balance", "Calcium"],
        "servingSize": "1 cup cooked florets (156g)",
        "calories": 55,
        "proteinG": 3.7,
        "carbsG": 11.2,
        "fiberG": 5.1,
        "fatG": 0.6,
        "vitaminsMinerals": ["Vitamin C (101mg, 112% DV)", "Vitamin K (183% DV)", "Folate (42% DV)", "Calcium (62mg, 6% DV)"],
        "benefits": "Contains diindolylmethane (DIM) and sulforaphane, bioactive phytochemicals that support the liver's natural ability to safely metabolize estrogen.",
        "highlights": "More Vitamin C per cup than an orange, coupled with bioavailable bone-supporting minerals.",
        "servingTip": "Lightly steam for 3 to 4 minutes to preserve heat-sensitive myrosinase enzymes, then finish with olive oil.",
        "mealIdeas": ["Steamed sesame garlic broccoli", "Roasted broccoli with lemon and parmesan", "Broccoli & lentil nourish soup"]
    },
    {
        "id": "f-beetroot",
        "name": "Earthy Sweet Beetroot",
        "category": "vegetables",
        "tags": ["Dietary Nitrates", "Betalains", "Blood Flow", "Liver Support"],
        "servingSize": "1 cup boiled slices (170g)",
        "calories": 75,
        "proteinG": 2.9,
        "carbsG": 16.9,
        "fiberG": 3.4,
        "fatG": 0.3,
        "vitaminsMinerals": ["Folate (136mcg, 34% DV)", "Manganese (28% DV)", "Potassium (518mg, 11% DV)", "Iron (7% DV)"],
        "benefits": "Dietary nitrates convert into nitric oxide, dilating blood vessels to enhance oxygen delivery, reduce blood pressure, and ease cycle fatigue.",
        "highlights": "Betalain pigments lend deep crimson color and provide antioxidant support to hepatic detoxification pathways.",
        "servingTip": "Roast whole in skins, peel, and toss with crumbled goat cheese, toasted walnuts, and balsamic vinegar.",
        "mealIdeas": ["Warm roasted beet & feta salad", "Grated raw beet and apple slaw", "Blended crimson beet & berry smoothie"]
    },
    {
        "id": "f-cucumber",
        "name": "Crisp Garden Cucumbers",
        "category": "vegetables",
        "tags": ["Silica", "96% Cellular Water", "Electrolytes", "Cooling"],
        "servingSize": "1 cup sliced with peel (104g)",
        "calories": 16,
        "proteinG": 0.7,
        "carbsG": 3.8,
        "fiberG": 0.6,
        "fatG": 0.1,
        "vitaminsMinerals": ["Vitamin K (17% DV)", "Potassium (152mg, 3% DV)", "Magnesium (3% DV)", "Silica"],
        "benefits": "96% cellular structured water that hydrates deeply on an intracellular level. Silica supports connective tissue strength and glowing skin.",
        "highlights": "Low in calories, cooling to the digestive system, and rich in natural cucurbitacin phytonutrients.",
        "servingTip": "Slice thinly with peel on, sprinkle with sea salt, lemon juice, and fresh dill, or dip into homemade hummus.",
        "mealIdeas": ["Classic Greek cucumber salad", "Chilled cucumber yogurt tzatziki", "Cucumber batons with herbed tahini"]
    },
    {
        "id": "f-sweet-potato",
        "name": "Roasted Sweet Potatoes",
        "category": "vegetables",
        "tags": ["Complex Carbs", "Beta-Carotene", "Adrenal Calm", "Serotonin"],
        "servingSize": "1 medium baked potato (114g)",
        "calories": 103,
        "proteinG": 2.3,
        "carbsG": 23.6,
        "fiberG": 3.8,
        "fatG": 0.2,
        "vitaminsMinerals": ["Vitamin A (438% DV)", "Vitamin C (25% DV)", "Potassium (542mg, 12% DV)", "Manganese (25% DV)"],
        "benefits": "Slow-digesting complex carbohydrates support steady evening serotonin synthesis and soothe adrenal cortisol spikes during the luteal phase.",
        "highlights": "Exceptional beta-carotene and potassium content with a gentle, satisfying natural sweetness.",
        "servingTip": "Bake whole at 200°C until caramelized, slice open and top with black beans, tahini, and cilantro.",
        "mealIdeas": ["Stuffed black bean baked sweet potato", "Roasted sweet potato nourish bowl", "Mashed sweet potato with coconut milk"]
    },
    {
        "id": "f-pumpkin",
        "name": "Hearty Winter Pumpkin",
        "category": "vegetables",
        "tags": ["Prebiotic Fiber", "Zinc", "Potassium", "Gut Soothing"],
        "servingSize": "1 cup cooked cubes (245g)",
        "calories": 49,
        "proteinG": 1.8,
        "carbsG": 12.0,
        "fiberG": 2.7,
        "fatG": 0.2,
        "vitaminsMinerals": ["Vitamin A (245% DV)", "Vitamin C (19% DV)", "Potassium (564mg, 12% DV)", "Copper (11% DV)"],
        "benefits": "Gentle, soluble prebiotic pectin fiber soothes the mucosal stomach lining while supporting immune defense through rich carotenoids.",
        "highlights": "High potassium and low sodium ratio encourages natural fluid balance and reduces water retention.",
        "servingTip": "Simmer into a velvety soup with coconut milk, ginger, and turmeric, or roast alongside hearty legumes.",
        "mealIdeas": ["Creamy spiced pumpkin soup", "Roasted spiced pumpkin wedges", "Pumpkin and black bean curry"]
    },
    {
        "id": "f-beans",
        "name": "Tender Green Beans & Pods",
        "category": "vegetables",
        "tags": ["Chlorophyll", "Silicon", "Folate", "Fiber"],
        "servingSize": "1 cup cooked (125g)",
        "calories": 44,
        "proteinG": 2.4,
        "carbsG": 9.9,
        "fiberG": 4.0,
        "fatG": 0.4,
        "vitaminsMinerals": ["Vitamin K (25% DV)", "Vitamin C (14% DV)", "Folate (9% DV)", "Silicon"],
        "benefits": "Supplies easily absorbable silicon for bone density and connective tissue maintenance, alongside gentle soluble fiber for gut regularity.",
        "highlights": "A versatile vegetable that maintains texture and nutrients easily when lightly blanched or sautéed.",
        "servingTip": "Sauté with minced garlic, toasted slivered almonds, and a touch of extra virgin olive oil.",
        "mealIdeas": ["Garlic & toasted almond green beans", "Steamed green beans with lemon tahini", "Tossed green bean and potato salad"]
    },
    {
        "id": "f-bell-pepper",
        "name": "Sweet Red & Yellow Bell Peppers",
        "category": "vegetables",
        "tags": ["Super Vitamin C", "Capsanthin", "Skin Collagen", "Immunity"],
        "servingSize": "1 medium red pepper (119g)",
        "calories": 37,
        "proteinG": 1.2,
        "carbsG": 7.2,
        "fiberG": 2.5,
        "fatG": 0.4,
        "vitaminsMinerals": ["Vitamin C (152mg, 169% DV)", "Vitamin A (75% DV)", "Vitamin B6 (20% DV)", "Folate (14% DV)"],
        "benefits": "Red bell peppers deliver over 160% of daily Vitamin C needs, stimulating natural collagen synthesis and dramatically amplifying iron uptake.",
        "highlights": "Crisp, sweet, and bursting with capsanthin and violaxanthin carotenoid antioxidants.",
        "servingTip": "Slice raw into colorful dipping batons for homemade hummus or sauté with onions for fajita bowls.",
        "mealIdeas": ["Raw bell pepper batons with hummus", "Sautéed pepper & onion fajita plate", "Roasted red pepper & walnut dip"]
    },

    # --------------------------------------------------------------------------
    # PROTEIN-RICH FOODS (10)
    # --------------------------------------------------------------------------
    {
        "id": "f-eggs",
        "name": "Pasture-Raised Whole Eggs",
        "category": "protein",
        "tags": ["Complete Protein", "Choline", "B12", "Lutein"],
        "servingSize": "2 large eggs (100g)",
        "calories": 144,
        "proteinG": 12.6,
        "carbsG": 0.8,
        "fiberG": 0.0,
        "fatG": 9.6,
        "vitaminsMinerals": ["Choline (294mg, 54% DV)", "Vitamin B12 (44% DV)", "Selenium (56% DV)", "Riboflavin B2 (38% DV)", "Iron (10% DV)"],
        "benefits": "Features a biological value of nearly 100, providing all 9 essential amino acids in perfect human proportions. Choline is indispensable for brain cell membranes and liver bile production.",
        "highlights": "The nutrient-dense yolk contains brain-supporting choline, bioavailable B12, and eye-protective lutein.",
        "servingTip": "Poach, soft-boil, or scramble in olive oil alongside sautéed greens and sliced avocado.",
        "mealIdeas": ["Soft-poached eggs over sourdough & spinach", "Veggie & herb frittata", "Hard-boiled egg & avocado snack plate"]
    },
    {
        "id": "f-lentils",
        "name": "Hearty Red & Brown Lentils",
        "category": "protein",
        "tags": ["Plant Protein", "Soluble Fiber", "Non-Heme Iron", "Prebiotics"],
        "servingSize": "1 cup cooked (198g)",
        "calories": 230,
        "proteinG": 17.9,
        "carbsG": 39.9,
        "fiberG": 15.6,
        "fatG": 0.8,
        "vitaminsMinerals": ["Folate (358mcg, 90% DV)", "Iron (6.6mg, 37% DV)", "Manganese (43% DV)", "Phosphorus (28% DV)", "Zinc (17% DV)"],
        "benefits": "Dual powerhouse of plant protein and exceptional soluble fiber that stabilizes blood glucose for 4+ hours while nourishing the colon microbiome.",
        "highlights": "Over 17g of pure plant protein and 15g of prebiotic fiber per single cup.",
        "servingTip": "Simmer into rich yellow or red dal with turmeric and ginger, or fold cold French green lentils into grain salads.",
        "mealIdeas": ["Golden turmeric red lentil dal", "French lentil & roasted beet salad", "Comforting vegetable lentil stew"]
    },
    {
        "id": "f-chickpeas",
        "name": "Nutty Chickpeas (Garbanzo Beans)",
        "category": "protein",
        "tags": ["Plant Protein", "Zinc", "Resistant Starch", "Hormone Care"],
        "servingSize": "1 cup cooked (164g)",
        "calories": 269,
        "proteinG": 14.5,
        "carbsG": 45.0,
        "fiberG": 12.5,
        "fatG": 4.2,
        "vitaminsMinerals": ["Folate (71% DV)", "Copper (64% DV)", "Manganese (73% DV)", "Iron (26% DV)", "Zinc (14% DV)"],
        "benefits": "Rich in resistant starch that ferments in the large intestine into butyrate, a short-chain fatty acid that strengthens gut barrier integrity.",
        "highlights": "Versatile texture that roasts into crunchy snacks or mashes into velvety Mediterranean dips.",
        "servingTip": "Toss with olive oil, smoked paprika, and sea salt, then roast at 200°C for 25 minutes for a crunchy snack.",
        "mealIdeas": ["Crispy roasted paprika chickpeas", "Homemade lemon garlic hummus", "Mediterranean chickpea & cucumber bowl"]
    },
    {
        "id": "f-black-beans",
        "name": "Black Beans & Kidney Beans",
        "category": "protein",
        "tags": ["Anthocyanins", "Plant Iron", "Slow Carbs", "Satiety"],
        "servingSize": "1 cup cooked black beans (172g)",
        "calories": 227,
        "proteinG": 15.2,
        "carbsG": 40.8,
        "fiberG": 15.0,
        "fatG": 0.9,
        "vitaminsMinerals": ["Folate (64% DV)", "Magnesium (30% DV)", "Iron (20% DV)", "Thiamine B1 (28% DV)"],
        "benefits": "The dark skins are rich in antioxidant anthocyanins (similar to berries) that protect arterial walls while providing steady amino acids.",
        "highlights": "Low glycemic index prevents afternoon fatigue and keeps hunger hormones balanced.",
        "servingTip": "Simmer with cumin, diced tomatoes, and garlic, then pair with brown rice or baked sweet potatoes.",
        "mealIdeas": ["Black bean & sweet potato nourish bowl", "Hearty vegetarian three-bean chili", "Avocado & black bean salad"]
    },
    {
        "id": "f-paneer",
        "name": "Fresh Artisanal Paneer",
        "category": "protein",
        "tags": ["Casein Protein", "Bioavailable Calcium", "Phosphorus", "Steady Fuel"],
        "servingSize": "100g fresh paneer",
        "calories": 265,
        "proteinG": 18.3,
        "carbsG": 1.2,
        "fiberG": 0.0,
        "fatG": 20.8,
        "vitaminsMinerals": ["Calcium (480mg, 48% DV)", "Phosphorus (33% DV)", "Vitamin A (12% DV)", "Riboflavin B2 (14% DV)"],
        "benefits": "Slow-digesting casein protein provides a sustained release of amino acids for tissue repair, paired with bioavailable calcium for bone mineral integrity.",
        "highlights": "Naturally very low in carbohydrates with rich calcium and healthy dairy fats that encourage satiety.",
        "servingTip": "Lightly pan-sear cubes in olive oil with turmeric, ginger, and cumin, and fold into palak (spinach) or vegetable curries.",
        "mealIdeas": ["Pan-seared turmeric paneer cubes", "Classic palak paneer with baby spinach", "Grilled paneer and bell pepper skewers"]
    },
    {
        "id": "f-tofu",
        "name": "Organic Firm Tofu",
        "category": "protein",
        "tags": ["Complete Plant Protein", "Isoflavones", "Calcium", "Versatile"],
        "servingSize": "100g firm tofu",
        "calories": 144,
        "proteinG": 15.7,
        "carbsG": 2.8,
        "fiberG": 2.3,
        "fatG": 8.7,
        "vitaminsMinerals": ["Calcium (350mg, 35% DV)", "Iron (2.7mg, 15% DV)", "Manganese (54% DV)", "Selenium (20% DV)"],
        "benefits": "Contains all 9 essential amino acids plus mild phytoestrogenic isoflavones (genistein and daidzein) that gently support hormonal receptor balance.",
        "highlights": "Calcium-set tofu provides an outstanding plant-based bone mineral boost with zero cholesterol.",
        "servingTip": "Press out moisture, cube, toss with tamari and sesame oil, and bake at 200°C for 25 minutes until golden and crisp.",
        "mealIdeas": ["Crispy baked sesame tofu bowl", "Tofu scramble with turmeric and greens", "Miso broth with cubed tofu and bok choy"]
    },
    {
        "id": "f-salmon",
        "name": "Wild Alaskan Salmon",
        "category": "protein",
        "tags": ["Omega-3 EPA/DHA", "Complete Protein", "Vitamin D", "Anti-Inflammatory"],
        "servingSize": "150g fillet cooked",
        "calories": 232,
        "proteinG": 25.4,
        "carbsG": 0.0,
        "fiberG": 0.0,
        "fatG": 13.8,
        "vitaminsMinerals": ["Vitamin D (700 IU, 88% DV)", "Vitamin B12 (120% DV)", "Selenium (65% DV)", "Omega-3 Fatty Acids (2200mg)"],
        "benefits": "World-class source of long-chain marine Omega-3s (EPA and DHA) that dramatically quiet cellular inflammatory pathways, alleviate period cramps, and support deep REM sleep.",
        "highlights": "Natural food source of Vitamin D3, essential for calcium assimilation and immune health.",
        "servingTip": "Pan-sear skin-side down in a hot skillet with olive oil for 4 minutes, flip gently, and finish with fresh lemon and dill.",
        "mealIdeas": ["Pan-seared lemon dill salmon", "Ginger turmeric glazed salmon bowl", "Flaked salmon & quinoa grain salad"]
    },
    {
        "id": "f-chicken",
        "name": "Tender Lean Chicken Breast",
        "category": "protein",
        "tags": ["Lean Complete Protein", "Niacin B3", "B6", "Muscle Repair"],
        "servingSize": "120g cooked breast",
        "calories": 198,
        "proteinG": 37.0,
        "carbsG": 0.0,
        "fiberG": 0.0,
        "fatG": 4.3,
        "vitaminsMinerals": ["Niacin B3 (76% DV)", "Vitamin B6 (42% DV)", "Selenium (54% DV)", "Phosphorus (26% DV)"],
        "benefits": "High protein density per calorie, providing the raw essential branched-chain amino acids (leucine, isoleucine, valine) required for muscle tissue recovery.",
        "highlights": "Rich in B vitamins that facilitate cellular energy metabolism and reduce fatigue.",
        "servingTip": "Marinate in extra virgin olive oil, garlic, lemon juice, and oregano before grilling or baking.",
        "mealIdeas": ["Lemon herb grilled chicken breast", "Shredded chicken and vegetable soup", "Warm chicken, avocado, and spinach wrap"]
    },
    {
        "id": "f-greek-yogurt",
        "name": "Authentic Greek Yogurt & Kefir",
        "category": "protein",
        "tags": ["Live Probiotics", "High Protein", "Bone Minerals", "Gut Microbiome"],
        "servingSize": "1 cup plain Greek yogurt (200g)",
        "calories": 146,
        "proteinG": 20.0,
        "carbsG": 7.8,
        "fiberG": 0.0,
        "fatG": 3.8,
        "vitaminsMinerals": ["Calcium (230mg, 23% DV)", "Vitamin B12 (43% DV)", "Phosphorus (22% DV)", "Riboflavin B2 (34% DV)"],
        "benefits": "Contains billions of active live probiotic cultures (Lactobacillus and Bifidobacterium) that replenish beneficial intestinal flora and optimize immune surveillance.",
        "highlights": "Delivers 20 grams of concentrated protein per serving to keep morning fullness steady for hours.",
        "servingTip": "Swirl with raw local honey, ground flaxseeds, and antioxidant-rich pomegranate arils or berries.",
        "mealIdeas": ["Greek yogurt & berry chia bowl", "Savory garlic herb yogurt dip", "High-protein morning smoothie base"]
    },
    {
        "id": "f-hemp-seeds",
        "name": "Raw Hemp Hearts & Pumpkin Seeds",
        "category": "protein",
        "tags": ["Plant Complete Protein", "Magnesium", "Zinc", "Omega-3/6 Balance"],
        "servingSize": "3 tablespoons hemp seeds (30g)",
        "calories": 166,
        "proteinG": 9.5,
        "carbsG": 2.6,
        "fiberG": 1.2,
        "fatG": 14.6,
        "vitaminsMinerals": ["Magnesium (210mg, 50% DV)", "Zinc (3mg, 28% DV)", "Iron (20% DV)", "Phosphorus (45% DV)"],
        "benefits": "Contains a biologically complete plant protein profile with the ideal 3:1 ratio of Omega-6 to Omega-3 essential fatty acids. Magnesium calms nervous tension.",
        "highlights": "Abundant zinc assists enzyme synthesis, skin healing, and progesterone balance.",
        "servingTip": "Sprinkle 2 tablespoons over avocado toast, leafy green salads, or warm morning oatmeal bowls.",
        "mealIdeas": ["Avocado toast dusted with hemp hearts", "Pumpkin seed trail mix", "Hemp seed & berry breakfast oats"]
    },

    # --------------------------------------------------------------------------
    # HEALTHY FATS (4 KEY ESSENTIALS)
    # --------------------------------------------------------------------------
    {
        "id": "f-avocado",
        "name": "Fresh Hass Avocado",
        "category": "fats",
        "tags": ["Monounsaturated Fats", "Oleic Acid", "Potassium", "Hormone Precursor"],
        "servingSize": "1/2 medium avocado (100g)",
        "calories": 160,
        "proteinG": 2.0,
        "carbsG": 8.5,
        "fiberG": 6.7,
        "fatG": 14.7,
        "vitaminsMinerals": ["Potassium (485mg, 10% DV)", "Folate (20% DV)", "Vitamin K (26% DV)", "Vitamin E (14% DV)"],
        "benefits": "Monounsaturated oleic acid provides the lipid backbone necessary for steroidal hormone production while enhancing the absorption of fat-soluble vitamins (A, D, E, K).",
        "highlights": "Contains more potassium than a banana, along with almost 7 grams of prebiotic dietary fiber per half.",
        "servingTip": "Mash onto artisan sourdough with lemon, sea salt, and a soft-poached egg, or dice into leafy salads.",
        "mealIdeas": ["Avocado sourdough toast", "Creamy avocado cilantro dressing", "Cubed avocado & black bean salad"]
    },
    {
        "id": "f-olive-oil",
        "name": "Cold-Pressed Extra Virgin Olive Oil",
        "category": "fats",
        "tags": ["Oleocanthal", "Polyphenols", "Heart Health", "Anti-Inflammatory"],
        "servingSize": "1 tablespoon (15mL)",
        "calories": 119,
        "proteinG": 0.0,
        "carbsG": 0.0,
        "fiberG": 0.0,
        "fatG": 13.5,
        "vitaminsMinerals": ["Vitamin E (13% DV)", "Vitamin K (7% DV)", "Oleocanthal Antioxidant"],
        "benefits": "Oleocanthal acts as a natural, gentle cyclooxygenase (COX) down-regulator similar to gentle anti-inflammatory compounds, soothing cellular oxidative stress.",
        "highlights": "The cornerstone of Mediterranean wellness, supporting vascular flexibility and cellular membrane health.",
        "servingTip": "Drizzle raw over warm steamed greens, fresh grain bowls, or mix with lemon for homemade salad dressings.",
        "mealIdeas": ["Extra virgin olive oil & lemon vinaigrette", "Drizzled over warm lentil dal", "Herb-infused olive oil bread dip"]
    },
    {
        "id": "f-walnuts",
        "name": "Raw Walnuts & Almonds",
        "category": "fats",
        "tags": ["Plant Omega-3 ALA", "Vitamin E", "Brain Health", "Bone Minerals"],
        "servingSize": "1 ounce handful (28g)",
        "calories": 185,
        "proteinG": 4.3,
        "carbsG": 3.9,
        "fiberG": 1.9,
        "fatG": 18.5,
        "vitaminsMinerals": ["Copper (50% DV)", "Manganese (42% DV)", "Magnesium (11% DV)", "Vitamin E (25% DV for almonds)"],
        "benefits": "Walnuts are among the richest nut sources of plant-based Omega-3 ALA, promoting neurovascular health, cognitive focus, and balanced mood.",
        "highlights": "Almonds deliver calcium and natural Vitamin E (alpha-tocopherol) to guard against lipid peroxidation.",
        "servingTip": "Enjoy a small palm-sized handful (25-30g) as an afternoon focus snack or fold into morning oatmeal.",
        "mealIdeas": ["Raw walnut & almond afternoon snack", "Toasted walnut beet salad", "Almond-crusted roasted salmon"]
    },
    {
        "id": "f-chia-seeds",
        "name": "Chia & Whole Golden Flaxseeds",
        "category": "fiber",
        "tags": ["Soluble Mucilage", "Omega-3 ALA", "Lignans", "Hormone Clearance"],
        "servingSize": "2 tablespoons (24g)",
        "calories": 115,
        "proteinG": 4.0,
        "carbsG": 10.0,
        "fiberG": 8.2,
        "fatG": 7.2,
        "vitaminsMinerals": ["Calcium (15% DV)", "Magnesium (24% DV)", "Phosphorus (18% DV)", "Plant Omega-3 (4500mg)"],
        "benefits": "Forms a soothing hydrophilic gel in the digestive tract that slows glucose absorption, lubricates intestinal walls, and binds used estrogen metabolites for healthy elimination.",
        "highlights": "One of the densest plant sources of anti-inflammatory Omega-3 fats and lignans on Earth.",
        "servingTip": "Stir 2 tablespoons into almond or oat milk with cinnamon and berries; let sit for 15 minutes to form pudding.",
        "mealIdeas": ["Overnight chia berry pudding", "Ground flaxseed sprinkled over oatmeal", "Chia lemon hydration water"]
    }
]

# ==============================================================================
# MEAL IDEAS (20 RECIPES ACROSS 5 TYPES)
# ==============================================================================

MEALS = [
    # --------------------------------------------------------------------------
    # BREAKFAST (4)
    # --------------------------------------------------------------------------
    {
        "id": "meal-b1",
        "type": "breakfast",
        "title": "Vitality Berry & Seed Oatmeal Bowl",
        "prepTime": "10 mins",
        "calories": "~380 kcal",
        "tags": ["Fiber-Rich", "Sustained Energy", "Plant Iron"],
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
        "type": "breakfast",
        "title": "Avocado & Sourdough Sunshine Plate",
        "prepTime": "8 mins",
        "calories": "~420 kcal",
        "tags": ["Healthy Fats", "Complete Protein", "Choline & B12"],
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
        "type": "breakfast",
        "title": "High-Protein Greek Yogurt & Chia Parfait",
        "prepTime": "5 mins",
        "calories": "~340 kcal",
        "tags": ["22g Protein", "Probiotics", "Bone Minerals"],
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
        "type": "breakfast",
        "title": "Warm Spiced Apple & Quinoa Porridge",
        "prepTime": "12 mins",
        "calories": "~390 kcal",
        "tags": ["Gluten-Free", "Plant Iron", "Comforting Warmth"],
        "description": "Fluffy cooked quinoa simmered in warm spiced milk with diced sautéed apples, crushed walnuts, and pumpkin seeds.",
        "ingredients": [
            "3/4 cup cooked fluffy quinoa",
            "1/2 cup warm unsweetened milk",
            "1 small apple, diced and lightly sautéed in coconut oil",
            "1 tbsp raw chopped walnuts",
            "1 tbsp pumpkin seeds",
            "1/4 tsp ground cardamom & cinnamon"
        ],
        "instructions": [
            "Warm cooked quinoa in milk with cardamom and cinnamon for 3 minutes.",
            "Lightly sauté diced apples in a pan until tender and fragrant.",
            "Combine warm quinoa in a bowl, top with warm apples, walnuts, and pumpkin seeds."
        ],
        "whyItWorks": "Quinoa supplies a complete amino acid profile, paired with apple pectin fiber and calming cardamom for digestive comfort."
    },

    # --------------------------------------------------------------------------
    # LUNCH (4)
    # --------------------------------------------------------------------------
    {
        "id": "meal-l1",
        "type": "lunch",
        "title": "Mediterranean Quinoa & Chickpea Bowl",
        "prepTime": "15 mins",
        "calories": "~490 kcal",
        "tags": ["Plant Protein", "Iron-Rich", "Digestive Ease"],
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
        "type": "lunch",
        "title": "Warm Lentil & Roasted Beet Plate",
        "prepTime": "20 mins",
        "calories": "~450 kcal",
        "tags": ["Iron Booster", "Liver Support", "Nitric Oxide"],
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
        "type": "lunch",
        "title": "Rainbow Tofu & Edamame Crunch Wrap",
        "prepTime": "12 mins",
        "calories": "~430 kcal",
        "tags": ["Plant Protein", "Colorful Fiber", "Isoflavones"],
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
        "type": "lunch",
        "title": "Lemon Herb Salmon & Brown Rice Bowl",
        "prepTime": "18 mins",
        "calories": "~510 kcal",
        "tags": ["Omega-3 Rich", "High Protein", "Whole Grains"],
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

    # --------------------------------------------------------------------------
    # DINNER (4)
    # --------------------------------------------------------------------------
    {
        "id": "meal-d1",
        "type": "dinner",
        "title": "Ginger Turmeric Salmon or Tofu with Greens",
        "prepTime": "25 mins",
        "calories": "~520 kcal",
        "tags": ["Omega-3 Anti-Inflammatory", "High Protein", "Hormone Care"],
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
        "type": "dinner",
        "title": "Sweet Potato & Black Bean Nourish Pot",
        "prepTime": "25 mins",
        "calories": "~460 kcal",
        "tags": ["Magnesium-Rich", "Gut Friendly", "Comforting"],
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
            "Roast cubed sweet potatoes at 200°C for 20 minutes until tender and caramelized.",
            "In a pot, warm black beans with cumin, coriander, and 2 tbsp water.",
            "Stir in spinach until gently wilted.",
            "Transfer to bowl, top with roasted sweet potatoes, sliced avocado, and lime."
        ],
        "whyItWorks": "Magnesium and complex carbohydrates support evening serotonin release to prepare the nervous system for deep restorative rest."
    },
    {
        "id": "meal-d3",
        "type": "dinner",
        "title": "Comforting Red Lentil Dal with Wilted Spinach",
        "prepTime": "22 mins",
        "calories": "~440 kcal",
        "tags": ["Plant Iron", "Warming Spices", "Easy Digestion"],
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
            "Sauté garlic and ginger in 1 tsp olive oil for 1 minute.",
            "Add red lentils, broth, turmeric, and cumin; bring to a boil, then simmer for 15 minutes.",
            "Stir in coconut milk and fold in baby spinach until wilted.",
            "Serve warm with a squeeze of fresh lemon."
        ],
        "whyItWorks": "Split red lentils break down into a comforting, highly digestible source of protein and plant iron that is gentle on evening digestion."
    },
    {
        "id": "meal-d4",
        "type": "dinner",
        "title": "Herb-Roasted Chicken & Colorful Root Vegetables",
        "prepTime": "30 mins",
        "calories": "~490 kcal",
        "tags": ["Lean Protein", "Carotenoids", "Nourishing Dinner"],
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
            "Roast at 190°C (375°F) for 25-28 minutes until chicken is cooked through and vegetables are tender.",
            "Let chicken rest 5 minutes before slicing and serving."
        ],
        "whyItWorks": "A complete whole-food plate balancing 35g+ of lean muscle-repairing protein with colorful vitamin-dense root carbohydrates."
    },

    # --------------------------------------------------------------------------
    # SNACKS (4)
    # --------------------------------------------------------------------------
    {
        "id": "meal-s1",
        "type": "snack",
        "title": "Apple Slices with Creamy Almond Butter & Chia",
        "prepTime": "3 mins",
        "calories": "~210 kcal",
        "tags": ["Quick Energy", "Pectin Fiber", "Healthy Fats"],
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
        "type": "snack",
        "title": "Golden Turmeric Latte (Moon Milk)",
        "prepTime": "5 mins",
        "calories": "~120 kcal",
        "tags": ["Calming", "Anti-Inflammatory", "Caffeine-Free"],
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
        "type": "snack",
        "title": "Roasted Crunchy Garlic Chickpeas",
        "prepTime": "25 mins",
        "calories": "~180 kcal",
        "tags": ["High Fiber", "Savory Crunch", "Plant Zinc"],
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
            "Roast on a baking sheet at 200°C for 22-25 minutes, shaking pan halfway.",
            "Let cool completely to achieve maximum crunch."
        ],
        "whyItWorks": "Delivers 7g of protein and 6g of fiber in a savory, crunchy whole-food format that replaces processed chips."
    },
    {
        "id": "meal-s4",
        "type": "snack",
        "title": "Cucumber Batons with Herbed Tahini Dip",
        "prepTime": "4 mins",
        "calories": "~150 kcal",
        "tags": ["Hydrating", "Calcium-Rich", "Cooling"],
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

    # --------------------------------------------------------------------------
    # QUICK / SIMPLE MEALS (4)
    # --------------------------------------------------------------------------
    {
        "id": "meal-q1",
        "type": "quick",
        "title": "10-Minute Stir-Fried Greens & Scrambled Eggs",
        "prepTime": "10 mins",
        "calories": "~310 kcal",
        "tags": ["Fast & Simple", "High Protein", "Iron Booster"],
        "description": "Soft scrambled pasture-raised eggs served alongside flash-sautéed baby spinach, cherry tomatoes, and garlic olive oil.",
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
        "type": "quick",
        "title": "Quick Avocado Chickpea Mash Toast",
        "prepTime": "7 mins",
        "calories": "~350 kcal",
        "tags": ["Plant Protein", "Healthy Fats", "100% Vegan"],
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
        "type": "quick",
        "title": "5-Minute Green Energy Blender Smoothie",
        "prepTime": "5 mins",
        "calories": "~280 kcal",
        "tags": ["Fast Nourishment", "Liquid Hydration", "Chlorophyll"],
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
        "type": "quick",
        "title": "Warming Miso & Veggie Broth with Poached Egg",
        "prepTime": "8 mins",
        "calories": "~220 kcal",
        "tags": ["Gut Prebiotics", "Warm & Comforting", "Hydrating"],
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
]

# ==============================================================================
# EDUCATIONAL BLUEPRINTS (BALANCED PLATE & WOMEN'S HEALTH)
# ==============================================================================

BALANCED_PLATE_BLUEPRINT = {
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
            "name": "1–2 Tbsp: Healthy Essential Fats",
            "share": "Bonus",
            "color": "#8b5cf6",
            "desc": "The raw building blocks for hormone synthesis and fat-soluble vitamin absorption (e.g. avocado, extra virgin olive oil, nuts, seeds)."
        },
        {
            "name": "Intracellular Hydration",
            "share": "Essential",
            "color": "#0284c7",
            "desc": "250–500 mL water or mineral-rich herbal infusion alongside meals to support digestive fluid secretion and cellular vitality."
        }
    ]
}

WOMENS_HEALTH_NUTRITION = {
    "headline": "Women's Health & Cycle-Aware Nutrition",
    "disclaimer": "Educational guide only. Not intended to diagnose, treat, or replace professional medical care.",
    "topics": [
        {
            "title": "Iron Replenishment & Energy Resilience",
            "icon": "iron",
            "summary": "During monthly menstruation, the body loses between 15–40 mg of iron. Low iron stores can cause fatigue, brain fog, cold extremities, and brittle nails.",
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
                "Menstrual Phase (Days 1–5): Hormones at baseline. Prioritize warm, mineral-rich broths, iron-dense stews, and gentle hydration.",
                "Follicular Phase (Days 6–12): Rising estrogen boosts energy and insulin sensitivity. Enjoy vibrant raw salads, fermented foods, and sprouted grains.",
                "Ovulatory Phase (Days 13–16): Estrogen peaks. Emphasize cruciferous vegetables (broccoli, cabbage) and soluble fiber to naturally metabolize excess estrogen.",
                "Luteal Phase (Days 17–28): Progesterone increases metabolic rate. Nourish with slow complex carbs (sweet potatoes), magnesium (pumpkin seeds, cacao), and calming warm teas."
            ]
        },
        {
            "title": "Electrolyte Hydration for Cramp & Bloat Ease",
            "icon": "hydration",
            "summary": "Water retention during PMS is often caused by an imbalance between sodium and potassium, not by drinking 'too much' water.",
            "keyPoints": [
                "Drink 2,000–2,500 mL of clean fluid daily. When fluid is restricted, the body triggers aldosterone to retain water.",
                "Eat potassium-rich foods (bananas, avocados, sweet potatoes, coconut water) to flush excess intracellular sodium.",
                "Enjoy natural diuretic and soothing herbal teas like peppermint, ginger, and chamomile."
            ]
        }
    ]
}

print("Nutrition dataset compiled. Foods:", len(FOODS), "| Meals:", len(MEALS))
