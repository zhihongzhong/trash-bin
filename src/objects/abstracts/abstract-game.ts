import GameElement from '../interfaces/game-element'
import EventDrivenElement from '../interfaces/event-driven-element'
import Point from '../point';
import AbstractBackground from '../interfaces/abstract-background';
import StandPopup from '../stand-popup';
import ShowPopup from '../interfaces/show-popup';

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


  private interruptStartTimer:boolean
  private interruptMoveTimer:boolean
  private interruptEndTimer:boolean
  
  private popup:StandPopup
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

    this.popup = new StandPopup(new Point(0,0), new Point(this.IW(100),this.IH(100)))

    if(this.ctx === null || this.canvas === null) {
      throw new Error("failed to create canvas, check the canvas argument")
    }

    this.canvas.addEventListener("touchstart", this.handleCanvasTouchStart.bind(this))
    this.canvas.addEventListener("touchmove", this.handleCanvasTouchMove.bind(this))
    this.canvas.addEventListener("touchend", this.handleCanvsToucheEnd.bind(this))
  }

  showPopup(popInfo: ShowPopup) {

  }
  // inject popup here 
  // correct the scale here 
  addElement(element: EventDrivenElement):void {
    let outline:Point = element.getOutline()
    let location:Point = element.getLocation()

    outline.x = this.IW(outline.x)
    outline.y = this.IH(outline.y)
    location.x = this.IW(location.x)
    location.y = this.IH(location.y)

    element.setOutline(outline)
    element.setLocation(location)

    element.injectPopup(this.showPopup.bind(this))
    this.elements.push(element)
  }

  addBackground(background: AbstractBackground): void {
    let outline:Point = background.getOutline()
    let location:Point = background.getLocation()

    outline.x = this.IW(outline.x)
    outline.y = this.IH(outline.y)
    location.x = this.IW(location.x)
    location.y = this.IH(location.y)

    background.setOutline(outline)
    background.setLocation(location)
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
    
    const _internalHandleCanvasTouchStart = () => {
      if(this.elements[i].inspectTouch(new Point(x, y ))) {
        this.elements[i].onTouchStart(ne)
        this.elements[i].setTouching(true)
      }
      i += 1
      if(!this.interruptStartTimer && i < this.elements.length-1) {
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
        setTimeout(_internalHandleCanvasTouchMove,10)
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
        setTimeout(_internalHandleCanvasTouchEnd, 10);
      }
    }

  _internalHandleCanvasTouchEnd()

 }

}

export default AbstractGame