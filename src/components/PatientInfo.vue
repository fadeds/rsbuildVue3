<template>
  <el-form :model="form" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="病历号">
          <el-input v-model="form.patientId" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="姓名">
          <el-input v-model="form.name" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="诊断">
          <el-input v-model="form.diagnosis" disabled />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  patientInfo: {
    type: Object,
    default: () => ({})
  }
})

const form = ref(props.patientInfo)
</script>