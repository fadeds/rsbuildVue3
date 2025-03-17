<template>
  <div class="patient-list">
    <div class="search-bar">
      <el-input v-model="params" placeholder="姓名" style="width: 200px" />
      <el-button type="primary" @click="getList">搜索</el-button>
    </div>
    
    <el-table :data="patientList" style="width: 100%" height="calc(100vh - 180px)">
      <el-table-column prop="patientId" label="档案号" width="100" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="cardNo" label="证件号" width="100" />
      <el-table-column prop="bedNumber" label="床位号" width="100" />
      <el-table-column prop="department" label="科室" />
      <el-table-column prop="department" label="是否在院" />
    </el-table>
  </div>
</template>

<script setup>
import {getList,save,deleteData,update,info } from '@/api/patientinfo.js'
import { onMounted, ref } from 'vue'

const params = ref('')
const patientList = ref([])

onMounted(() => {
  // 获取患者列表
  initList()
})
function initList(){
  getList({params:params.value}).then(res => {
    patientList.value = res.row
  })
}
// 向父组件暴露选中患者的方法
defineExpose({
  patientList,
  getList:initList
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