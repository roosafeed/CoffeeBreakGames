import { Snake } from "./snake.js";

export class Food {
    private x: number = -1;
    private y: number = -1;

    constructor(boardRows: number, boardCols: number, snake: Snake) {
        this.spawn(boardRows, boardCols, snake);
    }

    spawn(boardRows: number, boardCols: number, snake: Snake) {       
        while(true) {
            let x = Math.floor(Math.random() * (boardCols - 1));
            let y = Math.floor(Math.random() * (boardRows - 1));

            if (!snake.isSnakeTile(x, y)) {
                this.x = x;
                this.y = y;
                break;
            }
        }
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }
}