class Particle extends Entity {
    constructor(x, y, speed, template) {
        super(x, y);

        // Display
        this.color = [0, 0, 0];             // base RGB color
        this.model = MODEL.basicParticle;   // skin

        // Misc
        this.decay = 2;
        this.lifespan = 255;

        // Physics
        this.vel = p5.Vector.random2D().mult(random(speed));
        this.angle = 0;
        this.angVel = 0;
        this.radius = 8;

        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    update() {
        this.pos.add(this.vel);
        this.angle += this.angVel;
        if (this.lifespan > 0) this.lifespan -= this.decay;
    }
}
