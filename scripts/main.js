/* Initializing player ship's position */

var hasShot = false;
var step = 0;
var cvHasBeenPlaced = false;

$("#playerShip").css('margin-left', "45%"); // placing ship
$("#playerShip").css('margin-top',"37%"); // placing ship
$("#playerProjectile").css("display", "none"); // hiding projectile

document.getElementById("main").onmousemove = function(e) {
      if (step < 3) {
        var displacement = e.pageX*1 - $("#main").offset().left;
        document.getElementById("playerShip").style.marginLeft = displacement - 17 + "px";
        document.getElementById("playerShip").style.marginTop = 37 + step*4.9 + "%";
        if (document.getElementById("playerShip").style.marginLeft.replace("px","") < 0) {
          document.getElementById("playerShip").style.marginLeft = 0;
        }
        if (document.getElementById("playerShip").style.marginLeft.replace("px","") > 768) {
          document.getElementById("playerShip").style.marginLeft = 768+"px";
        }
      }
}

document.getElementById("main").onclick = function(e) {
  // the user clicks in the green area : he shoots
  if (hasShot == false && step < 3) {
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
      // The projectile reaches the screen's top. Welp, you missed.
      $("#playerProjectile").css("display", "none");
      $("#playerProjectile").css("top", "0");
      hasShot = false;
    }
    else if ( !((($("#playerProjectile").offset().top + $("#playerProjectile").height()) < ($("#enemyShipSkills").offset().top)) ||
        ($("#playerProjectile").offset().top > ($("#enemyShipSkills").offset().top + $("#enemyShipSkills").height())) ||
        (($("#playerProjectile").offset().left + $("#playerProjectile").width()) < $("#enemyShipSkills").offset().left) ||
        ($("#playerProjectile").offset().left > ($("#enemyShipSkills").offset().left + $("#enemyShipSkills").width())))) {
      // the projectile hits the skills enemy. Good job, you just ruined someone's talents.
      $("#playerProjectile").css("display", "none");
      $("#playerProjectile").css("top", "0");
      $("#explosion").css("top", $("#enemyShipSkills").offset().top - 25);
      $("#explosion").css("left", $("#enemyShipSkills").offset().left - 10);
      $("#explosion").attr("src","");
      $("#enemyShipSkills").css("display","none");
      $("#explosion").attr("src","img/ship/cv_enemy_explosion.gif");
      hasShot = false;
      showSkills();
      step++;
    }
    else if ( !((($("#playerProjectile").offset().top + $("#playerProjectile").height()) < ($("#enemyShipExperience").offset().top)) ||
        ($("#playerProjectile").offset().top > ($("#enemyShipExperience").offset().top + $("#enemyShipExperience").height())) ||
        (($("#playerProjectile").offset().left + $("#playerProjectile").width()) < $("#enemyShipExperience").offset().left) ||
        ($("#playerProjectile").offset().left > ($("#enemyShipExperience").offset().left + $("#enemyShipExperience").width())))) {
      // the projectile hits the experience's enemy. Good job, you just ruined someone's history.
      $("#playerProjectile").css("display", "none");
      $("#playerProjectile").css("top", "0");
      $("#explosion").css("top", $("#enemyShipExperience").offset().top - 25);
      $("#explosion").css("left", $("#enemyShipExperience").offset().left - 10);
      $("#explosion").attr("src","");
      $("#enemyShipExperience").css("display","none");
      $("#explosion").attr("src","img/ship/cv_enemy_explosion.gif");
      hasShot = false;
      showExperience();
      step++;
    }
    else if ( !((($("#playerProjectile").offset().top + $("#playerProjectile").height()) < ($("#enemyShipFormation").offset().top)) ||
        ($("#playerProjectile").offset().top > ($("#enemyShipFormation").offset().top + $("#enemyShipFormation").height())) ||
        (($("#playerProjectile").offset().left + $("#playerProjectile").width()) < $("#enemyShipFormation").offset().left) ||
        ($("#playerProjectile").offset().left > ($("#enemyShipFormation").offset().left + $("#enemyShipFormation").width())))) {
      // the projectile hits the formation's enemy. Good job, you just ruined someone's studies.
      $("#playerProjectile").css("display", "none");
      $("#playerProjectile").css("top", "0");
      $("#explosion").css("top", $("#enemyShipFormation").offset().top - 25);
      $("#explosion").css("left", $("#enemyShipFormation").offset().left - 10);
      $("#explosion").attr("src","");
      $("#enemyShipFormation").css("display","none");
      $("#explosion").attr("src","img/ship/cv_enemy_explosion.gif");
      hasShot = false;
      showFormation();
      step++;
    }
    if (step == 3) {
      document.getElementById("playerShip").style.marginTop = 37 + 3*4.9 + "%"
    }
    else {
      document.getElementById("playerShip").style.marginTop = 37 + step*4.9 + "%"
    }
  }
  if (step == 3) {
    $("#main").fadeOut(1500);
    /*
    $("#congratulations").fadeOut(0);
    $("#congratulations").css("display","");
    $("#congratulations").fadeIn(3000);
    */
    setTimeout ( function() {
      $("#congratulations").fadeOut(0);
      $("#congratulations").css("display","");
      $("#congratulations").fadeIn(1000);
    }, 1500 );
    $("#rewardContact").fadeOut(0);
    $("#rewardContact").css("display","");
    $("#rewardContact").fadeIn(3000);
    step++;
  }
}

function showSkills() {
  $("#rewardSkills").fadeOut(0);
  $("#rewardSkills").css("display","");
  $("#rewardSkills").fadeIn(3000);
}

function showExperience() {
  $("#rewardExperience").fadeOut(0);
  $("#rewardExperience").css("display","");
  $("#rewardExperience").fadeIn(3000);
}

function showFormation() {
  $("#rewardFormation").fadeOut(0);
  $("#rewardFormation").css("display","");
  $("#rewardFormation").fadeIn(3000);
}
