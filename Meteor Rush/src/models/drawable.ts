export class Drawable {
    private fillStyle: string;
    private strokeStyle: string;
    positionX: number;
    positionY: number;
    shape: 'circle' | 'triangle';
    size: number;

    constructor(
        positionX: number,
        positionY: number,
        shape: 'circle' | 'triangle',
        size: number,
        fillStyle: string = "cyan", 
        strokeStyle: string = "white",        
    ) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.shape = shape;
        this.size = size;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        if (this.shape === 'triangle') {
            this.drawTriangle(ctx);
        } else if (this.shape === 'circle') {
            this.drawCircle(ctx);
        }
    }

    public getTriangleVertices(): { x1: number; y1: number; x2: number; y2: number; x3: number; y3: number } {
        if (this.shape !== 'triangle') {
            throw new Error("Shape is not a triangle");
        }
        return {
            x1: this.positionX, 
            y1: this.positionY, 
            x2: this.positionX + this.size, 
            y2: this.positionY, 
            x3: this.positionX + this.size / 2, 
            y3: this.positionY - this.size
        };
    }

    private drawTriangle(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        // move to bottom-left corner of triangle
        ctx.moveTo(this.positionX, this.positionY);
        ctx.lineTo(this.positionX + this.size, this.positionY); // bottom-right
        ctx.lineTo(this.positionX + this.size / 2, this.positionY - this.size); // top-center
        ctx.closePath();

        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
    }

    private drawCircle(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
    }
}