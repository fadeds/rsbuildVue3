<template>
  <div class="patient-list">
    <div class="search-bar">
      <el-input v-model="zyh" placeholder="住院号" style="width: 200px" @keyup.enter="initList" />
      <el-button type="primary" @click="initList">搜索</el-button>
    </div>
    
    <el-table :data="patientList" style="width: 100%" height="calc(100vh - 180px)" highlight-current-row @row-click="onRowClick">
      <el-table-column prop="zyh" label="住院号" width="120" />
        <el-table-column prop="prescriptionNo" label="处方号" width="120" />
        <el-table-column prop="itemName" label="诊疗项目" width="120" >
          <template #default="scope">
            {{scope.row.itemCode&&dicOption.find(item => item.drugCode == scope.row.itemCode)?.drugName}}
          </template>
        </el-table-column>
        <el-table-column prop="itemCode" label="诊疗编码" width="120" />
        <el-table-column prop="prescriptionTime" label="处方日期" width="120" />
    </el-table>
  </div>
</template>

<script setup>
import {getList, } from '@/api/prescription'
import { druglist } from '@/api/ward'

const zyh = ref(null)
const patientList = ref([])
const emit = defineEmits(['selectPatient'])
const dicOption = ref({})
onMounted(() => {
  // 获取患者列表
  initList()
  druglist({}).then(res => {
    dicOption.value = res.data
  })
})
function initList(){
  getList({
    zyh:zyh.value,
    itemType:2
  }).then(res => {
    patientList.value = res.rows
  })
}
function onRowClick(row){
  // 向父组件暴露选中患者的方法
  emit('selectPatient', row)
}
// 向父组件暴露选中患者的方法
defineExpose({
  patientList,
  getList:initList
})
</script>

<style scoped>
.patient-list {
  padding: 20px;
  /* height: 100%; */
  box-sizing: border-box;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>