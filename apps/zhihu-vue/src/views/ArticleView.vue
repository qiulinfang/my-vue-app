<template>
  <div v-if="article">
    <h1>{{ article.title }}</h1>
    <p v-if="article.premium" style="color: gold;">⭐️ 订阅内容</p>
    <article>{{ article.content }}</article>
    <hr>
    <div>
      <h4>推荐阅读:</h4>
      <ul>
        <li v-for="item in recommended" :key="item.id">
          <router-link :to="`/article/${ .id}`">{{ item.title }}</router-link>
        </li>
      </ul>
    </div>
    <hr>
    <div>
      <h4>发表评论</h4>
      <textarea v-model="comment" placeholder="输入你的评论..." rows="5" cols="60"></textarea>
      <p v-if="isCommentDirty" style="color: orange;">评论有未保存的更改！</p>
    </div>
  </div>
  <div v-else>
    <h2>文章加载中...</h2>
  </div>
</template>

<script>
import { getArticleById } from '../api';

// 在选项式API中，组件内守卫是组件的选项
export default {
  // 我们通过 props 接收主要文章数据，这使得组件与数据获取解耦
  props: {
    article: Object
  },
  data() {
    return {
      recommended: [], // 推荐文章列表
      comment: '',
      isCommentDirty: false,
    }
  },
  watch: {
    // 监听评论框的变化，设置“脏”状态
    comment() {
      this.isCommentDirty = true;
    }
  },

  // --- 组件内守卫 1: beforeRouteEnter ---
  // 在渲染该组件的对应路由被验证前调用
  // 因为此时组件实例还未创建，所以不能获取组件实例 `this`
  beforeRouteEnter(to, from, next) {
    console.log('4. Component beforeRouteEnter: 组件进入前守卫');
    console.log('   - 此时 `this` 是 undefined');
    
    // 模拟获取推荐文章列表
    Promise.resolve([
      { id: 1, title: '推荐文章1' },
      { id: 2, title: '推荐文章2' }
    ]).then(recommendedPosts => {
      // next 的回调函数会在导航被确认，组件实例创建后执行
      // vm 就是组件实例 `this`
      next(vm => {
        console.log('   - beforeRouteEnter 的 next() 回调执行');
        vm.recommended = recommendedPosts;
      });
    });
  },

  // --- 组件内守卫 2: beforeRouteUpdate ---
  // 在当前路由改变，但是该组件被复用时调用
  // 例如，从 /article/1 导航到 /article/2
  async beforeRouteUpdate(to, from) {
    console.log('-> Component beforeRouteUpdate: 组件复用守卫');
    this.isCommentDirty = false; // 重置状态
    this.comment = '';
    // 因为 props 不会自动更新，我们需要在这里手动更新数据
    // 注意：在真实项目中，这里应该更新父组件传递的 prop，或者重新获取数据
    // 为了演示，我们直接修改 this.article，但这不是最佳实践
    this.$props.article = await getArticleById(to.params.id);
  },

  // --- 组件内守卫 3: beforeRouteLeave ---
  // 导航离开该组件的对应路由时调用
  beforeRouteLeave(to, from) {
    console.log('<- Component beforeRouteLeave: 组件离开守卫');
    if (this.isCommentDirty) {
      const answer = window.confirm('您有未保存的评论，确定要离开吗？');
      if (!answer) {
        return false; // 返回 false, 取消导航
      }
    }
    // 返回 true 或 undefined, 允许导航
    return true;
  }
}
</script>