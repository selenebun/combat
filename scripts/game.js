let bullets = [];
let map;
let tanks = [];

let lives = 3;
let pl;
let wave = 1;

let ts = 48;


/*
 * Other functions
 */

function adjustCamera() {
    // x and y offset
    let x = width/2;
    let y = height/2;

    if (pl.pos.x <= width/2) {
        x = pl.pos.x;
    }
    if (pl.pos.y <= height/2) {
        y = pl.pos.y;
    }
    
    translate(x - pl.pos.x, y - pl.pos.y);
}

function updateStatus() {
    document.getElementById('wave').innerHTML = 'Wave ' + wave;
    document.getElementById('lives').innerHTML = 'Lives: ' + lives + '/3';
}


/*
 * Main p5.js functions
 */

function setup() {
    let div = document.getElementById('game');
    let canvas = createCanvas(div.offsetWidth, div.offsetHeight);
    canvas.parent(div);
    resizeCanvas(div.offsetWidth, div.offsetHeight, true);

    pl = new Tank(width/2, height/2, {
        gunAngle: radians(60),
    });

    let tiles = [];
    for (let x = 0; x < 32; x++) {
        tiles[x] = [];
        for (let y = 0; y < 24; y++) {
            if (x === 0 || y === 0 || x === 31 || y === 23) {
                tiles[x][y] = ['wall'];
            } else {
                tiles[x][y] = ['concrete'];
            }
        }
    }
    map = new Map(tiles);

    let d = map.dim();
    for (let i = 0; i < 10; i++) {
        tanks.push(new Tank(random(d.cols * ts), random(d.rows * ts), {
            angle: random(TWO_PI),
            gunAngle: random(TWO_PI)
        }));
    }
}

function draw() {
    background(0);

    // Update game status
    updateStatus();

    // Player movement
    controls();

    // Draw map
    adjustCamera();
    map.display();

    let entities = bullets.concat([pl]).concat(tanks);
    for (let i = entities.length - 1; i >= 0; i--) {
        let e = entities[i];
        e.act();
        if (e.dead) entities.splice(i, 1);
    }
}


/*
 * User input functions
 */

function controls() {
    // W
    if (keyIsDown(87)) pl.speed = lerp(pl.speed, pl.maxSpeed, 0.05);

    // A
    if (keyIsDown(65)) pl.angle -= pl.angleVel;

    // S
    if (keyIsDown(83)) pl.speed = lerp(pl.speed, -pl.maxSpeed, 0.05);

    // D
    if (keyIsDown(68)) pl.angle += pl.angleVel;


    // x and y offset
    let x = width/2;
    let y = height/2;

    if (pl.pos.x <= width/2) {
        x = pl.pos.x;
    }
    if (pl.pos.y <= height/2) {
        y = pl.pos.y;
    }

    // Aim gun at mouse position
    let m = createVector(mouseX + pl.pos.x - x, mouseY + pl.pos.y - y);
    pl.gunAngle = m.sub(pl.pos).heading() - pl.angle;
}

function keyReleased() {
    // W or S
    if (keyCode === 87 || keyCode === 83) pl.speed = 0;
}
