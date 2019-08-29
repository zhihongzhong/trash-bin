import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassifiedTrashBin from '../../objects/classified-trash-bin';
import ClassifiedTrash from '../../objects/classified-trash';
import Popup from '../../objects/popup';
import img_banana from '../../assets/banana.jpg'
import TrashGame from '../../objects/trash-game';

import img_t1 from '../../assets/t1.png'
import img_t1_1 from '../../assets/t1_1.png'
import img_t2 from '../../assets/t2.png'
import img_t2_1 from '../../assets/t2_1.png'
import img_t3 from '../../assets/t3.png'
import img_t3_1 from '../../assets/t3_1.png'
import img_t4 from '../../assets/t4.png'
import img_t4_1 from '../../assets/t4_1.png'

import img_bg from '../../assets/bg.jpg'
import img_bot from '../../assets/bot.jpg'


import img_sndon from '../../assets/sndon.png'
import img_sndoff from '../../assets/sndoff.png'
import img_C2 from '../../assets/C2.1.png'

import Background from '../../objects/background';
import MusicWidget from '../../objects/music-widget';
import Point from '../../objects/point';

class RealGame extends Component {
  constructor(props) {
    super(props)

    this.canvas = React.createRef() 
    // this.pop = React.createRef() 

    // this.ctx = null 
    
    // this.trash = null 
    
    // this.trashBins = []

    // this.width = 0 
    // this.height = 0

    // this.startTouchX = 0
    // this.startTouchY = 0
    // this.popup = null
    // this.initialize = this.initialize.bind(this)

    this.game = null
  }

  // init some basic scene
  componentDidMount() {
    this.game = new TrashGame(this.canvas)
    
    const t1 = new ClassifiedTrashBin(10,[img_t1,img_t1_1],
      {x: this.game.IW(2), y: this.game.IH(78)},{x: this.game.IW(20), y: this.game.IH(20)
    })

    const t2 = new ClassifiedTrashBin(20,[img_t2, img_t2_1],
      {x: this.game.IW(28),y: this.game.IH(78)},{x: this.game.IW(20),y: this.game.IH(20)
    })

    const t3 = new ClassifiedTrashBin(30,[img_t3, img_t3_1],
      {x: this.game.IW(53),y: this.game.IH(78)},{x: this.game.IW(20),y: this.game.IH(20)
    })

    const t4 = new ClassifiedTrashBin(40,[img_t4, img_t4_1],
      {x: this.game.IW(77),y: this.game.IH(78)},{x: this.game.IW(20),y: this.game.IH(20)
    })

    
    const musicWidget = new MusicWidget(new Point(this.game.IW(85),this.game.IH(5)),new Point(this.game.IW(15),this.game.IH(5)),img_sndon,img_sndoff)
    const bg1 = new Background({x:0, y: 0},{x:this.game.IW(100),y: this.game.IH(100)},img_bg)
    const bg2 = new Background({x:0, y: this.game.IH(70)},{x:this.game.IW(100),y: this.game.IH(30)},img_bot)
    const trash = new ClassifiedTrash(10, new Point(this.game.IW(40),this.game.IH(30)),new Point(this.game.IW(35), this.game.IH(20)),img_C2)
    this.game.addBackground(bg1)
    this.game.addBackground(bg2)

    this.game.addElement(musicWidget)
    this.game.addTrash(trash)
    this.game.addTrashBin(t1)
    this.game.addTrashBin(t2)
    this.game.addTrashBin(t3)
    this.game.addTrashBin(t4)

    
    this.game.render()
    // this.popup = new Popup(this.pop, "YOU!! GOTTA BE WRONG","香蕉皮，属于可降解的湿垃圾",img_banana, "香蕉", this.initialize.bind(this))
    // const winWidth = document.documentElement.clientWidth || document.body.clientWidth
    // const winHeight = document.documentElement.clientHeight || document.body.clientHeight

    // this.canvas.width = winWidth  - 1
    // this.canvas.height = winHeight - 1

    // this.ctx = this.canvas.getContext("2d")

    // this.width = winWidth
    // this.height = winHeight 

    // this.canvas.addEventListener("touchstart",this.handleCanvasToucheStart.bind(this))
    // this.canvas.addEventListener("touchmove", this.handleCanvasTouchMove.bind(this))
    // this.canvas.addEventListener("touchend", this.handleCanvasTouchEnd.bind(this))
    // this.initialize()
  }

  
  // arguments like:
  // question, possible answers etc..
  //may be received 
  // to initialize the game 
  // but for now, is just for test 
  // call this function in 'componentDidMount' method 
  initialize() {
   

   
    // this.trashBins = []
    // this.trash = null 

    // // initialize trash bins in loops

    // for(let i = 1; i <= 4; i++ ){
    //   let trashBin = new ClassifiedTrashBin(i,[],{x: i * (70),y:this.height - 150},{x: 50, y: 120})
    //   this.trashBins.push(trashBin)
    // }

    
    // this.trash = new ClassifiedTrash(2, {x: this.width / 2 - 40, y: 200},
    //   {x: 80, y: 80},img_banana,this.popup
    // )

    // // enter the logic for game
    // requestAnimationFrame(this.renderAnimation.bind(this))
  }


  

  // handleCanvasTouchMove(e) {
  //   let moveTouchX = e.changedTouches[0].clientX
  //   let moveTouchY = e.changedTouches[0].clientY 
  //   let trashbinId = 0 
    
  //   this.trash.move({x: moveTouchX - this.startTouchX, y: moveTouchY - this.startTouchY})
    
  //   for(let i = 0; i < this.trashBins.length; i++ ) {
  //     if(this.trashBins[i].objectIn(this.trash)){
  //       trashbinId = this.trashBins[i].id
  //     }
  //   }

  //   for( let i = 0; i < this.trashBins.length; i++) {
  //     if(this.trashBins[i].id === trashbinId) {
  //       this.trashBins[i].throwTrash()
  //     }else {
  //       this.trashBins[i].backToNormal()
  //     }
  //   }
  //   this.startTouchX = moveTouchX
  //   this.startTouchY = moveTouchY
  // }

  // handleCanvasTouchEnd(e) {

  //   for(let i = 0; i < this.trashBins.length; i++ ) {
  //     if(this.trashBins[i].objectIn(this.trash)){
  //       this.trashBins[i].collision(this.trash)
  //     }
  //   }

  //   this.trash.unselect()
  // }

  // handleCanvasToucheStart(e) {
    
  //   this.startTouchX = e.changedTouches[0].clientX 
  //   this.startTouchY = e.changedTouches[0].clientY 

  //   if(this.trash.in({x: this.startTouchX, y: this.startTouchY}))
  //     this.trash.select()
  // }

  // // the main render function
  // renderAnimation() {
  //   this.ctx.fillStyle = "#fff"
  //   this.ctx.fillRect(0, 0, this.width, this.height)
    

  //   for(let i = 0; i < this.trashBins.length; i++ ) {
  //     this.trashBins[i].draw(this.ctx)
  //   }

  //   this.trash.draw(this.ctx)

  //   requestAnimationFrame(this.renderAnimation.bind(this))
  // }

  render() {

    return (
      <div className="real-game-root" style={{width: "100vw",height: "100vh", overflow: "hidden"}}>
        <div className="canvas-wrapper">
          <canvas ref={(ref)=> this.canvas = ref}>
            您的浏览器不支持canvas
          </canvas>
        </div>
        <div className="pop" ref={(r)=> this.pop = r}>
        </div>
      </div>
    )
  }
}


export default RealGame