class TankAI {
    constructor(tank, template) {
        this.t = tank;

        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    act() {}

    // Call in case anything needs to be dynamically set
    init() {}
}
