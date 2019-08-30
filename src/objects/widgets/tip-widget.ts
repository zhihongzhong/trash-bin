import AbstractWidget from '../abstracts/abstract-widget'
import Point from '../functionalities/point'

class TipWidget extends AbstractWidget {

  clickImage:HTMLImageElement

  constructor(location: Point, outline: Point, imgSrc:string,clickImgSrc:string){
    super(location,outline,imgSrc)
    
    this.clickImage = new Image()
    this.clickImage.src = clickImgSrc
  }

  onClick(e: TouchEvent): void {
    this.showModel(90,90,this.clickImage)
  }
}

export default TipWidget