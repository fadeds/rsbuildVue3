<template>
  <el-container>
    <el-aside width="400px">
      <PatientList ref="patientListRef" @selectPatient="selectPatient" />
    </el-aside>
    
    <el-main>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="admission-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="档案号" >
              <el-input v-model="form.zyh" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="patientName">
              <el-input v-model="form.patientName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex">
                <el-option
                  v-for="item in dicOption.性别"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号" prop="cardNo">
              <el-input v-model="form.cardNo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="诊断" prop="diagnosisCode1">
              <el-select v-model="form.diagnosisCode1">
                <el-option
                  v-for="item in dicOption.诊断"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="床位号" prop="bedNo">
              <el-select v-model="form.bedNo">
                <el-option
                  v-for="item in dicOption.床位"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="过敏史" prop="contactHistory">
              <el-input v-model="form.contactHistory" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="既往史" prop="history">
              <el-input v-model="form.history" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="科室" prop="department">
              <el-select v-model="form.department">
                <el-option
                  v-for="item in dicOption.科室"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主治医生" prop="doctor">
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
import {inHospital} from '@/api/admission'

const patientListRef = ref(null)
const formRef = ref(null)
const form = ref({
  patientNo: '',
  patientName: '',
  sex: '',
  cardNo: '',
  zyh: '',
  extend: '',
  bedNo: '',
  contactHistory: '',
  history: '',
  department: '',
  doctor: '',
  diagnosisCode1: ''
})
const rules = ref({
  patientName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  cardNo: [{ required: true, message: '请输入证件号', trigger: 'blur' }],
  bedNo: [{ required: true, message: '请输入床位号', trigger: 'blur' }],
  department: [{ required: true, message: '请选择科室', trigger: 'change' }],
  doctor: [{ required: true, message: '请输入主治医生', trigger: 'blur' }],
  diagnosisCode1: [{ required: true, message: '请选择诊断', trigger: 'change' }],
  contactHistory: [{ required: true, message: '请输入过敏史', trigger: 'blur' }],
  history: [{ required: true, message: '请输入既往史', trigger: 'blur' }],  
  patientNo: [{ required: true, message: '请输入档案号', trigger: 'blur' }],
  patientName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  zyh: [{ required: true, message: '请输入档案号', trigger: 'blur' }],
})
const dicOption = JSON.parse(localStorage.getItem("dicOption"))

const selectPatient = (row) => {
  form.value = row
}
const handleSubmit =  () => {
  formRef.value.validate(async(valid) => {
    if (valid) {
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
        if(res.code === 0){
          ElMessage.success('保存成功')
          patientListRef.value.getList()
          resetForm()
        }
      }catch(e){
        ElMessage.error('保存失败')
      }
    } 
  })
}

const resetForm = () => {
  formRef.value.resetFields()
  
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