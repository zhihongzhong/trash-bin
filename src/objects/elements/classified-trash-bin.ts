import Point from '../functionalities/point'
import AbstractTrashBin from '../abstracts/abstract-trash-bin'
import ClassifiedTrash from './classified-trash'
import MarkWidget from '../widgets/mark-widget';
import RoundWidget from '../widgets/round-widget';


abstract class ClassifiedTrashBin extends AbstractTrashBin {

  id: number
  private images:HTMLImageElement[]
  private currentImage: HTMLImageElement
  private throwing: boolean 
  private falling: boolean

  

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
    
  }
  
  onTouchStart(e: TouchEvent): void {
  }

  onTouchMove(e: TouchEvent): void {
  }

  onTouchEnd(e: TouchEvent): void {
  }

  abstract collision(piece: ClassifiedTrash,mark:MarkWidget, round:RoundWidget): void;


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

  
}


export default ClassifiedTrashBin