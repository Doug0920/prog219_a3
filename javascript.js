var screenWidth = 800;
var screenHeight = 500;
var hitCounter = 0;

Crafty.init(screenWidth,screenHeight, document.getElementById('game'));

Crafty.sprite("facio_sprite.gif", {facio:[237,0,30,55], facioLeft:[174,71,30,55], raindrop:[143,74,4,10]});
Crafty.e('Floor, 2D, Canvas, Solid, Color, Collision')
  .attr({x: 0, y: 480, w: screenWidth * 2, h: 20})
  .color('lightblue');
/*
Crafty.e('ScreenSide, 2D, Canvas, Solid, Color, Collision')
  .attr({x: 0, y: 480, w: screenWidth, h: 20})
  .color('lightblue');
*/
var player1 = Crafty.e('Player, 2D, Canvas, Solid, Twoway, Gravity, Collision, facio')
  .attr({x: 20, y: 460, w: 30, h: 55})
  .twoway(150)
  .gravity('Floor')
  .checkHits('LeftWall')
  .bind("HitOn", function(){    // prevent going past left edge and forever falling
    player1.x = 4;              // (=1 or =2 doesn't work right)
  })
  .bind("EnterFrame", function(){
    if (this.x >= screenWidth)
    {
      pause();
      Crafty.e('2D, DOM, Text').attr({x:screenWidth/2 - 4, y:screenHeight/2}).text("Stage&nbsp;1 Clear")
        .textFont({size:'20px', weight:'bold'}).textColor('#e0e0e0');
    }
  });
var hitText = Crafty.e('2D, DOM, Text')
  .attr({
    x: screenWidth - 100,
    y: 10
  });

hitText.text('Hit:&nbsp;' + hitCounter);

hitText.textFont({
  size: '30px',
  weight: 'bold'
  })
  .textColor('#e0e0e0');

Crafty.e('LeftWall, 2D, DOM, Solid')
  .attr({x: 0, y: 0, w: 1, h: screenHeight});

function drop()
{
  var randomx = Math.floor(Math.random() * (screenWidth - 54) + 50); // - 54 to fit in screen
  Crafty.e('Drop, 2D, Canvas, Solid, Gravity, Collision, raindrop')
  .attr({x: randomx, y: 0, w: 4, h: 10})
  .gravity()
  .gravityConst(200)
  .checkHits('Player')
  .bind("HitOn", function(){
    this.destroy();
    hitCounter++;
    if (hitCounter >= 6)
    {
      player1.x = 20;
      hitCounter = 0;
    }
    hitText.text('Hit:&nbsp;' + hitCounter);
  })
  .bind("EnterFrame", function() {
    if (this.y > (screenHeight-30))
      this.destroy();   // destroy object when near floor
  });
}

function pause()
{
  var currMsg = document.getElementById("pauseButton").value;
  if(currMsg=="pause"){
    currMsg="continue";
  }
  else{
    currMsg="pause";
  }

  document.getElementById("pauseButton").value = currMsg;
  Crafty.pause();
}

Crafty.bind("EnterFrame", function(){
//(debug) document.getElementById("message").innerHTML = Crafty.frame();

if (Crafty.frame() % 4 == 0)
drop();
});
