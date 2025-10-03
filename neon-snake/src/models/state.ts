import { Food } from "./food.js";
import { Snake } from "./snake.js";

export class GameState {
    rows: number;
    cols: number;
    score: number = 0;
    highScore: number = 0;
    state: 'stopped' | 'running' | 'paused' = 'stopped';
    snake: Snake;
    lastFrameUpdatedAt: number = 0;
    fps: number = 5;
    food?: Food;
    eventListeners: Record<string, Function[]> = {};

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        // this.snake = this.initSnake(3, Math.floor(cols / 2), Math.floor(rows / 2));
        this.snake = null as any;
        this.init();
    }

    startGame(): void {
        this.init();
        this.state = 'running';
        this.highScore = Math.max(this.highScore, this.score);
        this.emitEvent('highScore');
    }

    resumeGame(): void {
        this.state = 'running';
    }

    pauseGame(): void {
        this.state = 'paused';
    }

    resizeBoard(newRows: number, newCols: number): void {
        this.rows = newRows;
        this.cols = newCols;
        this.init();
    }

    incrementScore(): void {
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

    isRunning(): boolean {
        return this.state === 'running';
    }

    shouldUpdateFrame(currentTime: DOMHighResTimeStamp): boolean {
        if (!this.isRunning()) {
            return false;
        }

        if (currentTime - this.lastFrameUpdatedAt >= 1000 / this.fps) {
            this.lastFrameUpdatedAt = currentTime;
            return true;
        }

        return false;
    }

    moveUp(): void {
        this.snake.moveUp(this.rows, this.cols);
    }

    moveDown(): void {
        this.snake.moveDown(this.rows, this.cols);
    }

    moveLeft(): void {
        this.snake.moveLeft(this.rows, this.cols);
    }

    moveRight(): void {
        this.snake.moveRight(this.rows, this.cols);
    }

    moveForward(): void {
        this.snake.moveForward(this.rows, this.cols);
    }

    initSnake(initialLength: number, startX: number, startY: number): Snake {
        return new Snake(initialLength, startX, startY);
    }

    spawnFood(): void {
        if (this.food) {
            return;
        }
        else {
            this.food = new Food(this.rows, this.cols, this.snake);
        }
    }

    checkFoodSnakeCollision(): boolean {
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

    registerScoreListener(callback: (val: Number) => void): void {
        if (!this.eventListeners.score) {
            this.eventListeners.score = [];
        }
        this.eventListeners.score.push(callback);
    }

    registerHighScoreListener(callback: (val: Number) => void): void {
        if (!this.eventListeners.highScore) {
            this.eventListeners.highScore = [];
        }
        this.eventListeners.highScore.push(callback);
    }

    emitEvent(eventName: string): void {
        if (this.eventListeners[eventName]) {
            for (const callback of this.eventListeners[eventName]) {
                callback(this[eventName as keyof typeof this]);
            }
        }
    }
}