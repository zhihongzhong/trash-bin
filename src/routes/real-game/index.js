import React, { Component } from 'react'
import RoundRobinGameScene from '../../objects/round-robin-game-scene';
import StandDynamicResource from '../../objects/functionalities/stand-dynamic-resource';

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
    this.game = null
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
    // this.game = new TrashGame(this.canvas)
    
    // const t1 = new HarmfulTrashBin(10,[img_t1,img_t1_1],
    //   {x: 2, y: 78},{x: 20, y: 20
    // },img_p1)

    // const t2 = new HarmfulTrashBin(20,[img_t2, img_t2_1],
    //   {x: 28,y: 78},{x: 20,y: 20
    // },img_p2)

    // const t3 = new HarmfulTrashBin(30,[img_t3, img_t3_1],
    //   {x: 53,y: 78},{x: 20,y: 20
    // },img_p3)

    // const t4 = new HarmfulTrashBin(40,[img_t4, img_t4_1],
    //   {x: 77,y: 78},{x: 20,y: 20
    // },img_p4)

    
    // const musicWidget = new MusicWidget(new Point(85,5),new Point(15,5),img_sndon,img_sndoff)
    // const tipWidget = new TipWidget(new Point(85,12),new Point(15,5),img_prompt,img_prompt2)
    // const storyWidget = new TipWidget(new Point(85,20), new Point(15,5),img_gongyi,img_story)
    // const markWidget = new MarkWidget(new Point(4,4),new Point(22,5),img_coin, mark)

    // const roundWidget = new RoundWidget(10)

    // const bg1 = new Background({x:0, y: 0},{x:100,y: 100},img_bg)
    // const bg2 = new Background({x:0, y: 70},{x:100,y: 30},img_bot)
    // const trash = new ClassifiedTrash(10, new Point(40,30),new Point(35, 20),img_C2, img_wrong)
    // this.game.addBackground(bg1)
    // this.game.addBackground(bg2)

    // this.game.addElement(musicWidget)
    // this.game.addElement(tipWidget)
    // this.game.addElement(storyWidget)
    // this.game.addMarkObject(markWidget)
    // this.game.addRoundObject(roundWidget)
    
    // this.game.addTrash(trash)

    // this.game.addTrashBin(t1)
    // this.game.addTrashBin(t2)
    // this.game.addTrashBin(t3)
    // this.game.addTrashBin(t4)

    // this.game.render()
    const trashes = [
      new StandDynamicResource(10,C1,"YOU GOTTA PROBABLY WRONG","blablabla"),
      new StandDynamicResource(20,C2,"YOU GOTTA PROBABLY WRONG","blablabla"),
      new StandDynamicResource(30,C3,"YOU GOTTA PROBABLY WRONG","blablabla"),
      new StandDynamicResource(40,C4,"YOU GOTTA PROBABLY WRONG","blablabla"),
      new StandDynamicResource(10,C5,"YOU GOTTA PROBABLY WRONG","blablabla"),
      new StandDynamicResource(20,C6,"YOU GOTTA PROBABLY WRONG","blablabla"),
      new StandDynamicResource(30,C7,"YOU GOTTA PROBABLY WRONG","blablabla"),
      new StandDynamicResource(40,C8,"YOU GOTTA PROBABLY WRONG","blablabla")
    ]
    const scene = new RoundRobinGameScene(trashes,trashes.length - 1)
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
        <div className="pop" ref={(r)=> this.pop = r}>
        </div>
      </div>
    )
  }
}


export default RealGame