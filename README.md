# ⚒ MathForge

> **Free, open-source math practice app for CAT, GMAT, SSC, and anyone wanting sharper number sense.**

No backend. No sign-up. No tracking. Just open `index.html` in any browser and start practising.

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Made with: Vanilla JS](https://img.shields.io/badge/Made%20with-Vanilla%20JS-yellow.svg)]()
[![No dependencies](https://img.shields.io/badge/Dependencies-None-green.svg)]()

---

## 🌐 Live Demo

👉 **[mathforge.github.io/mathforge]([https://mathforge.github.io/mathforge](https://subhasisbiswal012.github.io/mathforge/))** _(update once published)_

---

## ✨ Features

| Feature | Details |
|---|---|
| 📖 **Learn** | Full reference notes per topic — tables, formulas, patterns |
| ⚡ **Practice** | Timed exam with configurable question count and timer |
| 🎲 **Random Mix** | Questions from all topics at once |
| 🔊 **Meme Sounds** | Score-based audio reactions — plays 3× on results, replayable with a button |
| 😂 **Funny Quotes** | Roast/motivational quotes at results screen based on your score |
| ⏱ **Instant Move** | No right/wrong shown during exam — just pace through and review at the end |
| 📱 **Responsive** | Hamburger nav on mobile, top bar on desktop |
| 🚫 **Zero Dependencies** | Plain HTML, CSS, JavaScript — no frameworks, no build step |

---

## 📚 Topics Covered

1. Multiplication Tables (2–30 × 1–10)
2. Squares (n² for n = 2 to 30)
3. Cubes (n³ for n = 2 to 30)
4. Reciprocals — Decimal (1/2, 1/7, 3/8…)
5. Reciprocals — Percentage (1/2 = 50%, 1/7 = 14.29%…)
6. Powers (bases 2–15 and 25, up to 12th power)
7. Square Roots (√1 to √16)
8. Factorials (0! to 10!)
9. Series Formulas (MCQ — sum of n natural numbers, squares, cubes…)
10. Prime Numbers (YES/NO + last digit rules)

---

## 🗂 Project Structure

```
mathforge/
├── index.html          ← Practice page (default landing)
├── learn.html          ← Learn / Notes page
├── about.html          ← About + social links
├── css/
│   └── styles.css      ← All styles, shared across all pages
├── js/
│   ├── nav.js          ← Shared navigation (hamburger + top bar)
│   ├── topics.js       ← All topic definitions + question generators  ⬅ EDIT TO ADD TOPICS
│   ├── learn.js        ← All notes content per topic                  ⬅ EDIT TO ADD NOTES
│   ├── ui.js           ← Home screen + settings UI
│   ├── exam.js         ← Exam engine: timer, answer checking, scoring
│   ├── results.js      ← Results screen + meme sounds + funny quotes
│   └── main.js         ← AppState, keyboard shortcuts, bootstrap
├── sounds/
│   ├── README.md       ← Exact filenames + when each sound plays
│   └── *.mp3           ← Drop your own sound files here
├── LICENSE
└── README.md
```

---

## 🚀 Running Locally

No build step required.

```bash
git clone https://github.com/YOUR_USERNAME/mathforge.git
cd mathforge

# Open directly in browser
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

Or use a local server for best results:

```bash
npx serve .
# → http://localhost:3000
```

---

## 🌍 Publishing on GitHub Pages

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Source → **Deploy from a branch** → branch: **main** → folder: **/ (root)**
4. Click **Save**
5. Live at `https://YOUR_USERNAME.github.io/mathforge/` in ~1 minute

---

## ➕ Adding a New Topic

The entire app is data-driven. Adding a topic = adding one object. Zero UI changes needed.

### Step 1 — Add to `js/topics.js`

```js
TOPICS.push({
  id:    'trig',
  label: 'Trigonometry',
  icon:  '∠',
  color: '#5B21B6',
  desc:  'sin, cos, tan of standard angles.',
  count: 15,

  generate() {
    const pool = [
      { angle: 30, fn: 'sin', ans: '0.5'   },
      { angle: 45, fn: 'cos', ans: '0.707' },
      { angle: 60, fn: 'tan', ans: '1.732' },
      // add more rows…
    ];
    const q = pick(pool);
    return {
      question:   `<span class="math">${q.fn}(${q.angle}°)</span> = ?`,
      answer:     q.ans,
      type:       'input',       // 'input' or 'mcq'
      topic:      this.id,
      topicLabel: this.label,
      hint:       `${q.fn}(${q.angle}°) = ${q.ans}`,
    };
  },
});
```

### Step 2 — Add notes to `js/learn.js`

```js
LEARN_TOPICS.push({
  id:    'trig',
  label: 'Trigonometry',
  icon:  '∠',
  color: '#5B21B6',
  desc:  'sin, cos, tan reference table.',

  buildContent() {
    return `
      <div class="notes-section">
        <h3>Standard Angles</h3>
        ${makeTable(
          ['Angle', 'sin', 'cos', 'tan'],
          [
            ['0°',  '0',     '1',     '0'],
            ['30°', '0.5',   '0.866', '0.577'],
            ['45°', '0.707', '0.707', '1'],
            ['60°', '0.866', '0.5',   '1.732'],
            ['90°', '1',     '0',     '∞'],
          ]
        )}
      </div>`;
  },
});
```

**That's it.** Both the Practice and Learn sections pick it up automatically — no other file needs to change.

---

## 🔊 Adding Meme Sounds

Drop MP3 files into the `sounds/` folder with these exact filenames:

| File | Plays when |
|------|-----------|
| `perfect.mp3`   | Score = 100% |
| `excellent.mp3` | Score 95–99% |
| `good.mp3`      | Score 90–94% |
| `okay.mp3`      | Score 85–89% |
| `meh.mp3`       | Score 80–84% |
| `bad_1.mp3`     | Score below 80% (random pick) |
| `bad_2.mp3`     | Score below 80% |
| `bad_3.mp3`     | Score below 80% |
| `bad_4.mp3`     | Score below 80% |

The sound plays **3 times automatically** when results load. There's also a **"🔊 Your Review Sound"** button to replay it manually.

See `sounds/README.md` for more details and where to find free sounds.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Submit typed answer during exam |
| `Escape` | Return to home (from settings or results) |

---

## 🤝 Contributing

Pull requests are welcome!

- To add a topic → follow the guide above, open a PR
- To fix a bug → describe it in the issue first
- To suggest a feature → open a GitHub Issue

Please keep each topic self-contained inside its own object in `topics.js` and `learn.js`.

---

## 👤 About the Creator

Built by **Subhasis Biswal** — Software Engineer, CAT aspirant, and fitness enthusiast from Hyderabad.

- 💼 [LinkedIn](https://in.linkedin.com/in/subhasis-biswal-593851157)
- ▶️ [YouTube](https://www.youtube.com/@subbu.gyan19)
- ☕ [Buy Me a Coffee](https://buymeacoffee.com/subbugyan)

---

## 📄 License

[MIT](LICENSE) © 2025 Subhasis Biswal

---

<p align="center">Made with ☕ and stubbornness · No frameworks were harmed in the making of this app.</p>
