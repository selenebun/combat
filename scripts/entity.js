class Entity {
    constructor(x, y, template) {
        // Display
        this.model = MODEL.null;        // skin

        // Misc
        this.dead = false;

        // Physics
        this.pos = createVector(x, y);  // position
        this.radius = ts / 6;           // hitbox radius

        // Fill in any other properties from the template
        applyTemplate(this, template);
    }

    act() {
        this.update();
        if (!offScreen(this.pos.x, this.pos.y, this.radius)) this.display();
    }

    // Check if point is inside hitbox
    contains(x, y) {
        return sq(x - this.pos.x) + sq(y - this.pos.y) < sq(this.radius);
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

    update() {}
}
