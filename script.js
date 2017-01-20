var p1Turn = true;
var p1Color = "red";
var p2Color = "green";
var dColor = "gray";
var defaultText = "☠️";
var p1Text = "💩";
var p2Text = "👹";
var smallerSize = "1em";
var regSize = "2em";
var playCount = 0;

var width = 5;
var height = 8;

var squares = [];

function doThing(square, flag) {
  if (!flag) {
    var pos = square.id.split(",");
    var x = parseInt(pos[0]);
    var y = parseInt(pos[1]);
    square.style.color = dColor;
    square.innerText = defaultText;
    square.style.fontSize = regSize;
    setTimeout(function(){
    if (x-1 > -1)
      handleText(squares[y][x-1]);
    if (x+1 < width)
      handleText(squares[y][x+1]);
    if (y-1 > -1)
      handleText(squares[y-1][x]);
    if (y+1 < height)
      handleText(squares[y+1][x]);
    doThing(null, true); }, 50);
  }
}

function check() {
  if (playCount > 2) {
    var a = 0, b = 0;
    for (var i = 0; i < squares.length; i++) {
      for (var j = 0; j < squares[i].length; j++) {
        var z = squares[i][j];
        if (z.innerText.indexOf(p1Text) > -1) a++;
        if (z.innerText.indexOf(p2Text) > -1) b++;
      }
    }
      if (!a) document.body.innerHTML = '<h1>Player 2 Wins, refresh page to play again</h1>';
      if (!b) document.body.innerHTML = '<h1>Player 1 Wins, refresh page to play again</h1>';
  }
}

function handleText(square) {
  var cColor = p1Turn ? p2Color : p1Color;
  var cText = p1Turn ? p2Text : p1Text;
  var dText = p1Turn ? p1Text : p2Text;
  switch (square.innerText) {
    case defaultText:
      square.innerText = cText;
      square.style.color = cColor;
      check();
      break;
    case cText:
    case dText:
      if (square.class == "corner") {
        doThing(square, false);
      } else {
        square.innerText = cText+cText;
        check();
      }
      break;
    case cText + cText:
    case dText + dText:
      if (square.class == "edge") {
        doThing(square, false);
      } else {
        square.innerText = cText+cText+cText;
        square.style.fontSize = smallerSize;
        check();
      }
    break;
    case cText + cText + cText:
    case dText + dText + dText:
      doThing(square, false);
      break;
    default: return false;
  }
  if (square.style.color != dColor) {
    square.style.color = cColor;
  }
  return true;
}

function handleClick(e) {
  playCount++;
  var square = e.target;
  var cColor = p1Turn ? p1Color : p2Color;

  if (cColor != square.style.color && square.innerText != defaultText) return null;

  p1Turn = !p1Turn;

  if (handleText(square, false)) {
document.getElementById("player").innerText = p1Turn ? "(P1)" : "(P2)";
  p1Turn = !p1Turn;
  }
  p1Turn = !p1Turn;
}


window.addEventListener('load', function(e) {
  for (var i = 0; i < height; i++) {
    squares.push([]);
    for (var j = 0; j < width; j++) {
      var square = document.createElement("span");
      square.id = j + "," + i;
      square.innerText=defaultText;
      document.body.appendChild(square);
      square.addEventListener("click", handleClick);
      if ((j == 0 || j == width - 1) && (i == 0 || i == height - 1)) {
        square.class = "corner";
      } else {
        if (j == 0 || j == width - 1 || i == 0 || i == height - 1) square.class = "edge";
      }
      squares[i].push(square);
    }
    document.body.appendChild(document.createElement("BR"));
  }
}, false);
