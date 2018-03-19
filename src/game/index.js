import {
  World
} from 'ECS'
import config from 'config'

import GameLoopSystem from 'backgroundSystems/gameLoopSystem'

export default class Game {
  static init(options) {
    this._world = new World()
    this._world.sprites = {}
    this._world
      // backgroundSystem
      .addBackgroundSystem(GameLoopSystem)
      // system
      // component

    this._world.start()
  }

  static destroy() {
    this._world.destroy()
  }
}
