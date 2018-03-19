const getMaxMin = (points, axis) => {
  let min = points[0].DOT(axis)
  let max = min
  for (let i = 1; i < points.length; ++i) {
    const val = points[i].DOT(axis)
    if (val > max) {
      max = val
    }
    if (val < min) {
      min = val
    }
  }
  return {max, min}
}

export default class Polygon {
  constructor(points) {
    this._points = points
    let minx = this._points[0].x
    let maxx = minx
    let miny = this._points[0].y
    let maxy = miny
    this._axis = [this._points[0].SUB(this._points[this._points.length - 1])]
    for (let i = 1; i < this._points.length; ++i) {
      this._axis.push(this._points[i].SUB(this._points[i - 1]))
      if (this._points[i].x > maxx) {
        maxx = this._points[i].x
      }
      if (this._points[i].x < minx) {
        minx = this._points[i].x
      }
      if (this._points[i].y > maxy) {
        maxy = this._points[i].y
      }
      if (this._points[i].y < miny) {
        miny = this._points[i].y
      }
    }
    this._x = minx
    this._y = miny
    this._w = maxx - minx
    this._h = maxy - miny
  }

  // 0: 不相交; 1: 相交
  intersectionWithCircle(circle) {
    for (let i = 0; i < this._points.length; ++i) {
      const a = this._points[i]
      const b = this._points[(i + 1) % this._points.length]

      const vec1 = b.SUB(a)
      const vec2 = a.SUB(circle.p)

      const quadraticParamA = b.distance2(a)
      const quadraticParamB = 2 * vec1.DOT(vec2)
      const quadraticParamC = a.distance2(circle.p) - circle.r * circle.r

      const delta = quadraticParamB * quadraticParamB - 4 * quadraticParamA * quadraticParamC

      if (delta < 0) {
        continue
      }

      const sqrtDelta = Math.sqrt(delta)

      const solution1 = (-quadraticParamB + sqrtDelta) / (2 * quadraticParamA)
      const solution2 = (-quadraticParamB - sqrtDelta) / (2 * quadraticParamA)

      if ((solution1 >= 0 && solution1 <= 1) || (solution2 >= 0 && solution2 <= 1)) {
        return 1
      }
    }

    return 0
  }

  intersection(poly) {
    const points = poly.points
    for (let i = 0; i < this._axis.length; ++i) {
      const {max: max1, min: min1} = getMaxMin(this._points, this._axis[i])
      const {max: max2, min: min2} = getMaxMin(points, this._axis[i])
      if (max1 < min2 || max2 < min1) {
        return false
      }
    }
    const axis = poly.axis
    for (let i = 0; i < axis.length; ++i) {
      const {max: max1, min: min1} = getMaxMin(this._points, axis[i])
      const {max: max2, min: min2} = getMaxMin(points, axis[i])
      if (max1 < min2 || max2 < min1) {
        return false
      }
    }
    return true
  }

  get points() {
    return this._points
  }

  get axis() {
    return this._axis
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  get width() {
    return this._w
  }

  get height() {
    return this._h
  }
}
