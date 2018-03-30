import Panel from './panel'
import {
  Rect,
  Circle,
  Texture
} from 'sprite'
import Scale from 'utils/scale'

export default class RankPanel extends Panel {
  constructor() {
    super()
    this._drawPanel()
  }

  _drawPanel() {
    setTimeout(() => {
      const sharedCanvas = wx.getOpenDataContext().canvas
      // const texture = new Laya.Texture(Laya.Browser.window.sharedCanvas)
      const texture = new Laya.Texture(sharedCanvas)
      texture.bitmap.alwaysChange = true
    }, 3000)
  }
}
