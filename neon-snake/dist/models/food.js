export class Food {
    constructor(boardRows, boardCols, snake) {
        this.x = -1;
        this.y = -1;
        this.spawn(boardRows, boardCols, snake);
    }
    spawn(boardRows, boardCols, snake) {
        while (true) {
            let x = Math.floor(Math.random() * (boardCols - 1));
            let y = Math.floor(Math.random() * (boardRows - 1));
            if (!snake.isSnakeTile(x, y)) {
                this.x = x;
                this.y = y;
                break;
            }
        }
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
//# sourceMappingURL=food.js.map