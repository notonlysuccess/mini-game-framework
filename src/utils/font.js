import FONT from 'config/font'
const DEFAULT_FONT = 'Helvetica'

const USUALLY_FONT = [12, 14, 16, 18, 20, 24, 28, 30, 32, 36, 38, 42, 48, 54, 60, 66, 72, 80, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 204, 216]

export default class Font {
  static _fonts = {}

  static getFont(name) {
    if (!wx.loadFont) {
      return DEFAULT_FONT
    }
    if (this._fonts[name] === undefined) {
      if (FONT[name]) {
        this._fonts[name] = wx.loadFont(FONT[name])
        if (!this._fonts[name]) {
          this._fonts[name] = DEFAULT_FONT
        }
      } else {
        this._fonts[name] = DEFAULT_FONT
      }
    }
    return this._fonts[name]
  }

  static scaleFont(font) {
    let lo = 0
    let hi = USUALLY_FONT.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (USUALLY_FONT[mid] < font) {
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }
    return USUALLY_FONT[hi]
  }

  static getFontSize() {
    return USUALLY_FONT
  }
}
