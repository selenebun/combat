class Map {
    constructor(tiles) {
        this.tiles = tiles;
    }

    // Get dimensions of the map in the form {cols, rows}
    dim() {
        return {cols: this.tiles.length, rows: this.tiles[0].length};
    }

    // Render each tile in the map
    display() {
        for (let x = 0; x < this.tiles.length; x++) {
            for (let y = 0; y < this.tiles[x].length; y++) {
                let t = TILES[this.tiles[x][y][0]];
                if (typeof t === 'function') {
                    t(ts * x, ts * y);
                } else {
                    fill(t);
                    noStroke();
                    rect(ts * x, ts * y, ts + 1, ts + 1);
                }
            }
        }
    }

    // Get tile at coordinates
    tile(x, y) {
        return this.tiles[x][y];
    }
}
