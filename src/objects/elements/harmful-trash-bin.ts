import ClassifiedTrashBin from './classified-trash-bin'
import ClassifiedTrash from './classified-trash'
import Point from '../functionalities/point';
import MarkWidget from '../widgets/mark-widget';
import RoundWidget from '../widgets/round-widget';


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

  collision(piece: ClassifiedTrash,mark:MarkWidget, round:RoundWidget): void {
    if(piece.id === this.id) {
      // do something correct
      mark.add(100)
      this.backToNormal()
      round.correctStep()
    
    }
    else {
      this.backToNormal()
      round.incorrectStep(piece)
    }
  }
}

export default HarmfulTrashBin