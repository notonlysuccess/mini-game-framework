import Panel from './panel'
import {
  Rect,
  Circle
} from 'sprite'
import Scale from 'utils/scale'

const RECT = new Scale({
  x: 100,
  y: 800,
  width: 300,
  height: 300,
  fillStyle: '#FF0000',
})
const CIRCLE = new Scale({
  x: 100,
  y: 800,
  width: 300,
  height: 300,
  fillStyle: '#00FF00',
}, RECT)

export default class AnimationPanel extends Panel {
  constructor() {
    super()
    this._drawPanel()
  }

  _drawPanel() {
    const rect = new Rect(RECT)
    this.addChild(rect)
    rect.addChild(new Circle(CIRCLE))
    rect.playOnce({
      changedValue: {
        y: -200,
      },
      duration: 1000,
      timeFunction: 'easeOutBounce'
    })
  }
}
