# CoffeeBreak Games

A growing collection of tiny, low-effort mini games I build in spare moments—focused on learning, fun, and finishing, not perfection.

## Philosophy
- **Small scope**: Games should be simple enough to finish quickly.
- **Enjoy the craft**: Minimize AI reliance. I prefer solving problems myself and keeping the joy of coding.
- **Lightweight stack**: Vanilla web tech where possible; minimal tooling; readable code.
- **Ship it**: Fewer features, more finished games.

## Current Games
- **Meteor Rush** — Dodge falling meteors and chase high scores.
  - Play: open the root site and click Play, or open `meteor-rush/index.html` via a local server
  - Docs: `meteor-rush/readme.md`

## Quick Start
1. Open the arcade:
   - Easiest: Right-click `index.html` (repo root) in VS Code and choose "Open with Live Server".
   - Or serve the repo root:
     ```bash
     npx http-server . -c-1 -p 5173
     # then open the printed URL
     ```
2. Click a game card to play.

Note: For ES modules to work reliably (e.g., in `meteor-rush`), use an HTTP server instead of `file://`.

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

## Tech
- **Frontend**: HTML, CSS, JavaScript (TypeScript where helpful)
- **No heavy frameworks**; simple build steps only when necessary
- **Static hosting friendly**: everything runs in the browser

## Repo Structure
```
CoffeeBreakGames/
├─ index.html           # Arcade landing page
├─ src/index.js         # Renders game cards
├─ styles/              # Shared styles for the arcade UI
├─ <game-name>/         # Example mini game
│  ├─ index.html
│  ├─ src/ (TS sources)
│  ├─ dist/ (compiled JS)
│  └─ readme.md
└─ img/ss/              # Screenshots
```

## Why so little AI?
I want to keep the spark of discovery and the satisfaction of solving the puzzle myself. Speed is nice; joy is better.

## License
ISC