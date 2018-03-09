class Weapon {
    constructor(tank, template) {
        this.t = tank;

        this.cooldown = 0;
        this.bulletType = BULLET.basic;

        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    fire(x, y) {
        if (this.cooldown > 0) return;
        this.cooldown = this.t.bCool;
        bullets.push(new Bullet(this.t.pos.x, this.t.pos.y, x, y, this.bulletType, this.t));
    }

    // Call in case anything needs to be dynamically set
    init() {}

    update() {
        // Update cooldown
        if (this.cooldown > 0) this.cooldown--;
    }
}
