/* ============================================
   LABOMATH – App Controller (SPA Router)
   ============================================ */

const App = {
  state: {
    lang: localStorage.getItem('labomath-lang') || 'fr',
    view: 'home',       // 'home' | 'level' | 'coming-soon'
    level: null,        // 1–5
    section: 'explore', // 'explore' | 'practice'
    activeTopic: null,  // topic id
  },

  init() {
    this.appEl     = document.getElementById('app');
    this.backBtn   = document.getElementById('backBtn');
    this.langBtn   = document.getElementById('langBtn');
    this.langLabel = document.getElementById('langLabel');
    this.logoBtn   = document.getElementById('logoBtn');
    this.footer    = document.querySelector('.app-footer span');

    // Language toggle
    this.langBtn.addEventListener('click', () => {
      this.state.lang = this.state.lang === 'fr' ? 'en' : 'fr';
      localStorage.setItem('labomath-lang', this.state.lang);
      this.updateLangUI();
      this.render();
    });

    // Back button
    this.backBtn.addEventListener('click', () => {
      if (this.state.view === 'level' || this.state.view === 'coming-soon') {
        this.navigate('home');
      }
    });

    // Logo → home
    this.logoBtn.addEventListener('click', () => this.navigate('home'));
    this.logoBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') this.navigate('home');
    });

    this.updateLangUI();
    this.render();
  },

  updateLangUI() {
    const { lang } = this.state;
    this.langLabel.textContent = lang === 'fr' ? 'EN' : 'FR';
    document.documentElement.lang = lang;
    if (this.footer) this.footer.textContent = T[lang].footerText;
  },

  navigate(view, params = {}) {
    this.state.view         = view;
    this.state.level        = params.level  || null;
    this.state.section      = params.section || 'explore';
    this.state.activeTopic  = null;
    this.state.filterTopic  = 'all';
    this.backBtn.classList.toggle('hidden', view === 'home');
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  render() {
    const { view } = this.state;
    this.appEl.innerHTML = '';
    if (view === 'home')         this.renderHome();
    else if (view === 'level')   this.renderLevel();
    else if (view === 'coming-soon') this.renderComingSoon();
  },

  /* ══════════════════════════════════════════
     HOME VIEW
  ══════════════════════════════════════════ */
  renderHome() {
    const { lang } = this.state;
    const t = T[lang];

    const levelsHTML = [1, 2, 3, 4, 5].map(n => {
      const locked = n >= 3;
      const gradClass = `lv${n}`;
      const curriculum = CURRICULUM[`s${n}`];
      return `
        <button class="level-card ${gradClass} ${locked ? 'locked' : ''}"
          data-level="${n}"
          aria-label="${t.levelNames[n]}"
          ${locked ? 'disabled' : ''}>
          ${locked ? `<span class="lock-badge">${t.comingSoon}</span>` : ''}
          <div class="level-card-num">${t.levelLabel} ${n}</div>
          <div class="level-card-title">${t.levelNames[n]}</div>
          <div class="level-card-sub">${t.levelSubtitles[n]}</div>
          ${!locked ? `<div class="level-card-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>` : ''}
        </button>`;
    }).join('');

    this.appEl.innerHTML = `
      <div class="home-view view">
        <div class="home-hero">
          <h1>${lang === 'fr'
            ? 'Bienvenue au <span>Labo Math</span> !'
            : 'Welcome to <span>Math Lab</span>!'}</h1>
          <p>${t.chooseSubtitle}</p>
        </div>
        <div class="levels-grid">${levelsHTML}</div>
      </div>`;

    this.appEl.querySelectorAll('.level-card:not(.locked)').forEach(card => {
      card.addEventListener('click', () => {
        const level = parseInt(card.dataset.level);
        this.navigate('level', { level });
      });
    });
  },

  /* ══════════════════════════════════════════
     LEVEL VIEW
  ══════════════════════════════════════════ */
  renderLevel() {
    const { lang, level, section } = this.state;
    const t = T[lang];
    const curriculum = CURRICULUM[`s${level}`];

    if (!curriculum || curriculum.comingSoon) {
      this.navigate('coming-soon', { level });
      return;
    }

    const gradClass = `lv${level}`;
    const deco = t.levelDecorations[level];

    const topicsHTML = curriculum.topics.map(topicId => {
      const info  = t.topics[topicId] || {};
      const icon  = t.topicIcons[topicId] || '📌';
      const isActive = this.state.activeTopic === topicId && section === 'explore';
      return `
        <div class="topic-card ${isActive ? 'active' : ''}" data-topic="${topicId}" id="card-${topicId}">
          <div class="topic-icon t-${topicId}">${icon}</div>
          <h3>${info.title || topicId}</h3>
          <p>${info.desc || ''}</p>
          <button class="topic-action-btn btn-${topicId}" data-topic="${topicId}" data-action="explore">
            🔭 ${t.exploreBtn}
          </button>
        </div>`;
    }).join('');

    this.appEl.innerHTML = `
      <div class="level-view view">
        <div class="level-hero ${gradClass}" data-decoration="${deco}">
          <div class="level-hero-label">${t.levelLabel} ${level}</div>
          <h2>${t.levelNames[level]}</h2>
          <p>${t.levelSubtitles[level]}</p>
        </div>

        <div class="section-tabs">
          <button class="tab-btn ${section === 'explore' ? 'active' : ''}" data-section="explore">
            <span class="tab-icon">🔭</span> ${t.explore}
          </button>
          <button class="tab-btn ${section === 'practice' ? 'active' : ''}" data-section="practice">
            <span class="tab-icon">✏️</span> ${t.practice}
          </button>
        </div>

        ${section === 'explore' ? `
          <div class="topics-grid" id="topicsGrid">
            ${topicsHTML}
          </div>
          <div id="explorePanelWrap"></div>
        ` : `
          <div class="practice-view" id="practiceArea">
            ${this._renderTopicFilter(curriculum.topics, lang)}
            <div id="practiceContent"></div>
          </div>
        `}
      </div>`;

    // Tabs
    this.appEl.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.section = btn.dataset.section;
        this.state.activeTopic = null;
        this.renderLevel();
      });
    });

    if (section === 'explore') {
      this._wireExplore(lang, level, curriculum.topics);
      // Re-open active topic if set
      if (this.state.activeTopic) {
        this._openExploreTopic(this.state.activeTopic, lang);
      }
    } else {
      this._wirePractice(lang, level, curriculum.topics);
    }
  },

  _renderTopicFilter(topics, lang) {
    const t = T[lang];
    const { activeTopic } = this.state;
    const filterTopic = this.state.filterTopic || 'all';

    return `
      <div class="practice-header">
        <div class="topic-selector" id="topicFilter">
          <button class="topic-pill ${filterTopic === 'all' ? 'active' : ''}" data-filter="all">${t.allTopics}</button>
          ${topics.map(tid => `
            <button class="topic-pill ${filterTopic === tid ? 'active' : ''}" data-filter="${tid}">
              ${t.topicIcons[tid] || ''} ${(t.topics[tid] || {}).title || tid}
            </button>`).join('')}
        </div>
      </div>`;
  },

  _wireExplore(lang, level, topics) {
    this.appEl.querySelectorAll('[data-action="explore"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const topicId = btn.dataset.topic;
        if (this.state.activeTopic === topicId) {
          this.state.activeTopic = null;
          this._closeExplorePanel();
        } else {
          this.state.activeTopic = topicId;
          this._openExploreTopic(topicId, lang);
        }
      });
    });
  },

  _openExploreTopic(topicId, lang) {
    const t = T[lang];
    const info = t.topics[topicId] || {};
    const icon = t.topicIcons[topicId] || '📌';

    // Update card active state
    this.appEl.querySelectorAll('.topic-card').forEach(c => {
      c.classList.toggle('active', c.dataset.topic === topicId);
    });

    const wrap = document.getElementById('explorePanelWrap');
    wrap.innerHTML = `
      <div class="explore-panel" id="explorePanel">
        <div class="explore-panel-header">
          <h3>${icon} ${info.title || topicId}</h3>
          <button class="close-explore" id="closeExploreBtn" aria-label="Fermer">✕</button>
        </div>
        <div id="vizRoot"></div>
      </div>`;

    document.getElementById('closeExploreBtn').addEventListener('click', () => {
      this.state.activeTopic = null;
      this._closeExplorePanel();
    });

    const vizRoot = document.getElementById('vizRoot');
    if (EXPLORE[topicId]) {
      EXPLORE[topicId](vizRoot, lang);
    } else {
      vizRoot.innerHTML = `<div class="info-box">${lang === 'fr' ? 'Visualisation en cours de développement.' : 'Visualization coming soon.'}</div>`;
    }

    // Scroll to panel
    setTimeout(() => {
      const panel = document.getElementById('explorePanel');
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  },

  _closeExplorePanel() {
    const wrap = document.getElementById('explorePanelWrap');
    if (wrap) wrap.innerHTML = '';
    this.appEl.querySelectorAll('.topic-card').forEach(c => c.classList.remove('active'));
  },

  _wirePractice(lang, level, topics) {
    this.state.filterTopic = this.state.filterTopic || 'all';

    const practiceContent = document.getElementById('practiceContent');

    // Filter buttons
    document.getElementById('topicFilter').addEventListener('click', e => {
      const btn = e.target.closest('.topic-pill');
      if (!btn) return;
      this.state.filterTopic = btn.dataset.filter;
      document.querySelectorAll('.topic-pill').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === this.state.filterTopic));
      Practice.render(practiceContent, level, lang, this.state.filterTopic);
    });

    Practice.render(practiceContent, level, lang, this.state.filterTopic || 'all');
  },

  /* ══════════════════════════════════════════
     COMING SOON VIEW
  ══════════════════════════════════════════ */
  renderComingSoon() {
    const { lang, level } = this.state;
    const t = T[lang];
    const gradClass = `lv${level}`;

    this.appEl.innerHTML = `
      <div class="coming-soon-view view">
        <div class="coming-soon-icon">${t.levelDecorations[level]}</div>
        <h2>${t.levelNames[level]}</h2>
        <div class="coming-soon-badge" style="margin-bottom:16px;">${t.comingSoon}</div>
        <p>${t.comingSoonMsg}</p>
        <p style="font-size:0.9rem;">${t.comingSoonSub}</p>
      </div>`;
  }
};

// Canvas roundRect polyfill (for older browsers)
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (typeof r === 'undefined') r = 0;
    if (typeof r === 'object') r = r[0] || 0;
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    return this;
  };
}

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
