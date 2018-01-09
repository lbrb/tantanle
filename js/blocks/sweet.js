/**
* sweet 糖果
* type
* 1=>变长
* 2=>变短
* 3=>小球变多
* 4=>小球变猛
* 5=>小球变快
* 6=>小球变慢
* 7=>小球变火
*/

import MovableSprite from './../base/movable_sprite.js'

const IMG_SRC = 'images/Common.png'
const X = 9
const Y = 168
const WIDTH = 11
const HEIGHT = 12

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class Sweet extends MovableSprite {

  constructor() {
    super(IMG_SRC, WIDTH, HEIGHT, 0, 0)
    this.speed = 2
    this.sweetType = 1
  }

  init(sprite) {
    this.visible = true
    this.sweetType = 3
    this.speed = Math.random() * 3 + 2
    this.x = sprite.x + sprite.width / 2
    this.y = sprite.y + sprite.height + 10
    this.angle = Math.random() * 180 + 180
  }

  render(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      this.img,
      X,
      Y,
      WIDTH,
      HEIGHT,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  toString() {
    return "[sweet] " + "x:" + this.x + " y:" + this.y
  }
}