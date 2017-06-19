// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x * 101;
    this.y = (2 * y - 1) * 41.5;
    this.speed = speed;
    this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var divX, divY;
    var playerX, playerY;

    if (this.x > 505) {
        this.x = -101;
    }
    this.x += (dt * this.speed);

    divX = Math.round(this.x / 101);
    divY = Math.round(this.y / 41.5);
    playerX = Math.round(player.x / 101);
    playerY = Math.round(player.y / 41.5);

    if(divX === playerX &&
        divY === playerY) {
        this.collision = true;
    } else {
        this.collision = false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x * 101;
    this.y = (2 * y - 1) * 41.5;
    this.sprite = 'images/char-boy.png';
    this.reset = false;
};
Player.prototype.update = function(dt) {
    if (this.reset) {
        this.x = 202;
        this.y = 373.5;
        this.reset = false;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
      case 'left':
          this.x = this.x - 101;
          if (this.x < 0) {
              this.x = 0;
          }
          break;
      case 'right':
          this.x = this.x + 101;
          if (this.x >= 505) {
              this.x = 404;
          }
          break;
      case 'up':
          this.y = this.y - 83;
          if (this.y < 0) {
              this.y = 373.5;
          }
          break;
      case 'down':
          this.y = this.y + 83;
          if (this.y >= 456.5) {
              this.y = 373.5;
          }
          break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var e1 = new Enemy(-1, 1, 100);
var e2 = new Enemy(-1, 2, 150);
var e3 = new Enemy(-1, 3, 200);
var e4 = new Enemy(-1, 4, 300);
var allEnemies = [e1, e2, e3, e4];
var player = new Player(2, 5);

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
