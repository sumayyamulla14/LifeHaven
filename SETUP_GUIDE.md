# Life Haven — Setup, Development & AI Onboarding Guide

> **For Developers & AI Coding Assistants (Antigravity, Cursor, Claude Code, Copilot)**  
> Follow this complete guide after cloning the repository to set up the project, run the Python server, verify test suites, configure environment variables, and prepare for Supabase integration.

---

## ⚡ Quick Start

```bash
# 1. Clone the repository (if not already done)
git clone <repository-url>
cd LifeHaven

# 2. Create Python virtual environment (optional but recommended)
python -m venv venv
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS / Linux:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Copy environment template
# Windows PowerShell:
Copy-Item .env.example .env
# Bash:
cp .env.example .env

# 5. Launch the local development server
python server.py

# 6. Open in your browser
# Navigate to: http://localhost:3000
```

---

## 🧪 Testing

Life Haven includes a unit test suite covering all backend controllers, models, and HTTP routes.

Run the test suite using standard Python unittest:
```bash
python -m unittest tests/test_backend.py
```

Expected output:
```
.....................
----------------------------------------------------------------------
Ran 21 tests in 0.015s

OK
```

---

## 🔒 Security & Environment Rules

1. **NEVER commit `.env` or any `.env.*` files containing secret credentials.**
2. The `.gitignore` is configured to strictly exclude:
   - `.env`
   - `.env.*` (while keeping `.env.example` as a template)
   - `__pycache__/` and Python bytecode files
   - Virtual environments (`venv/`, `.venv/`)
   - IDE and OS metadata (`.vscode/`, `.DS_Store`, `Thumbs.db`)
3. When adding new secrets (e.g. Supabase service keys, Gemini API keys), always add placeholders in `.env.example`.

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Aggregated user health metrics, hydration, cycle, and habits |
| `GET` | `/api/workouts` | Complete library of 23 workout routines with exercises and visuals |
| `GET` | `/api/workouts/history` | Log of completed user workout sessions |
| `POST` | `/api/workouts/log` | Register a completed workout session |
| `GET` | `/api/nutrition/foods` | 34 whole foods with nutrition profiles, macros, and visuals |
| `GET` | `/api/nutrition/meals` | 20 meal blueprints with ingredients and preparation steps |
| `GET` | `/api/period/cycle` | Current cycle statistics, phase, and next period estimate |
| `POST` | `/api/period/dates` | Update period start and end dates |
| `POST` | `/api/period/symptoms` | Log daily symptoms (cramps, energy, mood, etc.) |
| `GET` | `/api/hydration` | Current hydration volume, target, and today's intake logs |
| `POST` | `/api/hydration/add` | Register fluid intake (mL and vessel label) |
| `GET` | `/api/sleep` | Last night's sleep metrics, quality, and deep sleep hours |
| `POST` | `/api/sleep/log` | Record sleep duration and quality |
| `GET` | `/api/mood` | Latest mood state and journal entries |
| `POST` | `/api/mood/log` | Record mood tag, note, and timestamp |
| `GET` | `/api/habits` | List of daily wellness rituals and completion state |
| `POST` | `/api/habits/toggle` | Toggle habit completion status |
| `GET` | `/api/settings` | User profile settings and notification preferences |
| `PUT` | `/api/settings` | Update user goals, targets, and cycle length |
| `GET` | `/api/export` | Complete JSON export of all user data |
| `POST` | `/api/reset` | Reset application state to default initial values |
