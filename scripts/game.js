let bullets;
let ps;
let tanks;

let map;

let armor = 0;
let kills = 0;
let lives = 3;
let pl;
let wave = 1;

let ts = 48;

let avgFPS = 0;
let numFPS = 0;

let showFPS = false;
let showHitboxes = false;


/*
 * Other functions
 */

// Calculate FPS and FPS average and update sidebar with it
function calcFPS() {
    let fps = frameRate();
    avgFPS += (fps - avgFPS) / ++numFPS;

    document.getElementById('fps').innerHTML = 'FPS: ' + fps.toFixed(1);
    document.getElementById('avgfps').innerHTML = 'Avg. FPS: ' + avgFPS.toFixed(1); 
}

// Generate rectangular map
function generateMap(cols, rows) {
    let tiles = [];
    for (let x = 0; x < cols; x++) {
        tiles[x] = [];
        for (let y = 0; y < rows; y++) {
            if (x === 0 || y === 0 || x === cols-1 || y === rows-1) {
                tiles[x][y] = ['wall'];
            } else {
                tiles[x][y] = ['concrete'];
            }
        }
    }
    return new Map(tiles);
}

// Handle player death
function playerDead() {
    if (lives > 0) {
        lives--;
    } else {
        lives = 3;
        resetEntities();
    }

    // Respawn player at center
    spawnPlayer();
}

// Reset all entities
function resetEntities() {
    bullets = [];
    ps = [];
    tanks = [];
    for (let i = 0; i < 10; i++) {
        let p = map.randomPos();
        tanks.push(new Tank(p.x, p.y, TANK.hunter));
    }
    spawnPlayer();
}

// Spawn player at center of map
function spawnPlayer() {
    let c = map.center();
    pl = new Tank(c.x, c.y, TANK.player1);
}

// Update game status on sidebar
function updateStatus() {
    document.getElementById('wave').innerHTML = 'Wave ' + wave;
    document.getElementById('lives').innerHTML = 'Lives: ' + lives + '/3';
    document.getElementById('armor').innerHTML = 'Armor: ' + armor;
    document.getElementById('kills').innerHTML = 'Kills: ' + kills;
}


/*
 * Main p5.js functions
 */

function setup() {
    let div = document.getElementById('game');
    let canvas = createCanvas(div.offsetWidth, div.offsetHeight);
    canvas.parent(div);
    resizeCanvas(div.offsetWidth, div.offsetHeight, true);

    // Generate rectangular map
    map = generateMap(48, 32);

    // Generate player and enemy tanks
    resetEntities();
}

function draw() {
    background(0);

    // Update game status
    if (showFPS) calcFPS();
    updateStatus();

    // Draw map
    translate(width/2 - pl.pos.x, height/2 - pl.pos.y);
    map.display();

    // Player movement
    controls();

    // Entities
    mainLoop(bullets);
    mainLoop(tanks);
    pl.act();
    mainLoop(ps);

    // Handle player death
    if (pl.dead) playerDead();
}


/*
 * User input functions
 */

function controls() {
    // W or up arrow
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) pl.forward();

    // A or left arrow
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) pl.left();

    // S or down arrow
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) pl.backward();

    // D or right arrow
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) pl.right();

    // Aim barrel according to adjusted mouse position
    let m = adjustMouse();
    pl.aim(m.x, m.y);
}

function keyPressed() {
    if (key === 'F') {
        showFPS = !showFPS;
        if (!showFPS) {
            document.getElementById('fps').innerHTML = '';
            document.getElementById('avgfps').innerHTML = '';
        }
    }
    if (key === 'H') showHitboxes = !showHitboxes;
}

function keyReleased() {
    // W or S or up or down arrow
    if (keyCode === 87 || keyCode === 83 || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        pl.stop();
    }
}

function mousePressed() {
    // Fire bullet in direction of mouse click
    let m = adjustMouse();
    pl.fire(m.x, m.y);
}
