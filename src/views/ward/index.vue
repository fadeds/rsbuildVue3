<template>
  <el-container>
    <el-aside width="400px">
      <PatientList ref="patientListRef" @selectPatient="selectPatient" />
    </el-aside>

    <el-main>
        <PatientInfo :patient-info="form" />
        <el-table :data="orderListWard" style="width: 100%" max-height="500">
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
          <el-table-column label="数量"  prop="dose" width="100"/>
          <el-table-column label="操作" width="120">
            <template #default="scope">
                <el-button type="danger" size="small" @click="handleDeleteWard(scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <br>
        <div class="table-operations">
          <el-button type="primary" @click="handleAdd">新增医嘱</el-button>
          <el-button @click="handleBatchDelete">批量删除</el-button>
        </div>

        <el-table 
          :data="orderList" 
          style="width: 100%" 
          max-height="500"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="医嘱类型" width="120">
            <template #default="scope">
              <el-select v-model="scope.row.adviceType" placeholder="医嘱类型" size="small">
                <el-option
                  v-for="item in dicOption.医嘱类型"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="项目类型" width="120">
            <template #default="scope">
              <el-select v-model="scope.row.itemType" placeholder="项目类型" size="small" @change="(val) => itemTypeChange(val, scope.$index)">
                <el-option
                  v-for="item in dicOption.项目类型"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="药品名称" >
            <template #default="scope">
              <el-select 
                v-model="scope.row.itemCode" 
                placeholder="药品名称" 
                size="small"
                @change="drugChange(scope.row.itemCode, scope.$index)">
                <el-option
                  v-for="item in (drugMedical[scope.row.itemType] || [])"
                  :key="item.drugCode"
                  :label="item.drugName"
                  :value="item.drugCode"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="用药频次" >
            <template #default="scope">
              <el-select v-model="scope.row.frequency" placeholder="用药频次" size="small">
                <el-option
                  v-for="item in dicOption.频次"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="用法" >
            <template #default="scope">
              <el-select v-model="scope.row.usageCode" placeholder="用法" size="small">
                <el-option
                  v-for="item in dicOption.用法"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="100">
            <template #default="scope">
              <el-input-number 
                v-model="scope.row.count" 
                :min="0" 
                size="small"
                controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button 
                type="danger" 
                size="small" 
                @click="handleDelete(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="action-buttons">
          <el-button type="primary" @click="handleSubmit">保存医嘱</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { getdrugMedical } from "@/api/index"
import { getList, save,getId, deleteData, update, info,druglist } from '@/api/ward'

const patientListRef = ref(null)
const orderList = ref([])
const orderListWard = ref([])
const selectedRows = ref([])

const form = ref({
  patientId: "",
  patientNo: "",
  patientName: "",
  sex: "",
  diagnosisName1: "",
})

const drugMedicalList = ref([])
const drugMedical = ref({})

// 获取药品列表
const initDrugList = async () => {
  try {
    const res = await druglist({})
    drugMedicalList.value = res.data
  } catch (error) {
    console.error('获取药品列表失败:', error)
  }
}
const itemTypeChange = (val, index) => {
  orderList.value[index].itemCode = ''
  drugMedical.value[val] = drugMedicalList.value.filter(item => item.itemType === val)
}
// 选择药品回调
const drugChange = (drugCode, index) => {
  const drug = drugMedicalList.value.find(item => item.drugCode === drugCode)
  if (drug) {
    orderList.value[index] = {
      ...orderList.value[index],
      unit: drug.unit,
      price: drug.unitPrice,
      count: drug.count,
    }
  }
}

// 新增一行
const handleAdd = async() => {
  // const res = await getId()
  orderList.value.push({
    adviceType: '0',
    itemType: '',
    frequency: '',
    usageCode: '',
    dose: 1,
    unit: '',
    price: 0,
    // adviceNo:res.seq
  })
}
const handleDeleteWard = (row) => {
  deleteData([row.id]).then(res => {
    if(res.code === 0){
      ElMessage.success('删除成功')
      getOrderList()
    }
  }).catch(err => {
    ElMessage.error('删除失败')
  })
}
const getOrderList = async() => {
  // 获取医嘱列表逻辑
  const res = await getList({zyh:form.value.zyh})
  orderListWard.value = res.rows
}
// 删除一行
const handleDelete = (index) => {
  orderList.value.splice(index, 1)
}

// 批量删除
const handleBatchDelete = () => {
  const indexes = selectedRows.value.map(row => orderList.value.indexOf(row))
  indexes.sort((a, b) => b - a) // 从后往前删除
  indexes.forEach(index => {
    if (index > -1) {
      orderList.value.splice(index, 1)
    }
  })
}

// 选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 选择患者
const selectPatient = (row) => {
  form.value = row
  orderList.value = [] // 清空医嘱列表
  getOrderList()
}

// 提交
const handleSubmit = async () => {
  if (!form.value.zyh) {
    ElMessage.warning('请先选择患者')
    return
  }
  if (orderList.value.length === 0) {
    ElMessage.warning('请添加医嘱')
    return
  }
  
  try {
   
    let res = await getId()
    orderList.value.forEach(item => {
      item.adviceNo = res.seq
    })
    const params = {
      zyh: form.value.zyh, //患者id
      adviceInfos: orderList.value, //医嘱列表
    }
    await save(params)
    ElMessage.success('保存成功')
    orderList.value = []
    getOrderList()
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败')
  }
}

// 重置
const handleReset = () => {
  orderList.value = []
}

// 初始化
onMounted(() => {
  initDrugList()
})

const dicOption = JSON.parse(localStorage.getItem("dicOption"))
</script>

<style scoped>
.el-main {
  margin: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.table-operations {
  margin-bottom: 16px;
  display: flex;
  gap: 10px;
}

.action-buttons {
  margin-top: 20px;
  text-align: center;
}

.el-aside {
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
}

:deep(.el-input-number) {
  width: 100%;
}
</style>
