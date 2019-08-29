import Point from '../point'

export default interface AbstractPopup {
  show(imgStr:string, outline:Point):void 
  hide():void
}