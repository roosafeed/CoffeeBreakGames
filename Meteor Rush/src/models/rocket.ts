import { Drawable } from "./drawable.js";

export class Rocket extends Drawable {
    private speed: number = 5;
    private maxWidth: number;
    private rocketWidth: number;

    constructor(
        positionX: number,
        positionY: number,
        screenWidth: number,
    ) { 
        // --player: #00ffff;
        const fillColor = "#00ffff";
        const rocketWidth = 50;
        super(positionX, positionY, 'triangle', rocketWidth, fillColor);
        this.maxWidth = screenWidth;
        this.rocketWidth = rocketWidth;
    }

    public moveLeft(): void {
        this.positionX = Math.max(0, this.positionX - this.speed);
    }

    public moveRight(): void {
        this.positionX = Math.min(this.maxWidth - this.rocketWidth, this.positionX + this.speed);
    }

    public getPosition(): { x: number; y: number } {
        return { x: this.positionX, y: this.positionY };
    }

    public getSize(): number {
        return this.rocketWidth;
    }
}