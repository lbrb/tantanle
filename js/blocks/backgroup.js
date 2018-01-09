/**
* bg 20 33 78 50
*/
const IMG_SRC = 'images/Common.png'
const BG_X = 21
const BG_Y = 34
const BG_WIDTH = 78
const BG_HEIGHT = 50
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


export default class Bg {
  constructor() {
    this.img = new Image()
    this.img.src = IMG_SRC
    this.visible = true
  }

  render(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      this.img,
      BG_X,
      BG_Y,
      BG_WIDTH,
      BG_HEIGHT,
      0,
      0,
      screenWidth,
      screenHeight
    )
  }
}  