var locale = require("locale");
var X = 120, Y = 82;
var compareDate;

function update() {
  if (new Date().getMinutes() != compareDate.getMinutes()) {
    var date = new Date();
    var minutes = date.getMinutes();
    g.reset();
    g.setFontAlign(0, -1);
    g.setFont("Vector", 80);
    if (Math.floor(minutes / 10) != Math.floor(compareDate.getMinutes() / 10)) {
      g.clearRect(X + 21, Y + 5, X + 110, Y + 65);
      g.drawString(("0" + minutes).substr(-2), X + 71, Y);
    } else {
      g.clearRect(X + 71, Y + 5, X + 110, Y + 65);
      g.drawString(("0" + minutes).substr(-1), X + 96, Y);
    }
    if (date.getHours() != compareDate.getHours()) {
      var hours = date.getHours();
      if (Math.floor(hours / 10) != Math.floor(compareDate.getHours() / 10)) {
        g.clearRect(X - 110, Y + 5, X - 21, Y + 65);
        g.drawString(("0" + hours).substr(-2), X - 60, Y);
      } else {
        g.clearRect(X - 60, Y + 5, X - 21, Y + 65);
        g.drawString(("0" + hours).substr(-1), X - 35, Y);
      }
      if (date.getDate() != compareDate.getDate()) {
        g.setFont("Vector", 25);
        g.clearRect(0, Y + 88, 240, Y + 105);
        g.drawString(`${locale.dow(date, 1).toUpperCase()} ${locale.month(date).toUpperCase()} ${date.getDate()}`, X, Y + 86);
      }
    }
    compareDate = date;
  }
}

function draw() {
  var date = new Date();
  compareDate = date;
  g.reset();
  g.setFontAlign(0, -1);
  g.setFont("Vector", 80);
  g.drawString(("0" + date.getHours()).substr(-2), X - 60, Y);
  g.drawString(("0" + compareDate.getMinutes()).substr(-2), X + 71, Y);
  g.setFont("Vector", 25);
  g.drawString(`${locale.dow(date, 1).toUpperCase()} ${locale.month(date).toUpperCase()} ${date.getDate()}`, X, Y + 86);
  g.setColor(0, 0.5, 1);
  g.fillCircle(X, Y + 55, 8);
  g.fillCircle(X, Y + 28, 8);
}

g.clear();
Bangle.loadWidgets();
Bangle.drawWidgets();
draw();
let secondInterval = setInterval(update, 1000);

Bangle.on('lcdPower', on => {
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(update, 1000);
    update();
  }
});

setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });