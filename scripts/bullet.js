class Bullet extends Entity {
    constructor(x, y, targetX, targetY, template) {
        super(x, y);

        // AI
        this.target = createVector(targetX, targetY);

        // Display
        this.model = MODEL.basicBullet; // skin

        // Physics
        this.vel = createVector();      // velocity
        this.radius = ts / 6;           // hitbox radius

        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    update() {
        this.pos.add(this.vel);
    }
}
