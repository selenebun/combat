let bullets;
let items;
let ps;
let tanks;

let map;

let pl;
let wave = 1;

let avgFPS = 0;
let numFPS = 0;

let mute = false;
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

// Generate map
function generateMap() {
    let x = floor(random(8, 64));
    let y = floor(4096 / x);
    map = generateRectMap(x, y);
}

// Generate rectangular map
function generateRectMap(cols, rows) {
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
    generateMap();
    resetEntities();
    spawnPlayer();
}

// Reset all entities
function resetEntities() {
    bullets = [];
    items = [];
    ps = [];
    tanks = [];

    spawnItems(20);
    spawnTanks();
    spawnPlayer();
}

// Spawn items
function spawnItems(count) {
    for (let i = 0; i < count; i++) {
        let p = map.randomPos();
        let r = random();
        let t;
        if (r < 0.2) {
            t = ITEM.shield;
        } else if (r < 0.4) {
            t = ITEM.shotgun;
        } else if (r < 0.6) {
            t = ITEM.fastFire;
        } else if (r < 0.8) {
            t = ITEM.moveSpeed;
        } else {
            t = ITEM.star;
        }
        items.push(new Item(p.x, p.y, t));
    }
}

// Spawn player at center of map
function spawnPlayer() {
    let c = map.center();
    pl = new Tank(c.x, c.y, TANK.player1);
}

// Spawn enemy tanks
function spawnTanks() {
    let p = map.randomPos();
    tanks.push(new Tank(p.x, p.y, TANK.boss));

    for (let i = 0; i < 2; i++) {
        let p = map.randomPos();
        tanks.push(new Tank(p.x, p.y, TANK.adv));
    }

    for (let i = 0; i < 2; i++) {
        let p = map.randomPos();
        tanks.push(new Tank(p.x, p.y, TANK.heavy));
    }

    for (let i = 0; i < 2; i++) {
        let p = map.randomPos();
        tanks.push(new Tank(p.x, p.y, TANK.fast));
    }

    for (let i = 0; i < 4; i++) {
        let p = map.randomPos();
        tanks.push(new Tank(p.x, p.y, TANK.basic));
    }
}

// Update game status on sidebar
function updateStatus() {
    document.getElementById('wave').innerHTML = 'Wave ' + wave;
    document.getElementById('armor').innerHTML = 'Armor: ' + pl.armor;
    document.getElementById('tanks').innerHTML = 'Tanks left: ' + tanks.length;
}


/*
 * Main p5.js functions
 */

function preload() {
    // Explosion sound
    SOUND.boom = loadSound('sounds/Boom2.wav');
    SOUND.boom.setVolume(0.6);

    // Item pickup sounds
    SOUND.pickup1 = loadSound('sounds/FX1.wav');
    SOUND.pickup2 = loadSound('sounds/FX2.wav');
    SOUND.pickup2.setVolume(0.4);

    // Shooting sound
    SOUND.shoot = loadSound('sounds/Percussion_24_SP.wav');
    SOUND.shoot.setVolume(0.35);
}

function setup() {
    let div = document.getElementById('game');
    let canvas = createCanvas(div.offsetWidth, div.offsetHeight);
    canvas.parent(div);
    resizeCanvas(div.offsetWidth, div.offsetHeight, true);

    // Generate the map
    generateMap();

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
    mainLoop(items);
    mainLoop(tanks);
    pl.act();
    mainLoop(ps);

    // Handle player death
    if (pl.dead) playerDead();

    // Spawn more items and enemy tanks if all are dead
    if (tanks.length === 0) {
        spawnItems(4);
        spawnTanks();
    }
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
