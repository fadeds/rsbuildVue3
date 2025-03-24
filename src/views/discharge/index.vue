<template>
  <div class="discharge-page">
    <div class="search-section">
      <el-card>
        <div class="search-form">
            <el-form :inline="true" :model="searchForm">
                <el-form-item label="住院号">
                  <el-input v-model="searchForm.zyh" placeholder="请输入" />
                </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
              </el-form-item>
            </el-form>
        </div>
      </el-card>
    </div>

    <div class="table-section">
      <el-card>
        <el-table :data="patientList" style="width: 100%">
          <el-table-column prop="zyh" label="住院号" />
          <el-table-column prop="patientName" label="患者姓名" />
          <el-table-column prop="diagnosisName1" label="诊断">
            <template #default="scope"> 
              {{ dicOption.诊断.find(item => item.code == scope.row.diagnosisCode1)?.name }}
            </template>
          </el-table-column>
          <el-table-column prop="department" label="科室" >
            <template #default="scope"> 
              {{ dicOption.科室.find(item => item.code == scope.row.department)?.name }}
            </template>
          </el-table-column>
          <el-table-column prop="doctor" label="主治医生" />
          <el-table-column prop="zyTime" label="入院时间" />
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button type="primary" @click="handleDischarge(scope.row)"
                >出院</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getList, save, deleteData, update, info } from "@/api/discharge"
const dicOption = JSON.parse(localStorage.getItem("dicOption"))

const searchForm = ref({
  zyh: "",
  isIn: 1
})

const patientList = ref([])
async function initList() {
  const res = await getList(searchForm.value)
  if (res.code === 0) {
    patientList.value = res.row
  }
}
async function handleDischarge(row) {
  ElMessageBox.confirm('确定出院吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = await deleteData([row.id])
    if (res.code === 0) {
      ElMessage.success("出院成功")
      initList()
    }
  })
}
const handleSearch = () => {
  // 实现搜索逻辑
  initList()
}
onMounted(() => {
  initList()
})
</script>

<style scoped>
.discharge-page {
  padding: 20px;
}

.search-section {
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-section {
  background-color: #fff;
}

.el-card {
  margin-bottom: 20px;
}
</style>
