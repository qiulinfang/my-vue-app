// src/router/modules/components.js
import {Layout }from 'myComponent'; // Your main layout component

const componentsRouter = {
  path: '/components', // Base path for component examples
  component: Layout,
  name: 'ComponentExamples', // Unique route name
  // Redirect to the first component example or an overview page if you create one
  redirect: '/components/button',
  meta: {
    title: '基本组件', // Title in the sidebar
    icon: 'Menu',      // Choose an Element Plus icon
    alwaysShow: true   // Ensure this top-level menu is always visible
  },
  children: [
    // --- Basic ---
    {
      path: 'button', // /components/button
      name: 'ButtonExample',
      component: () => import('@/views/components/ButtonExample.vue'),
      meta: { title: 'Button 按钮' }
    },
    {
        path: 'border', // /components/border
        name: 'BorderExample',
        component: () => import('@/views/components/BorderExample.jsx'),
        meta: { title: 'Border 边框' }
    },
    {
        path: 'color', // /components/color
        name: 'ColorExample',
        component: () => import('@/views/components/ColorExample.vue'),
        meta: { title: 'Color 色彩' }
    },
    {
        path: 'container', // /components/container
        name: 'ContainerExample',
        component: () => import('@/views/components/ContainerExample.vue'),
        meta: { title: 'Container 布局容器' }
    },
    {
        path: 'icon', // /components/icon
        name: 'IconExample',
        component: () => import('@/views/components/IconExample.vue'),
        meta: { title: 'Icon 图标' }
    },
    {
        path: 'layout', // /components/layout (Note: distinct from the main Layout)
        name: 'LayoutGridExample', // Renamed to avoid conflict if needed
        component: () => import('@/views/components/LayoutGridExample.vue'),
        meta: { title: 'Layout 栅格布局' }
    },
    {
        path: 'link', // /components/link
        name: 'LinkExample',
        component: () => import('@/views/components/LinkExample.vue'),
        meta: { title: 'Link 链接' }
    },
    {
        path: 'scrollbar', // /components/scrollbar
        name: 'ScrollbarExample',
        component: () => import('@/views/components/ScrollbarExample.vue'),
        meta: { title: 'Scrollbar 滚动条' }
    },
    {
        path: 'space', // /components/space
        name: 'SpaceExample',
        component: () => import('@/views/components/SpaceExample.vue'),
        meta: { title: 'Space 间距' }
    },
    {
        path: 'typography', // /components/typography
        name: 'TypographyExample',
        component: () => import('@/views/components/TypographyExample.vue'),
        meta: { title: 'Typography 字体排印' }
    },

    // --- Form ---
    {
      path: 'input', // /components/input
      name: 'InputExample',
      component: () => import('@/views/components/InputExample.vue'),
      meta: { title: 'Input 输入框' }
    },
    {
        path: 'autocomplete', // /components/autocomplete
        name: 'AutocompleteExample',
        component: () => import('@/views/components/AutocompleteExample.vue'),
        meta: { title: 'Autocomplete 自动补全输入框' }
    },
    {
        path: 'cascader', // /components/cascader
        name: 'CascaderExample',
        component: () => import('@/views/components/CascaderExample.vue'),
        meta: { title: 'Cascader 级联选择器' }
    },
    {
        path: 'checkbox', // /components/checkbox
        name: 'CheckboxExample',
        component: () => import('@/views/components/CheckboxExample.vue'),
        meta: { title: 'Checkbox 多选框' }
    },
    {
        path: 'colorPicker', // /components/colorPicker
        name: 'ColorPickerExample',
        component: () => import('@/views/components/ColorPickerExample.vue'),
        meta: { title: 'ColorPicker 颜色选择器' }
    },
    {
        path: 'datePicker', // /components/datePicker
        name: 'DatePickerExample',
        component: () => import('@/views/components/DatePickerExample.vue'),
        meta: { title: 'DatePicker 日期选择器' }
    },
    {
        path: 'dateTimePicker', // /components/dateTimePicker
        name: 'DateTimePickerExample',
        component: () => import('@/views/components/DateTimePickerExample.vue'),
        meta: { title: 'DateTimePicker 日期时间选择器' }
    },
    {
        path: 'form', // /components/form
        name: 'FormExample',
        component: () => import('@/views/components/FormExample.vue'),
        meta: { title: 'Form 表单' }
    },
    {
        path: 'inputNumber', // /components/inputNumber
        name: 'InputNumberExample',
        component: () => import('@/views/components/InputNumberExample.vue'),
        meta: { title: 'InputNumber 数字输入框' }
    },
    {
        path: 'radio', // /components/radio
        name: 'RadioExample',
        component: () => import('@/views/components/RadioExample.vue'),
        meta: { title: 'Radio 单选框' }
    },
    {
        path: 'rate', // /components/rate
        name: 'RateExample',
        component: () => import('@/views/components/RateExample.vue'),
        meta: { title: 'Rate 评分' }
    },
    {
        path: 'select', // /components/select
        name: 'SelectExample',
        component: () => import('@/views/components/SelectExample.vue'),
        meta: { title: 'Select 选择器' }
    },
    {
        path: 'selectV2', // /components/selectV2
        name: 'SelectV2Example',
        component: () => import('@/views/components/SelectV2Example.vue'),
        meta: { title: 'SelectV2 虚拟列表选择器' }
    },
    {
        path: 'slider', // /components/slider
        name: 'SliderExample',
        component: () => import('@/views/components/SliderExample.vue'),
        meta: { title: 'Slider 滑块' }
    },
    {
        path: 'switch', // /components/switch
        name: 'SwitchExample',
        component: () => import('@/views/components/SwitchExample.vue'),
        meta: { title: 'Switch 开关' }
    },
    {
        path: 'timePicker', // /components/timePicker
        name: 'TimePickerExample',
        component: () => import('@/views/components/TimePickerExample.vue'),
        meta: { title: 'TimePicker 时间选择器' }
    },
    {
        path: 'timeSelect', // /components/timeSelect
        name: 'TimeSelectExample',
        component: () => import('@/views/components/TimeSelectExample.vue'),
        meta: { title: 'TimeSelect 时间选择' }
    },
    {
        path: 'transfer', // /components/transfer
        name: 'TransferExample',
        component: () => import('@/views/components/TransferExample.vue'),
        meta: { title: 'Transfer 穿梭框' }
    },
    {
        path: 'upload', // /components/upload
        name: 'UploadExample',
        component: () => import('@/views/components/UploadExample.vue'),
        meta: { title: 'Upload 上传' }
    },

    // --- Data ---
    {
        path: 'avatar', // /components/avatar
        name: 'AvatarExample',
        component: () => import('@/views/components/AvatarExample.vue'),
        meta: { title: 'Avatar 头像' }
    },
    {
        path: 'badge', // /components/badge
        name: 'BadgeExample',
        component: () => import('@/views/components/BadgeExample.vue'),
        meta: { title: 'Badge 徽章' }
    },
    {
        path: 'calendar', // /components/calendar
        name: 'CalendarExample',
        component: () => import('@/views/components/CalendarExample.vue'),
        meta: { title: 'Calendar 日历' }
    },
    {
        path: 'card', // /components/card
        name: 'CardExample',
        component: () => import('@/views/components/CardExample.vue'),
        meta: { title: 'Card 卡片' }
    },
    {
        path: 'carousel', // /components/carousel
        name: 'CarouselExample',
        component: () => import('@/views/components/CarouselExample.vue'),
        meta: { title: 'Carousel 走马灯' }
    },
    {
        path: 'collapse', // /components/collapse
        name: 'CollapseExample',
        component: () => import('@/views/components/CollapseExample.vue'),
        meta: { title: 'Collapse 折叠面板' }
    },
    {
        path: 'descriptions', // /components/descriptions
        name: 'DescriptionsExample',
        component: () => import('@/views/components/DescriptionsExample.vue'),
        meta: { title: 'Descriptions 描述列表' }
    },
    {
        path: 'empty', // /components/empty
        name: 'EmptyExample',
        component: () => import('@/views/components/EmptyExample.vue'),
        meta: { title: 'Empty 空状态' }
    },
    {
        path: 'image', // /components/image
        name: 'ImageExample',
        component: () => import('@/views/components/ImageExample.vue'),
        meta: { title: 'Image 图片' }
    },
    {
        path: 'infiniteScroll', // /components/infiniteScroll
        name: 'InfiniteScrollExample',
        component: () => import('@/views/components/InfiniteScrollExample.vue'),
        meta: { title: 'InfiniteScroll 无限滚动' }
    },
    {
        path: 'pagination', // /components/pagination
        name: 'PaginationExample',
        component: () => import('@/views/components/PaginationExample.vue'),
        meta: { title: 'Pagination 分页' }
    },
    {
        path: 'progress', // /components/progress
        name: 'ProgressExample',
        component: () => import('@/views/components/ProgressExample.vue'),
        meta: { title: 'Progress 进度条' }
    },
    {
        path: 'result', // /components/result
        name: 'ResultExample',
        component: () => import('@/views/components/ResultExample.vue'),
        meta: { title: 'Result 结果' }
    },
    {
        path: 'skeleton', // /components/skeleton
        name: 'SkeletonExample',
        component: () => import('@/views/components/SkeletonExample.vue'),
        meta: { title: 'Skeleton 骨架屏' }
    },
    {
        path: 'table', // /components/table
        name: 'TableExample',
        component: () => import('@/views/components/TableExample.vue'),
        meta: { title: 'Table 表格' }
    },
    {
        path: 'tableV2', // /components/tableV2
        name: 'TableV2Example',
        component: () => import('@/views/components/TableV2Example.vue'),
        meta: { title: 'TableV2 虚拟化表格' }
    },
    {
        path: 'tag', // /components/tag
        name: 'TagExample',
        component: () => import('@/views/components/TagExample.vue'),
        meta: { title: 'Tag 标签' }
    },
    {
        path: 'timeline', // /components/timeline
        name: 'TimelineExample',
        component: () => import('@/views/components/TimelineExample.vue'),
        meta: { title: 'Timeline 时间线' }
    },
    {
        path: 'tree', // /components/tree
        name: 'TreeExample',
        component: () => import('@/views/components/TreeExample.vue'),
        meta: { title: 'Tree 树形控件' }
    },
    {
        path: 'treeSelect', // /components/treeSelect
        name: 'TreeSelectExample',
        component: () => import('@/views/components/TreeSelectExample.vue'),
        meta: { title: 'TreeSelect 树形选择' }
    },
    {
        path: 'treeV2', // /components/treeV2
        name: 'TreeV2Example',
        component: () => import('@/views/components/TreeV2Example.vue'),
        meta: { title: 'TreeV2 虚拟化树形控件' }
    },

    // --- Navigation ---
    {
        path: 'affix', // /components/affix
        name: 'AffixExample',
        component: () => import('@/views/components/AffixExample.vue'),
        meta: { title: 'Affix 固钉' }
    },
    {
        path: 'backtop', // /components/backtop
        name: 'BacktopExample',
        component: () => import('@/views/components/BacktopExample.vue'),
        meta: { title: 'Backtop 回到顶部' }
    },
    {
        path: 'breadcrumb', // /components/breadcrumb
        name: 'BreadcrumbExample',
        component: () => import('@/views/components/BreadcrumbExample.vue'),
        meta: { title: 'Breadcrumb 面包屑' }
    },
    {
        path: 'dropdown', // /components/dropdown
        name: 'DropdownExample',
        component: () => import('@/views/components/DropdownExample.vue'),
        meta: { title: 'Dropdown 下拉菜单' }
    },
    {
        path: 'menu', // /components/menu
        name: 'MenuExample',
        component: () => import('@/views/components/MenuExample.vue'),
        meta: { title: 'Menu 菜单' }
    },
    {
        path: 'pageHeader', // /components/pageHeader
        name: 'PageHeaderExample',
        component: () => import('@/views/components/PageHeaderExample.vue'),
        meta: { title: 'PageHeader 页头' }
    },
    {
        path: 'steps', // /components/steps
        name: 'StepsExample',
        component: () => import('@/views/components/StepsExample.vue'),
        meta: { title: 'Steps 步骤条' }
    },
    {
        path: 'tabs', // /components/tabs
        name: 'TabsExample',
        component: () => import('@/views/components/TabsExample.vue'),
        meta: { title: 'Tabs 标签页' }
    },

    // --- Feedback ---
    {
        path: 'alert', // /components/alert
        name: 'AlertExample',
        component: () => import('@/views/components/AlertExample.vue'),
        meta: { title: 'Alert 警告' }
    },
    {
        path: 'dialog', // /components/dialog
        name: 'DialogExample',
        component: () => import('@/views/components/DialogExample.vue'),
        meta: { title: 'Dialog 对话框' }
    },
    {
        path: 'drawer', // /components/drawer
        name: 'DrawerExample',
        component: () => import('@/views/components/DrawerExample.vue'),
        meta: { title: 'Drawer 抽屉' }
    },
    {
        path: 'loading', // /components/loading
        name: 'LoadingExample',
        component: () => import('@/views/components/LoadingExample.vue'),
        meta: { title: 'Loading 加载' }
    },
    {
        path: 'message', // /components/message
        name: 'MessageExample',
        component: () => import('@/views/components/MessageExample.vue'),
        meta: { title: 'Message 消息提示' }
    },
    {
        path: 'messageBox', // /components/messageBox
        name: 'MessageBoxExample',
        component: () => import('@/views/components/MessageBoxExample.vue'),
        meta: { title: 'MessageBox 弹框' }
    },
    {
        path: 'notification', // /components/notification
        name: 'NotificationExample',
        component: () => import('@/views/components/NotificationExample.vue'),
        meta: { title: 'Notification 通知' }
    },
    {
        path: 'popconfirm', // /components/popconfirm
        name: 'PopconfirmExample',
        component: () => import('@/views/components/PopconfirmExample.vue'),
        meta: { title: 'Popconfirm 气泡确认框' }
    },
    {
        path: 'popover', // /components/popover
        name: 'PopoverExample',
        component: () => import('@/views/components/PopoverExample.vue'),
        meta: { title: 'Popover 气泡卡片' }
    },
    {
        path: 'tooltip', // /components/tooltip
        name: 'TooltipExample',
        component: () => import('@/views/components/TooltipExample.vue'),
        meta: { title: 'Tooltip 文字提示' }
    },

    // --- Others ---
    {
        path: 'configProvider', // /components/configProvider
        name: 'ConfigProviderExample',
        component: () => import('@/views/components/ConfigProviderExample.vue'),
        meta: { title: 'ConfigProvider 全局配置' }
    },
    {
        path: 'divider', // /components/divider
        name: 'DividerExample',
        component: () => import('@/views/components/DividerExample.vue'),
        meta: { title: 'Divider 分割线' }
    },

    // --- Your Custom/Additional Examples ---
    {
      path: 'MultiLang', // /components/MultiLang (from your original example)
      name: 'MultiLang',
      component: () => import('@/views/components/MultiLangExample.vue'),
      meta: { title: 'MultiLang 多语言' }
    },
    // ... Add more custom component examples if needed
  ]
};

export default componentsRouter;