class Orb{
  constructor(settings){
    this.color = this.getRandomColor();
    this.locX = Math.floor(Math.random()*settings.width);
    this.locY = Math.floor(Math.random()*settings.height);
    this.radius = 5;
  }

  getRandomColor(){
    let res = "rgba(";
    const colors=[];
    for(let i =0 ; i < 3; i++){
      colors.push(Math.ceil(Math.random()*256)+ 1);
    }

    res += colors.join(',');
    res += ')';
    return res;
  }
}

module.exports = Orb;
