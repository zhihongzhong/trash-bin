import Point from '../functionalities/point'

export default interface AbstractPopup {
  show(img:HTMLImageElement, outline:Point):void
  hide():void
}