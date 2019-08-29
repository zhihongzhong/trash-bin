
import Point from '../point'
import AbstractTrash from '../interfaces/abstract-trash'

import AbstractEventDrivenElements from './abstract-event-driven-element';

abstract class AbstractTrashBin extends AbstractEventDrivenElements{

  touchStartX:number 
  touchStartY:number 

  constructor(location:Point, outline: Point) {
    super(location, outline)
    this.touchStartX = 0
    this.touchStartY = 0
  }

  move(point: Point):void {
    this.location.add(point)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.strokeRect(this.location.x, this.location.y, this.outline.x, this.outline.y)
    ctx.closePath()
    ctx.stroke()
  }
  // define when got collised's action 
  collision(piece: AbstractTrash){
    piece.clearY()
  }

  abstract onTouchStart(e: TouchEvent): void
  abstract onTouchMove(e: TouchEvent): void 
  abstract onTouchEnd(e: TouchEvent): void 
}

export default AbstractTrashBin 

