import EventHandler from './event-handler'

export default interface ShowPrompt {
  (title:string, content:string,image:HTMLImageElement,onClick?:EventHandler):void;
}