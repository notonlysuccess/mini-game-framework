import Rect from './rect'
import Point from './point'
import {
  getCircleArguments,
  getPointArguments,
  eql
} from './common'

export default class Circle {
  /**
   * arguments(CircleArguments)
   */
  constructor() {
    const {p, r} = getCircleArguments(arguments)
    this._p = p
    this._r = r
  }

  /**
   * Judge whether the given Point is in this Circle
   * arguments(PointArguments)
   * return(integer):
   *   0: not contain
   *   1: contain
   *   2: in border
   */
  contain() {
    const {x, y} = getPointArguments(arguments)
    const distance = this._p.distance(x, y)
    if (distance < this._r) {
      return 1
    }
    if (eql(distance, this._r)) {
      return 2
    }
    return 0
  }

  /**
   * Move the rect position by give vec
   * arguments(PointArguments)
   * return this
   */
  move(vec) {
    const {x, y} = getPointArguments(arguments)
    this._p.SELF_ADD(vec)
    return this
  }

  /**
   * Judge the relativeship between this and given circle
   * arguments(CircleArguments)
   * return(boolean)
   *   0: no intersect
   *   1: the given Circle in this Circle
   *   2: two circles intersect each other
   *   3: this Circle in the given Circle
   */
  intersection() {
    const {p, r} = getCircleArguments(arguments)
    const dis = this._p.distance(p)
    if (dis < r - this._r) {
      return 1
    }
    if (dis < this._r - r) {
      return 3
    }
    if (dis > this._r + r) {
      return 0
    }
    return 2
  }

  /**
   * Set center point
   * p(Point)
   */
  set p(p) {
    this._p = p.clone()
  }

  /**
   * Set r(alias of radius)
   * r(float): radius
   */
  set r(r) {
    this._r = r
  }

  /**
   * Set radius
   * r(float): radius
   */
  set radius(r) {
    this._r = r
  }

  /**
   * Get center Point
   * return(Point): centerPoint
   */
  get p() {
    return this._p
  }

  /**
   * Get r(alias of radius)
   * return(float): radius
   */
  get r() {
    return this._r
  }

  /**
   * Get radius
   * return(float): radiis
   */
  get radius() {
    return this._r
  }

  /**
   * Get points and radius
   * return([float, float, float])
   */
  get args() {
    return [this._p.x, this._p.y, this._r]
  }
}
