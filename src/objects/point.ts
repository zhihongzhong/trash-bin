
class Point {
  x:number; 
  y:number;

  constructor(x:number, y: number){
    this.x = x;
    this.y = y;
  }

  add(point:Point):void {
    this.x += point.x;
    this.y += point.y;
  }

  minus(point:Point):void {
    this.x -= point.x;
    this.y -= point.y;
  }

  empty(){
    this.x = 0
    this.y = 0
  }
}

export default Point