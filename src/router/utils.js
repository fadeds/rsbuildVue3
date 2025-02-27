export function generateRoutes() {
  const routes = [];

  // 1. 获取所有视图组件
  const req = require.context(
    '../views',  // 扫描目录
    true,        // 递归查找子目录
    /\.vue$/,    // 匹配.vue文件
    'lazy'       // 启用懒加载
  );

  // 2. 遍历所有匹配文件
  req.keys().forEach((key) => {
    // 转换路径格式: ./home/index.vue → /home
    let routePath = key
      .replace(/^\.\//, '')     // 去除开头的./
      .replace(/\.vue$/, '')    // 去除.vue扩展名
      .replace(/\/index$/, ''); // 去除结尾的/index

    // 3. 处理动态路由参数
    // 将 [param] 转换为 :param
    routePath = routePath.replace(/$$(\w+)$$/g, ':$1');

    // 4. 生成路由配置
    routes.push({
      path: `/${routePath}`,
      name: routePath.replace(/\//g, '-'), // 生成路由名称 home-index
      component: () => req(key),           // 保持懒加载
      meta: { requiresAuth: true }         // 自定义元数据
    });
  });
 

  // // 返回根路由数组
  // return [{
  //   path: '/',
  //   component: () => import('@/layouts/MainLayout.vue'),
  //   children: nestedRoutes
  // }];
  return routes;
  
}