import AbstractEventDrivenElements from "../abstracts/abstract-event-driven-element";
import AbstractPopup from "../interfaces/popup";
import Point from './point'

import * as img_prompt from '../../assets/wrongbg.jpg'
import AbstractPrompt from "../interfaces/abstract-prompt"
import EventHandler from "../interfaces/event-handler";
// system-level component 
// only be calld by 'game' object 
// any component that extends AbstractEventDrivenElement  which wanna show a model 
// must call the interface provided by 'System' aslo named 'Game' object 

class RichTextPrompt extends AbstractEventDrivenElements implements AbstractPrompt {
  
  showing:boolean;
  image: HTMLImageElement 
  imageOutline:Point 

  wrongImage:HTMLImageElement

  title:string
  content:string 

  onClick:EventHandler

  constructor(location:Point, outline:Point) {
    super(location, outline)
    this.image = new Image() 
    this.image.src = img_prompt
    this.showing = false
    this.onClick = null
    console.log(img_prompt)
  }

  show(title:string, content:string,width:number, height:number): void {
    //console.log(title,content,width, height)
    this.title = title 
    this.content = content
    this.imageOutline = new Point(width, height)
    this.showing = true
    //console.log(this)
  }

  showRichText(title:string, content:string,width:number,height:number, img:HTMLImageElement,onClick?:EventHandler):void {
    // do something
    this.title = title 
    this.content = content
    this.imageOutline = new Point(width, height)
    this.wrongImage = img
    this.showing = true
    console.log(onClick)
    this.onClick = onClick
  }
  // swipe the object from canvas using showing variable
  hide(): void {
    this.showing = false 
    //this.outline = new Point(0,0)
  }

  onTouchStart(e: TouchEvent): void {
    if(this.showing) {
      e.stopPropagation()
      this.hide()
      console.log(this.onClick)

      // after have used it, destroy it 
      if(this.onClick) {
        this.onClick()
        this.onClick = null
      }
    }
  }  

  onTouchMove(e: TouchEvent): void {
    //throw new Error("Method not implemented.");
  }

  onTouchEnd(e: TouchEvent): void {
    //throw new Error("Method not implemented.");
  }

  draw(ctx: CanvasRenderingContext2D): void {
    
    if(!this.showing) return 
    
    //this.imageOutline.y = this.imageOutline.x / ratio
    ctx.fillStyle= "rgba(0,0,0,0.5)"
    ctx.fillRect(this.location.x, this.location.y, this.outline.x, this.outline.y)
    
    let leftOffset:number, topOffset:number = 0 
    leftOffset = this.outline.x / 2 - this.imageOutline.x / 2 + this.location.x 
    topOffset = this.outline.y / 2 - this.imageOutline.y / 2 + this.location.y
    ctx.drawImage(this.image, leftOffset, topOffset,this.imageOutline.x, this.imageOutline.y)
    
    ctx.font='18px "微软雅黑"'
    ctx.textAlign = "center"
    ctx.fillText(this.title, this.outline.x / 2, topOffset + this.heightRatio * 5)
    ctx.fillText(this.content, this.outline.x /2, topOffset + this.heightRatio * 30)

    const imageRatio = this.wrongImage.width / this.wrongImage.height
    ctx.drawImage(this.wrongImage, this.outline.x / 2 - this.widthRatio * 15, this.outline.y / 2 - this.heightRatio * 15,
      this.widthRatio * 30, this.widthRatio / imageRatio * 30)
  }
  
  move(point: Point): void {
    throw new Error("DO NOT CALL THIS METHOD!!");
  }
}

export default RichTextPrompt