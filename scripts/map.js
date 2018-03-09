class Map {
    constructor(tiles) {
        this.tiles = tiles;
    }

    // Get coords for center of map
    center() {
        let d = this.dim();
        return {x: ts * d.cols / 2, y: ts * d.rows / 2};
    }

    // Get dimensions of the map in the form {cols, rows}
    dim() {
        return {cols: this.tiles.length, rows: this.tiles[0].length};
    }

    // Render each tile in the map
    display() {
        let i = 0;
        rectMode(CORNER);
        for (let x = 0; x < this.tiles.length; x++) {
            for (let y = 0; y < this.tiles[x].length; y++) {
                let t = TILES[this.tiles[x][y][0]];
                let px = ts * x;
                let py = ts * y;
                
                // Don't draw tiles if off screen
                if ((px + ts < pl.pos.x - width/2) || (px > pl.pos.x + width/2) || (py + ts < pl.pos.y - height/2) || (py > pl.pos.y + height/2)) continue;

                if (typeof t === 'function') {
                    t(px, py);
                } else {
                    fill(t);
                    stroke(0, 63);
                    rect(px, py, ts + 1, ts + 1);
                }
            }
        }
    }

    // Get random coords within the map
    randomPos() {
        let d = this.dim();
        return {x: random(ts * d.cols), y: random(ts * d.rows)};
    }

    // Get tile at coordinates
    tile(x, y) {
        return this.tiles[x][y];
    }
}
