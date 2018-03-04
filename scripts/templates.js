const BULLET = {};
const PART = {};
const PS = {};
const TANK = {};

// Bullets

// Particles
PART.fire = {
    // Display
    color: [192, 57, 43],
    model: MODEL.squareParticle,
    // Misc
    decay: 3,
    // Methods
    init: function() {
        // Display
        this.color = [200 + random(55), random(127), random(31)];

        // Misc
        this.decay = random(3, 6);

        // Physics
        this.angle = random(TWO_PI);
        this.angVel = random(-2, 2);
        this.radius = random(6, 12);
    }
};

// Particle systems
PS.explosion = {
    num: 32,
    pTemp: PART.fire,
    speed: 3
};

// Tanks
TANK.player1 = {
    // Display
    primary: '#004790',
    secondary: '#102770'
};

TANK.aim = {
    // AI
    ai: AI.aim
};

TANK.follow = {
    // AI
    ai: AI.follow
};
