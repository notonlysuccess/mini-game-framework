import Point from './point'
import Line from './line'
import {
  getRectArguments,
  getLineArguments,
  getPointArguments
} from './common'

export default class Rect {
  /**
   * agruments(RectArguments)
   */
  constructor() {
    const {x, y, w, h} = getRectArguments(arguments)
    this._x = x
    this._y = y
    this._h = h
    this._w = w
  }

  /**
   * Judge whether the given Point is in this Rect
   * p(Point): judge Point
   * return(integer):
   *   0: not contain
   *   1: contain
   *   2: in border
   */
  contain() {
    const {x, y} = getPointArguments(arguments)
    if (this.left < x && x < this.right &&
      this.top < y && y < this.bottom) {
      return 1
    }
    if (this.left <= x && x <= this.right &&
      this.top <= y && y <= this.bottom) {
      return 2
    }
    return 0
  }

  /**
   * Judge whether two Rects intersect each other
   * arguments: RectArguments
   * return(integer):
   *   0: not intersect
   *   1. the given Rect in this Rect
   *   2: intersect
   *   3: intersect in border
   *   4: this Rect in the given Rect
   */
  intersection() {
    const {x, y, w, h} = getRectArguments(arguments)
    if (this._x < x && x + w < this._x + this._w &&
      this._y < y && y + h < this._y + this._h) {
      return 1
    }
    if (x < this._x && this._x + this._w < x + w &&
      y < this._y && this._y + this._h < y + h) {
      return 4
    }
    if (this._x < x + w &&
      this._x + this._w > x &&
      this._y < y + h &&
      this._y + this._h > y) {
      return 2
    }
    if (this._x <= x + w &&
      this._x + this._w >= x &&
      this._y <= y + h &&
      this._y + this._h >= y) {
      return 3
    }
    return 0
  }

  /**
   * Reset rect
   * arguments(RectArguments)
   */
  reset() {
    const {x, y, w, h} = getRectArguments(arguments)
    this._x = x
    this._y = y
    this._w = w
    this._h = h
    this._clear()
    return this
  }

  /**
   * Resize width and height
   * w(float)
   * h(float)
   * return(Rect): this
   */
  size(w, h) {
    this._w = w
    this._h = h
    this._clear()
    return this
  }

  /**
   * Reposition x and y
   * arguments(PointArguments)
   * return this
   */
  pos() {
    const {x, y} = getPointArguments(arguments)
    this.x = x
    this.y = y
    this._clear()
    return this
  }

  /**
   * Move the rect position by give vec
   * arguments(PointArguments)
   * return this
   */
  move() {
    const {x, y} = getPointArguments(arguments)
    this.x += x
    this.y += y
    this._clear()
    return this
  }

  /**
   * Calculate the relative position base on given Point
   * arguments(RectArguments)
   * return(Point): the offset from given Point
   */
  offset() {
    const {x, y} = getPointArguments(arguments)
    return new Point(this.x - x, this.y - y)
  }

  /**
   * Clear cache data when Rect (x, y, w, h) changed
   */
  _clear() {
    this._r = undefined
    this._b = undefined
    this._rightTopPoint = undefined
    this._leftTopPoint = undefined
    this._rightBottomPoint = undefined
    this._leftBottomPoint = undefined
    this._centerPoint = undefined
    this._points = undefined
    this._leftLine = undefined
    this._rightLine = undefined
    this._bottomLine = undefined
    this._topLine = undefined
    this._lines = undefined
  }

  /**
   * Set x
   * x(float)
   */
  set x(x) {
    this._x = x
    this._clear()
  }

  /**
   * Set left(alias of x)
   * x(float)
   */
  set left(x) {
    this._x = x
    this._clear()
  }

  /**
   * Set y
   * y(float)
   */
  set y(y) {
    this._y = y
    this._clear()
  }

  /**
   * Set top(alias of y)
   * y(float)
   */
  set top(y) {
    this._y = y
    this._clear()
  }

  /**
   * Set width
   * w(float)
   */
  set width(w) {
    this._w = w
    this._clear()
  }

  /**
   * Set w(alias of width)
   * w(float)
   */
  set w(w) {
    this._w = w
    this._clear()
  }

  /**
   * Set height
   * h(float)
   */
  set height(h) {
    this._h = h
    this._clear()
  }

  /**
   * Set h(alias of height)
   * h(float)
   */
  set h(h) {
    this._h = h
    this._clear()
  }

  /**
   * Get x
   * return(float)
   */
  get x() {
    return this._x
  }

  /**
   * Get left(alias of x)
   * return(float)
   */
  get left() {
    return this._x
  }

  /**
   * Get y
   * return(float)
   */
  get y() {
    return this._y
  }

  /**
   * Get top(alias of y)
   * return(float)
   */
  get top() {
    return this._y
  }

  /**
   * Get right(x + width)
   * return(float)
   */
  get right() {
    if (!this._r) {
      this._r = this._x + this._w
    }
    return this._r
  }

  /**
   * Get bottom(y + height)
   * return(float)
   */
  get bottom() {
    if (!this._b) {
      this._b = this._y + this._h
    }
    return this._b
  }

  /**
   * Get width
   * return(float)
   */
  get width() {
    return this._w
  }

  /**
   * Get w(alias of width)
   * return(float)
   */
  get w() {
    return this._w
  }

  /**
   * Get height
   * return(float)
   */
  get height() {
    return this._h
  }

  /**
   * Get h(alias of height)
   * return(float)
   */
  get h() {
    return this._h
  }

  /**
   * Get left(alias of x)
   * return(float)
   */
  get left() {
    return this._x
  }

  /**
   * Get top(alias of y)
   * return(float)
   */
  get top() {
    return this._y
  }

  /**
   * Get center point
   * return(POint)
   */
  get centerPoint() {
    if (!this._centerPoint) {
      this._centerPoint = new Point(
        this._x + (this._w >> 1),
        this._y + (this._h >> 1)
      )
    }
    return this._centerPoint
  }

  /**
   * Get left top point
   * return(POint)
   */
  get leftTopPoint() {
    if (!this._leftTopPoint) {
      this._leftTopPoint = new Point(this._x, this._y)
    }
    return this._leftTopPoint
  }

  /**
   * Get left bottom point
   * return(POint)
   */
  get leftBottomPoint() {
    if (!this._leftBottomPoint) {
      this._leftBottomPoint = new Point(this._x, this.bottom)
    }
    return this._leftBottomPoint
  }

  /**
   * Get right top point
   * return(POint)
   */
  get rightTopPoint() {
    if (!this._rightTopPoint) {
      this._rightTopPoint = new Point(this.right, this._y)
    }
    return this._rightTopPoint
  }

  /**
   * Get right bottom point
   * return(POint)
   */
  get rightBottomPoint() {
    if (!this._rightBottomPoint) {
      this._rightBottomPoint = new Point(this.right, this.bottom)
    }
    return this._rightBottomPoint
  }

  /**
   * Get four points
   * return([Point, Point, Point, Point])
   */
  get points() {
    if (!this._points) {
      this._points = [this.leftTopPoint, this.leftBottomPoint, this.rightBottomPoint, this.rightTopPoint]
    }
    return this._points
  }

  /**
   * Get left line
   * return(Line)
   */
  get leftLine() {
    if (!this._leftLine) {
      this._leftLine = new Line(this.leftTopPoint, this.leftBottomPoint)
    }
    return this._leftLine
  }

  /**
   * Get right line
   * return(Line)
   */
  get rightLine() {
    if (!this._rightLine) {
      this._rightLine = new Line(this.rightTopPoint, this.rightBottomPoint)
    }
    return this._rightLine
  }

  /**
   * Get bottom line
   * return(Line)
   */
  get bottomLine() {
    if (!this._bottomLine) {
      this._bottomLine = new Line(this.leftBottomPoint, this.rightBottomPoint)
    }
    return this._bottomLine
  }

  /**
   * Get top line
   * return(Line)
   */
  get topLine() {
    if (!this._topLine) {
      this._topLine = new Line(this.leftTopPoint, this.rightTopPoint)
    }
    return this._topLine
  }

  /**
   * Get four lines
   * return([Line, Line, Line, Line])
   */
  get lines() {
    if (!this._lines) {
      this._lines = [this.rightLine, this.bottomLine, this.leftLine, this.topLine]
    }
    return this._lines
  }

  /**
   * Get width and height
   * Usually use for sprite: sprite.size(...rect.size) to replace sprite.size(rect.w, rect.h)
   * return ([float, float])
   */
  get size() {
    return [this._w, this._h]
  }

  /**
   * Get x and y
   * return ([float, float])
   */
  get position() {
    return [this._x, this.Y]
  }

  /**
   * Get width and height
   * return ([float, float, float, float])
   */
  get args() {
    return [this._x, this._y, this._w, this._h]
  }

  /**
   * Return new cloned Rect
   * return(Rect): new Rect
   */
  get clone() {
    return new Rect(this._x, this._y, this._w, this._h)
  }

  /**
   * Slice the rect by the given point base on x-axis and y-axis, usually use in quadtree
   * arguments(PointArguments)
   * return([Rect]):
   *   []: if point out of rect or in four corners
   *   [Rect, Rect]: if point in rect border
   *   [Rect, Rect, Rect, Rect]: if point in rect
   */
  slice() {
    const {x, y} = getPointArguments(arguments)
    if (this.contain(x, y) === 0) {
      return []
    }
    const deltaX = x - this.x
    const deltaY = y - this.y
    const sliceX = deltaX > 0 && deltaX < this.width
    const sliceY = deltaY > 0 && deltaY < this.height

    if (sliceX && sliceY) {
      // slice the rect base on x-axis ans y-axis
      const result = []
      const slicedXAxisRect = this.slice(new Point(x, this.y))
      slicedXAxisRect.forEach(rect => {
        result.push(...rect.slice(this.x, y))
      })
      return result
    } else if (sliceX) {
      // only slice base on x-axis
      return [
        new Rect(this.x, this.y, deltaX, this.height),
        new Rect(x, this.y, this.width - deltaX, this.height)
      ]
    } else if (sliceY) {
      // only slice by y-axis
      return [
        new Rect(this.x, this.y, this.width, deltaY),
        new Rect(this.x, y, this.width, this.height - deltaY)
      ]
    }
    return []
  }

}
