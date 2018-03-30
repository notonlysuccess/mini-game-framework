import config from 'config'
import Font from 'utils/font'
import {
  alphaColor
} from 'utils'

export default class Text extends Laya.Text {
  _sameKeyLength = 11
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
    key: 'fontSize',
    value: 24,
    draw: true
  }, {
    key: 'color',
    value: '#FFFFFF'
  }, {
    key: 'text',
    value: '',
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
    key: 'clip',
  }]

  _args = []

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

    this.scale()
    this.draw()
  }

  scale() {
    const textWidth = this.textWidth
    const textHeight = this.textHeight
    if (textWidth > this.width) {
      this.fontSize = this.fontSize * this.width / textWidth
    }
    if (textHeight > this.height) {
      this.fontSize = this.fontSize * this.height / textHeight
    }

    this._fontRatio = this.fontSize / this.width
  }

  // Laya or mini-game has bug, when you change font frequently, wechat will crash
  get fontSize() {
    return super.fontSize
  }

  set fontSize(fontSize) {
    const scaledFontSize = Font.scaleFont(fontSize)
    if (this.fontSize !== scaledFontSize) {
      super.fontSize = scaledFontSize
    }
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

  updateFatherSize(width, height) {
    if (this._scale) {
      this.update(this._scale.update(width, height))
      // this._scale.update(width, height)
    }
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
    this.fontSize = this.width * this._fontRatio

    needReDraw && this.draw()
  }

  draw() {
    //this.fontSize = Math.max(this.fontSize, this.height * this._scale)
    //const scaleRate = (this.width * this._scale) / this.textWidth
    //if (scaleRate < 1) {
      //this.fontSize *= scaleRate
    //}
    //while (this.textWidth >= this.width * this._scale) {
      //this.fontSize = this.fontSize - 2
    //}
  }
}
