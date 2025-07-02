export const isUndefined = (val) => val === undefined
export const isBoolean = (val) => typeof val === 'boolean'
export const isNumber = (val) => typeof val === 'number'
export const isString = (val) => typeof val === 'string'
export const isArray = (val) => Array.isArray(val)
export const isObject = (val) => val !== null && typeof val === 'object'

export const isEmpty = (val) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

export const isElement = (e) => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}
export const isStringNumber = (val) => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

export const isWindow = (val) => val === window
