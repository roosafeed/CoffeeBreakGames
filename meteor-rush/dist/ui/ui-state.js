import { gameStateButtonsHandler } from "./buttons.js";
export function gameStateUIHandler(state) {
    gameStateButtonsHandler(state);
    switch (state) {
        case 'stopped':
            return gameStoppedUIHandler();
        case 'running':
            return gameRunningUIHandler();
        case 'paused':
            return gamePausedUIHandler();
    }
}
export function gameScoreUpdateHandler(score) {
    const scoreElement = document.getElementById('currentScore');
    scoreElement.textContent = score === null || score === void 0 ? void 0 : score.toString();
}
export function gameHighScoreUpdateHandler(score) {
    const highScoreElement = document.getElementById('highestScore');
    highScoreElement.textContent = score === null || score === void 0 ? void 0 : score.toString();
}
function gamePausedUIHandler() {
    // TODO: Implement this.
}
function gameRunningUIHandler() {
    // TODO: Implement this.
}
function gameStoppedUIHandler() {
    // TODO: Implement this.
}
//# sourceMappingURL=ui-state.js.map