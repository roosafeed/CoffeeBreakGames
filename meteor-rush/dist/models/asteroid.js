import { Drawable } from "./drawable.js";
export class Asteroid extends Drawable {
    constructor(size, positionX, positionY, maxHeight, speed) {
        // --asteroid: #ff3b3b;
        // --asteroid-alt: #ffa500;
        const fillColor = Math.random() > 0.5 ? "#ff3b3b" : "#ffa500";
        super(positionX, positionY, 'circle', size, fillColor);
        this.speed = 2;
        this.canvasHeight = maxHeight;
        if (speed)
            this.speed = speed;
    }
    moveDown() {
        if (!this.isOutOfBounds()) {
            this.positionY += this.speed;
        }
    }
    getPosition() {
        return { x: this.positionX, y: this.positionY };
    }
    isOutOfBounds() {
        return this.positionY > this.canvasHeight + this.size;
    }
    getSize() {
        return this.size;
    }
    move() {
        this.positionY += this.speed;
    }
}
//# sourceMappingURL=asteroid.js.map