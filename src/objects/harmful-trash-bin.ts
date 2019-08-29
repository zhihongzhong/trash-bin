import ClassifiedTrashBin from './classified-trash-bin'
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
}

export default HarmfulTrashBin