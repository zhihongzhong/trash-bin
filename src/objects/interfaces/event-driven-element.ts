import GameElement from './game-element'
import Point from '../functionalities/point'
import ShowPopup from './show-popup'
import ShowPrompt from './show-prompt'

export default interface EventDrivenElement extends GameElement {
  onTouchStart(e: TouchEvent):void
  onTouchMove(e: TouchEvent):void 
  onTouchEnd(e: TouchEvent):void
  inspectTouch(point: Point):boolean

  getIsTouching():boolean 
  setTouching(touch:boolean):void
  injectPopup(popup:ShowPopup):void
  injectPrompt(prompt:ShowPrompt)
  getOutline():Point;
  setOutline(outline:Point):void

  getLocation():Point
  setLocation(location:Point):void

  beforeAddToContainer():void
  afterAddToContainer():void

  getWidthRatio():number
  getHeightRatio():number 
  setWidghRatio(ratio:number):void
  setHeightRatio(ratio:number):void

}