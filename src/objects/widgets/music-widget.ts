import AbstractWidget from '../abstracts/abstract-widget'
import Point from '../functionalities/point';

interface ControlPlay {
  ():void;
}

class MusicWidget extends AbstractWidget {
  img2:HTMLImageElement 
  degree:number
  rotating: boolean
  control:ControlPlay

  constructor(location:Point, outline:Point, img1:string, img2:string, control:ControlPlay) {
    super(location,outline,img1)

    this.img2 = new Image()
    this.img2.src= img2 
    this.degree = 1
    this.rotating = true
    this.control = control
  }
  onClick(e: TouchEvent): void {
    this.rotating = !this.rotating
    this.control()
  }
  
  draw(ctx: CanvasRenderingContext2D):void {
    super.draw(ctx)
    const size = this.widthRatio * 5.2
    const size2 = this.heightRatio * 2.5 
    ctx.save()
    ctx.translate(this.location.x + size , this.location.y +size2 )
    ctx.rotate(this.degree *Math.PI / 180)
    ctx.drawImage(this.img2, 0 - size / 2, 0 - size2/ 2 , size , size2 )
    ctx.restore()
    
    if(this.degree >=360) this.degree = 0
    if(this.rotating) this.degree += 2
  }
}

export default MusicWidget