import { Food } from "./models/food.js";
import { Snake } from "./models/snake.js";

let gameArena: HTMLElement = document.getElementById('game-arena') as HTMLElement;

export function drawBoard(rows: number, cols: number): void {
    gameArena.innerHTML = generateBoardHTML(rows, cols);
    gameArena.style.setProperty('--data-grid-size-cols', cols.toString());
    gameArena.style.setProperty('--data-grid-size-rows', rows.toString());
}

export function drawSnake(snake: Snake): void {
    const snakeBody = snake.getSnakeBody();

    // Clear previous snake positions
    document.querySelectorAll('.snake').forEach(tile => {
        tile.remove();
    });

    // Draw new snake positions
    snakeBody.forEach(tile => {
        const cell = document.getElementById(`cell-${tile.getX()}-${tile.getY()}`);
        if (!tile.getIsGrowthPending() && cell) {
            const snakeDiv = document.createElement('div');
            snakeDiv.classList.add('snake');
            if (tile.isHead()) {
                snakeDiv.classList.add('snake-head');
            }
            else {
                snakeDiv.classList.add('snake-body');
            }
            cell.appendChild(snakeDiv);
        }
    });
}

export function drawFood(food?: Food) {
    if (!food) {
        return;
    }

    const foodCell = document.getElementById(`cell-${food.getX()}-${food.getY()}`);
    if (foodCell) {
        // remove any existing food divs
        document.querySelectorAll('.food').forEach(tile => {
            tile.remove();
        });

        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food');
        foodCell.appendChild(foodDiv);
    }
}

export function generateNumberOfRowsAndCols(): {rows: number, cols: number} {
    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;
    const tileSize = 20;
    const cols = Math.floor(Math.max(500, screenWidth * 0.8) / tileSize);
    const rows = Math.floor(Math.max(500, screenHeight * 0.8) / tileSize);

    return {rows, cols};
}

export function updateScore(val: Number): void {
    document.querySelector('#score')!.innerHTML = val.toString()
}

export function updateHighScore(val: Number): void {
    document.querySelector('#best-score')!.innerHTML = val.toString()
}

function generateBoardHTML(rows: number, cols: number): string {
    let boardHTML = '';

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            boardHTML += `<div class="cell" id="cell-${c}-${r}" data-row="${r}" data-col="${c}"></div>`;
        }
    }

    return boardHTML;
}