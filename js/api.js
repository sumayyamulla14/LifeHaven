/**
 * LIFE HAVEN — CLIENT API SERVICE (SUPABASE & BACKEND CONNECTOR)
 * 
 * Communicates with:
 * 1. Supabase Cloud Database (when configured in environment variables via window.supabaseClient)
 * 2. Local Python Backend API at /api/* via standard fetch()
 * 3. Graceful offline fallback to local state if either is unreachable.
 * 
 * ZERO hardcoded secrets: uses public client authentication via window.supabaseClient.
 */

const LifeHavenAPI = {
  baseUrl: '/api',

  getSupabase() {
    return window.supabaseClient || null;
  },

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
    const sb = this.getSupabase();
    if (sb) {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await sb.from('hydration_records').select('*').eq('date', today);
        if (!error && data) {
          const total = data.reduce((sum, r) => sum + (r.amount_ml || 0), 0);
          return { success: true, data: { current_ml: total, logs: data } };
        }
      } catch (_) {}
    }
    return this.request('/hydration/today');
  },

  async addHydration(amount_ml, source = 'Glass') {
    const sb = this.getSupabase();
    if (sb) {
      try {
        const today = new Date().toISOString().split('T')[0];
        const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        await sb.from('hydration_records').insert([{
          id: 'hyd_' + Date.now(),
          amount_ml,
          source,
          date: today,
          logged_at: timeStr
        }]);
      } catch (err) {
        console.warn('[LifeHavenAPI] Supabase hydration insert fallback:', err);
      }
    }
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
    const sb = this.getSupabase();
    if (sb) {
      try {
        const today = new Date().toISOString().split('T')[0];
        await sb.from('sleep_records').insert([{
          id: 'slp_' + Date.now(),
          date: today,
          duration_hours,
          quality,
          bed_time,
          wake_time
        }]);
      } catch (err) {
        console.warn('[LifeHavenAPI] Supabase sleep insert fallback:', err);
      }
    }
    return this.request('/sleep/record', {
      method: 'POST',
      body: JSON.stringify({ duration_hours, quality, bed_time, wake_time })
    });
  },

  async getSleepHistory() {
    const sb = this.getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb.from('sleep_records').select('*').order('created_at', { ascending: false }).limit(7);
        if (!error && data && data.length > 0) {
          return { success: true, data };
        }
      } catch (_) {}
    }
    return this.request('/sleep/history');
  },

  // 4. Mood & Reflection
  async logMood(mood, energy_level = 7, stress_level = 'Low', notes = '') {
    const sb = this.getSupabase();
    if (sb) {
      try {
        const timeStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
                        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        await sb.from('mood_records').insert([{
          id: 'mood_' + Date.now(),
          mood,
          energy_level,
          stress_level,
          notes,
          logged_at: timeStr
        }]);
      } catch (err) {
        console.warn('[LifeHavenAPI] Supabase mood insert fallback:', err);
      }
    }
    return this.request('/mood/entry', {
      method: 'POST',
      body: JSON.stringify({ mood, energy_level, stress_level, notes })
    });
  },

  async getMoodHistory() {
    const sb = this.getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb.from('mood_records').select('*').order('created_at', { ascending: false }).limit(10);
        if (!error && data && data.length > 0) {
          return { success: true, data };
        }
      } catch (_) {}
    }
    return this.request('/mood/history');
  },

  // 5. Period Tracker
  async getPeriodCycle() {
    return this.request('/period/cycle');
  },

  async savePeriodRecords(data) {
    const sb = this.getSupabase();
    if (sb) {
      try {
        await sb.from('period_records').insert([{
          id: 'prd_' + Date.now(),
          start_date: data.start_date,
          end_date: data.end_date,
          cycle_length: data.cycle_length || 28,
          period_length: data.period_length || 5,
          notes: data.notes || ''
        }]);
      } catch (err) {
        console.warn('[LifeHavenAPI] Supabase period records insert fallback:', err);
      }
    }
    return this.request('/period/records', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async savePeriodSymptoms(data) {
    const sb = this.getSupabase();
    if (sb) {
      try {
        await sb.from('period_symptoms').insert([{
          id: 'sym_' + Date.now(),
          date: data.date || new Date().toISOString().split('T')[0],
          flow: data.flow || 'None',
          cramps: data.cramps || 'None',
          mood: data.mood || 'Calm',
          energy: data.energy || 'Good',
          symptoms: data.symptoms || [],
          notes: data.notes || ''
        }]);
      } catch (err) {
        console.warn('[LifeHavenAPI] Supabase period symptoms insert fallback:', err);
      }
    }
    return this.request('/period/symptoms', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // 6. Workouts
  async getWorkouts(category) {
    const sb = this.getSupabase();
    if (sb) {
      try {
        let query = sb.from('workouts').select('*');
        if (category && category !== 'all') {
          query = query.eq('category', category.toLowerCase());
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return { success: true, data };
        }
      } catch (_) {}
    }
    const q = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    return this.request(`/workouts${q}`);
  },

  async completeWorkout(workout_id, duration_minutes) {
    const sb = this.getSupabase();
    if (sb) {
      try {
        await sb.from('workout_history').insert([{
          id: 'wh_' + Date.now(),
          workout_id,
          routine_title: workout_id,
          duration_minutes: duration_minutes || 20,
          completed_at: new Date().toISOString()
        }]);
      } catch (err) {
        console.warn('[LifeHavenAPI] Supabase workout history insert fallback:', err);
      }
    }
    return this.request('/workouts/complete', {
      method: 'POST',
      body: JSON.stringify({ workout_id, duration_minutes })
    });
  },

  // 7. Habits
  async getHabits() {
    const sb = this.getSupabase();
    if (sb) {
      try {
        const { data, error } = await sb.from('habits').select('*').order('id', { ascending: true });
        if (!error && data && data.length > 0) {
          return { success: true, data };
        }
      } catch (_) {}
    }
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
