/**
 * main.js — App state, keyboard shortcuts, bootstrap.
 * Must load LAST (after all other scripts).
 */
'use strict';

const AppState = {
  currentTopic:  null,
  questions:     [],
  qIndex:        0,
  results:       [],
  timerSec:      5,
  totalQ:        10,
  timerInterval: null,
  timeLeft:      5,
  mcqAnswered:   false,
  examRunning:   false,
};

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && AppState.examRunning) {
    const inp = document.getElementById('answerInput');
    if (inp && !inp.disabled && !document.getElementById('inputWrap').classList.contains('hidden')) {
      submitAnswer();
    }
  }
  if (e.key === 'Escape' && !AppState.examRunning) showHome();
});

function init() {
  if (document.getElementById('qCountPills')) {
    initPills('qCountPills', 'qCountLabel', 'qCountCustomWrap', '');
    initPills('timerPills',  'timerLabel',  'timerCustomWrap',  's');
    buildHome();
  }
}

document.addEventListener('DOMContentLoaded', init);
