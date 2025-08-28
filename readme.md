# CoffeeBreak Games

[![Deployed to GitHub Pages](https://github.com/roosafeed/CoffeeBreakGames/actions/workflows/deploy.yml/badge.svg)](https://github.com/roosafeed/CoffeeBreakGames/actions/workflows/deploy.yml)

A growing collection of tiny, low-effort mini games I build in spare moments—focused on learning, fun, and finishing, not perfection.

## Live Site
- Play online: https://roosafeed.github.io/CoffeeBreakGames/

## Philosophy
- **Small scope**: Games should be simple enough to finish quickly.
- **Enjoy the craft**: Minimize AI reliance. I prefer solving problems myself and keeping the joy of coding.
- **Lightweight stack**: Vanilla web tech where possible; minimal tooling; readable code.
- **Ship it**: Fewer features, more finished games.

## Current Games
- **Meteor Rush** — Dodge falling meteors and chase high scores.
  - Play online: https://roosafeed.github.io/CoffeeBreakGames/meteor-rush/
  - Docs: `meteor-rush/readme.md`

## Quick Start (Local)
1. Open the arcade locally:
   - Easiest: Right-click `index.html` (repo root) in VS Code and choose "Open with Live Server".
   - Or serve the repo root:
     ```bash
     npx http-server . -c-1 -p 5173
     # then open the printed URL
     ```
2. Click a game card to play.

Note: For ES modules to work reliably (e.g., in `meteor-rush`), use an HTTP server instead of `file://`.

## Build and Deploy (GitHub Pages)
This repo is set up to build everything into a `public/` folder for GitHub Pages.

1. Install root dependencies:
   ```bash
   npm install
   ```
2. Build all games and site assets into `public/`:
   ```bash
   npm run build
   ```
   This runs `build-all.js` which:
   - **Creates `public/`**.
   - **Copies root assets** (`index.html`, `styles/`, `img/`, `src/`) to `public/`.
   - **Detects games** by folders that contain a `package.json`, runs `npm install` and `npm run build` inside each, and then copies each game folder into `public/<game-name>/`.
3. Deploy: pushing to `main` triggers the GitHub Action that publishes `public/` to the `gh-pages` branch (see `.github/workflows/deploy.yml`).

### Test the built site locally
```bash
npx http-server public -c-1 -p 5173
# open the printed URL (e.g., http://127.0.0.1:5173)
```

Or use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to run the public/index.html file directly.

## Developing
- Meteor Rush uses TypeScript and outputs to `meteor-rush/dist`.
  ```bash
  cd meteor-rush
  npm install
  npm run watch  # or: npm run build
  ```
- Keep a local server running from the repo root while developing.

## Add a New Mini Game
- Keep it tiny and self-contained in its own folder: `/<game-name>`
- Prefer vanilla HTML/CSS/JS (TypeScript optional)
- Add a card to `src/index.js` with `title`, `description`, and `url`
- Provide a short `readme.md` inside the game folder (controls, setup, notes)
- If the game needs a build step, include a `package.json` with a `build` script. The root `build-all.js` will detect and build it automatically.

## Tech
- **Frontend**: HTML, CSS, JavaScript (TypeScript where helpful)
- **No heavy frameworks**; simple build steps only when necessary
- **Static hosting friendly**: everything runs in the browser

## Repo Structure
```
CoffeeBreakGames/
├─ index.html            # Arcade landing page
├─ src/index.js          # Renders game cards
├─ styles/               # Shared styles for the arcade UI
├─ public/               # Build output for GitHub Pages (generated)
├─ <game-name>/          # Example mini game
│  ├─ index.html
│  ├─ src/ (TS sources)
│  ├─ dist/ (compiled JS)
│  └─ readme.md
└─ img/ss/               # Screenshots
```

## Why so little AI?
I want to keep the spark of discovery and the satisfaction of solving the puzzle myself. Speed is nice; joy is better.

## License
ISC