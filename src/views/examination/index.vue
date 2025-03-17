<template>
  <el-container>
    <el-aside width="400px">
      <PatientList ref="patientListRef" />
    </el-aside>
    
    <el-main>
      <el-form :model="form" label-width="100px" class="examination-form">
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

        <el-table :data="examList" style="width: 100%; margin-top: 20px">
          <el-table-column prop="examNo" label="档案号" width="120" />
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="result" label="规格" width="120" />
          <el-table-column prop="resultStatus" label="是否完成" width="120" />
        </el-table>

        <div class="exam-detail" style="margin-top: 20px">
          <div class="exam-type">
            <el-input v-model="examDetail" placeholder="检验类型" style="width: 400px" />
            <el-button type="primary" style="margin-left: 10px">药品规格</el-button>
            <el-button>药品单位</el-button>
          </div>

          <div class="button-group" style="margin-top: 20px">
            <el-button size="small">中次用量</el-button>
            <el-button size="small">规格单位</el-button>
            <el-button size="small">用药频次</el-button>
            <el-button size="small">用法</el-button>
          </div>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'

const patientListRef = ref(null)
const examList = ref([])
const examDetail = ref('')

const form = ref({
  patientId: '',
  name: '',
  diagnosis: ''
})
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