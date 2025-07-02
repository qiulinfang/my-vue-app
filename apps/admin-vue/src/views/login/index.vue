<template>
  <div class="register-page-container">
    <el-row class="full-height">
      <el-col :md="14" class="image-column hidden-sm-and-down">
        <el-image
          class="background-image"
          src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop"
          fit="cover"
        />
      </el-col>

      <el-col :xs="24" :sm="24" :md="10" class="form-column">
        <div class="form-wrapper">
          <h1 class="title">注册墨刀</h1>
          <p class="subtitle">请输入您的登录密码，为保障安全，建议定期更换密码</p>

          <el-form
            ref="registerFormRef"
            :model="formData"
            :rules="formRules"
            label-position="top"
            class="register-form"
            :hide-required-asterisk="true"
          >
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formData.phone" size="large" placeholder="请输入手机号" />
            </el-form-item>

            <el-form-item label="验证码" prop="code">
              <el-input v-model="formData.code" size="large" placeholder="请输入验证码" />
            </el-form-item>

            <el-form-item prop="agree">
              <el-checkbox v-model="formData.agree">
                注册即表示同意墨刀
                <el-link type="primary" href="#" :underline="false">《使用条款》</el-link>
              </el-checkbox>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="register-button"
                size="large"
                :loading="isLoading"
                @click="handleRegister(registerFormRef)"
              >
                免费注册
              </el-button>
            </el-form-item>
          </el-form>

          <div class="login-prompt">
            已有账号？
            <el-link type="primary" href="#" :underline="false">登录</el-link>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
// 引入 Element Plus 的消息提示组件和表单类型定义
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- 数据和状态定义 ---

// 注册按钮的加载状态
const isLoading = ref(false);
// 表单实例的引用
const registerFormRef = ref(null);

// 表单数据模型
const formData = reactive({
  phone: '',
  code: '',
  agree: false,
});

// --- 表单验证规则 ---

// 自定义验证规则：检查是否已勾选同意协议
const validateAgreement = (rule, value, callback) => {
  if (value) {
    callback(); // 验证通过
  } else {
    callback(new Error('请先阅读并同意使用条款')); // 验证失败
  }
};

// 所有的表单验证规则
const formRules = reactive({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的11位手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  agree: [
    // 使用自定义验证器
    { validator: validateAgreement, trigger: 'change' }
  ]
});

// --- 逻辑处理函数 ---

/**
 * 模拟API调用
 * @param {object} data - 要提交的表单数据
 * @returns Promise
 */
const registerApi = (data) => {
  console.log('正在向服务器提交注册数据:', data);
  return new Promise((resolve, reject) => {
    // 模拟2秒的网络延迟
    setTimeout(() => {
      // 模拟一个随机的成功或失败结果
      if (Math.random() > 0.2) { // 80% 的概率成功
        resolve({ success: true, message: '注册成功！欢迎加入我们。' });
      } else { // 20% 的概率失败
        reject(new Error('验证码错误或服务器繁忙，请稍后再试。'));
      }
    }, 2000);
  });
};

/**
 * 处理注册按钮点击事件
 * @param {object} formEl - 表单实例
 */
const handleRegister = async (formEl) => {
  if (!formEl || isLoading.value) return;

  try {
    // 1. 触发表单验证
    const isValid = await formEl.validate();
    if (!isValid) return; // 如果验证失败，则不继续执行

    // 2. 进入加载状态
    isLoading.value = true;

    // 3. 调用模拟的API
    const response = await registerApi({
      phone: formData.phone,
      code: formData.code
    });

    // 4. 处理成功响应
    ElMessage({
      message: response.message,
      type: 'success',
      duration: 3000
    });

    // 可以在这里执行页面跳转或重置表单等操作
    // formEl.resetFields();
    localStorage.setItem('your_token_key','token_key'); // 假设从 localStorage 获取 token
    router.push(`/`);
  } catch (error) {
    // 5. 处理验证失败或API错误
    console.error('注册失败:', error);
    ElMessage({
      message: error.message || '注册失败，请检查您的输入。',
      type: 'error',
      duration: 3000
    });
  } finally {
    // 6. 无论成功或失败，都结束加载状态
    isLoading.value = false;
  }
};
</script>

<style scoped>
.register-page-container,
.full-height {
  height: 100vh;
  min-height: 600px; /* 避免在小高度屏幕上内容被压缩 */
}

/* 左侧图片样式 */
.image-column {
  height: 100%;
}
.background-image {
  width: 100%;
  height: 100%;
}

/* 右侧表单样式 */
.form-column {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form-wrapper {
  width: 350px;
  padding: 2rem;
  box-sizing: border-box;
}

/* 标题和副标题 */
.title {
  font-size: 1.75rem; /* 约 28px */
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 0.875rem; /* 14px */
  color: #909399;
  margin-bottom: 24px;
}

/* 表单元素 */
.register-form .el-form-item {
  margin-bottom: 22px;
}

/* 注册按钮 */
.register-button {
  width: 100%;
  font-size: 1rem;
}

/* 条款链接在复选框内的对齐 */
.el-checkbox .el-link {
  vertical-align: baseline;
  margin-left: 4px;
}

/* 底部登录提示 */
.login-prompt {
  text-align: center;
  font-size: 0.875rem; /* 14px */
  color: #606266;
  margin-top: 24px;
}

.login-prompt .el-link {
  font-size: 0.875rem; /* 14px */
}

/* 引入 Element Plus 的响应式隐藏 CSS 类 */
@import 'element-plus/theme-chalk/display.css';
</style>