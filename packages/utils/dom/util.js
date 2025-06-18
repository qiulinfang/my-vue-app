function findComponentUpward(context, componentName, componentNames) {
    console.log(context)
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}
export {findComponentUpward};


function findParent() {
    const parentComponent = this.findComponentUpward(this, 'sdfsdfsd');
    if (parentComponent) {
        console.log('Found ParentComponent:', parentComponent);
    } else {
        console.log('ParentComponent not found');
    }
}
export {findParent};

function scrollTop(el, from = 0, to, duration = 500, endCallback) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    function scroll(start, end, step) {
        if (start === end) {
            endCallback && endCallback();
            return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}
export {scrollTop};


function scrollToPosition(targetY, options = {}) {
    // 设置默认选项
    const defaultOptions = {
        behavior: 'smooth', // 平滑滚动
        block: 'start'      // 滚动到视口的顶部
    };

    // 合并用户提供的选项和默认选项
    const finalOptions = { ...defaultOptions, ...options };

    // 如果提供了 left 选项，则使用；否则保持当前水平滚动位置
    if (finalOptions.left === undefined) {
        finalOptions.left = window.scrollX || window.pageXOffset;
    }

    // 滚动到指定位置
    window.scrollTo({
        top: targetY,
        ...finalOptions
    });
}
export {scrollToPosition};

/**
 * 通过 name 属性查找表单中的特定元素
 *
 * @param {HTMLFormElement | string} form - 表单元素或表单的 ID
 * @param {string} name - 要查找的表单控件的 name 属性值
 * @returns {HTMLElement | null} - 找到的表单控件元素，如果没有找到则返回 null
 */
function findFormElementByName(form, name) {
    // 如果传入的是字符串，则尝试通过 ID 获取表单元素
    let formElement;
    if (typeof form === 'string') {
        formElement = document.getElementById(form);
        if (!formElement) {
            console.error(`未能找到 ID 为 "${form}" 的表单`);
            return null;
        }
    } else if (form instanceof HTMLFormElement) {
        formElement = form;
    } else {
        console.error('提供的表单参数无效');
        return null;
    }

    // 使用 form.elements.namedItem 方法查找具有指定 name 的元素
    const element = formElement.elements.namedItem(name);

    if (!element) {
        console.warn(`表单中未找到 name 为 "${name}" 的元素`);
        return null;
    }

    return element;
}
export {findFormElementByName};
