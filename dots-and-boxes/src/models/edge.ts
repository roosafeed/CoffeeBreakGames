import { Dot } from "./dot.js";
import { Player } from "./player.js";

export class Edge {
    private markedBy: Player | null = null;
    private readonly d1: Dot | null = null;
    private readonly d2: Dot | null = null;

    constructor(from: Dot, to: Dot) {
        this.d1 = from;
        this.d2 = to;
    }

    public markEdge(player: Player): void {
        this.markedBy = player;
    }

    public isMarked(): boolean {
        return this.markedBy !== null;
    }

    public getMarkedBy(): Player | null {
        return this.markedBy;
    }

    public getDestination(source: Dot): Dot | null {
        if (this.d1?.getCol() === source.getCol()
            && this.d1.getRow() === source.getRow()
        ) {
            return this.d2;
        }

        if (this.d2?.getCol() === source.getCol()
            && this.d2.getRow() === source.getRow()) {
            return this.d1;
        }

        return null;
    }

    public getDots(): [Dot, Dot] {
        return [this.d1!, this.d2!];
    }
}