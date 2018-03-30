import Sprite from './sprite'
import Text from './text'

export default class Textarea extends Sprite {
  _args = [{
    key: 'fontSize',
    value: 24,
    draw: true
  }, {
    key: 'color',
    value: '#FFFFFF'
  }, {
    key: 'texts',
    value: [],
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
    key: 'clip',
  }]

  constructor() {
    super()

    this._setArguments(arguments)

    this._textSps = []
    const height = this.height / this._texts.length
    let y = 0
    for (let i = 0; i < this._texts.length; i ++) {
      const textSp = new Text({
        x: 0,
        y,
        width: this.width,
        height: height,
        alpha: this.alpha,
        zOrder: this.zOrder,
        fontSize: this._fontSize,
        color: this._color,
        text: this._texts[i],
        font: this._font,
        align: this._align,
        valign: this._valign,
        bold: this._bold,
        clip: this._clip
      })
      y += height
      this.addChildren(textSp)
      this._textSps.push(textSp)
    }
  }
}
