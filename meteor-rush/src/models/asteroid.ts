import { Drawable } from "./drawable.js";

export class Asteroid extends Drawable {
    private speed: number = 2;
    private canvasHeight: number;

    constructor(
        size: number, 
        positionX: number, 
        positionY: number, 
        maxHeight: number,
        speed?: number
    ) { 
        // --asteroid: #ff3b3b;
        // --asteroid-alt: #ffa500;
        const fillColor = Math.random() > 0.5 ? "#ff3b3b" : "#ffa500";
        super(positionX, positionY, 'circle', size, fillColor);
        this.canvasHeight = maxHeight;
        if (speed) this.speed = speed;
    }

    public moveDown(): void {
        if (!this.isOutOfBounds()) {
            this.positionY += this.speed;
        }
    }

    public getPosition(): { x: number; y: number } {
        return { x: this.positionX, y: this.positionY };
    }

    public isOutOfBounds(): boolean {
        return this.positionY > this.canvasHeight + this.size;
    }

    public getSize(): number {
        return this.size;
    }

    private move(): void {
        this.positionY += this.speed;
    }
}