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

    onPickup(t) {}
}
