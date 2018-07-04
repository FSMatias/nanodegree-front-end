class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        // The image/sprite for the character, this uses a helper provided by Udacity to easily load images
        this.sprite = sprite;
    }

    // Draw the character on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

// Enemies our player must avoid (Enemy is a subclass of Character)
class Enemy extends Character {
    constructor(x, y, velocity, sprite = 'images/enemy-bug.png') {
        super(x, y, sprite);
        this.velocity = velocity;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + (this.velocity * dt);

        // If enemy position is out of the screen, move enemy to the begining
        if (this.x > 505) {
            this.x = getRandomEnemyXPosition(450);
            this.velocity = getRandomEnemyVelocity();
        }
    }
}

// Player class: This class requires an update(), render() and a handleInput() method.
// Player is also a subclass of Character
class Player extends Character {
    constructor(x = 202, y = getYPosition(5), sprite = 'images/char-boy.png') {
        super(x, y, sprite);
    }

    update(dt) {
        //TODO
    }

    handleInput() {
        //TODO
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemy0 = new Enemy(getRandomEnemyXPosition(), getYPosition(1), getRandomEnemyVelocity());
const enemy1 = new Enemy(getRandomEnemyXPosition(), getYPosition(2), getRandomEnemyVelocity());
const enemy2 = new Enemy(getRandomEnemyXPosition(), getYPosition(3), getRandomEnemyVelocity());

const allEnemies = [enemy0, enemy1, enemy2];

// Place the player object in a variable called player
const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Function to calculate random enemy's x position
// This function provides the enemy a first position which will 
// either be at position 0 or off canvas (on the left side) forcing the enemies 
// to show up on the screen at different times
function getRandomEnemyXPosition(initialPos = 350) {
    const random = Math.floor(Math.random() * initialPos) + 0;
    return random * (-1);
}

// Function to calculate random velocity between a specific range
function getRandomEnemyVelocity() {
    const random = Math.floor(Math.random() * 300) + 100;
    return random;
}

// Function to calculate y position based on the row number
//  Y Position is represented by:
//  y = yValueOfFirstRow + (rowNumber*deltaY), where rowNumber starts at 0
function getYPosition(rowNumber) {
    const yValueForFirstRow = -25;
    const deltaY = 85;
    return yValueForFirstRow + (rowNumber * deltaY);
}
