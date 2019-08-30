import AbstractEventDrivenElements from "../abstracts/abstract-event-driven-element";
import AbstractPopup from "../interfaces/popup";
import Point from './point'


// system-level component 
// only be calld by 'game' object 
// any component that extends AbstractEventDrivenElement 
// must call the interface provided by 'System' aslo named 'Game' object 

class StandPopup extends AbstractEventDrivenElements implements AbstractPopup {
  
  showing:boolean;
  image: HTMLImageElement 
  imageOutline:Point 

  constructor(location:Point, outline:Point) {
    super(location, outline)
    this.imageOutline = new Point(0,0)
    this.showing = false
  }

  show(img:HTMLImageElement, outline: Point): void {
    this.image = img
    this.imageOutline = new Point(outline.x, outline.y)
    this.showing = true
  }

  // swipe the object from canvas using showing variable
  hide(): void {
    this.showing = false 
    //this.outline = new Point(0,0)
  }

  onTouchStart(e: TouchEvent): void {
    if(this.showing) {
      e.stopPropagation()
      this.hide()
    }
  }  

  onTouchMove(e: TouchEvent): void {
    //throw new Error("Method not implemented.");
  }

  onTouchEnd(e: TouchEvent): void {
    //throw new Error("Method not implemented.");
  }

  draw(ctx: CanvasRenderingContext2D): void {
    
    if(!this.showing) return 

    const width = this.image.width
    const height = this.image.height
    const ratio = width / height 

    this.imageOutline.y = this.imageOutline.x / ratio

    ctx.fillStyle= "rgba(0,0,0,0.5)"
    ctx.fillRect(this.location.x, this.location.y, this.outline.x, this.outline.y)
    
    let leftOffset:number, topOffset:number = 0 
    leftOffset = this.outline.x / 2 - this.imageOutline.x / 2 + this.location.x 
    topOffset = this.outline.y / 2 - this.imageOutline.y / 2 + this.location.y
    ctx.drawImage(this.image, leftOffset, topOffset,this.imageOutline.x, this.imageOutline.y)

  }
  
  move(point: Point): void {
    throw new Error("DO NOT CALL THIS METHOD!!");
  }
}

export default StandPopup