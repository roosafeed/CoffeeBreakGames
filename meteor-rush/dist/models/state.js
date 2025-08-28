import PubSub from "../services/pubsub.js";
export class GameState {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.level = 1;
        this.state = 'stopped';
        this.lastScoreUpdateTime = 0;
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
    setState(key, value) {
        this[key] = value;
        this.pubsub.emit(key, value);
    }
    addListener(key, listener) {
        this.pubsub.on(key, listener);
    }
    updateScore() {
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
//# sourceMappingURL=state.js.map