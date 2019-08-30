
import GameScene from './interfaces/game-scene'

import img_t1 from '../../assts/t1.png'
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

import img_prompt from '../../assets/prompt.png'
import img_prompt2 from '../../assets/prompt.jpg'

import img_gongyi from '../../assets/gongyi.png'
import img_story from '../../assets/story.png'

import img_C2 from '../../assets/C2.1.png'

import img_p1 from '../../assets/p1.png'
import img_p2 from '../../assets/p2.png'
import img_p3 from '../../assets/p3.png'
import img_p4 from '../../assets/p4.png'

import img_wrong from '../../assets/wrongbg.jpg'

import img_coin from '../../assets/coin.png'
import TrashGame from './trash-game'
import HarmfulTrashBin from './harmful-trash-bin';
import Point from './point';
import MusicWidget from './music-widget';
import TipWidget from './tip-widget';
import MarkWidget from './mark-widget';
import Background from './background';
import ClassifiedTrash from './classified-trash';


class RoundRobinGameScene implements GameScene {

  game:TrashGame

  initialize(canvas: HTMLCanvasElement): void {
    this.game = new TrashGame(canvas)

    this.initializeScene()
  }  

  // load static resource 
  private initializeScene():void {
    const t1 = new HarmfulTrashBin(10,[img_t1,img_t1_1],
      new Point(2, 78),new Point(20, 20),img_p1)

    const t2 = new HarmfulTrashBin(20,[img_t2, img_t2_1],
      new Point(28, 78),new Point(20,20),img_p2)

    const t3 = new HarmfulTrashBin(30,[img_t3, img_t3_1],
      new Point(53,78),new Point(20, 20)
    ,img_p3)

    const t4 = new HarmfulTrashBin(40,[img_t4, img_t4_1],
      new Point(77, 78),new Point(20, 20)
    ,img_p4)

    const musicWidget = new MusicWidget(new Point(85,5),new Point(15,5),img_sndon,img_sndoff)
    const tipWidget = new TipWidget(new Point(85,12),new Point(15,5),img_prompt,img_prompt2)
    const storyWidget = new TipWidget(new Point(85,20), new Point(15,5),img_gongyi,img_story)
    const markWidget = new MarkWidget(new Point(4,4),new Point(22,5),img_coin, 0)

    const bg1 = new Background(new Point(0,  0),new Point(100, 100),img_bg)
    const bg2 = new Background(new Point(0,  70),new Point(100,30),img_bot)
    //const trash = new ClassifiedTrash(10, new Point(40,30),new Point(35, 20),img_C2, img_wrong)
  
  }

  private loadDynamicScene():void {

  }

  
  start(): void {
    
  }

  destory(): void {
    
  }

  
}