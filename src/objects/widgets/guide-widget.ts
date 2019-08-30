import AbstractWidget from "../abstracts/abstract-widget";
import Point from "../functionalities/point";
import * as img_hand from '../../assets/hand.png'

class GuideWidget extends AbstractWidget {
  showing: boolean
  offset:number
  originalOffset:number
  constructor(location:Point, outline:Point) {
    super(location,outline,img_hand)
    this.showing = true
  }

  afterAddToContainer() {
    this.offset= this.originalOffset = (this.location.y+this.outline.y) / 2
  }

  onClick(e: TouchEvent): void {
    if(this.showing) e.stopPropagation()
    this.showing = false
  }

  draw(ctx:CanvasRenderingContext2D):void {
    if(!this.showing) return 
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(this.location.x, this.location.y, this.outline.x, this.outline.y)
    
    ctx.drawImage(this.image, (this.location.x + this.outline.x) / 2, this.offset)

    if(this.offset >= this.heightRatio * 70) this.offset = this.originalOffset 
    else this.offset += 3
    
  }
  
}

export default GuideWidget