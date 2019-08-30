import Point from '../point'

export default interface AbstractPrompt {
  show(title:string, content:string,width:number, height:number):void
  hide():void
}