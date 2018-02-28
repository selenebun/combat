class Tank {
    constructor(x, y, template) {
        // Display
        this.model = MODELS.basicTank;  // skin
        this.primary = '#007C21';       // body color
        this.secondary = '#005C01';     // turret color

        // Misc
        this.dead = false;

        // Physics
        this.pos = createVector(x, y);  // position
        this.speed = 0;                 // current speed
        this.angle = random(TWO_PI);    // angle of tank
        this.gunAngle = 0;              // angle of turret relative to tank
        this.radius = ts * 0.6;         // radius of hitbox

        // Stats
        this.angVel = radians(2);       // turning rate
        this.armor = 0;                 // shields
        this.maxSpeed = ts / 60 * 4;    // maximum speed

        // Fill in any other properties from the template
        applyTemplate(this, template);
    }

    act() {
        this.update();
        this.display();
    }

    damage() {
        this.armor > 0 ? this.armor-- : this.dead = true;
    }

    display() {
        this.model(this);

        // Display hitbox
        if (showHitboxes) {
            fill(255, 0, 0, 63);
            stroke(255);
            ellipseMode(RADIUS);
            ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        }
    }

    update() {
        let vel = p5.Vector.fromAngle(this.angle, this.speed);
        this.pos.add(vel);
    }
}
