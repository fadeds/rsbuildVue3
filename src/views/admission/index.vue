<template>
  <el-container>
    <el-aside width="400px">
      <PatientList ref="patientListRef" />
    </el-aside>
    
    <el-main>
      <el-form :model="form" label-width="100px" class="admission-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="档案号">
              <el-input v-model="form.patientNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.patientName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别">
              <el-input v-model="form.sex" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号">
              <el-input v-model="form.cardNo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="诊断">
              <el-input v-model="form.extend" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="床位号">
              <el-input v-model="form.bedNo" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="过敏史">
              <el-input v-model="form.contactHistory" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="既往史">
              <el-input v-model="form.history" />
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
          <el-button type="primary" @click="handleSubmit">保存信息</el-button>
          <el-button @click="resetForm">清 空</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import {inHospital} from '@/api/admission'

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

const handleSubmit = async () => {
  let params = {
    inHospital:{
      ...form.value
    },
    patientInfo: {
      ...form.value
    }
  }
  try{
    const res = await inHospital(params)
    if(res.code === 200){
      ElMessage.success('保存成功')
      patientListRef.value.getList()
      resetForm()
    }
  }catch(e){
    console.log(e)
  }
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