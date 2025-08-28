import { Drawable } from "./drawable.js";
export class Rocket extends Drawable {
    constructor(positionX, positionY, screenWidth) {
        // --player: #00ffff;
        const fillColor = "#00ffff";
        const rocketWidth = 50;
        super(positionX, positionY, 'triangle', rocketWidth, fillColor);
        this.speed = 5;
        this.maxWidth = screenWidth;
        this.rocketWidth = rocketWidth;
    }
    moveLeft() {
        this.positionX = Math.max(0, this.positionX - this.speed);
    }
    moveRight() {
        this.positionX = Math.min(this.maxWidth - this.rocketWidth, this.positionX + this.speed);
    }
    getPosition() {
        return { x: this.positionX, y: this.positionY };
    }
    getSize() {
        return this.rocketWidth;
    }
}
//# sourceMappingURL=rocket.js.map