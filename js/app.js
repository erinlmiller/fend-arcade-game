// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.step = 101;
    this.x = x;
    this.y = y + 55;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.boundary) {
      this.x += this.speed * dt;
    }
    else {
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
  //Character constructor, start position, and jump size
  constructor() {
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = 'images/char-horn-girl.png';
    this.victory = false;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //Handle user input
  handleInput(input) {
    switch(input) {
      case 'left':
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case 'right':
        if (this.x < this.step * 4) {
          this.x += this.step;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= this.jump;
        }
        break;
      case 'down':
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
        break;
    }
  }
  //Detect enemy collisions, reset character back to start when collision detected
  update() {
    for(let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
      this.reset();
      }
    }
    //Detect winning y coordinate
    if(this.y === 55) {
      this.victory = true;
    }
  }
  //Reset back to the beginning
  reset() {
    this.y = this.startY;
    this.x = this.startX;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const bug1 = new Enemy(-101, 0, 225);
const bug2 = new Enemy(-101, 83, 275);
const bug3 = new Enemy((-101*2.5), (83*2), 375);
const bug4 = new Enemy((-101*1.5), (83*2), 100);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4);

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
