function findDifferences(obj1, obj2, path = '') {
  const differences = [];

  function dfsTraverse(data1, data2, currentPath) {
    // 如果两个数据类型不一致，则直接记录差异
    if (typeof data1 !== typeof data2) {
      differences.push({ path: currentPath, value1: data1, value2: data2 });
      return;
    }

    // 如果两者都是数组，逐个元素进行比较
    if (Array.isArray(data1) && Array.isArray(data2)) {
      const maxLength = Math.max(data1.length, data2.length);
      for (let i = 0; i < maxLength; i++) {
        const nextPath = `${currentPath}[${i}]`;
        if (i >= data1.length || i >= data2.length) {
          differences.push({
            path: nextPath,
            value1: i >= data1.length ? undefined : data1[i],
            value2: i >= data2.length ? undefined : data2[i]
          });
        } else {
          dfsTraverse(data1[i], data2[i], nextPath);
        }
      }
    }
    // 如果两者都是对象，逐个属性进行比较
    else if (data1 !== null && typeof data1 === 'object' && data2 !== null && typeof data2 === 'object') {
      const allKeys = new Set([...Object.keys(data1), ...Object.keys(data2)]);
      for (let key of allKeys) {
        const nextPath = currentPath ? `${currentPath}.${key}` : key;
        if (!(key in data1) || !(key in data2)) {
          differences.push({
            path: nextPath,
            value1: key in data1 ? data1[key] : undefined,
            value2: key in data2 ? data2[key] : undefined
          });
        } else {
          dfsTraverse(data1[key], data2[key], nextPath);
        }
      }
    }
    // 对于基本数据类型，直接比较
    else if (data1 !== data2) {
      differences.push({ path: currentPath, value1: data1, value2: data2 });
    }
  }

  dfsTraverse(obj1, obj2, path);
  return differences;
}

// 示例用法
const obj1 = [
  { a: 1, b: [2, 3, { c: 4 }] },
  5,
  { d: { e: 6, f: [7, 8] }, g: 9 },
  [10, 11, { h: 12 }]
];

const obj2 = [
  { a: 1, b: [2, 3, { c: 5 }] }, // c 的值不同
  5,
  { d: { e: 6, f: [7, 9] }, g: 9 }, // f 数组中第二个元素不同
  [10, 11, { h: 13 }] // h 的值不同
];

const differences = findDifferences(obj1, obj2);
console.log(differences);
