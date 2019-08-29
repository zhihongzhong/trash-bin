import GameElement from './game-element'
import Point from '../point'
import ShowPopup from './show-popup'

export default interface EventDrivenElement extends GameElement {
  onTouchStart(e: TouchEvent):void
  onTouchMove(e: TouchEvent):void 
  onTouchEnd(e: TouchEvent):void
  inspectTouch(point: Point):boolean

  getIsTouching():boolean 
  setTouching(touch:boolean):void
  // callPopup(show:ShowPopup):void;
  injectPopup(popup:ShowPopup):void

  getOutline():Point;
  setOutline(outline:Point):void;

  getLocation():Point;
  setLocation(location:Point):void;
}