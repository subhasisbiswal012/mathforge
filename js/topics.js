/**
 * topics.js — MathForge Topic Definitions
 * ════════════════════════════════════════
 *
 * HOW TO ADD A NEW TOPIC
 * ──────────────────────
 * 1. Add a topic object to the TOPICS array below.
 * 2. Add a matching entry to LEARN_TOPICS in learn.js with the notes content.
 * 3. That's it — both Practice and Learn pick it up automatically.
 *
 * TOPIC SCHEMA
 * ────────────
 * {
 *   id:       string    — unique slug
 *   label:    string    — display name
 *   icon:     string    — short symbol / emoji shown on card
 *   color:    string    — CSS hex for card accent bar
 *   desc:     string    — one-line description on card
 *   count:    number    — approximate pool size (display only)
 *   generate: Function  — returns one Question object
 * }
 *
 * QUESTION SCHEMA
 * ───────────────
 * {
 *   question:   string            — HTML ok; wrap numbers in <span class="math">
 *   answer:     string            — canonical correct answer (string)
 *   type:       'input' | 'mcq'  — input = text field, mcq = 4 choices
 *   choices:    string[]          — required for mcq; must include the answer
 *   topic:      string            — copy of topic.id
 *   topicLabel: string            — copy of topic.label
 *   hint:       string            — shown after wrong / timeout in results
 * }
 */

'use strict';

/* ── Shared helpers ───────────────────────────────────── */
function rnd(a, b)  { return Math.floor(Math.random() * (b - a + 1)) + a; }
function pick(arr)  { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── TOPICS ───────────────────────────────────────────── */
const TOPICS = [

  /* 1. SQUARES */
  {
    id: 'squares', label: 'Squares', icon: 'n²', color: '#B45309',
    desc: 'n² for n = 2 to 30. Recall perfect squares instantly.',
    count: 29,
    generate() {
      const n = rnd(2, 30), ans = n * n;
      return {
        question: `What is <span class="math">${n}²</span> ?`,
        answer: String(ans), type: 'input',
        topic: this.id, topicLabel: this.label,
        hint: `${n} × ${n} = ${ans}`,
      };
    },
  },

  /* 2. CUBES */
  {
    id: 'cubes', label: 'Cubes', icon: 'n³', color: '#7C3020',
    desc: 'n³ for n = 2 to 30. Build cube number memory.',
    count: 29,
    generate() {
      const n = rnd(2, 30), ans = n * n * n;
      return {
        question: `What is <span class="math">${n}³</span> ?`,
        answer: String(ans), type: 'input',
        topic: this.id, topicLabel: this.label,
        hint: `${n} × ${n} × ${n} = ${ans}`,
      };
    },
  },

  /* 3. RECIPROCALS — DECIMAL */
  {
    id: 'recip-dec', label: 'Reciprocals (Decimal)', icon: '1/n', color: '#065F46',
    desc: 'Convert fractions to decimals. 1/7, 3/8, 5/11…',
    count: 33,
    generate() {
      const pool = [
        ['1/2','0.5'],['1/3','0.333'],['2/3','0.667'],['1/4','0.25'],['3/4','0.75'],
        ['1/5','0.2'],['2/5','0.4'],['3/5','0.6'],['4/5','0.8'],
        ['1/6','0.167'],['5/6','0.833'],
        ['1/7','0.143'],['2/7','0.286'],['3/7','0.429'],['4/7','0.571'],['5/7','0.714'],['6/7','0.857'],
        ['1/8','0.125'],['3/8','0.375'],['5/8','0.625'],['7/8','0.875'],
        ['1/9','0.111'],['2/9','0.222'],['4/9','0.444'],['5/9','0.556'],['7/9','0.778'],['8/9','0.889'],
        ['1/10','0.1'],['3/10','0.3'],['7/10','0.7'],['9/10','0.9'],
        ['1/11','0.091'],['1/12','0.083'],
      ];
      const [frac, dec] = pick(pool);
      return {
        question: `<span class="math">${frac}</span> as a decimal?`,
        answer: dec, type: 'input',
        topic: this.id, topicLabel: this.label,
        hint: `${frac} ≈ ${dec}`,
      };
    },
  },

  /* 4. RECIPROCALS — PERCENTAGE */
  {
    id: 'recip-pct', label: 'Reciprocals (%)', icon: '1/n%', color: '#1E3A5F',
    desc: 'Convert fractions to percentages. 1/7 = 14.29%…',
    count: 34,
    generate() {
      const pool = [
        ['1/2','50'],['1/3','33.33'],['2/3','66.67'],['1/4','25'],['3/4','75'],
        ['1/5','20'],['2/5','40'],['3/5','60'],['4/5','80'],
        ['1/6','16.67'],['5/6','83.33'],
        ['1/7','14.29'],['2/7','28.57'],['3/7','42.86'],['4/7','57.14'],['5/7','71.43'],['6/7','85.71'],
        ['1/8','12.5'],['3/8','37.5'],['5/8','62.5'],['7/8','87.5'],
        ['1/9','11.11'],['2/9','22.22'],['4/9','44.44'],['5/9','55.56'],['7/9','77.78'],['8/9','88.89'],
        ['1/10','10'],['3/10','30'],['7/10','70'],['9/10','90'],
        ['1/11','9.09'],['1/12','8.33'],['1/13','7.69'],['1/20','5'],
      ];
      const [frac, pct] = pick(pool);
      return {
        question: `<span class="math">${frac}</span> as a percentage? <span style="font-size:0.65em;color:var(--muted)">(no % sign)</span>`,
        answer: pct, type: 'input',
        topic: this.id, topicLabel: this.label,
        hint: `${frac} = ${pct}%`,
      };
    },
  },

  /* 5. POWERS */
  {
    id: 'powers', label: 'Powers', icon: 'xⁿ', color: '#3730A3',
    desc: 'Powers of 2–15 and 25, up to the 12th power.',
    count: 65,
    generate() {
      const bases = [
        {b:2,maxExp:12},{b:3,maxExp:8},{b:4,maxExp:6},{b:5,maxExp:6},{b:6,maxExp:5},
        {b:7,maxExp:5},{b:8,maxExp:5},{b:9,maxExp:5},{b:10,maxExp:5},{b:11,maxExp:5},
        {b:12,maxExp:4},{b:13,maxExp:4},{b:14,maxExp:4},{b:15,maxExp:4},{b:25,maxExp:4},
      ];
      const {b, maxExp} = pick(bases);
      const exp = rnd(1, maxExp);
      const ans = Math.pow(b, exp);
      const sup = {1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',6:'⁶',7:'⁷',8:'⁸',9:'⁹',10:'¹⁰',11:'¹¹',12:'¹²'};
      return {
        question: `What is <span class="math">${b}${sup[exp]||'^'+exp}</span> ?`,
        answer: String(ans), type: 'input',
        topic: this.id, topicLabel: this.label,
        hint: `${b}^${exp} = ${ans}`,
      };
    },
  },

  /* 6. SQUARE ROOTS */
  {
    id: 'sqroots', label: 'Square Roots', icon: '√n', color: '#5B21B6',
    desc: '√1 to √16 — answer to 3 decimal places.',
    count: 16,
    generate() {
      const pool = [
        [1,'1.000'],[2,'1.414'],[3,'1.732'],[4,'2.000'],[5,'2.236'],
        [6,'2.449'],[7,'2.646'],[8,'2.828'],[9,'3.000'],[10,'3.162'],
        [11,'3.317'],[12,'3.464'],[13,'3.606'],[14,'3.742'],[15,'3.873'],[16,'4.000'],
      ];
      const [n, ans] = pick(pool);
      return {
        question: `What is <span class="math">√${n}</span> ? <span style="font-size:0.65em;color:var(--muted)">(3 decimal places)</span>`,
        answer: ans, type: 'input',
        topic: this.id, topicLabel: this.label,
        hint: `√${n} ≈ ${ans}`,
      };
    },
  },

  /* 7. FACTORIALS */
  {
    id: 'factorials', label: 'Factorials', icon: 'n!', color: '#92400E',
    desc: '0! to 10! — from 1 all the way to 3,628,800.',
    count: 11,
    generate() {
      const pool = [
        [0,'1'],[1,'1'],[2,'2'],[3,'6'],[4,'24'],[5,'120'],
        [6,'720'],[7,'5040'],[8,'40320'],[9,'362880'],[10,'3628800'],
      ];
      const [n, ans] = pick(pool);
      return {
        question: `What is <span class="math">${n}!</span> ?`,
        answer: ans, type: 'input',
        topic: this.id, topicLabel: this.label,
        hint: `${n}! = ${ans}`,
      };
    },
  },

  /* 8. SERIES FORMULAS (MCQ) */
  {
    id: 'series', label: 'Series Formulas', icon: 'Σ', color: '#065F46',
    desc: 'MCQ: identify sum-of-series formulas.',
    count: 6,
    generate() {
      const pool = [
        {
          question: 'Formula for sum of first <span class="math">n</span> natural numbers?',
          answer: 'n(n+1)/2', choices: ['n(n+1)/2','n²','n(n-1)/2','n(n+1)(2n+1)/6'],
          hint: '1+2+…+n = n(n+1)/2',
        },
        {
          question: 'Sum of first <span class="math">n</span> odd numbers?',
          answer: 'n²', choices: ['n²','n(n+1)/2','n(n+1)','2n−1'],
          hint: '1+3+5+…+(2n−1) = n²',
        },
        {
          question: 'Sum of first <span class="math">n</span> even numbers?',
          answer: 'n(n+1)', choices: ['n(n+1)','n²','n(n−1)','n(n+2)'],
          hint: '2+4+6+…+2n = n(n+1)',
        },
        {
          question: 'Sum of squares: <span class="math">1²+2²+…+n²</span> ?',
          answer: 'n(n+1)(2n+1)/6', choices: ['n(n+1)(2n+1)/6','[n(n+1)/2]²','n(n+1)/2','n²(n+1)/2'],
          hint: 'Sum of squares = n(n+1)(2n+1)/6',
        },
        {
          question: 'Sum of cubes: <span class="math">1³+2³+…+n³</span> ?',
          answer: '[n(n+1)/2]²', choices: ['[n(n+1)/2]²','n(n+1)(2n+1)/6','n²(n+1)²/2','n³(n+1)/4'],
          hint: 'Sum of cubes = [n(n+1)/2]²',
        },
        {
          question: 'Sum of 4th powers: <span class="math">1⁴+…+n⁴</span> ?',
          answer: 'n(n+1)(2n+1)(3n²+3n−1)/30',
          choices: ['n(n+1)(2n+1)(3n²+3n−1)/30','n²(n+1)²(2n²+2n−1)/12','[n(n+1)/2]³','n(n+1)(2n+1)/6'],
          hint: 'Sum of 4th powers = n(n+1)(2n+1)(3n²+3n−1)/30',
        },
      ];
      const item = pick(pool);
      return {
        question: item.question, answer: item.answer, type: 'mcq',
        choices: shuffle(item.choices),
        topic: this.id, topicLabel: this.label, hint: item.hint,
      };
    },
  },

  /* 9. PRIME NUMBERS */
  {
    id: 'primes', label: 'Prime Numbers', icon: 'P#', color: '#1E3A5F',
    desc: 'Is it prime? YES/NO. Mixed with last-digit rules.',
    count: 50,
    generate() {
      const PRIME_SET = new Set([
        2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,
        73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,
        157,163,167,173,179,181,191,193,197,199,
      ]);
      if (Math.random() < 0.75) {
        const n = rnd(2, 199), isPrime = PRIME_SET.has(n);
        return {
          question: `Is <span class="math">${n}</span> a prime number? <span style="font-size:0.65em;color:var(--muted)">(YES or NO)</span>`,
          answer: isPrime ? 'yes' : 'no', type: 'input',
          topic: this.id, topicLabel: this.label,
          hint: isPrime ? `${n} is prime` : `${n} is not prime`,
        };
      }
      const rules = [
        { question: 'Can a prime (other than 2) end in an even digit? (YES or NO)', answer: 'no', hint: 'Even numbers are divisible by 2.' },
        { question: 'Except for 5, can a prime end in digit <span class="math">5</span>? (YES or NO)', answer: 'no', hint: 'Numbers ending in 5 are divisible by 5.' },
        { question: 'All primes > 5 must end in 1, 3, 7, or <span class="math">?</span>', answer: '9', hint: 'Primes > 5 always end in 1, 3, 7, or 9.' },
        { question: 'Is every odd number prime? (YES or NO)', answer: 'no', hint: 'e.g. 9 = 3×3, 15 = 3×5.' },
        { question: 'How many even prime numbers exist?', answer: '1', hint: 'Only 2 is an even prime.' },
      ];
      const r = pick(rules);
      return { ...r, type: 'input', topic: this.id, topicLabel: this.label };
    },
  },

  /* 10. MULTIPLICATION TABLES */
  {
    id: 'multiplication', label: 'Multiplication Tables', icon: '×', color: '#065F46',
    desc: 'Tables 2 to 30 × 1 to 10. Instant recall.',
    count: 290,
    generate() {
      const a = rnd(2, 30), b = rnd(1, 10), ans = a * b;
      return {
        question: `<span class="math">${a} × ${b}</span> = ?`,
        answer: String(ans), type: 'input',
        topic: this.id, topicLabel: this.label,
        hint: `${a} × ${b} = ${ans}`,
      };
    },
  },

];

/*
 * ════════════════════════════════════════════════════════
 *  ADD NEW TOPICS HERE — push a new object into TOPICS.
 *  Then add a matching entry in LEARN_TOPICS (learn.js).
 * ════════════════════════════════════════════════════════
 */
