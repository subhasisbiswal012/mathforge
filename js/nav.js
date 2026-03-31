/**
 * nav.js — MathForge Shared Navigation
 * ══════════════════════════════════════
 * Injects the navbar HTML and wires hamburger menu.
 * Include on every page BEFORE other scripts.
 */

'use strict';

(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    if (href === 'index.html' && (page === 'index.html' || page === '')) return 'active';
    if (href === page) return 'active';
    return '';
  }

  const navHTML = `
    <nav class="navbar">
      <a class="nav-logo" href="index.html">
        <div class="mark">⚒</div>
        <span>Math<em>Forge</em></span>
      </a>

      <ul class="nav-links">
        <li><a href="index.html"  class="${isActive('index.html')}">Practice</a></li>
        <li><a href="learn.html"  class="${isActive('learn.html')}">Learn</a></li>
        <li><a href="about.html"  class="${isActive('about.html')}">About</a></li>
      </ul>

      <button class="nav-hamburger" id="navHamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="nav-drawer" id="navDrawer">
      <a href="index.html"  class="${isActive('index.html')}">⚡ Practice</a>
      <a href="learn.html"  class="${isActive('learn.html')}">📖 Learn</a>
      <a href="about.html"  class="${isActive('about.html')}">👤 About</a>
    </div>
  `;

  // Inject before body content
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Wire hamburger
  const btn    = document.getElementById('navHamburger');
  const drawer = document.getElementById('navDrawer');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    drawer.classList.toggle('open');
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      drawer.classList.remove('open');
    });
  });

  // Close drawer on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !drawer.contains(e.target)) {
      btn.classList.remove('open');
      drawer.classList.remove('open');
    }
  });
})();
