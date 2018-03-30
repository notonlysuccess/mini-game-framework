import config from 'config'
import timeFunctions from './timeFunctions'

let cnt= 0
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
  }, {
    key: 'zOrder',
    value: 0
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

  clearChildren() {
    this._childs.forEach(child => {
      child.destroy()
    })
  }

  destroy() {
    super.destroy()
    this._clear()
    this._destroied = true
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
      for (const key in args[1]) {
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
    if (args.length <= 2 && args[0]._isScale) {
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
      // this._scale.update(width, height)
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

    if (sizeChanged && this._childs) {
      this._childs.forEach(child => {
        child.updateFatherSize && child.updateFatherSize(this.width, this.height)
      })
    }

    if (needReDraw) {
      this.draw()
      // console.log(cnt++)
    }
  }

  draw() {}

  /**
   * {
   *   keyFrames: [{
   *     $ precent: 0 - 1(small to big) (if keyFrames more then 2, precent is required, and timeFunction will be disabled)
   *     x(float):
   *     y(float):
   *     width(float):
   *     height(float):
   *     alpha(float): 0 - 1
   *     scale(ratio|{ratioX, ratioY}): (if has scale, disable width and height)
   *     $ rotate(float): 0 - 2 * Math.PI
   *     $ scalePivot({x, y}|string) = 'center':
   *       values: left, right, top, bottom, leftTop, leftBottom, rightTop, rightBottom))
   *   }],
   *   changedValue(keyFrame): (if has changedValue, then disable keyFrames)
   *   duration(integer) = 1000: the length of time that the animation should take to complete one loop
   *   delay(integer) = 0: specifies when the animation should start
   *   timeFunction(string|function(p)) = 'linear: specifies how the animation should profress over the duration of each loop
   *      values: see timeFunctions.js
   *   beforeAnimation(function()) = () => {}: the callback will be call when animation start to play, after first frame
   *   afterAnimation(function()) = () => {}: the callback will be call when animation finished
   *   fillMode(string) = 'forwards': specifies how the animation should apply styles to its target before and after its execution
   *      value: 'backwords', 'forwards', 'keep'
   *   $ selectable(boolean) = false: the sprite can be selected duration the animation
   *   $ direction(string) = 'normal': specifies whether an animation should play forwads, backwards, or alternating back and forth.
   *      value: 'alternate', 'reverse', 'alternate-reverse'
   *   $ iterationCount(integer|'infinite') = 1: specifies the number of times an animation loop should be played before stopping.
   *
   *   $ meaning not implemented
   * }
   */
  addAnimation(options) {
    if (this._destroied) {
      return
    }
    const {
      keyFrames,
      changedValue,
      beforeAnimation = () => {},
      afterAnimation = () => {},
      eachFrame = () => {},
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
        if (this[key] !== undefined) {
          startFrame[key] = this[key]
          diff[key] = changedValue[key]
        }
      }
      if (changedValue.scale !== undefined) {
        // TODO changedValue.scale is array
        startFrame.width = this.width
        startFrame.height = this.height
        startFrame.x = this.x
        startFrame.y = this.y
        diff.x = -changedValue.scale * this.width / 2
        diff.y = -changedValue.scale * this.height / 2
        diff.width = this.width * changedValue.scale
        diff.height = this.height * changedValue.scale
      }
      if (changedValue.fillStyle) {
        if (changedValue.fillStyle[0] === '#') {
          startFrame.fillStyle = [this._fillStyle.slice(1, 3), this._fillStyle.slice(3, 5), this._fillStyle.slice(5, 7)].map(n => parseInt(n, 16))
          const dist = [changedValue.fillStyle.slice(1, 3), changedValue.fillStyle.slice(3, 5), changedValue.fillStyle.slice(5, 7)].map(n => parseInt(n, 16))
          diff.fillStyle = startFrame.fillStyle.map((n, index) => dist[index] - n)
        }
      }
    } else {
      if (keyFrames.length === 1) {
        for (const key in keyFrames[0]) {
          if (this[key] !== undefined) {
            startFrame[key] = this[key]
            diff[key] = keyFrames[0][key] - this[key]
          }
        }
        if (keyFrames[0].scale !== undefined) {
          startFrame.width = this.width
          startFrame.height = this.height
          startFrame.x = this.x
          startFrame.y = this.y
          diff.x = (1 - keyFrames[0].scale) * this.width / 2
          diff.y = (1 - keyFrames[0].scale) * this.height / 2
          diff.width = this.width * (keyFrames[0].scale - 1)
          diff.height = this.height * (keyFrames[0].scale - 1)
        }
      } else if (keyFrames.length === 2) {
        for (const key in keyFrames[0]) {
          if (keyFrames[1][key] !== undefined) {
            startFrame[key] = keyFrames[0][key]
            diff[key] = keyFrames[1][key] - keyFrames[0][key]
          }
        }
        if (keyFrames[0].scale !== undefined || keyFrames[1].scale !== undefined) {
          const scale0 = keyFrames[0].scale
          const scale1 = keyFrames[1].scale
          startFrame.width = this.width * scale0
          startFrame.height = this.height * scale0
          startFrame.x = this.x + (1 - scale0) * this.width / 2
          startFrame.y = this.y + (1 - scale0) * this.height / 2
          diff.x = (scale0 - scale1) * this.width / 2
          diff.y = (scale0 - scale1) * this.height / 2
          diff.width = this.width * (scale1 - scale0)
          diff.height = this.height * (scale1 - scale0)
        }
      }
    }
    this._animations.push({
      startFrame,
      diff,
      beforeAnimation,
      afterAnimation,
      eachFrame,
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
    this._animations.forEach(animation => {
      if (animation.fillMode === 'backwards') {
        this.update(animation.startFrame)
      } else if (animation.fillMode === 'forwards'){
        const endFrame = {}
        const p = animation.timeFunction(1)
        for (const key in animation.startFrame) {
          endFrame[key] = animation.startFrame[key] + p * animation.diff[key]
        }
        this.update(endFrame)
      }
    })
    this._animations = []
  }

  playAnimation() {
    if (this._destroied) {
      return
    }
    this.stopAnimation()
    this._animations.forEach(animation => {
      if (animation.delay) {
        this._delayHandlers.push(setTimeout(() => {
          this._startLoop(animation)
        }, animation.delay))
      } else {
        this._startLoop(animation)
      }
    })
  }

  playOnce(animation) {
    if (this._destroied) {
      return
    }
    if (animation.afterAnimation) {
      const temp = afterAnimation
      animation.afterAnimation = () => {
        this.clearAnimation()
        temp()
      }
    }
    this.addAnimation(animation)
    this.playAnimation()
  }

  _startLoop(animation) {
    const startTime = Date.now()
    let first = true
    const animationHandler = setInterval(() => {
      if (first) {
        first = false
        animation.beforeAnimation()
      }
      this._animationLoop(animation, startTime, animationHandler)
    }, 16)
    this._animationHandlers.push(animationHandler)
  }

  _animationLoop(animation, startTime, handler) {
    if (this._destroied) {
      console.log('destroied')
      return
    }
    const {fillMode, startFrame, diff, duration, timeFunction} = animation
    let isFinished = false
    let now = Date.now()
    if (now >= startTime + duration) {
      isFinished = true
      if (fillMode === 'backwards') {
        now = startTime
      }
    }
    const p = isFinished ? 1 : timeFunction((now - startTime) / duration)
    const currentFrame = {}
    for (const key in startFrame) {
      if (key === 'scale') {
        continue
      } else if (key === 'fillStyle') {
        // if (key[0] === '#') {
          currentFrame.fillStyle = diff.fillStyle.reduce((result, n, index) => {
            return result + (parseInt(n * p) + startFrame.fillStyle[index]).toString(16)
          }, '#')
        // } else {
          // currentFrame[key] =
        // }
        continue
      }
      currentFrame[key] = startFrame[key] + p * diff[key]
    }
    this.update(currentFrame)

    if (animation.eachFrame) {
      animation.eachFrame(p)
    }

    if (isFinished) {
      animation.afterAnimation()
      clearInterval(handler)
    }
  }
}
