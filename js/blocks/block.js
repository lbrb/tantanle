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

  constructor(index = 0, level=1) {

    super(BLOCK_IMG_SRC)
    this.index = index;
    this.level = level;
    this.init()
  }

  init(){
    let ran = Math.random()*10
    ran = ran+this.level*0.5
    //黑砖
    if (ran > 9) {
      this.collideParams = 7
    } else if (ran > 6) {
      this.collideParams = 6
    } else {
      this.collideParams = 5
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
    if (this.collideParams ==7){
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
    } else if (this.collideParams == 6) {
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

  /**
   * 碰撞之后的处理
   * collideParams = 5 碰撞即可消灭
   * collideParams = 6 碰撞降级到5，下次在碰撞可消灭
   * collideParams = 7 碰撞不降级，只可被比7大的sprite消灭
   * 
   */
  collide(sprite){
    //是否显示 处理
    if (this.collideParams == sprite.collideParams) {
      this.visible = false
    } else if (this.collideParams <= sprite.collideParams) {
      this.visible = false
    }

    //碰撞参数相差大于1，可直接消灭
    if ((sprite.collideParams - this.collideParams) > 1 ){
      this.visible = false
    //碰撞参数相差1，方块降级
    } else if ((sprite.collideParams - this.collideParams) == 1) {
      this.collideParams--
    } else {
      
    }
  }

  canDieOut(){
    return this.visible && this.collideParams <=7
  }

  toString(){
    return "[block] x:" + this.x + ", y:" + this.y + "screenWidth:" + screenWidth + " screenHeight:" + screenHeight
  }
  
}