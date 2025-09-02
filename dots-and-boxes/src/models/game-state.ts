import PubSub from "../services/pubsub.js";
import { generateBoard } from "../services/utils.js";
import drawBoard from "../ui/board-handler.js";
import { Dot } from "./dot.js";
import { Player } from "./player.js";

export interface IState {
    size: number;
    players: Player[];
    currentPlayerIndex: number;
    state: 'stopped' | 'running';
    board: Dot[][];
    setState<K extends keyof IState>(key: K, value: IState[K]): void;
    addListener<K extends keyof IState>(key: K, listener: (value: IState[K]) => void): void
}

export class GameState implements IState {
    size: number;
    players: Player[] = [];
    currentPlayerIndex: number;
    state: 'stopped' | 'running';
    board: Dot[][];

    private pubsub: PubSub;

    constructor(size: number) {
        this.state = 'stopped';
        this.size = size;
        this.board = [];
        this.currentPlayerIndex = -1;
        this.generateBoard();        

        this.pubsub = new PubSub();
    }

    public setState<K extends keyof IState>(key: K, value: IState[K]): void {
        (this as IState)[key] = value;
        this.pubsub.emit(key, value);

        // todo: clean up this logic
        if (key === 'size') {
            this.generateBoard();
        }
    }

    public getState<K extends keyof IState>(key: K): IState[K] {
        return (this as IState)[key];
    }

    public addListener<K extends keyof IState>(key: K, listener: (value: IState[K]) => void): void {
        this.pubsub.on(key, listener);
    }

    public addPlayer(player: Player) {
        if (this.state !== 'stopped') throw Error("Can't add a player while game is running.");

        if (!this.players.some(p => p.getName().toLowerCase().trim() === player.getName().toLowerCase().trim())) {
            this.players.push(player);
            this.pubsub.emit('player', player);
        }
    }

    public removePlayer(playerName: string) {
        const indexToRemove = this.players.findIndex(p => p.getName().toLowerCase().trim() === playerName.toLowerCase().trim());
        if (indexToRemove >= 0) {
            this.players.splice(indexToRemove, 1);
            this.pubsub.emit('player', null);
        }
    }
    
    public getCurrentPlayer(): Player {
        if (this.currentPlayerIndex < 0 || this.currentPlayerIndex >= this.players.length) throw Error("Invalid current player index");

        return this.players[this.currentPlayerIndex];
    }

    public nextPlayer(): void {
        if (this.state !== 'running') throw Error("Can't move to next player when game isn't running.");

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

    public setSize(size: number) {
        if (size < 3 || size > 10) throw Error("Size must be between 3 and 10");
        if (this.state !== 'stopped') throw Error("Can't change the board while game is running.");
        
        this.size = size;
        this.pubsub.emit('size', size);
        this.generateBoard();
    }

    private generateBoard(): void {
        if (this.state !== 'stopped') throw Error("Can't change the board while game is running.");

        this.board = generateBoard(this.size);
        drawBoard(this.board);
    }
}