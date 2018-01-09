/**
 * 球类
 * 246 131 10 10
*/

import MovalbeSprite from './../base/movable_sprite.js'

const IMG_SRC = 'images/Common.png'
const BALL_X = 246
const BALL_Y = 131
const BALL_WIDTH = 11
const BALL_HEIGHT = 12

const PLAY_HEIGHT = 23

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class Ball extends MovalbeSprite {

  constructor() {
    super(IMG_SRC, BALL_WIDTH, BALL_HEIGHT)
  }

  render(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      this.img,
      BALL_X,
      BALL_Y,
      BALL_WIDTH,
      BALL_HEIGHT,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  init(sprite){
    this.x = sprite.x + sprite.width / 2
    this.y = sprite.y - 10
    this.angle = Math.random()*160 + 10 
  }

  toString(){
    return "[ball] "+"x:"+this.x+" y:"+this.y
  }
}