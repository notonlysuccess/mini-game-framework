import {
  BackgroundSystem
} from 'ECS'
import {
  emitter
} from 'utils'
import Event from 'config/event'

export default class GameLoopSystem extends BackgroundSystem {
  static start() {
    this._loop = this._loop.bind(this)
    emitter.on(Event.GAME_LOOP, this._loop)
  }

  static stop() {
    emitter.off(Event.GAME_LOOP, this._loop)
  }

  static _loop(dt, now) {
    this._world.update(dt, now)
  }
}
