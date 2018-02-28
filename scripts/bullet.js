class Bullet extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // Display
        this.model = MODEL.basicBullet; // skin

        // Physics
        this.vel = createVector();      // velocity
        this.radius = ts / 6;           // hitbox radius

        // Fill in any other properties from the template
        applyTemplate(this, template);
    }

    update() {
        this.pos.add(this.vel);
    }
}
