/**
 * ui.js — Home screen, settings, shared UI helpers.
 * Depends on: topics.js
 */
'use strict';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

function showHome() {
  clearTimer();
  AppState.examRunning = false;
  showScreen('home');
}

function buildHome() {
  const grid = document.getElementById('topicsGrid');
  grid.innerHTML = '';

  TOPICS.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.style.setProperty('--card-accent', topic.color);
    card.innerHTML = `
      <span class="card-icon">${topic.icon}</span>
      <h3>${topic.label}</h3>
      <p>${topic.desc}</p>
      <div class="card-footer">
        <span class="q-count">~${topic.count} questions</span>
        <span class="tag" style="background:${topic.color}22;color:${topic.color}">Practice →</span>
      </div>`;
    card.addEventListener('click', () => openSettings(topic.id));
    grid.appendChild(card);
  });

  const random = document.createElement('div');
  random.className = 'topic-card random-card';
  random.style.setProperty('--card-accent', '#D97706');
  random.innerHTML = `
    <span class="card-icon">🎲</span>
    <h3>Random Mix — All Topics</h3>
    <p>Questions from every topic at once. The ultimate test.</p>
    <div class="card-footer">
      <span class="q-count">Unlimited pool</span>
      <span class="tag" style="background:#D9770622;color:#D97706">Challenge →</span>
    </div>`;
  random.addEventListener('click', () => openSettings('random'));
  grid.appendChild(random);
}

function openSettings(topicId) {
  AppState.currentTopic = topicId;
  const topic = topicId === 'random'
    ? { icon: '🎲', label: 'Random Mix', desc: 'Questions from all topics mixed together.' }
    : TOPICS.find(t => t.id === topicId);
  document.getElementById('settingsBadge').textContent = topic.icon;
  document.getElementById('settingsTitle').textContent = topic.label;
  document.getElementById('settingsDesc').textContent  = topic.desc;
  showScreen('settings');
}

function initPills(containerId, labelId, customWrapId, suffix = '') {
  const container  = document.getElementById(containerId);
  const label      = document.getElementById(labelId);
  const customWrap = document.getElementById(customWrapId);
  container.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (pill.dataset.val === 'custom') {
        customWrap.classList.remove('hidden');
        label.textContent = 'custom';
      } else {
        customWrap.classList.add('hidden');
        label.textContent = pill.dataset.val + suffix;
      }
    });
  });
}

function getSettingVal(containerId, customInputId, fallback) {
  const active = document.querySelector(`#${containerId} .pill.active`);
  if (active && active.dataset.val !== 'custom') return parseInt(active.dataset.val, 10);
  const custom = parseInt(document.getElementById(customInputId).value, 10);
  return isNaN(custom) ? fallback : custom;
}

function animateCardIn() {
  const card = document.getElementById('questionCard');
  card.classList.remove('anim-in');
  void card.offsetWidth;
  card.classList.add('anim-in');
}
