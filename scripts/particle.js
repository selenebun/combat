class Particle extends Entity {
    constructor(x, y, speed, template) {
        super(x, y);

        // Display
        this.color = 0;
        this.model = MODEL.basicParticle;   // skin

        // Misc
        this.decay = 2;
        this.lifespan = 255;

        // Physics
        this.vel = p5.Vector.random2D().mult(random(speed));
        this.angle = random(TWO_PI);
        this.angVel = random(-1, 1);
        this.radius = random(8, 16);

        // Fill in any other properties from the template
        applyTemplate(this, template);
    }

    update() {
        this.pos.add(this.vel);
        this.angle += this.angVel;
        if (this.lifespan > 0) this.lifespan -= this.decay;
    }
}
