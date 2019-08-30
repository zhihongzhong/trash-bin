import Point from '../functionalities/point'

export default interface AbstractTrash {
  move(point: Point):void;
  draw(ctx: CanvasRenderingContext2D):void;
  clearY():void;
} 