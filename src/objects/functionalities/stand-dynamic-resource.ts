import DynamicResource from '../interfaces/dynamic-resource'


class StandDynamicResource implements DynamicResource {
  id: number; 
  imageStr: string;
  tipTitle: string;
  content: string;
  correct:boolean
  constructor(id:number, imageStr:string, tipTitile:string, content:string) {
    this.id = id
    this.imageStr = imageStr
    this.tipTitle = tipTitile
    this.content = content
    this.correct = false
  }

  setResult(result:boolean):void {
    this.correct = result
  }

  getResult():boolean {
    return this.correct
  }
}

export default StandDynamicResource