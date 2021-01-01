class PlayerConfig{
  constructor(settings){
    this.xVector = 0;
    this.yVector = 0;
    this.zoom = settings.defaultZoom;
    this.speed = settings.defaultSpeed;
  }
}

module.exports = PlayerConfig;
