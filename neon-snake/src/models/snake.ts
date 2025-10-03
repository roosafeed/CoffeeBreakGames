import { SnakeTile } from "./snake-tile.js";

export class Snake {
    private tiles: SnakeTile[] = [];

    constructor(length: number, startX: number = 0, startY: number = 0) {
        this.tiles = this.generateInitialTiles(length, startX, startY);
    }

    private generateInitialTiles(length: number, startX: number, startY: number): SnakeTile[] {
        const initialTiles: SnakeTile[] = [];
        
        for (let i = 0; i < length; i++) {
            initialTiles.push(new SnakeTile(i, startX - i, startY, i === 0));
        }

        return initialTiles;
    }

    getSnakeBody(): SnakeTile[] {
        return this.tiles.sort((a, b) => a.getPosition() - b.getPosition());
    }

    getSnakeHead(): SnakeTile {
        return this.tiles.find(tile => tile.isHead)!;
    }

    getHeadingDirection(): 'up' | 'down' | 'left' | 'right' {
        // TODO: handle edge case where snake crosses the board boundary
        if (this.tiles.length < 2) throw new Error("Not enough tiles to determine direction");

        const snake = this.getSnakeBody();
        const head = snake[0];
        const neck = snake[1];

        if (head.getX() === neck.getX()) {
            // either up or down
            if (
                (head.getY() + 1 === neck.getY()) 
                || (head.getY() > neck.getY() + 1 && neck.getY() === 0)
            ) {
                return 'up';
            }
            else if (
                (head.getY() === neck.getY() + 1) 
                || (head.getY() === 0 && head.getY() + 1 < neck.getY())
            ) {
                return 'down';
            }
            // return head.getY() > neck.getY() ? 'down' : 'up';
        }

        if (head.getY() === neck.getY()) {
            // either left or right
            if (
                (head.getX() + 1 === neck.getX()) 
                || (head.getX() > neck.getX() + 1 && neck.getX() === 0)
            ) {
                return 'left';
            }
            else if (
                (head.getX() === neck.getX() + 1) 
                || (head.getX() === 0 && head.getX() + 1 < neck.getX())
            ) {
                return 'right';
            }
            // return head.getX() > neck.getX() ? 'right' : 'left';
        }

        throw new Error("Invalid snake state: head and neck are not aligned");
    }

    moveUp(boardRows: number, boardCols: number): void {
        const direction = this.getHeadingDirection();
        if (direction === 'down') {
            this.moveForward(boardRows, boardCols);
            return; // Prevent reversing direction
        }

        const head = this.tiles[0];

        this.moveSnake(head.getX(), head.getY() - 1, boardRows, boardCols);
    }

    moveDown(boardRows: number, boardCols: number): void {
        const direction = this.getHeadingDirection();
        if (direction === 'up') {
            this.moveForward(boardRows, boardCols);
            return; // Prevent reversing direction
        }

        const head = this.tiles[0];

        this.moveSnake(head.getX(), head.getY() + 1, boardRows, boardCols);
    }

    moveLeft(boardRows: number, boardCols: number): void {
        const direction = this.getHeadingDirection();
        if (direction === 'right') {
            this.moveForward(boardRows, boardCols);
            return; // Prevent reversing direction
        }

        const head = this.tiles[0];

        this.moveSnake(head.getX() - 1, head.getY(), boardRows, boardCols);
    }

    moveRight(boardRows: number, boardCols: number): void {
        const direction = this.getHeadingDirection();
        if (direction === 'left') {
            this.moveForward(boardRows, boardCols);
            return; // Prevent reversing direction
        }

        const head = this.tiles[0];

        this.moveSnake(head.getX() + 1, head.getY(), boardRows, boardCols);
    }

    moveForward(boardRows: number, boardCols: number): void {
        const direction = this.getHeadingDirection();
        console.log(`Moving ${direction}`);

        switch(direction) {
            case 'up':
                this.moveUp(boardRows, boardCols);
                break;
            case 'down':
                this.moveDown(boardRows, boardCols);
                break;
            case 'left':
                this.moveLeft(boardRows, boardCols);
                break;
            case 'right':
                this.moveRight(boardRows, boardCols);
                break;
        }
    }

    isSnakeTile(x: number, y: number): boolean {
        return this.tiles.some(tile => tile.getX() === x && tile.getY() === y);
    }

    grow(): void {
        const snake = this.getSnakeBody();
        const lastTile = snake[snake.length - 1];

        // set a growth pending flag on the tail tile so that it can be added in the next frame
        const newTile = new SnakeTile(lastTile.getPosition() + 1, -1, -1, false, true);
        this.tiles.push(newTile);
    }

    private moveSnake(headNewX: number, headNewY: number, boardRows: number, boardCols: number): void {
        // move snake body except the head
        const snake = this.getSnakeBody();

        for (let i = snake.length - 1; i >= 1; i--) {
            const prevTile = snake[i - 1];
            const currentTile = snake[i];;
            currentTile.moveTo(prevTile.getX(), prevTile.getY());
            currentTile.setIsGrowthPending(false);
        }

        // move head to new position
        const head = snake[0];
        const wrappedX = headNewX >= boardCols 
            ? 0 
            : headNewX < 0 
                ? boardCols - 1 
                : headNewX;
        const wrappedY = headNewY >= boardRows 
            ? 0 
            : headNewY < 0 
                ? boardRows - 1 
                : headNewY;
        head.moveTo(wrappedX, wrappedY);
    }
}