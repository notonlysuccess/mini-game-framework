const zero = '0'.charCodeAt()
const a = 'a'.charCodeAt()
const A = 'A'.charCodeAt()

const getNumber = c => {
  const code = c.charCodeAt()
  if (code >= zero && code < A) {
    return code - zero
  }
  if (code >= A && code < a) {
    return code - A + 10
  }
  return code - a + 10
}
const alphaColor = (hex, a) => {
  const r = getNumber(hex[1]) * 16 + getNumber(hex[2])
  const g = getNumber(hex[3]) * 16 + getNumber(hex[4])
  const b = getNumber(hex[5]) * 16 + getNumber(hex[6])
  return `rgba(${r}, ${g}, ${b}, ${a})`

}

export default alphaColor
