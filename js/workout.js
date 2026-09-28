/**
 * LIFEHAVEN — BALANCED MOVEMENT STUDIO MODULE
 * 
 * Comprehensive Workout Library & Exercise Form Tutorials
 * Connects with Python API, state persistence, live search, multi-filters,
 * interactive routine player, and progress tracking.
 */

const getWorkoutState = () => {
  if (window.app && window.app.state) return window.app.state;
  if (window.appState) return window.appState;
  return loadAppState();
};

const WorkoutModule = {
  activeLevel: 'all',     // 'all', 'Beginner', 'Intermediate', 'Advanced'
  activeFocus: 'all',     // 'all', 'Full Body', 'Strength', 'Cardio', 'Core', 'Upper Body', 'Lower Body', 'Mobility', 'Flexibility'
  searchQuery: '',
  activeRoutine: null,
  activeExercise: null,
  timerInterval: null,
  timerSeconds: 0,
  isPaused: false,

  /* =============================================================
     1. INITIALIZATION & RENDERING
     ============================================================= */
  renderWorkouts() {
    this.renderLevelButtons();
    this.renderFocusPills();
    this.renderRoutineCards();
    this.renderWorkoutHistory();
  },

  renderLevelButtons() {
    const bar = document.getElementById('workout-level-bar');
    if (!bar) return;
    const buttons = bar.querySelectorAll('.subnav-tab-btn');
    buttons.forEach(btn => {
      const text = btn.textContent.toLowerCase();
      if ((this.activeLevel === 'all' && text.includes('all')) ||
          text.includes(this.activeLevel.toLowerCase())) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  },

  renderFocusPills() {
    const bar = document.getElementById('workout-focus-bar');
    if (!bar) return;
    const pills = bar.querySelectorAll('.cat-pill');
    pills.forEach(pill => {
      const text = pill.textContent.trim().toLowerCase();
      const current = this.activeFocus.toLowerCase();
      if ((this.activeFocus === 'all' && text.includes('all')) ||
          text === current) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  },

  setLevel(level) {
    this.activeLevel = level;
    this.renderLevelButtons();
    this.renderRoutineCards();
    window.app?.playTone(520, 0.05);
  },

  setFocus(focus) {
    this.activeFocus = focus;
    this.renderFocusPills();
    this.renderRoutineCards();
    window.app?.playTone(540, 0.05);
  },

  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    const clearBtn = document.getElementById('workout-search-clear');
    if (clearBtn) {
      clearBtn.style.display = this.searchQuery ? 'inline-block' : 'none';
    }
    this.renderRoutineCards();
  },

  clearSearch() {
    this.searchQuery = '';
    const input = document.getElementById('workout-search-input');
    const clearBtn = document.getElementById('workout-search-clear');
    if (input) input.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    this.renderRoutineCards();
  },

  /* =============================================================
     2. ROUTINE CARDS GRID
     ============================================================= */
  renderRoutineCards() {
    const container = document.getElementById('workout-cards-grid');
    if (!container) return;

    let list = getWorkoutState().workouts || [];

    // Filter by Level
    if (this.activeLevel !== 'all') {
      list = list.filter(w => (w.level || '').toLowerCase() === this.activeLevel.toLowerCase());
    }

    // Filter by Focus Area
    if (this.activeFocus !== 'all') {
      const focClean = this.activeFocus.toLowerCase().replace(/\s+/g, '');
      list = list.filter(w => {
        const wFoc = (w.focus || '').toLowerCase().replace(/\s+/g, '');
        const wCat = (w.category || '').toLowerCase().replace(/\s+/g, '');
        return wFoc === focClean || wCat === focClean || (w.targetArea || '').toLowerCase().includes(this.activeFocus.toLowerCase());
      });
    }

    // Filter by Search Query
    if (this.searchQuery) {
      const q = this.searchQuery;
      list = list.filter(w => {
        const inTitle = (w.title || '').toLowerCase().includes(q);
        const inDesc = (w.description || '').toLowerCase().includes(q);
        const inTarget = (w.targetArea || '').toLowerCase().includes(q);
        const inEquip = (w.equipment || '').toLowerCase().includes(q);
        const inFocus = (w.focus || '').toLowerCase().includes(q);
        const inExercises = (w.exercises || []).some(e => 
          (e.name || '').toLowerCase().includes(q) || (e.targetArea || '').toLowerCase().includes(q)
        );
        return inTitle || inDesc || inTarget || inEquip || inFocus || inExercises;
      });
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; padding: 40px 20px; text-align: center; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">No matching workouts found</div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Try adjusting your search terms, level selection, or focus area filters.</p>
          <button class="btn btn-outline btn-sm" onclick="WorkoutModule.resetAllFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(w => {
      const exCount = (w.exercises || []).length || (w.instructions || []).length || 4;
      const levelClass = w.level === 'Beginner' ? 'badge-beg' : (w.level === 'Advanced' ? 'badge-adv' : 'badge-int');
      const calBadge = w.caloriesEst ? `<span title="Approximate estimation">~${w.caloriesEst} kcal</span>` : '';

      return `
        <div class="workout-item-card">
          ${w.image ? `
            <div class="workout-card-thumb-wrap">
              <img src="${w.image}" alt="${w.title}" class="workout-card-thumb" loading="lazy" onerror="this.parentElement.style.display='none';">
              <span class="workout-card-badge-overlay">${w.level || w.difficulty}</span>
            </div>
          ` : ''}
          <div class="workout-badges-row">
            <span class="workout-type-text">${w.focus || w.type || 'Movement'}</span>
            <div style="display: flex; gap: 4px;">
              <span class="workout-diff-badge" style="font-weight: 700;">${w.level || w.difficulty}</span>
            </div>
          </div>
          <h3 class="workout-card-title">${w.title}</h3>
          <p class="workout-card-desc">${w.description}</p>
          
          <div class="workout-specs-box">
            <div class="spec-cell">
              <span class="spec-label">Duration</span>
              <span class="spec-val"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px; margin-right:3px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${w.durationMinutes} mins</span>
            </div>
            <div class="spec-cell">
              <span class="spec-label">Target Area</span>
              <span class="spec-val" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${w.targetArea}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px; margin-right:3px;"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>${w.targetArea}</span>
            </div>
            <div class="spec-cell">
              <span class="spec-label">Approx Energy</span>
              <span class="spec-val" style="color: var(--brand-primary);">${calBadge || 'Low Impact'}</span>
            </div>
          </div>

          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
            <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px; margin-right:4px;"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>${exCount} Exercises & Form Guides</span>
            <span style="font-size: 11px;">Warm-up & Cool-down</span>
          </div>

          <div style="display: flex; gap: 8px; margin-top: auto;">
            <button class="btn btn-white btn-sm" style="flex: 1;" onclick="WorkoutModule.openWorkoutDetail('${w.id}')">
              <span>View Details & Form</span>
            </button>
            <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="WorkoutModule.startWorkoutSession('${w.id}')">
              <span>Start Routine</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  resetAllFilters() {
    this.activeLevel = 'all';
    this.activeFocus = 'all';
    this.clearSearch();
    this.renderLevelButtons();
    this.renderFocusPills();
  },

  /* =============================================================
     3. WORKOUT DETAIL MODAL
     ============================================================= */
  openWorkoutDetail(routineId) {
    const routine = (getWorkoutState().workouts || []).find(w => w.id === routineId);
    if (!routine) return;

    this.activeRoutine = routine;

    const modal = document.getElementById('workout-detail-modal');
    const titleEl = document.getElementById('wd-title');
    const descEl = document.getElementById('wd-desc');
    const typeEl = document.getElementById('wd-type');
    const diffEl = document.getElementById('wd-diff');
    const specsEl = document.getElementById('wd-specs-box');
    const warmupEl = document.getElementById('wd-warmup');
    const cooldownEl = document.getElementById('wd-cooldown');
    const exListEl = document.getElementById('wd-exercises-list');

    if (titleEl) titleEl.textContent = routine.title;
    if (descEl) descEl.textContent = routine.description;
    if (typeEl) typeEl.textContent = `${routine.focus || routine.type} • ${routine.intensity || 'Moderate'}`;
    if (diffEl) diffEl.textContent = `${routine.level || routine.difficulty}`;
    if (warmupEl) warmupEl.textContent = routine.warmup || '5 minutes dynamic shoulder circles, hip hinges, and light marching in place.';
    if (cooldownEl) cooldownEl.textContent = routine.cooldown || '5 minutes gentle seated hamstring reach, child’s pose, and diaphragmatic breathing.';

    if (specsEl) {
      specsEl.innerHTML = `
        <div class="spec-cell">
          <span class="spec-label">Duration</span>
          <span class="spec-val">${routine.durationMinutes} mins</span>
        </div>
        <div class="spec-cell">
          <span class="spec-label">Target Area</span>
          <span class="spec-val">${routine.targetArea}</span>
        </div>
        <div class="spec-cell">
          <span class="spec-label">Equipment</span>
          <span class="spec-val">${routine.equipment}</span>
        </div>
        <div class="spec-cell">
          <span class="spec-label">Est. Calories (Approx)</span>
          <span class="spec-val" style="color: var(--brand-primary);">${routine.caloriesEst ? '~' + routine.caloriesEst + ' kcal' : 'Low impact'}</span>
        </div>
      `;
    }

    if (exListEl) {
      const exercises = routine.exercises || [];
      if (exercises.length > 0) {
        exListEl.innerHTML = exercises.map((ex, idx) => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                ${ex.image ? `<img src="${ex.image}" alt="${ex.name}" class="exercise-row-thumb" loading="lazy" onerror="this.style.display='none';">` : ''}
                <span style="width: 24px; height: 24px; border-radius: 50%; background: var(--brand-primary-light); color: var(--brand-primary); font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${idx + 1}</span>
                <div>
                  <strong style="font-size: 14.5px; color: var(--text-primary); display: block;">${ex.name}</strong>
                  <span style="font-size: 11.5px; color: var(--text-muted);">${ex.targetArea}</span>
                </div>
              </div>
              <div style="display: flex; gap: 6px; font-size: 12px;">
                <span class="food-cat-badge" style="background: var(--bg-card-subtle);">${ex.sets} Sets</span>
                <span class="food-cat-badge" style="background: var(--bg-card-subtle);">${ex.reps}</span>
                <span class="food-cat-badge" style="background: var(--bg-card-subtle);">${ex.rest}</span>
              </div>
            </div>
            
            <p style="font-size: 12.5px; color: var(--text-secondary); margin: 0; line-height: 1.5;">${ex.instructions ? ex.instructions[0] : 'Follow controlled tempo and form.'}</p>
            
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 8px; margin-top: 2px;">
              <span style="font-size: 11.5px; color: var(--text-muted);">Target: ${ex.targetArea}</span>
              <button class="btn btn-subtle btn-xs" style="padding: 2px 6px;" onclick="WorkoutModule.openExerciseTutorial('${ex.id}', '${routine.id}')">
                View Form Tutorial & Common Mistakes &rarr;
              </button>
            </div>
          </div>
        `).join('');
      } else {
        // Fallback for string instructions
        exListEl.innerHTML = (routine.instructions || []).map((inst, idx) => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; font-size: 13px;">
            <strong>${idx + 1}.</strong> ${inst}
          </div>
        `).join('');
      }
    }

    if (modal) modal.classList.add('open');
    window.app?.playTone(580, 0.06);
  },

  closeWorkoutDetail() {
    const modal = document.getElementById('workout-detail-modal');
    if (modal) modal.classList.remove('open');
  },

  startFromDetail() {
    this.closeWorkoutDetail();
    if (this.activeRoutine) {
      this.startWorkoutSession(this.activeRoutine.id);
    }
  },

  /* =============================================================
     4. EXERCISE FORM TUTORIAL MODAL
     ============================================================= */
  openExerciseTutorial(exerciseId, routineId) {
    let exercise = null;
    const routine = (getWorkoutState().workouts || []).find(w => w.id === routineId) || this.activeRoutine;
    if (routine && routine.exercises) {
      exercise = routine.exercises.find(e => e.id === exerciseId);
    }

    // Global fallback
    if (!exercise) {
      for (const w of (getWorkoutState().workouts || [])) {
        if (w.exercises) {
          const found = w.exercises.find(e => e.id === exerciseId);
          if (found) { exercise = found; break; }
        }
      }
    }

    if (!exercise) return;
    this.activeExercise = exercise;

    const modal = document.getElementById('exercise-tutorial-modal');
    const stagesEl = document.getElementById('ex-modal-stages');
    const titleEl = document.getElementById('ex-modal-title');
    const targetEl = document.getElementById('ex-modal-target');
    const setsRepsEl = document.getElementById('ex-modal-sets-reps');
    const restEl = document.getElementById('ex-modal-rest');
    const equipEl = document.getElementById('ex-modal-equip');
    const visualBox = document.getElementById('ex-modal-visual');
    const stepsEl = document.getElementById('ex-modal-steps');
    const formEl = document.getElementById('ex-modal-form');
    const mistakesEl = document.getElementById('ex-modal-mistakes');
    const modEl = document.getElementById('ex-modal-mod');
    const progEl = document.getElementById('ex-modal-prog');

    if (titleEl) titleEl.textContent = exercise.name;
    if (targetEl) targetEl.textContent = `${exercise.targetArea} • ${exercise.difficulty || 'All Levels'}`;
    if (setsRepsEl) setsRepsEl.textContent = `${exercise.sets || 3} Sets × ${exercise.reps || '10-12 reps'}`;
    if (restEl) restEl.textContent = exercise.rest || '45 sec rest';
    if (equipEl) equipEl.textContent = exercise.equipment || 'Bodyweight';
    if (formEl) formEl.textContent = exercise.properForm || 'Maintain neutral spine, grounded feet, and smooth breathing.';
    if (modEl) modEl.textContent = exercise.modification || 'Perform with seated chair support or shortened range of motion.';
    if (progEl) progEl.textContent = exercise.progression || 'Add a 2-second isometric pause at peak contraction or hold light weights.';

    // Multi-stage movement visual demonstration tutorial (Stages 1 and 2)
    if (stagesEl) {
      if (exercise.stageStartImg || exercise.stageEndImg || exercise.image) {
        const startImg = exercise.stageStartImg || exercise.image;
        const endImg = exercise.stageEndImg || exercise.image;
        const startText = exercise.stageStart || 'Establish firm foundation, neutral spine, and engaged core.';
        const endText = exercise.stageEnd || 'Execute full contraction with smooth eccentric control and steady exhalation.';
        stagesEl.innerHTML = `
          <div class="tutorial-stage-card">
            <div class="tutorial-stage-img-wrap">
              <img src="${startImg}" alt="${exercise.name} - Setup Stance" class="tutorial-stage-img" loading="lazy" onerror="this.parentElement.parentElement.style.display='none';">
              <span class="food-card-attribution">${exercise.attribution || 'Verified Movement Visual'}</span>
            </div>
            <div class="tutorial-stage-caption">
              <div>
                <strong style="display:block; font-size:12px; color:var(--text-primary); margin-bottom:2px;">Stage 1: Setup & Starting Stance</strong>
                <span style="font-size:11.5px; color:var(--text-secondary); font-weight:normal; line-height:1.4;">${startText}</span>
              </div>
            </div>
          </div>
          <div class="tutorial-stage-card">
            <div class="tutorial-stage-img-wrap">
              <img src="${endImg}" alt="${exercise.name} - Execution" class="tutorial-stage-img" loading="lazy" onerror="this.parentElement.parentElement.style.display='none';">
              <span class="food-card-attribution">${exercise.attribution || 'Verified Movement Visual'}</span>
            </div>
            <div class="tutorial-stage-caption">
              <div>
                <strong style="display:block; font-size:12px; color:var(--text-primary); margin-bottom:2px;">Stage 2: Execution & Peak Contraction</strong>
                <span style="font-size:11.5px; color:var(--text-secondary); font-weight:normal; line-height:1.4;">${endText}</span>
              </div>
            </div>
          </div>
        `;
        stagesEl.style.display = 'grid';
      } else {
        stagesEl.style.display = 'none';
      }
    }

    // Visual demonstration diagram (clean SVG anatomical posture diagram)
    if (visualBox) {
      visualBox.innerHTML = this.getExerciseVisualSVG(exercise.visualKey || 'squat', exercise.name, exercise.targetArea);
    }

    // Numbered step-by-step instructions
    if (stepsEl) {
      const steps = exercise.instructions || [
        'Set up with feet balanced and spine neutral.',
        'Brace core and lower with controlled tempo.',
        'Push through base to return to starting position with full breath.'
      ];
      stepsEl.innerHTML = steps.map((st, i) => `
        <div class="tutorial-step-row">
          <span class="tutorial-step-num">${i + 1}</span>
          <span style="line-height: 1.5; color: var(--text-primary);">${st}</span>
        </div>
      `).join('');
    }

    // Common mistakes
    if (mistakesEl) {
      const mistakes = exercise.commonMistakes || [
        'Rushing through reps without muscle control',
        'Rounding lower back or letting shoulders collapse',
        'Holding breath during exertion'
      ];
      mistakesEl.innerHTML = mistakes.map(m => `<li style="margin-bottom: 4px;">${m}</li>`).join('');
    }

    if (modal) modal.classList.add('open');
    window.app?.playTone(620, 0.06);
  },

  closeExerciseTutorial() {
    const modal = document.getElementById('exercise-tutorial-modal');
    if (modal) modal.classList.remove('open');
  },

  /* Clean vector biomechanical demonstration diagram */
  getExerciseVisualSVG(key, name, target) {
    const diagrams = {
      squat: `
        <svg width="240" height="130" viewBox="0 0 240 130" fill="none" style="max-width: 100%;">
          <rect width="240" height="130" rx="8" fill="#f1f5f9" />
          <!-- Floor line -->
          <line x1="30" y1="110" x2="210" y2="110" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4" />
          <text x="120" y="24" fill="#0d9488" font-size="11" font-weight="700" text-anchor="middle" font-family="Inter, sans-serif">SQUAT BIOMECHANICS & ALIGNMENT</text>
          <!-- Figure Start (Stand) -->
          <g transform="translate(60, 35)">
            <circle cx="15" cy="10" r="7" fill="#0d9488" />
            <line x1="15" y1="17" x2="15" y2="48" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <line x1="15" y1="48" x2="10" y2="75" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <line x1="15" y1="48" x2="20" y2="75" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <text x="15" y="88" fill="#64748b" font-size="9" text-anchor="middle">1. Stand Tall</text>
          </g>
          <!-- Arrow -->
          <path d="M105 65 L130 65" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" marker-end="url(#arrow)" />
          <!-- Figure Bottom (Parallel Squat) -->
          <g transform="translate(145, 45)">
            <circle cx="15" cy="5" r="7" fill="#0284c7" />
            <!-- Torso hinged slightly -->
            <line x1="15" y1="12" x2="24" y2="34" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
            <!-- Thigh parallel to floor -->
            <line x1="24" y1="34" x2="6" y2="36" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
            <!-- Shin vertical over ankle -->
            <line x1="6" y1="36" x2="8" y2="65" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
            <!-- Alignment guideline -->
            <line x1="6" y1="36" x2="40" y2="36" stroke="#e11d48" stroke-width="1.5" stroke-dasharray="2 2" />
            <text x="20" y="78" fill="#64748b" font-size="9" text-anchor="middle">2. Parallel Thighs</text>
          </g>
        </svg>
      `,
      pushup: `
        <svg width="240" height="130" viewBox="0 0 240 130" fill="none" style="max-width: 100%;">
          <rect width="240" height="130" rx="8" fill="#f1f5f9" />
          <line x1="25" y1="110" x2="215" y2="110" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4" />
          <text x="120" y="24" fill="#0d9488" font-size="11" font-weight="700" text-anchor="middle" font-family="Inter, sans-serif">PLANK & PUSH-UP VECTOR</text>
          <!-- Straight line guideline -->
          <line x1="45" y1="95" x2="195" y2="60" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" />
          <!-- High Plank Figure -->
          <g transform="translate(40, 48)">
            <circle cx="155" cy="10" r="7" fill="#0d9488" />
            <!-- Torso -->
            <line x1="150" y1="15" x2="70" y2="40" stroke="#0d9488" stroke-width="3.5" stroke-linecap="round" />
            <!-- Arms supporting floor -->
            <line x1="140" y1="20" x2="140" y2="62" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <!-- Legs to toes -->
            <line x1="70" y1="40" x2="10" y2="62" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <text x="85" y="75" fill="#64748b" font-size="9" text-anchor="middle">Head-to-Heel Rigid Core Axis</text>
          </g>
        </svg>
      `,
      bridge: `
        <svg width="240" height="130" viewBox="0 0 240 130" fill="none" style="max-width: 100%;">
          <rect width="240" height="130" rx="8" fill="#f1f5f9" />
          <line x1="25" y1="110" x2="215" y2="110" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4" />
          <text x="120" y="24" fill="#0d9488" font-size="11" font-weight="700" text-anchor="middle" font-family="Inter, sans-serif">POSTERIOR CHAIN GLUTE EXTENSION</text>
          <!-- Diagonal guideline -->
          <line x1="50" y1="95" x2="155" y2="55" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="3 3" />
          <g transform="translate(35, 45)">
            <circle cx="15" cy="50" r="7" fill="#0d9488" />
            <!-- Torso bridged up -->
            <line x1="20" y1="52" x2="110" y2="20" stroke="#0d9488" stroke-width="3.5" stroke-linecap="round" />
            <!-- Thigh to knee -->
            <line x1="110" y1="20" x2="135" y2="20" stroke="#0284c7" stroke-width="4" stroke-linecap="round" />
            <!-- Shin to heel -->
            <line x1="135" y1="20" x2="135" y2="65" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <text x="95" y="78" fill="#64748b" font-size="9" text-anchor="middle">Squeeze glutes at peak • Heels firmly planted</text>
          </g>
        </svg>
      `,
      deadlift: `
        <svg width="240" height="130" viewBox="0 0 240 130" fill="none" style="max-width: 100%;">
          <rect width="240" height="130" rx="8" fill="#f1f5f9" />
          <line x1="25" y1="110" x2="215" y2="110" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4" />
          <text x="120" y="24" fill="#0d9488" font-size="11" font-weight="700" text-anchor="middle" font-family="Inter, sans-serif">ROMANIAN DEADLIFT HIP HINGE</text>
          <g transform="translate(60, 35)">
            <!-- Flat back line -->
            <line x1="10" y1="28" x2="70" y2="28" stroke="#10b981" stroke-width="2" stroke-dasharray="3 3" />
            <circle cx="10" cy="20" r="7" fill="#0d9488" />
            <!-- Torso horizontal -->
            <line x1="15" y1="25" x2="65" y2="28" stroke="#0d9488" stroke-width="3.5" stroke-linecap="round" />
            <!-- Arms hanging vertical with dumbbells -->
            <line x1="25" y1="26" x2="25" y2="60" stroke="#e11d48" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="25" cy="62" r="4" fill="#e11d48" />
            <!-- Legs hinged back -->
            <line x1="65" y1="28" x2="55" y2="75" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <!-- Hip back arrow -->
            <path d="M68 28 L95 28" stroke="#0284c7" stroke-width="2" marker-end="url(#arrow)" />
            <text x="60" y="90" fill="#64748b" font-size="9" text-anchor="middle">Hips drive backwards • Flat tabletop spine</text>
          </g>
        </svg>
      `,
      bird_dog: `
        <svg width="240" height="130" viewBox="0 0 240 130" fill="none" style="max-width: 100%;">
          <rect width="240" height="130" rx="8" fill="#f1f5f9" />
          <line x1="25" y1="110" x2="215" y2="110" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4" />
          <text x="120" y="24" fill="#0d9488" font-size="11" font-weight="700" text-anchor="middle" font-family="Inter, sans-serif">BIRD DOG STABILITY AXIS</text>
          <!-- Horizontal extension axis -->
          <line x1="30" y1="52" x2="210" y2="52" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" />
          <g transform="translate(30, 42)">
            <!-- Reaching arm -->
            <line x1="170" y1="10" x2="130" y2="10" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <circle cx="125" cy="5" r="6" fill="#0d9488" />
            <!-- Torso -->
            <line x1="125" y1="10" x2="70" y2="10" stroke="#0d9488" stroke-width="3.5" stroke-linecap="round" />
            <!-- Base supporting limbs -->
            <line x1="115" y1="10" x2="115" y2="68" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
            <line x1="75" y1="10" x2="75" y2="68" stroke="#64748b" stroke-width="3" stroke-linecap="round" />
            <!-- Extending back leg -->
            <line x1="70" y1="10" x2="10" y2="10" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
            <text x="90" y="82" fill="#64748b" font-size="9" text-anchor="middle">Arm and opposite leg parallel to floor • Square hips</text>
          </g>
        </svg>
      `
    };

    return diagrams[key] || `
      <svg width="240" height="130" viewBox="0 0 240 130" fill="none" style="max-width: 100%;">
        <rect width="240" height="130" rx="8" fill="#f1f5f9" />
        <line x1="25" y1="110" x2="215" y2="110" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4 4" />
        <text x="120" y="24" fill="#0d9488" font-size="11" font-weight="700" text-anchor="middle" font-family="Inter, sans-serif">${(name || 'EXERCISE FORM GUIDE').toUpperCase()}</text>
        <g transform="translate(100, 35)">
          <circle cx="20" cy="12" r="8" fill="#0d9488" />
          <line x1="20" y1="20" x2="20" y2="55" stroke="#0d9488" stroke-width="3.5" stroke-linecap="round" />
          <line x1="20" y1="30" x2="38" y2="45" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
          <line x1="20" y1="30" x2="2" y2="45" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
          <line x1="20" y1="55" x2="32" y2="75" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
          <line x1="20" y1="55" x2="8" y2="75" stroke="#0d9488" stroke-width="3" stroke-linecap="round" />
        </g>
        <text x="120" y="122" fill="#64748b" font-size="9" text-anchor="middle">${target || 'Biomechanics alignment & controlled tempo'}</text>
      </svg>
    `;
  },

  /* =============================================================
     5. INTERACTIVE SESSION PLAYER & COMPLETION
     ============================================================= */
  startWorkoutSession(routineId) {
    const routine = (getWorkoutState().workouts || []).find(w => w.id === routineId);
    if (!routine) return;

    this.activeRoutine = routine;
    this.timerSeconds = 0;
    this.isPaused = false;

    const modal = document.getElementById('workout-session-modal');
    const titleEl = document.getElementById('session-modal-title');
    const targetEl = document.getElementById('session-modal-target');
    const listEl = document.getElementById('session-exercise-list');

    if (titleEl) titleEl.textContent = routine.title;
    if (targetEl) targetEl.textContent = `${routine.level || routine.difficulty} • ${routine.targetArea} • ~${routine.durationMinutes} mins`;

    if (listEl) {
      const items = routine.exercises && routine.exercises.length > 0 
        ? routine.exercises.map(e => `${e.name} — ${e.sets} sets × ${e.reps}`)
        : (routine.instructions || []);

      listEl.innerHTML = items.map((inst, idx) => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-card-subtle); border-radius: var(--radius-md); font-size: 13px;" id="session-step-${idx}">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 700; color: var(--brand-primary);">${idx + 1}.</span>
            <span style="color: var(--text-primary);">${inst}</span>
          </div>
          <button class="btn btn-white btn-xs" onclick="WorkoutModule.toggleStepDone(this, ${idx})">Done</button>
        </div>
      `).join('');
    }

    if (modal) modal.classList.add('open');

    if (this.timerInterval) clearInterval(this.timerInterval);
    const timerDisplay = document.getElementById('session-timer-display');

    this.timerInterval = setInterval(() => {
      if (!this.isPaused) {
        this.timerSeconds++;
        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        if (timerDisplay) {
          timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
      }
    }, 1000);

    window.app?.playTone(600, 0.15);
    window.app?.showToast(`Started: ${routine.title}`, 'toast-emerald');
  },

  toggleStepDone(btn, idx) {
    const parent = document.getElementById(`session-step-${idx}`);
    if (!parent) return;
    const isDone = parent.style.opacity === '0.45';
    parent.style.opacity = isDone ? '1' : '0.45';
    parent.style.textDecoration = isDone ? 'none' : 'line-through';
    btn.textContent = isDone ? 'Done' : '✓ Done';
    btn.classList.toggle('btn-primary', !isDone);
    window.app?.playTone(isDone ? 440 : 880, 0.08);
  },

  togglePauseTimer() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('session-pause-btn');
    if (pauseBtn) {
      pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
    }
  },

  completeWorkoutSession() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    const state = getWorkoutState();
    const mins = Math.ceil(this.timerSeconds / 60) || (this.activeRoutine ? this.activeRoutine.durationMinutes : 20);
    const routineTitle = this.activeRoutine ? this.activeRoutine.title : 'Movement Session';
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
                    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    // 1. Add to local workoutHistory
    if (!state.workoutHistory) state.workoutHistory = [];
    state.workoutHistory.unshift({
      id: 'wh-' + Date.now(),
      routineId: this.activeRoutine ? this.activeRoutine.id : 'w-custom',
      title: routineTitle,
      durationMinutes: mins,
      completedAt: timeStr,
      targetArea: this.activeRoutine ? this.activeRoutine.targetArea : 'Full Body'
    });

    // 2. Mark Habit 4 (Gentle Movement) done
    if (state.habits) {
      const moveHabit = state.habits.find(h => h.id === 4);
      if (moveHabit) moveHabit.completed = true;
    }

    saveAppState(state);

    const modal = document.getElementById('workout-session-modal');
    if (modal) modal.classList.remove('open');

    // 3. Audio & Toast Feedback
    window.app?.playVictoryTone();
    window.app?.showToast(`Completed ${routineTitle} (${mins} mins)!`, 'toast-emerald');

    // 4. Update UI displays
    this.renderWorkoutHistory();
    if (window.HealthModule) {
      HealthModule.renderProgress();
      HealthModule.renderDashboard();
    }

    // 5. Sync to Python backend API
    if (window.LifeHavenAPI && this.activeRoutine) {
      window.LifeHavenAPI.completeWorkout(this.activeRoutine.id, mins).then(res => {
        if (res && res.success) {
          console.log('[LifeHaven Backend] Workout completion synced:', res.data);
        }
      });
    }
  },

  closeWorkoutModal() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    const modal = document.getElementById('workout-session-modal');
    if (modal) modal.classList.remove('open');
  },

  /* =============================================================
     6. WORKOUT HISTORY RENDERING
     ============================================================= */
  renderWorkoutHistory() {
    const state = getWorkoutState();
    const history = state.workoutHistory || [];
    const container = document.getElementById('workout-history-list');
    const badge = document.getElementById('workout-history-badge');
    const progContainer = document.getElementById('progress-workout-history-list');
    const progBadge = document.getElementById('progress-workout-count-badge');

    if (badge) badge.textContent = `${history.length} Completed`;
    if (progBadge) progBadge.textContent = `${history.length} Routines Logged`;

    const htmlContent = history.length === 0
      ? '<div style="font-size: 13px; color: var(--text-muted); padding: 12px 0;">No completed workouts logged yet. Start a routine to track your history!</div>'
      : history.slice(0, 10).map(item => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-card-subtle); border-radius: var(--radius-md); font-size: 13px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="color: #10b981; font-weight: 700;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <div>
                <strong style="color: var(--text-primary); font-size: 13.5px;">${item.title}</strong>
                <div style="font-size: 11.5px; color: var(--text-muted);">${item.targetArea || 'Full Body'} • Completed ${item.completedAt}</div>
              </div>
            </div>
            <span class="sidebar-badge" style="background:#fff; border-color:var(--border-subtle);">${item.durationMinutes} mins</span>
          </div>
        `).join('');

    if (container) container.innerHTML = htmlContent;
    if (progContainer) progContainer.innerHTML = htmlContent;
  }
};

window.WorkoutModule = WorkoutModule;
