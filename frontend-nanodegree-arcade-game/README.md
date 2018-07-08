frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).


## Instructions on how to play

* Your goal is to move the player from the grass to the water without being hit by any bug.
* If player gets hit by a bug, the game restart putting the player on the initial position.
* To move player around, use the arrows keys on the keyboard.
* You can choose a different avatar to represent your player by clicking on the different avatar options.


## Pre-requisites and Instalation

This code is composed by html, css and javascript and there is no installation pre-requisite required.
To see the page running, just open the html file on the browser.

# Gulp

The gulfile.js can be used to improve productivity. In this project, the gulp file is setup to:
1. Listen for changes made on the CSS, JS and HTML files and reloading the browser automatically in order to allow life editing. 

2. Allowing the use of Sass in order to facilitate the work with CSS files. You can read more about sass here: https://sass-lang.com/

## Gulp installation
1. Install Gulp: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

2. To run gulpfile.js, use command:

    ``gulp``