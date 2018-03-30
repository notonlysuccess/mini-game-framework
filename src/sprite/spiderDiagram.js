import Sprite from './sprite'
import Text from './text'

const COLOR = ['#00CA9D', '#FF7D29', '#0E66CE', '#FF2D55', '#854FE6', '#000000']
const POINT_RADIUS_RATE = 7.5 / 600
const BLOCK_COLOR = '#555555'
const LINE_WIDTH_RATE = 2 / 600
const BASE_SIZE = 600
const CIRCLE_RADIUS_RATE = 160 / 600
const LINE_LENGTH_RATE = 192 / 600
const TEXT_COLOR = '#666666'
const TEXT_FONT_RATE = 36 / 600
const TEXT_OFFSET_RATE = 20 / 600
const OPPONENT_COLOR = 'rgba(82, 158, 204, 0.9)'

export default class SpiderDiagram extends Sprite {
  constructor() {
    super()

    this._setArguments(arguments)
    this._first = true
  }
  
  /**
   * stat: {
   *   data: [{
   *     value:,
   *     title
   *   }],
   *   upperLimit: 
   *   opponent: [{
   *     value:,
   *     title
   *   }],
   * }
   */
  setStat(stat) {
    this._stat = stat
    this.draw()
  }

  draw() {
    this.graphics.clear()
    const size = Math.min(this.width, this.height)
    const cx = this.width / 2
    const cy = this.height / 2
    const maxRadius = size * CIRCLE_RADIUS_RATE
    for (let i = 1; i <= 10; i++) {
      this.graphics.drawCircle(cx, cy, maxRadius * i / 10, undefined, `rgba(0, 0, 0, ${i % 2 ? 0.25 : 0.5})`)
    }

    const data = this._stat.data
    const degree = 360 / data.length
    const pointRadius = size * POINT_RADIUS_RATE
    const radius = size * LINE_LENGTH_RATE
    const lineWidth = size * LINE_WIDTH_RATE
    const pathes = []
    const hasOp = this._stat.opponent
    const opPathes = []
    if (this._first) {
      this._titles = []
      this._values = []
    }
    for (let i = 0; i < data.length; i ++) {
      const x = Math.cos((90 + i * degree) / 180 * Math.PI) * radius + cx
      const y = -Math.sin((90 + i * degree) / 180 * Math.PI) * radius + cy
      this.graphics.drawCircle(x, y, pointRadius, COLOR[i])
      this.graphics.drawLine(cx, cy, x, y, COLOR[i], lineWidth)

      const valueRate = Math.max(0.1, data[i].value / this._stat.upperLimit)
      pathes.push([i === 0 ? 'moveTo' : 'lineTo', cx + (x - cx) * valueRate, cy + (y - cy) * valueRate])
      if (hasOp) {
        const opValueRate = Math.max(0.1, this._stat.opponent[i].value / this._stat.upperLimit)
        opPathes.push([i === 0 ? 'moveTo' : 'lineTo', cx + (x - cx) * opValueRate, cy + (y - cy) * opValueRate])
      }

      const value = {}
      const title = {}
      title.x = value.x = x - 100
      title.width = value.width = 200
      title.fontSize = value.fontSize = size * TEXT_FONT_RATE
      title.height = value.height = size * TEXT_FONT_RATE + 2
      title.color = value.color = TEXT_COLOR
      title.text = data[i].title
      value.text = data[i].value
      if (y > cy) {
        value.y = y + size * TEXT_OFFSET_RATE
        title.y = value.y + title.height
      } else {
        value.y = y - size * TEXT_OFFSET_RATE - title.height
        title.y = value.y - title.height
      }
      if (x > cx + 10) {
        value.x = title.x = x - 80
      } else if (x < cx - 10) {
        value.x = title.x = x - 120
      }
      if (this._first) {
        const titleSp = new Text(title)
        const valueSp = new Text(value)
        this.addChild(titleSp)
        this.addChild(valueSp)
        this._titles.push(titleSp)
        this._values.push(valueSp)
      } else {
        this._titles[i].update(title)
        this._values[i].update(value)
      }
    }
    pathes.push(['closePath'])
    this.graphics.drawPath(0, 0, pathes, {fillStyle: BLOCK_COLOR})
    if (hasOp) {
      opPathes.push(['closePath'])
      this.graphics.drawPath(0, 0, opPathes, {fillStyle: OPPONENT_COLOR})
    }

    this._first = false
  }
}
