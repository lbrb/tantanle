/**
* 四周的墙
* 6 110 8 8
*/
import Sprite from './../base/sprite.js'

const IMG_SRC = 'images/Common.png'
const WALL_X = 6
const WALL_Y = 122
const WALL_WIDTH = 8
const WALL_HEIGHT = 8
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class Bg extends Sprite{
  constructor(type) {
    super(IMG_SRC)
    this.type = type
    this.init()
  }

  init() {
    if (this.type == "top") {
      this.x = 0
      this.y = 0
      this.width = screenWidth
      this.height = WALL_HEIGHT
    } else if (this.type == "left") {
      this.x = 0
      this.y = 0
      this.width = WALL_WIDTH
      this.height = screenHeight
    } else if (this.type = "right") {
      this.x = screenWidth - WALL_WIDTH
      this.y = 0
      this.width = WALL_WIDTH
      this.height = screenHeight
    }
  }

  render(ctx) {
    if (!this.visible)
      return

      ctx.drawImage(
      this.img,
      WALL_X,
      WALL_Y,
      WALL_WIDTH,
      WALL_HEIGHT,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}  