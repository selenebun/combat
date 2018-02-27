let t;
let ts = 48;
let x = 0;


/*
 * Main p5.js functions
 */

function setup() {
    let div = document.getElementById('game');
    let canvas = createCanvas(div.offsetWidth, div.offsetHeight);
    canvas.parent(div);
    resizeCanvas(div.offsetWidth, div.offsetHeight, true);

    t = new Tank(width/2, height/2, {
        gunAngle: radians(60),
    });
}

function draw() {
    background(0);

    controls();

    /*
    // Entities is actually just tanks with projectiles concat
    for (let i = entities.length - 1; i >= 0; i--) {
        let e = entities[i];
        e.act();
        if (e.dead) entities.splice(i, 1);
    }
    */
    t.act();
}


/*
 * User input functions
 */

function controls() {
    // W
    if (keyIsDown(87)) t.speed = lerp(t.speed, t.maxSpeed, 0.05);

    // A
    if (keyIsDown(65)) t.angle -= t.angleVel;

    // S
    if (keyIsDown(83)) t.speed = lerp(t.speed, -t.maxSpeed, 0.05);

    // D
    if (keyIsDown(68)) t.angle += t.angleVel;

    // Aim gun at mouse position
    let m = createVector(mouseX, mouseY);
    t.gunAngle = m.sub(t.pos).heading() - t.angle;
}

function keyReleased() {
    // W or S
    if (keyCode === 87 || keyCode === 83) t.speed = 0;
}
