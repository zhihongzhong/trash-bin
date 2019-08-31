import AbstractWidget from "../abstracts/abstract-widget";
import Point from "../functionalities/point";

interface HandleClick {
  ():void
}
class StartButtonWidget extends AbstractWidget {

  private handleClick:HandleClick
  private maxLocation:Point 
  private maxOutline:Point 
  private minLocation:Point 
  private minOutline:Point 

  private amount:number
  increment:number
  constructor(location:Point, outline:Point, imgStr:string, handleClick:HandleClick){
    super(location,outline,imgStr)
    this.handleClick = handleClick
    this.amount =  5 
    this.increment = 0.3
  }

  onClick(e: TouchEvent): void {
    e.stopPropagation()
    this.handleClick()
  }

  afterAddToContainer():void {
    this.maxLocation = new Point(this.location.x - 10, this.location.y -10)
    this.maxOutline = new Point(this.outline.x + 10, this.outline.y + 10 )
    this.minLocation = new Point(this.location.x ,this.location.y)
    this.minOutline = new Point(this.outline.x, this.outline.y)
  }

  draw(ctx:CanvasRenderingContext2D):void {
    const currentLocation:Point = new Point(this.location.x - this.amount, this.location.y - this.amount)
    const currentOutline:Point = new Point(this.outline.x + this.amount, this.outline.y + this.amount)

    ctx.drawImage(this.image, currentLocation.x, currentLocation.y, currentOutline.x, currentOutline.y)

    const font = `${this.amount + 15}px "微软雅黑"`
    ctx.textAlign = "center"
    ctx.font = font
    ctx.fillText("开始",currentLocation.x + currentOutline.x / 2, currentLocation.y + currentOutline.y / 2 + (this.amount+10) / 2)
    if(this.amount >= 10 || this.amount <= 0) 
      this.increment = -this.increment

      this.amount += this.increment
  }
  
}

export default StartButtonWidget