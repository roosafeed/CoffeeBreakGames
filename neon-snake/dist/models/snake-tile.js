export class SnakeTile {
    constructor(position, x, y, isHead, isGrowthPending) {
        this.position = position;
        this.x = x;
        this.y = y;
        this.isHeadTile = isHead;
        this.isGrowthPending = !!isGrowthPending;
    }
    moveTo(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
    isHead() {
        return this.isHeadTile;
    }
    getPosition() {
        return this.position;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getIsGrowthPending() {
        return this.isGrowthPending;
    }
    setIsGrowthPending(isGrowthPending) {
        this.isGrowthPending = isGrowthPending;
    }
}
//# sourceMappingURL=snake-tile.js.map