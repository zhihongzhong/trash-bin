import AbstractWidget from '../abstracts/abstract-widget'
import Point from '../functionalities/point';

class MusicWidget extends AbstractWidget {
  img2:HTMLImageElement 
  degree:number
  rotating: boolean
  constructor(location:Point, outline:Point, img1:string, img2:string) {
    super(location,outline,img1)

    this.img2 = new Image()
    this.img2.src= img2 
    this.degree = 1
    this.rotating = true
  }
  onClick(e: TouchEvent): void {
    this.rotating = !this.rotating
  }
  
  draw(ctx: CanvasRenderingContext2D):void {
    super.draw(ctx)
    //ctx.drawImage(this.image,this.location.x, this.location.y, this.outline.x, this.outline.y)
    const size = this.heightRatio * 2.5

    ctx.save()
    ctx.translate(this.location.x + size , this.location.y + size )
    ctx.rotate(this.degree *Math.PI / 180)
    ctx.drawImage(this.img2, 0 - size / 2, 0 - size/ 2 , size , size )
    ctx.restore()
    
    if(this.degree >=360) this.degree = 0
    if(this.rotating) this.degree += 2
  }
}

export default MusicWidget