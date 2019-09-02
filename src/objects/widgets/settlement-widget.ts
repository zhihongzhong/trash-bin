import AbstractWidget from "../abstracts/abstract-widget";
import Point from "../functionalities/point";
import DynamicResource from "../interfaces/dynamic-resource";

import * as img_listbg from '../../assets/listbg3.png'
import * as img_right from '../../assets/right.png'
import * as img_wrong from '../../assets/wrong.png'

class SettlementWidget extends AbstractWidget {

  resources: DynamicResource[]
  private textStartPos:number 
  private ratio:number 
  private realHeight:number 

  private leftOffset:number 
  private topOffset:number 

  private readonly textLineHeight:number 

  private textOffsetPos:number 
  private rightImage:HTMLImageElement
  private wrongImage:HTMLImageElement 

  constructor(location:Point, outline:Point, resources: DynamicResource[]) {
    super(location,outline, img_listbg)
    this.resources = resources
    this.textLineHeight = 25 
    this.rightImage = new Image() 
    this.rightImage.src = img_right
    this.wrongImage = new Image() 
    this.wrongImage.src = img_wrong
  }

  afterAddToContainer():void {
    
    
  }

  onClick(e: TouchEvent): void {
    
  }
  
  
  fillItem(ctx:CanvasRenderingContext2D, result:boolean, title:string ):void {
   
    const size = this.widthRatio * 3
    
    ctx.fillText(title, this.widthRatio * 100 / 2, this.textOffsetPos)

    if(result) {
      ctx.drawImage(this.rightImage, this.leftOffset + this.widthRatio * 8,this.textOffsetPos - this.heightRatio * 1.5 ,size,size)
    }else {
      ctx.drawImage(this.wrongImage,this.leftOffset + this.widthRatio * 8, this.textOffsetPos - this.heightRatio * 1.5,size,size)
    }
  } 

  draw(ctx:CanvasRenderingContext2D) {
    const width = this.image.width
    const height = this.image.height
    
    this.ratio = width / height
    this.realHeight = this.outline.x / this.ratio
    this.leftOffset = this.widthRatio * 100 /2 - this.outline.x / 2
    this.topOffset = this.heightRatio * 100 /2 - this.realHeight / 2
    this.textOffsetPos = this.topOffset + this.heightRatio * 10

    ctx.drawImage(this.image, this.leftOffset, this.topOffset, this.outline.x, this.realHeight)
    ctx.font = '15px "微软雅黑"'
    ctx.textAlign = "center"
  
    this.resources.forEach( resource => {
      this.fillItem(ctx, resource.correct, resource.tipTitle)
      this.textOffsetPos += this.textLineHeight
    })
  }
}


export default SettlementWidget 