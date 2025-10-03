import { Food } from "./food.js";
import { Snake } from "./snake.js";
export class GameState {
    constructor(rows, cols) {
        this.score = 0;
        this.highScore = 0;
        this.state = 'stopped';
        this.lastFrameUpdatedAt = 0;
        this.fps = 5;
        this.eventListeners = {};
        this.rows = rows;
        this.cols = cols;
        // this.snake = this.initSnake(3, Math.floor(cols / 2), Math.floor(rows / 2));
        this.snake = null;
        this.init();
    }
    startGame() {
        this.init();
        this.state = 'running';
        this.highScore = Math.max(this.highScore, this.score);
        this.emitEvent('highScore');
    }
    resumeGame() {
        this.state = 'running';
    }
    pauseGame() {
        this.state = 'paused';
    }
    resizeBoard(newRows, newCols) {
        this.rows = newRows;
        this.cols = newCols;
        this.init();
    }
    incrementScore() {
        this.score += 1;
        this.emitEvent('score');
    }
    init() {
        this.score = 0;
        this.emitEvent('score');
        this.state = 'stopped';
        this.snake = this.initSnake(3, Math.floor(this.cols / 2), Math.floor(this.rows / 2));
        this.spawnFood();
    }
    isRunning() {
        return this.state === 'running';
    }
    shouldUpdateFrame(currentTime) {
        if (!this.isRunning()) {
            return false;
        }
        if (currentTime - this.lastFrameUpdatedAt >= 1000 / this.fps) {
            this.lastFrameUpdatedAt = currentTime;
            return true;
        }
        return false;
    }
    moveUp() {
        this.snake.moveUp(this.rows, this.cols);
    }
    moveDown() {
        this.snake.moveDown(this.rows, this.cols);
    }
    moveLeft() {
        this.snake.moveLeft(this.rows, this.cols);
    }
    moveRight() {
        this.snake.moveRight(this.rows, this.cols);
    }
    moveForward() {
        this.snake.moveForward(this.rows, this.cols);
    }
    initSnake(initialLength, startX, startY) {
        return new Snake(initialLength, startX, startY);
    }
    spawnFood() {
        if (this.food) {
            return;
        }
        else {
            this.food = new Food(this.rows, this.cols, this.snake);
        }
    }
    checkFoodSnakeCollision() {
        if (!this.food) {
            return false;
        }
        const snakeHead = this.snake.getSnakeHead();
        const isColliding = snakeHead.getX() == this.food.getX() && snakeHead.getY() == this.food.getY();
        if (isColliding) {
            this.incrementScore();
            this.snake.grow();
            this.food = undefined;
            this.spawnFood();
        }
        return isColliding;
    }
    registerScoreListener(callback) {
        if (!this.eventListeners.score) {
            this.eventListeners.score = [];
        }
        this.eventListeners.score.push(callback);
    }
    registerHighScoreListener(callback) {
        if (!this.eventListeners.highScore) {
            this.eventListeners.highScore = [];
        }
        this.eventListeners.highScore.push(callback);
    }
    emitEvent(eventName) {
        if (this.eventListeners[eventName]) {
            for (const callback of this.eventListeners[eventName]) {
                callback(this[eventName]);
            }
        }
    }
}
//# sourceMappingURL=state.js.map