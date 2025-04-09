// src/components/layout/SidebarItem.vue
<template>
  <div v-if="!item.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.meta?.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <el-icon v-if="onlyOneChild.meta.icon || item.meta?.icon">
            <component :is="onlyOneChild.meta.icon || item.meta?.icon" />
          </el-icon>
          <template #title>{{ onlyOneChild.meta.title }}</template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <el-icon v-if="item.meta?.icon">
           <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(item.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import path from 'path-browserify'; // 使用 path-browserify 处理路径拼接
import { isExternal } from '@/utils/validate'; // 假设你有判断是否外部链接的工具函数
import AppLink from './Link.vue'; // 一个用于处理内部和外部链接的组件
import { ElMenuItem, ElSubMenu, ElIcon } from 'element-plus';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 如果图标是动态的，可能需要导入所有图标

// -------- Props --------
const props = defineProps({
  // 当前路由项 (route config)
  item: {
    type: Object,
    required: true
  },
  // 是否嵌套菜单（用于样式区分）
  isNest: {
    type: Boolean,
    default: false
  },
  // 父级基础路径
  basePath: {
    type: String,
    default: ''
  }
});

// -------- State --------
const onlyOneChild = ref(null); // 用于存储唯一的可显示子路由

// -------- Methods --------

// 判断是否只有一个可显示的子节点
// parent: 父路由对象
// children: 子路由数组 (默认为空数组)
function hasOneShowingChild(children = [], parent) {
  // 过滤掉 hidden: true 的子路由
  const showingChildren = children.filter(child => {
    if (child.meta?.hidden) {
      return false;
    } else {
      // 临时设置 onlyOneChild 变量，用于后续渲染
      onlyOneChild.value = child;
      return true;
    }
  });

  // Case 1: 当只有一个子路由时，直接返回 true
  if (showingChildren.length === 1) {
    return true;
  }

  // Case 2: 当没有子路由可显示时，显示父级自身作为链接
  // 需要确保父级路由有 meta 信息才显示
  if (showingChildren.length === 0) {
    // 将父路由信息赋给 onlyOneChild，但要移除 children 属性防止无限递归
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  // Case 3: 有多个子路由
  return false;
}

// 解析路径：拼接 basePath 和 routePath
function resolvePath(routePath) {
  // 如果是外部链接，直接返回
  if (isExternal(routePath)) {
    return routePath;
  }
  // 如果子路径是外部链接，也直接返回（通常外部链接放在 children 里 path 设为完整 URL）
   if (isExternal(props.basePath)) {
    return props.basePath;
  }
  // 使用 path.resolve 进行路径拼接，能处理 '../' './' 等情况
  // 注意：前端路径拼接通常用 path.join 或自定义逻辑更合适，这里用 resolve 示例
  // 更安全的做法可能是简单的字符串拼接，确保斜杠正确
   const absolutePath = path.resolve(props.basePath, routePath);
  // console.log(`Resolving path: basePath='${props.basePath}', routePath='${routePath}', result='${absolutePath}'`);
  // 使用 path.join 更适合 URL 路径拼接
   const joinedPath = path.join(props.basePath, routePath).replace(/\\/g, '/'); // 替换反斜杠
  //  console.log(`Resolving path: basePath='${props.basePath}', routePath='${routePath}', joined='${joinedPath}'`);
  return joinedPath;

}

// (可选) 动态加载图标，如果你的图标组件名存储在 meta.icon 中
// const iconComponent = computed(() => {
//   const iconName = props.item.meta?.icon;
//   return iconName ? ElementPlusIconsVue[iconName] : null;
// });

</script>

<style scoped>
/* 可以添加一些嵌套菜单的样式 */
.nest-menu .el-menu-item {
  padding-left: 40px !important; /* 调整嵌套菜单项的缩进 */
}
/* 可以根据 isNest prop 添加更多样式 */
</style>