import { API } from '../data/config.js';

let games = [];

export function getGames() {
  return games;
}

export async function loadGames() {
  const response = await fetch(API);
  if (!response.ok) throw new Error('Failed to load');
  games = await response.json();
  return games;
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

export function toggleFavorite(id) {
  const favs = getFavorites();
  const index = favs.indexOf(id);

  if (index === -1) {
    favs.push(id);
  } else {
    favs.splice(index, 1);
  }

  localStorage.setItem('favorites', JSON.stringify(favs));
}

export function filterGames(genre, search) {
  let results = games;

  if (genre !== 'all') {
    results = results.filter((g) => g.genre === genre);
  }

  if (search) {
    const query = search.toLowerCase();
    results = results.filter((g) =>
      g.title.toLowerCase().includes(query) ||
      g.genre.toLowerCase().includes(query)
    );
  }

  return results;
}

export function getFavoriteGames() {
  const favIds = getFavorites();
  return games.filter((g) => favIds.includes(g.id));
}
