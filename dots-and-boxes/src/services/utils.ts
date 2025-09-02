import { Dot } from "../models/dot.js";
import { Edge } from "../models/edge.js";

function generateBoard(size: number): Dot[][] {
    const allDots: Dot[][] = generateAllDots(size);
    generateDotConnections(allDots, size);

    // return the head dot
    return allDots;
}

function checkIfBoxIsComplete(edge: Edge): number {
    let count = 0;
    const dots = edge.getDots();
    const from = dots[0]!;
    const to = dots[1]!;

    if (!from || !to)
        throw new Error("Invalid edge");

    const fR = from.getRow();
    const fC = from.getCol();
    const tR = to.getRow();
    const tC = to.getCol();

    // horizontal edge
    if (fR - tR === 0) {
        // check if their bottom edges are marked (opposite edge below)
        const b1 = from.getEdge(fR + 1, fC);
        const b2 = to.getEdge(tR + 1, tC);
        if (b1 !== null && b2 !== null) {            
            if (b1.isMarked() && b2.isMarked()) {
                let r: Dot;
                
                if (tC - fC < 0) {
                    // right to left
                    r = b1.getDestination(from)!;
                }
                else {
                    // left to right
                    r = b2.getDestination(to)!;
                }

                // check left of r
                const rle = r.getEdge(r.getRow(), r.getCol() - 1)!;

                if (rle.isMarked()) {
                    count++;
                }
            }
        }
        
        // check if their top edges are marked
        const u1 = from.getEdge(fR - 1, fC);
        const u2 = to.getEdge(tR - 1, tC);
        if (u1 !== null && u2 !== null) {            
            if (u1.isMarked() && u2.isMarked()) {
                let r: Dot;
                
                if (tC - fC < 0) {
                    // right to left
                    r = u1.getDestination(from)!;
                }
                else {
                    // left to right
                    r = u2.getDestination(to)!;
                }

                // check left of r
                const rle = r.getEdge(r.getRow(), r.getCol() - 1)!;

                if (rle.isMarked()) {
                    count++;
                }
            }
        }
    }

    // vertical edge
    if (fC - tC === 0) {
        // check if their left edges are marked (opposite edge on left side)
        const l1 = from.getEdge(fR, fC - 1);
        const l2 = to.getEdge(tR, tC - 1);
        if (l1 !== null && l2 !== null) {            
            if (l1.isMarked() && l2.isMarked()) {
                let u: Dot;
                
                if (tR - fR < 0) {
                    // top to bottom
                    u = l2.getDestination(to)!;
                }
                else {
                    // bottom to top
                    u = l1.getDestination(from)!;
                }
                
                // check bottom of u
                const ute = u.getEdge(u.getRow() + 1, u.getCol())!;

                if (ute.isMarked()) {
                    count++;
                }
            }
        }

        // check if their right edges are marked
        const r1 = from.getEdge(fR, fC + 1);
        const r2 = to.getEdge(tR, tC + 1);
        if (r1 !== null && r2 !== null) {            
            if (r1.isMarked() && r2.isMarked()) {
                let u: Dot;
                
                if (tR - fR < 0) {
                    // top to bottom
                    u = r2.getDestination(to)!;
                }
                else {
                    // bottom to top
                    u = r1.getDestination(from)!;
                }
                
                // check bottom of u
                const ute = u.getEdge(u.getRow() + 1, u.getCol())!;

                if (ute.isMarked()) {
                    count++;
                }
            }
        }
    }

    return count;
}

function generateAllDots(boardSize: number): Dot[][] {
    let dots: Dot[][] = [];

    for (let r = 0; r < boardSize; r++) {
        let row: Dot[] = [];

        for (let c = 0; c < boardSize; c++) {
            row.push(new Dot(r, c));
        }

        dots.push(row);
    }

    return dots;
}

function generateDotConnections(dots: Dot[][], boardSize: number): void {
    for (const row of dots) {
        for (const dot of row) {
            const cr = dot.getRow();
            const cc = dot.getCol();

            if (cr < boardSize - 1) {
                // connect down
                const bottom = dots[cr + 1][cc];
                const edge = new Edge(dot, bottom);
                dot.addEdge(cr + 1, cc, edge);
                bottom.addEdge(cr, cc, edge);
            }

            if (cc < boardSize - 1) {
                // connect right
                const right = dots[cr][cc + 1];
                const edge = new Edge(dot, right);
                dot.addEdge(cr, cc + 1, edge);
                right.addEdge(cr, cc, edge);
            }
        }
    }
}

export {generateBoard, checkIfBoxIsComplete};