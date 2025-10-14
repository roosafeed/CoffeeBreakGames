import Tile from "./models/tile.js";

export function spawnRandomTiles(board, n = 2) {
    const numberOfEmptyCells = board.filter(cell => cell === null).length;
    if (numberOfEmptyCells === 0) return false; // no empty cells available
    if (n > numberOfEmptyCells) n = numberOfEmptyCells; // limit n to available empty cells

    for (let i = 0; i < n; i++) {
        let index = getRandomEmptyCellIndex(board);
        let value = getRandomTileValue();
        board[index] = new Tile(value);
    }
}

export function moveLeft(board, boardSize) {
    resetTileFlags(board);
    let moved = false;
    let score = 0;

    // repeat till no more moves can be made
    let canMove;

    do {
        canMove = false;
        // start from the second column and move the tiles to the left - skip the first column
        for (let cell = 1; cell < boardSize * boardSize; cell++) {
            // skip to next row if at the start of a new row
            if (cell % boardSize === 0) continue;

            const prevCellNumber = cell - 1;
            const moveResult = move(board, cell, prevCellNumber);
            moved = moved || moveResult.moved;
            score += moveResult.score;
            canMove = canMove || moveResult.moved;
        }
    } while (canMove);
    
    return { moved, score };
}

export function moveRight(board, boardSize) {
    resetTileFlags(board);
    let moved = false;
    let score = 0;

    // repeat till no more moves can be made
    let canMove;

    do {
        canMove = false;
        // start from the second last column and move the tiles to the right - skip the last column
        for (let cell = (boardSize * boardSize) - 2; cell >= 0; cell--) {
            // skip to next if at the end of a row
            if (cell % boardSize === (boardSize - 1)) continue;

            const prevCellNumber = cell + 1;
            const moveResult = move(board, cell, prevCellNumber);
            moved = moved || moveResult.moved;
            score += moveResult.score;
            canMove = canMove || moveResult.moved;
        }
    } while (canMove);
    

    return { moved, score };
}

export function moveDown(board, boardSize) {
    resetTileFlags(board);
    let moved = false;
    let score = 0;

    // repeat till no more moves can be made
    let canMove;

    do {
        canMove = false;
        // start from the second last row and move the tiles down - skip the last row
        for (let cell = (boardSize * boardSize) - boardSize - 1; cell >= 0; cell--) {
            const prevCellNumber = cell + boardSize;
            const moveResult = move(board, cell, prevCellNumber);
            moved = moved || moveResult.moved;
            score += moveResult.score;
            canMove = canMove || moveResult.moved;
        }
    } while (canMove);
    

    return { moved, score };
}

export function moveUp(board, boardSize) {
    resetTileFlags(board);
    let moved = false;
    let score = 0;

    // repeat till no more moves can be made
    let canMove;

    do {
        canMove = false;
        // start from the second row and move the tiles up - skip the first row
        for (let cell = boardSize; cell < boardSize * boardSize; cell++) {
            const prevCellNumber = cell - boardSize;
            const moveResult = move(board, cell, prevCellNumber);
            moved = moved || moveResult.moved;
            score += moveResult.score;
            canMove = canMove || moveResult.moved;
        }
    } while (canMove);
    

    return { moved, score };
}

function move(board, cell, prevCellNumber) {
    const prevCell = board[prevCellNumber];
    const currentCell = board[cell];
    let moved = false;
    let score = 0;
    // let canMove = false;

    // if previous cell is empty, move current cell to previous cell
    if (prevCell === null && currentCell !== null) {
        board[prevCellNumber] = currentCell;
        board[cell] = null;
        moved = true;
        // canMove = true; 
    }

    // if previous cell has the same value as current cell, merge them
    if (prevCell !== null && currentCell !== null
        && prevCell.value === currentCell.value
        && !prevCell.isJustMerged && !currentCell.isJustMerged
    ) {
        const mergedCell = new Tile(prevCell.value * 2);
        mergedCell.isJustSpawned = false;
        mergedCell.isJustMerged = true;        
    
        board[prevCellNumber] = mergedCell;
        board[cell] = null;

        score += mergedCell.value;
        moved = true;
        // canMove = true;
    }

    return { moved, score };
}

function getRandomTileValue() {
    return Math.random() < 0.8 ? 2 : 4;
}

function getRandomEmptyCellIndex(board) {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * board.length);
    } while (board[randomIndex] !== null);

    return randomIndex;
}

function resetTileFlags(board) {
    board.forEach(tile => {
        if (tile !== null) {
            tile.isJustSpawned = false;
            tile.isJustMerged = false;
        }
    });
}