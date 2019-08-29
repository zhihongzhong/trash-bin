import AbstractGame from './abstracts/abstract-game'
import ClassifiedTrashBin from './classified-trash-bin';
import ClassifiedTrash from './classified-trash';

class TrashGame extends AbstractGame {
  
  bins:ClassifiedTrashBin[]
  trashes:ClassifiedTrash[]
   
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    
    this.bins = []
    this.trashes = []
  }

  initialize(): void {  
  }  
  
  addTrash(trash:ClassifiedTrash): void {
    super.addElement(trash)
    this.trashes.push(trash)
  }

  addTrashBin(bin: ClassifiedTrashBin): void {
    super.addElement(bin)
    this.bins.push(bin)
  }

  onTouchStart(e: TouchEvent): void {
    
  }

  onTouchMove(e: TouchEvent): void {
    for(let i = 0; i < this.trashes.length; i++ ) {
      for(let j = 0; j < this.bins.length; j++) {
        if(this.bins[j].objectIn(this.trashes[i])) {
          this.bins[j].throwTrash()
        }else{
          this.bins[j].backToNormal()
        }
      }
    }
  }

  onTouchEnd(e: TouchEvent): void {
    
  }

}

export default TrashGame