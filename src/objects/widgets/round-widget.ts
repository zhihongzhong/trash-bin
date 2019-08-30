import AbstractWidget from "../abstracts/abstract-widget";
import Point from "../functionalities/point";

interface OnGameOver {
  ():void
}

interface OnNextRound {
  ():void
}
class RoundWidget extends AbstractWidget {

  totalRound:number 
  currentRound:number 

  private onGameOver:OnGameOver
  private next:OnNextRound
  constructor(total:number, nextRound?:OnNextRound, onGameOver?:OnGameOver){
    super(new Point(0,0), new Point(0,0), "")
    this.totalRound = total 
    this.currentRound = 1
    this.next = nextRound
    this.onGameOver = onGameOver || null;
  }

  onClick(e: TouchEvent): void {
    
  }


  nextRound():void{
    if(!this.over()){
      this.currentRound +=1
      this.next()
      return
    }

    this.onGameOver && this.onGameOver()
  }

  over():boolean {
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