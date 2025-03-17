<template>
  <el-container>
    <el-aside width="400px">
      <PatientList ref="patientListRef" />
    </el-aside>
    
    <el-main>
      <el-form :model="form" label-width="100px" class="ward-form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="档案号">
              <el-input v-model="form.patientId" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="诊断">
              <el-input v-model="form.diagnosis" />
            </el-form-item>
          </el-col>
        </el-row>

        <div class="order-type">
          <el-radio-group v-model="orderType">
            <el-radio :label="0">长期医嘱</el-radio>
            <el-radio :label="1">临时医嘱</el-radio>
          </el-radio-group>
        </div>

        <el-table :data="orderList" style="width: 100%">
          <el-table-column prop="orderNo" label="医嘱号" width="120" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="spec" label="规格" width="150" />
          <el-table-column prop="usage" label="用法用量" width="200" />
        </el-table>

        <div class="order-detail">
          <el-input v-model="orderDetail" placeholder="医嘱内容" />
          <div class="button-group">
            <el-button type="primary" size="small">药品用法</el-button>
            <el-button type="primary" size="small">用药频率</el-button>
            <el-button type="primary" size="small">用药途径</el-button>
            <el-button type="primary" size="small">用法</el-button>
          </div>
        </div>

        <div class="action-buttons">
          <el-button type="primary" @click="handleSubmit">保存</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
// import PatientList from '../../components/PatientList.vue'

const patientListRef = ref(null)
const orderType = ref(0)
const orderDetail = ref('')
const orderList = ref([])

const form = ref({
  patientId: '',
  name: '',
  diagnosis: ''
})

const handleSubmit = () => {
  // 实现保存逻辑
}

const handleReset = () => {
  orderDetail.value = ''
  // 重置其他相关数据
}
</script>

<style scoped>
.ward-form {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.order-type {
  margin: 20px 0;
}

.order-detail {
  margin: 20px 0;
}

.button-group {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.action-buttons {
  margin-top: 20px;
  text-align: center;
}

.el-aside {
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
}
</style>