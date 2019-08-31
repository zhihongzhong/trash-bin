import AbstractTrashBin from "../abstracts/abstract-trash-bin";
import Point from "../functionalities/point";
import ClassifiedTrash from "./classified-trash";
import MarkWidget from "../widgets/mark-widget";
import RoundWidget from "../widgets/round-widget";


class CatchingTrachBin extends AbstractTrashBin {
  
  

  image: HTMLImageElement 

  constructor(location:Point, outline:Point, imgStr:string) {
    super(location,outline)
    this.image = new Image()
    this.image.src = imgStr
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.changedTouches[0].clientX
  }  
  
  onTouchMove(e: TouchEvent): void {
    const moveX = e.changedTouches[0].clientX
    this.move(new Point(moveX - this.touchStartX, 0))
    this.touchStartX = moveX 
  }
  
  onTouchEnd(e: TouchEvent): void {
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.location.x, this.location.y, this.outline.x, this.outline.y)
  }

  collision(piece: ClassifiedTrash, mark?: MarkWidget, round?: RoundWidget) {
  }

  backToNormal(): void {
    
  }
  throwTrash(): void {
    
  }
}

export default CatchingTrachBin