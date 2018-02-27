class Tank {
    constructor(x, y, template) {
        // AI
        //this.ai

        // Display
        this.model = MODELS.basicTank;

        // Misc
        this.dead = false;
        this.health = 1;

        // Physics
        this.angle = 0;
        this.gunAngle = 0;
        this.pos = createVector(x, y);
        this.vel = createVector(0.3, 0.3);

        // Fill in any other properties from the template
        applyTemplate(this, template);
    }

    act() {
        this.update();
        this.display();
    }

    display() {
        this.model(this);
    }

    update() {
        this.pos.add(this.vel);
    }
}
