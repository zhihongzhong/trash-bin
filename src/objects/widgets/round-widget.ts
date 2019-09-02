import AbstractWidget from "../abstracts/abstract-widget";
import Point from "../functionalities/point";
import ClassifiedTrash from "../elements/classified-trash";
import EventHandler from "../interfaces/event-handler";


class RoundWidget extends AbstractWidget {

  totalRound:number 
  currentRound:number 

  private onGameOver:EventHandler
  private next:EventHandler
  constructor(total:number, nextRound?:EventHandler, onGameOver?:EventHandler){
    super(new Point(0,0), new Point(0,0), "")
    this.totalRound = total 
    this.currentRound = 1
    this.next = nextRound
    this.onGameOver = onGameOver || null;
  }

  onClick(e: TouchEvent): void {
    
  }


  private showTips(piece: ClassifiedTrash,onClick?:EventHandler):void{
    this.showPrompt(piece.getTitle(), piece.getContent(), piece.getImage(),onClick)
    piece.normalLocation()
  }

  private nextRound():void{
    if(!this.over()){
      this.currentRound +=1
      this.next()
      return 
    }
    this.onGameOver && this.onGameOver()
  }

  correctStep(piece: ClassifiedTrash) {
    piece.gameResource.setResult(true)
    this.nextRound()
  }

  incorrectStep(piece: ClassifiedTrash) {
    piece.gameResource.setResult(false)

    if(!this.over()) {
      this.showTips(piece)
      this.nextRound()
      return
    }

    this.gameOver(piece)
  }

  private gameOver(piece: ClassifiedTrash) {
    console.log("game is over, and show tips")
    this.showTips(piece,this.onGameOver)
    return
  }

  private over():boolean {
    return this.currentRound >= this.totalRound
  }

  draw(ctx:CanvasRenderingContext2D):void {
    ctx.textAlign = "center"
    ctx.font = '18px "微软雅黑"'
    const str:string = this.currentRound + "/" + this.totalRound 
    ctx.fillText(str, this.widthRatio * 50, this.heightRatio * 5)
  }
}

export default RoundWidget