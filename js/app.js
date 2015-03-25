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
    this.y = random_number(1,4)*80-10;
    this.x = aPosX.pop();

};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function random_number(min, max) {
    return parseInt(Math.random() * (max - min) + min);
};

// CREATE AND FILL NUMBER ARRAY WITH UNIQUE RANDOM NUMBERS
//FOR POSITION 'X' FOR THE ENEMY OBJECTS
function create_unique_random_array(num_elements,min,max) {

    var temp, nums = new Array;

    for (var element=0; element<num_elements; element++) {

        //IMPORTANT: DON'T FORGET THE SEMI-COLON AT THE END
        while((temp=number_found(random_number(min,max)*100,nums))==-1);
        nums[element] = temp;
    }

    return (nums);
}

function number_found (random_number,number_array) {

    for (var element=0; element<number_array.length; element++) {

        if (random_number==number_array[element]) {
            return (-1);
    }
   }

    return (random_number);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += parseInt(1 * dt * this.speed);
    
    if (this.x > 606){
        var x = random_number(boardMinX,boardMaxX)*100;
        var oEnemies = [];

        for (var i = allEnemies.length - 1; i >= 0; i--) {
                    oEnemies = allEnemies[i].x;
                };
        this.x = number_found(x,oEnemies);
        this.speed = random_number(1,7)*100;
        console.log("New Pos for obj " + this + " >> " + "x: " + this.x + " y: " + this.y);
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
var boardMaxX = -3*maxEnemies;
var boardMinX = -1;
// CREATE AND FILL NUMBER ARRAY WITH UNIQUE RANDOM NUMBERS
var aPosX = create_unique_random_array(maxEnemies,boardMinX,boardMaxX);

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
