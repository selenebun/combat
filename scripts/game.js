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
        angle: radians(35),
        gunAngle: radians(60)
    });
}

function draw() {
    background(0);

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

function keyPressed() {}
