import AbstractEventDrivenElements from "./abstract-event-driven-element";
import Point from '../point'

abstract class AbstractWidget extends AbstractEventDrivenElements {

  image:HTMLImageElement 

  constructor(location:Point, outline:Point, imgStr:string) {
    super(location,outline)
    this.image = new Image()
    this.image.src = imgStr
  }

  abstract onClick(e: TouchEvent):void;

  onTouchStart(e: TouchEvent): void {
    this.onClick(e)
  }  

  onTouchMove(e: TouchEvent): void {
    
  }

  onTouchEnd(e: TouchEvent): void {
    
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.drawImage(ctx,this.image)
  }

  // DO NOT ! IMPLEMENT ! THIS METHOD !!!!!
  move(point: Point): void {
    
  }

  
}

export default AbstractWidget