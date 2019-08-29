import Point from './point'
import AbstractTrashBin from './abstracts/abstract-trash-bin'
import ClassifiedTrash from './classified-trash'


abstract class ClassifiedTrashBin extends AbstractTrashBin {

  id: number
  private images:HTMLImageElement[]
  private currentImage: HTMLImageElement
  private throwing: boolean 
  private falling: boolean

  private offsetY:number 

  constructor(id:number, imagesSrc:string[], location: Point, outline: Point) {
    super(location,outline)
    this.id = id 
    this.images = []
    imagesSrc.forEach(src =>{
      let image:HTMLImageElement = new Image() 
      image.src = src 
      this.images.push(image)
    })
    this.currentImage = this.images[0]
    this.throwing = false 
    this.falling = false
    this.offsetY = 0
  }
  
  onTouchStart(e: TouchEvent): void {
  }

  onTouchMove(e: TouchEvent): void {
  }

  onTouchEnd(e: TouchEvent): void {
  }

  abstract collision(piece: ClassifiedTrash): void;


  draw(ctx: CanvasRenderingContext2D):void{
    ctx.drawImage(this.currentImage,this.location.x, this.location.y,
      this.outline.x, this.outline.y)
  }

  throwTrash(): void {
    if(this.throwing) return 
    // synchronized block 
    this.throwing = true 

    //let i = this.images.length
    let i = 10
    const perform =()=>setTimeout(()=>{
      this.move(new Point(0, -5))
      //this.currentImage = this.images[this.images.length - 1 - i]
      this.offsetY -= 5
      i -= 1
      if(i >= 0) perform()
      else this.currentImage = this.images[this.images.length -1 ]
    },16)
    perform()
  }

  // if current state is not 'throwing', doesn't have to back to normal state 
  backToNormal(): void {
    if(!this.throwing) return
    if(this.falling) return 

    const callback = ()=>{ this.throwing = false; this.falling = false; this.currentImage = this.images[0]}
    this.falling = true
    //let i = this.images.length - 1
    let i = 10
    const perform = (callback:()=>void) => setTimeout(()=> {
      this.move(new Point(0, 5))
      this.offsetY += 5
      //this.currentImage = this.images[i]
      i -= 1
      if(i >= 0) perform(callback)
      else callback()
    },16)
    perform(callback)
  }

  objectIn(piece: ClassifiedTrash) {
    const x = piece.location.x + piece.outline.x / 2
    const y = piece.location.y + piece.outline.y 

    if(x >= this.location.x && x <= this.location.x + this.outline.x){
      if(y >= this.location.y && y <= this.location.y + this.outline.y- this.offsetY)
      {
        return true 
      }
    }
    return false
  }
}


export default ClassifiedTrashBin