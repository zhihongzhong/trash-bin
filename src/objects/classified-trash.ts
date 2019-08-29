import AbstractTrash from './interfaces/abstract-trash'
import Point from './point';
import Popup from './popup'

import AbstractEventDrivenElements from './abstracts/abstract-event-driven-element';

class ClassifiedTrash  extends AbstractEventDrivenElements {

  image: HTMLImageElement
  id: number
  private selected: boolean
  
  private touchStartX:number 
  private touchStartY:number 

  constructor(id:number, location: Point, outline:Point, imageStr: string) {
    super(location, outline)

    this.id = id 
    this.image = new Image()
    this.image.src = imageStr 
    this.selected = false 

    this.touchStartX = 0
    this.touchStartY = 0
  }
  
  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.changedTouches[0].clientX
    this.touchStartY = e.changedTouches[0].clientY
  }

  onTouchMove(e: TouchEvent): void {
    
    const x = e.changedTouches[0].clientX 
    const y = e.changedTouches[0].clientY
    this.move(new Point(x - this.touchStartX, y - this.touchStartY))

    this.touchStartX = x
    this.touchStartY = y
  }

  onTouchEnd(e: TouchEvent): void {
    // throw new Error("Method not implemented.");
  }

  select() {
    this.selected = true 
  }

  unselect() {
    this.selected = false 
  }

  move(point: Point): void {
    if(this.select)
      this.location.add(point)
  }  

  draw(ctx: CanvasRenderingContext2D): void {
    const width = this.image.width 
    const height = this.image.height
    const ratio = width / height 

    ctx.drawImage(this.image, this.location.x, this.location.y, this.outline.x / ratio, this.outline.y)
  }


  performCorrect():void {
    console.log("correct")
  }

  clearY(): void {
    this.location.y = 0 
  }

  in(point: Point):boolean {
    const {x, y} = point 

    if(x >= this.location.x && x <= this.location.x + this.outline.x){
      if(y >= this.location.y && y <= this.location.y + this.outline.y)
      {
        return true 
      }
    }
    return false
  }
}

export default ClassifiedTrash