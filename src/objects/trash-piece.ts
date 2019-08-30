


import Point from './point'
import AbstractEventDrivenElements from './abstracts/abstract-event-driven-element';
import GameElement from './interfaces/game-element';

class TrashPiece extends AbstractEventDrivenElements {
  onTouchStart(e: TouchEvent): void {
    throw new Error("Method not implemented.");
  }
  onTouchMove(e: TouchEvent): void {
    throw new Error("Method not implemented.");
  }
  onTouchEnd(e: TouchEvent): void {
    throw new Error("Method not implemented.");
  }

  location: Point;
  velocity:Point;
  acceleration:Point;

  force:Point;

  width: number
  height: number

  constructor(location: Point, outline:Point,velocity:Point, acceleration:Point) {  
    super(location,outline)
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
    this.move()
    this.reachbound(this.getWidthRatio() * 100, this.getHeightRatio() * 100)
 
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    ctx.arc(this.location.x,this.location.y,this.outline.x,0,2*Math.PI);
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