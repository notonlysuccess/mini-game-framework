import Panel from './panel'
import {
  Rect,
  Circle,
  Sprite,
} from 'sprite'
import Loading from 'sprite/loading'
import Scale from 'utils/scale'
import config from 'config'
import {
  alphaColor
} from 'utils'

const LOADING = new Scale({
  x: config.BASE_SCREEN_WIDTH / 2 - 50,
  y: config.BASE_SCREEN_HEIGHT / 2 - 50,
  width: 100,
  height: 100,
})

export default class AnimationPanel extends Panel {
  constructor() {
    super()
    this._drawPanel()
  }

  _drawPanel() {
    const rect = new Loading(LOADING)
    this.addChild(rect)
  }
}
