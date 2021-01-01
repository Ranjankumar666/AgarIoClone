const socket = io("/");

const init = () => {
  draw();
  socket.emit("windowInfo", {
    height: wHeight,
    width: wWidth,
    name: player.name,
  });
};

socket.on("init", (data) => {
  orbs = data;
  setInterval(() => {
    socket.emit("tick",{
      xVector: player.xVector,
      yVector: player.yVector
    });
  }, 16);
});

socket.on("tock", (data) => {
  players = data.players;
  // console.log(data);
  // console.log(data.player)
});

socket.on("camTock", (data) => {
  player.locX = data.playerX;
  player.locY = data.playerY;
  player.score = data.score;

  $(".player-score").html(player.score);
})

socket.on("orbSwitch" , (data) => {
  orbs.splice(data.orbIndex, 1, data.newOrb)
})


socket.on("playerDeath", (data) => {
  // data.killedBy.name === player.name ?
  document.querySelector("#game-message").innerHTML = `${data.died.name} is absorbed by ${data.killedBy.name}`;
  $("#game-message").css({
    "background-color": "#906740",
    "opacity": 1
  })

  $("#game-message").show();
  $("#game-message").fadeOut(5000);
})

socket.on("updateLeaderBoard" , (data) => {
  console.log(data)
  const html = document.querySelector(".leader-board");
  html.innerHTML = '';
  data.leaderBoard.forEach((p, i) => {
    html.innerHTML += `${i+1}. ${p.name} ${p.score}<br/>` 
  })
})


socket.on('disconnect' ,() => {
  console.log('disconnect')
})
