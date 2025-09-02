export class Dot {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.edges = new Map();
    }
    getRow() {
        return this.row;
    }
    getCol() {
        return this.col;
    }
    addEdge(toRow, toCol, edge) {
        const edgeKey = this.getEdgeKey(toRow, toCol);
        if (!this.edges.has(edgeKey)) {
            this.edges.set(edgeKey, edge);
        }
    }
    getEdges() {
        return this.edges;
    }
    getEdge(toRow, toCol) {
        const edgeKey = this.getEdgeKey(toRow, toCol);
        return this.edges.get(edgeKey) || null;
    }
    getEdgeKey(toRow, toCol) {
        return `${toRow},${toCol}`;
    }
}
//# sourceMappingURL=dot.js.map