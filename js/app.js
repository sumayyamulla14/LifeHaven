/**
 * LIFEHAVEN — APPLICATION CONTROLLER
 * 
 * Fixed: window.app is set immediately upon constructor instantiation
 * so all modules (HealthModule, WorkoutModule) can access window.app.state safely.
 */

class LifeHavenApp {
  constructor() {
    // 1. Immediately assign window.app and global state to prevent undefined reference errors
    window.app = this;
    this.audioCtx = null;
    this.state = loadAppState();
    window.appState = this.state;

    // 2. Set theme (prioritize localStorage, then settings, default light)
    const savedTheme = (typeof localStorage !== 'undefined' && localStorage.getItem('lifehaven_theme')) 
      || this.state.settings?.theme 
      || 'light';
    this.applyTheme(savedTheme);

    // 3. Initialize systems
    this.initClock();
    this.initEventListeners();

    // 4. Safely render Initial Views
    HealthModule.renderDashboard();
    HealthModule.renderPeriodTracker();
    HealthModule.renderNutrition();
    WorkoutModule.renderWorkouts();
    HealthModule.renderHydration();
    HealthModule.renderSleep();
    HealthModule.renderMoodWellness();
    HealthModule.renderEducation();
    HealthModule.renderProgress();

    console.log('[LifeHaven] System initialized successfully.');
  }

  /* -------------------------------------------------------------
     LIVE CLOCK & REAL-TIME DATE
     ------------------------------------------------------------- */
  initClock() {
    const timeEl = document.getElementById('live-time');
    const dateEl = document.getElementById('live-date');

    const tick = () => {
      const now = new Date();
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit'
        });
      }
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
      }
    };

    tick();
    setInterval(tick, 1000);
  }

  /* -------------------------------------------------------------
     TAB NAVIGATION SYSTEM
     ------------------------------------------------------------- */
  switchTab(tabId) {
    if (!tabId) return;

    // 1. Update active tab pane
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // 2. Update active sidebar item
    const sidebarButtons = document.querySelectorAll('.sidebar-item');
    sidebarButtons.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 3. Update top breadcrumb
    const breadcrumbEl = document.getElementById('top-breadcrumb');
    const titles = {
      'tab-dashboard': 'Dashboard',
      'tab-period': 'Period & Menstrual Cycle',
      'tab-nutrition': 'Food & Nutrition Explorer',
      'tab-workout': 'Balanced Movement Studio',
      'tab-hydration': 'Hydration Lab',
      'tab-sleep': 'Sleep & Circadian Rhythm',
      'tab-wellness': 'Mood & Guided Breathing',
      'tab-education': 'Health Education Library',
      'tab-progress': 'Progress & Daily Habits'
    };
    if (breadcrumbEl && titles[tabId]) {
      breadcrumbEl.textContent = titles[tabId];
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Subtle audio feedback
    this.playTone(520, 0.05);

    // Refresh the corresponding module safely
    try {
      if (tabId === 'tab-dashboard') HealthModule.renderDashboard();
      else if (tabId === 'tab-period') HealthModule.renderPeriodTracker();
      else if (tabId === 'tab-nutrition') HealthModule.renderNutrition();
      else if (tabId === 'tab-workout') WorkoutModule.renderWorkouts();
      else if (tabId === 'tab-hydration') HealthModule.renderHydration();
      else if (tabId === 'tab-sleep') HealthModule.renderSleep();
      else if (tabId === 'tab-wellness') HealthModule.renderMoodWellness();
      else if (tabId === 'tab-education') HealthModule.renderEducation();
      else if (tabId === 'tab-progress') HealthModule.renderProgress();
    } catch (err) {
      console.warn('Tab module render notice:', err);
    }
  }

  /* -------------------------------------------------------------
     THEME MANAGEMENT (LIGHT / DARK)
     ------------------------------------------------------------- */
  applyTheme(themeName) {
    const isDark = themeName === 'dark';
    const effectiveTheme = isDark ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.body.setAttribute('data-theme', effectiveTheme);

    try {
      localStorage.setItem('lifehaven_theme', effectiveTheme);
    } catch (e) {}

    if (this.state && this.state.settings) {
      this.state.settings.theme = effectiveTheme;
      saveAppState(this.state);
    }

    // Sync toggle button icon
    const iconBtn = document.getElementById('theme-toggle-icon');
    if (iconBtn) {
      if (effectiveTheme === 'dark') {
        // Sun icon (click to switch to light)
        iconBtn.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      } else {
        // Moon icon (click to switch to dark)
        iconBtn.innerHTML = `
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        `;
      }
    }
  }

  toggleThemeMode() {
    document.body.classList.add('theme-transitioning');
    const current = document.body.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 250);
    this.showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'toast-emerald');
  }

  /* -------------------------------------------------------------
     WEB AUDIO TONE SYNTHESIZER
     ------------------------------------------------------------- */
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playTone(freq = 520, duration = 0.12) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  playVictoryTone() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 0.2), idx * 100);
      });
    } catch (e) {}
  }

  /* -------------------------------------------------------------
     TOAST NOTIFICATIONS
     ------------------------------------------------------------- */
  showToast(message, typeClass = 'toast-emerald') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item ${typeClass}`;
    toast.innerHTML = `
      <span class="toast-dot"></span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('visible');
    }, 20);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }

  /* -------------------------------------------------------------
     CONTROL CENTER MODAL & PREFERENCES
     ------------------------------------------------------------- */
  openControlCenter() {
    const modal = document.getElementById('control-center-modal');
    if (!modal) return;

    const nameInput = document.getElementById('cfg-user-name');
    const waterInput = document.getElementById('cfg-water-target');
    const sleepInput = document.getElementById('cfg-sleep-target');
    const cycleInput = document.getElementById('cfg-cycle-length');

    if (nameInput) nameInput.value = this.state.settings?.userName || 'Elena';
    if (waterInput) waterInput.value = this.state.settings?.waterTarget || 2500;
    if (sleepInput) sleepInput.value = this.state.settings?.sleepTargetHours || 8;
    if (cycleInput) cycleInput.value = this.state.settings?.cycleLengthDays || 28;

    modal.classList.add('open');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }

  saveControlGoals() {
    const name = document.getElementById('cfg-user-name')?.value || 'Elena';
    const water = parseInt(document.getElementById('cfg-water-target')?.value, 10) || 2500;
    const sleep = parseFloat(document.getElementById('cfg-sleep-target')?.value) || 8;
    const cycle = parseInt(document.getElementById('cfg-cycle-length')?.value, 10) || 28;

    this.state.settings.userName = name;
    this.state.settings.waterTarget = water;
    this.state.water.target = water;
    this.state.settings.sleepTargetHours = sleep;
    this.state.settings.cycleLengthDays = cycle;
    this.state.periodTracker.cycleLength = cycle;

    const sidebarName = document.getElementById('sidebar-user-name');
    if (sidebarName) sidebarName.textContent = name;

    saveAppState(this.state);
    HealthModule.renderDashboard();
    HealthModule.renderHydration();
    HealthModule.renderPeriodTracker();

    this.closeModal('control-center-modal');
    this.showToast('Settings saved successfully!', 'toast-emerald');
  }

  exportFullBackupJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `LifeHaven_Health_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('Backup JSON exported successfully!', 'toast-emerald');
  }

  resetAllApplicationData() {
    if (confirm('Reset all health data back to defaults?')) {
      localStorage.removeItem('lifehaven_state_v2');
      location.reload();
    }
  }

  /* -------------------------------------------------------------
     EVENT LISTENERS INITIALIZATION
     ------------------------------------------------------------- */
  initEventListeners() {
    // Sidebar nav clicks - bind with event delegation so clicking any child element inside works!
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.sidebar-item');
      if (item && item.dataset.tab) {
        e.preventDefault();
        this.switchTab(item.dataset.tab);
      }
    });

    // Global Search Bar in Top Navbar
    const globalSearch = document.getElementById('global-search-bar');
    if (globalSearch) {
      globalSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length > 0) {
          HealthModule.nutritionSearchQuery = query;
          HealthModule.renderFoodList();
          this.switchTab('tab-nutrition');
        }
      });
    }
  }
}

// Global Application Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  window.app = new LifeHavenApp();
});
