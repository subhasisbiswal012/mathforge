/**
 * results.js — Results screen, meme sounds, funny quotes.
 * Depends on: AppState (main.js)
 *
 * SOUND FILES — drop your MP3/WAV files into the sounds/ folder:
 *   sounds/perfect.mp3    → 100%
 *   sounds/excellent.mp3  → 95–99%
 *   sounds/good.mp3       → 90–94%
 *   sounds/okay.mp3       → 85–89%
 *   sounds/meh.mp3        → 80–84%
 *   sounds/bad_1.mp3      → below 80% (one picked randomly from all bad_*.mp3 files)
 *   sounds/bad_2.mp3      Add as many bad_N.mp3 as you want — just update BAD_SOUNDS below.
 *   sounds/bad_3.mp3
 *   sounds/bad_4.mp3
 *   sounds/bad_5.mp3
 *   sounds/bad_6.mp3
 *   sounds/bad_7.mp3
 *   sounds/bad_8.mp3
 *   sounds/bad_9.mp3
 */
'use strict';

let _fullResults      = [];
let _currentSoundFile = null; // remembered so the replay button can reuse it

/* ── Bad sounds loaded dynamically from sounds/manifest.json ──
   To add a new bad sound:
     1. Drop the file into the sounds/ folder (e.g. bad_10.mp3)
     2. Add its filename to sounds/manifest.json under "bad"
     3. Done — no code changes needed here.
─────────────────────────────────────────────────────────── */
let BAD_SOUNDS = []; // populated at startup by loadSoundManifest()

/**
 * Fetch sounds/manifest.json and populate BAD_SOUNDS.
 * Called once when the page loads.
 */
function loadSoundManifest() {
  fetch('sounds/manifest.json')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      BAD_SOUNDS = (data.bad || []).map(function(f) {
        return 'sounds/' + f;
      });
    })
    .catch(function() {
      // manifest missing or fetch failed — silently continue with no bad sounds
      BAD_SOUNDS = [];
    });
}

// Load manifest immediately when script runs
loadSoundManifest();

/* ── Funny quotes by score bracket ──────────────────────── */
const QUOTES = {
  perfect: [
    "Bhai calculator chhod, tu khud calculator hai. 🤖",
    "100%? Are you even human? Sir, this is a maths quiz not a flex competition.",
    "Sigma male grindset activated. 📈 No cap.",
    "Legend says he still hasn't stopped. 🏆",
    "Your ancestors are doing a standing ovation right now.",
  ],
  excellent: [
    "Almost perfect. Your ego is writing cheques your score can't cash... wait, it nearly can. 😤",
    "95%+ and you're still reading quotes? Go touch grass. 🌿",
    "NPC classmates watching you: 👁️👄👁️",
    "That one wrong answer is going to haunt you tonight. We both know it. 👻",
    "One slip. ONE. Your ancestors are shaking their heads slightly.",
  ],
  good: [
    "90%+ aaya toh kya? CAT mein 99 percentile chahiye bhai. 😂",
    "Good but not great. Like dal without ghee. Edible, but missing something.",
    "Your brain cells had a meeting and most of them showed up. Progress!",
    "Solid. But imagine if you had studied instead of watching reels last night. 📱",
    "The math is mathing. But only 90% of the time.",
  ],
  okay: [
    "85%? Your maths teacher would say 'scope for improvement'. Bhai scope toh hai. 📉",
    "Not bad. Not great. Mathematically speaking, you're mediocre. But medically? Alive!",
    "The glass is 85% full. Also 15% empty. Also you need to study more.",
    "This is giving 'prepared the night before the exam' energy. Respect for the hustle.",
    "Achievement unlocked: 'Technically Did Fine' 🏅",
  ],
  meh: [
    "80%. Right on the boundary between 'I studied' and 'I definitely did not study'. 😅",
    "Bhai, itne mein kya hoga? Ek aur attempt maar. 🔄",
    "Your calculator is disappointed. Your abacus too. Even your fingers are judging.",
    "This score is giving main character who peaked in childhood vibes.",
    "The maths is not mathing at full speed. Time to reload.",
  ],
  bad: [
    "Bhai ye bhi nahi aata?? 💀 This is a cry for help.",
    "GTA wasted screen plays internally. Respawn aur dobara try kar. 🕹️",
    "Your score called. It said it's embarrassed to be associated with you.",
    "The numbers have spoken. They are not pleased. 📉",
    "Even the calculator is crying rn. Bro needs therapy and practice. Mostly practice.",
    "This is not a score, this is a distress signal. 🆘",
    "Achievement unlocked: 'I showed up' 🥺 That's literally it.",
    "Windows XP error sound plays in the distance 🪟💔",
    "Sir, please open the Learn tab. It's right there. FOR FREE. 📖",
    "Your ancestors did not survive 10,000 years for this score. Get back to work. 💪",
  ],
};

/* ── Sound playback ──────────────────────────────────────── */

function getSoundFile(pct) {
  if (pct === 100) return 'sounds/perfect.mp3';
  if (pct >= 95)   return 'sounds/excellent.mp3';
  if (pct >= 90)   return 'sounds/good.mp3';
  if (pct >= 85)   return 'sounds/okay.mp3';
  if (pct >= 80)   return 'sounds/meh.mp3';
  // Pick randomly from however many files are listed in sounds/manifest.json
  if (BAD_SOUNDS.length === 0) return null;
  var idx = Math.floor(Math.random() * BAD_SOUNDS.length);
  return BAD_SOUNDS[idx];
}

/**
 * Play a sound file N times in sequence.
 * Each play starts only after the previous one ends.
 * Silently fails if the file doesn't exist.
 */
function playSoundNTimes(file, times) {
  if (!file) return;
  let remaining = times;

  function playOnce() {
    if (remaining <= 0) return;
    remaining--;
    try {
      const audio = new Audio(file);
      audio.volume = 0.7;
      audio.addEventListener('ended', playOnce);
      audio.play().catch(function() {});
    } catch (e) {}
  }

  playOnce();
}

/**
 * Triggered by the "🔊 Your Review Sound" button.
 * Replays the result sound once on demand.
 */
function replayResultSound() {
  if (!_currentSoundFile) return;
  var btn = document.getElementById('replaySoundBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '🔊 Playing…';
    setTimeout(function() {
      btn.disabled = false;
      btn.textContent = '🔊 Your Review Sound';
    }, 4000);
  }
  playSoundNTimes(_currentSoundFile, 1);
}

/* ── Quote selector ──────────────────────────────────────── */

function getFunnyQuote(pct) {
  var pool;
  if (pct === 100)    pool = QUOTES.perfect;
  else if (pct >= 95) pool = QUOTES.excellent;
  else if (pct >= 90) pool = QUOTES.good;
  else if (pct >= 85) pool = QUOTES.okay;
  else if (pct >= 80) pool = QUOTES.meh;
  else                pool = QUOTES.bad;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ── Main results render ─────────────────────────────────── */

function showResults() {
  clearTimer();
  AppState.examRunning = false;
  _fullResults = [].concat(AppState.results);

  var total   = _fullResults.length;
  var correct = _fullResults.filter(function(r){ return r.status === 'correct'; }).length;
  var wrong   = _fullResults.filter(function(r){ return r.status === 'wrong'; }).length;
  var timeout = _fullResults.filter(function(r){ return r.status === 'timeout'; }).length;
  var skipped = _fullResults.filter(function(r){ return r.status === 'skip'; }).length;
  var pct     = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Determine + remember sound file for this score
  _currentSoundFile = getSoundFile(pct);

  document.getElementById('scoreBig').textContent = correct + '/' + total;
  document.getElementById('scorePct').textContent  = pct + '%';

  var heading =
    pct === 100 ? '🏆 PERFECT SCORE!' :
    pct >= 95   ? '🔥 Excellent!'     :
    pct >= 90   ? '📈 Great work'     :
    pct >= 80   ? '👍 Decent effort'  :
    pct >= 60   ? '📚 Keep going'     : '💪 Don\'t give up';

  document.getElementById('resultsHeading').textContent  = heading;
  document.getElementById('resultsSubtitle').textContent =
    total + ' question' + (total !== 1 ? 's' : '') + ' · ' + AppState.timerSec + 's timer';

  document.getElementById('funnyQuote').textContent = getFunnyQuote(pct);

  document.getElementById('resultsStats').innerHTML =
    '<span class="stat-pill c">✅ Correct: ' + correct + '</span>' +
    '<span class="stat-pill w">❌ Wrong: ' + wrong + '</span>' +
    (timeout > 0 ? '<span class="stat-pill t">⏱ Timeout: ' + timeout + '</span>' : '') +
    (skipped > 0 ? '<span class="stat-pill t">→ Skipped: ' + skipped + '</span>' : '');

  animateScoreRing(pct);
  renderResultsList('all');

  document.querySelectorAll('.filter-tab').forEach(function(t){ t.classList.remove('active'); });
  document.querySelector('.filter-tab').classList.add('active');

  showScreen('results');

  // Play 3 times automatically
  setTimeout(function(){ playSoundNTimes(_currentSoundFile, 3); }, 600);
}

function animateScoreRing(pct) {
  var circumference = 351.86;
  var ring = document.getElementById('scoreRingFill');
  ring.style.transition = 'none';
  ring.style.strokeDashoffset = circumference;
  ring.style.stroke = pct >= 60 ? '#65A30D' : pct >= 40 ? '#D97706' : '#DC2626';
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      ring.style.transition = 'stroke-dashoffset 1.2s ease';
      ring.style.strokeDashoffset = circumference * (1 - pct / 100);
    });
  });
}

function renderResultsList(filter) {
  var list = document.getElementById('resultsList');
  list.innerHTML = '';

  var filtered = _fullResults.filter(function(r) {
    if (filter === 'all')     return true;
    if (filter === 'timeout') return r.status === 'timeout' || r.status === 'skip';
    return r.status === filter;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--muted);font-style:italic;padding:32px 0">No results in this category.</p>';
    return;
  }

  filtered.forEach(function(r) {
    var icon     = r.status === 'correct' ? '✅' : r.status === 'timeout' ? '⏱' : r.status === 'skip' ? '→' : '❌';
    var cssClass = r.status === 'correct' ? 'r-correct' : (r.status === 'timeout' || r.status === 'skip') ? 'r-timeout' : 'r-wrong';

    var tmp = document.createElement('div');
    tmp.innerHTML = r.q.question;
    var qText = tmp.textContent;

    var answersHTML = r.status !== 'correct'
      ? '<div class="your wrong-ans">' + (r.given || '(no answer)') + '</div><div class="correct-ans">✓ ' + r.q.answer + '</div>'
      : '<div class="correct-ans">✓ ' + r.q.answer + '</div>';

    var item = document.createElement('div');
    item.className = 'result-item ' + cssClass;
    item.innerHTML =
      '<div class="r-icon">' + icon + '</div>' +
      '<div><div class="r-q">' + qText + '</div><div class="r-topic">' + r.q.topicLabel + '</div></div>' +
      '<div class="r-answers">' + answersHTML + '</div>';
    list.appendChild(item);
  });
}

function filterResults(filter, btn) {
  document.querySelectorAll('.filter-tab').forEach(function(t){ t.classList.remove('active'); });
  btn.classList.add('active');
  renderResultsList(filter);
}
