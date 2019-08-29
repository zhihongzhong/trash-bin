import EventDrivenElement from "../interfaces/event-driven-element";
import Point from '../point'

abstract class AbstractEventDrivenElements implements EventDrivenElement {

  location:Point;
  outline:Point;
  private isTouching:boolean;

  constructor(location: Point, outline:Point) {
    this.location = new Point(location.x, location.y)
    this.outline = new Point( outline.x, outline.y)
  }

  abstract onTouchStart(e: TouchEvent): void;
  abstract onTouchMove(e: TouchEvent): void;
  abstract onTouchEnd(e: TouchEvent): void;
  abstract draw(ctx: CanvasRenderingContext2D):void;
  abstract move(point: Point): void;

  inspectTouch(point: Point): boolean {
    return this.in(point)
  }

  drawImage(ctx:CanvasRenderingContext2D, image:HTMLImageElement) {
    ctx.drawImage(image, this.location.x, this.location.y,this.outline.x, this.outline.y)
  }
  

  getIsTouching():boolean{
    return this.isTouching;
  }

  setTouching(touch:boolean):void {
    this.isTouching = touch
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

export default AbstractEventDrivenElements