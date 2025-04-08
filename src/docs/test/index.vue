<template>
  <!-- commit1 -->
  <!-- commit1 -->
  <!-- commit1 -->
  <div>
    <h2>用户配置差异对比 (本地数据示例)</h2>
    <form @submit.prevent> <FormFieldDiffWrapper
        path="profile.name"
        label="姓名:"
        :changes-map="changesMap"
        input-id="profile-name-input-local"
      >
        <input id="profile-name-input-local" :value="newData.profile.name" readonly />
      </FormFieldDiffWrapper>

       <FormFieldDiffWrapper
        path="profile.age"
        label="年龄:"
        :changes-map="changesMap"
        input-id="profile-age-input-local"
      >
        <input id="profile-age-input-local" type="number" :value="newData.profile.age" readonly />
      </FormFieldDiffWrapper>

      <FormFieldDiffWrapper
        path="profile.email"
        label="邮箱:"
        :changes-map="changesMap"
        input-id="profile-email-input-local"
      >
        <input id="profile-email-input-local" :value="newData.profile.email" readonly />
      </FormFieldDiffWrapper>

      <FormFieldDiffWrapper
        path="profile.bio"
        label="简介:"
        :changes-map="changesMap"
        input-id="profile-bio-input-local"
      >
        <textarea id="profile-bio-input-local" :value="newData.profile.bio" rows="3" readonly></textarea>
      </FormFieldDiffWrapper>

      <div v-if="newData.address" class="form-section">
          <h4>地址</h4>
          <FormFieldDiffWrapper
              path="profile.address.street"
              label="街道:"
              :changes-map="changesMap"
              input-id="address-street-input-local"
              >
              <input id="address-street-input-local" :value="newData.address.street" readonly />
          </FormFieldDiffWrapper>
          <FormFieldDiffWrapper
              path="profile.address.city"
              label="城市:"
              :changes-map="changesMap"
              input-id="address-city-input-local"
              >
              <input id="address-city-input-local" :value="newData.address.city" readonly />
          </FormFieldDiffWrapper>
          <FormFieldDiffWrapper
              path="profile.address.country"
              label="国家:"
              :changes-map="changesMap"
              input-id="address-country-input-local"
              >
              <input id="address-country-input-local" :value="newData.address.country" readonly />
          </FormFieldDiffWrapper>
      </div>

      <div v-if="newData.preferences" class="form-section">
          <h4>偏好设置</h4>
           <FormFieldDiffWrapper
                path="preferences.theme"
                label="主题:"
                :changes-map="changesMap"
                input-id="prefs-theme-input-local"
           >
                <span>{{ newData.preferences.theme }}</span>
           </FormFieldDiffWrapper>
           <div v-if="newData.preferences.notifications" class="sub-section">
               <h5>通知</h5>
               <FormFieldDiffWrapper
                    path="preferences.notifications.email"
                    label="邮件通知:"
                    :changes-map="changesMap"
                    input-id="prefs-email-input-local"
               >
                    <span>{{ newData.preferences.notifications.email ? '开启' : '关闭' }}</span>
               </FormFieldDiffWrapper>
                <FormFieldDiffWrapper
                    path="preferences.notifications.sms"
                    label="短信通知:"
                    :changes-map="changesMap"
                    input-id="prefs-sms-input-local"
               >
                    <span>{{ newData.preferences.notifications.sms ? '开启' : '关闭' }}</span>
               </FormFieldDiffWrapper>
           </div>
      </div>

      <FormFieldDiffWrapper
            path="tags"
            label="标签:"
            :changes-map="changesMap"
            input-id="tags-input-local"
        >
            <div class="tags-display">
                <span v-for="(tag, index) in newData.tags" :key="index" class="tag-item">
                    {{ tag }}
                </span>
            </div>
        </FormFieldDiffWrapper>

      <div v-if="deletedFields.length > 0" class="deleted-section">
        <h4>已删除字段:</h4>
        <ul>
          <li v-for="field in deletedFields" :key="field.path">
            {{ field.path }}: <del>{{ JSON.stringify(field.oldValue) }}</del>
          </li>
        </ul>
      </div>

    </form>
  </div>
</template>

<script setup>
// 导入 Vue 相关模块
import { ref, computed } from 'vue';
// 导入 Diff 库
import { diff } from 'deep-diff';
// 导入之前创建的封装组件
// 假设 FormFieldDiffWrapper.vue 在 './components/' 目录下
import FormFieldDiffWrapper from './Greeting.vue';

// --- 在 <script setup> 内部直接定义响应式的新老数据 ---
const oldData = ref({
  userId: 'user123',
  profile: {
    name: '张三',
    age: 30,
    bio: '一个热爱编程的开发者。',
    isPublic: true,
    address: {
      street: '科技一路',
      city: '北京',
      country: '中国'
    }
    // email 在旧数据中不存在
  },
  preferences: {
    theme: 'dark',
    notifications: {
      email: true,
      sms: false // 旧值为 false
    }
  },
  tags: ['技术', 'Vue', '阅读'], // 旧标签
  contact: {
    phone: '13800138000' // 旧联系方式中有 phone
  },
  lastLogin: '2025-03-15T10:00:00Z'
});

const newData = ref({
  userId: 'user123',
  profile: {
    name: '张三丰', // 修改
    age: 30,
    bio: '一个热爱编程和探索新技术的开发者。', // 修改
    isPublic: true,
    address: {
      street: '科技一路',
      city: '上海', // 修改
      country: '中国'
    },
    email: 'zhangsan@example.com' // 新增 email
  },
  preferences: {
    theme: 'dark',
    notifications: {
      email: true,
      sms: true // 修改 sms 为 true
    }
  },
  tags: ['技术', 'React', '阅读', '旅行'], // 修改 Vue 为 React，新增 旅行
  contact: {
      // phone 字段在新数据中被删除
  },
  lastLogin: '2025-03-15T10:00:00Z'
});

// --- 计算差异 Map (直接引用本地的 ref 数据) ---
const differences = computed(() => {
  // 使用 .value 来访问 ref 对象的值
  return diff(oldData.value, newData.value) || [];
});

const changesMap = computed(() => {
  const map = new Map();
  differences.value.forEach(change => {
    if (change.path) {
      const pathString = change.path.join('.');
      map.set(pathString, {
        kind: change.kind,
        oldValue: change.lhs,
        newValue: change.rhs
      });
    }
  });
  return map;
});

// --- 计算已删除字段列表 (同上) ---
const deletedFields = computed(() => {
    return differences.value
        .filter(change => change.kind === 'D')
        .map(change => ({
            path: change.path ? change.path.join('.') : '?',
            oldValue: change.lhs
        }));
});

</script>

<style scoped>
/* 父组件样式 */
h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}
form {
    max-width: 600px; /* 限制表单最大宽度 */
    margin: 0 auto; /* 居中显示 */
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #fff;
}
.form-section h4 {
    margin-top: 25px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    color: #1a5f7a; /* 段落标题颜色 */
}
.sub-section h5 {
    margin-top: 15px;
    margin-bottom: 10px;
    color: #5a7d8b; /* 子段落标题颜色 */
    font-size: 0.95em;
}

/* 标签展示样式 */
.tags-display {
    display: flex;
    flex-wrap: wrap;
    gap: 8px; /* 标签间距 */
}
.tag-item {
    background-color: #e9ecef;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.9em;
    color: #495057;
}

/* 已删除字段区域样式 */
.deleted-section {
    margin-top: 30px; /* 与表单主体区分开 */
    padding: 15px;
    border: 1px dashed #f56c6c;
    background-color: #fef0f0;
    border-radius: 4px;
    color: #f56c6c;
}
.deleted-section h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #f56c6c;
    font-size: 1.1em;
}
.deleted-section ul {
    margin: 0;
    padding-left: 20px;
}
.deleted-section li {
    margin-bottom: 5px;
    font-family: 'Courier New', Courier, monospace; /* 等宽字体显示路径和值 */
}
.deleted-section del {
    color: #c0c4cc; /* 删除线内文字颜色 */
    background-color: #fdf0f0; /* 轻微背景 */
    padding: 0 2px;
}
</style>