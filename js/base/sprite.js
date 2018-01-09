/**
 * 游戏基础的精灵类
 * collideParams：碰撞参数，当小球碰到参数等于或大于他的时候，小球会反弹；
 *                        当小球碰到参数小于他的时候，小球会义无反顾的往前走；
 *                        默认：小球=5，糖果=5， 墙=10 ，一级砖=5， 二级砖=6，三级砖=7
 */
export default class Sprite {
  constructor(imgSrc = '', width=  0, height = 0, x = 0, y = 0) {
    this.img     = new Image()
    this.img.src = imgSrc

    this.width  = width
    this.height = height

    this.x = x
    this.y = y

    this.collideParams = 5

    this.visible = true
  }

  update(){

  }

  /**
   * 将精灵图绘制在canvas上
   */
  render(ctx) {
    if ( !this.visible )
      return

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    if ( !this.visible || !sp.visible )
      return false

    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    return !!(   spX >= this.x
              && spX <= this.x + this.width
              && spY >= this.y
              && spY <= this.y + this.height  )
  }
  /**
   * 碰撞逻辑的处理
   */
  collide(sprite){

  }

  toString(){
    return "[sprite], x:"+this.x+", y:"+this.y+", width:"+this.width+", height:"+this.height
  }
}
