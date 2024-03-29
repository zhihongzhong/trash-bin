import Point from '../functionalities/point'
export default interface AbstractBackground  {
  draw(ctx: CanvasRenderingContext2D):void;

  getOutline():Point;
  setOutline(outline:Point):void;

  getLocation():Point;
  setLocation(location:Point):void;
  getInjected():boolean;
}