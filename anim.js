var bocal = new Image();
var arrayLiquide = new Array(3).fill(0);
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
  displayTotal();
  changeMax();
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
    var nbr = (parseInt(total, 10) - parseInt(arrayLiquide[i], 10) + parseInt(value, 10));
    if (nbr > 100) {
      console.log(nbr);

      var elem = document.getElementById("liquide" + i);
      elem.value =  parseInt(arrayLiquide[i], 10);
      return;
    }
    arrayLiquide[i] = value;
    displayValue(i);
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

function displayValue(i) {
  var paragraphe = document.getElementById("pourcent" + i);
  if (arrayLiquide[i] == 0)
   paragraphe.textContent = "";
  else
   paragraphe.textContent = arrayLiquide[i] + "%";
}

function changeMax() {

  for (var i = 0; i < arrayLiquide.length; i++) {
    var liquideElement = document.getElementById("liquide" + i);
    
    if (liquideElement) {
      var value = parseInt(liquideElement.value, 10);
      var pourcentage = Math.min(value + (100 - total), 100);
      liquideElement.style.background = 'linear-gradient(to right, rgba(128, 128, 128, 0.5) ' + pourcentage + '%, rgba(255, 0, 0, 0.5) ' + pourcentage + '%, rgba(255, 0, 0, 0.5) 100%, rgba(128, 128, 128, 0.5) 100%, transparent 60%, transparent 100%)';
    }
  }
}

function profile(a, b, c) {
  arrayLiquide[0] = parseInt(a, 10);
  arrayLiquide[1] = parseInt(b, 10);
  arrayLiquide[2] = parseInt(c, 10);


  for(var i = 0; i < arrayLiquide.length; i++) {

    var elem = document.getElementById("liquide" + i);
    elem.value =  parseInt(arrayLiquide[i], 10);
    displayValue(i);
  }

  window.requestAnimationFrame(function() {
    draw(document.getElementById("jar").getContext("2d"));
  }); 
}


init();