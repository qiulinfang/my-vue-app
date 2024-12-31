/**
 * 将类名字符串转换为数组
 * @param {string} cls - 类名字符串，默认为空
 * @returns {Array} - 转换后的类名数组
 */
export const classNameToArray = (cls = "") =>
  cls.split(" ").filter((item) => !!item.trim());

/**
 * 检查元素是否包含特定类名
 * @param {Element} el - DOM元素
 * @param {string} cls - 类名
 * @returns {boolean} - 如果元素包含类名则返回true，否则返回false
 */
export const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.includes(" ")) throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};

/**
 * 为元素添加类名
 * @param {Element} el - DOM元素
 * @param {string} cls - 类名
 */
export const addClass = (el, cls) => {
  if (!el || !cls.trim()) return;
  el.classList.add(...classNameToArray(cls));
};

/**
 * 从元素中移除类名
 * @param {Element} el - DOM元素
 * @param {string} cls - 类名
 */
export const removeClass = (el, cls) => {
  if (!el || !cls.trim()) return;
  el.classList.remove(...classNameToArray(cls));
};

/**
 * 获取元素的样式值
 * @param {Element} element - DOM元素
 * @param {string} styleName - 样式名
 * @returns {string} - 样式值
 */
export const getStyle = (element, styleName) => {
  if (!isClient || !element || !styleName) return "";

  let key = camelize(styleName);
  if (key === "float") key = "cssFloat";
  try {
    const style = element.style[key];
    if (style) return style;
    const computed = document.defaultView?.getComputedStyle(element, "");
    return computed ? computed[key] : "";
  } catch {
    return element.style[key];
  }
};

/**
 * 设置元素的样式
 * @param {Element} element - DOM元素
 * @param {string|Object} styleName - 样式名或样式对象
 * @param {string} value - 样式值
 */
export const setStyle = (element, styleName, value) => {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    entriesOf(styleName).forEach(([prop, value]) =>
      setStyle(element, prop, value)
    );
  } else {
    const key = camelize(styleName);
    element.style[key] = value;
  }
};

/**
 * 从元素中移除样式
 * @param {Element} element - DOM元素
 * @param {string|Object} style - 样式名或样式对象
 */
export const removeStyle = (element, style) => {
  if (!element || !style) return;

  if (isObject(style)) {
    keysOf(style).forEach((prop) => removeStyle(element, prop));
  } else {
    setStyle(element, style, "");
  }
};

/**
 * 为数值添加单位
 * @param {string|number} value - 数值或字符串
 * @param {string} defaultUnit - 默认单位
 * @returns {string} - 带单位的字符串
 */
export function addUnit(value, defaultUnit = "px") {
  if (!value) return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  debugWarn(SCOPE, "binding value must be a string or number");
}