import AbstractTrash from '../interfaces/abstract-trash'
import Point from '../functionalities/point';

import AbstractEventDrivenElements from '../abstracts/abstract-event-driven-element';

class ClassifiedTrash  extends AbstractEventDrivenElements {

  image: HTMLImageElement

  id: number

  private title:string
  private content:string 

  private touchStartX:number 
  private touchStartY:number 
  private originalLocation:Point 
  constructor(id:number, location: Point, outline:Point, imageStr: string,title:string, content:string) {
    super(location, outline)

    this.id = id 
    this.image = new Image()
    this.image.src = imageStr 
    
    this.originalLocation = new Point(0,0 )

    this.content = content
    this.title = title

    this.touchStartX = 0
    this.touchStartY = 0

  }
  
  afterAddToContainer() {
    super.afterAddToContainer()
    this.originalLocation.x = this.location.x 
    this.originalLocation.y = this.location.y

  }
  onTouchStart(e: TouchEvent): void {
    e.stopPropagation()
    this.touchStartX = e.changedTouches[0].clientX
    this.touchStartY = e.changedTouches[0].clientY
  }

  onTouchMove(e: TouchEvent): void {
    const x = e.changedTouches[0].clientX 
    const y = e.changedTouches[0].clientY

    this.move(new Point(x - this.touchStartX, y - this.touchStartY))
    this.touchStartX = x
    this.touchStartY = y
  }

  onTouchEnd(e: TouchEvent): void {

    // throw new Error("Method not implemented.");
  }



  move(point: Point): void {
    this.location.add(point)
  } 

  draw(ctx: CanvasRenderingContext2D): void {
    const width = this.image.width 
    const height = this.image.height
    const ratio = width / height 

    ctx.drawImage(this.image, this.location.x, this.location.y, this.outline.x / ratio, this.outline.y)
  }


  normalLocation() {
    this.setLocation(this.originalLocation)
  }

  getTitle():string {
    return this.title
  }

  getContent():string {
    return this.content
  }

  getImage():HTMLImageElement {
    return this.image
  }

  showTips(){
    // this.showPrompt(this.title,this.content,this.image)
    // this.normalLocation()
  }

  clearY(): void {
    this.location.y = 0 
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

export default ClassifiedTrash