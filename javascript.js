//PROG 219, HW-3 Rain
//Written by JTM and Doug Cottrill
//Last Modified 20 Apr 2018
//A game using the Crafty.js system

var screenWidth = 800;
var screenHeight = 400;
var hitCounter = 0;

Crafty.init(screenWidth,screenHeight,document.getElementById('game'));

var player1 = Crafty.e('Player, 2D, Canvas, Color, Solid, Twoway, Gravity')
.attr({x: 2, y: 0, w: 16, h: 16})
.color('#F00').twoway(100).gravity('Floor').gravityConst(1000);

Crafty.e('Floor, 2D, DOM, Color')
  .attr({x: 0, y: 380, w: screenWidth, h: 10})
  .color('lightblue');

Crafty.e('LeftWall, 2D, DOM, Color')
.attr({x: 0, y: 0, w: 2, h: screenHeight})
.color('lightblue');
