export default class Tile {
    value = 0;
    isJustSpawned = true;
    isJustMerged = false;

    constructor(value) {
        // validate input
        if (typeof value !== 'number' || value <= 0 || value >= 1024 || (value & (value - 1)) !== 0) {
            throw new Error('Tile value must be a positive power of 2');
        }

        this.isJustSpawned = true;
        this.value = value;
    }
}