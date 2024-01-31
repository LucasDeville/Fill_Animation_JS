var bocal = new Image();
var liquide = new Array(5).fill(0);
var total = 0;

function init() {
  bocal.src = "bocal.png";
  bocal.onload = function() {
      var canvas = document.getElementById("jar");
      canvas.width = bocal.width;
      canvas.height = bocal.height;

      var ctx = canvas.getContext("2d");
      window.requestAnimationFrame(function() {
          draw(ctx);
      });

      for (var i = 0; i < liquide.length; i++) {
        if (liquide[i] > 0)
        {
          total += liquide[i];
          displayLiquide(i);
        }
      }
  };
}

function displayLiquide(i) {
  
}

function draw(ctx) {
  ctx.drawImage(bocal, 0, 0, bocal.width, bocal.height);

  window.requestAnimationFrame(function() {
      draw(ctx);
  });
}

function liquide() {
  if (document.getElementById("l1").value > 0)

  // document.getElementById("l1").after(50);
}


init();
