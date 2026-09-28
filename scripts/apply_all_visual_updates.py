"""
Comprehensive updater for all 23 workouts (100% unique matching pictures),
all corrected food and meal pictures, balanced plate pillars, women's health topics,
and the nutrition banner visual.
"""

import re
import json

WORKOUT_IMAGES = {
    "w-beg-fullbody": "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=600&q=80",
    "w-beg-cardio": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80",
    "w-beg-strength": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
    "w-beg-1": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "w-beg-flex": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    "w-beg-core": "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=600&q=80",
    "w-beg-lower": "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=600&q=80",
    "w-beg-upper": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80",
    "w-int-fullbody": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    "w-str-1": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    "w-cardio-1": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
    "w-core-1": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    "w-upper-1": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    "w-int-lower": "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=600&q=80",
    "w-int-mobility": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
    "w-mob-1": "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=600&q=80",
    "w-adv-strength": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    "w-adv-fullbody": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80",
    "w-adv-upper": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80",
    "w-adv-lower": "https://images.unsplash.com/photo-1567598508481-65985588e295?auto=format&fit=crop&w=600&q=80",
    "w-adv-core": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80",
    "w-adv-cardio": "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=600&q=80",
    "w-adv-mobility": "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=600&q=80"
}

FOOD_IMAGE_FIXES = {
    "f-tofu": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "f-chia-seeds": "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80"
}

MEAL_IMAGE_FIXES = {
    "meal-b3": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    "meal-b4": "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=600&q=80",
    "meal-l3": "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80",
    "meal-s4": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
    "meal-q1": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
}

PLATE_IMAGES = {
    "1/2 Plate: Colorful Vegetables & Fruits": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "1/4 Plate: Quality Clean Protein": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    "1/4 Plate: Complex Carbs & Whole Grains": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    "1–2 Tbsp: Healthy Essential Fats": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    "Intracellular Hydration": "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=600&q=80"
}

WOMENS_HEALTH_IMAGES = {
    "Iron Replenishment & Energy Resilience": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    "Calcium & Vitamin D Synergy for Bone Density": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    "Cycle-Synced Nutritional Wisdom": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    "Electrolyte Hydration for Cramp & Bloat Ease": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
}

def update_backend_store():
    with open("backend/store.py", "r", encoding="utf-8") as f:
        content = f.read()

    for wid, img in WORKOUT_IMAGES.items():
        # Match Workout( id="wid", ... image="..." ... )
        pattern = rf'(Workout\(\s*id="{re.escape(wid)}",[\s\S]*?image=")[^"]+(")'
        content = re.sub(pattern, rf'\g<1>{img}\g<2>', content)

    with open("backend/store.py", "w", encoding="utf-8") as f:
        f.write(content)
    print("[+] Successfully updated backend/store.py with all 23 unique workout images.")

def update_mock_data():
    with open("js/mockData.js", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update workouts in mockData.js
    for wid, img in WORKOUT_IMAGES.items():
        pattern = rf'("id":\s*"{re.escape(wid)}",[\s\S]*?"image":\s*")[^"]+(")'
        content = re.sub(pattern, rf'\g<1>{img}\g<2>', content)

    # 2. Update food items
    for fid, img in FOOD_IMAGE_FIXES.items():
        pattern = rf'("id":\s*"{re.escape(fid)}",[\s\S]*?"image":\s*")[^"]+(")'
        content = re.sub(pattern, rf'\g<1>{img}\g<2>', content)

    # 3. Update meal items
    for mid, img in MEAL_IMAGE_FIXES.items():
        pattern = rf'("id":\s*"{re.escape(mid)}",[\s\S]*?"image":\s*")[^"]+(")'
        content = re.sub(pattern, rf'\g<1>{img}\g<2>', content)

    with open("js/mockData.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("[+] Successfully updated js/mockData.js with unique workouts and corrected nutrition images.")

def update_health_js():
    with open("js/health.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Update renderBalancedPlate PLATE_IMAGES
    plate_images_code = """    const PLATE_IMAGES = {
      "1/2 Plate: Colorful Vegetables & Fruits": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      "1/4 Plate: Quality Clean Protein": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      "1/4 Plate: Complex Carbs & Whole Grains": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      "1–2 Tbsp: Healthy Essential Fats": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
      "Intracellular Hydration": "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=600&q=80"
    };"""

    content = re.sub(r'const PLATE_IMAGES = \{[\s\S]*?\};', plate_images_code, content)

    # Update renderWomensHealth WH_IMAGES
    wh_images_code = """    const WH_IMAGES = {
      "iron": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      "calcium": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
      "cycle": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
      "hydration": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
    };"""

    content = re.sub(r'const WH_IMAGES = \{[\s\S]*?\};', wh_images_code, content)

    with open("js/health.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("[+] Successfully updated js/health.js with matched Plate & Women's Health dictionaries.")

def update_index_html():
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()

    # Add visual image to Nutrition Welcome Banner if not present
    old_banner = """          <!-- Nutrition Philosophy Banner -->
          <div class="dashboard-welcome-banner" style="background: linear-gradient(135deg, #f0fdf4, #ffffff); border-color: #bbf7d0; margin-bottom: 24px;">
            <div class="dw-left">
              <span class="dw-badge" style="background:#fff; border-color:#bbf7d0; color:#15803d;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 12.3-4.7L20 4l-4.3 3.7A7 7 0 0 1 11 20z"/><path d="M11 13l4-4"/></svg>
                Whole Food Nutrition Library
              </span>
              <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary);">Nourishment Over Restriction</h2>
              <p class="dw-desc">Every body is unique. We reject extreme medical diets and restrictive fads. Explore nutrient-dense superfoods packed with iron, calcium, fiber, healthy fats, balanced meal ideas, and cycle-aware nutrition.</p>
            </div>
          </div>"""

    new_banner = """          <!-- Nutrition Philosophy Banner -->
          <div class="dashboard-welcome-banner" style="background: linear-gradient(135deg, #f0fdf4, #ffffff); border-color: #bbf7d0; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px;">
            <div class="dw-left" style="flex: 1;">
              <span class="dw-badge" style="background:#fff; border-color:#bbf7d0; color:#15803d;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 4 13a7 7 0 0 1 12.3-4.7L20 4l-4.3 3.7A7 7 0 0 1 11 20z"/><path d="M11 13l4-4"/></svg>
                Whole Food Nutrition Library
              </span>
              <h2 style="font-size: 22px; font-weight: 800; color: var(--text-primary);">Nourishment Over Restriction</h2>
              <p class="dw-desc">Every body is unique. We reject extreme medical diets and restrictive fads. Explore nutrient-dense superfoods packed with iron, calcium, fiber, healthy fats, balanced meal ideas, and cycle-aware nutrition.</p>
            </div>
            <div class="dw-right" style="flex-shrink: 0; display: flex; align-items: center;">
              <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80" alt="Whole Food Nutrition" style="width: 150px; height: 100px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.08); border: 2px solid #bbf7d0;">
            </div>
          </div>"""

    if old_banner in content:
        content = content.replace(old_banner, new_banner)
        with open("index.html", "w", encoding="utf-8") as f:
            f.write(content)
        print("[+] Successfully updated index.html with Nutrition Philosophy Banner visual.")
    else:
        print("[!] Banner already updated or slightly modified.")

if __name__ == "__main__":
    update_backend_store()
    update_mock_data()
    update_health_js()
    update_index_html()
