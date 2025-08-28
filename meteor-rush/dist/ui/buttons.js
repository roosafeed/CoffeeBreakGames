import { pauseGame, startGame, stopGame } from "../main.js";
const stopButton = document.getElementById('stopButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('startButton');
export function gameStateButtonsHandler(state) {
    switch (state) {
        case 'stopped':
            return gameStoppedButtonsHandler();
        case 'running':
            return gameRunningButtonsHandler();
        case 'paused':
            return gamePausedButtonsHandler();
    }
}
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
resumeButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
restartButton.addEventListener('click', () => {
    stopGame();
    startGame();
});
function gamePausedButtonsHandler() {
    stopButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'inline-block';
    restartButton.style.display = 'inline-block';
    startButton.style.display = 'none';
}
function gameRunningButtonsHandler() {
    stopButton.style.display = 'inline-block';
    pauseButton.style.display = 'inline-block';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    startButton.style.display = 'none';
}
function gameStoppedButtonsHandler() {
    stopButton.style.display = 'none';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    startButton.style.display = 'inline-block';
}
//# sourceMappingURL=buttons.js.map