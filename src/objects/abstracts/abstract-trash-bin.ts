
import Point from '../functionalities/point'

import AbstractEventDrivenElements from './abstract-event-driven-element';
import ClassifiedTrash from '../elements/classified-trash';
import MarkWidget from '../widgets/mark-widget';
import RoundWidget from '../widgets/round-widget';

abstract class AbstractTrashBin extends AbstractEventDrivenElements{

  protected touchStartX:number 
  protected touchStartY:number 
  protected offsetY:number 
  constructor(location:Point, outline: Point) {
    super(location, outline)
    this.touchStartX = 0
    this.touchStartY = 0
    this.offsetY = 0
  }

  move(point: Point):void {
    this.location.add(point)
  }

  abstract draw(ctx: CanvasRenderingContext2D):void;
  // define when got collised's action 
  abstract collision(piece: ClassifiedTrash,mark?:MarkWidget, round?:RoundWidget):void;

  abstract onTouchStart(e: TouchEvent): void
  abstract onTouchMove(e: TouchEvent): void 
  abstract onTouchEnd(e: TouchEvent): void 
  abstract backToNormal(): void
  abstract throwTrash(): void 

  objectIn(piece: ClassifiedTrash):boolean {
    const x = piece.location.x + piece.outline.x / 2
    const y = piece.location.y + piece.outline.y 

    if(x >= this.location.x && x <= this.location.x + this.outline.x){
      if(y >= this.location.y && y <= this.location.y + this.outline.y- this.offsetY)
      {
        return true 
      }
    }
    return false
  }
}

export default AbstractTrashBin 

