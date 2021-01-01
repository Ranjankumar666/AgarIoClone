const { v4: uuidv4 } = require('uuid');

class PlayerData {
  constructor(name, settings) {
    this.uid = uuidv4();
    this.name = name;
    this.locX = Math.floor(Math.random() * settings.width + 10);
    this.locY = Math.floor(Math.random() * settings.height + 10);
    this.radius = settings.defaultSize;
    this.color = this.getRandomColor();
    this.score = 0;
    this.orbsAbsorbed = 0;
    this.playersAbsorbed = 0;
  }

  getRandomColor() {
    let res = "rgba(";
    const colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push(Math.ceil(Math.random() * 256) + 1);
    }

    res += colors.join(",");
    res += ")";
    return res;
  }
}

module.exports = PlayerData;
