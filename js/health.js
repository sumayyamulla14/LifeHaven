/**
 * LIFEHAVEN — HEALTH & WELLNESS ENGINE
 * 
 * Fail-safe state accessor: guarantees no TypeError if called during bootstrap.
 */

const getHealthState = () => {
  if (window.app && window.app.state) return window.app.state;
  if (window.appState) return window.appState;
  return loadAppState();
};

const HealthModule = {
  calendarDate: new Date(),
  breathingInterval: null,
  nutritionFilter: 'all',
  nutritionSearchQuery: '',
  mealTypeFilter: 'all',
  educationCategory: 'all',

  /* =============================================================
     1. DASHBOARD OVERVIEW
     ============================================================= */
  renderDashboard() {
    const state = getHealthState();
    const { water, sleep, moodWellness, habits } = state;

    // Greeting with user name
    const greetingEl = document.getElementById('dash-greeting-title');
    if (greetingEl) {
      const name = state.settings?.userName || 'Elena';
      const hour = new Date().getHours();
      let timeGreeting = 'Good morning';
      if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
      else if (hour >= 17) timeGreeting = 'Good evening';
      greetingEl.textContent = `${timeGreeting}, ${name}`;
    }

    // 1. Water KPI
    const waterPct = Math.min(100, Math.round((water.current / water.target) * 100));
    const waterValEl = document.getElementById('dash-water-val');
    const waterBarEl = document.getElementById('dash-water-bar');
    const waterPctEl = document.getElementById('dash-water-pct');
    if (waterValEl) waterValEl.innerHTML = `${water.current.toLocaleString()} <span class="unit">/ ${water.target.toLocaleString()} mL</span>`;
    if (waterBarEl) waterBarEl.style.width = `${waterPct}%`;
    if (waterPctEl) waterPctEl.textContent = `${waterPct}%`;

    const sidebarWater = document.getElementById('sidebar-water-badge');
    if (sidebarWater) sidebarWater.textContent = `${waterPct}%`;

    // 2. Sleep KPI
    const sleepValEl = document.getElementById('dash-sleep-val');
    const sleepScoreEl = document.getElementById('dash-sleep-score');
    if (sleepValEl) sleepValEl.innerHTML = `${sleep.lastNight.durationHours} <span class="unit">Hours</span>`;
    if (sleepScoreEl) sleepScoreEl.textContent = `${sleep.lastNight.quality} • Deep: ${sleep.lastNight.deepSleepHours || 2.1}h`;

    // 3. Period / Cycle Summary
    const stats = this.calculateCycleStats();
    const cyclePhasePill = document.getElementById('dash-cycle-phase');
    const daysUntilEl = document.getElementById('dash-cycle-days-until');
    const sidebarCycle = document.getElementById('sidebar-cycle-badge');

    if (cyclePhasePill) cyclePhasePill.textContent = stats.currentPhase.replace(' Phase', '');
    if (daysUntilEl) {
      daysUntilEl.textContent = stats.daysUntilNextPeriod <= 0 
        ? 'Period expected around now' 
        : `~${stats.daysUntilNextPeriod} days to next period`;
    }
    if (sidebarCycle) sidebarCycle.textContent = `Day ${stats.currentCycleDay}`;

    // 4. Habit Progress
    const completedHabits = habits.filter(h => h.completed).length;
    const habitsValEl = document.getElementById('dash-habits-val');
    const habitsBarEl = document.getElementById('dash-habits-bar');
    if (habitsValEl) habitsValEl.textContent = `${completedHabits} of ${habits.length} done`;
    if (habitsBarEl) habitsBarEl.style.width = `${Math.round((completedHabits / habits.length) * 100)}%`;
  },

  /* =============================================================
     2. PERIOD TRACKER MODULE
     ============================================================= */
  calculateCycleStats() {
    const pt = getHealthState().periodTracker;
    const lastStart = new Date(pt.lastPeriodStart);
    const today = new Date();

    const diffTime = today.getTime() - lastStart.getTime();
    const daysSinceStart = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const currentCycleDay = daysSinceStart > 0 ? ((daysSinceStart - 1) % pt.cycleLength) + 1 : 1;

    const nextPeriodDate = new Date(lastStart);
    nextPeriodDate.setDate(lastStart.getDate() + pt.cycleLength);
    const diffNext = nextPeriodDate.getTime() - today.getTime();
    const daysUntilNextPeriod = Math.ceil(diffNext / (1000 * 60 * 60 * 24));

    let currentPhase = 'Follicular Phase';
    let phaseDescription = 'Rising estrogen brings mental clarity, sustained energy, and physical resilience.';
    if (currentCycleDay <= pt.periodLength) {
      currentPhase = 'Menstrual Phase';
      phaseDescription = 'Hormones are at baseline. Prioritize warm hydration, iron-rich meals, and restorative rest.';
    } else if (currentCycleDay >= 13 && currentCycleDay <= 16) {
      currentPhase = 'Ovulatory Phase';
      phaseDescription = 'Estrogen peaks with an LH surge. High energy, confidence, and radiant vitality.';
    } else if (currentCycleDay > 16) {
      currentPhase = 'Luteal Phase';
      phaseDescription = 'Progesterone rises to build the lining. Nourish with complex carbs, magnesium, and gentle movement.';
    }

    return {
      currentCycleDay,
      daysUntilNextPeriod,
      nextPeriodDate: nextPeriodDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      currentPhase,
      phaseDescription,
      cycleLength: pt.cycleLength,
      periodLength: pt.periodLength
    };
  },

  renderPeriodTracker() {
    const pt = getHealthState().periodTracker;
    const stats = this.calculateCycleStats();

    const phaseName = document.getElementById('period-phase-name');
    const phaseDesc = document.getElementById('period-phase-desc');
    const nextPeriodEst = document.getElementById('period-next-estimate');

    if (phaseName) phaseName.textContent = `${stats.currentPhase} • Day ${stats.currentCycleDay}`;
    if (phaseDesc) phaseDesc.textContent = stats.phaseDescription;
    if (nextPeriodEst) nextPeriodEst.textContent = stats.nextPeriodDate;

    const startInput = document.getElementById('period-input-start');
    const endInput = document.getElementById('period-input-end');
    if (startInput) startInput.value = pt.lastPeriodStart || '';
    if (endInput) endInput.value = pt.lastPeriodEnd || '';

    this.renderPeriodCalendar();
    this.renderSymptomLogger();
    this.renderCycleHistory();
  },

  changeCalendarMonth(delta) {
    this.calendarDate.setMonth(this.calendarDate.getMonth() + delta);
    this.renderPeriodCalendar();
  },

  renderPeriodCalendar() {
    const calendarGrid = document.getElementById('period-calendar-grid');
    const monthYearTitle = document.getElementById('period-calendar-month-year');
    if (!calendarGrid) return;

    const year = this.calendarDate.getFullYear();
    const month = this.calendarDate.getMonth();

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    if (monthYearTitle) {
      monthYearTitle.textContent = `${monthNames[month]} ${year}`;
    }

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const pt = getHealthState().periodTracker;
    const lastStart = new Date(pt.lastPeriodStart);
    const lastEnd = new Date(pt.lastPeriodEnd);

    const predictedStart = new Date(lastStart);
    predictedStart.setDate(lastStart.getDate() + pt.cycleLength);
    const predictedEnd = new Date(predictedStart);
    predictedEnd.setDate(predictedStart.getDate() + pt.periodLength);

    const today = new Date();
    let html = '<div class="calendar-box">';

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    html += '<div class="cal-weekdays">';
    dayHeaders.forEach(day => {
      html += `<div>${day}</div>`;
    });
    html += '</div>';

    html += '<div class="cal-days-grid">';

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      html += `<div class="cal-day-cell pad">${prevMonthDays - i}</div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const currentCellDate = new Date(year, month, d);
      const dateStr = currentCellDate.toISOString().split('T')[0];
      
      let classes = ['cal-day-cell'];
      const isToday = currentCellDate.toDateString() === today.toDateString();
      if (isToday) classes.push('today');

      if (currentCellDate >= lastStart && currentCellDate <= lastEnd) {
        classes.push('period-flow');
      }

      if (currentCellDate >= predictedStart && currentCellDate <= predictedEnd) {
        classes.push('period-predicted');
      }

      const ovDate = new Date(predictedStart);
      ovDate.setDate(predictedStart.getDate() - 14);
      if (Math.abs(currentCellDate.getTime() - ovDate.getTime()) <= 86400000) {
        classes.push('period-ovulation');
      }

      html += `
        <div class="${classes.join(' ')}" onclick="HealthModule.selectCalendarDay('${dateStr}')" title="${dateStr}">
          <span>${d}</span>
          ${classes.includes('period-flow') ? '<span class="cell-dot flow"></span>' : ''}
          ${classes.includes('period-predicted') ? '<span class="cell-dot pred"></span>' : ''}
          ${classes.includes('period-ovulation') ? '<span class="cell-dot ovu"></span>' : ''}
        </div>
      `;
    }

    html += '</div></div>';
    calendarGrid.innerHTML = html;
  },

  selectCalendarDay(dateStr) {
    window.app.showToast(`Selected date: ${dateStr}`, 'toast-emerald');
  },

  savePeriodDates() {
    const startVal = document.getElementById('period-input-start')?.value;
    const endVal = document.getElementById('period-input-end')?.value;

    if (!startVal) {
      window.app.showToast('Please select at least a Period Start Date', 'toast-coral');
      return;
    }

    const state = getHealthState();
    const pt = state.periodTracker;
    pt.lastPeriodStart = startVal;
    if (endVal) pt.lastPeriodEnd = endVal;

    const newEntry = {
      startDate: startVal,
      endDate: endVal || startVal,
      cycleLength: pt.cycleLength,
      periodLength: pt.periodLength,
      notes: 'Logged via cycle manager'
    };

    if (!pt.history.find(h => h.startDate === startVal)) {
      pt.history.unshift(newEntry);
    }

    saveAppState(state);
    this.renderPeriodTracker();
    this.renderDashboard();
    window.app.showToast('Period dates updated successfully!', 'toast-emerald');

    if (window.LifeHavenAPI) {
      window.LifeHavenAPI.savePeriodRecords({
        start_date: startVal,
        end_date: endVal || startVal,
        cycle_length: pt.cycleLength,
        period_length: pt.periodLength
      }).then(res => {
        if (res && res.success) console.log('[LifeHaven Backend] Period records synced:', res.data);
      });
    }
  },

  renderSymptomLogger() {
    const pt = getHealthState().periodTracker;
    const todaySym = pt.todaySymptoms;
    const container = document.getElementById('period-symptoms-tags');
    if (!container) return;

    container.innerHTML = pt.availableSymptoms.map(sym => {
      const active = todaySym.symptoms.includes(sym.toLowerCase()) ? 'active' : '';
      return `
        <button type="button" class="symptom-tag-btn ${active}" onclick="HealthModule.toggleSymptom('${sym}')">
          ${sym}
        </button>
      `;
    }).join('');

    const notesInput = document.getElementById('period-notes-input');
    if (notesInput) notesInput.value = todaySym.notes || '';
  },

  toggleSymptom(sym) {
    const state = getHealthState();
    const pt = state.periodTracker;
    const key = sym.toLowerCase();
    const idx = pt.todaySymptoms.symptoms.indexOf(key);
    if (idx > -1) {
      pt.todaySymptoms.symptoms.splice(idx, 1);
    } else {
      pt.todaySymptoms.symptoms.push(key);
    }
    saveAppState(state);
    this.renderSymptomLogger();
  },

  saveTodaySymptoms() {
    const state = getHealthState();
    const pt = state.periodTracker;
    const flowSelect = document.getElementById('period-flow-select')?.value;
    const crampsSelect = document.getElementById('period-cramps-select')?.value;
    const notes = document.getElementById('period-notes-input')?.value;

    pt.todaySymptoms.flow = flowSelect || 'None';
    pt.todaySymptoms.cramps = crampsSelect || 'None';
    pt.todaySymptoms.notes = notes || '';

    saveAppState(state);
    window.app.showToast('Today\'s symptoms and notes recorded!', 'toast-emerald');

    if (window.LifeHavenAPI) {
      window.LifeHavenAPI.savePeriodSymptoms({
        flow: pt.todaySymptoms.flow,
        cramps: pt.todaySymptoms.cramps,
        mood: pt.todaySymptoms.mood,
        energy: pt.todaySymptoms.energy,
        symptoms: pt.todaySymptoms.symptoms,
        notes: pt.todaySymptoms.notes
      }).then(res => {
        if (res && res.success) console.log('[LifeHaven Backend] Symptoms synced:', res.data);
      });
    }
  },

  renderCycleHistory() {
    const pt = getHealthState().periodTracker;
    const container = document.getElementById('period-history-list');
    if (!container) return;

    if (pt.history.length === 0) {
      container.innerHTML = '<div style="font-size: 13px; color: var(--text-muted); padding: 12px 0;">No past cycle logs recorded yet.</div>';
      return;
    }

    container.innerHTML = pt.history.map(item => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-card-subtle); border-radius: var(--radius-md); font-size: 13px;">
        <div>
          <strong style="color: var(--text-primary);">${item.startDate} &rarr; ${item.endDate}</strong>
          <div style="font-size: 12px; color: var(--text-muted);">${item.notes || 'Normal cycle'}</div>
        </div>
        <div style="display: flex; gap: 6px;">
          <span class="sidebar-badge">${item.cycleLength} Days</span>
          <span class="sidebar-badge">${item.periodLength} Bleeding</span>
        </div>
      </div>
    `).join('');
  },

  /* =============================================================
     3. FOOD & NUTRITION MODULE
     ============================================================= */
  currentNutritionSection: 'foods',

  switchNutritionSection(section) {
    this.currentNutritionSection = section;
    const tabs = ['foods', 'meals', 'plate', 'women'];
    tabs.forEach(t => {
      const btn = document.getElementById(`ntab-${t}-btn`);
      const sec = document.getElementById(`nutrition-section-${t}`);
      if (btn) btn.classList.toggle('active', t === section);
      if (sec) sec.style.display = (t === section) ? 'block' : 'none';
    });

    if (section === 'foods') {
      this.renderNutritionCategories();
      this.renderFoodList();
    } else if (section === 'meals') {
      this.renderMealIdeas();
    } else if (section === 'plate') {
      this.renderBalancedPlate();
    } else if (section === 'women') {
      this.renderWomensHealth();
    }
  },

  handleNutritionSearch(query) {
    this.nutritionSearchQuery = (query || '').toLowerCase().trim();
    const clearBtn = document.getElementById('nutrition-search-clear');
    if (clearBtn) {
      clearBtn.style.display = this.nutritionSearchQuery ? 'inline-block' : 'none';
    }

    if (this.currentNutritionSection === 'meals') {
      this.renderMealIdeas();
    } else if (this.currentNutritionSection === 'foods') {
      this.renderFoodList();
    } else {
      // If searching while on Plate or Women's Health, switch to Foods tab
      this.switchNutritionSection('foods');
      this.renderFoodList();
    }
  },

  clearNutritionSearch() {
    this.nutritionSearchQuery = '';
    const input = document.getElementById('nutrition-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('nutrition-search-clear');
    if (clearBtn) clearBtn.style.display = 'none';

    this.renderFoodList();
    this.renderMealIdeas();
  },

  getNutritionCategoryIcon(id) {
    const icons = {
      all: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>`,
      fruits: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="14" r="7"/><path d="M12 7c1-3 4-4 4-4"/></svg>`,
      vegetables: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
      protein: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12l2 6-8 12L4 9l2-6z"/></svg>`,
      iron: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/></svg>`,
      calcium: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2h8l2 20H6L8 2z"/></svg>`,
      fiber: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V2M17 7l-5 5-5-5M17 13l-5 5-5-5"/></svg>`,
      fats: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a5 5 0 0 1 5 5c0 4-5 13-5 13S7 11 7 7a5 5 0 0 1 5-5z"/></svg>`,
      hydration: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`
    };
    return icons[id] || `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>`;
  },

  renderNutrition() {
    this.renderNutritionCategories();
    this.renderFoodList();
    this.renderMealIdeas();
    this.renderBalancedPlate();
    this.renderWomensHealth();
    this.switchNutritionSection(this.currentNutritionSection || 'foods');
  },

  renderNutritionCategories() {
    const container = document.getElementById('nutrition-categories-bar');
    if (!container) return;
    const categories = getHealthState().nutrition?.categories || [
      { id: 'all', name: 'All Superfoods', icon: 'all' },
      { id: 'fruits', name: 'Fruits', icon: 'fruits' },
      { id: 'vegetables', name: 'Vegetables', icon: 'vegetables' },
      { id: 'protein', name: 'Protein-Rich', icon: 'protein' },
      { id: 'iron', name: 'Iron-Rich', icon: 'iron' },
      { id: 'calcium', name: 'Calcium-Rich', icon: 'calcium' },
      { id: 'fiber', name: 'Fiber & Gut', icon: 'fiber' },
      { id: 'fats', name: 'Healthy Fats', icon: 'fats' },
      { id: 'hydration', name: 'Hydrating Foods', icon: 'hydration' }
    ];

    container.innerHTML = categories.map(cat => `
      <button class="cat-pill ${this.nutritionFilter === cat.id ? 'active' : ''}" 
              onclick="HealthModule.setNutritionFilter('${cat.id}')">
        <span class="cat-icon-svg" style="display:inline-flex; align-items:center; margin-right:4px;">${this.getNutritionCategoryIcon(cat.id)}</span> ${cat.name}
      </button>
    `).join('');
  },

  setNutritionFilter(catId) {
    this.nutritionFilter = catId;
    this.renderNutritionCategories();
    this.renderFoodList();
  },

  renderFoodList() {
    const container = document.getElementById('nutrition-foods-grid');
    if (!container) return;

    let foods = getHealthState().nutrition?.foods || [];

    // Filter by category
    if (this.nutritionFilter !== 'all') {
      const filter = this.nutritionFilter;
      foods = foods.filter(f => {
        if (f.category === filter) return true;
        const tags = (f.tags || []).map(t => t.toLowerCase());
        const minerals = (f.vitaminsMinerals || []).map(v => v.toLowerCase());
        if (filter === 'iron') {
          return tags.some(t => t.includes('iron')) || minerals.some(m => m.includes('iron'));
        }
        if (filter === 'calcium') {
          return tags.some(t => t.includes('calcium')) || minerals.some(m => m.includes('calcium'));
        }
        if (filter === 'fiber') {
          return (f.fiberG && f.fiberG >= 2.5) || tags.some(t => t.includes('fiber'));
        }
        if (filter === 'fats') {
          return f.category === 'fats' || tags.some(t => t.includes('fat') || t.includes('omega'));
        }
        if (filter === 'hydration') {
          return f.category === 'hydration' || tags.some(t => t.includes('hydrat') || t.includes('water'));
        }
        return false;
      });
    }

    // Filter by search query
    if (this.nutritionSearchQuery) {
      const q = this.nutritionSearchQuery;
      foods = foods.filter(f => {
        const inName = (f.name || '').toLowerCase().includes(q);
        const inCat = (f.category || '').toLowerCase().includes(q);
        const inBenefits = (f.benefits || '').toLowerCase().includes(q);
        const inHighlights = (f.highlights || '').toLowerCase().includes(q);
        const inTip = (f.servingTip || '').toLowerCase().includes(q);
        const inTags = (f.tags || []).some(t => t.toLowerCase().includes(q));
        const inMinerals = (f.vitaminsMinerals || []).some(v => v.toLowerCase().includes(q));
        const inMeals = (f.mealIdeas || []).some(m => m.toLowerCase().includes(q));
        return inName || inCat || inBenefits || inHighlights || inTip || inTags || inMinerals || inMeals;
      });
    }

    if (foods.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--bg-card-subtle); color: var(--text-muted); margin-bottom: 12px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No Foods Found</h4>
          <p style="font-size: 13px; color: var(--text-muted); max-width: 420px; margin: 0 auto 16px;">We couldn't find any foods matching "${this.nutritionSearchQuery || this.nutritionFilter}". Try clearing your filters or searching for something else.</p>
          <button class="btn btn-white btn-sm" onclick="HealthModule.clearNutritionSearch(); HealthModule.setNutritionFilter('all');">Reset All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = foods.map(food => {
      const catIcon = this.getNutritionCategoryIcon(food.category);
      return `
        <div class="food-card">
          ${food.image ? `
            <div class="food-card-thumb-wrap">
              <img src="${food.image}" alt="${food.name}" class="food-card-thumb" loading="lazy" onerror="this.parentElement.style.display='none';">
              <span class="food-card-attribution">${food.attribution || 'Verified Visual'}</span>
            </div>
          ` : ''}
          <div class="food-card-header">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: var(--radius-sm); background: #f0fdf4; border: 1px solid #bbf7d0; color: var(--brand-primary); flex-shrink: 0; margin-top: 1px;">
                ${catIcon}
              </span>
              <div>
                <h3 class="food-name">${food.name}</h3>
                <span style="font-size: 11px; color: var(--text-muted);">${food.servingSize || '1 reference serving'}</span>
              </div>
            </div>
            <span class="food-cat-badge">${food.category}</span>
          </div>

          <!-- Quick Macro Pills Preview -->
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin: 8px 0 10px 0;">
            <span class="badge" style="background: var(--bg-card-subtle); color: var(--text-secondary); font-size: 11px; font-weight: 600;">${food.calories || 0} kcal</span>
            <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 11px; font-weight: 600;">${food.proteinG || 0}g Pro</span>
            <span class="badge" style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 600;">${food.fiberG || 0}g Fiber</span>
            <span class="badge" style="background: #f8fafc; color: var(--text-secondary); font-size: 11px; font-weight: 600;">${food.fatG || 0}g Fat</span>
          </div>

          <div class="food-tag-list">
            ${(food.tags || []).map(t => `<span class="food-tag-pill">${t}</span>`).join('')}
          </div>

          <p class="food-benefit-text"><strong>Why it nourishes:</strong> ${food.benefits}</p>
          <p class="food-nutrients-text"><strong>Key nutrients:</strong> ${food.highlights}</p>

          <div class="food-tip-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; margin-top:2px;"><path d="M9 18h6M10 22h4M12 2v1M12 17a5 5 0 10-5-5c0 1.5.5 2.5 1.5 3.5L9 17h6l.5-.5c1-1 1.5-2 1.5-3.5a5 5 0 00-5-5"/></svg>
            <span>${food.servingTip}</span>
          </div>

          <button class="btn btn-outline btn-xs" style="width: 100%; margin-top: 12px; justify-content: center;" onclick="HealthModule.openFoodModal('${food.id}')">
            View Nutrition Profile & Culinary Uses &rarr;
          </button>
        </div>
      `;
    }).join('');
  },

  openFoodModal(foodId) {
    const food = (getHealthState().nutrition?.foods || []).find(f => f.id === foodId);
    if (!food) return;

    const modal = document.getElementById('food-detail-modal');
    const heroWrap = document.getElementById('food-modal-hero-container');
    const heroImg = document.getElementById('food-modal-hero-img');
    const heroAttr = document.getElementById('food-modal-attribution');
    const iconBox = document.getElementById('food-modal-icon-box');
    const catEl = document.getElementById('food-modal-cat');
    const nameEl = document.getElementById('food-modal-name');
    const servingEl = document.getElementById('food-modal-serving');
    const macrosEl = document.getElementById('food-modal-macros');
    const vitaminsEl = document.getElementById('food-modal-vitamins');
    const benefitsEl = document.getElementById('food-modal-benefits');
    const tipEl = document.getElementById('food-modal-tip');
    const ideasEl = document.getElementById('food-modal-ideas');

    if (heroWrap && heroImg) {
      if (food.image) {
        heroImg.src = food.image;
        heroImg.alt = food.name;
        if (heroAttr) heroAttr.textContent = food.attribution || 'Verified Educational Photography';
        heroWrap.style.display = 'block';
      } else {
        heroWrap.style.display = 'none';
      }
    }

    if (iconBox) iconBox.innerHTML = this.getNutritionCategoryIcon(food.category);
    if (catEl) catEl.textContent = (food.category || 'WHOLE FOOD').toUpperCase();
    if (nameEl) nameEl.textContent = food.name;
    if (servingEl) servingEl.textContent = food.servingSize || '1 standard serving';

    if (macrosEl) {
      macrosEl.innerHTML = `
        <div class="macro-cell">
          <span class="macro-cell-val">${food.calories ?? 0}</span>
          <span class="macro-cell-lbl">Calories</span>
        </div>
        <div class="macro-cell">
          <span class="macro-cell-val">${food.proteinG ?? 0}g</span>
          <span class="macro-cell-lbl">Protein</span>
        </div>
        <div class="macro-cell">
          <span class="macro-cell-val">${food.fiberG ?? 0}g</span>
          <span class="macro-cell-lbl">Fiber</span>
        </div>
        <div class="macro-cell">
          <span class="macro-cell-val">${food.carbsG ?? 0}g</span>
          <span class="macro-cell-lbl">Carbs</span>
        </div>
        <div class="macro-cell">
          <span class="macro-cell-val">${food.fatG ?? 0}g</span>
          <span class="macro-cell-lbl">Healthy Fat</span>
        </div>
      `;
    }

    if (vitaminsEl) {
      const vits = food.vitaminsMinerals || [];
      vitaminsEl.innerHTML = vits.length > 0 
        ? vits.map(v => `<span class="food-tag-pill" style="background:#e0f2fe; color:#0369a1;">${v}</span>`).join('')
        : '<span style="font-size:12px; color:var(--text-muted);">Diverse micronutrient profile</span>';
    }

    if (benefitsEl) benefitsEl.textContent = food.benefits || 'Supports balanced whole-body nourishment.';
    if (tipEl) tipEl.textContent = food.servingTip || 'Incorporate naturally alongside balanced meals.';

    if (ideasEl) {
      const ideas = food.mealIdeas || [];
      ideasEl.innerHTML = ideas.length > 0
        ? ideas.map(idea => `<li style="margin-bottom: 4px;">${idea}</li>`).join('')
        : '<li>Enjoy fresh or lightly prepared alongside whole meals.</li>';
    }

    if (modal) modal.classList.add('open');
  },

  closeFoodModal() {
    const modal = document.getElementById('food-detail-modal');
    if (modal) modal.classList.remove('open');
  },

  setMealTypeFilter(type) {
    this.mealTypeFilter = type;
    const types = ['all', 'breakfast', 'lunch', 'dinner', 'snack', 'quick'];
    types.forEach(t => {
      const pill = document.getElementById(`meal-pill-${t}`);
      if (pill) pill.classList.toggle('active', t === type);
    });
    this.renderMealIdeas();
  },

  renderMealIdeas() {
    const container = document.getElementById('nutrition-meals-grid');
    if (!container) return;

    let meals = getHealthState().nutrition?.meals || [];

    // Filter by type
    if (this.mealTypeFilter !== 'all') {
      meals = meals.filter(m => m.type === this.mealTypeFilter);
    }

    // Filter by search query
    if (this.nutritionSearchQuery) {
      const q = this.nutritionSearchQuery;
      meals = meals.filter(m => {
        const inTitle = (m.title || '').toLowerCase().includes(q);
        const inDesc = (m.description || '').toLowerCase().includes(q);
        const inWhy = (m.whyItWorks || '').toLowerCase().includes(q);
        const inType = (m.type || '').toLowerCase().includes(q);
        const inTags = (m.tags || []).some(t => t.toLowerCase().includes(q));
        const inIng = (m.ingredients || []).some(i => i.toLowerCase().includes(q));
        const inIns = (m.instructions || []).some(ins => ins.toLowerCase().includes(q));
        return inTitle || inDesc || inWhy || inType || inTags || inIng || inIns;
      });
    }

    if (meals.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: var(--bg-card); border: 1px dashed var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--bg-card-subtle); color: var(--text-muted); margin-bottom: 12px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No Meal Ideas Found</h4>
          <p style="font-size: 13px; color: var(--text-muted); max-width: 420px; margin: 0 auto 16px;">No meal blueprints match "${this.nutritionSearchQuery || this.mealTypeFilter}". Try clearing your filter.</p>
          <button class="btn btn-white btn-sm" onclick="HealthModule.clearNutritionSearch(); HealthModule.setMealTypeFilter('all');">Reset Meal Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = meals.map(meal => {
      const instructions = meal.instructions || [];
      return `
        <div class="meal-card">
          ${meal.image ? `
            <div class="meal-card-thumb-wrap">
              <img src="${meal.image}" alt="${meal.title}" class="meal-card-thumb" loading="lazy" onerror="this.parentElement.style.display='none';">
              <span class="food-card-attribution">${meal.attribution || 'Verified Culinary Visual'}</span>
            </div>
          ` : ''}
          <div class="meal-meta-row">
            <span class="meal-type-pill">${meal.type}</span>
            <span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px; margin-right:3px;">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              ${meal.prepTime}
            </span>
            <span class="badge" style="background: var(--bg-card-subtle); color: var(--text-secondary); font-size: 11px;">${meal.calories}</span>
          </div>

          <h3 class="meal-title">${meal.title}</h3>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.5;">${meal.description}</p>

          <div class="food-tag-list" style="margin-bottom: 8px;">
            ${(meal.tags || []).map(t => `<span class="food-tag-pill">${t}</span>`).join('')}
          </div>

          <div class="meal-ingredients-list">
            <strong style="color: var(--text-primary);">Ingredients:</strong>
            <ul>
              ${(meal.ingredients || []).map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>

          ${instructions.length > 0 ? `
            <div style="background: var(--bg-card-subtle); border-radius: var(--radius-md); padding: 10px 14px; font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">
              <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">Preparation Steps:</strong>
              <ol style="padding-left: 18px; margin: 0; line-height: 1.5;">
                ${instructions.map(step => `<li style="margin-bottom: 4px;">${step}</li>`).join('')}
              </ol>
            </div>
          ` : ''}

          <div class="meal-why-highlight">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px; margin-right:4px;">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
            <strong>Why it works:</strong> ${meal.whyItWorks}
          </div>
        </div>
      `;
    }).join('');
  },

  renderBalancedPlate() {
    const container = document.getElementById('plate-pillars-container');
    if (!container) return;

    const bp = getHealthState().nutrition?.balancedPlate;
    if (!bp || !bp.pillars) return;

    const headlineEl = document.getElementById('plate-headline');
    const subtitleEl = document.getElementById('plate-subtitle');
    if (headlineEl && bp.headline) headlineEl.textContent = bp.headline;
    if (subtitleEl && bp.subtitle) subtitleEl.textContent = bp.subtitle;

        const PLATE_IMAGES = {
      "1/2 Plate: Colorful Vegetables & Fruits": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      "1/4 Plate: Quality Clean Protein": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      "1/4 Plate: Complex Carbs & Whole Grains": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
      "1–2 Tbsp: Healthy Essential Fats": "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
      "Intracellular Hydration": "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=600&q=80"
    };

    container.innerHTML = bp.pillars.map(pillar => {
      const imgUrl = PLATE_IMAGES[pillar.name] || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
      return `
        <div class="plate-pillar-card" style="border-left-color: ${pillar.color || 'var(--brand-primary)'};">
          <div class="plate-pillar-thumb-wrap">
            <img src="${imgUrl}" alt="${pillar.name}" class="plate-pillar-thumb" loading="lazy" onerror="this.parentElement.style.display='none';">
            <span class="food-card-attribution">Verified Nutrition Photography</span>
          </div>
          <span class="plate-share-pill" style="background: ${pillar.color || '#10b981'}15; color: ${pillar.color || '#10b981'}; border: 1px solid ${pillar.color || '#10b981'}40;">
            ${pillar.share}
          </span>
          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 8px 0 6px 0;">${pillar.name}</h4>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin: 0;">${pillar.desc}</p>
        </div>
      `;
    }).join('');
  },

  renderWomensHealth() {
    const container = document.getElementById('womens-health-topics-container');
    if (!container) return;

    const wh = getHealthState().nutrition?.womensHealth;
    if (!wh || !wh.topics) return;

        const WH_IMAGES = {
      "iron": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      "calcium": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
      "cycle": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
      "hydration": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
    };

    const getTopicIcon = (iconName) => {
      const icons = {
        iron: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/></svg>`,
        calcium: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2h8l2 20H6L8 2z"/></svg>`,
        cycle: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18 4.5 4.5 0 0 1 0-9 4.5 4.5 0 0 0 0-9z"/></svg>`,
        hydration: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`
      };
      return icons[iconName] || `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>`;
    };

    container.innerHTML = wh.topics.map(topic => {
      const imgUrl = WH_IMAGES[topic.icon] || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80';
      return `
        <div class="wh-topic-card">
          <div class="wh-topic-thumb-wrap">
            <img src="${imgUrl}" alt="${topic.title}" class="wh-topic-thumb" loading="lazy" onerror="this.parentElement.style.display='none';">
            <span class="food-card-attribution">Verified Educational Visual</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: var(--radius-sm); background: #fef2f2; color: #e11d48; border: 1px solid #fecaca; flex-shrink: 0;">
              ${getTopicIcon(topic.icon)}
            </span>
            <h4 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 0;">${topic.title}</h4>
          </div>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">${topic.summary}</p>
          <div style="background: var(--bg-card-subtle); border-radius: var(--radius-md); padding: 12px 14px;">
            <strong style="font-size: 11.5px; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 6px;">Key Actionable Takeaways</strong>
            <ul style="font-size: 12.5px; color: var(--text-secondary); padding-left: 18px; margin: 0; line-height: 1.6;">
              ${(topic.keyPoints || []).map(kp => `<li style="margin-bottom: 4px;">${kp}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }).join('');
  },

  /* =============================================================
     4. HYDRATION MODULE
     ============================================================= */
  addWater(amount, source = 'Quick Add') {
    const state = getHealthState();
    state.water.current += amount;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    state.water.logs.unshift({
      id: Date.now(),
      time: timeStr,
      amount: amount,
      source: source
    });

    saveAppState(state);
    this.renderHydration();
    this.renderDashboard();
    window.app.playTone(784, 0.08);
    window.app.showToast(`+${amount} mL logged (${source})`, 'toast-cyan');

    if (window.LifeHavenAPI) {
      window.LifeHavenAPI.addHydration(amount, source).then(res => {
        if (res && res.success) console.log('[LifeHaven Backend] Hydration synced:', res.data);
      });
    }
  },

  addCustomWater() {
    const customInput = document.getElementById('water-custom-amount');
    const amount = parseInt(customInput?.value, 10);
    if (amount && amount > 0) {
      this.addWater(amount, 'Custom Intake');
      if (customInput) customInput.value = '';
    } else {
      window.app.showToast('Please enter a valid amount in mL', 'toast-coral');
    }
  },

  resetWater() {
    if (confirm('Reset today\'s hydration log to 0 mL?')) {
      const state = getHealthState();
      state.water.current = 0;
      state.water.logs = [];
      saveAppState(state);
      this.renderHydration();
      this.renderDashboard();
      window.app.showToast('Hydration reset to 0 mL', 'toast-coral');

      if (window.LifeHavenAPI) {
        window.LifeHavenAPI.resetHydration().then(res => {
          if (res && res.success) console.log('[LifeHaven Backend] Hydration reset synced');
        });
      }
    }
  },

  renderHydration() {
    const { current, target, logs } = getHealthState().water;
    const pct = Math.min(100, Math.round((current / target) * 100));

    const fillEl = document.getElementById('hydration-liquid-fill');
    if (fillEl) fillEl.style.height = `${pct}%`;

    const pctBadge = document.getElementById('hydration-pct-display');
    if (pctBadge) pctBadge.textContent = `${pct}%`;

    const currentText = document.getElementById('hydration-current-display');
    if (currentText) currentText.innerHTML = `${current.toLocaleString()} <span class="unit">/ ${target.toLocaleString()} mL</span>`;

    const remainingText = document.getElementById('hydration-remaining-display');
    if (remainingText) {
      const remaining = Math.max(0, target - current);
      remainingText.textContent = remaining > 0 ? `${remaining.toLocaleString()} mL remaining to daily goal` : 'Goal achieved!';
    }

    const timelineEl = document.getElementById('hydration-timeline-list');
    if (timelineEl) {
      if (logs.length === 0) {
        timelineEl.innerHTML = '<div style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 12px;">No water recorded today. Tap a button above to log!</div>';
      } else {
        timelineEl.innerHTML = logs.map(entry => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--bg-card-subtle); border-radius: var(--radius-md); font-size: 12.5px;">
            <div>
              <strong>${entry.source}</strong>
              <div style="font-size: 11px; color: var(--text-muted);">${entry.time}</div>
            </div>
            <strong style="color: var(--brand-primary);">+${entry.amount} mL</strong>
          </div>
        `).join('');
      }
    }
  },

  /* =============================================================
     5. SLEEP & CIRCADIAN MODULE
     ============================================================= */
  renderSleep() {
    const sleep = getHealthState().sleep;
    const last = sleep.lastNight;

    const durEl = document.getElementById('sleep-duration-val');
    const scoreEl = document.getElementById('sleep-score-val');
    const qualityBadge = document.getElementById('sleep-quality-badge');
    const timesEl = document.getElementById('sleep-times-val');

    if (durEl) durEl.innerHTML = `${last.durationHours} <span class="unit">hrs</span>`;
    if (scoreEl) scoreEl.textContent = `${last.score}/100`;
    if (qualityBadge) qualityBadge.textContent = last.quality;
    if (timesEl) timesEl.textContent = `${last.bedTime} &rarr; ${last.wakeTime}`;

    const historyContainer = document.getElementById('sleep-history-rows');
    if (historyContainer) {
      historyContainer.innerHTML = sleep.history.map(item => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: var(--bg-card-subtle); border-radius: var(--radius-md); font-size: 13px;">
          <strong>${item.date}</strong>
          <span>${item.duration} hrs</span>
          <span class="sidebar-badge">${item.quality}</span>
          <span style="font-weight: 700; color: var(--brand-primary);">${item.score}</span>
        </div>
      `).join('');
    }

    const tipsContainer = document.getElementById('sleep-tips-grid');
    if (tipsContainer) {
      tipsContainer.innerHTML = sleep.tips.map(tip => `
        <div class="sleep-tip-card-clean">
          <h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px; margin-right:6px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>${tip.title}</h4>
          <p>${tip.text}</p>
        </div>
      `).join('');
    }
  },

  logSleep() {
    const hoursInput = document.getElementById('sleep-log-hours');
    const qualitySelect = document.getElementById('sleep-log-quality');
    const hours = parseFloat(hoursInput?.value);
    const quality = qualitySelect?.value || 'Good';

    if (hours && hours > 0 && hours <= 24) {
      const state = getHealthState();
      const score = Math.min(100, Math.round((hours / 8) * 85) + (quality === 'Restful' || quality === 'Deep' ? 12 : 5));
      state.sleep.lastNight.durationHours = hours;
      state.sleep.lastNight.quality = quality;
      state.sleep.lastNight.score = score;

      state.sleep.history.unshift({
        date: 'Today',
        duration: hours,
        quality: quality,
        score: score
      });

      saveAppState(state);
      this.renderSleep();
      this.renderDashboard();
      window.app.showToast(`Logged ${hours} hrs sleep (${quality})!`, 'toast-emerald');

      if (window.LifeHavenAPI) {
        window.LifeHavenAPI.logSleep(hours, quality).then(res => {
          if (res && res.success) console.log('[LifeHaven Backend] Sleep record synced:', res.data);
        });
      }
    }
  },

  /* =============================================================
     6. MOOD & MENTAL WELLNESS MODULE
     ============================================================= */
  renderMoodWellness() {
    const mw = getHealthState().moodWellness;

    const moodBtns = document.querySelectorAll('.mood-pill-btn');
    moodBtns.forEach(btn => {
      if (btn.dataset.mood === mw.currentMood) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    const energySlider = document.getElementById('mood-energy-slider');
    const energyVal = document.getElementById('mood-energy-val');
    if (energySlider) energySlider.value = mw.energyLevel;
    if (energyVal) energyVal.textContent = `${mw.energyLevel}/10`;

    const stressSelect = document.getElementById('mood-stress-select');
    if (stressSelect) stressSelect.value = mw.stressLevel;

    const suggContainer = document.getElementById('mood-suggestions-grid');
    if (suggContainer) {
      suggContainer.innerHTML = mw.suggestions.map(s => `
        <div class="sleep-tip-card-clean">
          <strong style="color: var(--brand-primary);"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px; margin-right:5px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>${s.title}</strong>
          <p style="font-size: 12px; margin-top: 2px;">${s.text}</p>
        </div>
      `).join('');
    }
  },

  selectMood(mood) {
    getHealthState().moodWellness.currentMood = mood;
    this.renderMoodWellness();
  },

  saveMoodEntry() {
    const state = getHealthState();
    const mw = state.moodWellness;
    const energy = parseInt(document.getElementById('mood-energy-slider')?.value, 10) || 7;
    const stress = document.getElementById('mood-stress-select')?.value || 'Low';
    const note = document.getElementById('mood-notes-input')?.value || '';

    mw.energyLevel = energy;
    mw.stressLevel = stress;

    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;

    mw.recentLogs.unshift({
      id: Date.now(),
      date: timeStr,
      mood: mw.currentMood,
      energy: energy,
      stress: stress,
      note: note
    });

    saveAppState(state);
    this.renderMoodWellness();
    this.renderDashboard();
    window.app.showToast('Reflection logged!', 'toast-emerald');

    if (window.LifeHavenAPI) {
      window.LifeHavenAPI.logMood(mw.currentMood, energy, stress, note).then(res => {
        if (res && res.success) console.log('[LifeHaven Backend] Mood reflection synced:', res.data);
      });
    }
  },

  /* Guided Breathing Logic */
  startBreathingExercise(type = 'box-breathing') {
    if (this.breathingInterval) {
      clearInterval(this.breathingInterval);
      this.breathingInterval = null;
    }

    const modal = document.getElementById('breathing-modal');
    if (modal) modal.classList.add('open');

    const exercise = getHealthState().moodWellness.breathingExercises.find(e => e.id === type) || 
                     getHealthState().moodWellness.breathingExercises[0];

    const titleEl = document.getElementById('breathing-modal-title');
    const descEl = document.getElementById('breathing-modal-desc');
    if (titleEl) titleEl.textContent = exercise.name;
    if (descEl) descEl.textContent = exercise.purpose;

    const ring = document.getElementById('breathing-visual-ring');
    const statusText = document.getElementById('breathing-status-text');
    const countdownEl = document.getElementById('breathing-countdown');
    const cycleCountEl = document.getElementById('breathing-cycle-counter');

    let currentStep = 0;
    let stepTimer = exercise.inhale;
    let totalCompletedCycles = 0;

    const updatePhase = () => {
      if (currentStep === 0) {
        if (statusText) statusText.textContent = 'Inhale slowly through the nose...';
        if (ring) {
          ring.className = 'breathing-ring-clean expand';
          ring.style.transitionDuration = `${exercise.inhale}s`;
        }
        window.app.playTone(440, 0.2);
        stepTimer = exercise.inhale;
      } else if (currentStep === 1) {
        if (statusText) statusText.textContent = 'Hold breath gently...';
        if (ring) ring.className = 'breathing-ring-clean hold';
        stepTimer = exercise.hold1;
      } else if (currentStep === 2) {
        if (statusText) statusText.textContent = 'Exhale softly through the mouth...';
        if (ring) {
          ring.className = 'breathing-ring-clean contract';
          ring.style.transitionDuration = `${exercise.exhale}s`;
        }
        window.app.playTone(330, 0.2);
        stepTimer = exercise.exhale;
      } else if (currentStep === 3) {
        if (statusText) statusText.textContent = 'Rest and pause...';
        if (ring) ring.className = 'breathing-ring-clean pause';
        stepTimer = exercise.hold2;
      }

      if (countdownEl) countdownEl.textContent = `${stepTimer}s`;
    };

    updatePhase();

    this.breathingInterval = setInterval(() => {
      stepTimer--;
      if (countdownEl) countdownEl.textContent = `${stepTimer}s`;

      if (stepTimer <= 0) {
        currentStep++;
        if (currentStep > 3 || (currentStep === 3 && exercise.hold2 === 0)) {
          currentStep = 0;
          totalCompletedCycles++;
          if (cycleCountEl) cycleCountEl.textContent = `Completed Cycles: ${totalCompletedCycles}`;
        }
        updatePhase();
      }
    }, 1000);
  },

  closeBreathingModal() {
    if (this.breathingInterval) {
      clearInterval(this.breathingInterval);
      this.breathingInterval = null;
    }
    const modal = document.getElementById('breathing-modal');
    if (modal) modal.classList.remove('open');
  },

  /* =============================================================
     7. HEALTH EDUCATION MODULE
     ============================================================= */
  renderEducation() {
    const container = document.getElementById('education-articles-grid');
    if (!container) return;

    let articles = getHealthState().education;
    if (this.educationCategory !== 'all') {
      articles = articles.filter(a => a.category === this.educationCategory);
    }

    container.innerHTML = articles.map(art => `
      <div class="edu-article-card">
        <div class="edu-meta-row">
          <span class="edu-tag-pill">${art.badge}</span>
          <span style="font-size: 11.5px; color: var(--text-muted);">${art.readTime}</span>
        </div>
        <h3 class="edu-card-title">${art.title}</h3>
        <p class="edu-card-desc">${art.summary}</p>
        <button class="btn btn-outline btn-sm" style="margin-top: auto;" onclick="HealthModule.openArticleModal('${art.id}')">
          Read Guide &rarr;
        </button>
      </div>
    `).join('');
  },

  setEducationCategory(cat) {
    this.educationCategory = cat;
    this.renderEducation();
  },

  openArticleModal(articleId) {
    const art = getHealthState().education.find(a => a.id === articleId);
    if (!art) return;

    const modal = document.getElementById('article-detail-modal');
    const titleEl = document.getElementById('article-modal-title');
    const badgeEl = document.getElementById('article-modal-badge');
    const bodyEl = document.getElementById('article-modal-body');

    if (titleEl) titleEl.textContent = art.title;
    if (badgeEl) badgeEl.textContent = art.badge;
    if (bodyEl) bodyEl.innerHTML = art.content;

    if (modal) modal.classList.add('open');
  },

  closeArticleModal() {
    const modal = document.getElementById('article-detail-modal');
    if (modal) modal.classList.remove('open');
  },

  /* =============================================================
     8. PROGRESS & HABITS MODULE
     ============================================================= */
  renderProgress() {
    this.renderHabits();
    this.renderProgressCharts();
    if (window.WorkoutModule && typeof window.WorkoutModule.renderWorkoutHistory === 'function') {
      window.WorkoutModule.renderWorkoutHistory();
    }
  },

  renderHabits() {
    const habits = getHealthState().habits;
    const container = document.getElementById('progress-habits-list');
    const countBadge = document.getElementById('habits-done-count');
    if (!container) return;

    const completed = habits.filter(h => h.completed).length;
    if (countBadge) countBadge.textContent = `${completed} / ${habits.length} Done`;

    container.innerHTML = habits.map(h => `
      <div class="habit-row-clean ${h.completed ? 'done' : ''}" onclick="HealthModule.toggleHabit(${h.id})">
        <div class="hrc-check">
          ${h.completed ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
        <div>
          <strong style="color: var(--text-primary); font-size: 13.5px;">${h.text}</strong>
          <div style="font-size: 11.5px; color: var(--text-muted);">${h.category}</div>
        </div>
      </div>
    `).join('');
  },

  toggleHabit(id) {
    const state = getHealthState();
    const habit = state.habits.find(h => h.id === id);
    if (habit) {
      habit.completed = !habit.completed;
      saveAppState(state);
      this.renderHabits();
      this.renderDashboard();
      window.app.playTone(habit.completed ? 880 : 330, 0.1);

      if (window.LifeHavenAPI) {
        window.LifeHavenAPI.toggleHabit(id).then(res => {
          if (res && res.success) console.log('[LifeHaven Backend] Habit toggle synced:', res.data);
        });
      }
    }
  },

  renderProgressCharts() {
    const metrics = getHealthState().progress.metrics;
    const chartContainer = document.getElementById('progress-chart-bars');
    if (!chartContainer) return;

    chartContainer.innerHTML = metrics.map(m => {
      const waterHeight = Math.min(100, Math.round((m.water / 3000) * 100));
      return `
        <div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content: flex-end;">
          <div style="width: 22px; height: ${waterHeight}%; background: var(--brand-primary); border-radius: var(--radius-xs) var(--radius-xs) 0 0;" title="${m.day}: ${m.water} mL"></div>
          <span style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">${m.day.split(' ')[0]}</span>
        </div>
      `;
    }).join('');
  }
};
