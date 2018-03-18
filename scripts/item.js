class Item extends Entity {
    constructor(x, y, template) {
        super(x, y);

        // Display
        this.color = COLOR.blue;        // color
        this.model = MODEL.null;        // skin

        // Physics
        this.radius = ts / 4;
        
        // Fill in any other properties from the template
        applyTemplate(this, template);

        // Call init() method in case anything else needs to be set
        this.init();
    }

    action(t) {}

    onPickup(t) {
        if (t === pl) play(random() < 0.5 ? 'pickup1' : 'pickup2');
        this.action(t);
    }
}
