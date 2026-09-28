# Life Haven — Comprehensive Setup & Deployment Guide

Welcome to **Life Haven** — an evidence-based women's wellness, hormonal vitality, workout studio, and whole-food nutrition platform.

This guide walks you through installing dependencies, configuring environment variables, running locally, setting up Supabase, and deploying to Vercel.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Quick Local Setup](#2-quick-local-setup)
3. [Environment Configuration](#3-environment-configuration)
4. [Connecting Supabase Cloud Database](#4-connecting-supabase-cloud-database)
5. [Running Tests](#5-running-tests)
6. [Deploying to Vercel](#6-deploying-to-vercel)
7. [Security & Best Practices](#7-security--best-practices)

---

## 1. Prerequisites

- **Python 3.10+** (standard Python installation)
- A modern web browser (Chrome, Edge, Firefox, Safari)
- *(Optional)* A free [Supabase](https://supabase.com) account for cloud database persistence
- *(Optional)* A [Vercel](https://vercel.com) account for cloud deployment

---

## 2. Quick Local Setup

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd LifeHaven
```

### Step 2: Set Up Python Virtual Environment (Recommended)
```bash
# Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1

# macOS / Linux:
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Create Environment File
```bash
# Windows PowerShell:
Copy-Item .env.example .env

# macOS / Linux:
cp .env.example .env
```

### Step 5: Launch the Server
```bash
python server.py
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 3. Environment Configuration

Life Haven reads settings from `.env`. The template [`.env.example`](.env.example) outlines all supported variables:

```ini
# Server Settings
PORT=3000
HOST=127.0.0.1
DEBUG=True

# Application Secret Key (Used for sessions & token verification)
SECRET_KEY=generate_a_random_secure_key_here

# Supabase Cloud Database Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Administrative Access List (Comma-separated emails)
ADMIN_EMAILS=user@example.com
```

> **IMPORTANT**: `.env` and `.env.*` are ignored by `.gitignore`. **NEVER** commit `.env` or sensitive secrets to GitHub.

---

## 4. Connecting Supabase Cloud Database

Life Haven is built to operate seamlessly in two modes:
1. **Local Mode**: Runs using the built-in Python standard library in-memory database.
2. **Cloud Mode**: Connects directly to Supabase PostgreSQL using Row Level Security (RLS).

### Step-by-Step Supabase Setup:

1. **Create a Supabase Project**:
   - Go to [database.new](https://database.new) and create a free project.
   - Choose a project name (e.g., `life-haven`) and set a strong database password.

2. **Execute Database Schema**:
   - In your Supabase Dashboard, open **SQL Editor** from the left navigation.
   - Click **New Query**.
   - Copy the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and paste it into the editor.
   - Click **Run**.
   - This creates all 11 tables (`profiles`, `workouts`, `workout_history`, `period_records`, `period_symptoms`, `hydration_records`, `sleep_records`, `mood_records`, `nutrition_foods`, `meal_suggestions`, `habits`), indexes, triggers, and RLS policies.

3. **Obtain API Keys**:
   - Navigate to **Project Settings &rarr; API**.
   - Copy your **Project URL** &rarr; paste as `SUPABASE_URL` in `.env`.
   - Copy your **Project API anon public key** &rarr; paste as `SUPABASE_ANON_KEY` in `.env`.
   - Copy your **service_role secret key** &rarr; paste as `SUPABASE_SERVICE_ROLE_KEY` in `.env`.

4. **Verify Frontend Connection**:
   - Start the server (`python server.py`).
   - The frontend automatically queries `/api/config` and initializes `@supabase/supabase-js`.
   - Check the browser console (`F12 &rarr; Console`) to see:
     `[LifeHaven Config] Supabase client initialized successfully.`

---

## 5. Running Tests

Life Haven includes a unit test suite testing all controllers, data models, and HTTP routes.

Run the tests using standard Python unittest:
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

## 6. Deploying to Vercel

The project includes [`vercel.json`](vercel.json) preconfigured for static asset delivery and Python serverless API routing.

### Deploying via Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Deploying via GitHub Integration:
1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/LifeHaven.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import your `LifeHaven` repository.
3. In **Environment Variables**, add:
   - `SUPABASE_URL` = `https://your-project.supabase.co`
   - `SUPABASE_ANON_KEY` = `<your-anon-key>`
   - `SECRET_KEY` = `<your-secret-key>`
4. Click **Deploy**. Vercel will build and assign your production URL.

---

## 7. Security & Best Practices

- **Zero Hardcoded Secrets**: Credentials are only read from environment variables.
- **Row Level Security (RLS)**: Public catalogs (`workouts`, `nutrition_foods`, `meal_suggestions`) allow read-only access, while user personal data (`hydration_records`, `period_records`, `sleep_records`, `mood_records`, `habits`) is strictly isolated to authenticated users (`auth.uid() = user_id`).
- **Git Protection**: `.gitignore` strictly blocks `.env`, `.env.*`, and temporary test/cache files.
