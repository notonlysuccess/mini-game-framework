import config from 'config'

export default class Panel extends Laya.Sprite {
  constructor() {
    super()

    this.pos(0, 0)
    this.size(config.SCREEN_WIDTH, config.SCREEN_HEIGHT)
    this.zOrder = 99
    Laya.stage.addChild(this)
  }

  hide() {
    this.visible = false
  }

  show() {
    this.visible = true
  }

  _clear() {}

  _destroy() {
    this.destroy(true)
    this._clear()
  }
}
