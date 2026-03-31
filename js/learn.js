/**
 * learn.js — MathForge Learn Section
 * ════════════════════════════════════
 * Each topic has a buildContent() function that returns HTML.
 * To add a new topic's notes: add an entry to LEARN_TOPICS below.
 */
'use strict';

/* ── Helper: build a standard data table ─────────────────── */
function makeTable(headers, rows, classes = []) {
  const ths = headers.map((h, i) => `<th class="${classes[i] || ''}">${h}</th>`).join('');
  const trs = rows.map(row =>
    '<tr>' + row.map((cell, i) => `<td class="${classes[i] || ''}">${cell}</td>`).join('') + '</tr>'
  ).join('');
  return `<div class="notes-table-wrap"><table class="notes-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

/* ── LEARN TOPICS ─────────────────────────────────────────── */

/**
 * Each entry:
 * {
 *   id:          matches TOPICS id in topics.js
 *   label:       display name
 *   icon:        symbol
 *   color:       accent hex
 *   desc:        one-liner
 *   buildContent: () => HTML string
 * }
 */
const LEARN_TOPICS = [

  /* ── MULTIPLICATION TABLES ────────────────────────────── */
  {
    id: 'multiplication', label: 'Multiplication Tables', icon: '×', color: '#065F46',
    desc: 'Tables 2 to 30 × 1 to 30 — complete reference with verbal reading guide.',
    buildContent() {
      const tables = [];
      for (let t = 2; t <= 30; t++) {
        const rows = [];
        for (let m = 1; m <= 30; m++) rows.push([`${m} × ${t}`, `<span class="val">${m * t}</span>`]);
        tables.push(`<div class="notes-section">
          <h3>Table of ${t}</h3>
          ${makeTable([`n × ${t}`, 'Result'], rows, ['key', 'val'])}
        </div>`);
      }
      return `
        <div class="notes-section">
          <h3>How English Medium Reads It</h3>
          <p>Format: <strong>[count] [table-word] is/are [result]</strong></p>
          <div class="highlight">
            "One seven is seven" &nbsp;|&nbsp; "Two sevens are fourteen" &nbsp;|&nbsp; "Five twelves are sixty"<br>
            Use <strong>is</strong> for 1× facts, <strong>are</strong> for all others.
          </div>
        </div>
        ${tables.join('')}`;
    },
  },

  /* ── SQUARES ──────────────────────────────────────────── */
  {
    id: 'squares', label: 'Squares (n²)', icon: 'n²', color: '#B45309',
    desc: 'n² for n = 2 to 30 with patterns and tricks.',
    buildContent() {
      const rows = [];
      for (let n = 2; n <= 30; n++) rows.push([n, `<span class="val">${n*n}</span>`]);
      const tricks = `
        <div class="notes-section">
          <h3>Key Patterns</h3>
          <div class="highlight">
            Numbers ending in 5: (n5)² → last two digits always 25. e.g. 25² = 625, 15² = 225<br>
            (a+b)² = a² + 2ab + b² — useful for mental calculation<br>
            (n+1)² = n² + 2n + 1 — each square is previous + odd number<br>
            Odd squares: 1, 9, 25, 49… | Even squares: 4, 16, 36, 64…
          </div>
        </div>`;
      return tricks + `
        <div class="notes-section">
          <h3>Complete Table — n² (2 to 30)</h3>
          ${makeTable(['n', 'n²'], rows, ['key', 'val'])}
        </div>`;
    },
  },

  /* ── CUBES ────────────────────────────────────────────── */
  {
    id: 'cubes', label: 'Cubes (n³)', icon: 'n³', color: '#7C3020',
    desc: 'n³ for n = 2 to 30 with identity tricks.',
    buildContent() {
      const rows = [];
      for (let n = 2; n <= 30; n++) rows.push([n, `<span class="val">${n*n*n}</span>`]);
      return `
        <div class="notes-section">
          <h3>Key Identities</h3>
          <div class="highlight">
            (a+b)³ = a³ + 3a²b + 3ab² + b³<br>
            (a−b)³ = a³ − 3a²b + 3ab² − b³<br>
            a³ + b³ = (a+b)(a²−ab+b²)<br>
            a³ − b³ = (a−b)(a²+ab+b²)
          </div>
        </div>
        <div class="notes-section">
          <h3>Complete Table — n³ (2 to 30)</h3>
          ${makeTable(['n', 'n³'], rows, ['key', 'val'])}
        </div>`;
    },
  },

  /* ── RECIPROCALS ──────────────────────────────────────── */
  {
    id: 'recip-dec', label: 'Reciprocals', icon: '1/n', color: '#065F46',
    desc: 'Fraction → Decimal and Percentage reference.',
    buildContent() {
      const data = [
        ['1/2','0.5','50%'],['1/3','0.333…','33.33%'],['2/3','0.666…','66.67%'],
        ['1/4','0.25','25%'],['3/4','0.75','75%'],
        ['1/5','0.2','20%'],['2/5','0.4','40%'],['3/5','0.6','60%'],['4/5','0.8','80%'],
        ['1/6','0.1666…','16.67%'],['5/6','0.8333…','83.33%'],
        ['1/7','0.142857…','14.29%'],['2/7','0.285714…','28.57%'],['3/7','0.428571…','42.86%'],
        ['4/7','0.571428…','57.14%'],['5/7','0.714285…','71.43%'],['6/7','0.857142…','85.71%'],
        ['1/8','0.125','12.5%'],['3/8','0.375','37.5%'],['5/8','0.625','62.5%'],['7/8','0.875','87.5%'],
        ['1/9','0.111…','11.11%'],['2/9','0.222…','22.22%'],['4/9','0.444…','44.44%'],
        ['5/9','0.555…','55.56%'],['7/9','0.777…','77.78%'],['8/9','0.888…','88.89%'],
        ['1/10','0.1','10%'],['3/10','0.3','30%'],['7/10','0.7','70%'],['9/10','0.9','90%'],
        ['1/11','0.0909…','9.09%'],['2/11','0.1818…','18.18%'],['3/11','0.2727…','27.27%'],
        ['4/11','0.3636…','36.36%'],['5/11','0.4545…','45.45%'],['6/11','0.5454…','54.55%'],
        ['1/12','0.0833…','8.33%'],['5/12','0.4166…','41.67%'],['7/12','0.5833…','58.33%'],['11/12','0.9166…','91.67%'],
      ];
      const rows = data.map(([f, d, p]) => [`<span class="key">${f}</span>`, `<span class="val">${d}</span>`, p]);
      return `
        <div class="notes-section">
          <h3>Division by 11 — Trick</h3>
          <div class="highlight">
            Multiply numerator by 9 → repeating pattern<br>
            1/11 → 1×9=9 → 0.0909… &nbsp;|&nbsp; 3/11 → 3×9=27 → 0.2727… &nbsp;|&nbsp; 7/11 → 7×9=63 → 0.6363…
          </div>
        </div>
        <div class="notes-section">
          <h3>Complete Fraction Reference</h3>
          ${makeTable(['Fraction', 'Decimal', '%'], rows, ['key','val',''])}
        </div>`;
    },
  },

  /* ── POWERS ───────────────────────────────────────────── */
  {
    id: 'powers', label: 'Powers', icon: 'xⁿ', color: '#3730A3',
    desc: 'Powers of 2–15 and 25 with complete tables.',
    buildContent() {
      const bases = [
        {b:2, exps:[1,2,3,4,5,6,7,8,9,10,11,12]},
        {b:3, exps:[1,2,3,4,5,6,7,8]},
        {b:4, exps:[1,2,3,4,5,6]},
        {b:5, exps:[1,2,3,4,5,6]},
        {b:6, exps:[1,2,3,4,5]},
        {b:7, exps:[1,2,3,4,5]},{b:8, exps:[1,2,3,4,5]},
        {b:9, exps:[1,2,3,4,5]},{b:10,exps:[1,2,3,4,5]},
        {b:11,exps:[1,2,3,4,5]},{b:12,exps:[1,2,3,4]},
        {b:13,exps:[1,2,3,4]},{b:14,exps:[1,2,3,4]},{b:15,exps:[1,2,3,4]},
        {b:25,exps:[1,2,3,4]},
      ];
      const sections = bases.map(({b, exps}) => {
        const rows = exps.map(e => [`${b}^${e}`, `<span class="val">${Math.pow(b,e)}</span>`]);
        return `<div class="notes-section"><h3>Powers of ${b}</h3>${makeTable(['Power','Value'],rows,['key','val'])}</div>`;
      });
      return `
        <div class="notes-section">
          <h3>Reading Guide</h3>
          <div class="highlight">
            x¹ = x &nbsp;|&nbsp; x² = square &nbsp;|&nbsp; x³ = cube &nbsp;|&nbsp; x⁴ = fourth power &nbsp;|&nbsp; x⁵ = fifth power
          </div>
        </div>
        ${sections.join('')}`;
    },
  },

  /* ── SQUARE ROOTS ─────────────────────────────────────── */
  {
    id: 'sqroots', label: 'Square Roots', icon: '√n', color: '#5B21B6',
    desc: '√1 to √16 with memory tricks.',
    buildContent() {
      const data = [
        [1,'1.000'],[2,'1.414'],[3,'1.732'],[4,'2.000'],[5,'2.236'],
        [6,'2.449'],[7,'2.646'],[8,'2.828'],[9,'3.000'],[10,'3.162'],
        [11,'3.317'],[12,'3.464'],[13,'3.606'],[14,'3.742'],[15,'3.873'],[16,'4.000'],
      ];
      const rows = data.map(([n, v]) => [`√${n}`, `<span class="val">${v}</span>`]);
      return `
        <div class="notes-section">
          <h3>Memory Tricks</h3>
          <div class="highlight">
            √2 ≈ 1.414 — "I wish I knew" (1-4-1-4)<br>
            √3 ≈ 1.732 — "1 point Shakespeare" (1-7-3-2)<br>
            √5 ≈ 2.236 — Remember: 2.236<br>
            Perfect squares: √1=1, √4=2, √9=3, √16=4 — memorise these first
          </div>
        </div>
        <div class="notes-section">
          <h3>Table — √1 to √16</h3>
          ${makeTable(['Expression', 'Value (3 d.p.)'], rows, ['key','val'])}
        </div>`;
    },
  },

  /* ── FACTORIALS ───────────────────────────────────────── */
  {
    id: 'factorials', label: 'Factorials', icon: 'n!', color: '#92400E',
    desc: '0! to 10! with definitions and special properties.',
    buildContent() {
      const data = [
        [0,'1','0! = 1 by definition'],
        [1,'1','1! = 1'],
        [2,'2','2×1'],
        [3,'6','3×2×1'],
        [4,'24','4×3×2×1'],
        [5,'120','5×4×3×2×1'],
        [6,'720','6!'],
        [7,'5040','7!'],
        [8,'40320','8!'],
        [9,'362880','9!'],
        [10,'3628800','10!'],
      ];
      const rows = data.map(([n, v, note]) => [`${n}!`, `<span class="val">${v}</span>`, `<span style="color:var(--muted-light);font-size:0.8em">${note}</span>`]);
      return `
        <div class="notes-section">
          <h3>Definition</h3>
          <div class="highlight">
            n! = n × (n−1) × (n−2) × … × 2 × 1<br>
            Special: 0! = 1 (by definition)<br><br>
            ⭐ Special numbers whose digit factorials sum to themselves:<br>
            1, 2, 145, 40585<br>
            e.g. 145 → 1! + 4! + 5! = 1 + 24 + 120 = 145 ✓
          </div>
        </div>
        <div class="notes-section">
          <h3>Factorial Table — 0! to 10!</h3>
          ${makeTable(['n!', 'Value', 'Breakdown'], rows)}
        </div>`;
    },
  },

  /* ── SERIES FORMULAS ──────────────────────────────────── */
  {
    id: 'series', label: 'Series Formulas', icon: 'Σ', color: '#065F46',
    desc: 'Sum-of-series formulas with examples.',
    buildContent() {
      const rows = [
        ['Sum of first n natural numbers',    'n(n+1) / 2',                       'n=5 → 15'],
        ['Sum of first n odd numbers',         'n²',                               'n=4 → 16'],
        ['Sum of first n even numbers',        'n(n+1)',                            'n=4 → 20'],
        ['Sum of squares 1²+2²+…+n²',         'n(n+1)(2n+1) / 6',                 'n=3 → 14'],
        ['Sum of cubes 1³+2³+…+n³',           '[n(n+1)/2]²',                      'n=3 → 36'],
        ['Sum of 4th powers 1⁴+…+n⁴',        'n(n+1)(2n+1)(3n²+3n−1) / 30',     'n=2 → 17'],
      ];
      const tableRows = rows.map(([c, f, ex]) => [
        c,
        `<span class="val" style="font-size:0.82em">${f}</span>`,
        `<span style="color:var(--muted-light);font-size:0.8em">${ex}</span>`
      ]);
      return `
        <div class="notes-section">
          <h3>All Formulas</h3>
          ${makeTable(['Series', 'Formula', 'Example'], tableRows)}
        </div>
        <div class="notes-section">
          <h3>Quick Verification</h3>
          <div class="highlight">
            Sum 1+2+3+4+5 = 15 → n=5: 5×6/2 = 15 ✓<br>
            Sum 1+3+5+7 = 16 → n=4: 4² = 16 ✓<br>
            1²+2²+3² = 1+4+9 = 14 → n=3: 3×4×7/6 = 14 ✓
          </div>
        </div>`;
    },
  },

  /* ── PRIME NUMBERS ────────────────────────────────────── */
  {
    id: 'primes', label: 'Prime Numbers', icon: 'P#', color: '#1E3A5F',
    desc: 'Primes up to 200, last digit patterns, key rules.',
    buildContent() {
      const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,
        73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,
        157,163,167,173,179,181,191,193,197,199];

      const rows = [];
      for (let i = 0; i < primes.length; i += 5) {
        rows.push(primes.slice(i, i+5).map(p => `<span class="val">${p}</span>`));
      }

      return `
        <div class="notes-section">
          <h3>Key Rules</h3>
          <div class="highlight">
            • Only one even prime: 2<br>
            • Only one prime ending in 5: 5 itself<br>
            • All other primes end in 1, 3, 7, or 9<br>
            • A prime is divisible only by 1 and itself<br>
            • To test if n is prime: check divisibility by primes up to √n
          </div>
        </div>
        <div class="notes-section">
          <h3>Last Digit Pattern</h3>
          ${makeTable(['Ends in','Examples','Count up to 200'],
            [['2','Only: 2','1'],['5','Only: 5','1'],['1','11,31,41,61,71…','10'],['3','3,13,23,43,53…','12'],['7','7,17,37,47,67…','12'],['9','19,29,59,79,89…','10']]
          )}
        </div>
        <div class="notes-section">
          <h3>All Primes up to 200</h3>
          ${makeTable(['','','','',''], rows)}
        </div>`;
    },
  },

];

/* ══════════════════════════════════════════════════════
   LEARN PAGE CONTROLLER
══════════════════════════════════════════════════════ */

let _currentLearnTopic = null;

function buildLearnHome() {
  const grid = document.getElementById('learnGrid');
  if (!grid) return;
  grid.innerHTML = '';
  LEARN_TOPICS.forEach(t => {
    const card = document.createElement('a');
    card.className = 'learn-card';
    card.href = '#';
    card.style.setProperty('--card-accent', t.color);
    card.innerHTML = `
      <span class="lc-icon">${t.icon}</span>
      <h3>${t.label}</h3>
      <p>${t.desc}</p>`;
    card.addEventListener('click', e => { e.preventDefault(); openLearnTopic(t.id); });
    grid.appendChild(card);
  });
}

function openLearnTopic(id) {
  const topic = LEARN_TOPICS.find(t => t.id === id);
  if (!topic) return;
  _currentLearnTopic = id;

  document.getElementById('learnHome').classList.add('hidden');
  const page = document.getElementById('learnTopicPage');
  page.classList.remove('hidden');

  document.getElementById('learnTopicIcon').textContent  = topic.icon;
  document.getElementById('learnTopicTitle').textContent = topic.label;
  document.getElementById('learnTopicDesc').textContent  = topic.desc;
  document.getElementById('learnTopicContent').innerHTML = topic.buildContent();

  window.scrollTo(0, 0);
}

function backToLearnHome() {
  _currentLearnTopic = null;
  document.getElementById('learnHome').classList.remove('hidden');
  document.getElementById('learnTopicPage').classList.add('hidden');
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', buildLearnHome);
