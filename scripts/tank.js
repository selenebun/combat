class Tank extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // AI
        this.ai = AI.null;              // AI

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

    act() {
        this.ai(this);
        super.act();
    }

    // Aim barrel
    aim(x, y) {
        let d = createVector(x, y).sub(this.pos);
        this.gunAngle = d.heading() - this.angle;
    }

    // Accelerate tank backwards
    backward() {
        this.speed = lerp(this.speed, -this.maxSpeed, 0.05);
    }

    // Deal damage to tank
    damage() {
        this.armor > 0 ? this.armor-- : this.dead = true;
    }

    // Angle tank towards point
    face(x, y) {
        // Don't turn if approximately facing right direction
        let a = createVector(x, y).sub(this.pos).heading();
        let diff = abs(this.angle - a);
        if (diff < this.angSpeed) return;

        // Go right or left depending on which is faster
        if ((this.pos.x - x) * sin(this.angle) > (this.pos.y - y) * cos(this.angle)) {
            this.right();
        } else {
            this.left();
        }
    }

    // Accelerate tank forwards
    forward() {
        this.speed = lerp(this.speed, this.maxSpeed, 0.05);
    }

    // Turn tank left
    left() {
        this.angle -= this.angSpeed;
    }

    // Navigate to point
    navigateTo(x, y) {
        if (this.contains(x, y)) {
            this.stop();
            return;
        }
        let a = createVector(x, y).sub(this.pos).heading();
        let diff = abs(this.angle - a);
        if (diff < this.angSpeed) {
            this.forward();
        } else {
            this.face(x, y);
        }
    }

    // Turn tank right
    right() {
        this.angle += this.angSpeed;
    }

    // Stop tank
    stop() {
        this.speed = 0;
    }

    update() {
        // Add velocity vector in direction of the angle
        this.pos.add(p5.Vector.fromAngle(this.angle, this.speed));
    }
}
