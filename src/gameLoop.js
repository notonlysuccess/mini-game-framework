import emitter from 'utils/emitter'
import Event from 'config/event'

let s = Date.now()
let running = false
const loop = () => {
  if (running) {
    const t = Date.now()
    emitter.emit(Event.GAME_LOOP, t - s, t)
    s = t
    requestAnimationFrame(loop)
  }
}

export default class GameLoop {
  static start() {
    if (!running) {
      running = true
      loop()
    }
  }

  static stop() {
    running = false
  }
}
