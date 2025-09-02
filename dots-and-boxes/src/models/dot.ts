import { Edge } from "./edge.js";

export class Dot {
    private row: number;
    private col: number;
    // <toRow, toCol> => Edge
    private edges: Map<string, Edge>;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.edges = new Map();
    }

    public getRow(): number {
        return this.row;
    }

    public getCol(): number {
        return this.col;
    }

    public addEdge(toRow: number, toCol: number, edge: Edge): void {
        const edgeKey = this.getEdgeKey(toRow, toCol);
        if (!this.edges.has(edgeKey)) {
            this.edges.set(edgeKey, edge);
        }
    }

    public getEdges(): Map<string, Edge> {
        return this.edges;
    }

    public getEdge(toRow: number, toCol: number): Edge | null {
        const edgeKey = this.getEdgeKey(toRow, toCol);
        return this.edges.get(edgeKey) || null;
    }

    private getEdgeKey(toRow: number, toCol: number): string {
        return `${toRow},${toCol}`;
    }
}