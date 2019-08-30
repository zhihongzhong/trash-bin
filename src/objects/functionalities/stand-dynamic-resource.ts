import DynamicResource from '../interfaces/dynamic-resource'


class StandDynamicResource implements DynamicResource {
  id: number; 
  imageStr: string;
  tipTitle: string;
  content: string;

  constructor(id:number, imageStr:string, tipTitile:string, content:string) {
    this.id = id
    this.imageStr = imageStr
    this.tipTitle = tipTitile
    this.content = content
  }
}

export default StandDynamicResource