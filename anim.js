var bocal = new Image();
function init() {
	bocal.src = "bocal.png";
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById("jar").getContext("2d");

  ctx.drawImage(bocal, 0, 0, 260, 430);
  
  window.requestAnimationFrame(draw);
}

init();
