/**
 * MovableSprite
 *
 */
import Sprite from './../base/sprite.js'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class MovableSprite extends Sprite{
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    super(imgSrc, width, height, x, y)
    this.angle = 90
    this.speed = 3
  }

  update() {
    let hudu = (2 * Math.PI / 360) * this.angle

    if (this.x >= 0 && this.x <= screenWidth) {
      this.x = this.x + Math.cos(hudu) * this.speed
    }

    if (this.y >= 0 && this.y <= screenHeight) {
      this.y = this.y - Math.sin(hudu) * this.speed
    }
  } 

  collide(sprite) {
    if (this.collideParams > sprite.collideParams){
      return 
    }
    let ball_x = this.x + this.width / 2
    let ball_y = this.y + this.height / 2
    let sprite_up = sprite.y
    let sprite_down = sprite.y + sprite.height
    let sprite_left = sprite.x
    let sprite_right = sprite.x + sprite.width

    let offUp = Math.abs(ball_y - sprite_up)
    let offDown = Math.abs(ball_y - sprite_down)
    let offLeft = Math.abs(ball_x - sprite_left)
    let offRight = Math.abs(ball_x - sprite_right)

    let minOff = Math.min(offUp, offDown, offLeft, offRight)

    // console.log("ball_x:" + ball_x + ", ball_y:" + ball_y + ", sprite_up:" + sprite_up + ", sprite_down:" + sprite_down + ", sprite_left:" + sprite_left + ", sprite_right:" + sprite_right)
    // console.log("minOff:" + minOff + ", offUp:" + offUp + ", offDown:" + offDown + ", offLeft:" + offLeft + ", offRight:" + offRight)

    if (offUp == minOff) {
      this.angle = 360 - this.angle
      return
    }

    if (offDown == minOff) {
      this.angle = 360 - this.angle
      return
    }

    if (offLeft == minOff) {
      this.angle = 180 - this.angle
      return
    }

    if (offRight == minOff) {
      this.angle = 180 - this.angle
      return
    }
  }  
} 