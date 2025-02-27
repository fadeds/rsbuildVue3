<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="main-layout">
    <!-- 顶部导航 -->
    <header class="header">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>

    <!-- 侧边栏 -->
    <aside class="sidebar" v-if="showSidebar">
      <div class="sidebar-content">
        <router-link 
          v-for="menu in menus" 
          :key="menu.path" 
          :to="menu.path"
        >
          {{ menu.title }}
        </router-link>
      </div>
    </aside>

    <!-- 页面内容区 -->
    <main class="content">
      <router-view v-slot="{ Component }">
        <!-- 保持页面状态缓存 -->
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>

    <!-- 底部信息 -->
    <footer class="footer">
      <p>&copy; 2024 My Application</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: true,
      cachedViews: ['Home'], // 需要缓存的组件名
      menus: [
        { path: '/dashboard', title: '仪表盘' },
        { path: '/users', title: '用户管理' },
        { path: '/settings', title: '系统设置' }
      ]
    };
  }
};
</script>

<style scoped>
.main-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr 80px;
  min-height: 100vh;
}

.header {
  grid-area: header;
  background: #2c3e50;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.sidebar {
  grid-area: sidebar;
  background: #34495e;
  color: white;
  padding: 20px;
}

.content {
  grid-area: content;
  padding: 20px;
  background: #f5f6f8;
}

.footer {
  grid-area: footer;
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 20px;
}
</style>