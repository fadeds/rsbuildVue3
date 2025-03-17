import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router';
import { generateRoutes } from './utils';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/admission",
    },
    // 自动生成路由
    ...generateRoutes(),

    // 手动补充特殊路由
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
})

// 路由守卫示例
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'My App';
  next();
});
export default router;