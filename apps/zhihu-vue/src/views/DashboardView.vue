<template>
  <div>
    <h2>用户中心</h2>
    <p>欢迎来到您的个人中心。</p>
    <nav>
      <router-link to="/dashboard/profile">我的个人资料</router-link> |
      <router-link to="/dashboard/settings">账户设置</router-link>
    </nav>
    <hr>
    <router-view></router-view>
  </div>
</template>