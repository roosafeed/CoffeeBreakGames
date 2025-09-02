export class Edge {
    constructor(from, to) {
        this.markedBy = null;
        this.d1 = null;
        this.d2 = null;
        this.d1 = from;
        this.d2 = to;
    }
    markEdge(player) {
        this.markedBy = player;
    }
    isMarked() {
        return this.markedBy !== null;
    }
    getMarkedBy() {
        return this.markedBy;
    }
    getDestination(source) {
        var _a, _b;
        if (((_a = this.d1) === null || _a === void 0 ? void 0 : _a.getCol()) === source.getCol()
            && this.d1.getRow() === source.getRow()) {
            return this.d2;
        }
        if (((_b = this.d2) === null || _b === void 0 ? void 0 : _b.getCol()) === source.getCol()
            && this.d2.getRow() === source.getRow()) {
            return this.d1;
        }
        return null;
    }
    getDots() {
        return [this.d1, this.d2];
    }
}
//# sourceMappingURL=edge.js.map