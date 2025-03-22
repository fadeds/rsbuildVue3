<template>
  <el-form :model="form" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="档案号：">
          {{props.patientInfo.zyh}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="姓名：">
          {{props.patientInfo.patientName}}
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="诊断：">
          {{ dicOption.诊断.find(item => item.code == props.patientInfo.diagnosisCode1)?.name }}
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
const dicOption = JSON.parse(localStorage.getItem("dicOption"))

const props = defineProps({
  patientInfo: {
    type: Object,
    default: () => ({})
  }
})

const form = ref(props.patientInfo)
</script>
<style scoped>
.el-form {
  padding: 20px 20px 0 0;
  background-color: var(--el-color-white);
}
</style>