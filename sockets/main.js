const { io } = require("../server");
const Orb = require("./classes/Orbs");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");
const {
  checkForOrbCollisions,
  checkForPlayerCollisions,
} = require("./checkCollisons.js");

const orbs = [];
let players = [];

let settings = {
  defaultSpeed: 10,
  defaultOrbs: 500,
  defaultSize: 10,
  defaultZoom: 1.5,
  width: 1000,
  height: 1000,
};

setInterval(() => {
  players.length > 0 &&
    io.to("game").emit("tock", {
      players,
    });
}, 16);

io.on("connection", (socket) => {
  let playerConfig, playerData, player;

  socket.on("windowInfo", (data) => {
    socket.join("game");

    // settings.width = data.width;
    // settings.height = data.height;

    playerConfig = new PlayerConfig(settings);
    playerData = new PlayerData(data.name, settings);
    player = new Player(socket.id, playerConfig, playerData);

    init();

    setInterval(() => {
      socket.emit("camTock", {
        playerX: player.data.locX,
        playerY: player.data.locY,
        score: player.data.score,
      });
    }, 33);

    socket.emit("init", orbs);
    players.push(playerData);
  });

  socket.on("tick", (data) => {
    // console.log(player.data)
    speed = player.config.speed;

    xV = data.xVector || 0;
    player.data.xVector = xV;

    yV = data.yVector || 0;
    player.data.yVector = yV;

    if (
      (player.data.locX < 5 && player.data.xVector < 0) ||
      (player.data.locX > settings.width && xV > 0)
    ) {
      player.data.locY -= speed * yV;
    } else if (
      (player.data.locY < 5 && yV > 0) ||
      (player.data.locY > settings.width && yV < 0)
    ) {
      player.data.locX += speed * xV;
    } else {
      player.data.locX += speed * xV;
      player.data.locY -= speed * yV;
    }

    let captureOrb = checkForOrbCollisions(
      player.data,
      player.config,
      orbs,
      settings
    );
    captureOrb
      .then((data) => {

        io.sockets.emit("orbSwitch", {
          orbIndex: data,
          newOrb: orbs[data],
        });

        io.sockets.emit("updateLeaderBoard" , {
          leaderBoard: leaderBoard()
        })
      })
      .catch(() => {
        // console.log("No collison")
      });

    let playerDeath = checkForPlayerCollisions(
      player.data,
      player.config,
      players,
      player.id
    );
    playerDeath
      .then((data) => {
        // io.sockets.emit("playerDeath", data);
        // data.died.name === player.data.name && socket.disconnect();
        io.sockets.emit("updateLeaderBoard" , {
          leaderBoard: leaderBoard()
        })
        io.sockets.emit("playerDeath", data)
      })
      .catch(() => {});
  });


  socket.on("disconnect" , () => {
    players = players.filter(p => p.uid !== player.data.uid );
    io.sockets.emit("updateLeaderBoard" , {
          leaderBoard: leaderBoard()
        })

  })
});

function init() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

function leaderBoard() {
  players.sort((a,b) => {
    return b.score - a.score
  })

  return players.map(p => {
    return {
      name: p.name,
      score: p.score
    }
  });
}

module.exports = io;
