class Bullet extends Entity {
    constructor(x, y, targetX, targetY, template) {
        super(x, y);

        // AI
        this.target = createVector(targetX, targetY);

        // Display
        this.model = MODEL.basicBullet; // skin

        // Physics
        this.radius = ts / 6;           // hitbox radius
        this.speed = ts / 8;

        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Set velocity
        this.vel = p5.Vector.sub(this.target, this.pos).setMag(this.speed);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    act() {
        this.update();
        // Check for collisions
        for (let i = 0; i < tanks.length; i++) {
            let t = tanks[i];
            if (this.collide(t)) {
                t.damage();
                this.dead = true;
            }
        }
        this.display();
    }

    update() {
        this.pos.add(this.vel);
        if (offScreen(this.pos.x, this.pos.y, this.radius)) this.dead = true;
    }
}
