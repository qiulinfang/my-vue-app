/**
 * 判断元素是否有滚动条
 * @param {HTMLElement} el - 待检查的元素
 * @param {boolean} isVertical - 是否检查垂直滚动条
 * @returns {boolean} - 是否有滚动条
 */
export const isScroll = (el, isVertical) => {
  if (!isClient) return false

  const key = {
    undefined: 'overflow',
    true: 'overflow-y',
    false: 'overflow-x',
  }[String(isVertical)]
  const overflow = getStyle(el, key)
  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}

/**
 * 获取元素的滚动容器
 * @param {HTMLElement} el - 待检查的元素
 * @param {boolean} isVertical - 是否检查垂直滚动
 * @returns {Window|HTMLElement|null} - 滚动容器
 */
export const getScrollContainer = (el, isVertical) => {
  if (!isClient) return

  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent))
      return window

    if (isScroll(parent, isVertical)) return parent

    parent = parent.parentNode
  }

  return parent
}

let scrollBarWidth
/**
 * 获取滚动条宽度
 * @param {string} namespace - 命名空间
 * @returns {number} - 滚动条宽度
 */
export const getScrollBarWidth = (namespace) => {
  if (!isClient) return 0
  if (scrollBarWidth !== undefined) return scrollBarWidth

  const outer = document.createElement('div')
  outer.className = `${namespace}-scrollbar__wrap`
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode?.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}

/**
 * 滚动元素以使指定元素可见
 * @param {HTMLElement} container - 容器元素
 * @param {HTMLElement} selected - 需要可见的元素
 */
export function scrollIntoView(container, selected) {
  if (!isClient) return

  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents = []
  let pointer = selected.offsetParent
  while (
    pointer !== null &&
    container !== pointer &&
    container.contains(pointer)
  ) {
    offsetParents.push(pointer)
    pointer = pointer.offsetParent
  }
  const top =
    selected.offsetTop +
    offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}

/**
 * 动画滚动到指定位置
 * @param {HTMLElement} container - 容器元素
 * @param {number} from - 起始滚动位置
 * @param {number} to - 目标滚动位置
 * @param {number} duration - 动画持续时间
 * @param {Function} callback - 滚动完成后的回调函数
 * @returns {Function} - 用于停止动画的函数
 */
export function animateScrollTo(container, from, to, duration, callback) {
  const startTime = Date.now()

  let handle
  const scroll = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(
      time > duration ? duration : time,
      from,
      to,
      duration
    )

    if (isWindow(container)) {
      container.scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      container.scrollTop = nextScrollTop
    }
    if (time < duration) {
      handle = rAF(scroll)
    } else if (isFunction(callback)) {
      callback()
    }
  }

  scroll()

  return () => {
    handle && cAF(handle)
  }
}

/**
 * 获取滚动元素
 * @param {HTMLElement} target - 目标元素
 * @param {HTMLElement} container - 容器元素
 * @returns {HTMLElement} - 滚动元素
 */
export const getScrollElement = (target, container) => {
  if (isWindow(container)) {
    return target.ownerDocument.documentElement
  }
  return container
}

/**
 * 获取容器的滚动位置
 * @param {HTMLElement} container - 容器元素
 * @returns {number} - 滚动位置
 */
export const getScrollTop = (container) => {
  if (isWindow(container)) {
    return window.scrollY
  }
  return container.scrollTop
}