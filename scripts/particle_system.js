class ParticleSystem {
    constructor(x, y, template) {
        this.dead = false;
        this.num = 0;
        this.particles = [];
        this.pos = createVector(x, y);
        this.pTemp = {};
        this.speed = 0;

        // Fill in any other properties from the template
        applyTemplate(this, template);

        this.addParticle(this.num);
    }

    act() {
        if (this.particles.length === 0) {
            this.dead = true;
            return;
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.act();
            if (p.lifespan <= 0) this.particles.splice(i, 1);
        }
    }

    addParticle(num) {
        num = typeof num === 'undefined' ? 1 : num;
        for (let i = 0; i < num; i++) {
            this.particles.push(new Particle(this.pos.x, this.pos.y, this.speed, this.pTemp));
        }
    }
}
