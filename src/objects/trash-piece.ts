

import AbstractTrash from './interfaces/abstract-trash'
import Point from './point'

class TrashPiece implements AbstractTrash{

  location: Point;
  velocity:Point;
  acceleration:Point;

  force:Point;

  width: number
  height: number

  constructor(location: Point, velocity:Point, acceleration:Point) {  
    this.location =new Point(location.x,location.y);
    this.velocity =new Point(velocity.x, velocity.y);
    this.acceleration = new Point(acceleration.x, acceleration.y);

  }

  // call this function when ininilizing object 
  applyForce(force: Point):void {
    this.force = force;
    this.acceleration.add(this.force)
  }

  // call this function when render object
  move():void {
    //this.acceleration.add(this.force)
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)

  }
  
  draw(ctx: CanvasRenderingContext2D):void {
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.arc(this.location.x,this.location.y,20,0,2*Math.PI);
    ctx.closePath()
    ctx.stroke()
  }
  // define the action at bound the edge 
  reachbound(width:number , height:number):void {
    const {x, y} = this.location

    if(y >= height) {
      this.clearY()
    }
  }

  resurrect():void {
    this.acceleration.empty()
    this.velocity.empty()
    this.location.empty()
  }

  clearY() {
    this.acceleration.y = 0
    this.acceleration.add(this.force)
    this.velocity.y = 0
    this.location.y = 0
  }
  getLocation():Point {
    return this.location
  }

}

export default TrashPiece