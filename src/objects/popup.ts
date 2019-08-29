


class Popup {

  private html: HTMLDivElement
  private popup:HTMLDivElement

  private title: HTMLDivElement
  private content: HTMLDivElement
  private onClose: Function;
  
  constructor(html: HTMLDivElement ,titleText:string, contentText:string, imgStr:string, classification:string, onClose: Function) {
    this.html = html
    this.onClose = onClose

    this.html.style.display = "none"

    this.title = document.createElement("div")
    this.title.style.width = "100%"
    this.title.style.height = "80px"
    
    this.flex(this.title, "row", "space-between")
    
    const _titleText:HTMLSpanElement = document.createElement("span")
    
    _titleText.innerHTML = titleText 
    _titleText.style.flexGrow = "1"
    this.flex(_titleText, "row")

    const _closeButton:HTMLSpanElement = document.createElement("span")
    _closeButton.innerHTML ="x"
    this.flex(_closeButton, "row")

    _closeButton.style.width = "20px"
    _closeButton.style.height ="20px"

    _closeButton.addEventListener("click", this.hide.bind(this))

    this.title.append(_titleText,_closeButton)


    this.content = document.createElement("div")
    this.flex(this.content, "column")

    const image = new Image() 
    image.src = imgStr
    image.width = 200 

    const _contentText:HTMLSpanElement = document.createElement("span")
    _contentText.innerHTML = contentText 

    const _classificationText:HTMLSpanElement = document.createElement("span")
    _classificationText.innerHTML = classification

    this.content.append(image, _classificationText, contentText)
    this.popup = document.createElement("div")
    this.popup.append(this.title, this.content)

    this.popup.style.width = "80%"
    this.popup.style.height = "400px"
    this.popup.style.backgroundColor = "white"
    this.popup.style.borderRadius = "20px"
    this.html.append(this.popup)
    this.popup.style.boxSizing = "border-box"
    this.popup.style.padding = "20px"
  }

  private flex(element: HTMLElement, direction: string, justify: string = "center") {
    element.style.display = "flex"
    element.style.flexDirection = direction
    element.style.justifyContent = "center"
    element.style.alignItems = "center"
  }

  show() {
    this.html.style.display="flex"
    
    this.html.style.justifyContent = "center"
    this.html.style.alignItems = "center"
    this.html.style.position ="fixed"
    this.html.style.left = "0"
    this.html.style.top = "0"
    this.html.style.width = "100vw"
    this.html.style.height = "100vh"
    this.html.style.backgroundColor = "rgba(0,0,0,0.5)"
    
  }

  hide() {
    this.onClose()
    this.html.style.display = "none"
  }
  
}

export default Popup