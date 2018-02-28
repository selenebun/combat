class Tank extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // Display
        this.model = MODEL.basicTank;   // skin
        this.primary = '#007C21';       // body color
        this.secondary = '#005C01';     // turret color

        // Physics
        this.speed = 0;                 // current speed
        this.angle = random(TWO_PI);    // angle of tank
        this.gunAngle = 0;              // angle of turret relative to tank
        this.radius = ts * 0.6;         // hitbox radius

        // Stats
        this.angSpeed = radians(2);     // turning speed
        this.armor = 0;                 // shielding
        this.maxSpeed = ts / 60 * 4;    // maximum speed
        
        // Fill in any other properties from the template
        applyTemplate(this, template);
    }

    damage() {
        this.armor > 0 ? this.armor-- : this.dead = true;
    }

    update() {
        // Add velocity vector in direction of the angle
        this.pos.add(p5.Vector.fromAngle(this.angle, this.speed));
    }
}
