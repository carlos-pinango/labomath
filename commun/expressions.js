/* ============================================
   LABOMATH – Expressions algébriques, partagé par les activités d'algèbre

   Expr.parse(texte)          → { ast, letters } ou { err: 'empty' | 'times' | 'parse' | 'deg' }
                                 Lit 3x² − 2x, 3(2x + 5), 2x(3x), x ÷ 2, x/2, 3(−2)² − 2(−2), 0,5…
                                 × * · • et le point pour multiplier sont refusés ('times').
                                 −2² vaut −4 et (−2)² vaut 4, comme en mathématiques.
   Expr.value(ast, { x: 2 })  → nombre
   Expr.equivalent(a, b)      → vrai si a et b ont la même valeur pour 8 valeurs de la lettre
                                 (dont des négatives et des décimales)
   Expr.terms(ast)            → termes du niveau supérieur [{ c, d }] si chaque terme est un
                                 monôme sans parenthèses ; null sinon
   Expr.isReduced(ast)        → une seule fois chaque degré, sans parenthèses
   Expr.isOrdered(ast)        → termes en ordre décroissant de degré
   Expr.poly(ast)             → coefficients [c0, c1, c2] (une lettre), ou null
   Expr.fmtNum(v, lang)       → « −0,5 » en français, « −0.5 » en anglais
   Expr.fmtPoly(p, lettre)    → « 3<em>x</em>² − 2<em>x</em> » (vrai signe moins)
   ============================================ */

(function () {
    const M = '−';
    const SAMPLES = [-3, -1.5, 0, 0.5, 1, 2, 3.7, 10];

    function normalize(raw) {
        return String(raw).replace(/\s+/g, '').replace(/[−–—]/g, '-').replace(/\^2/g, '²')
            .replace(/[A-Z]/g, c => c.toLowerCase()).replace(/:/g, '÷');
    }

    function parse(raw) {
        const s = normalize(raw);
        if (!s) return { err: 'empty' };
        if (/[*×·•∙]/.test(s) || /[a-z)²]\.|\.[a-z(]/.test(s)) return { err: 'times' };
        let i = 0;
        const letters = new Set();
        const peek = () => s[i];

        function expr() {
            let node = term();
            while (peek() === '+' || peek() === '-') {
                const op = s[i++];
                node = { t: op === '+' ? 'add' : 'sub', a: node, b: term() };
            }
            return node;
        }
        function term() {
            let node = unary();
            for (;;) {
                const c = peek();
                if (c === '÷' || c === '/') { i++; node = { t: 'div', a: node, b: unary() }; }
                else if (c === '(' || /[a-z]/.test(c || '')) node = { t: 'mul', a: node, b: power() };
                else break;
            }
            return node;
        }
        function unary() {
            if (peek() === '-') { i++; return { t: 'neg', a: unary() }; }
            if (peek() === '+') { i++; return unary(); }
            return power();
        }
        function power() {
            let node = atom();
            if (peek() === '²') { i++; node = { t: 'pow', a: node }; }
            return node;
        }
        function atom() {
            const c = peek();
            if (c === '(') {
                i++;
                const inner = expr();
                if (peek() !== ')') throw 0;
                i++;
                return { t: 'paren', a: inner };
            }
            if (/[a-z]/.test(c || '')) { i++; letters.add(c); return { t: 'var', n: c }; }
            const m = s.slice(i).match(/^\d+([.,]\d+)?/);
            if (m) { i += m[0].length; return { t: 'num', v: Number(m[0].replace(',', '.')) }; }
            throw 0;
        }
        try {
            const ast = expr();
            if (i !== s.length) throw 0;
            const p = poly(ast);
            if (p && p.slice(3).some(c => Math.abs(c) > 1e-9)) return { err: 'deg' };
            return { ast, letters: [...letters] };
        } catch (e) {
            return { err: 'parse' };
        }
    }

    function value(n, env) {
        switch (n.t) {
            case 'num': return n.v;
            case 'var': return env[n.n] ?? 0;
            case 'neg': return -value(n.a, env);
            case 'paren': return value(n.a, env);
            case 'add': return value(n.a, env) + value(n.b, env);
            case 'sub': return value(n.a, env) - value(n.b, env);
            case 'mul': return value(n.a, env) * value(n.b, env);
            case 'div': return value(n.a, env) / value(n.b, env);
            case 'pow': { const v = value(n.a, env); return v * v; }
        }
        return NaN;
    }

    const close = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

    // Same value for every sample (several letters: shifted samples so they differ)
    function equivalent(A, B) {
        const letters = [...new Set([...(A.letters || []), ...(B.letters || [])])];
        return SAMPLES.every((_, k) => {
            const env = {};
            letters.forEach((l, j) => { env[l] = SAMPLES[(k + 3 * j) % SAMPLES.length]; });
            return close(value(A.ast, env), value(B.ast, env));
        });
    }

    // Polynomial in one letter, or null (division by an expression with a letter)
    function padd(p, q) { const r = []; for (let d = 0; d < Math.max(p.length, q.length); d++) r[d] = (p[d] || 0) + (q[d] || 0); return r; }
    function pmul(p, q) { const r = []; p.forEach((a, i) => q.forEach((b, j) => { r[i + j] = (r[i + j] || 0) + a * b; })); return r; }
    function poly(n) {
        switch (n.t) {
            case 'num': return [n.v];
            case 'var': return [0, 1];
            case 'neg': { const a = poly(n.a); return a && a.map(c => -c); }
            case 'paren': return poly(n.a);
            case 'add': { const a = poly(n.a), b = poly(n.b); return a && b && padd(a, b); }
            case 'sub': { const a = poly(n.a), b = poly(n.b); return a && b && padd(a, b.map(c => -c)); }
            case 'mul': { const a = poly(n.a), b = poly(n.b); return a && b && pmul(a, b); }
            case 'div': { const a = poly(n.a), b = poly(n.b); return a && b && b.slice(1).every(c => !c) && b[0] ? a.map(c => c / b[0]) : null; }
            case 'pow': { const a = poly(n.a); return a && pmul(a, a); }
        }
        return null;
    }

    // One monomial: c, x, x², cx, cx², with an optional minus sign; { c, d } or null
    function monomial(n) {
        if (n.t === 'neg') { const m = monomial(n.a); return m && { c: -m.c, d: m.d }; }
        if (n.t === 'num') return { c: n.v, d: 0 };
        if (n.t === 'var') return { c: 1, d: 1 };
        if (n.t === 'pow' && n.a.t === 'var') return { c: 1, d: 2 };
        if (n.t === 'mul') {
            // −2x is read as (−2)(x): the coefficient can carry the minus sign
            const k = n.a.t === 'num' ? n.a.v : (n.a.t === 'neg' && n.a.a.t === 'num' ? -n.a.a.v : null);
            const r = k === null ? null : monomial(n.b);
            return r && r.c === 1 && r.d > 0 && n.b.t !== 'neg' ? { c: k, d: r.d } : null;
        }
        return null;
    }
    function terms(ast) {
        const out = [];
        let ok = true;
        (function walk(n, sign) {
            if (n.t === 'add') { walk(n.a, sign); walk(n.b, sign); }
            else if (n.t === 'sub') { walk(n.a, sign); walk(n.b, -sign); }
            else {
                const m = monomial(n);
                if (!m) ok = false; else out.push({ c: sign * m.c, d: m.d });
            }
        })(ast, 1);
        return ok ? out : null;
    }
    function isReduced(ast) {
        const t = terms(ast);
        return !!t && t.every(x => x.c !== 0) && new Set(t.map(x => x.d)).size === t.length;
    }
    function isOrdered(ast) {
        const t = terms(ast);
        return !!t && t.every((x, k) => k === 0 || x.d <= t[k - 1].d);
    }

    function fmtNum(v, lang) {
        const r = Math.round(v * 1e6) / 1e6;
        const str = Math.abs(r).toLocaleString(lang === 'en' ? 'en-CA' : 'fr-CA', { maximumFractionDigits: 4 });
        return (r < 0 ? M : '') + str;
    }
    function fmtPoly(p, letter = 'x', lang = 'fr') {
        const L = `<em>${letter}</em>`;
        let out = '';
        for (let d = p.length - 1; d >= 0; d--) {
            const c = Math.round((p[d] || 0) * 1e6) / 1e6;
            if (!c) continue;
            const a = Math.abs(c);
            const body = d === 0 ? fmtNum(a, lang) : (a === 1 ? '' : fmtNum(a, lang)) + L + (d === 2 ? '²' : '');
            out += out ? (c < 0 ? ` ${M} ` : ' + ') + body : (c < 0 ? M : '') + body;
        }
        return out || '0';
    }

    window.Expr = { parse, value, equivalent, terms, isReduced, isOrdered, poly, fmtNum, fmtPoly, normalize, SAMPLES };
})();
