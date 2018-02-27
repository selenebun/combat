const MODELS = {};

MODELS.basicTank = function(t) {
    push();

    translate(t.pos.x, t.pos.y);
    rotate(t.angle);

    // Draw treads
    fill('#3C4A59');
    stroke(0);
    rectMode(CENTER);
    let d = ts * 0.33;
    rect(0, d, ts * 1.15, ts * 0.2);
    rect(0, -d, ts * 1.15, ts * 0.2);


    // Draw tank body
    fill('#006C11');
    rect(0, 0, ts, ts * 0.7, ts * 0.15);

    // Draw markings on front
    let m = ts * 0.45;
    let c = ts * 0.35;
    let e = ts * 0.15;
    fill('#606060');
    triangle(m, 0, c, e, c, -e);

    rotate(t.gunAngle);

    // Draw barrel
    let r = ts * 0.35;
    fill('#808080');
    rect(r, 0, r * 2, ts * 0.2);

    // Draw muzzle
    let w = ts * 0.05;
    fill('#606060');
    rect(r * 2 + w, 0, w * 2, ts * 0.3);

    // Draw turret
    fill('#005C01');
    ellipse(0, 0, ts * 0.5, ts * 0.5);

    pop();
};
