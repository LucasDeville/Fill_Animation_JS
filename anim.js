var bocal = new Image();
var arrayLiquide = new Array(5).fill(0);
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
  };
}

function draw(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);  // Effacer le canvas

  ctx.drawImage(bocal, 0, 0, bocal.width, bocal.height);

  for (var i = 0; i < arrayLiquide.length; i++) {
    if (arrayLiquide[i] > 0) {
      displayLiquide(ctx, i);
    }
  }

  window.requestAnimationFrame(function() {
    draw(ctx);
  });
}

function displayLiquide(ctx, i) {
  var canvas = document.getElementById("jar");
  var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);

  grad.addColorStop(0, "rgba(0, 0, 255, 0)");
  grad.addColorStop(1, "rgba(0, 0, 255, 0.5)");

  ctx.fillStyle = grad;

  // Mettre à jour la hauteur du rectangle en fonction de la quantité de liquide
  var rectHeight = (canvas.height * arrayLiquide[i]) / total;

  ctx.fillRect(0, canvas.height - rectHeight, canvas.width, rectHeight);
}

function liquide() {
  var l1Value = parseInt(document.getElementById("l1").value);

  if (!isNaN(l1Value)) {
    arrayLiquide[0] = l1Value;
  }

  // Mettre à jour la variable 'total' avant d'appeler draw()
  total = arrayLiquide.reduce(function(a, b) {
    return a + b;
  }, 0);

  window.requestAnimationFrame(function() {
    draw(document.getElementById("jar").getContext("2d"));
  });
}

init();