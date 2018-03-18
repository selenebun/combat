// Get adjusted mouse coordinates based on camera
function adjustMouse() {
    return {x: mouseX + pl.pos.x - width/2, y: mouseY + pl.pos.y - height/2};
}

// Apply properties from a template to an object
function applyTemplate(obj, template) {
    if (typeof template === 'undefined') return;

    let keys = Object.keys(template);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        obj[key] = template[key];
    }
}

// Run main loop for an array of actors
function mainLoop(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let e = arr[i];
        e.act();
        if (e.dead) {
            arr.splice(i, 1);
            if (e.onDeath) e.onDeath();
        }
    }
}

// Determine if point is off-screen
function offScreen(x, y, r) {
    return (x + r < pl.pos.x - width/2 || x - r > pl.pos.x + width/2 || y + r < pl.pos.y - height/2 || y - r > pl.pos.y + height/2);
}

// Play sound
function play(sound) {
    if (!mute) SOUND[sound].play();
}
