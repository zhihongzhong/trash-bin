import AbstractWidget from './abstracts/abstract-widget'
import Point from './point';

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
    ctx.save()
    ctx.translate(this.location.x + 20, this.location.y + 20)
    ctx.rotate(this.degree *Math.PI/180)
    ctx.drawImage(this.img2, -10 , -10, this.outline.y - 20, this.outline.y -20)
    ctx.restore()
    
    if(this.degree >=360) this.degree = 0
    if(this.rotating) this.degree += 2
  }
}

export default MusicWidget