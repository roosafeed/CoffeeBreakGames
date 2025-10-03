import { GameState } from "./models/state.js";
import { drawBoard, drawFood, drawSnake, generateNumberOfRowsAndCols, updateHighScore, updateScore } from "./ui.js";
const keyState = {};
const gameState = new GameState(20, 20);
gameState.registerScoreListener(updateScore);
gameState.registerHighScoreListener(updateHighScore);
init();
// register event listeners
window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (gameState.state === 'stopped') {
            startGame();
        }
        else if (gameState.state === 'paused') {
            startGame();
        }
        else if (gameState.state === 'running') {
            pauseGame();
        }
    }
    if (event.code === "ArrowLeft"
        || event.code === "ArrowRight"
        || event.code === "ArrowUp"
        || event.code === "ArrowDown") {
        if (!gameState.isRunning())
            return;
        keyState[event.code] = true;
    }
});
// game loop
function gameLoop(dx) {
    if (!gameState.isRunning())
        return;
    if (gameState.shouldUpdateFrame(dx)) {
        if (keyState["ArrowUp"]) {
            gameState.moveUp();
            keyState["ArrowUp"] = false;
        }
        else if (keyState["ArrowDown"]) {
            gameState.moveDown();
            keyState["ArrowDown"] = false;
        }
        else if (keyState["ArrowLeft"]) {
            gameState.moveLeft();
            keyState["ArrowLeft"] = false;
        }
        else if (keyState["ArrowRight"]) {
            gameState.moveRight();
            keyState["ArrowRight"] = false;
        }
        else {
            gameState.moveForward();
        }
    }
    gameState.checkFoodSnakeCollision();
    // TODO: check self collision
    drawSnake(gameState.snake);
    drawFood(gameState.food);
    requestAnimationFrame(gameLoop);
}
function init() {
    const { rows, cols } = generateNumberOfRowsAndCols();
    gameState.resizeBoard(rows, cols);
    drawBoard(rows, cols);
    drawSnake(gameState.snake);
}
function resetGame() {
    if (gameState.state === 'stopped') {
        gameState.init();
    }
    // gameState.startGame();
    // gameState.setState('state', 'running');
    // gameState.setState('startTime', performance.now());
    // requestAnimationFrame(gameLoop);
}
function startGame() {
    if (gameState.state === 'stopped') {
        resetGame();
        gameState.startGame();
    }
    else if (gameState.state === 'paused') {
        gameState.resumeGame();
    }
    requestAnimationFrame(gameLoop);
}
function pauseGame() {
    gameState.pauseGame();
}
//# sourceMappingURL=main.js.map