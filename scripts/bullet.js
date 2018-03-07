class Bullet extends Entity {
    constructor(x, y, targetX, targetY, template, owner) {
        super(x, y);

        // AI
        this.owner = owner;
        this.target = createVector(targetX, targetY);

        // Display
        this.model = MODEL.basicBullet; // skin

        // Physics
        this.radius = ts / 6;           // hitbox radius
        this.speed = ts / 7;

        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Set velocity
        this.vel = p5.Vector.sub(this.target, this.pos).setMag(this.speed);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    act() {
        super.act();
        // Check for collisions
        let targets = tanks.concat(pl);
        for (let i = 0; i < targets.length; i++) {
            let t = targets[i];
            if (t === this.owner) continue;
            if (!this.dead && this.collide(t)) {
                t.damage();
                this.dead = true;
            }
        }
    }

    update() {
        this.pos.add(this.vel);
        if (offScreen(this.pos.x, this.pos.y, this.radius)) this.dead = true;
    }
}
