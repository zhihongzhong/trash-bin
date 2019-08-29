import GameElement from './game-element'
import Point from '../point'

export default interface EventDrivenElement extends GameElement {
  onTouchStart(e: TouchEvent):void
  onTouchMove(e: TouchEvent):void 
  onTouchEnd(e: TouchEvent):void
  inspectTouch(point: Point):boolean

  getIsTouching():boolean 
  setTouching(touch:boolean):void
}