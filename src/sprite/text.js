import config from 'config'
import {
  alphaColor
} from 'utils'

export default class Text extends Laya.Text {
  _sameKeyLength = 11
  _args = [{
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
    key: 'fontSize',
    value: 24,
    draw: true
  }, {
    key: 'color',
    value: '#FFFFFF'
  }, {
    key: 'text',
    value: 'placeholder',
    draw: true
  }, {
    key: 'font',
    value: 'Helvetica',
    draw: true,
  }, {
    key: 'align',
    value: 'center',
  }, {
    key: 'valign',
    value: 'middle',
  }, {
    key: 'bold',
    value: false
  }, {
    key: 'alpha',
  }, {
    key: 'scale',
    value: 0.8
  }, {
    key: 'clip',
  }]

  constructor() {
    super()

    this._setArguments(arguments)
    if (this._alpha) {
      this.color = alphaColor(this.color, this._alpha)
    }
    if (this._clip) {
      while (this.textWidth > this.width) {
        this.text = this.text.substr(0, this.text.length - 4) + '...'
      }
    }
    this.draw()
  }

  _getArguments(args, needDefaultValue = true) {
    const res = {}
    if (args.length === 1) {
      this._args.forEach(({key, value}) => {
        if (needDefaultValue && args[0][key] === undefined) {
          res[key] = value
        } else {
          res[key] = args[0][key]
        }
      })
    } else {
      for (let i = 0; i < this._args.length; i++) {
        const {key, value} = this._args[i]
        if (needDefaultValue && args[i] === undefined) {
          res[key] = value
        } else {
          res[key] = args[i]
        }
      }
    }
    return res
  }

  _setArguments(args) {
    const res = this._getArguments(args)
    for (let i = 0; i < this._args.length; i++) {
      const originKey = this._args[i].key
      const key = (i < this._sameKeyLength ? '' : '_') + originKey

      if (res[originKey] !== undefined) {
        this[key] = res[originKey]
      }
    }
  }

  update() {
    const res = this._getArguments(arguments, false)

    let needReDraw = false

    for (let i = 0; i < this._args.length; i++) {
      const originKey = this._args[i].key
      const key = (i < this._sameKeyLength ? '' : '_') + originKey

      if (res[originKey] !== undefined && res[originKey] !== this[key]) {
        this[key] = res[originKey]
        needReDraw = needReDraw || this._args[i].draw
      }
    }

    needReDraw && this.draw()
  }

  draw() {
    // this.fontSize = Math.max(this.fontSize, this.height * this._scale)
    // const scaleRate = (this.width * this._scale) / this.textWidth
    // if (scaleRate < 1) {
      // this.fontSize *= scaleRate
    // }
    // while (this.textWidth >= this.width * this._scale) {
      // this.fontSize = this.fontSize - 2
    // }
  }
}
