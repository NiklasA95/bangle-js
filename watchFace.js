Bangle.setLCDPower(1);
Bangle.setLCDTimeout(0);

var locale = require("locale");
var X = 120, Y = 82;
var compareMinutes;

function update() {
  if(new Date().getMinutes() != compareMinutes) {
    var date = new Date();
    var minutes = date.getMinutes();
    g.reset();
    g.setFontAlign(0, -1);
    g.setFont("Vector", 80);
    g.clearRect(X + 21, Y + 5, X + 110, Y + 65);
    g.drawString(("0" + minutes).substr(-2), X + 71, Y);
    if(minutes == 0) {
      var hours = date.getHours();
      g.clearRect(X - 110, Y + 5, X - 21, Y + 65);
      g.drawString(("0" + hours).substr(-2), X - 60, Y);
      if(hours == 0) {
        g.setFont("Vector", 25);
        g.clearRect(0, Y + 88, 240, Y + 105);
        g.drawString(`${locale.dow(date, 1).toUpperCase()} ${locale.month(date).toUpperCase()} ${date.getDate()}`, X, Y + 86);
      }
    }
    compareMinutes = minutes;
  }
}

function draw(){
  var date = new Date();
  compareMinutes = date.getMinutes();
  g.reset();
  g.setFontAlign(0, -1);
  g.setFont("Vector", 80);
  g.drawString(("0" + date.getHours()).substr(-2), X - 60, Y);
  g.drawString(("0" + compareMinutes).substr(-2), X + 71, Y);
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
// let secondInterval = setInterval(update, 1000);

/*Bangle.on('lcdPower',on=>{
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(update, 1000);
    update();
  }
});*/

setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });