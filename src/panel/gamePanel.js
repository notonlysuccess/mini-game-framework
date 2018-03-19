import Panel from './panel'
import Game from 'game'

export default class GamePanel extends Panel {
  constructor() {
    super()

    Game.init()
  }
}
