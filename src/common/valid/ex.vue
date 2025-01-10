<template>
    <div>
      <input v-model="inputValue" @blur="validateInput" placeholder="请输入 URL 或其他类型">
      <span v-if="errorMessage" style="color: red;">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputValue: '',
        errorMessage: '',
      };
    },
    methods: {
      // 校验输入
      validateInput() {
        this.validate(this.inputValue)
          .then(() => {
            this.errorMessage = ''; // 如果校验通过，清空错误信息
          })
          .catch((error) => {
            this.errorMessage = error; // 如果校验失败，显示错误信息
          });
      },
      // 校验方法，返回一个Promise
      validate(value) {
        return new Promise((resolve, reject) => {
          if (this.isURL(value)) {
            // 校验 URL
            this.checkURL(value)
              .then(resolve)
              .catch(reject);
          } else {
            // 校验非 URL 类型
            if (this.isValidInput(value)) {
              resolve();
            } else {
              reject('输入包含非法字符');
            }
          }
        });
      },
      // 判断是否为 URL
      isURL(value) {
        const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
        return urlPattern.test(value);
      },
      // 校验 URL 是否有效，假设调用接口进行校验
      checkURL(value) {
        return new Promise((resolve, reject) => {
          // 这里你可以替换为实际的接口调用，例如：
          // axios.get('/api/validate-url', { params: { url: value } })
          setTimeout(() => {
            const isValid = true; // 假设校验结果
            if (isValid) {
              resolve();
            } else {
              reject('URL 无效');
            }
          }, 1000);
        });
      },
      // 校验非 URL 类型是否包含特殊字符
      isValidInput(value) {
        const specialCharPattern = /[^a-zA-Z0-9\s]/;
        return !specialCharPattern.test(value);
      }
    }
  };
  </script>
  
  <style scoped>
  /* 这里你可以根据需要添加样式 */
  </style>
  