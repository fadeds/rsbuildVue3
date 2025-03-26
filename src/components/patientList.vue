<template>
  <div class="patient-list">
    <div class="search-bar">
      <el-input v-model="searchForm.patientName" placeholder="姓名" style="width: 200px" @keyup.enter="initList" />
      <el-button type="primary" @click="initList">搜索</el-button>
    </div>
    
    <el-table :data="patientList" style="width: 100%" height="calc(100vh - 180px)" highlight-current-row @row-click="onRowClick">
      <el-table-column prop="zyh" label="档案号" width="100" />
      <el-table-column prop="patientName" label="姓名" width="100" />
      <el-table-column prop="cardNo" label="证件号" width="100" />
      <el-table-column prop="bedNo" label="床位号" width="100">
        <!-- <template #default="scope">
          {{ bedList.find(item => item.bed == scope.row.bedNo)?.bed }}
        </template> -->
      </el-table-column>
      <el-table-column prop="department" label="科室">
        <template #default="scope">
          {{ dicOption.科室.find(item => item.code == scope.row.department)?.name }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {getList,getHospitalList,save,deleteData,update,info } from '@/api/patientinfo.js'
const dicOption = JSON.parse(localStorage.getItem("dicOption"))
// import { getBedList } from "@/api/bedInfo"
// const bedList = ref([])
// getBedList().then(res => {
//   bedList.value = res.row
// })
const props = defineProps({
  inHospital: {
    type: Boolean,
    default: false
  }
})
const searchForm = ref({
  patientName:null,
  // inHospital:null
})
const patientList = ref([])
const emit = defineEmits(['selectPatient'])
onMounted(() => {
  // 获取患者列表
  initList()
})
function initList(){
  if(props.inHospital){
    searchForm.value.isIn = '1'
  }
  getHospitalList(searchForm.value).then(res => {
    patientList.value = res.row
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