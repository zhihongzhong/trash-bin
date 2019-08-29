import ClassifiedTrashBin from './classified-trash-bin'
import ClassifiedTrash from './classified-trash'
import Point from './point';


class HarmfulTrashBin extends ClassifiedTrashBin {
  
  clickImage:HTMLImageElement 

  constructor(id:number, imageSrc:string[],location:Point, outline:Point, clickImageSrc:string) {
    super(id,imageSrc,location,outline)
    this.clickImage = new Image()
    this.clickImage.src = clickImageSrc 
  }

  onTouchStart(e:TouchEvent) {
    super.onTouchStart(e)
    this.showModel(90,90,this.clickImage)
  }

  collision(piece: ClassifiedTrash): void {
    if(piece.id === this.id) {
      // do something correct
    }
    else {
      piece.showTips()
      this.backToNormal()
    }
  }
}

export default HarmfulTrashBin