/**
 * player 163 7 35 21
 * 
 * block1 165 40 33 26 
 */
import Sprite  from './../base/sprite.js'

const BLOCK_IMG_SRC = 'images/Common.png'
const BLOCK_X2 = 165
const BLOCK_Y2 = 40
const BLOCK_WIDTH2 = 34
const BLOCK_HEIGHT2 = 27

const BLOCK_X = 294
const BLOCK_Y = 40
const BLOCK_WIDTH = 34
const BLOCK_HEIGHT = 27

const BLOCK_X3 = 326
const BLOCK_Y3 = 6
const BLOCK_WIDTH3 = 37
const BLOCK_HEIGHT3 = 23

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const maxNumPerLine = 9
const startX = 8

export default class Block extends Sprite {

  constructor(index = 0) {

    super(BLOCK_IMG_SRC)
    this.index = index;
    this.init()
  }

  init(){
    let ran = Math.random()
    //一行最多能放几个方块
    if (ran > 0.9) {
      this.type = 3
    } else if (ran > 0.8) {
      this.type = 2
    } else {
      this.type = 1
    }

    this.x = startX + (this.index % maxNumPerLine) * BLOCK_WIDTH
    this.y = startX + Math.floor(this.index / maxNumPerLine) * BLOCK_HEIGHT
    this.width = (screenWidth - startX * 2) / maxNumPerLine
    this.height = BLOCK_HEIGHT

    this.visible = true
  }

  render(ctx) {
    if (!this.visible)
      return
    if(this.type == 3){
      ctx.drawImage(
        this.img,
        BLOCK_X3,
        BLOCK_Y3,
        BLOCK_WIDTH3,
        BLOCK_HEIGHT3,
        this.x,
        this.y,
        BLOCK_WIDTH,
        BLOCK_HEIGHT
      )
    } else if(this.type == 2) {
      ctx.drawImage(
        this.img,
        BLOCK_X2,
        BLOCK_Y2,
        BLOCK_WIDTH2,
        BLOCK_HEIGHT2,
        this.x,
        this.y,
        BLOCK_WIDTH,
        BLOCK_HEIGHT
      )
    } else {
      ctx.drawImage(
        this.img,
        BLOCK_X,
        BLOCK_Y,
        BLOCK_WIDTH,
        BLOCK_HEIGHT,
        this.x,
        this.y,
        BLOCK_WIDTH,
        BLOCK_HEIGHT
      )
    }
    
  }
  //碰撞之后的处理
  collide(){
    if(this.type == 3){
      return
    } else if(this.type == 2) {
      this.type =1
    } else {
      this.visible = false
    }
  }

  toString(){
    return "[block] x:" + this.x + ", y:" + this.y + "screenWidth:" + screenWidth + " screenHeight:" + screenHeight
  }

}