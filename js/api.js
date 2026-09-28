/**
 * LIFE HAVEN — CLIENT API SERVICE (PHASE 2 BACKEND CONNECTOR)
 * 
 * Designed for BCA Student understanding:
 * Communicates with our Python backend at http://localhost:3000/api via standard fetch().
 * If backend responds, it synchronizes UI with the Python server.
 * If server is offline or fails, it gracefully falls back without breaking UI.
 */

const LifeHavenAPI = {
  baseUrl: '/api',

  async request(endpoint, options = {}) {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        ...options
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return { success: false, error: errorData.error || `HTTP ${res.status}` };
      }
      return await res.json();
    } catch (err) {
      console.warn(`[LifeHavenAPI] Network call to ${endpoint} failed, falling back to local state:`, err);
      return { success: false, error: err.message, offline: true };
    }
  },

  // 1. Dashboard
  async getDashboardSummary() {
    return this.request('/dashboard/summary');
  },

  async getDailyWellness() {
    return this.request('/dashboard/daily-wellness');
  },

  // 2. Hydration
  async getHydrationToday() {
    return this.request('/hydration/today');
  },

  async addHydration(amount_ml, source = 'Glass') {
    return this.request('/hydration/add', {
      method: 'POST',
      body: JSON.stringify({ amount_ml, source })
    });
  },

  async resetHydration() {
    return this.request('/hydration/reset', {
      method: 'POST'
    });
  },

  // 3. Sleep
  async logSleep(duration_hours, quality = 'Good', bed_time = '11:00 PM', wake_time = '07:00 AM') {
    return this.request('/sleep/record', {
      method: 'POST',
      body: JSON.stringify({ duration_hours, quality, bed_time, wake_time })
    });
  },

  async getSleepHistory() {
    return this.request('/sleep/history');
  },

  // 4. Mood & Reflection
  async logMood(mood, energy_level = 7, stress_level = 'Low', notes = '') {
    return this.request('/mood/entry', {
      method: 'POST',
      body: JSON.stringify({ mood, energy_level, stress_level, notes })
    });
  },

  async getMoodHistory() {
    return this.request('/mood/history');
  },

  // 5. Period Tracker
  async getPeriodCycle() {
    return this.request('/period/cycle');
  },

  async savePeriodRecords(data) {
    return this.request('/period/records', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async savePeriodSymptoms(data) {
    return this.request('/period/symptoms', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // 6. Workouts
  async getWorkouts(category) {
    const q = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    return this.request(`/workouts${q}`);
  },

  async completeWorkout(workout_id, duration_minutes) {
    return this.request('/workouts/complete', {
      method: 'POST',
      body: JSON.stringify({ workout_id, duration_minutes })
    });
  },

  // 7. Habits
  async getHabits() {
    return this.request('/habits');
  },

  async toggleHabit(habit_id) {
    return this.request('/habits/toggle', {
      method: 'POST',
      body: JSON.stringify({ habit_id })
    });
  },

  // 8. Progress
  async getProgressWeekly() {
    return this.request('/progress/weekly');
  }
};

window.LifeHavenAPI = LifeHavenAPI;
