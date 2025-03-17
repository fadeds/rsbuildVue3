<template>
  <div class="discharge-page">
    <div class="search-section">
      <el-card>
        <div class="search-form">
          <el-form :inline="true" :model="searchForm">
            <el-form-item label="住院号">
              <el-input v-model="searchForm.hospitalNo" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="在院状态">
              <el-input v-model="searchForm.status" placeholder="请输入" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <div class="table-section">
      <el-card>
        <el-table :data="patientList" style="width: 100%">
          <el-table-column prop="name" label="患者姓名" />
          <el-table-column prop="hospitalNo" label="住院号" />
          <el-table-column prop="diagnosis" label="诊断" />
          <el-table-column prop="diagnosis2" label="诊断" />
          <el-table-column prop="department" label="科室" />
          <el-table-column prop="doctor" label="住院医生" />
          <el-table-column prop="dischargeDate" label="出院时间" />
          <el-table-column prop="status" label="是否在院" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {getList,save,deleteData,update,info } from '@/api/dictionary.js'

const searchForm = ref({
  hospitalNo: '',
  status: ''
})

const patientList = ref([
  // 示例数据
  {
    name: '张三',
    hospitalNo: 'ZY2024001',
    diagnosis: '感冒',
    diagnosis2: '发烧',
    department: '内科',
    doctor: '李医生',
    dischargeDate: '2024-01-20',
    status: '在院'
  }
])

const handleSearch = () => {
  // 实现搜索逻辑
  console.log('搜索条件：', searchForm.value)
}
</script>

<style scoped>
.discharge-page {
  padding: 20px;
}

.search-section {
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-section {
  background-color: #fff;
}

.el-card {
  margin-bottom: 20px;
}
</style>