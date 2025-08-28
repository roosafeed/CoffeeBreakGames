export class Drawable {
    constructor(positionX, positionY, shape, size, fillStyle = "cyan", strokeStyle = "white") {
        this.positionX = positionX;
        this.positionY = positionY;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.shape = shape;
        this.size = size;
    }
    draw(ctx) {
        if (this.shape === 'triangle') {
            this.drawTriangle(ctx);
        }
        else if (this.shape === 'circle') {
            this.drawCircle(ctx);
        }
    }
    getTriangleVertices() {
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
    drawTriangle(ctx) {
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
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
    }
}
//# sourceMappingURL=drawable.js.map