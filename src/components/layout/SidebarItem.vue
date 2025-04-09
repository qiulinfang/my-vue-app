
<template>
  <div v-if="!item.meta?.hidden">
    <template v-if="menuDisplayInfo.mode === 'link' && menuDisplayInfo.itemToLink?.meta">
      {{ resolvePath(menuDisplayInfo.itemToLink.path) }}
      <app-link :to="resolvePath(menuDisplayInfo.itemToLink.path)">
        <el-menu-item
          :index="resolvePath(menuDisplayInfo.itemToLink.path)"
          :class="{'submenu-title-noDropdown': !isNest}"
        >
          <el-icon v-if="menuDisplayInfo.icon">
            <component :is="menuDisplayInfo.icon" />
          </el-icon>
          <template #title>{{ menuDisplayInfo.title }}</template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu
      v-else-if="menuDisplayInfo.mode === 'submenu'"
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
    {{ resolvePath(item.path) }}
      <template #title>
        <el-icon v-if="menuDisplayInfo.icon">
           <component :is="menuDisplayInfo.icon" />
        </el-icon>
        <span>{{ menuDisplayInfo.title }}</span>
      </template>
      <sidebar-item
        v-for="child in menuDisplayInfo.childrenToRender"
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
import { computed } from 'vue'; // 移除了 ref，因为不再需要 onlyOneChild ref
import { isExternal } from '@/utils/validate';
import AppLink from './Link.vue';
import { ElMenuItem, ElSubMenu, ElIcon } from 'element-plus';

// -------- Props --------
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
});

// -------- Computed Properties --------

// 计算可见的子路由 (过滤掉 hidden: true 的)
const visibleChildren = computed(() => {
  return props.item.children?.filter(child => !child.meta?.hidden) || [];
});

// 计算菜单项应该如何显示 (核心逻辑)
const menuDisplayInfo = computed(() => {
  const visible = visibleChildren.value;
  const visibleCount = visible.length;
  const parentMeta = props.item.meta || {};
  const alwaysShowParent = parentMeta.alwaysShow === true; // 父菜单是否强制显示为下拉

  // 情况 1: 显示为子菜单 (有多个可见子项，或者只有一个但父级设置了 alwaysShow)
  if (visibleCount > 1 || (visibleCount === 1 && alwaysShowParent)) {
    return {
      mode: 'submenu',
      title: parentMeta.title,
      icon: parentMeta.icon,
      childrenToRender: visible
    };
  }

  // 情况 2: 显示为单个链接 - 只有一个可见子项，且该子项没有自己的可见子项，且父级没设置 alwaysShow
  if (visibleCount === 1 && !alwaysShowParent) {
    const singleChild = visible[0];
    const childHasVisibleChildren = singleChild.children?.some(c => !c.meta?.hidden);
    if (!childHasVisibleChildren) {
      // 返回这个唯一的子项作为链接目标
      return {
        mode: 'link',
        // 对于链接项，路径和 meta 信息都来自这个子项
        itemToLink: singleChild,
         // 图标优先用子项的，如果没有，则尝试用父项的作为后备 (可以根据需求调整)
        icon: singleChild.meta?.icon || parentMeta.icon,
        title: singleChild.meta?.title
      };
    }
     // 如果唯一的子项自己还有子项，那它应该显示为 submenu (即使父级没设置alwaysShow)
     // 所以这里也归入 submenu 逻辑
      return {
        mode: 'submenu',
        title: parentMeta.title,
        icon: parentMeta.icon,
        childrenToRender: visible // 包含那个唯一的子项
      };
  }

  // 情况 3: 显示为单个链接 - 没有可见子项，直接链接父级自身 (前提是父级有 meta.title)
  if (visibleCount === 0 && parentMeta.title) {
    // 链接目标是父级路由项自身
    return {
      mode: 'link',
      // 对于链接项，路径和 meta 信息都来自父项
      itemToLink: { ...props.item, path: props.item.path || '' }, // 确保 path 存在
      icon: parentMeta.icon,
      title: parentMeta.title
    };
  }

  // 其他情况 (例如，父级本身没有 title，也没有可见子项)，理论上不应该渲染
  // 但根路由或特殊情况可能需要处理，这里返回 'hidden' 或 'none'
  return { mode: 'none' };
});


// -------- Methods --------

// 解析路径函数保持不变
function resolvePath(routePath) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  try {
    const base = 'http://dummy.com' + (props.basePath ? (props.basePath.startsWith('/') ? props.basePath : '/' + props.basePath) : '/');
    const resolvedUrl = new URL(routePath, base);
    return resolvedUrl.pathname;
  } catch (e) {
    console.error(`Error resolving path: basePath='${props.basePath}', routePath='${routePath}'`, e);
    const B = props.basePath || '';
    const R = routePath || '';
    if (R.startsWith('/')) { return R; }
    return (B.replace(/\/$/, '') + '/' + R.replace(/^\//, '')).replace(/\/\//g, '/');
  }
}
</script>


<style scoped>
/* 样式保持不变 */
.nest-menu .el-menu-item {
 padding-left: 40px !important; /* 调整嵌套菜单项的缩进 */
}
</style>

