import EventDrivenElement from "../interfaces/event-driven-element";
import Point from '../point'
import ShowPopup from "../interfaces/show-popup"
import ShowPrompt from "../interfaces/show-prompt"
abstract class AbstractEventDrivenElements implements EventDrivenElement {
 
  
  
  location:Point
  outline:Point
  private isTouching:boolean
  showModel:ShowPopup
  showPrompt:ShowPrompt
  protected widthRatio:number 
  protected heightRatio:number 
  private elementID:number 

  constructor(location: Point, outline:Point) {
    this.location = new Point(location.x, location.y)
    this.outline = new Point( outline.x, outline.y)
  }

 
  
  abstract onTouchStart(e: TouchEvent): void;
  abstract onTouchMove(e: TouchEvent): void;
  abstract onTouchEnd(e: TouchEvent): void;
  abstract draw(ctx: CanvasRenderingContext2D):void;
  abstract move(point: Point): void;

  getID():number{
    return this.elementID
  }

  setID(id:number):void {
    this.elementID = id
  }
  
  getWidthRatio(): number {
    return this.widthRatio
  }
  getHeightRatio(): number {
    return this.heightRatio
  }
  setWidghRatio(ratio: number): void {
    this.widthRatio = ratio
  }
  setHeightRatio(ratio: number): void {
    this.heightRatio = ratio
  }
  
  beforeAddToContainer():void{

  }
  
  afterAddToContainer():void{

  }

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

  injectPopup(popup: ShowPopup): void {
    this.showModel = popup
  }

  injectPrompt(prompt: ShowPrompt):void {
    this.showPrompt = prompt
  }

  inspectTouch(point: Point): boolean {
    return this.in(point)
  }


  drawImage(ctx:CanvasRenderingContext2D, image:HTMLImageElement) {
    ctx.drawImage(image, this.location.x, this.location.y,this.outline.x, this.outline.y)
  }
  

  getIsTouching():boolean{
    return this.isTouching;
  }

  setTouching(touch:boolean):void {
    this.isTouching = touch
  }

  in(point: Point):boolean {
    const {x, y} = point 

    if(x >= this.location.x && x <= this.location.x + this.outline.x){
      if(y >= this.location.y && y <= this.location.y + this.outline.y)
      {
        return true 
      }
    }
    return false
  }

}

export default AbstractEventDrivenElements