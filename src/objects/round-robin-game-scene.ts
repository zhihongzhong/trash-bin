
import GameScene from './interfaces/game-scene'

import * as img_t1 from '../assets/t1.png'
import * as  img_t1_1 from '../assets/t1_1.png'
import * as  img_t2 from '../assets/t2.png'
import * as  img_t2_1 from '../assets/t2_1.png'
import * as  img_t3 from '../assets/t3.png'
import * as  img_t3_1 from '../assets/t3_1.png'
import * as  img_t4 from '../assets/t4.png'
import * as  img_t4_1 from '../assets/t4_1.png'

import * as  img_bg from '../assets/bg.jpg'
import * as  img_bot from '../assets/bot.jpg'


import * as  img_sndon from '../assets/sndon.png'
import * as  img_sndoff from '../assets/sndoff.png'

import * as  img_prompt from '../assets/prompt.png'
import * as  img_prompt2 from '../assets/prompt.jpg'

import * as  img_gongyi from '../assets/gongyi.png'
import * as  img_story from '../assets/story.png'


import * as  img_p1 from '../assets/p1.png'
import * as  img_p2 from '../assets/p2.png'
import * as  img_p3 from '../assets/p3.png'
import * as  img_p4 from '../assets/p4.png'

import * as img_coin from '../assets/coin.png'
import * as img_crow from '../assets/crow.png'
import * as img_fillcolor from '../assets/fillcolor.png'

import TrashGame from './scenes/trash-game'
import HarmfulTrashBin from './elements/harmful-trash-bin';
import Point from './functionalities/point';
import MusicWidget from './widgets/music-widget';
import TipWidget from './widgets/tip-widget';
import MarkWidget from './widgets/mark-widget';
import Background from './backgrounds/background';
import ClassifiedTrash from './elements/classified-trash';
import RoundWidget from './widgets/round-widget';

import DynamicResource from './interfaces/dynamic-resource'
import StandDynamicResource from './functionalities/stand-dynamic-resource';
import GuideWidget from './widgets/guide-widget';
import CatchingTrachBin from './elements/catching-trash-bin';
import StartButtonWidget from './widgets/start-button-widget';
import SettlementWidget from './widgets/settlement-widget';

// this class is responsable for:
// LOADING RESOURCE 
// AND CONTROLLING GLOBAL LOGICS
// the thinking of game scene:
//
// initialize game scenes
// although this class is called suffix 'GameScene',
// and is has no any relation with game scene relatED 
 
// startMenu: a scene object of very beginning of the game 
// game: the main scene ob the game 
// there should be a end scene object to render the end of the game 
class RoundRobinGameScene implements GameScene {
  startMenu:TrashGame
  game:TrashGame
  settlement:TrashGame 

  trash:ClassifiedTrash
  dynamics: DynamicResource[]

  audio:HTMLAudioElement

  controller:number 
  round:number 
  mark:number 
  total:number 
  
  play:boolean;

  constructor( dynamics: DynamicResource[],total:number,audio:HTMLAudioElement) {
      this.dynamics = dynamics
      this.controller = 1
      this.total = total
      this.mark = 0
      this.round = 0
      this.audio = audio
      this.play = true
  } 

  initialize(canvas: HTMLCanvasElement): void {
    this.game = new TrashGame(canvas)
    this.startMenu = new TrashGame(canvas)
    this.settlement = new TrashGame(canvas)

    this.trash = null
    this.initializeScene()
    this.loadDynamicScene()
  }  

  controlPlay():void {
    
    if(this.play) {
      this.audio.pause()
      this.play = false
    }else {
      this.audio.play()
      this.play = true
    }
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

    // @caution: 
    // to fix the bug in IOS broswer that request not allowed, 
    // the music widget must be in front of ANY component besides the background 
    // cause backgrounds component is not in component stack but another 
    // and a background component doesn't receive ANY event 
    const musicWidget:MusicWidget = new MusicWidget(new Point(85,5),new Point(15,5),img_sndon,img_sndoff,this.controlPlay.bind(this))

    const tipWidget:TipWidget = new TipWidget(new Point(85,12),new Point(15,5),img_prompt,img_prompt2)
    const storyWidget:TipWidget = new TipWidget(new Point(85,20), new Point(15,5),img_gongyi,img_story)
    const markWidget:MarkWidget = new MarkWidget(new Point(4,4),new Point(22,5),img_coin, this.mark)
    const startButtonWidget:StartButtonWidget = new StartButtonWidget(new Point(40,70), new Point(20,3),img_fillcolor,this.nextScene.bind(this))
    
    // used for list results 
    const settlement:SettlementWidget = new SettlementWidget(new Point(0,0), new Point(60,60), this.dynamics)

    const bg1:Background = new Background(new Point(0,  0),new Point(100, 100),img_bg)
    const bg2:Background = new Background(new Point(0,  70),new Point(100,30),img_bot)
    
    const bg3:Background = new Background(new Point(0,0), new Point(100,100), img_bg)
    // background shows when game is over 
    const bg4:Background = new Background(new Point(0,  0),new Point(100, 100),img_bg)

    const roundWidget:RoundWidget = new RoundWidget(this.total,this.nextRound.bind(this),this.gameOver.bind(this))

    const guideWidget:GuideWidget = new GuideWidget(new Point(0,0), new Point(100,100))

    const catchingTrashBin:CatchingTrachBin = new CatchingTrachBin(new Point(40,40), new Point(20,20),img_crow)
    
    
    this.startMenu.addBackground(bg3)
    
    this.startMenu.addElement(musicWidget)
    this.startMenu.addTrashBin(catchingTrashBin)
    this.startMenu.addElement(startButtonWidget)
    
    this.game.addBackground(bg1)
    this.game.addBackground(bg2)
    
    this.game.addElement(musicWidget)
    this.game.addElement(tipWidget)
    this.game.addElement(storyWidget)
    this.game.addMarkObject(markWidget)
    this.game.addRoundObject(roundWidget)

    this.game.addTrashBin(t1)
    this.game.addTrashBin(t2)
    this.game.addTrashBin(t3)
    this.game.addTrashBin(t4)
    
    this.game.addElement(guideWidget)

    this.settlement.addBackground(bg4)
    this.settlement.addElement(musicWidget)
    this.settlement.addElement(settlement)
    
    this.startMenu.start()
  }


  // a image may be received 
  // dynamic load element 
  // before loading dynamic element 
  // the previous dynamic resource should be destroied 
  // or there will be two identical components in current scene 
  private destroyTrash() {
    this.game.destroyTrash(this.trash)
  }

  // the same as above
  private loadDynamicScene():void {
    const standardDynamicResource:StandDynamicResource = this.dynamics[this.round]
    this.trash = null 
    this.trash = new ClassifiedTrash(
      standardDynamicResource.id, 
      new Point(40,30), 
      new Point(35,20),
      standardDynamicResource
      )
    
      this.game.addTrash(this.trash)
  }

  private nextRound():void {
    this.round += 1
    this.mark = this.game.mark.getMark()
    this.destroyTrash()
    this.loadDynamicScene()
  }
  
  private gameOver():void {
    this.controller +=1 
    this.start()
  }
  
  // responsable for controlling to render the scene of the game
  nextScene():void {  
    this.controller += 1
    this.start()
  }

  start(): void {
    switch(this.controller) {
      default:
        break
        case 1:
          this.settlement.stop()
          this.game.stop()
          this.startMenu.start()
          break
        case 2:
          this.startMenu.stop()
          this.settlement.stop()
          this.game.start()
          break
        case 3:
          this.startMenu.stop()
          this.game.stop()
          this.settlement.start()
    }
  }

  // destroy all game resources, release memory 
  destory(): void {
    
  }

}

export default RoundRobinGameScene