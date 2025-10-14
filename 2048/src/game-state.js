import Tile from "./models/tile.js";

const gameState = {
    boardSize: 4,
    board: [],
    history: [],
    score: 0,
    bestScore: 0,
    moveCount: 0,
    gameOver: false,
    boardHistoryPosition: -1
}

export function initializeGameState(boardSize = 4) {
    gameState.boardSize = boardSize;
    gameState.board = createEmptyBoard(boardSize);
    gameState.score = 0;
    gameState.moveCount = 0;
    gameState.gameOver = false;

    return gameState;
}

export function getBoard() {
    return gameState.board;
}

export function getBoardSize() {
    return gameState.boardSize;
}

function createEmptyBoard(boardSize) {
    const board = [];
    for (let cell = 0; cell < boardSize * boardSize; cell++) {
        board.push(null);
    }

    return board;
}

export function createHistoryEntry() {
    let currentBoard;

    if (gameState.history.length > 20) {
        gameState.history.shift(); // remove oldest entry
    }

    if (structuredClone) {
        currentBoard = structuredClone(gameState.board);
    }
    else {
        currentBoard = JSON.parse(JSON.stringify(gameState.board));
    }
    gameState.history.push(currentBoard);
}

function getHistoryEntry(position) {
    if (position < 0 || position >= gameState.history.length) {
        throw new Error('Invalid history position');
    }

    gameState.boardHistoryPosition = position === gameState.history.length - 1 ? -1 : position;
    return gameState.history[position];
}

export function getPreviousBoard() {
    if (gameState.history.length === 0) return null;

    if (gameState.boardHistoryPosition === -1) {
        gameState.boardHistoryPosition = gameState.history.length - 2;
    }
    else {
        gameState.boardHistoryPosition--;
    }

    return getHistoryEntry(gameState.boardHistoryPosition);
}

export function getNextBoard() {
    if (gameState.history.length === 0 || gameState.boardHistoryPosition === -1) return null;
    gameState.boardHistoryPosition++;

    return getHistoryEntry(gameState.boardHistoryPosition);
}

export function isGameRunning() {
    return !gameState.gameOver && gameState.boardHistoryPosition === -1;
}