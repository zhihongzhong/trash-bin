import React, { Component } from 'react'
import RoundRobinGameScene from '../../objects/round-robin-game-scene';
import StandDynamicResource from '../../objects/functionalities/stand-dynamic-resource';

import gb_song from '../../assets/bg-song.m4a'
import C1 from '../../assets/C2.1.png'
import C2 from '../../assets/C2.2.png'
import C3 from '../../assets/C3.1.png'
import C4 from '../../assets/C3.2.png'
import C5 from '../../assets/C3.3.png'
import C6 from '../../assets/C3.4.png'
import C7 from '../../assets/C8.1.png'
import C8 from '../../assets/C8.2.png'


class RealGame extends Component {
  constructor(props) {
    super(props)

    this.canvas = React.createRef() 
    this.audio = React.createRef()
  }

  // init some basic scene
  componentDidMount() {
    this.initialize()
  }


  nextRound() {

  }

  destory() {

  }

  initialStageOne() {
    // this.game = new TrashGame(this.canvas) 
    // const piece = new TrashPiece({x: Math.random()*100, y: Math.random() * 100},{x:2,y:2}, {x:0,y:0},{x:0, y: 0})
    // piece.applyForce({x: 0, y:0.5})
    // this.game.addElement(piece)
    // this.game.render()
  }
 
  initialize() {
    const trashes = [
      new StandDynamicResource(10,C1,"YOU!!WRONG!!","blablabla"),
      new StandDynamicResource(20,C2,"YOU!!WRONG!!","blablabla"),
      new StandDynamicResource(30,C3,"YOU!!WRONG!!","blablabla"),
      new StandDynamicResource(40,C4,"YOU!!WRONG!!","blablabla"),
      new StandDynamicResource(10,C5,"YOU!!WRONG!!","blablabla"),
      new StandDynamicResource(20,C6,"YOU!!WRONG!!","blablabla"),
      new StandDynamicResource(30,C7,"YOU!!WRONG!!","blablabla"),
      new StandDynamicResource(40,C8,"YOU!!WRONG!!","blablabla")
    ]
    const scene = new RoundRobinGameScene(trashes,trashes.length - 1,this.audio)
    scene.initialize(this.canvas)
  }

  render() {

    return (
      <div className="real-game-root" style={{width: "100vw",height: "100vh", overflow: "hidden",position:"fixed"}}>
        <div className="canvas-wrapper">
          <canvas ref={(ref)=> this.canvas = ref}>
            您的浏览器不支持canvas
          </canvas>
        </div>
        <audio autoPlay={true} src={gb_song} style={{display:"none"}} ref={(ref)=>this.audio = ref}/>
      </div>
    )
  }
}


export default RealGame