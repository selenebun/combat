class Tank extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // AI
        this.ai = {};                   // AI

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
        this.bulletType = BULLET.basic; // projectile type
        this.maxSpeed = ts / 60 * 4;    // maximum speed
        
        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    act() {
        this.ai.act();
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
        if (diff < radians(30)) return;

        // Go right or left depending on which is faster
        if ((this.pos.x - x) * sin(this.angle) > (this.pos.y - y) * cos(this.angle)) {
            this.right();
        } else {
            this.left();
        }
    }

    // Fire projectile in direction
    fire(x, y) {
        bullets.push(new Bullet(this.pos.x, this.pos.y, x, y, this.bulletType));
    }

    // Accelerate tank forwards
    forward() {
        this.speed = lerp(this.speed, this.maxSpeed, 0.05);
    }

    // Call in case anything needs to be dynamically set
    init() {
        this.ai = new TankAI(this, this.ai);
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
        if (diff < radians(30)) {
            this.forward();
        } else {
            this.face(x, y);
        }
    }

    // Explode on death
    onDeath() {
        ps.push(new ParticleSystem(this.pos.x, this.pos.y, PS.explosion));
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
