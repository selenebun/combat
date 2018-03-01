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
    decay: 3
};

// Particle systems
PS.rocketExplosion = {
    num: 32,
    pTemp: PART.fire,
    speed: 10
};

// Tanks
TANK.player1 = {
    // AI
    ai: AI.null,
    // Display
    primary: '#004790',
    secondary: '#102770'
};
