import { startGame, restartGame } from "../main.js";

const boardSizeInput = document.getElementById("board-size") as HTMLInputElement;
const playButton = document.getElementById("play-button") as HTMLInputElement;
const resetButton = document.getElementById("reset-button") as HTMLInputElement;

export function gameStateChangeInputHandler(state: 'stopped' | 'running') {
    if (state === "running") {
        boardSizeInput.disabled = true;
        playButton.disabled = true;
        resetButton.disabled = false;
    }        
    else{
        boardSizeInput.disabled = false;
        playButton.disabled = false;
        resetButton.disabled = true;
    }
}

playButton.addEventListener('click', () => {
    startGame();
});

resetButton.addEventListener('click', () => {
    restartGame();
});