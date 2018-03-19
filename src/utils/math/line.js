import Point from './point'
import {
  dcmp,
  getLineArguments
} from './common'

export default class Line {
  /**
   * aguments(LineArguments)
   */
  constructor() {
    const {a, b} = getLineArguments(arguments)
    this.a = a
    this.b = b
  }
  /**
   * Check whether p are in line
   * p(Point)
   * return(boolean):
   *   true: in line
   *   false: not in line
   */
  inLine(p) {
    return Point.inline(this.a, this.b, p)
  }

  /**
   * Check whether p is between line
   * p(Point)
   * return(integer):
   *   -1: between line
   *   0: just equal to line.a or line.b
   *   1: other case
   */
  between(p) {
    return Point.between(this.a, this. b, p)
  }

  /**
   * Check whether two lines are crossing
   * arguments(LineArguments)
   * return(integer):
   *   0: not cross
   *   1: cross
   *   2: cross in endPoint or superposition
   */
  cross() {
    const l = getLineArguments(arguments)
    const a = this.a
    const b = this.b
    const c = l.a
    const d = l.b
    const s1 = b.SUB(a).CROSS(c.SUB(a))
    const s2 = b.SUB(a).CROSS(d.SUB(a))
    const d1 = dcmp(s1)
    const d2 = dcmp(s2)
    const d3 = dcmp(d.SUB(c).CROSS(a.SUB(c)))
    const d4 = dcmp(d.SUB(c).CROSS(b.SUB(c)))

    if ((d1 ^ d2) === -2 && (d3 ^ d4) === -2) {
      const crossPoint = new Point(
        (c.x * s2 - d.x * s1) / (s2 - s1),
        (c.y * s2 - d.y * s1) / (s2 - s1)
      )
      return {
        res: 1,
        crossPoint
      }
    }
    if (d1 === 0 && Point.between(c, a, b) <= 0 ||
      d2 === 0 && Point.between(d, a, b) <= 0 ||
      d3 === 0 && Point.between(a, c, d) <= 0 ||
      d4 === 0 && Point.between(b, c, d) <= 0) {
      return {
        res: 2,
        crossPoint: null
      }
    }
    return {
      res: 0,
      crossPoint: null
    }
  }
}
