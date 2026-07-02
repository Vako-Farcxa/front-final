import { getFavorites, toggleFavorite } from '../services/gameService.js';

export function createCard(game, gridId, emptyId) {
  const isFav = getFavorites().includes(game.id);
  const card = document.createElement('article');
  card.className = 'game-card';
  const isFavoritesPage = gridId === 'favoritesGrid';

  card.innerHTML =
    '<img src="' + game.thumbnail + '" alt="' + game.title + '">' +
    '<div class="game-card-body">' +
      '<h3>' + game.title + '</h3>' +
      '<span class="tag">' + game.genre + ' · ' + game.platform + '</span>' +
      '<p>' + game.short_description + '</p>' +
      '<div class="card-footer">' +
        '<a href="' + game.game_url + '" target="_blank" class="btn btn-play">Play Free</a>' +
        '<button class="fav-btn ' + (isFav ? 'active' : '') + '">' + (isFav ? '♥' : '♡') + '</button>' +
      '</div></div>';

  card.querySelector('.fav-btn').onclick = function () {
    const wasFav = getFavorites().includes(game.id);
    toggleFavorite(game.id);

    if (wasFav && isFavoritesPage) {
      card.remove();
      const grid = document.getElementById(gridId);
      const empty = document.getElementById(emptyId);
      if (grid && grid.children.length === 0 && empty) {
        empty.classList.remove('hidden');
      }
      return;
    }

    this.textContent = wasFav ? '♡' : '♥';
    this.classList.toggle('active', !wasFav);
  };

  return card;
}

export function renderGames(games, gridId, emptyId) {
  const grid = document.getElementById(gridId);
  const empty = document.getElementById(emptyId);
  if (!grid) return;

  grid.innerHTML = '';

  if (games.length === 0) {
    if (empty) empty.classList.remove('hidden');
    return;
  }

  if (empty) empty.classList.add('hidden');

  const limit = games.length > 60 ? 60 : games.length;
  for (let i = 0; i < limit; i++) {
    grid.appendChild(createCard(games[i], gridId, emptyId));
  }
}
