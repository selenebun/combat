class Weapon {
    constructor(tank, template) {
        this.t = tank;

        this.cooldown = 0;
        this.bulletType = BULLET.basic;
        this.sound = 'shoot';

        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    fire(x, y) {
        if (this.cooldown > 0) return;
        this.cooldown = this.t.bCool;
        play(this.sound);
        let a = createVector(x, y).sub(this.t.pos).heading();
        bullets.push(new Bullet(this.t.pos.x, this.t.pos.y, a, this.bulletType, this.t));
    }

    // Call in case anything needs to be dynamically set
    init() {}

    update() {
        // Update cooldown
        if (this.cooldown > 0) this.cooldown--;
    }
}
