<template>
  <el-container>
    <el-aside width="400px">
      <PatientList @selectPatient="handlePatientSelect" />
    </el-aside>

    <el-main>
      <div class="prescription-content">
        <el-table 
          :data="prescriptionList" 
          style="width: 100%"
          :border="true"
        >
          <el-table-column prop="prescriptionNo" label="处方号" width="120" />
          <el-table-column prop="itemType" label="项目类型" width="120" >
            <template #default="scope">
              {{scope.row.itemType&&dicOption.项目类型.find(item => item.code == scope.row.itemType)?.name}}
            </template>
          </el-table-column>
          <el-table-column prop="itemName" label="诊疗项目" width="120" >
            <template #default="scope">
              {{scope.row.itemCode&&drugOption.find(item => item.drugCode == scope.row.itemCode)?.drugName}}
            </template>
          </el-table-column>
          <el-table-column prop="itemCode" label="诊疗编码" width="120" />
          <el-table-column prop="prescriptionTime" label="处方日期" width="120" />
          <el-table-column prop="dose" label="用量" width="100" />
          <el-table-column prop="usageCode" label="用法" width="100">
            <template #default="scope">
              {{scope.row.usageCode&&dicOption.用法.find(item => item.code == scope.row.usageCode)?.name}}
            </template>
          </el-table-column>
          <el-table-column prop="frequency" label="频次" width="100">
            <template #default="scope">
              {{scope.row.frequency&&dicOption.频次.find(item => item.code == scope.row.frequency)?.name}}
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="规格" width="120" />
          <el-table-column prop="itemResult" label="检查结果" width="120" />
          <el-table-column prop="referValue" label="参考值" width="100" />
          <el-table-column prop="count" label="数量" width="100" />
          <el-table-column prop="price" label="单价" width="100" />
          <!-- <el-table-column prop="totalPrice" label="总价" width="100" /> -->
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import {getList,deleteData,info } from '@/api/prescription'
import { druglist } from '@/api/ward'

const prescriptionList = ref([])
const drugOption = ref({})      
const dicOption = JSON.parse(localStorage.getItem('dicOption'))
// 搜索患者
const handlePatientSelect = (row) => {
  // 实现搜索逻辑
  console.log(row)
  getPrescriptionList(row.zyh)
}

// 获取处方列表
const getPrescriptionList = async(zyh) => {
  // 实现获取处方列表逻辑
  let res = await getList({zyh})
  if(res.code == 0){
    prescriptionList.value = res.rows
  }
}
onMounted(()=>{
  // getPrescriptionList()
  getList({}).then(res=>{
    console.log(res.rows)
  })
  druglist({}).then(res=>{
    drugOption.value = res.data
  })
})
</script>

<style scoped>
/* .patient-list {
  padding: 20px;
  height: 100%;
  background-color: #fff;
} */

.search-bar {
  margin-bottom: 20px;
}

.prescription-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.el-aside {
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
}

:deep(.el-table__header) {
  background-color: #f5f7fa;
}

:deep(.el-table--border) {
  border: 1px solid #dcdfe6;
}
</style>