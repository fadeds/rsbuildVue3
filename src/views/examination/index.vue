<template>
  <el-container>
    <el-aside width="400px">
      <!-- <PatientList ref="patientListRef" /> -->
      <PrescriptionList @selectPatient="handlePatientSelect" />
    </el-aside>
    
    <el-main>
      <el-form :model="form" label-width="100px" class="examination-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="住院号">
               {{ form.zyh }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处方号">
              {{ form.prescriptionNo }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="诊疗项目">
              {{form.itemCode&& drugOption.find(item => item.drugCode == form.itemCode)?.drugName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="诊疗编码">
              {{ form.itemCode }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="检查结果">
                <el-input type="textarea" v-model="form.itemResult" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
          <el-form-item label="参考值">
                <el-input type="textarea" v-model="form.referValue" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button el-button type="primary" @click="saveExamination">保存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>

import {getList,save,deleteData,update,info } from '@/api/examination'
import {getList as getPrescriptionList } from '@/api/prescription'
import { druglist } from '@/api/ward'

const drugOption = ref({})
const form = ref({
 itemCode:null,
 itemResult:null,
 referValue:null,
 prescriptionNo:null,
 zyh:null
})
const patientList = ref([])
const handlePatientSelect = (row) => {
  form.value = row
}
onMounted(()=>{
  getPrescriptionList({}).then(res=>{
    patientList.value = res.rows
  })
  druglist({}).then(res=>{
    drugOption.value = res.data
  })
})
function saveExamination(){
  save(form.value).then(res=>{
    if(res.code == 0){
      ElMessage.success('保存成功')
      form.value = {
        itemCode:null,
        itemResult:null,
        referValue:null,
        prescriptionNo:null,
        zyh:null
      }
    }else{
      ElMessage.error('保存失败')
    }
  })
}
</script>

<style scoped>
.examination-form {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.exam-detail {
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.exam-type {
  display: flex;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 10px;
}

.el-aside {
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
}
</style>