import { Edge } from "./models/edge.js";
import { GameState } from "./models/game-state.js";
import { Player } from "./models/player.js";
import { checkIfBoxIsComplete } from "./services/utils.js";
import { gameStateChangeInputHandler } from "./ui/inputs.js";
import { addPlayerToUI, createPlayerElement } from "./ui/players-handlers.js";

// create 2 players
const player1 = new Player("Player 1", "#00E5FF");
const player2 = new Player("Player 2", "#A3FF12");

// render players in the UI
player1.setElement(createPlayerElement(player1));
player2.setElement(createPlayerElement(player2));

addPlayerToUI(player1);
addPlayerToUI(player2);

const gameState = new GameState(5);
gameState.addListener('state', gameStateChangeInputHandler);

gameState.setState('state', 'stopped');

gameState.addPlayer(player1);
gameState.addPlayer(player2);


function markEdgeByCurrentPlayer(edge: Edge): string | null {
    if (gameState.getState('state') !== 'running') return null;

    if (!edge.isMarked()) {
        const player = gameState.getCurrentPlayer();
        edge.markEdge(player);
        console.log(edge);

        // check for box completion
        const completedBoxes = checkIfBoxIsComplete(edge);

        // should player play again?
        if (completedBoxes > 0) {
            player.incrementScore(completedBoxes);
        }
        else {
            // else, next player turn
            gameState.nextPlayer();
        }        

        return player.getColor();
    }

    return null;
}

function startGame() {
    gameState.setState('state', 'running');
    gameState.nextPlayer();
}

function stopGame() {
    gameState.setState('state', 'stopped');
}

function restartGame() {
    stopGame();
    gameState.getState('players').forEach((player) => {
        player.setIsMyTurn(false);
        player.resetScore();
    });
    gameState.setSize(gameState.getState('size'));
}

export {gameState, markEdgeByCurrentPlayer, startGame, stopGame, restartGame};