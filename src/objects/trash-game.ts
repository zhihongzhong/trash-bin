import GameElement from './interfaces/game-element'
import AbstractGame from './abstracts/abstract-game'
import EventDrivenElement from './interfaces/event-driven-element'
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


  handleCanvasTouchStart(e: TouchEvent): void {
    super.handleCanvasTouchStart(e)
  }

  handleCanvasTouchMove(e: TouchEvent): void {
    super.handleCanvasTouchMove(e)
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

  handleCanvsToucheEnd(e: TouchEvent): void {
    super.handleCanvsToucheEnd(e)
  }
}

export default TrashGame