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
        this.pos = createVector(x, y);

        this.speed = 0;
        this.maxSpeed = ts / 60 * 3;

        this.angle = 0;
        this.angleVel = radians(2);
        this.gunAngle = 0;

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
        let vel = p5.Vector.fromAngle(this.angle, this.speed);
        this.pos.add(vel);
    }
}
