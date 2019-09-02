export default interface DynamicResource {
  id:number
  imageStr:string
  tipTitle:string
  content: string
  correct:boolean

  setResult(result: boolean):void
  getResult():boolean
}