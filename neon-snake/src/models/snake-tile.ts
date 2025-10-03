export class SnakeTile {
    private position: number;
    private x: number;
    private y: number;
    private isHeadTile: boolean;
    private isGrowthPending: boolean;

    constructor(position: number, x: number, y: number, isHead: boolean, isGrowthPending?: boolean) {
        this.position = position;
        this.x = x;
        this.y = y;
        this.isHeadTile = isHead;
        this.isGrowthPending = !!isGrowthPending;
    }

    moveTo(newX: number, newY: number): void {
        this.x = newX;
        this.y = newY;
    }

    isHead(): boolean {
        return this.isHeadTile;
    }

    getPosition(): number {
        return this.position;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getIsGrowthPending(): boolean {
        return this.isGrowthPending;
    }

    setIsGrowthPending(isGrowthPending: boolean): void {
        this.isGrowthPending = isGrowthPending;
    }
}