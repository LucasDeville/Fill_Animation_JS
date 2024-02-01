var bocal = new Image();
var arrayLiquide = new Array(5).fill(0);
var color = ["rgba(0, 0, 255, 0)", "rgba(0, 0, 255, 0.5)",
            "rgba(255, 0, 0, 0)", "rgba(255, 0, 0, 0.5)",
            "rgba(0, 255, 0, 0)", "rgba(0, 255, 0, 0.5)"];
var total = 0;
var paragrapheReference;
var totalReference;


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
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.drawImage(bocal, 0, 0, bocal.width, bocal.height);

  total = parseInt(0, 10);
  for (var i = 0; i < arrayLiquide.length; i++) {
    if (arrayLiquide[i] > 0) {
      if ((parseInt(total, 10)  + parseInt(arrayLiquide[i], 10)) > 100) {
        displayMessage("Le total en pourcentage dépasse la contenance maximum !")
        total = parseInt(total, 10) + parseInt(arrayLiquide[i], 10);
        break;
      }
      else if (paragrapheReference && paragrapheReference.parentNode)
        paragrapheReference.parentNode.removeChild(paragrapheReference);
      
      displayLiquide(ctx, i);
      total = parseInt(total, 10) + parseInt(arrayLiquide[i], 10);
    }
  }
  displayTotal()
}

function displayLiquide(ctx, i) {
  var canvas = document.getElementById("jar");
  var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);

  grad.addColorStop(0, color[i * 2]);
  grad.addColorStop(1, color[i * 2 + 1]);

  ctx.fillStyle = grad;

  var rectHeight = (canvas.height / 100) * arrayLiquide[i];
  var startY = (canvas.height / 100) * total;

  ctx.fillRect(0, canvas.height - rectHeight - startY, canvas.width, rectHeight);
}

function liquide(value, i) {

  if (!isNaN(value)) {
    arrayLiquide[i] = value;
  }

  window.requestAnimationFrame(function() {
    draw(document.getElementById("jar").getContext("2d"));
  });
}

function displayMessage(text) {

  var container = document.getElementById("messageContainer");

  var paragraphe = document.createElement("p");
  var texteMessage = document.createTextNode(text);
  paragraphe.appendChild(texteMessage);
  container.appendChild(paragraphe);
  paragrapheReference = paragraphe;
}

function displayTotal() {


  if (totalReference && totalReference.parentNode)
        totalReference.parentNode.removeChild(totalReference);
  var container = document.getElementById("totalContainer");

  var paragraphe = document.createElement("p");
  var texteMessage = document.createTextNode("Total: " + total + "%");
  paragraphe.appendChild(texteMessage);
  container.appendChild(paragraphe);
  totalReference  = paragraphe;
}

// window.onload = function() {
//   // Cette fonction sera appelée lorsque la page est chargée
//   alert("La page est chargée !");
// };

init();