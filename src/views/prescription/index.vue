<template>
  <el-container>
    <el-aside width="400px">
      <div class="patient-list">
        <div class="search-bar">
          <el-input v-model="searchKey" placeholder="住院号" style="width: 200px" />
        </div>
        <el-table :data="patientList" style="width: 100%; height: calc(100vh - 180px)">
          <el-table-column prop="hospitalNo" label="住院号" />
          <el-table-column prop="patientId" label="档案号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="bedNo" label="科室" />
          <el-table-column prop="status" label="是否在院" />
        </el-table>
      </div>
    </el-aside>

    <el-main>
      <div class="prescription-content">
        <el-table 
          :data="prescriptionList" 
          style="width: 100%"
          :border="true"
          height="calc(100vh - 100px)"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="prescriptionNo" label="处方号" width="120" />
          <el-table-column prop="medicineName" label="药品名称" width="150" />
          <el-table-column prop="specification" label="规格" width="120" />
          <el-table-column prop="dosage" label="用量" width="100" />
          <el-table-column prop="frequency" label="频次" width="100" />
          <el-table-column prop="route" label="用药途径" width="120" />
          <el-table-column prop="duration" label="用药天数" width="100" />
          <el-table-column prop="totalAmount" label="总量" width="100" />
          <el-table-column prop="status" label="状态" width="100" />
          <el-table-column prop="doctor" label="开方医生" width="120" />
          <el-table-column prop="createTime" label="开方时间" width="160" />
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'

const searchKey = ref('')
const patientList = ref([])
const prescriptionList = ref([])

// 搜索患者
const handleSearch = () => {
  // 实现搜索逻辑
}

// 获取处方列表
const getPrescriptionList = (patientId) => {
  // 实现获取处方列表逻辑
}
</script>

<style scoped>
.patient-list {
  padding: 20px;
  height: 100%;
  background-color: #fff;
}

.search-bar {
  margin-bottom: 20px;
}

.prescription-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.el-aside {
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
}

:deep(.el-table__header) {
  background-color: #f5f7fa;
}

:deep(.el-table--border) {
  border: 1px solid #dcdfe6;
}
</style>