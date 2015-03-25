// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.setInitialPos();
    this.speed = 100.0;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.setInitialPos = function () {
    // body...
    var enemyLength = 100;
    var overlaps = true;
    console.log(allEnemies.length);
    if (allEnemies.length > 0){
        while(overlaps){
            overlaps = false;
            console.log("dentro while" + overlaps);
            var posXi = parseInt(this.getRandomArbitrary(boardPosX,0));
            var posXf = posXi - enemyLength;
            for (enemy in allEnemies){
                var XiEnemy = allEnemies[enemy].x;
                var XfEnemy = XiEnemy - enemyLength;
                if (
                    (posXi <=  XiEnemy && posXi >= XfEnemy) || 
                    (posXf <=  XiEnemy && posXf >= XfEnemy)
                    ){
                        overlaps = true;
                        console.log("OVERLAP!!");
                        break;
                }
                console.log("dentro for" + overlaps);
            }
            console.log("fora do for" + overlaps);
        }
            console.log("fora do while" + overlaps);
            this.x = posXi;
            console.log("if x:" + this.x);
    }else {
        this.x = parseInt(this.getRandomArbitrary(boardPosX,0));
        console.log("else x: " + this.x);
    }

    this.y = parseInt(this.getRandomArbitrary(1,4))*75;
    console.log("else y: " + this.y);


};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
Enemy.prototype.getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 1 * dt * this.speed;
    
    if (this.x > 606){
        this.setInitialPos();
        console.log("New Pos for obj " + this + " >> " + this.x);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 200;
    this.y = 375;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (pos) {
    // body...
    this.x;
    this.y; 
    if (this.y < 0){
        this.reset();
    }
};

Player.prototype.render = function () {
    // body...
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    // body...
    var stepCol = 100;
    var stepRow = 80;
    switch(keyCode){
        case 'left':
                    this.avoidWalls('x', -stepCol);
                    break;
        case 'up':
                    this.avoidWalls('y', -stepRow);
                    break;
        case 'right':
                    this.avoidWalls('x', stepCol);
                    break;
        case 'down':
                    this.avoidWalls('y', stepRow);
                    break;
    }
};

Player.prototype.avoidWalls =  function (coord,step){
    var pos = this[coord] + step;
    switch(coord){
        case 'x':  if (pos >= 0 && pos <= 400){
                        this[coord] = pos;
                    }
                    break;
        case 'y':  if (pos >= -35 && pos <= 400){
                        this[coord] = pos;
                    }
                    break;            
    }
};

Player.prototype.reset = function(){
    this.constructor();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var maxEnemies = 9;
var allEnemies = [];
var boardPosX = -1300;

for (var i=0; i < maxEnemies; i++){
    allEnemies.push(new Enemy());
}
console.log(allEnemies);

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
