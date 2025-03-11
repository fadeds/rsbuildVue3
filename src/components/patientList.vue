<template>
  <div class="patient-list">
    <div class="search-bar">
      <el-input v-model="searchKey" placeholder="姓名" style="width: 200px" />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    
    <el-table :data="patientList" style="width: 100%" height="calc(100vh - 180px)">
      <el-table-column prop="hospitalNo" label="住院号" width="100" />
      <el-table-column prop="patientId" label="病历号" width="100" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="bedNumber" label="床位号" width="100" />
      <el-table-column prop="department" label="就诊科室" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchKey = ref('')
const patientList = ref([])

const handleSearch = () => {
  // 实现搜索逻辑
}

// 向父组件暴露选中患者的方法
defineExpose({
  patientList
})
</script>

<style scoped>
.patient-list {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>