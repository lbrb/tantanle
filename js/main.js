import Block from './blocks/block.js'
import BG from './blocks/backgroup.js'
import Player2 from './blocks/player2'
import Ball from './blocks/ball.js'
import Wall from './blocks/wall.js'
import DataBus from './databus.js'
import Pool from './blocks/pool.js'
import Sweet from './blocks/sweet.js'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let ctx = canvas.getContext('2d')
let databus = new DataBus()
let pool = new Pool()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.restart()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.gen()
  }

  gen() {
    let bg = new BG()
    databus.bg = bg

    let wall = new Wall("top")
    databus.walls.push(wall)

    wall = new Wall("left")
    databus.walls.push(wall)

    wall = new Wall("right")
    databus.walls.push(wall)

    let num = 54
    let block;
    for (let i = 0; i < num; i++) {
      block = new Block(i)
      databus.blocks.push(block)
    }

    let player = new Player2()
    databus.player = player

    let ball = pool.getItemByClass(Ball)
    ball.init(player)
    databus.balls.push(ball)

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }

  genSweet(sprite) {
    let sweet = pool.getItemByClass(Sweet)
    sweet.init(sprite)
    return sweet
  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this
    let i
    let j

    let ball
    if(databus.balls.length > 0) {
      for(i=0; i< databus.balls.length; i++) {
        ball = databus.balls[i]

        //ball VS block
        let block
        for (j = 0; j < databus.blocks.length; j++) {
          block = databus.blocks[j]
          if (block.isCollideWith(ball)) {
            console.log("ball VS block")
            ball.collide(block)
            block.collide(ball)
            let ran = Math.random()*10
            if(ran>5&&databus.sweets.length<20){
              databus.sweets.push(this.genSweet(block))
            }
            break
          }
        }

        //ball VS Player
        let player = databus.player
        if (player.isCollideWith(ball)) {
          console.log("ball VS Player")
          ball.collide(databus.player)
        }

        //ball VS Wall
        let wall
        for (j = 0; j < databus.walls.length; j++) {
          wall = databus.walls[j]
          if (wall.isCollideWith(ball)) {
            console.log("ball VS wall")
            ball.collide(wall)
            break
          }
        }
      }
    }

    let sweet
    if(databus.sweets.length > 0){
      for (i = 0; i < databus.sweets.length; i++) {
        sweet = databus.sweets[i]

        //sweet VS Wall 
        let wall
        for (j = 0; j < databus.walls.length; j++) {
          wall = databus.walls[j]
          if (wall.isCollideWith(sweet)) {
            console.log("sweet VS wall")
            sweet.collide(wall)
            break
          }
        }

        //sweet VS player
        if (databus.player.isCollideWith(sweet)) {
          console.log("sweet VS play")
          sweet.visible = false
          this.changeBySweet(sweet)

          pool.recover(Sweet, sweet)
          databus.sweets.splice(i, 1)
          
          break
        }
      }
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  renderAll() {
    //clear ctx
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //bg
    this.render(databus.bg)

    //wall
    this.render(databus.walls)

    //block
    this.render(databus.blocks)

    //player
    this.render(databus.player)

    //ball
    this.render(databus.balls)

    //sweet
    this.render(databus.sweets)
  }

  // 游戏逻辑更新主函数
  updateAll() {
    //sweet
    let sweet
    if (databus.sweets.length > 0) {
      for (let i = 0; i < databus.sweets.length; i++) {
        sweet = databus.sweets[i]
        sweet.update()

        //超出界面，回收
        if(sweet.y > screenHeight){
          console.log("off screenHeight recover sweet")
          sweet.visible = false 
          pool.recover(Sweet, sweet)
          databus.sweets.splice(i,1)
        }
      }
    }

    //ball
    let ball
    if (databus.balls.length > 0) {
      for (let i = 0; i < databus.balls.length; i++) {
        ball = databus.balls[i]
        ball.update()

        //超出界面，回收
        if (ball.y > screenHeight) {
          console.log("off screenHeight recover ball")
          ball.visible = false
          pool.recover(Ball, ball)
          databus.balls.splice(i, 1)
        }
      }
    }
    
    //碰撞检测
    this.collisionDetection()
  }

  update(obj){
    if(obj.constructor == Array){
        if(obj.length > 0){
          let sprite
          for(let i=0;i<obj.length;i++){
            sprite = obj[i]
            sprite.update()
          }
        }
    } else {
      obj.update()
    }
  }

  render(obj){
    if(obj.constructor == Array){
        if(obj.length > 0){
          let sprite
          for(let i=0;i<obj.length;i++){
            sprite = obj[i]
            sprite.render(ctx)
          }
        }
    } else {
      obj.render(ctx)
    }
  }


  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.updateAll()
    this.renderAll()

    if (databus.balls.length<1){
      console.log("game over")
      databus.gameOver = true
      console.log(databus.blocks.length)
      this.showFailure()
      return;
    }
    let that = this
    if (this.isSuccess()){
      console.log("success")
      this.showSuccess()
      return;
    }

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }

  /**
  * sweet 糖果
  * type
  * 0=>变长
  * 1=>变短
  * 2=>小球变多
  * 3=>小球变猛
  * 4=>小球变快
  * 5=>小球变慢
  * 6=>小球变火
  */
  changeBySweet(sweet) {
    let player = databus.player
    switch(sweet.sweetType){
      case 0:
        player.width *=2
        if(player.width>screenWidth){
          player.width = screenWidth
        }
        break
      case 1:
        player.width /= 2
        if (player.width < 10) {
          player.width = 10
        }
        break
      case 2:
        let ball
        let num = 2
        //界面上最多有20个ball
        if(databus.balls.length < 20){
          for (let i = 0; i < num; i++) {
            ball = pool.getItemByClass(Ball)
            ball.init(databus.player)
            databus.balls.push(ball)
          }
        }
        break
      case 3:

        break
      default:
    }
  }

  isSuccess(){
    let block
    for(let i = 0;i<databus.blocks.length;i++){
      block = databus.blocks[i]
      if (block.canDieOut()){
        return false
      }
    }
    return true
  }

  showSuccess(){
    wx.showModal({
      title: '闯关成功',
      content: 'true',
      success: function(){
        console.log("adfsdf")
      }
    })
  }

  showFailure(){

    wx.showModal({
      title: '闯关失败',
      content: 'true',
      success: function (res) {
        console.log("adfsdf")
      },
      fail: function(){
        console.log("adfsdf")
      },
      complete: function(){
        console.log("adfsdf")
      }
    })
  }
}
