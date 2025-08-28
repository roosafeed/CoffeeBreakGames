import { Asteroid } from "./asteroid";
import { Rocket } from "./rocket";
import PubSub from "../services/pubsub.js";

export interface IState {
    score?: number;
    startTime?: number;
    highScore?: number;
    level?: number;
    player?: Rocket;
    asteroids?: Asteroid[];
    state: 'stopped' | 'running' | 'paused';
    setState<K extends keyof IState>(key: K, value: IState[K]): void;
    addListener<K extends keyof IState>(key: K, listener: (value: IState[K]) => void): void
    updateScore(): void;
}

export class GameState implements IState {
    score: number = 0;
    highScore: number = 0;
    level: number = 1;
    player?: Rocket;
    asteroids?: Asteroid[];
    state: 'stopped' | 'running' | 'paused' = 'stopped';
    private pubsub: PubSub;
    private lastScoreUpdateTime: number = 0;

    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.level = 1;
        this.state = 'stopped';

        this.pubsub = new PubSub();

        this.pubsub.on('state', (newState) => {
            if (newState === 'paused' || newState === 'stopped') {
                // reset timer
                this.lastScoreUpdateTime = 0;
            }
        });
    }

    public setState<K extends keyof IState>(key: K, value: IState[K]): void {
        (this as IState)[key] = value;
        this.pubsub.emit(key, value);
    }

    public addListener<K extends keyof IState>(key: K, listener: (value: IState[K]) => void): void {
        this.pubsub.on(key, listener);
    }

    public updateScore(): void {
        if (!this.lastScoreUpdateTime || this.lastScoreUpdateTime === 0) {
            this.lastScoreUpdateTime = performance.now();
        }

        const now = performance.now();
        const elapsedSeconds = (now - this.lastScoreUpdateTime) / 1000;

        if (elapsedSeconds >= 1) { 
            const levelMultiplier = Math.min(5, this.level * 1.3);
            const deltaScore = Math.floor(elapsedSeconds * levelMultiplier);
            this.score += deltaScore;
            this.lastScoreUpdateTime = now;

            this.setState('score', this.score);
        }

        const level = Math.floor(this.score / 20) + 1;
        if (level !== this.level) {
            this.setState('level', level);
        }
    }
}