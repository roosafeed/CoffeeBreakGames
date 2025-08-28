import { gameStateButtonsHandler } from "./buttons.js";

export function gameStateUIHandler(state: 'stopped' | 'running' | 'paused'): void {
    gameStateButtonsHandler(state);

    switch(state) {
        case 'stopped':
            return gameStoppedUIHandler();
        case 'running':
            return gameRunningUIHandler();
        case 'paused':
            return gamePausedUIHandler();
    }
}

export function gameScoreUpdateHandler(score?: number): void {
    const scoreElement = document.getElementById('currentScore') as HTMLSpanElement;
    scoreElement.textContent = score?.toString()!;
}

export function gameHighScoreUpdateHandler(score?: number): void {
    const highScoreElement = document.getElementById('highestScore') as HTMLSpanElement;
    highScoreElement.textContent = score?.toString()!;
}

function gamePausedUIHandler(): void {
    // TODO: Implement this.
}

function gameRunningUIHandler(): void {
    // TODO: Implement this.
}

function gameStoppedUIHandler(): void {
    // TODO: Implement this.
}