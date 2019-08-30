import AbstractGame from '../abstracts/abstract-game'
import ClassifiedTrashBin from '../elements/classified-trash-bin';
import ClassifiedTrash from '../elements/classified-trash';
import MarkWidget from '../widgets/mark-widget';
import RoundWidget from '../widgets/round-widget';

class TrashGame extends AbstractGame {
  
  bins:ClassifiedTrashBin[]
  trashes:ClassifiedTrash[]
  mark:MarkWidget
  round:RoundWidget

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    
    this.bins = []
    this.trashes = []
    this.mark = null 
    this.round = null
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

  addRoundObject(round:RoundWidget):void{
    super.addElement(round)
    this.round = round
  }

  addMarkObject(mark: MarkWidget):void {
    super.addElement(mark)
    this.mark = mark
  }

  onTouchStart(e: TouchEvent): void {
    
  }

  destroyTrash(trash:ClassifiedTrash) {
    super.destroyElement(trash)
    this.trashes = this.trashes.filter(t => t.getID() !== trash.getID())
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
    for(let i = 0; i < this.trashes.length; i++ ) {
      for(let j = 0; j < this.bins.length; j++) {
        if(this.bins[j].objectIn(this.trashes[i])) {
          this.bins[j].collision(this.trashes[i],this.mark,this.round)
        }
      }
    }
  }

}

export default TrashGame