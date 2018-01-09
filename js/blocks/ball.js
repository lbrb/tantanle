/**
 * 球类
 * 246 131 10 10
*/

import MovalbeSprite from './../base/movable_sprite.js'
import Player from './../blocks/player2.js'

const IMG_SRC = 'images/Common.png'
const BALL_X = 246
const BALL_Y = 131
const BALL_WIDTH = 11
const BALL_HEIGHT = 12

const BALL_X2 = 201
const BALL_Y2 = 131
const BALL_WIDTH2 = 11
const BALL_HEIGHT2 = 12

const PLAY_HEIGHT = 23

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class Ball extends MovalbeSprite {

  constructor() {
    super(IMG_SRC, BALL_WIDTH, BALL_HEIGHT)
    this.hasCollide = false
  }

  render(ctx) {
    if (!this.visible)
      return

    if (this.collideParams == 5){
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
    } else {
      ctx.drawImage(
        this.img,
        BALL_X2,
        BALL_Y2,
        BALL_WIDTH2,
        BALL_HEIGHT2,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }


  }

  init(sprite){
    this.x = sprite.x + sprite.width / 2
    this.y = sprite.y - 10
    this.angle = Math.random()*160 + 10 
    this.hasCollide = false
  }

  collide(sprite) {
    super.collide(sprite)
    if (sprite.constructor == Player){
      if (this.hasCollide){
        this.collideParams = 5
        this.hasCollide = false
      } else{
        this.hasCollide = true
      }
    }
  }

  toString(){
    return "[ball] "+"x:"+this.x+" y:"+this.y
  }
}