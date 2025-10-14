import { createHistoryEntry, getBoard, getBoardSize, initializeGameState, isGameRunning } from "./game-state.js";
import { moveDown, moveLeft, moveRight, moveUp, spawnRandomTiles } from "./game.js";
import { drawBoard } from "./ui.js";

// control listeners
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
        event.preventDefault(); // prevent scrolling
        console.log(`Pressed ${key}`);
        handleMove(key);
    }
});

export function init() {
    const gameState = initializeGameState(4);
    createHistoryEntry();
    spawnRandomTiles(gameState.board, 2);
    drawBoard(gameState.board);
}

function handleMove(direction) {
    if (!isGameRunning()) return;    

    switch (direction) {
        case "ArrowUp":
            handleUpMove();
            break;
        case "ArrowDown":
            handleDownMove();
            break;
        case "ArrowLeft":
            handleLeftMove();
            break;
        case "ArrowRight":
            handleRightMove();
            break;
    }

    createHistoryEntry();
}

function handleLeftMove() {
    console.log("Move Left");
    const board = getBoard();
    const boardSize = getBoardSize();
    const { moved, score } = moveLeft(board, boardSize);

    if (moved) {
        spawnRandomTiles(board, 1);
        drawBoard(board);
    }
}

function handleRightMove() {
    console.log("Move Left");
    const board = getBoard();
    const boardSize = getBoardSize();
    const { moved, score } = moveRight(board, boardSize);

    if (moved) {
        spawnRandomTiles(board, 1);
        drawBoard(board);
    }
}

function handleDownMove() {
    console.log("Move Left");
    const board = getBoard();
    const boardSize = getBoardSize();
    const { moved, score } = moveDown(board, boardSize);

    if (moved) {
        spawnRandomTiles(board, 1);
        drawBoard(board);
    }
}

function handleUpMove() {
    console.log("Move Left");
    const board = getBoard();
    const boardSize = getBoardSize();
    const { moved, score } = moveUp(board, boardSize);

    if (moved) {
        spawnRandomTiles(board, 1);
        drawBoard(board);
    }
}

init();