//写一个通用的JavaScript正则校验函数，参数是正则表达式和值
function validateRegex(regex, value) {
    return regex.test(value);
  }

//示例使用
// const regex = /^[a-zA-Z0-9]+$/; // 只允许字母和数字
// const value = "abc123";
// console.log(validateRegex(regex, value)); // true

// const invalidValue = "abc@123";
// console.log(validateRegex(regex, invalidValue)); // false
// 设计一个函数校验url是否在白名单中
function isUrlInWhitelist(url, whitelist) {
    try {
      const parsedUrl = new URL(url);
      const domain = parsedUrl.hostname;
  
      return whitelist.some(whitelistedDomain => domain.includes(whitelistedDomain));
    } catch (e) {
      console.error("无效的 URL:", e);
      return false;
    }
  }
  
  // 示例使用
//   const whitelist = ["example.com", "trusted.com", "mywebsite.org"];
//   const url1 = "https://www.example.com/path/to/resource";
//   const url2 = "https://www.untrusted.com/path/to/resource";
  
//   console.log(isUrlInWhitelist(url1, whitelist)); // true
//   console.log(isUrlInWhitelist(url2, whitelist)); // false
  
// 写一个正则表达式，只要字符串出现其中出现的特殊字符就报错
function validateString(input) {
    // 定义特殊字符的正则表达式
    const specialCharsRegex = /[!@#$%^&*()]/;
  
    // 如果字符串中包含特殊字符，抛出错误
    if (specialCharsRegex.test(input)) {
      throw new Error("字符串中包含非法字符！");
    } else {
      console.log("字符串合法");
    }
  }
  
// 示例
//   try {
//     validateString("HelloWorld");  // 输出 "字符串合法"
//     validateString("Hello@World"); // 抛出错误: 字符串中包含非法字符！
//   } catch (e) {
//     console.error(e.message);
//   }
  
