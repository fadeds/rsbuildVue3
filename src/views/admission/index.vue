<template>
  <el-container>
    <el-aside width="400px">
      <PatientList ref="patientListRef" />
    </el-aside>
    
    <el-main>
      <el-form :model="form" label-width="100px" class="admission-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="病历号">
              <el-input v-model="form.patientId" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="诊断">
              <el-input v-model="form.diagnosis" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="床位号">
              <el-input v-model="form.bedNumber" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系史">
              <el-input v-model="form.contactHistory" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="既往史">
              <el-input v-model="form.medicalHistory" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="科室">
              <el-input v-model="form.department" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主治医生">
              <el-input v-model="form.doctor" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">住院登记</el-button>
          <el-button @click="resetForm">返回</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
// import PatientList from '@/components/PatientList.vue'

const patientListRef = ref(null)

const form = ref({
  patientId: '',
  name: '',
  diagnosis: '',
  bedNumber: '',
  contactHistory: '',
  medicalHistory: '',
  department: '',
  doctor: ''
})

const handleSubmit = () => {
  // 实现提交逻辑
}

const resetForm = () => {
  form.value = {
    patientId: '',
    name: '',
    diagnosis: '',
    bedNumber: '',
    contactHistory: '',
    medicalHistory: '',
    department: '',
    doctor: ''
  }
}
</script>

<style scoped>
.admission-form {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.el-aside {
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
}
</style>