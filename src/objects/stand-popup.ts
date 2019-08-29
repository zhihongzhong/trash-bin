import AbstractEventDrivenElements from "./abstracts/abstract-event-driven-element";
import AbstractPopup from "./interfaces/popup";
import Point from './point'


// system-level component 
// only be calld by 'game' object 
// any component that extends AbstractEventDrivenElement 
// must call the interface provided by 'System' aslo named 'Game' object 

class StandPopup extends AbstractEventDrivenElements implements AbstractPopup {
  
  showing:boolean;
  image: HTMLImageElement 

  constructor(location:Point, outline:Point) {
    super(location, outline)
    this.showing = false
  }

  show(imgStr:string, outline: Point): void {
    this.image = new Image(outline.x, outline.y)
    this.image.src = imgStr
    this.showing = true
  }

  // swipe the object from canvas using showing variable
  hide(): void {
    this.showing = false 
  }

  onTouchStart(e: TouchEvent): void {
    this.hide()
  }  

  onTouchMove(e: TouchEvent): void {
    //throw new Error("Method not implemented.");
  }

  onTouchEnd(e: TouchEvent): void {
    //throw new Error("Method not implemented.");
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if(!this.showing) return 
    ctx.fillStyle= "RGBA(0,0,0,0.5)"
    ctx.fillRect(this.location.x, this.location.y, this.outline.x, this.outline.y)
    
    let leftOffset:number, topOffset:number = 0 
    leftOffset = this.outline.x / 2 - this.image.width / 2 + this.location.x 
    topOffset = this.outline.y / 2 - this.image.height / 2 + this.location.y
    ctx.drawImage(this.image, leftOffset, topOffset)

  }
  
  move(point: Point): void {
    throw new Error("DO NOT CALL THIS METHOD!!");
  }
}

export default StandPopup