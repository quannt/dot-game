# Dot Game

The goal of this exercise is to create a game. In the game, dots move from the top to the bottom of a box. A player tries to click on the dots, and receives points when they are successful.

![mockup](https://cdn.gomix.com/84ca8f35-cd1c-4d74-ad6f-f1f108b5b85a%2Fdot-game.png)


## Guidelines for Completing the Exercise

- Write JavaScript that works in current Chrome. 
- You can edit any file in the project, and add any assets you require (see below).
- You may look up anything you'd like.
- You should not use a JavaScript library.
- You must write at least the CSS necessary to achieve the basic layout of the game; you may also write additional CSS to improve the design of the game. The project is set up to use Sass, but you may also author plain CSS.


## Building the Game

We intend for you to spend two to four hours on this exercise; however, there is no time limit. 

- When the page loads, dots start "falling".
- Dots fall at a constant rate. A player should be able to use a slider to control the rate at which dots fall, with a range of 10-100 pixels per second.
- A new dot appears at a random horizontal position at the top of the box every second.
- Dots should vary randomly in size from 20px in diameter to 100px in diameter.
- When a player touches or clicks a dot, the dot should disappear from the box, and the score should be incremented by floor(100 * (1/dotSize)). That is, a 100px dot is worth one point, a 20px dot is worth five points, and a 30px dot is worth three points. 

## Creating and Using Assets

To create a new asset, click on the "assets" directory in the front-end section; drag the file from you computer to the browser window.

To use an asset, click on the "assets" directory in the front-end section; then, click the "Copy URL" button to get the asset's URL.