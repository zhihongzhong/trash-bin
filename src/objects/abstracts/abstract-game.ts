import GameElement from '../interfaces/game-element'
import EventDrivenElement from '../interfaces/event-driven-element'
import Point from '../point';
import AbstractEventDrivenElements from './abstract-event-driven-element';
import AbstractBackground from '../interfaces/abstract-background';

// this is a abstract game scene object for 
// rendering static object 
// and cannot be used by any component 
abstract class AbstractGame {
  private canvas: HTMLCanvasElement 
  protected ctx: CanvasRenderingContext2D
  private width: number 
  private height: number 
  private elements: EventDrivenElement[]
  private backgrounds: AbstractBackground[]

  public readonly wp: number // internal scale
  public readonly hp: number // internal scale

  // get wp and wh based on device scale
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas 
    this.ctx = canvas.getContext("2d")

    const winWidth = document.documentElement.clientWidth || document.body.clientWidth
    const winHeight = document.documentElement.clientHeight || document.body.clientHeight
    
    this.canvas.width = winWidth
    this.canvas.height = winHeight 

    this.wp = winWidth /100
    this.hp = winHeight / 100 

    this.elements = []
    this.backgrounds = []

    if(this.ctx === null || this.canvas === null) {
      throw new Error("failed to create canvas, check the canvas argument")
    }

    this.canvas.addEventListener("touchstart", this.handleCanvasTouchStart.bind(this))
    this.canvas.addEventListener("touchmove", this.handleCanvasTouchMove.bind(this))
    this.canvas.addEventListener("touchend", this.handleCanvsToucheEnd.bind(this))
  }

  addElement(element: EventDrivenElement):void {
    this.elements.push(element)
  }

  addBackground(background: AbstractBackground): void {
    this.backgrounds.push(background)
  }

  render():void {
   const ctx: CanvasRenderingContext2D = this.ctx

   // render background first 
   this.backgrounds.forEach((b)=> b.draw(ctx))

   this.elements.forEach(
     e => e.draw(ctx)
   )
   requestAnimationFrame(this.render.bind(this))
  }

  // 0 ~ 100 
  IW(n: number): number {
    if(n > 100) {
      return -1 
    }
    return n * this.wp
  }

  // 0 ~ 100 
  IH(n: number): number {
    if(n > 100) {
      return -1
    }
    return n * this.hp
  }

  abstract initialize():void ;
  abstract onTouchStart(e:TouchEvent):void;
  abstract onTouchMove(e: TouchEvent):void;
  abstract onTouchEnd(e:TouchEvent):void;

  handleCanvasTouchStart(e: TouchEvent):void {
    
    this.onTouchStart(e)
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientY
   
    this.elements.forEach(
      ele => {
        if(ele.inspectTouch(new Point(x, y))) {
          ele.onTouchStart(e)
          ele.setTouching(true)
        }
      }
    )
  }

  handleCanvasTouchMove(e: TouchEvent):void {
    
    this.onTouchMove(e)
    this.elements.forEach( ele => {
      if(ele.getIsTouching()) {
        ele.onTouchMove(e)
      }
    })
  }

 handleCanvsToucheEnd(e: TouchEvent):void {
   this.onTouchEnd(e)
  this.elements.forEach( ele => {
    if(ele.getIsTouching()) {
      ele.onTouchEnd(e)
      ele.setTouching(false)
    }
  })
 }

}

export default AbstractGame