const AI = {};

AI.null = function(t) {};

AI.aim = function(t) {
    t.aim(pl.pos.x, pl.pos.y);
    t.face(pl.pos.x, pl.pos.y);
};
