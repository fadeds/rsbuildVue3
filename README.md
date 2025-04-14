# Rsbuild project

## Setup

Install the dependencies:

```bash
需先安装nodejs 20.0+ 依次运行下面命令

npm i cnpm -g
pnpm install
```

## Get started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```
## 文件目录
```
菜单在 layouts\MainLayout
  路由为 views下文件夹名称 
  创建路由只需要创建文件夹即可自动创建路由
  示例
    views\dictionary\index => MainLayout中路由为/dictionary
    views\dictionary\edit => MainLayout中路由为/dictionary/edit
    views\dictionary\detail => MainLayout中路由为/dictionary/detail
    ...
项目公共组件 src\components 已使用全局加载  参考其他组件使用格式使用 命名
  如 PatientList组件在 \views\admission\index  中的使用方式
```