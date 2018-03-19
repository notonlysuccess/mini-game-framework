import config from 'config'
import timeFunctions from './timeFunctions'

export default class Sprite extends Laya.Sprite {
  _sameKeyLength = 5
  _baseArgs = [{
    key: 'x',
    value: 0,
  }, {
    key: 'y',
    value: 0
  }, {
    key: 'width',
    value: config.SCREEN_WIDTH,
    draw: true,
  }, {
    key: 'height',
    value: config.SCREEN_HEIGHT,
    draw: true
  }, {
    key: 'alpha',
    value: 1,
    draw: true
  }]

  _args = []
  _animations = []
  _animationHandlers = []
  _delayHandlers = []

  constructor() {
    super()
    if (arguments.length) {
      this._setArguments(arguments)
    }
  }

  destroy() {
    super.destroy()
    this._clear()
  }

  _clear() {
    this.stopAnimation()
  }

  _getArguments(args, needDefault = true) {
    const res = {}
    if (args.length === 1) {
      this._args.forEach(({key, value}) => {
        if (args[0][key] !== undefined) {
          res[key] = args[0][key]
        } else if (needDefault) {
          res[key] = value
        }
      })
    } else if (args.length === 2) {
      const combinedArgs = {}
      for (const key in args[0]) {
        combinedArgs[key] = args[0][key]
      }
      for (const key in args[1][key]) {
        combinedArgs[key] = args[1][key]
      }

      this._args.forEach(({key, value}) => {
        if (combinedArgs[key] !== undefined) {
          res[key] = combinedArgs[key]
        } else if (needDefault) {
          res[key] = value
        }
      })
    } else {
      for (let i = 0; i < this._args.length; i++) {
        const {key, value} = this._args[i]
        if (args[i] !== undefined) {
          res[key] = args[i]
        } else if (needDefault) {
          res[key] = value
        }
      }
    }
    return res
  }

  _setArguments(args) {
    if (args.length === 1 && args[0].constructor.name === 'Scale') {
      this._scale = args[0]
    }
    this._args.splice(0, 0, ...this._baseArgs)

    const res = this._getArguments(args, true)
    for (let i = 0; i < this._args.length; i++) {
      const originKey = this._args[i].key
      const key = (i < this._sameKeyLength ? '' : '_') + originKey

      if (res[originKey] !== undefined) {
        this[key] = res[originKey]
      }
    }
  }

  updateFatherSize(width, height) {
    if (this._scale) {
      this.update(this._scale.update(width, height))
    }
  }

  update() {
    const res = this._getArguments(arguments, false)

    let needReDraw = false
    let sizeChanged = false

    for (let i = 0; i < this._args.length; i++) {
      const originKey = this._args[i].key
      const key = (i < this._sameKeyLength ? '' : '_') + originKey

      if (res[originKey] !== undefined && res[originKey] !== this[key]) {
        if (key === 'width' || key === 'height') {
          sizeChanged = true
        }
        this[key] = res[originKey]
        needReDraw = needReDraw || this._args[i].draw
      }
    }

    if (sizeChanged) {
      this._childs.forEach(child => {
        child.updateFatherSize && child.updateFatherSize(this.width, this.height)
      })
    }

    needReDraw && this.draw()
  }

  /**
   * {
   *   keyFrames: [{
   *     $ precent: 0 - 1(small to big) (if keyFrames more then 2, precent is required, and timeFunction will be disabled)
   *     x(float):
   *     y(float):
   *     width(float):
   *     height(float):
   *     alpha(float): 0 - 1
   *     $ rotate(float): 0 - 2 * Math.PI
   *     $ scale(ratio|{ratioX, ratioY}): (if has scale, disable width and height)
   *     $ scalePivot({x, y}|string) = 'center':
   *       values: left, right, top, bottom, leftTop, leftBottom, rightTop, rightBottom))
   *   }],
   *   changedValue(keyFrame): (if has changedValue, then disable keyFrames)
   *   duration(integer) = 1000: the length of time that the animation should take to complete one loop
   *   delay(integer) = 0: specifies when the animation should start
   *   timeFunction(string|function(p)) = 'linear: ('ease', 'ease-in', 'ease-out', 'ease-in-out'): specifies how the animation should profress over the duration of each loop
   *      values: 
   *   $ fillMode(string) = 'forwards': specifies how the animation should apply styles to its target before and after its execution
   *      value: 'backwords', 'forwards', 'both'
   *   $ direction(string) = 'normal': specifies whether an animation should play forwads, backwards, or alternating back and forth.
   *      value: 'alternate', 'reverse', 'alternate-reverse'
   *   $ iterationCount(integer|'infinite') = 1: specifies the number of times an animation loop should be played before stopping.
   *
   *   $ meaning not implemented
   * }
   */
  addAnimation(options) {
    const {
      keyFrames,
      changedValue,
      delay = 0,
      duration = 1000,
      timeFunction = 'linear',
      iterationCount = 1,
      fillMode = 'forwards',
      direction = 'normal',
    } = options

    const startFrame = {}
    const diff = {}
    if (changedValue) {
      for (const key in changedValue) {
        if (this[key]) {
          startFrame[key] = this[key]
          diff[key] = changedValue[key]
        }
      }
    } else {
      if (keyFrames.length === 1) {
        for (const key in keyFrames[0]) {
          if (this[key]) {
            startFrame[key] = this[key]
            diff[key] = keyFrames[0][key] - this[key]
          }
        }
      } else if (keyFrames.length === 2) {
        for (const key in keyFrames[0]) {
          if (keyFrames[1][key]) {
            startFrame[key] = keyFrames[0][key]
            diff[key] = keyFrames[1][key] - keyFrames[0][key]
          }
        }
      }
    }
    this._animations.push({
      startFrame,
      diff,
      delay,
      duration,
      timeFunction: typeof timeFunction === 'function' ? timeFunction : timeFunctions[timeFunction],
      iterationCount,
      fillMode,
      direction
    })
  }

  stopAnimation() {
    this._delayHandlers.forEach(handler => clearTimeout(handler))
    this._animationHandlers.forEach(handler => clearInterval(handler))
    this._delayHandlers = []
    this._animationHandlers = []
  }

  clearAnimation() {
    this.stopAnimation()
    this._animations = []
  }

  startAnimation() {
    this.stopAnimation()
    this._animations.forEach(animation => {
      if (animation.delay) {
        this._delayHandlers.push(setTimeout(() => {
          const startTime = Date.now()
          const animationHandler = setInterval(() => {
            this._animationLoop(animation, startTime, animationHandler)
          }, 16)
          this._animationHandlers.push(animationHandler)
        }, animation.delay))
      } else {
        const startTime = Date.now()
        const animationHandler = setInterval(() => {
          this._animationLoop(animation, startTime, animationHandler)
        }, 16)
      }
    })
  }

  _animationLoop(options, startTime, handler) {
    const {startFrame, diff, duration, timeFunction} = options
    const now = Math.min(Date.now(), startTime + duration)
    const p = timeFunction((now - startTime) / duration)
    const currentFrame = {}
    for (const key in startFrame) {
      currentFrame[key] = startFrame[key] + p * diff[key]
    }
    this.update(currentFrame)

    if (now >= startTime + duration) {
      clearInterval(handler)
    }
  }
}
