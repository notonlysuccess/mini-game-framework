import {
  dcmp,
  getPointArguments,
  getRatioArguments,
  getLineArguments
} from './common'

export default class Point {
  /**
   * arguments(PointArguments)
   */
  constructor() {
    const {x, y} = getPointArguments(arguments)
    this._x = x
    this._y = y
  }

  /**
   * Reset point coordinate
   * arguments(PointArguments)
   */
  reset() {
    const {x, y} = getPointArguments(arguments)
    this._x = x
    this._y = y
    this._clear()
  }

  /**
   * Clear cache data when Point coordinate changed
   */
  _clear() {
    this._length = undefined
  }

  /**
   * Add two Point, return new Point
   * arguments(PointArguments)
   * return(Point): new Point
   */
  ADD() {
    const {x, y} = getPointArguments(arguments)
    return new Point(this._x + x, this._y + y)
  }

  /**
   * Add the Point to this Point
   * arguments(PointArguments)
   * return(Point): this
   */
  SELF_ADD() {
    const {x, y} = getPointArguments(arguments)
    this._x += x
    this._y += y
    this._clear()
    return this
  }

  /**
   * Increase the distance of Point to (0, 0)
   * arguments(PointArguments)
   * return(Point): new Point
   */
  ADD_LENGTH(length) {
    const newLength = this.length + length
    return this.MUL(newLength / this.length)
  }

  /**
   * Increase the distance of Point to (0, 0)
   * length(float): added length
   * return(Point): new Point
   */
  SELF_ADD_LENGTH(length) {
    const newLength = this.length + length
    return this.SELF_MUL(newLength / this.length)
  }

  /**
   * Subtract two Point, return new Point
   * arguments(PointArguments)
   * return(Point): new Point
   */
  SUB() {
    const {x, y} = getPointArguments(arguments)
    return new Point(this._x - x, this._y - y)
  }

  /**
   * Subtract the Point from this Point
   * arguments(PointArguments)
   * return(Point): this
   */
  SELF_SUB() {
    const {x, y} = getPointArguments(arguments)
    this._x -= x
    this._y -= y
    this._clear()
    return this
  }

  /**
   * Scale(multiply) the distance of Point to (0, 0), return new Point
   * arguments(PointArguments)
   * return(Point): new Point
   */
  MUL() {
    const {ratioX, ratioY} = getRatioArguments(arguments)
    return new Point(this._x * ratioX, this._y * ratioY)
  }

  /**
   * Scale(multiply) the distance of Point to (0, 0)
   * arguments(PointArguments)
   * return(Point): this
   */
  SELF_MUL() {
    const {ratioX, ratioY} = getRatioArguments(arguments)
    this._x *= ratioX
    this._y *= ratioY
    this._clear()
    return this
  }

  /**
   * Scale(divide) the distance of Point to (0, 0), return new Point
   * arguments(PointArguments)
   * return(Point): new Point
   */
  DIV() {
    const {ratioX, ratioY} = getRatioArguments(arguments)
    return new Point(this._x / ratioX, this._y / ratioY)
  }

  /**
   * Scale(divide) the distance of Point to (0, 0)
   * arguments(PointArguments)
   * return(Point): this
   */
  SELF_DIV() {
    const {ratioX, ratioY} = getRatioArguments(arguments)
    this._x /= ratioX
    this._y /= ratioY
    this._clear()
    return this
  }

  /**
   * Make the point coordinate to integer
   * return(Point): new Point
   */
  FLOOR() {
    return new Point(Math.floor(this._x), Math.floor(this._y))
  }

  /**
   * Make the point coordinate to integer
   * return(Point): this
   */
  SELF_FLOOR() {
    this._x = Math.floor(this._x)
    this._y = Math.floor(this._y)
    this._clear()
    return this
  }

  /**
   * Cross product: https://en.wikipedia.org/wiki/Cross_product
   * arguments(PointArguments)
   * return(float): cross product
   */
  CROSS() {
    const {x, y} = getPointArguments(arguments)
    return this._x * y - this._y * x
  }

  /**
   * Dot product: https://en.wikipedia.org/wiki/Dot_product
   * arguments(PointArguments)
   * return(float): dor product
   */
  DOT() {
    const {x, y} = getPointArguments(arguments)
    return this._x * x + this._y * y
  }

  /**
   * Make the point coordinate to negative
   * return(Point): new Point
   */
  NEG() {
    return new Point(-this._x, -this._y)
  }

  /**
   * Make the point coordinate to negative
   * return(Point): this
   */
  SELF_NEG() {
    this._x = -this._x
    this._y = -this._y
    return this
  }

  /**
   * Rotate the Point by radian base on (0, 0), return new Point
   * return(Point): new Point
   */
  ROTATE(radian) {
    const c = Math.cos(radian)
    const s = Math.sin(radian)

    return new Point(this._x * c - this._y * s,
      this._y * c + this._x * s)
  }

  /**
   * Rotate the Point by radian base on (0, 0)
   * return(Point) this
   */
  SELF_ROTATE(radian) {
    const c = Math.cos(radian)
    const s = Math.sin(radian)

    const x = this._x * c - this._y * s
    const y = this._y * c + this._x * s
    this._x = x
    this._y = y
    this._clear()
  }

  /**
   * Normalize the point(make the distance to (0, 0) to 1)
   * return(float): new Point
   */
  NORMALIZE() {
    let x, y
    if (this.length < 0.0001) {
      x = 0
      y = 0
    } else {
      x = this.x / this.length
      y = this.y / this.length
    }
    return new Point(x, y)
  }

  /**
   * Normalize the point(make the distance to (0, 0) to 1)
   * return(float): this
   */
  SELF_NORMALIZE() {
    if (this.length < 0.0001) {
      this._x = 0
      this._y = 0
    } else {
      this._x /= this.length
      this._y /= this.length
    }
    this._clear()

    return this
  }

  /**
   * Return ths square of distance from other point
   * arguments(PointArguments)
   * return(float): square of distance
   */
  distance2() {
    const {x, y} = getPointArguments(arguments)
    return (this._x - x) * (this._x - x) + (this._y - y) * (this._y - y)
  }

  /**
   * Return ths distance from other point
   * arguments(PointArguments)
   * return(float): distance
   */
  distance() {
    const {x, y} = getPointArguments(arguments)
    return Math.sqrt((this._x - x) * (this._x - x) + (this._y - y) * (this._y - y))
  }

  /**
   * Return minimum distance to the line segment
   * arguments(LineArguments)
   * return: minimum distance to the line segment
   */
  disToSeg() {
    const {a, b} = getLineArguments(arguments)
    if (dcmp(this.SUB(a).DOT(b.SUB(a))) <= 0) {
      return this.distance(a)
    }
    if (dcmp(this.SUB(b).DOT(a.SUB(b))) <= 0) {
      return this.distance(b)
    }
    return Math.abs(this.SUB(a).CROSS(b.SUB(a))) / a.distance(b)
  }

  /**
   * Check whether two Point are equal
   * arguments(LineArguments)
   * return(boolean):
   *   true: equal
   *   false: not equal
   */
  equal() {
    const {x, y} = getPointArguments(arguments)
    return (this._x === x && this._y === y)
  }

  /**
   * Return the distance to (0, 0)
   * return(float): length
   */
  get length() {
    if (!this._length) {
      this._length = Math.sqrt(this._x * this._x + this._y * this._y)
    }

    return this._length
  }

  /**
   * Return [x, y].
   * Usually use for sprite: sprite.pos(...point.args), to replace sprite.pos(point.x, point.y)
   * return([float, float]): [x, y]
   */
  get args() {
    return [this._x, this._y]
  }

  /**
   * Return new cloned point
   * return(Point): new Point
   */
  get clone() {
    return new Point(this._x, this._y)
  }

  /**
   * Return x
   * return(float): x
   */
  get x() {
    return this._x
  }

  /**
   * Return y
   * return(float): y
   */
  get y() {
    return this._y
  }

  /**
   * Set x, it will clear cache
   * x(float)
   */
  set x(x) {
    this._x = x
    this._clear()
  }

  /**
   * Set y, it will clear cache
   * y(float)
   */
  set y(y) {
    this._y = y
    this._clear()
  }

  /**
   * Check whether the three points are in line
   * This is a static function, should use as: Point.inline(point1, point2, point3)
   * a(Point)
   * b(Point)
   * c(Point)
   * return(boolean):
   *   true: in line
   *   false: not in line
   */
  static inline(a, b, c) {
    return dcmp(b.SUB(a).CROSS(c.SUB(a))) === 0
  }

  /**
   * Check whether p is between a, b
   * a(Point)
   * b(Point)
   * c(Point)
   * return(integer):
   *   -1: between a, b
   *   0: just equal to a or b
   *   1: other case
   */
  static between(a, b, p) {
    return dcmp(a.SUB(p).DOT(b.SUB(p)))
  }
}
