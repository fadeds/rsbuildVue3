<template>
  <el-container>
    <el-aside width="400px">
      <PatientList @select="handlePatientSelect" />
    </el-aside>
    
    <el-main>
      <PatientInfo :patient-info="currentPatient" />

      <div class="order-content">
        <el-table 
          :data="orderList" 
          style="width: 100%"
          :border="true"
        >
          <el-table-column prop="orderNo" label="医嘱号" width="100" />
          <el-table-column prop="groupNo" label="组号" width="80" />
          <el-table-column prop="orderContent" label="医嘱内容" />
          <el-table-column prop="startTime" label="开始时间" width="160" />
          <el-table-column prop="operation" label="操作" width="100">
            <template #default>
              <el-button type="text">执行</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="operation-panel">
          <div class="time-buttons">
            <el-button @click="handleBatchExecute">批量执行</el-button>
            <el-button @click="handleStartTime">开始时间</el-button>
            <el-button @click="handleEndTime">结束时间</el-button>
          </div>

          <div class="medicine-input">
            <el-input v-model="medicineInfo" placeholder="药品名称" />
            <el-input v-model="medicineAmount" placeholder="药品数量" style="width: 150px" />
            <el-input v-model="medicineUnit" placeholder="药品单位" style="width: 150px" />
          </div>

          <MedicineActions />
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import PatientList from '@/components/PatientList.vue'
import PatientInfo from '@/components/PatientInfo.vue'
import MedicineActions from '@/components/MedicineActions.vue'

const currentPatient = ref({})
const orderList = ref([])
const medicineInfo = ref('')
const medicineAmount = ref('')
const medicineUnit = ref('')

const handlePatientSelect = (patient) => {
  currentPatient.value = patient
  // 获取该患者的医嘱列表
  getOrderList(patient.patientId)
}

const handleBatchExecute = () => {
  // 实现批量执行逻辑
}

const handleStartTime = () => {
  // 实现开始时间设置逻辑
}

const handleEndTime = () => {
  // 实现结束时间设置逻辑
}

const getOrderList = (patientId) => {
  // 获取医嘱列表逻辑
}
</script>

<style scoped>
.order-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.operation-panel {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.time-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.medicine-input {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>