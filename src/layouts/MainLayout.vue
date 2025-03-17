<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        router
      >
        <el-menu-item index="/admission">
          <el-icon><Document /></el-icon>
          <span>入院登记</span>
        </el-menu-item>
        <el-menu-item index="/ward">
          <el-icon><Notebook /></el-icon>
          <span>开立医嘱</span>
        </el-menu-item>
        <el-menu-item index="/nursing">
          <el-icon><FirstAidKit /></el-icon>
          <span>医嘱执行</span>
        </el-menu-item>
        <el-menu-item index="/examination">
          <el-icon><Files /></el-icon>
          <span>检验结果录入</span>
        </el-menu-item>
        <el-menu-item index="/prescription">
          <el-icon><List /></el-icon>
          <span>处方查询</span>
        </el-menu-item>
        <el-menu-item index="/discharge">
          <el-icon><Right /></el-icon>
          <span>出院登记</span>
        </el-menu-item>
        <el-menu-item index="/dictionary">
          <el-icon><Right /></el-icon>
          <span>字典表维护</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header height="60px">
        <div class="header-content">
          <h2>医院住院管理系统</h2>
          <div class="user-info">
            <el-dropdown>
              <span class="user-dropdown">
                管理员 <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Document,
  Notebook,
  FirstAidKit,
  Files,
  List,
  Right,
  ArrowDown
} from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.el-aside {
  background-color: #304156;
  color: #fff;
}

.el-menu-vertical {
  border-right: none;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.user-info {
  cursor: pointer;
}

.user-dropdown {
  display: flex;
  align-items: center;
  color: #606266;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
.el-main>div{
  background-color: #fff;
}
</style>