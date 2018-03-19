import Panel from './panel'
import Scale from 'utils/scale'
import config from 'config'
import {
  Texture
} from 'sprite'

const WELCOME = new Scale({
  equalRatioScale: 'center',
  x: (config.BASE_SCREEN_WIDTH - 468) / 2,
  y: (config.BASE_SCREEN_HEIGHT - 200) / 2,
  width: 468,
  height: 200,
  texture: 'welcome'
})

export default class WelcomePanel extends Panel {
  constructor() {
    super()

    this.addChild(new Texture(WELCOME))
  }
}
