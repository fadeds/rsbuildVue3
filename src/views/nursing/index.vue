<template>
  <el-container>
    <el-aside width="400px">
      <PatientList inHospital @selectPatient="handlePatientSelect" />
    </el-aside>
    <el-main>
      <PatientInfo :patient-info="currentPatient" />
      <div class="order-content">
        <el-table 
          :data="orderList" 
          style="width: 100%"
          :border="true"
          :span-method="handleSpanMethod"
        >
          <el-table-column label="医嘱类型" prop="adviceType" width="120">
            <template #default="scope">
              {{dicOption.医嘱类型.find(item => item.code == scope.row.adviceType)?.name}}
            </template>
          </el-table-column>
          <el-table-column label="项目类型" prop="itemType" width="120">
            <template #default="scope">
              {{dicOption.项目类型.find(item => item.code == scope.row.itemType)?.name}}
            </template>
          </el-table-column>
          <el-table-column label="药品名称" prop="itemCode" >
            <template #default="scope">
              {{drugMedicalList.find(item => item.drugCode == scope.row.itemCode)?.drugName}}
            </template>
          </el-table-column>
          <el-table-column label="用药频次" prop="frequency" >
            <template #default="scope">
              {{dicOption.频次.find(item => item.code == scope.row.frequency)?.name}}
            </template>
          </el-table-column>
          <el-table-column label="用法" prop="usageCode" >
            <template #default="scope">
              {{dicOption.用法.find(item => item.code == scope.row.usageCode)?.name}}
            </template>
          </el-table-column>
          <el-table-column label="数量"  prop="count" width="100"/>
          <el-table-column prop="operation" label="操作" width="120">
            <template #default="scope">
              <el-button type="primary" link @click="handleExecute(scope.row)">执行</el-button>
              <el-button type="danger" link @click="handleStop(scope.row)">停止</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PatientList from '@/components/PatientList.vue'
import PatientInfo from '@/components/PatientInfo.vue'
// import MedicineActions from '@/components/MedicineActions.vue'
import { getList, save,getId, deleteData, update, info,druglist } from '@/api/ward'
import { exeNursing, stopNursing } from '@/api/index'
const dicOption = JSON.parse(localStorage.getItem("dicOption"))

const currentPatient = ref({})
const orderList = ref([])
const drugMedicalList = ref([])

// 处理单元格合并
const handleSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0 || columnIndex === 6) { // 第一列和最后一列
    if (rowIndex === 0) {
      const count = orderList.value.filter(item => item.adviceNo === row.adviceNo).length
      return {
        rowspan: count,
        colspan: 1
      }
    } else {
      const prevRow = orderList.value[rowIndex - 1]
      if (prevRow.adviceNo === row.adviceNo) {
        return {
          rowspan: 0,
          colspan: 0
        }
      } else {
        const count = orderList.value.filter(item => item.adviceNo === row.adviceNo).length
        return {
          rowspan: count,
          colspan: 1
        }
      }
    }
  }
}

const handlePatientSelect = (patient) => {
  currentPatient.value = patient
  // 获取该患者的医嘱列表
  getOrderList()
}
const handleExecute = async (row) => {  
  const res = await exeNursing({
    zyh:currentPatient.value.zyh,
    adviceNo:row.adviceNo,
  })
  if(res.code === 0){
    ElMessage.success('执行成功')
    getOrderList()
  }
}
const handleStop = async (row) => {
  const res = await stopNursing({
    adviceNo:row.adviceNo,

  })
  if(res.code === 0){
    ElMessage.success('停止成功')
    getOrderList()
  }
}

const handleStartTime = () => {
  // 实现开始时间设置逻辑
}

const handleEndTime = () => {
  // 实现结束时间设置逻辑
}

const getOrderList = async() => {
  // 获取医嘱列表逻辑
  const res = await getList({zyh:currentPatient.value.zyh})
  // 按照adviceNo排序
  orderList.value = res.rows.sort((a, b) => {
    const adviceNoA = a.adviceNo || '';
    const adviceNoB = b.adviceNo || '';
    if (adviceNoA === adviceNoB) {
      return 0;
    }
    return adviceNoA > adviceNoB ? 1 : -1;
  })
}
onMounted(() => {
  initDrugList()
})

const initDrugList = async () => {
  try {
    const res = await druglist({})
    drugMedicalList.value = res.data
  } catch (error) {
    console.error('获取药品列表失败:', error)
  }
}
</script>

<style scoped>
.el-main{
  margin: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  background-color: #fff;
}
.order-content {
  /* margin-top: 20px; */
  /* padding: 20px; */
  background-color: #fff;
  border-radius: 4px;
  /* box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1); */
}

.operation-panel {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.time-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.medicine-input {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.el-aside{
  background-color: #fff;
}
</style>