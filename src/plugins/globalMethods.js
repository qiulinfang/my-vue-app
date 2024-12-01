// myPlugin.js
export default {
  install: (app, options) => {
    // 这里可以添加一些全局方法或者属性
    app.config.globalProperties.$myMethod = function () {
      console.log('This is a global method');
    };

    function deepCompare(obj1, obj2, path = '') {
      const differences = {};
    
      for (const key in obj1) {
        if (obj2.hasOwnProperty(key)) {
          const newPath = path ? `${path}.${key}` : key;
          if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            const nestedDiffs = deepCompare(obj1[key], obj2[key], newPath);
            Object.assign(differences, nestedDiffs);
          } else if (obj1[key] !== obj2[key]) {
            differences[newPath] = { oldValue: obj1[key], newValue: obj2[key] };
          }
        }
      }
    
      return differences;
    }
    
    app.config.globalProperties.$compare = function compareArrays(array1, array2) {
      const differences = [];
    
      array1.forEach(item1 => {
        const item2 = array2.find(item => item.id === item1.id);
        if (item2) {
          const diffFields = deepCompare(item1, item2);
          if (Object.keys(diffFields).length > 0) {
            differences.push({ id: item1.id, differences: diffFields });
          }
        }
      });
    
      return differences;
    }


    // 添加组件
    app.component('MyComponent', {
      template: '<div>A custom component!</div>'
    });

    // 添加指令
    app.directive('focus', {
      mounted(el) {
        el.focus();
      }
    });
  }
};