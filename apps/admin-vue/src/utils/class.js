import { computed, getCurrentInstance, inject, ref, unref } from "vue";

export const defaultNamespace = "f";
const statePrefix = "is-";

const _bem = (namespace, block, blockSuffix, element, modifier) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const namespaceContextKey = Symbol("namespaceContextKey"); // Symbol('namespaceContextKey') 用于创建一个唯一的key

export const useGetDerivedNamespace = (namespaceOverrides) => {
  const derivedNamespace =
    namespaceOverrides ||
    (getCurrentInstance()  // 获取当前组件实例
      ? inject(namespaceContextKey, ref(defaultNamespace)) // 从当前组件实例中获取namespaceContextKey对应的值，如果没有则返回一个ref对象
      : ref(defaultNamespace)); // 如果没有当前组件实例，则返回一个ref对象
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace; // 返回derivedNamespace的值，如果没有则返回defaultNamespace
  });
  return namespace;
};

export const useNamespace = (block, namespaceOverrides) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides); // 获取命名空间
  const b = (blockSuffix = "") => 
    _bem(namespace.value, block, blockSuffix, "", "");
  const e = (element) =>
    element ? _bem(namespace.value, block, "", element, "") : "";
  const m = (modifier) =>
    modifier ? _bem(namespace.value, block, "", "", modifier) : "";
  const be = (blockSuffix, element) =>
    blockSuffix && element
      ? _bem(namespace.value, block, blockSuffix, element, "")
      : "";
  const em = (element, modifier) =>
    element && modifier
      ? _bem(namespace.value, block, "", element, modifier)
      : "";
  const bm = (blockSuffix, modifier) =>
    blockSuffix && modifier
      ? _bem(namespace.value, block, blockSuffix, "", modifier)
      : "";
  const bem = (blockSuffix, element, modifier) =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : "";
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true; 
    return name && state ? `${statePrefix}${name}` : ""; // 返回一个字符串，格式为is-name
  };

  // for css var
  // --el-xxx: value;
  const cssVar = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key]; // 返回一个对象，key为`--${namespace.value}-${key}`, value为object[key]
      }
    }
    return styles;
  };
  // with block
  const cssVarBlock = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key]; // 返回一个对象，key为`--${namespace.value}-${block}-${key}`, value为object[key]
      }
    }
    return styles;
  };

  const cssVarName = (name) => `--${namespace.value}-${name}`; // 返回一个字符串，格式为`--${namespace.value}-${name}`
  const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`; // 返回一个字符串，格式为`--${namespace.value}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  };
};
