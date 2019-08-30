import Point from '../functionalities/point'

// any of 'the game' has to implement this interface 
interface GameElement {
  draw(ctx: CanvasRenderingContext2D):void;
  move(point: Point):void;
  setID(id:number):void;
  getID():number;
}

export default GameElement