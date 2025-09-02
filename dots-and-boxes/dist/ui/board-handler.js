import { gameState, markEdgeByCurrentPlayer } from "../main.js";
const boardContainer = document.getElementById("game-board");
const boardSizeInput = document.getElementById("board-size");
const boardSizeText = document.getElementById("sizeLabel");
boardSizeInput.addEventListener('input', () => {
    const size = parseInt(boardSizeInput.value);
    boardSizeText.innerText = `${size}x${size}`;
    gameState.setSize(size);
});
export default function drawBoard(board) {
    // clear the board
    while (boardContainer.firstChild) {
        boardContainer.removeChild(boardContainer.lastChild);
    }
    // cells = 2n - 1 tracks
    const n = board.length;
    const tracks = (2 * n) - 1;
    boardContainer.style.setProperty('--cells', `${tracks}`);
    for (const row of board) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('board-row');
        const row2Div = document.createElement('div');
        row2Div.classList.add('board-row', 'board-row-vertical-edges');
        for (const dot of row) {
            const dotDiv = document.createElement('div');
            dotDiv.classList.add('dot');
            dotDiv.id = `dot-${dot.getRow()}-${dot.getCol()}`;
            rowDiv.appendChild(dotDiv);
            // draw right and bottom edge if they exist
            const r = dot.getRow();
            const c = dot.getCol();
            if (dot.getEdge(r, c + 1) !== null) {
                // draw right edge
                const rightEdge = document.createElement('button');
                rightEdge.classList.add('edge', 'edge-horizontal', 'unmarked');
                rightEdge.id = `edge-${r}-${c}-h`;
                rightEdge.onclick = (e) => {
                    // mark edge
                    const userColor = markEdgeByCurrentPlayer(dot.getEdge(r, c + 1));
                    if (userColor !== null) {
                        rightEdge.classList.remove('unmarked');
                        rightEdge.setAttribute('data-color', userColor);
                    }
                };
                rowDiv.appendChild(rightEdge);
            }
            if (dot.getEdge(r + 1, c) !== null) {
                // draw bottom edge
                const bottomEdge = document.createElement('button');
                bottomEdge.classList.add('edge', 'edge-vertical', 'unmarked');
                bottomEdge.id = `edge-${r}-${c}-v`;
                bottomEdge.onclick = (e) => {
                    // mark edge
                    const userColor = markEdgeByCurrentPlayer(dot.getEdge(r + 1, c));
                    if (userColor !== null) {
                        bottomEdge.classList.remove('unmarked');
                        bottomEdge.setAttribute('data-color', userColor);
                    }
                };
                row2Div.appendChild(bottomEdge);
                // player placeholder
                const dotDiv = document.createElement('div');
                dotDiv.classList.add('player-placeholder');
                row2Div.appendChild(dotDiv);
            }
        }
        boardContainer.appendChild(rowDiv);
        boardContainer.appendChild(row2Div);
    }
}
//# sourceMappingURL=board-handler.js.map