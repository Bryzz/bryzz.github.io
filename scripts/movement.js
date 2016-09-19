/* Initializing player ship's position */

var displacement = 368; // width is 720, player's ship width is 32. Value = (720 / 2) - (32 / 2)
var hasShot = false;
var step = 0;

$("#playerShip").css('margin-left', displacement); // placing ship

document.onkeydown = action;

function action(e) {

  if (e.keyCode == '37') {
    goLeft();
  }
  else if (e.keyCode == '39') {
    goRight();
  }
  else if (e.keyCode == '32') {
    shoot();
  }
}

function goLeft() {
  displacement -= 10;
  if (displacement < 0) {
    displacement = 0;
  }
  $("#playerShip").css('margin-left', displacement);
}

function goRight() {
  displacement += 10;
  if (displacement > 748) {
    displacement = 748;
  }
  $("#playerShip").css('margin-left', displacement);
}

function shoot() {
  if (hasShot == false) {
    $("#playerProjectile").css("display", "");
    $("#playerProjectile").css("top", $("#playerShip").offset().top - 12);
    $("#playerProjectile").css("left", $("#playerShip").offset().left + 13);
    hasShot = true;
  }
}

/* Every 10 milliseconds, calls checkCollision */
$(function(){
  setInterval(checkCollision, 10);
});
/* Checks if there's a collision between the player's projectile and an evil CV or the screen's top. Also moves the projectile upwards */
function checkCollision() {
  if (hasShot == true) {
    $("#playerProjectile").css("top", parseInt($("#playerProjectile").css("top").replace("px",""))-10);
    if ($("#playerProjectile").offset().top <= $("#main").offset().top) {
      // The projectile reaches the screen's top
      $("#playerProjectile").css("display", "none");
      $("#playerProjectile").css("top", "0");
      hasShot = false;
    }
    else if (true) {
      // TODO
    }
  }
}
