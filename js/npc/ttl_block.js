import Sprite from '../base/sprite'
import DataBus from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 60
const ENEMY_HEIGHT = 60

let databus = new DataBus()

export default class TtlBlock extends Sprite {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
  }

  init(x, y) {
    this.x = x
    this.y = y
  }
}
