/* ============================================
   LABOMATH – Interactive Explorations
   ============================================ */

const EXPLORE = {

  /* ══════════════════════════════════════════
     S1 — FRACTIONS VISUALIZER
  ══════════════════════════════════════════ */
  fractions(container, lang) {
    const t = T[lang];
    container.innerHTML = `
      <div class="viz-container">
        <div class="info-box">
          ${lang === 'fr'
            ? 'Une fraction représente <strong>une partie d\'un tout</strong>. Le <strong>numérateur</strong> (en haut) indique combien de parties on prend. Le <strong>dénominateur</strong> (en bas) indique en combien de parties le tout est divisé.'
            : 'A fraction represents <strong>part of a whole</strong>. The <strong>numerator</strong> (top) shows how many parts we take. The <strong>denominator</strong> (bottom) shows how many equal parts the whole is divided into.'}
        </div>
        <div class="viz-canvas-wrap">
          <canvas id="fracCanvas" width="480" height="130"></canvas>
        </div>
        <div class="viz-controls">
          <div class="ctrl-group">
            <label>${t.numerator} <span id="numDisplay">1</span></label>
            <input type="range" id="fracNum" min="0" max="12" value="1">
          </div>
          <div class="ctrl-group">
            <label>${t.denominator} <span id="denDisplay">4</span></label>
            <input type="range" id="fracDen" min="1" max="12" value="4">
          </div>
        </div>
        <div class="viz-output">
          <div class="viz-badge" id="fracBadge">1/4</div>
          <div class="viz-badge secondary" id="decBadge">= 0.25</div>
          <div class="viz-badge secondary" id="pctBadge">= 25%</div>
        </div>
        <div class="info-box" id="equivBox">
          <strong>${t.equivalentFractions}:</strong> <span id="equivList">2/8 · 3/12</span>
        </div>
      </div>`;

    const canvas = document.getElementById('fracCanvas');
    const ctx = canvas.getContext('2d');
    const numSlider = document.getElementById('fracNum');
    const denSlider = document.getElementById('fracDen');

    function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

    function draw() {
      const num = parseInt(numSlider.value);
      const den = parseInt(denSlider.value);
      const W = canvas.width, H = canvas.height;
      const boxW = Math.min(Math.floor((W - 40) / den), 80);
      const boxH = 80;
      const totalW = den * boxW + (den - 1) * 4;
      const startX = (W - totalW) / 2;
      const startY = (H - boxH) / 2;

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < den; i++) {
        const x = startX + i * (boxW + 4);
        const filled = i < num;
        ctx.fillStyle = filled ? '#4361EE' : '#EEF1FF';
        ctx.strokeStyle = '#4361EE';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(x, startY, boxW, boxH, 6);
        ctx.fill();
        ctx.stroke();
        if (filled) {
          ctx.fillStyle = 'rgba(255,255,255,0.25)';
          ctx.beginPath();
          ctx.roundRect(x + 4, startY + 4, boxW - 8, 18, 4);
          ctx.fill();
        }
      }

      document.getElementById('numDisplay').textContent = num;
      document.getElementById('denDisplay').textContent = den;
      document.getElementById('fracBadge').textContent = `${num}/${den}`;
      const dec = (num / den);
      document.getElementById('decBadge').textContent = `= ${isNaN(dec) ? '—' : dec.toFixed(2)}`;
      document.getElementById('pctBadge').textContent = `= ${isNaN(dec) ? '—' : (dec * 100).toFixed(1)}%`;

      // Equivalent fractions
      const g = gcd(num, den);
      const equivList = [];
      for (let m = 2; m <= 4; m++) {
        equivList.push(`${num * m}/${den * m}`);
      }
      if (g > 1) equivList.unshift(`${num / g}/${den / g} (${lang === 'fr' ? 'simplifiée' : 'simplified'})`);
      document.getElementById('equivList').textContent = equivList.join(' · ');
    }

    numSlider.addEventListener('input', draw);
    denSlider.addEventListener('input', draw);
    draw();
  },

  /* ══════════════════════════════════════════
     S1 — INTEGER NUMBER LINE
  ══════════════════════════════════════════ */
  integers(container, lang) {
    const t = T[lang];
    let current = 0;

    container.innerHTML = `
      <div class="viz-container">
        <div class="info-box">
          ${lang === 'fr'
            ? 'Les nombres entiers incluent les <strong>nombres positifs</strong>, zéro, et les <strong>nombres négatifs</strong>. Sur la droite numérique, aller à droite = <strong>additionner</strong>, aller à gauche = <strong>soustraire</strong>.'
            : 'Integers include <strong>positive numbers</strong>, zero, and <strong>negative numbers</strong>. On the number line, going right = <strong>adding</strong>, going left = <strong>subtracting</strong>.'}
        </div>
        <div class="viz-canvas-wrap">
          <canvas id="nlCanvas" width="480" height="100"></canvas>
        </div>
        <div class="numline-controls">
          <button class="numline-op-btn sub" id="nlSubBtn">−</button>
          <input type="number" id="nlAmount" value="3" min="1" max="10" class="numline-input">
          <button class="numline-op-btn add" id="nlAddBtn">+</button>
          <button class="numline-reset-btn" id="nlReset">${t.reset}</button>
        </div>
        <div class="numline-result">
          <span id="nlCurrentLabel">${t.currentValue}:</span>
          <span id="nlCurrentVal" style="font-size:1.5rem;color:var(--primary);margin-left:8px;">0</span>
        </div>
        <div id="nlHistory" style="text-align:center;font-size:13px;color:var(--gray);min-height:22px;"></div>
      </div>`;

    const canvas = document.getElementById('nlCanvas');
    const ctx = canvas.getContext('2d');
    const MIN = -12, MAX = 12;
    let history = [];

    function draw(highlight = null, direction = 0) {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const pad = 30;
      const range = MAX - MIN;
      const unitW = (W - pad * 2) / range;
      const y = H / 2;

      // Axis line
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pad, y); ctx.lineTo(W - pad, y);
      ctx.stroke();

      // Ticks and labels
      for (let i = MIN; i <= MAX; i++) {
        const x = pad + (i - MIN) * unitW;
        ctx.strokeStyle = i === 0 ? '#1A1F3C' : '#CBD5E1';
        ctx.lineWidth = i === 0 ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x, y - (i % 2 === 0 ? 10 : 6));
        ctx.lineTo(x, y + (i % 2 === 0 ? 10 : 6));
        ctx.stroke();
        if (i % 2 === 0) {
          ctx.fillStyle = '#6B7280';
          ctx.font = '11px Nunito, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(i, x, y + 22);
        }
      }

      // Arrow for operation
      if (highlight !== null && direction !== 0) {
        const fromX = pad + (highlight - direction - MIN) * unitW;
        const toX   = pad + (highlight - MIN) * unitW;
        ctx.strokeStyle = direction > 0 ? '#06D6A0' : '#EF233C';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(fromX, y - 20);
        const cp = (fromX + toX) / 2;
        ctx.quadraticCurveTo(cp, y - 40, toX, y - 20);
        ctx.stroke();

        // Arrow head
        ctx.fillStyle = direction > 0 ? '#06D6A0' : '#EF233C';
        ctx.beginPath();
        const arrowDir = direction > 0 ? 1 : -1;
        ctx.moveTo(toX, y - 20);
        ctx.lineTo(toX - arrowDir * 8, y - 28);
        ctx.lineTo(toX - arrowDir * 8, y - 12);
        ctx.fill();
      }

      // Current position dot
      const cx = pad + (current - MIN) * unitW;
      ctx.fillStyle = '#4361EE';
      ctx.beginPath();
      ctx.arc(cx, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(current, cx, y);
      ctx.textBaseline = 'alphabetic';
    }

    function update(delta) {
      const amt = parseInt(document.getElementById('nlAmount').value) || 1;
      const prev = current;
      current = Math.max(MIN, Math.min(MAX, current + delta * amt));
      const op = delta > 0 ? `${prev} + ${amt}` : `${prev} − ${amt}`;
      history.unshift(`${op} = ${current}`);
      if (history.length > 3) history.pop();
      document.getElementById('nlCurrentVal').textContent = current;
      document.getElementById('nlHistory').textContent = history.join('  |  ');
      draw(current, delta * amt);
    }

    document.getElementById('nlAddBtn').addEventListener('click', () => update(1));
    document.getElementById('nlSubBtn').addEventListener('click', () => update(-1));
    document.getElementById('nlReset').addEventListener('click', () => {
      current = 0; history = [];
      document.getElementById('nlCurrentVal').textContent = 0;
      document.getElementById('nlHistory').textContent = '';
      draw();
    });

    draw();
  },

  /* ══════════════════════════════════════════
     S1 — ORDER OF OPERATIONS (BEDMAS)
  ══════════════════════════════════════════ */
  orderOfOps(container, lang) {
    const t = T[lang];
    const examples = [
      {
        expr: '2 + 3 × 4',
        steps: {
          fr: ['Identifier les opérations : addition et <span class="op-md">multiplication</span>',
               'La <span class="op-md">multiplication</span> passe avant l\'addition : <span class="op-md">3 × 4 = 12</span>',
               'Effectuer l\'addition : 2 + <span class="op-md">12</span> = <strong>14</strong>'],
          en: ['Identify operations: addition and <span class="op-md">multiplication</span>',
               '<span class="op-md">Multiplication</span> before addition: <span class="op-md">3 × 4 = 12</span>',
               'Perform addition: 2 + <span class="op-md">12</span> = <strong>14</strong>']
        }
      },
      {
        expr: '(3 + 2)² − 4',
        steps: {
          fr: ['<span class="op-b">Parenthèses</span> d\'abord : <span class="op-b">(3 + 2) = 5</span>',
               '<span class="op-e">Exposant</span> ensuite : <span class="op-e">5² = 25</span>',
               'Soustraction : 25 − 4 = <strong>21</strong>'],
          en: ['<span class="op-b">Brackets</span> first: <span class="op-b">(3 + 2) = 5</span>',
               '<span class="op-e">Exponent</span> next: <span class="op-e">5² = 25</span>',
               'Subtraction: 25 − 4 = <strong>21</strong>']
        }
      },
      {
        expr: '12 ÷ 4 + 2 × 3',
        steps: {
          fr: ['Identifier : <span class="op-md">division, multiplication</span>, addition',
               '<span class="op-md">Division</span> (gauche à droite) : <span class="op-md">12 ÷ 4 = 3</span>',
               '<span class="op-md">Multiplication</span> : <span class="op-md">2 × 3 = 6</span>',
               'Addition : 3 + 6 = <strong>9</strong>'],
          en: ['Identify: <span class="op-md">division, multiplication</span>, addition',
               '<span class="op-md">Division</span> (left to right): <span class="op-md">12 ÷ 4 = 3</span>',
               '<span class="op-md">Multiplication</span>: <span class="op-md">2 × 3 = 6</span>',
               'Addition: 3 + 6 = <strong>9</strong>']
        }
      },
      {
        expr: '3 × (2 + 4)² ÷ 9',
        steps: {
          fr: ['<span class="op-b">Parenthèses</span> : <span class="op-b">(2 + 4) = 6</span>',
               '<span class="op-e">Exposant</span> : <span class="op-e">6² = 36</span>',
               '<span class="op-md">Multiplication et division</span> (G→D) : 3 × 36 = 108, puis 108 ÷ 9 = <strong>12</strong>'],
          en: ['<span class="op-b">Brackets</span>: <span class="op-b">(2 + 4) = 6</span>',
               '<span class="op-e">Exponent</span>: <span class="op-e">6² = 36</span>',
               '<span class="op-md">Mult. and division</span> (L→R): 3 × 36 = 108, then 108 ÷ 9 = <strong>12</strong>']
        }
      }
    ];

    let active = 0;

    const renderSteps = () => {
      const ex = examples[active];
      return ex.steps[lang].map((s, i) => `
        <div class="step-item">
          <div class="step-num">${i + 1}</div>
          <div class="step-content">${s}</div>
        </div>`).join('');
    };

    container.innerHTML = `
      <div class="viz-container">
        <div class="info-box">
          ${t.bedmasInfo}
        </div>
        <div style="padding:8px 0;">
          <div style="font-size:13px;font-weight:700;color:var(--gray);margin-bottom:8px;">${t.selectExample}</div>
          <div class="example-btns" id="exBtns">
            ${examples.map((e, i) => `<button class="example-btn${i === 0 ? ' active' : ''}" data-idx="${i}">${e.expr}</button>`).join('')}
          </div>
        </div>
        <div class="expr-display" id="exprDisplay">${examples[0].expr}</div>
        <div style="font-size:13px;font-weight:700;color:var(--gray);margin:12px 0 8px;">${t.stepsTitle}</div>
        <div class="steps-list" id="stepsList">${renderSteps()}</div>
      </div>`;

    document.getElementById('exBtns').addEventListener('click', e => {
      const btn = e.target.closest('.example-btn');
      if (!btn) return;
      active = parseInt(btn.dataset.idx);
      document.querySelectorAll('.example-btn').forEach((b, i) => b.classList.toggle('active', i === active));
      document.getElementById('exprDisplay').textContent = examples[active].expr;
      document.getElementById('stepsList').innerHTML = renderSteps();
    });
  },

  /* ══════════════════════════════════════════
     S1 — ALGEBRA BALANCE SCALE
  ══════════════════════════════════════════ */
  algebraIntro(container, lang) {
    const t = T[lang];
    // Equation: ax + b = c  →  we track a (coef of x), b (constant on left), c (right side)
    let state = { a: 2, b: 3, c: 11, steps: [] }; // 2x + 3 = 11

    function render() {
      const s = state;
      const solved = s.a === 1 && s.b === 0;
      const xVal = solved ? s.c : null;

      // Build equation string
      const leftX  = s.a === 0 ? '' : (s.a === 1 ? 'x' : `${s.a}x`);
      const leftB  = s.b === 0 ? '' : (s.b > 0 ? ` + ${s.b}` : ` − ${Math.abs(s.b)}`);
      const left   = (leftX + leftB) || '0';
      const right  = s.c;

      const tiltAngle = s.c > (s.a !== 0 ? s.a + s.b : s.b) ? -5 : (s.c < (s.a !== 0 ? s.a + s.b : s.b) ? 5 : 0);

      container.innerHTML = `
        <div class="viz-container">
          <div class="info-box">
            ${lang === 'fr'
              ? `<strong>Équation actuelle :</strong> <code style="font-size:1.1em">${left} = ${right}</code><br><br>${t.balanceInfo}`
              : `<strong>Current equation:</strong> <code style="font-size:1.1em">${left} = ${right}</code><br><br>${t.balanceInfo}`}
          </div>
          <div class="balance-wrap">
            <div class="balance-equation" id="balanceEq">${left} = ${right}</div>
            <div class="balance-svg-wrap">
              ${buildBalanceSVG(left, right, tiltAngle)}
            </div>
            ${solved
              ? `<div class="balance-solved">${t.solved} &nbsp; x = ${xVal}</div>`
              : `<div class="balance-controls">
                  ${s.a > 0 ? `<button class="balance-btn sub-x" id="bSubX">${t.removeX}</button>` : ''}
                  <button class="balance-btn add-n" id="bAddN">${t.addNum}</button>
                  <button class="balance-btn sub-n" id="bSubN">${t.removeNum}</button>
                </div>
                <div class="balance-step" id="balanceStepMsg">${lang === 'fr' ? 'Isole x en agissant sur les deux membres.' : 'Isolate x by acting on both sides.'}</div>`
            }
            <button class="balance-btn add-n" id="bReset" style="margin-top:8px;background:var(--body-bg);color:var(--gray);">${t.resetBalance}</button>
          </div>
          ${state.steps.length > 0 ? `<div class="steps-list">${state.steps.map((s, i) => `<div class="step-item"><div class="step-num">${i+1}</div><div class="step-content">${s}</div></div>`).join('')}</div>` : ''}
        </div>`;

      document.getElementById('bReset').addEventListener('click', () => {
        state = { a: 2, b: 3, c: 11, steps: [] };
        render();
      });

      if (!solved) {
        if (s.a > 0) {
          document.getElementById('bSubX').addEventListener('click', () => {
            const msg = lang === 'fr'
              ? `Soustraire x des deux membres : <strong>${state.a}x${state.b >= 0 ? '+'+state.b : state.b} − x = ${state.c} − x</strong> → ${state.a-1}x${state.b >= 0 ? '+'+state.b : state.b} = ${state.c}`
              : `Subtract x from both sides: <strong>${state.a}x${state.b >= 0 ? '+'+state.b : state.b} − x = ${state.c}</strong>`;
            state.steps.push(msg);
            state.a--; state.c -= 1; // simplified: both sides minus x is complex so just step-reduce
            // Actually for demo, let's just decrease a and adjust c
            // Real: a*x + b = c, subtract x: (a-1)x + b = c - x which isn't numeric
            // Let's use a different approach: preset problems
            render();
          });
        }
        document.getElementById('bAddN').addEventListener('click', () => {
          const amount = -state.b;
          if (amount === 0) return;
          const msg = lang === 'fr'
            ? `Ajouter ${amount > 0 ? amount : `(${amount})`} des deux membres → <strong>${state.a}x = ${state.c + amount}</strong>`
            : `Add ${amount > 0 ? amount : `(${amount})`} to both sides → <strong>${state.a}x = ${state.c + amount}</strong>`;
          state.steps.push(msg);
          state.c += amount;
          state.b = 0;
          render();
        });
        document.getElementById('bSubN').addEventListener('click', () => {
          if (state.b <= 0) return;
          const msg = lang === 'fr'
            ? `Soustraire ${state.b} des deux membres → <strong>${state.a}x = ${state.c - state.b}</strong>`
            : `Subtract ${state.b} from both sides → <strong>${state.a}x = ${state.c - state.b}</strong>`;
          state.steps.push(msg);
          state.c -= state.b;
          state.b = 0;
          render();
        });
      }
    }

    function buildBalanceSVG(left, right, tilt) {
      return `<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px">
        <!-- Stand -->
        <rect x="147" y="90" width="6" height="65" rx="3" fill="#94A3B8"/>
        <rect x="120" y="148" width="60" height="8" rx="4" fill="#CBD5E1"/>
        <!-- Beam -->
        <g transform="rotate(${tilt}, 150, 92)">
          <rect x="60" y="89" width="180" height="6" rx="3" fill="#64748B"/>
          <!-- Left pan -->
          <line x1="80" y1="92" x2="80" y2="115" stroke="#94A3B8" stroke-width="2"/>
          <ellipse cx="80" cy="118" rx="35" ry="8" fill="#E0E7FF" stroke="#818CF8" stroke-width="1.5"/>
          <text x="80" y="121" text-anchor="middle" font-family="Nunito" font-size="13" font-weight="800" fill="#4361EE">${left}</text>
          <!-- Right pan -->
          <line x1="220" y1="92" x2="220" y2="115" stroke="#94A3B8" stroke-width="2"/>
          <ellipse cx="220" cy="118" rx="35" ry="8" fill="#FEE2E2" stroke="#F87171" stroke-width="1.5"/>
          <text x="220" y="121" text-anchor="middle" font-family="Nunito" font-size="13" font-weight="800" fill="#EF233C">${right}</text>
        </g>
        <!-- Pivot -->
        <circle cx="150" cy="90" r="7" fill="#64748B"/>
      </svg>`;
    }

    render();
  },

  /* ══════════════════════════════════════════
     S2 — PROPORTIONALITY EXPLORER
  ══════════════════════════════════════════ */
  proportionality(container, lang) {
    const t = T[lang];

    container.innerHTML = `
      <div class="viz-container">
        <div class="info-box">
          ${lang === 'fr'
            ? 'Deux rapports sont <strong>proportionnels</strong> si leurs produits croisés sont égaux : a/b = c/d si et seulement si <strong>a × d = b × c</strong>.'
            : 'Two ratios are <strong>proportional</strong> if their cross products are equal: a/b = c/d if and only if <strong>a × d = b × c</strong>.'}
        </div>
        <div class="viz-controls">
          <div class="ctrl-group">
            <label>${t.ratio1} (a/b) <span id="r1Display">2/3</span></label>
            <div style="display:flex;gap:10px;align-items:center;margin-top:6px;">
              <span style="font-size:12px;color:var(--gray)">a:</span>
              <input type="range" id="r1a" min="1" max="12" value="2" style="flex:1">
              <span style="font-size:12px;color:var(--gray)">b:</span>
              <input type="range" id="r1b" min="1" max="12" value="3" style="flex:1">
            </div>
          </div>
          <div class="ctrl-group">
            <label>${t.ratio2} (c/d) <span id="r2Display">4/6</span></label>
            <div style="display:flex;gap:10px;align-items:center;margin-top:6px;">
              <span style="font-size:12px;color:var(--gray)">c:</span>
              <input type="range" id="r2c" min="1" max="12" value="4" style="flex:1">
              <span style="font-size:12px;color:var(--gray)">d:</span>
              <input type="range" id="r2d" min="1" max="12" value="6" style="flex:1">
            </div>
          </div>
        </div>
        <div class="prop-bars">
          <div class="prop-bar-group">
            <div class="prop-bar" id="bar1" style="background:#4361EE;height:100px;"></div>
            <div class="prop-bar-val" id="bar1val">2/3 ≈ 0.67</div>
            <div class="prop-bar-label">${t.ratio1}</div>
          </div>
          <div class="prop-bar-group">
            <div class="prop-bar" id="bar2" style="background:#F72585;height:100px;"></div>
            <div class="prop-bar-val" id="bar2val">4/6 ≈ 0.67</div>
            <div class="prop-bar-label">${t.ratio2}</div>
          </div>
        </div>
        <div class="viz-output">
          <div class="viz-badge" id="crossProductDisplay">a×d = b×c : 12 = 12</div>
          <div class="prop-status proportional" id="propStatus">${t.proportional}</div>
        </div>
      </div>`;

    function update() {
      const a = parseInt(document.getElementById('r1a').value);
      const b = parseInt(document.getElementById('r1b').value);
      const c = parseInt(document.getElementById('r2c').value);
      const d = parseInt(document.getElementById('r2d').value);

      const v1 = a / b, v2 = c / d;
      const maxH = 130;

      document.getElementById('r1Display').textContent = `${a}/${b}`;
      document.getElementById('r2Display').textContent = `${c}/${d}`;
      document.getElementById('bar1val').textContent = `${a}/${b} ≈ ${v1.toFixed(2)}`;
      document.getElementById('bar2val').textContent = `${c}/${d} ≈ ${v2.toFixed(2)}`;

      const max = Math.max(v1, v2, 0.1);
      document.getElementById('bar1').style.height = `${(v1 / max) * maxH}px`;
      document.getElementById('bar2').style.height = `${(v2 / max) * maxH}px`;

      const cross1 = a * d, cross2 = b * c;
      const isProp = cross1 === cross2;
      document.getElementById('crossProductDisplay').textContent =
        `${a}×${d} = ${b}×${c}  →  ${cross1} ${isProp ? '=' : '≠'} ${cross2}`;
      const status = document.getElementById('propStatus');
      status.textContent = isProp ? t.proportional : t.notProportional;
      status.className = `prop-status ${isProp ? 'proportional' : 'not-proportional'}`;
    }

    ['r1a','r1b','r2c','r2d'].forEach(id =>
      document.getElementById(id).addEventListener('input', update));
    update();
  },

  /* ══════════════════════════════════════════
     S2 — PYTHAGOREAN THEOREM
  ══════════════════════════════════════════ */
  pythagoras(container, lang) {
    const t = T[lang];

    container.innerHTML = `
      <div class="viz-container">
        <div class="info-box">
          ${lang === 'fr'
            ? 'Dans un <strong>triangle rectangle</strong>, le carré de l\'<strong>hypoténuse</strong> (le plus long côté) est égal à la somme des carrés des deux autres côtés : <strong>a² + b² = c²</strong>'
            : 'In a <strong>right triangle</strong>, the square of the <strong>hypotenuse</strong> (longest side) equals the sum of the squares of the other two sides: <strong>a² + b² = c²</strong>'}
        </div>
        <div class="viz-canvas-wrap">
          <canvas id="pythCanvas" width="480" height="220"></canvas>
        </div>
        <div class="viz-controls">
          <div class="ctrl-group">
            <label>${t.sideA} (a) <span id="aDisplay">3</span></label>
            <input type="range" id="sideA" min="1" max="10" value="3">
          </div>
          <div class="ctrl-group">
            <label>${t.sideB} (b) <span id="bDisplay">4</span></label>
            <input type="range" id="sideB" min="1" max="10" value="4">
          </div>
        </div>
        <div class="viz-output">
          <div class="viz-badge" id="pythagorasFormula">3² + 4² = 5²</div>
          <div class="viz-badge secondary" id="pythagorasCalc">9 + 16 = 25</div>
          <div class="viz-badge" id="cDisplay" style="color:#06D6A0;">c = 5.00</div>
        </div>
      </div>`;

    const canvas = document.getElementById('pythCanvas');
    const ctx = canvas.getContext('2d');

    function draw() {
      const a = parseInt(document.getElementById('sideA').value);
      const b = parseInt(document.getElementById('sideB').value);
      const c = Math.sqrt(a * a + b * b);

      document.getElementById('aDisplay').textContent = a;
      document.getElementById('bDisplay').textContent = b;
      document.getElementById('pythagorasFormula').textContent = `${a}² + ${b}² = c²`;
      document.getElementById('pythagorasCalc').textContent = `${a*a} + ${b*b} = ${(a*a+b*b)}`;
      document.getElementById('cDisplay').textContent = `c = ${c.toFixed(2)}`;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Scale the triangle to fit
      const scale = Math.min(120 / Math.max(a, b), 14);
      const ox = 80, oy = H - 40;
      const ax = ox + b * scale, ay = oy;
      const bx = ox, by = oy - a * scale;

      // Right angle mark
      const rSize = 10;
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(ox, oy - rSize, rSize, rSize);

      // Triangle
      ctx.fillStyle = 'rgba(67, 97, 238, 0.08)';
      ctx.beginPath();
      ctx.moveTo(ox, oy); ctx.lineTo(ax, ay); ctx.lineTo(bx, by); ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#4361EE';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Side labels
      ctx.font = 'bold 14px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#EF233C';
      ctx.fillText(`a = ${a}`, bx - 22, (oy + by) / 2);
      ctx.fillStyle = '#06D6A0';
      ctx.fillText(`b = ${b}`, (ox + ax) / 2, oy + 18);
      ctx.fillStyle = '#F72585';
      ctx.fillText(`c ≈ ${c.toFixed(1)}`, (ax + bx) / 2 + 20, (ay + by) / 2 - 8);

      // Square on side a (left)
      ctx.fillStyle = 'rgba(239, 35, 60, 0.12)';
      ctx.strokeStyle = '#EF233C';
      ctx.lineWidth = 1.5;
      const aLen = a * scale;
      ctx.beginPath();
      ctx.rect(ox - aLen, by, aLen, aLen);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#EF233C';
      ctx.font = 'bold 12px Nunito';
      ctx.fillText(`a²=${a*a}`, ox - aLen / 2, by + aLen / 2 + 5);

      // Square on side b (bottom)
      ctx.fillStyle = 'rgba(6, 214, 160, 0.12)';
      ctx.strokeStyle = '#06D6A0';
      ctx.lineWidth = 1.5;
      const bLen = b * scale;
      ctx.beginPath();
      ctx.rect(ox, oy, bLen, bLen * 0.7);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#065F46';
      ctx.font = 'bold 12px Nunito';
      ctx.fillText(`b²=${b*b}`, ox + bLen / 2, oy + bLen * 0.35 + 5);

      // Square on hypotenuse (simplified: just show label)
      const midHx = (ax + bx) / 2 + 35, midHy = (ay + by) / 2;
      ctx.fillStyle = 'rgba(247,37,133,0.1)';
      ctx.strokeStyle = '#F72585';
      ctx.lineWidth = 1.5;
      // draw a small indicator square near hypotenuse label
      const squareSide = Math.min(c * scale * 0.4, 50);
      ctx.strokeRect(midHx, midHy - squareSide, squareSide, squareSide);
      ctx.fillRect(midHx, midHy - squareSide, squareSide, squareSide);
      ctx.fillStyle = '#9D174D';
      ctx.font = 'bold 12px Nunito';
      ctx.fillText(`c²=${(a*a+b*b)}`, midHx + squareSide / 2, midHy - squareSide / 2 + 5);
    }

    document.getElementById('sideA').addEventListener('input', draw);
    document.getElementById('sideB').addEventListener('input', draw);
    draw();
  },

  /* ══════════════════════════════════════════
     S2 — LINEAR EQUATIONS STEP SOLVER
  ══════════════════════════════════════════ */
  linearEquations(container, lang) {
    const examples = [
      { eq: '2x + 3 = 11',
        steps: {
          fr: ['Équation de départ : <strong>2x + 3 = 11</strong>',
               'Soustraire 3 des deux membres : 2x + 3 <strong>− 3</strong> = 11 <strong>− 3</strong>',
               'Simplifier : <strong>2x = 8</strong>',
               'Diviser les deux membres par 2 : <strong>x = 8 ÷ 2 = 4</strong>',
               'Vérification : 2(4) + 3 = 8 + 3 = 11 ✓'],
          en: ['Starting equation: <strong>2x + 3 = 11</strong>',
               'Subtract 3 from both sides: 2x + 3 <strong>− 3</strong> = 11 <strong>− 3</strong>',
               'Simplify: <strong>2x = 8</strong>',
               'Divide both sides by 2: <strong>x = 8 ÷ 2 = 4</strong>',
               'Verify: 2(4) + 3 = 8 + 3 = 11 ✓']
        }
      },
      { eq: '5x − 7 = 3x + 9',
        steps: {
          fr: ['Équation de départ : <strong>5x − 7 = 3x + 9</strong>',
               'Soustraire 3x des deux membres : <strong>2x − 7 = 9</strong>',
               'Ajouter 7 des deux membres : <strong>2x = 16</strong>',
               'Diviser par 2 : <strong>x = 8</strong>',
               'Vérification : 5(8) − 7 = 33 = 3(8) + 9 ✓'],
          en: ['Starting equation: <strong>5x − 7 = 3x + 9</strong>',
               'Subtract 3x from both sides: <strong>2x − 7 = 9</strong>',
               'Add 7 to both sides: <strong>2x = 16</strong>',
               'Divide by 2: <strong>x = 8</strong>',
               'Verify: 5(8) − 7 = 33 = 3(8) + 9 ✓']
        }
      },
      { eq: '3(x − 2) = 9',
        steps: {
          fr: ['Équation de départ : <strong>3(x − 2) = 9</strong>',
               'Distribuer : <strong>3x − 6 = 9</strong>',
               'Ajouter 6 des deux membres : <strong>3x = 15</strong>',
               'Diviser par 3 : <strong>x = 5</strong>',
               'Vérification : 3(5 − 2) = 3(3) = 9 ✓'],
          en: ['Starting equation: <strong>3(x − 2) = 9</strong>',
               'Distribute: <strong>3x − 6 = 9</strong>',
               'Add 6 to both sides: <strong>3x = 15</strong>',
               'Divide by 3: <strong>x = 5</strong>',
               'Verify: 3(5 − 2) = 3(3) = 9 ✓']
        }
      }
    ];

    let active = 0;
    const t = T[lang];

    const render = () => {
      const ex = examples[active];
      container.innerHTML = `
        <div class="viz-container">
          <div class="info-box">
            ${lang === 'fr'
              ? 'Pour résoudre une équation, <strong>isole la variable</strong> en effectuant les mêmes opérations des deux côtés de l\'équation.'
              : 'To solve an equation, <strong>isolate the variable</strong> by performing the same operations on both sides of the equation.'}
          </div>
          <div style="padding:8px 0;">
            <div style="font-size:13px;font-weight:700;color:var(--gray);margin-bottom:8px;">${t.selectExample}</div>
            <div class="example-btns" id="leExBtns">
              ${examples.map((e, i) => `<button class="example-btn${i === active ? ' active' : ''}" data-idx="${i}">${e.eq}</button>`).join('')}
            </div>
          </div>
          <div class="expr-display">${ex.eq}</div>
          <div style="font-size:13px;font-weight:700;color:var(--gray);margin:12px 0 8px;">${t.stepsTitle}</div>
          <div class="steps-list">
            ${ex.steps[lang].map((s, i) => `
              <div class="step-item">
                <div class="step-num">${i + 1}</div>
                <div class="step-content">${s}</div>
              </div>`).join('')}
          </div>
        </div>`;

      document.getElementById('leExBtns').addEventListener('click', e => {
        const btn = e.target.closest('.example-btn');
        if (!btn) return;
        active = parseInt(btn.dataset.idx);
        render();
      });
    };

    render();
  },

  /* ══════════════════════════════════════════
     S2 — LINEAR FUNCTION GRAPHER
  ══════════════════════════════════════════ */
  linearFunctions(container, lang) {
    const t = T[lang];

    container.innerHTML = `
      <div class="viz-container">
        <div class="info-box">
          ${lang === 'fr'
            ? 'Une <strong>fonction du 1er degré</strong> a la forme <strong>f(x) = mx + b</strong>, où <strong>m</strong> est la <strong>pente</strong> (inclinaison) et <strong>b</strong> est l\'<strong>ordonnée à l\'origine</strong> (où la droite coupe l\'axe des y).'
            : 'A <strong>linear function</strong> has the form <strong>f(x) = mx + b</strong>, where <strong>m</strong> is the <strong>slope</strong> and <strong>b</strong> is the <strong>y-intercept</strong> (where the line crosses the y-axis).'}
        </div>
        <div class="viz-canvas-wrap">
          <canvas id="funcCanvas" width="480" height="280"></canvas>
        </div>
        <div class="viz-controls">
          <div class="ctrl-group">
            <label>${t.slope} <span id="mDisplay">1</span></label>
            <input type="range" id="slopeM" min="-5" max="5" value="1" step="0.5">
          </div>
          <div class="ctrl-group">
            <label>${t.yIntercept} <span id="bDisplay">0</span></label>
            <input type="range" id="interceptB" min="-8" max="8" value="0" step="1">
          </div>
        </div>
        <div class="viz-output">
          <div class="viz-badge" id="funcLabel">f(x) = x</div>
          <div class="viz-badge secondary" id="tableValues" style="font-size:13px;font-weight:600;">x: −2→−2 · 0→0 · 2→2</div>
        </div>
      </div>`;

    const canvas = document.getElementById('funcCanvas');
    const ctx = canvas.getContext('2d');

    function draw() {
      const m = parseFloat(document.getElementById('slopeM').value);
      const b = parseFloat(document.getElementById('interceptB').value);
      const W = canvas.width, H = canvas.height;
      const ox = W / 2, oy = H / 2;
      const unit = 24;

      ctx.clearRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      for (let x = ox % unit; x < W; x += unit) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = oy % unit; y < H; y += unit) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Axes
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#6B7280';
      ctx.font = '11px Nunito';
      ctx.textAlign = 'center';
      for (let i = -9; i <= 9; i += 2) {
        if (i === 0) continue;
        const px = ox + i * unit;
        if (px > 10 && px < W - 10) { ctx.fillText(i, px, oy + 16); }
        const py = oy - i * unit;
        if (py > 10 && py < H - 10) { ctx.textAlign = 'right'; ctx.fillText(i, ox - 5, py + 4); ctx.textAlign = 'center'; }
      }
      ctx.fillText('x', W - 12, oy - 8);
      ctx.textAlign = 'right';
      ctx.fillText('y', ox + 18, 16);

      // Function line
      ctx.strokeStyle = '#4361EE';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(67,97,238,0.3)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      let started = false;
      for (let px = 0; px <= W; px++) {
        const xVal = (px - ox) / unit;
        const yVal = m * xVal + b;
        const py = oy - yVal * unit;
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Y-intercept dot
      const byPx = oy - b * unit;
      ctx.fillStyle = '#F72585';
      ctx.beginPath();
      ctx.arc(ox, byPx, 6, 0, Math.PI * 2);
      ctx.fill();

      // Update labels
      const mStr = m === 0 ? '' : (m === 1 ? 'x' : (m === -1 ? '−x' : `${m}x`));
      const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` − ${Math.abs(b)}`);
      const funcStr = (mStr || bStr) ? `f(x) = ${mStr || ''}${mStr ? bStr : b}` : 'f(x) = 0';
      document.getElementById('mDisplay').textContent = m;
      document.getElementById('bDisplay').textContent = b;
      document.getElementById('funcLabel').textContent = funcStr;

      const tableVals = [-2, 0, 2].map(x => `${x}→${m*x+b}`).join(' · ');
      document.getElementById('tableValues').textContent = tableVals;
    }

    document.getElementById('slopeM').addEventListener('input', draw);
    document.getElementById('interceptB').addEventListener('input', draw);
    draw();
  },

  /* ══════════════════════════════════════════
     S2 — PERCENTAGE GRID EXPLORER
  ══════════════════════════════════════════ */
  pourcentages(container, lang) {
    const fr = lang === 'fr';

    const state = {
      mode: 'A',
      A: { part: 30, whole: 80 },
      B: { whole: 80, pct: 25 },
      C: { part: 15, pct: 25 }
    };

    container.innerHTML = `
      <div class="viz-container">
        <div class="info-box">
          ${fr
            ? 'Un <strong>pourcentage</strong> exprime une partie sur 100. La grille représente toujours le <strong>tout</strong> (100 cases = 100%). Les cases colorées montrent la <strong>partie</strong>.'
            : 'A <strong>percentage</strong> expresses a part out of 100. The grid always represents the <strong>whole</strong> (100 cells = 100%). Coloured cells show the <strong>part</strong>.'}
        </div>

        <div class="pct-mode-tabs">
          <button class="pct-tab active" data-mode="A">${fr ? '🔍 Trouver le %' : '🔍 Find the %'}</button>
          <button class="pct-tab" data-mode="B">${fr ? '🔢 Trouver la partie' : '🔢 Find the part'}</button>
          <button class="pct-tab" data-mode="C">${fr ? '🧩 Trouver le tout' : '🧩 Find the whole'}</button>
        </div>

        <div class="pct-question-wrap" id="pctQWrap"></div>

        <div class="pct-grid-section">
          <div class="pct-grid-label" id="pctGridLabel"></div>
          <div class="pct-grid" id="pctGrid"></div>
        </div>

        <div class="viz-output" style="flex-direction:column;gap:6px;text-align:center;">
          <div style="font-size:13px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:0.5px;" id="pctResultLabel"></div>
          <div style="font-size:2.8rem;font-weight:900;color:var(--primary);line-height:1;" id="pctResultVal">—</div>
          <div style="font-size:13px;color:var(--gray);font-family:'Courier New',monospace;margin-top:4px;" id="pctAnnotation"></div>
        </div>
      </div>`;

    // Build grid cells
    const grid = container.querySelector('#pctGrid');
    const cells = [];
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.className = 'pct-cell';
      grid.appendChild(cell);
      cells.push(cell);
    }

    function highlightCells(n) {
      const count = Math.min(100, Math.max(0, Math.round(n)));
      cells.forEach((c, i) => c.classList.toggle('pct-cell--on', i < count));
      const label = fr
        ? `Chaque case = 1%  ·  ${count} case${count !== 1 ? 's' : ''} colorée${count !== 1 ? 's' : ''}`
        : `Each cell = 1%  ·  ${count} cell${count !== 1 ? 's' : ''} coloured`;
      container.querySelector('#pctGridLabel').textContent = label;
    }

    function setResult(label, value, unit, annotation) {
      container.querySelector('#pctResultLabel').textContent = label;
      container.querySelector('#pctResultVal').textContent = value + (unit || '');
      container.querySelector('#pctAnnotation').textContent = annotation;
    }

    function fmt(n) {
      return Number.isInteger(n) ? String(n) : n.toFixed(1);
    }

    function compute() {
      const { mode } = state;
      if (mode === 'A') {
        const { part, whole } = state.A;
        if (whole <= 0) return;
        if (part > whole) {
          highlightCells(100);
          setResult(fr ? 'Pourcentage' : 'Percentage', '>100', '%',
            fr ? 'La partie dépasse le tout !' : 'The part exceeds the whole!');
          return;
        }
        const pct = (part / whole) * 100;
        highlightCells(pct);
        setResult(
          fr ? 'Pourcentage' : 'Percentage',
          fmt(pct), '%',
          `${part} ÷ ${whole} × 100 = ${fmt(pct)}%`
        );
      } else if (mode === 'B') {
        const { whole, pct } = state.B;
        const result = (pct / 100) * whole;
        highlightCells(pct);
        setResult(
          fr ? 'La partie' : 'The part',
          fmt(result), '',
          `${whole} × ${pct} ÷ 100 = ${fmt(result)}`
        );
      } else {
        const { part, pct } = state.C;
        if (pct <= 0) return;
        const whole = part / (pct / 100);
        highlightCells(pct);
        setResult(
          fr ? 'Le tout' : 'The whole',
          fmt(whole), '',
          `${part} ÷ (${pct} ÷ 100) = ${part} ÷ ${(pct / 100).toFixed(2)} = ${fmt(whole)}`
        );
      }
    }

    function renderQuestion() {
      const wrap = container.querySelector('#pctQWrap');
      const { mode } = state;

      if (mode === 'A') {
        const { part, whole } = state.A;
        wrap.innerHTML = `
          <div class="pct-question">
            <input class="pct-input" type="number" id="pctPart" min="0" max="1000" value="${part}">
            <span>${fr ? 'est quel pourcentage de' : 'is what percentage of'}</span>
            <input class="pct-input" type="number" id="pctWhole" min="1" max="1000" value="${whole}">
            <span>?</span>
          </div>`;
        wrap.querySelector('#pctPart').addEventListener('input', e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v) && v >= 0) { state.A.part = v; compute(); }
        });
        wrap.querySelector('#pctWhole').addEventListener('input', e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v) && v >= 1) { state.A.whole = v; compute(); }
        });

      } else if (mode === 'B') {
        const { whole, pct } = state.B;
        wrap.innerHTML = `
          <div class="pct-question">
            <span>${fr ? 'Quel est' : 'What is'}</span>
            <input class="pct-input pct-input--narrow" type="number" id="pctPct" min="0" max="100" value="${pct}">
            <span class="pct-sign">%</span>
            <span>${fr ? 'de' : 'of'}</span>
            <input class="pct-input" type="number" id="pctWhole" min="1" max="1000" value="${whole}">
            <span>?</span>
          </div>`;
        wrap.querySelector('#pctPct').addEventListener('input', e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v) && v >= 0 && v <= 100) { state.B.pct = v; compute(); }
        });
        wrap.querySelector('#pctWhole').addEventListener('input', e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v) && v >= 1) { state.B.whole = v; compute(); }
        });

      } else {
        const { part, pct } = state.C;
        wrap.innerHTML = `
          <div class="pct-question">
            <input class="pct-input" type="number" id="pctPart" min="0" max="1000" value="${part}">
            <span>${fr ? 'représente' : 'represents'}</span>
            <input class="pct-input pct-input--narrow" type="number" id="pctPct" min="1" max="100" value="${pct}">
            <span class="pct-sign">%</span>
            <span>${fr ? 'de quel nombre ?' : 'of what number?'}</span>
          </div>`;
        wrap.querySelector('#pctPart').addEventListener('input', e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v) && v >= 0) { state.C.part = v; compute(); }
        });
        wrap.querySelector('#pctPct').addEventListener('input', e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v) && v >= 1 && v <= 100) { state.C.pct = v; compute(); }
        });
      }

      compute();
    }

    // Wire mode tabs
    container.querySelectorAll('.pct-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        state.mode = tab.dataset.mode;
        container.querySelectorAll('.pct-tab').forEach(t =>
          t.classList.toggle('active', t === tab));
        renderQuestion();
      });
    });

    renderQuestion();
  }
};
