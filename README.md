# FreeZone

A simple free-to-play game discovery website. Browse games, filter by genre, search by name, save favorites, and open games directly on their official websites.

---

## About the Project

FreeZone solves a simple problem: there are hundreds of free-to-play games online, but no easy place to browse them all in one spot. This project pulls live game data from the [FreeToGame API](https://www.freetogame.com/api-doc) and lets users explore, filter, and save their favorite games — no account required.

---

## Features

- Browse 400+ free-to-play games
- Filter by genre (Shooter, MMORPG, Strategy, etc.)
- Search by game title or genre
- Save favorites (stored in browser localStorage)
- Dedicated favorites page
- Play button opens the official game website
- Cookie notification (dismisses after Accept)
- Responsive layout (320px – 1024px+)
- Mobile burger menu

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Browse | `index.html` | Main page with game grid, filters, and search |
| Favorites | `favorites.html` | Shows saved games from localStorage |
| About | `about.html` | Project description and purpose |

---

## Project Structure

```
front final/
├── index.html
├── favorites.html
├── about.html
├── style.css
├── README.md
└── js/
    ├── main.js                 # Entry point — events and page init
    ├── data/
    │   └── config.js           # API URL
    ├── services/
    │   ├── gameService.js      # Fetch, filter, favorites logic
    │   └── cookieService.js    # Cookie banner logic
    └── utils/
        └── render.js           # Create and display game cards
```

---

## Technologies Used

- **HTML5** — semantic tags (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- **CSS3** — Flexbox, Grid, media queries, hover effects, transitions
- **JavaScript (ES6 modules)** — DOM manipulation, events, fetch, async/await, localStorage
- **FreeToGame API** — `https://www.freetogame.com/api/games`

No frameworks or libraries (no jQuery, no Bootstrap).

---

## How to Run Locally

ES modules require a local server. Do **not** open HTML files directly by double-clicking.

**Option 1 — Python:**
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Option 2 — VS Code Live Server extension:**
Right-click `index.html` → "Open with Live Server"

---

## GitHub Pages Deployment

1. Push the project to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to your branch (e.g. `main`)
4. Your site will be live at: `https://yourusername.github.io/repo-name/`

---

## How It Works

### Data flow (Browse page)

```
index.html loads
    ↓
main.js runs
    ↓
fetchGames() → gameService.loadGames() → fetch(API)
    ↓
Games saved in memory
    ↓
applyFilters() → gameService.filterGames()
    ↓
renderGames() → utils/render.js creates cards in #gamesGrid
```

### Favorites

- Clicking ♥ calls `toggleFavorite(id)` in `gameService.js`
- Game ID is saved/removed in `localStorage` under key `"favorites"`
- On the favorites page, clicking ♥ removes the card immediately

### Cookie banner

- Shows on first visit
- Clicking **Accept** saves `"cookieAccepted"` to localStorage
- Banner stays hidden on future visits

---

## Exam Criteria Checklist

| Requirement | Implementation |
|-------------|----------------|
| Semantic HTML5 tags | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` |
| Hover effects | Buttons, cards, nav links (`:hover` + `transition`) |
| Responsive design | Breakpoints at 320px, 480px, 768px, 1024px |
| Custom fonts | Arial (system font) |
| Burger menu | Mobile nav toggle with CSS animation |
| API fetch (GET) | `fetch()` + `async/await` in `gameService.js` |
| Extra JS logic | Genre filter, search, header scroll on scroll |
| localStorage | Favorites + cookie accept |
| Minimum 3 HTML pages | `index.html`, `favorites.html`, `about.html` |
| Cookie notification | Fixed banner, hides after Accept |

---

## File Reference

### `js/data/config.js`
Stores the API URL.

### `js/services/gameService.js`
- `loadGames()` — fetches games from API
- `getFavorites()` / `toggleFavorite()` — localStorage favorites
- `filterGames()` — filter by genre and search text
- `getFavoriteGames()` — returns only favorited games

### `js/services/cookieService.js`
- `initCookieBanner()` — show/hide cookie notification

### `js/utils/render.js`
- `createCard()` — builds one game card element
- `renderGames()` — fills the grid with cards

### `js/main.js`
- Initializes burger menu, header scroll, filters, retry button
- Starts browse or favorites page depending on which HTML is loaded

### `style.css`
All styling: layout, colors, responsive breakpoints, hover effects, burger animation.

---

## Presentation Tips

1. **Why this topic?** — Free games are popular but scattered; FreeZone centralizes them.
2. **Design choices** — Dark theme fits gaming; cyan accent for buttons and highlights.
3. **Inspiration** — Game store layouts (Steam, Epic Games).
4. **Code to explain live:**
   - `toggleFavorite()` in `gameService.js` — localStorage add/remove
   - `loadGames()` in `gameService.js` — fetch + async/await
   - `createCard()` in `render.js` — DOM element creation

---

## Author

Vasil Partskhaladze

Front End Development — Final Project

---

## License

This project was created for educational purposes. Game data provided by [FreeToGame](https://www.freetogame.com).
