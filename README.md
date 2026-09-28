# Life Haven

> **A holistic women's wellness, hormonal vitality, cycle synchronization, movement studio, and nutrition engine.**

Life Haven is an evidence-based wellness platform tailored for women. It combines cycle-aware habit tracking, a 23-routine workout studio with multi-stage movement tutorials and real exercise photography, a 34-item whole food nutrition explorer with meal blueprints, circadian sleep analytics, hydration tracking, guided somatic breathing, and an educational library.

---

## ✨ Key Features

- **🌸 Menstrual Cycle & Ovulation Tracker**: Accurate calculation of cycle day, hormonal phase (Menstrual, Follicular, Ovulatory, Luteal), estimated next period date, interactive symptom cloud, and historical cycle logs.
- **🏋️ Movement Studio & Exercise Tutorials**:
  - **23 Structured Workouts**: Covering Beginner, Intermediate, and Advanced across Full Body, Strength, Cardio, Core, Upper Body, Lower Body, Mobility, and Flexibility.
  - **38 Real Movement Guides**: Each exercise supports verified visuals, multi-stage movement tutorials (**Stage 1: Setup Stance** & **Stage 2: Execution & Lockout**), biomechanical alignment vector diagrams, form tips, common mistakes, and beginner modifications.
  - **Interactive Routine Player**: Live session timer with pause/resume and step completion checklists.
- **🥗 Whole Food Nutrition & Meal Blueprints**:
  - **34 Whole Foods**: High-resolution photography, macro profile grids (calories, protein, fiber, carbs, healthy fats), key vitamins & minerals, and culinary ideas.
  - **20 Meal Ideas**: Balanced blueprints with ingredient lists, prep time, caloric highlights, and practical step-by-step culinary preparation tutorials.
  - **Balanced Plate Framework**: Visual guide to macronutrient proportions tailored to energy needs.
- **💧 Hydration Lab**: Vessel-based quick registration (glasses, cups, water bottles), interactive flask level visualization, daily percentage KPI, and 7-day intake history.
- **🌙 Sleep & Circadian Analytics**: Quality ratings, deep sleep metrics, restorative tips, and circadian hygiene recommendations.
- **🌿 Mood & Somatic Regulation**: Emotion check-ins, mindful journal logs, and an animated guided Box Breathing / 4-7-8 somatic ring.
- **🌗 Theme Adaptation**: High-contrast, slate-and-teal Dark Mode paired with a clean Light Mode default, featuring zero-flash theme bootstrap and persistent `localStorage` synchronization.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5 Semantic Structure, Modern Vanilla CSS Design System with CSS Custom Properties, Vanilla JavaScript (ES6+), Google Fonts (Inter & Outfit).
- **Backend**: Python 3.12, Built-in HTTP API (`server.py`), modular routing (`backend/router.py`), resource controllers (`backend/controllers.py`), and typed data models (`backend/models.py`).
- **Data Architecture**: In-memory state store (`backend/store.py`) with full REST API endpoints, automated unit test suite, and Supabase integration readiness.
- **Licensing & Assets**: Verified, watermark-free images under the Unsplash License with attribution tags.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd LifeHaven
```

### 2. Configure Environment Variables
Copy the template file to `.env`:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

### 3. Run the Python Backend Server
```bash
python server.py
```
Open your browser at: **[http://localhost:3000](http://localhost:3000)**

### 4. Run the Test Suite
```bash
python -m unittest tests/test_backend.py
```

---

## 📁 Repository Structure

```
LifeHaven/
├── .env.example          # Environment variable template (safe to commit)
├── .gitignore            # Git exclusion rules (.env, Python cache, IDE configs)
├── LICENSE               # MIT License
├── README.md             # Project overview & documentation
├── SETUP_GUIDE.md        # Comprehensive setup & developer guide
├── requirements.txt      # Python dependencies
├── server.py             # Python HTTP server & API entry point
├── index.html            # Main single-page application shell
├── style.css             # Base stylesheet
├── assets/               # SVGs, icons, and logos
├── css/
│   ├── main.css          # Core layouts and global tokens
│   ├── components.css    # Cards, modals, buttons, visual containers
│   └── themes.css        # Light/Dark mode color tokens & transitions
├── js/
│   ├── app.js            # Core application state & navigation orchestrator
│   ├── api.js            # API client connecting frontend to backend
│   ├── health.js         # Health, period, nutrition, hydration & sleep engine
│   ├── workout.js        # Movement studio, exercise tutorials & routine runner
│   └── mockData.js       # Offline resilient fallback data
├── backend/
│   ├── models.py         # Dataclass models (Workout, Food, Meal, etc.)
│   ├── store.py          # In-memory database & data access layer
│   ├── controllers.py    # Request handlers & business logic
│   └── router.py         # URL dispatcher & routing table
└── tests/
    └── test_backend.py   # Unit test suite verifying all 21 API endpoints
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
