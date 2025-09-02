import { startGame, restartGame } from "../main.js";
const boardSizeInput = document.getElementById("board-size");
const playButton = document.getElementById("play-button");
const resetButton = document.getElementById("reset-button");
export function gameStateChangeInputHandler(state) {
    if (state === "running") {
        boardSizeInput.disabled = true;
        playButton.disabled = true;
        resetButton.disabled = false;
    }
    else {
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
//# sourceMappingURL=inputs.js.map