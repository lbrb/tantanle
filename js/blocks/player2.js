/**
 * 326 6 35 21
 */

import Sprite from './../base/sprite.js'

const IMG_SRC = 'images/Common.png'
const OFF_X = 326
const OFF_Y = 6
const OFF_WIDTH = 38
const OFF_HEIGHT = 23

const WIDTH = 70
const HEIGHT = 21

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const wallWidth = 8

export default class Player2 extends Sprite {

  constructor() {
    super(IMG_SRC, WIDTH, HEIGHT, screenWidth / 2 - WIDTH / 2, screenHeight - HEIGHT - 8)

    // 初始化事件监听
    this.initEvent()
  }

  render(ctx) {
    if (!this.visible)
      return

    ctx.drawImage(
      this.img,
      OFF_X,
      OFF_Y,
      OFF_WIDTH,
      OFF_HEIGHT,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30
    // console.log("this.x:" + this.x + ", this.y:" + this.y + ", this.width:" + this.width + ", this.height:" + this.height)

    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + this.width + deviation
      && y <= this.y + this.height + deviation)
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    // let disY = y - this.height / 2

    if (disX < 0)
      disX = 0

    else if (disX > screenWidth - this.width)
      disX = screenWidth - this.width

    // if (disY <= 0)
    //   disY = 0

    // else if (disY > screenHeight - this.height)
    //   disY = screenHeight - this.height

    this.x = disX
    // this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      console.log("x:"+x+", y:"+y)
      if (this.checkIsFingerOnAir(x, y)) {
        // console.log("this.touched = true")
        this.touched = true

        this.setAirPosAcrossFingerPosZ(x, y)
      }

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      if (this.touched)
        this.setAirPosAcrossFingerPosZ(x, y)

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }).bind(this))
  }

  changeBySweet(sweet) {
    let sweetType = sweet.sweetType
    if (sweetType == 1) {//变长
      this.width *=2
      if(this.width>screenWidth){
        this.width = screenWidth
      }
    } else if (sweetType == 2) {} { //变短
      this.width /= 2
      if (this.width < 10) {
        this.width = 10
      }
    }
  }
}