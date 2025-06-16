import { isString, isNumber, isUndefined, isObject, isBoolean, isStringNumber, isEmpty, isElement } from "../type";
/**
 * 将类名字符串转换为数组
 * @param {string} cls - 类名字符串，默认为空
 * @returns {Array} - 转换后的类名数组
 */
export const classNameToArray = (cls = "") =>
  cls.split(" ").filter(Boolean); // ilter(Boolean)会过滤掉数组中的所有假值（包括空字符串 ""、null、undefined、0、false 等）

/**
 * 检查元素是否包含特定类名
 * @param {Element} el - DOM元素 /  this.$refs.xxx.$el
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

  let key = camelize(styleName);  // 将字符串转换为驼峰命名 
  if (key === "float") key = "cssFloat";  
  try {
    const style = element.style[key];  // 获取元素的内联样式
    if (style) return style;
    const computed = document.defaultView?.getComputedStyle(element, ""); // getComputedStyle() 方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值
    return computed ? computed[key] : "";    
  } catch {
    return element.style[key];  // 如果获取样式失败，返回元素的内联样式
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
    entriesOf(styleName).forEach(([prop, value]) =>  // entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
      setStyle(element, prop, value)  // 递归调用setStyle
    );
  } else {
    const key = camelize(styleName);  
    element.style[key] = value; // 设置元素的内联样式 
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
    keysOf(style).forEach((prop) => removeStyle(element, prop));  // 递归调用removeStyle  
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
export const addUnit = function(value, defaultUnit = "px") {
  if (!value) return "";
  if (isNumber(value) || isStringNumber(value)) { // isStringNumber()判断是否是数字字符串
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  debugWarn(SCOPE, "binding value must be a string or number");
}