import AbstractBackground from "../interfaces/abstract-background";
import Point from '../functionalities/point'

class Background implements AbstractBackground {
  location:Point;
  outline:Point;
  image:HTMLImageElement

  getOutline(): Point {
    return this.outline
  }

  setOutline(outline: Point): void {
    this.outline = new Point(outline.x, outline.y)
  }

  getLocation(): Point {
    return this.location
  }
  
  setLocation(location: Point): void {
    this.location = new Point(location.x, location.y)
  }
  
  constructor(location:Point, outline: Point, imageStr:string) {
    this.location = new Point(location.x, location.y)
    this.outline = new Point(outline.x, outline.y)

    this.image = new Image() 
    this.image.src = imageStr 

  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image,this.location.x, this.location.y,
      this.outline.x, this.outline.y)
  }

}

export default Background