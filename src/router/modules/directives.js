// src/router/modules/directives.js
import Layout from '@/components/layout/Layout.vue'; // Import your main layout component

// Define routes for custom directive examples
const directivesRouter = {
  path: '/directives', // Base path for directive examples
  component: Layout,
  name: 'DirectiveExamples', // Unique route name for this section
  // Redirect to the first directive example (adjust if you have a different first one)
  redirect: '/directives/highlight',
  meta: {
    title: '自定义指令', // Title displayed in the sidebar menu
    icon: 'MagicStick', // Choose an appropriate Element Plus icon (e.g., 'MagicStick', 'Setting', 'Guide')
    alwaysShow: true    // Ensure this top-level menu is always visible
  },
  children: [
    // --- Add a route for each custom directive example page ---

    // Example for v-highlight directive
    {
      path: 'highlight', // Access path: /directives/highlight
      name: 'HighlightExample', // Unique route name
      // Dynamically import the corresponding example Vue component
      // Make sure 'HighlightExample.vue' exists in '@/views/directives/'
      component: () => import('@/views/directives/HighlightExample.vue'),
      meta: { title: 'v-highlight 示例' } // Title for the sub-menu item
    },

    // Example for v-debounce-click directive
    {
      path: 'debounce-click', // Access path: /directives/debounce-click
      name: 'DebounceClickExample',
      // Make sure 'DebounceClickExample.vue' exists in '@/views/directives/'
      component: () => import('@/views/directives/DebounceClickExample.vue'),
      meta: { title: 'v-debounce-click 示例' }
    },

    // Example for v-permission directive
    {
      path: 'permission', // Access path: /directives/permission
      name: 'PermissionExample',
      // Make sure 'PermissionExample.vue' exists in '@/views/directives/'
      component: () => import('@/views/directives/PermissionExample.vue'),
      meta: { title: 'v-permission 示例' }
    },

    // --- Add more routes for other custom directive examples below ---
    /*
    {
      path: 'your-directive-path', // e.g., 'copy-text'
      name: 'YourDirectiveExample', // e.g., 'CopyTextExample'
      component: () => import('@/views/directives/YourDirectiveExample.vue'), // e.g., '@/views/directives/CopyTextExample.vue'
      meta: { title: 'v-your-directive 示例' } // e.g., 'v-copy-text 示例'
    },
    */
  ]
};

export default directivesRouter;