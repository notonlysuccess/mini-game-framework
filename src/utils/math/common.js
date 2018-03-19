import Point from './point'

export const EPS = 1e-6

/**
 * Judge two float is equal
 * a(float)
 * b(float)
 * return(boolean):
 *   true: equal
 *   flast: not equal
 */
export const eql = (a, b) => {
  const c = a - b
  return -EPS < c && c < EPS
}

/**
 * Judge the relationship of x and 0
 * x(float)
 * return(integer):
 *   1: x > 0
 *   0: x = 0
 *   -1: x < 0
 */
export const dcmp = x => {
  return (x > EPS) - (x < -EPS)
}

/**
 * Get Point arguments
 * format 1: {float, float} or Point
 * format 2: float, float
 * return({x: float, y: float})
 */
export const getPointArguments = args => {
  if (args.length === 1) {
    return {x: args[0].x, y: args[0].y}
  } else if (args.length === 2) {
    return {x: args[0], y: args[1]}
  } else {
    console.error('Error Point args', args)
    return {x: 0, y: 0}
  }
}

/**
 * Get point scale ratio
 * format 1: float
 * format 2: float, float
 * return({ratioX: float, ratioY: float})
 */
export const getRatioArguments = args => {
  if (args.length === 1) {
    return {ratioX: args[0], ratioY: args[0]}
  } else if (args.length === 2) {
    return {ratioX: args[0], ratioY: args[1]}
  } else {
    console.error('Error Ratio args', args)
    return {ratioX: 0, ratioY: 0}
  }
}

/**
 * Get Line arguments
 * format1: {a: Point, b: Point} or Line
 * format2: Point, Point
 * return({a: Point, b: Point})
 */
export const getLineArguments = args => {
  if (args.length === 1) {
    return {a: args[0].a, b: args[0].b}
  } else if (args.length === 2) {
    return {a: args[0], b: args[1]}
  } else {
    console.error('Error Line args', args)
    return {a: new Point(0, 0), b: new Point(0, 0)}
  }
}

/**
 * Get Rect arguments
 * format1: {x: float, y: float, w or width: float, h or height: float} or Rect
 * format2: {x: float, y: float} or Point, {w or width: float, h or height: float}
 * format3: {x: float, y: float} or Point, float, float
 * format4: float, float, float, float
 * return {x: float, y: float, w: float, h: float}
 */
export const getRectArguments = args => {
  if (args.length === 1) {
    return {
      x: args[0].x,
      y: args[0].y,
      w: args[0].w === undefined ? args[0].width : args[0].w,
      h: args[0].h === undefined ? args[0].height : args[0].h
    }
  } else if (args.length === 2) {
    return {
      x: args[0].x,
      y: args[0].y,
      w: args[1].w === undefined ? args[1].width : args[1].w,
      h: args[1].h === undefined ? args[1].height : args[1].h
    }
  } else if (args.length === 3) {
    return {
      x: args[0].x,
      y: args[0].y,
      w: args[1],
      h: args[2]
    }
  } else if (args.length === 4) {
    return {
      x: args[0],
      y: args[1],
      w: args[2],
      h: args[3]
    }
  } else {
    console.error('Error Rect args', args)
    return {x: 0, y: 0, w: 0, h: 0}
  }
}

/**
 * Get Circle arguments
 * format1: {p: Point, r: float} or Circle
 * format2: Point, float
 * format3: float, float, float
 * return {p: Point, r: float}
 */
export const getCircleArguments = args => {
  if (args.length === 1) {
    return {p: args[0].p.clone, r: args[0].r}
  } else if (args.length === 2) {
    return {p: args[0], r: args[1]}
  } else if (args.length === 3) {
    return {p: new Point(args[0], args[1]), r: args[2]}
  } else {
    console.error('Error Circle args', args)
    return {p: new Point(0, 0), r: 0}
  }
}
