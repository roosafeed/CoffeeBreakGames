import { getNextBoard, getPreviousBoard } from "./game-state.js";
import { init } from "./main.js";

const STORAGE_KEY_THEME = 'theme';

// load theme from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    setTheme(getColorScheme());
});

// UI button click handlers
document.getElementById('theme-light').addEventListener('click', () => setTheme('light'));
document.getElementById('theme-dark').addEventListener('click', () => setTheme('dark'));
document.getElementById('theme-system').addEventListener('click', () => setTheme('system'));
document.getElementById('btn-new-game').addEventListener('click', () => init());

document.getElementById('btn-prev-move').addEventListener('click', () => drawBoard(getPreviousBoard()));
document.getElementById('btn-next-move').addEventListener('click', () => drawBoard(getNextBoard()));

function setTheme(theme) {
    // validate input
    if (theme !== 'light' && theme !== 'dark' && theme !== 'system') return;

    if (theme === 'system') {
        localStorage.removeItem(STORAGE_KEY_THEME);
        theme = getColorScheme();
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
}

//determines if the user has a set theme
function getColorScheme(){
    var theme = "light";    //default to light

    //local storage is used to override OS theme settings
    if (localStorage.getItem(STORAGE_KEY_THEME)) {
        if(localStorage.getItem(STORAGE_KEY_THEME) == "dark"){
            theme = "dark";
        }
    } else if (!window.matchMedia) {
        //matchMedia method not supported
        theme = "light"; //default to light
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        theme = "dark";
    }

    return theme;
}

export function drawBoard(board) {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = ''; // Clear existing tiles

    board.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        if (tile === null) {
            tileElement.className = 'cell';
        }
        else {
            tileElement.className = 'tile';
            tileElement.textContent = tile.value;
            tileElement.classList.add(`tile-${tile.value}`);

            if (tile.isJustSpawned) {
                tileElement.classList.add('tile-pop');
            }
        }

        boardContainer.appendChild(tileElement);
    });
}