import AbstractWidget from "./abstracts/abstract-widget";
import Point from "./point";


class MarkWidget extends AbstractWidget {
  
  private mark: number;

  constructor(location:Point, outline:Point, imgStr:string, mark:number) {
    super(location,outline, imgStr)
    this.mark = mark
  }

  add(mark:number) {
    this.mark += mark
  }

  onClick(e: TouchEvent): void {
   
  }

  draw(ctx:CanvasRenderingContext2D) {
    super.draw(ctx)
    ctx.font =  '20px "微软雅黑"'
    ctx.fillText(this.mark.toString(),this.location.x + this.widthRatio * 7, this.location.y + this.outline.y / 2 + 7)
  }
}

export default MarkWidget 