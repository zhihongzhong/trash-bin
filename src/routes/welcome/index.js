import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TrashPiece from '../../objects/trash-piece';
import AbstractTrashBin from '../../objects/abstracts/abstract-trash-bin'

import "./index.scss"

class Game extends Component {
  constructor(props) {
    super(props)
    
    this.canvas = React.createRef()
    this.ctx = null
  
    this.trashArray = []

    this.trashBin = null
    this.width = 0
    this.height = 0

    this.startTouchX = 0
    this.startTouchY = 0
  }

  // 初始化canvas
  componentDidMount() {

    const winWidth = document.documentElement.clientWidth || document.body.clientWidth
    const winHeight = document.documentElement.clientHeight || document.body.clientHeight

    this.canvas.width = winWidth
    this.canvas.height = winHeight

    this.ctx = this.canvas.getContext("2d")
    this.width =this.canvas.width
    this.height = this.canvas.height 

    for(let i = 0; i < 10; i++) {
      let trash = new TrashPiece({x: Math.random()* this.width, y: 0},{x: 0, y: 0},{x: 0, y: 0})
      trash.applyForce({x: 0, y: 0.3})
      this.trashArray.push(trash)
    }

    this.trashBin = new AbstractTrashBin({x: this.width / 2 - 100, y: this.height -250},{x: 200, y: 200})
    
    this.canvas.addEventListener("touchmove", this.handleCanvasTouchMove.bind(this))
    this.canvas.addEventListener("touchstart", this.handleCanvasTouchStart.bind(this))
    requestAnimationFrame(this.renderAnimation.bind(this))

  }

  initializeGame() {

  }

  
  renderAnimation() {

    this.ctx.fillStyle="#fff";
    this.ctx.fillRect(0,0,this.width,this.height);
    
    for(let i = 0; i < 10; i++) {
      this.trashArray[i].move()
      if(this.trashBin.in(this.trashArray[i].location))
        this.trashBin.collision(this.trashArray[i])

      this.trashArray[i].reachbound(this.width,this.height)
    }

    for(let i = 0; i < 10; i++) {
      this.trashArray[i].draw(this.ctx)
    }

    this.trashBin.draw(this.ctx)
    requestAnimationFrame(this.renderAnimation.bind(this))
  }

  handleCanvasTouchMove(e) {
    let moveTouchX = e.changedTouches[0].clientX 
    //let moveTouchY = e.changedTouches[0].clientY 

    // right turn
    if(moveTouchX > this.startTouchX) {
      this.trashBin.move({y:0, x:(moveTouchX - this.startTouchX)})
    }

    // left turn 
    if(moveTouchX < this.startTouchX) {
      this.trashBin.move({y:0, x:(moveTouchX - this.startTouchX)})
    }
    this.startTouchX = moveTouchX
    
  }

  handleCanvasTouchStart(e) {
    this.startTouchX = e.changedTouches[0].clientX
   // this.startTouchY = e.changedTouches[0].clientY 
    console.log(this.startTouchX, this.startTouchY)
  }

  render() {
    return(
    <div style={{overflow:"hidden"}}>
      <canvas ref={(ref)=>this.canvas = ref}>
        您的浏览器不支持CANVAS
      </canvas>
    </div>
    )

  }
}


export default Game 