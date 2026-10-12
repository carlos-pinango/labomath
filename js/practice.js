/* ============================================
   LABOMATH – Practice / Quiz Engine
   ============================================ */

const Practice = {
  state: {
    questions: [],
    current: 0,
    score: 0,
    answered: false,
    hintVisible: false,
    topic: 'all'
  },

  /** Build a filtered question list */
  buildQuestions(level, topic) {
    const data = CURRICULUM[`s${level}`];
    if (!data) return [];
    let qs = [...data.questions];
    if (topic && topic !== 'all') {
      qs = qs.filter(q => q.topic === topic);
    }
    // Shuffle
    return qs.sort(() => Math.random() - 0.5);
  },

  /** Render the full practice section */
  render(container, level, lang, topic = 'all') {
    this.state.questions = this.buildQuestions(level, topic);
    this.state.current = 0;
    this.state.score = 0;
    this.state.answered = false;
    this.state.hintVisible = false;
    this.state.topic = topic;
    this.state.level = level;
    this.state.lang = lang;
    this.state.container = container;

    this._renderQuestion(container, lang);
  },

  _renderQuestion(container, lang) {
    const t = T[lang];
    const { questions, current, score } = this.state;

    if (questions.length === 0) {
      container.innerHTML = `<div class="info-box">${lang === 'fr' ? 'Aucune question disponible pour ce filtre.' : 'No questions available for this filter.'}</div>`;
      return;
    }

    if (current >= questions.length) {
      this._renderScore(container, lang);
      return;
    }

    const q = questions[current];
    const total = questions.length;
    const pct = Math.round((current / total) * 100);
    const topicInfo = t.topics[q.topic] || {};
    const topicBadgeClass = `badge-${q.topic}`;

    const questionHTML = q.type === 'mc' ? this._renderMC(q, lang) : this._renderFill(q, lang);

    container.innerHTML = `
      <div class="progress-bar-wrap">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="progress-label">${t.questionOf(current + 1, total)}</span>
      </div>

      <div class="question-card">
        <span class="question-topic-badge ${topicBadgeClass}">${topicInfo.title || q.topic}</span>
        <div class="question-text">${q.q[lang]}</div>
        ${q.formula ? `<code class="question-formula">${q.formula}</code>` : ''}
        ${questionHTML}
        <div id="feedbackArea"></div>
        <div class="hint-box" id="hintBox">
          💡 ${q.hint[lang]}
        </div>
      </div>

      <div class="practice-actions">
        <button class="hint-toggle-btn" id="hintBtn">${t.showHint}</button>
        <button class="next-btn hidden" id="nextBtn">${t.nextQuestion}</button>
      </div>`;

    // Hint toggle
    document.getElementById('hintBtn').addEventListener('click', () => {
      const box = document.getElementById('hintBox');
      const btn = document.getElementById('hintBtn');
      const visible = box.classList.toggle('visible');
      btn.textContent = visible ? t.hideHint : t.showHint;
    });

    // Next button
    document.getElementById('nextBtn').addEventListener('click', () => {
      this.state.current++;
      this.state.answered = false;
      this.state.hintVisible = false;
      this._renderQuestion(container, lang);
    });

    // Wire up answer logic
    if (q.type === 'mc') {
      this._wireMC(q, lang, container);
    } else {
      this._wireFill(q, lang, container);
    }
  },

  _renderMC(q, lang) {
    const opts = q.opts[lang];
    return `
      <div class="options-grid">
        ${opts.map((opt, i) => `
          <button class="option-btn" data-idx="${i}">${opt}</button>
        `).join('')}
      </div>`;
  },

  _wireMC(q, lang, container) {
    const t = T[lang];
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.state.answered) return;
        this.state.answered = true;

        const chosen = parseInt(btn.dataset.idx);
        const correct = chosen === q.correct;
        if (correct) this.state.score++;

        // Highlight buttons
        container.querySelectorAll('.option-btn').forEach((b, i) => {
          b.disabled = true;
          if (i === q.correct) b.classList.add('correct');
          else if (i === chosen && !correct) b.classList.add('incorrect');
        });

        this._showFeedback(q, lang, correct, q.opts[lang][q.correct]);
        document.getElementById('nextBtn').classList.remove('hidden');
        document.getElementById('hintBtn').classList.add('hidden');
      });
    });
  },

  _renderFill(q, lang) {
    const t = T[lang];
    return `
      <div class="fill-in-wrap">
        <input type="text" class="fill-in-input" id="fillInput" placeholder="${lang === 'fr' ? 'Ta réponse…' : 'Your answer…'}" autocomplete="off">
        <button class="check-btn" id="checkBtn">${t.checkAnswer}</button>
      </div>`;
  },

  _wireFill(q, lang, container) {
    const t = T[lang];
    const input = document.getElementById('fillInput');
    const checkBtn = document.getElementById('checkBtn');

    const check = () => {
      if (this.state.answered) return;
      const val = input.value.trim().toLowerCase().replace(/\s+/g, '');
      if (!val) return;
      this.state.answered = true;

      const accepted = q.answer.map(a => a.toLowerCase().replace(/\s+/g, ''));
      const correct = accepted.includes(val);
      if (correct) this.state.score++;

      input.classList.add(correct ? 'correct' : 'incorrect');
      input.disabled = true;
      checkBtn.disabled = true;

      this._showFeedback(q, lang, correct, q.answer[0]);
      document.getElementById('nextBtn').classList.remove('hidden');
      document.getElementById('hintBtn').classList.add('hidden');
    };

    checkBtn.addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    input.focus();
  },

  _showFeedback(q, lang, correct, correctAnswer) {
    const t = T[lang];
    const msg = correct
      ? t.encourageCorrect[Math.floor(Math.random() * t.encourageCorrect.length)]
      : `${t.correctAnswer} <strong>${correctAnswer}</strong>`;

    document.getElementById('feedbackArea').innerHTML = `
      <div class="feedback-box ${correct ? 'correct' : 'incorrect'}">
        <div class="feedback-status">${correct ? t.correct : t.incorrect}</div>
        <div class="feedback-detail">
          ${correct ? msg : msg}
          <br><span style="color:var(--gray);font-size:13px;">${t.explanation} ${q.explain[lang]}</span>
        </div>
      </div>`;
  },

  _renderScore(container, lang) {
    const t = T[lang];
    const { score, questions } = this.state;
    const total = questions.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;

    let emoji = '🌱';
    if (pct === 100) emoji = '🏆';
    else if (pct >= 80) emoji = '🌟';
    else if (pct >= 60) emoji = '💪';
    else if (pct >= 40) emoji = '📚';

    container.innerHTML = `
      <div class="score-card">
        <div class="score-emoji">${emoji}</div>
        <div class="score-title">${t.quizComplete}</div>
        <div class="score-number">${score} <span style="font-size:1.5rem;color:var(--gray);font-weight:700;">${t.scoreLabel} ${total}</span></div>
        <div class="score-message">${t.scoreMsg(score, total)}</div>
        <div class="score-actions">
          <button class="score-retry-btn" id="retryBtn">${t.tryAgain}</button>
        </div>
      </div>`;

    document.getElementById('retryBtn').addEventListener('click', () => {
      this.render(container, this.state.level, lang, this.state.topic);
    });
  }
};
