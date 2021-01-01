
// player.locX = Math.floor(canvas.width * Math.random() + 10);
// player.locY = Math.floor(canvas.height * Math.random() + 10);

function draw() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  

  const camX = -player.locX + canvas.width / 2;
  const camY = -player.locY + canvas.height / 2;


  context.translate(camX, camY);

  players.forEach(p => {
     
      context.beginPath();
      context.fillStyle = p.color;
      context.arc(p.locX, p.locY, p.radius, 0, Math.PI * 2);
      context.fill();
      // context.strokeStyle = "rgba(0, 255, 0)";
      // context.stroke();
  })

  orbs.forEach(orb => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0 , 2*Math.PI);
    context.fill();
  })
  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", (e) => {
  const corr = {
    x: e.clientX,
    y: e.clientY,
  };

  const cx = canvas.width/ 2;
  const cy = canvas.height/ 2;

  const angleDeg = (Math.atan2(corr.y - cy, corr.x - cx) * 180) / Math.PI;

  // Since the canvas cooordinate system starts anticlockwise
  // All the angles are being reverse here


  if (angleDeg >= 0 && angleDeg < 90) {
    // console.log("Lower right");
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    // console.log("lower left");
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
  } else if (angleDeg >= -180 && angleDeg < -90) {
    // console.log("upper left");
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
  } else if (angleDeg < 0 && angleDeg >= -90) {
    // console.log("upper right");
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
  }

  player.xVector = xVector;
  player.yVector = yVector;

});
