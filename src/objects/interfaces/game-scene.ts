
export default interface GameScene {
  initialize(canvas: HTMLCanvasElement):void;
  start():void;
  destory():void;
}