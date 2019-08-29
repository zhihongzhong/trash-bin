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

  private touchStartTimer:number
  private touchMoveTimer:number
  private touchEndTimer:number

  private interruptStartTimer:boolean
  private interruptMoveTimer:boolean
  private interruptEndTimer:boolean

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

    this.touchStartTimer = 0
    this.touchMoveTimer = 0
    this.touchEndTimer = 0

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
   
    let ne:TouchEvent = e 
    ne.stopPropagation = ()=> {
      this.interruptStartTimer = true
    }

    let i = 0
    this.interruptEndTimer = false 
    
    console.log(this.elements)
    console.log(this.elements.length)
    const _internalHandleCanvasTouchStart = () => {
      if(this.elements[i].inspectTouch(new Point(x, y ))) {
        this.elements[i].onTouchStart(ne)
        this.elements[i].setTouching(true)
      }
      i += 1
      if(!this.interruptStartTimer && i < this.elements.length-1) {
        console.log("set time out")
        setTimeout(_internalHandleCanvasTouchStart,10)
      }
        
    }

    _internalHandleCanvasTouchStart()
  }

  handleCanvasTouchMove(e: TouchEvent):void {
    
    this.onTouchMove(e)

    let ne:TouchEvent = e 
    ne.stopPropagation = ()=> {
      this.interruptMoveTimer = true
    }

    let i = 0 
    this.interruptMoveTimer = false 
    
    const _internalHandleCanvasTouchMove = () =>{
  
      if(this.elements[i].getIsTouching()) {
        this.elements[i].onTouchMove(ne)
      }
      i+=1 

      if(!this.interruptMoveTimer && i < this.elements.length-1)
        setTimeout(_internalHandleCanvasTouchMove,1)
    }
    
    _internalHandleCanvasTouchMove()
  }

 handleCanvsToucheEnd(e: TouchEvent):void {


  this.onTouchEnd(e)

  let ne:TouchEvent = e 
    ne.stopPropagation = ()=> {
      this.interruptEndTimer = true
    }

  let i = 0
  this.interruptEndTimer = false 

  const _internalHandleCanvasTouchEnd = () =>{
      
      if(this.elements[i].getIsTouching()) {
        this.elements[i].onTouchEnd(ne)
        this.elements[i].setTouching(false)
      }
      i +=1
      if(!this.interruptEndTimer && i < this.elements.length-1) {
        setTimeout(_internalHandleCanvasTouchEnd, 1);
      }
    }

  _internalHandleCanvasTouchEnd()

 }

}

export default AbstractGame