import PubSub from "../services/pubsub.js";
import { generateBoard } from "../services/utils.js";
import drawBoard from "../ui/board-handler.js";
export class GameState {
    constructor(size) {
        this.players = [];
        this.state = 'stopped';
        this.size = size;
        this.board = [];
        this.currentPlayerIndex = -1;
        this.generateBoard();
        this.pubsub = new PubSub();
    }
    setState(key, value) {
        this[key] = value;
        this.pubsub.emit(key, value);
        // todo: clean up this logic
        if (key === 'size') {
            this.generateBoard();
        }
    }
    getState(key) {
        return this[key];
    }
    addListener(key, listener) {
        this.pubsub.on(key, listener);
    }
    addPlayer(player) {
        if (this.state !== 'stopped')
            throw Error("Can't add a player while game is running.");
        if (!this.players.some(p => p.getName().toLowerCase().trim() === player.getName().toLowerCase().trim())) {
            this.players.push(player);
            this.pubsub.emit('player', player);
        }
    }
    removePlayer(playerName) {
        const indexToRemove = this.players.findIndex(p => p.getName().toLowerCase().trim() === playerName.toLowerCase().trim());
        if (indexToRemove >= 0) {
            this.players.splice(indexToRemove, 1);
            this.pubsub.emit('player', null);
        }
    }
    getCurrentPlayer() {
        if (this.currentPlayerIndex < 0 || this.currentPlayerIndex >= this.players.length)
            throw Error("Invalid current player index");
        return this.players[this.currentPlayerIndex];
    }
    nextPlayer() {
        if (this.state !== 'running')
            throw Error("Can't move to next player when game isn't running.");
        if (this.currentPlayerIndex >= 0) {
            // initial condition for first time calling this method
            this.players[this.currentPlayerIndex].setIsMyTurn(false);
        }
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0;
        }
        this.players[this.currentPlayerIndex].setIsMyTurn(true);
    }
    setSize(size) {
        if (size < 3 || size > 10)
            throw Error("Size must be between 3 and 10");
        if (this.state !== 'stopped')
            throw Error("Can't change the board while game is running.");
        this.size = size;
        this.pubsub.emit('size', size);
        this.generateBoard();
    }
    generateBoard() {
        if (this.state !== 'stopped')
            throw Error("Can't change the board while game is running.");
        this.board = generateBoard(this.size);
        drawBoard(this.board);
    }
}
//# sourceMappingURL=game-state.js.map