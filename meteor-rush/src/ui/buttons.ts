import { pauseGame, startGame, stopGame } from "../main.js";

const stopButton = document.getElementById('stopButton') as HTMLButtonElement;
const pauseButton = document.getElementById('pauseButton') as HTMLButtonElement;
const resumeButton = document.getElementById('resumeButton') as HTMLButtonElement;
const restartButton = document.getElementById('restartButton') as HTMLButtonElement;
const startButton = document.getElementById('startButton') as HTMLButtonElement;

export function gameStateButtonsHandler(state: 'stopped' | 'running' | 'paused'): void {
    switch(state) {
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

function gamePausedButtonsHandler(): void {
    stopButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'inline-block';
    restartButton.style.display = 'inline-block';
    startButton.style.display = 'none';
}

function gameRunningButtonsHandler(): void {
    stopButton.style.display = 'inline-block';
    pauseButton.style.display = 'inline-block';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    startButton.style.display = 'none';
}

function gameStoppedButtonsHandler(): void {
    stopButton.style.display = 'none';
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'none';
    restartButton.style.display = 'none';
    startButton.style.display = 'inline-block';
}