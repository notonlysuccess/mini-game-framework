const PI = Math.PI
const PI2 = PI * 2

//t: 1/p, b: 0, c: 1, d: 1
const linear = p => p

const easeInCubic = p => p * p * p
const easeOutCubic = p => 1 + (p = p - 1) * p * p
const easeInOutCubic = p => (p = p * 2) < 1 ? easeInCubic(p) / 2 : (2 + (p = p - 2) * p * p) / 2

const easeInSine = p => 1 - Math.cos(p * Math.PI / 2)

const easeInBack = p => p * p * ((2.70158) * p - 1.70158)
const easeOutBack = p => (p = p - 1) * p * (2.70158 * p + 1.70158) + 1

const easeInElastic = p => -Math.pow(2, 10 * (p - 1)) * Math.sin((p - 1.075) * PI2 / 0.3)
const easeOutElastic = p => 1 + Math.pow(2, -10 * p) * Math.sin((p - 1.075) * PI2 / 0.3)

const easeOutBounce = p => {
  if (p < 1 / 2.75) {
    return 7.5625 * p * p
  } else if (p < 2 / 2.75) {
    p -= 1.5 / 2.75
    return 7.5625 * p * p + 0.75
  } else if (p < 2.5 / 2.75) {
    p -= 2.25 / 2.75
    return 7.5625 * p * p + 0.9375
  } else {
    p -= 2.625 / 2.75
    return 7.5625 * p * p + 0.984375
  }
}
const easeInBounce = p => 1 - easeOutBounce(1 - p)
const easeInOutBounce = p => {
  if (p < 0.5) {
    return easeInBounce(p * 2) * 0.5
  } else {
    return easeOutBounce(p * 2 - 1) * 0.5 + 0.5
  }
}

const shake = p => Math.sin(p * 3 * PI2) * (1 - p)

export default {
  linear,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,

  easeInSine,

  easeOutBack,
  easeInBack,

  easeInElastic,
  easeOutElastic,

  easeInBounce,
  easeOutBounce,
  easeInOutBounce,

  shake
}
