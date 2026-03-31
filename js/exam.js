/**
 * exam.js — Exam engine.
 * Key behaviour: answer submitted → instant next question, no right/wrong shown.
 * Depends on: topics.js, ui.js, AppState
 */
'use strict';

const TIMER_CIRCUMFERENCE = 238.76;

function startExam() {
  const totalQ   = Math.min(100, Math.max(1, getSettingVal('qCountPills', 'qCountCustom', 10)));
  const timerSec = Math.min(120, Math.max(2,  getSettingVal('timerPills',  'timerCustom',  5)));

  AppState.totalQ   = totalQ;
  AppState.timerSec = timerSec;
  AppState.qIndex   = 0;
  AppState.results  = [];
  AppState.examRunning = true;

  AppState.questions = [];
  if (AppState.currentTopic === 'random') {
    for (let i = 0; i < totalQ; i++) AppState.questions.push(pick(TOPICS).generate());
  } else {
    const topic = TOPICS.find(t => t.id === AppState.currentTopic);
    for (let i = 0; i < totalQ; i++) AppState.questions.push(topic.generate());
  }

  showScreen('exam');
  loadQuestion();
}

function loadQuestion() {
  if (AppState.qIndex >= AppState.questions.length) { showResults(); return; }

  const q     = AppState.questions[AppState.qIndex];
  const total = AppState.questions.length;

  document.getElementById('examProgressInfo').textContent = `Q ${AppState.qIndex + 1} / ${total}`;
  document.getElementById('progressFill').style.width     = `${(AppState.qIndex / total) * 100}%`;
  updateScoreLive();

  document.getElementById('qTopicTag').innerHTML =
    `<span class="tag" style="background:#D9770618;color:#D97706;border:1px solid #D9770640">${q.topicLabel}</span>`;
  document.getElementById('qText').innerHTML = q.question;

  if (q.type === 'input') {
    document.getElementById('inputWrap').classList.remove('hidden');
    document.getElementById('mcqWrap').classList.add('hidden');
    const inp = document.getElementById('answerInput');
    inp.value = ''; inp.className = 'answer-input'; inp.disabled = false;
    inp.focus();
  } else {
    document.getElementById('inputWrap').classList.add('hidden');
    document.getElementById('mcqWrap').classList.remove('hidden');
    AppState.mcqAnswered = false;
    buildMCQ(q);
  }

  animateCardIn();
  startTimer(AppState.timerSec);
}

function buildMCQ(q) {
  const grid = document.getElementById('mcqGrid');
  grid.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'mcq-btn';
    btn.innerHTML = `<span>${choice}</span>`;
    btn.addEventListener('click', () => handleMCQClick(choice, q));
    grid.appendChild(btn);
  });
}

/* ── Answer submission — instant move, no visible feedback ── */

function submitAnswer() {
  const inp = document.getElementById('answerInput');
  const raw = inp.value.trim();
  if (!raw) return;
  clearTimer();
  inp.disabled = true;
  const q = AppState.questions[AppState.qIndex];
  recordResult(q, raw, checkAnswer(raw, q) ? 'correct' : 'wrong');
  nextQuestion();          // ← instant, no delay, no feedback shown
}

function skipQuestion() {
  clearTimer();
  const q = AppState.questions[AppState.qIndex];
  recordResult(q, '', 'skip');
  nextQuestion();
}

function handleMCQClick(chosen, q) {
  if (AppState.mcqAnswered) return;
  AppState.mcqAnswered = true;
  clearTimer();
  document.querySelectorAll('.mcq-btn').forEach(b => b.disabled = true);
  recordResult(q, chosen, chosen === q.answer ? 'correct' : 'wrong');
  nextQuestion();          // ← instant
}

function checkAnswer(raw, q) {
  const user    = raw.toLowerCase().trim().replace(/\s+/g, '');
  const correct = String(q.answer).toLowerCase().trim().replace(/\s+/g, '');
  if (user === correct) return true;
  if (correct === 'yes' && ['yes','y'].includes(user)) return true;
  if (correct === 'no'  && ['no', 'n'].includes(user))  return true;
  const uNum = parseFloat(user), cNum = parseFloat(correct);
  if (!isNaN(uNum) && !isNaN(cNum) && Math.abs(uNum - cNum) <= 0.005) return true;
  return false;
}

function nextQuestion() { AppState.qIndex++; loadQuestion(); }

function recordResult(q, given, status) { AppState.results.push({ q, given, status }); }

function updateScoreLive() {
  const correct = AppState.results.filter(r => r.status === 'correct').length;
  const wrong   = AppState.results.filter(r => r.status !== 'correct').length;
  document.getElementById('scoreLive').innerHTML =
    `<span class="c">✓ ${correct}</span>&nbsp;<span class="w">✗ ${wrong}</span>`;
}

/* ── Timer ─────────────────────────────────────────────── */

function startTimer(sec) {
  clearTimer();
  AppState.timeLeft = sec;
  renderTimer(sec, sec);
  AppState.timerInterval = setInterval(() => {
    AppState.timeLeft--;
    renderTimer(AppState.timeLeft, sec);
    if (AppState.timeLeft <= 0) { clearTimer(); handleTimeout(); }
  }, 1000);
}

function renderTimer(left, total) {
  const pct    = Math.max(0, left / total);
  const offset = TIMER_CIRCUMFERENCE * (1 - pct);
  const ring   = document.getElementById('timerRing');
  const num    = document.getElementById('timerNum');
  ring.style.strokeDashoffset = offset;
  num.textContent = left;
  ring.style.stroke = pct > 0.5 ? '#D97706' : pct > 0.25 ? '#F59E0B' : '#DC2626';
}

function clearTimer() {
  if (AppState.timerInterval) { clearInterval(AppState.timerInterval); AppState.timerInterval = null; }
}

function handleTimeout() {
  const q = AppState.questions[AppState.qIndex];
  if (q.type === 'mcq') {
    AppState.mcqAnswered = true;
    document.querySelectorAll('.mcq-btn').forEach(b => b.disabled = true);
  } else {
    document.getElementById('answerInput').disabled = true;
  }
  recordResult(q, '', 'timeout');
  nextQuestion();          // ← instant on timeout too
}

function retryExam() { startExam(); }
