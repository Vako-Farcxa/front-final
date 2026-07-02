import { loadGames, filterGames, getFavoriteGames } from './services/gameService.js';
import { initCookieBanner } from './services/cookieService.js';
import { renderGames } from './utils/render.js';

let activeGenre = 'all';

function initBurger() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (!burger || !navLinks) return;

  burger.onclick = function () {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  };

  const links = navLinks.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    };
  }
}

function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.onscroll = function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
}

function applyFilters() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput ? searchInput.value : '';
  const results = filterGames(activeGenre, query);
  renderGames(results, 'gamesGrid', 'emptyState');
}

async function fetchGames() {
  const loader = document.getElementById('loader');
  const error = document.getElementById('errorState');

  loader.classList.remove('hidden');
  error.classList.add('hidden');

  try {
    const games = await loadGames();
    loader.classList.add('hidden');

    const stat = document.getElementById('statTotal');
    if (stat) stat.textContent = games.length;

    applyFilters();
  } catch (err) {
    loader.classList.add('hidden');
    error.classList.remove('hidden');
  }
}

async function loadFavoritesPage() {
  const loader = document.getElementById('loader');
  const empty = document.getElementById('emptyFav');
  const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favIds.length === 0) {
    loader.classList.add('hidden');
    empty.classList.remove('hidden');
    return;
  }

  try {
    await loadGames();
    loader.classList.add('hidden');
    renderGames(getFavoriteGames(), 'favoritesGrid', 'emptyFav');
  } catch (err) {
    loader.classList.add('hidden');
    document.getElementById('errorState').classList.remove('hidden');
  }
}

function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].onclick = function () {
      for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove('active');
      }
      this.classList.add('active');
      activeGenre = this.getAttribute('data-genre');
      applyFilters();
    };
  }

  if (searchInput) {
    searchInput.oninput = applyFilters;
  }
}

function initRetry() {
  const retryBtn = document.getElementById('retryBtn');
  if (!retryBtn) return;

  retryBtn.onclick = function () {
    if (document.getElementById('gamesGrid')) {
      fetchGames();
    } else {
      loadFavoritesPage();
    }
  };
}

initCookieBanner();
initBurger();
initHeaderScroll();
initFilters();
initRetry();

if (document.getElementById('gamesGrid')) fetchGames();
if (document.getElementById('favoritesGrid')) loadFavoritesPage();
