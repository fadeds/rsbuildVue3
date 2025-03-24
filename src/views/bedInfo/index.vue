<template>
  <div class="discharge-page">
    <div class="search-section">
      <el-card>
        <div class="search-form">
            <el-form :inline="true" :model="searchForm">
                  <el-form-item label="科室">
                    <el-select v-model="searchForm.department" clearable placeholder="请选择科室" style="width: 192px">
                      <el-option
                      v-for="item in dicOption.科室"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="床位">
                  <el-input v-model="searchForm.bed" clearable placeholder="请输入" />
                </el-form-item>
                <el-form-item label="床位使用情况">
                  <el-select v-model="searchForm.bedCode" clearable placeholder="请选择" style="width: 192px">
                    <el-option
                      v-for="item in dicOption.床位占用情况"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
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
          <el-table-column prop="department_name" label="科室名称">
            <template #default="scope"> 
              {{ scope.row.department&&dicOption.科室.find(item => item.code == scope.row.department)?.name }}
            </template>
          </el-table-column>
          <el-table-column prop="bed" label="床位编号" />
          <el-table-column prop="patientName" label="患者姓名" />
          <el-table-column prop="sex" label="患者性别" >
            <template #default="scope">
              {{ scope.row.sex&&dicOption.性别.find(item => item.code == scope.row.sex)?.name }}
            </template>
          </el-table-column>
          <el-table-column prop="zyh" label="住院号" />
          <el-table-column prop="cyTime" label="出院时间" />
          <el-table-column prop="bedCode" label="床位使用情况" >
            <template #default="scope">
              {{ scope.row.bedCode&&dicOption.床位占用情况.find(item => item.code == scope.row.bedCode)?.name }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { getBedList } from "@/api/bedInfo"
const dicOption = JSON.parse(localStorage.getItem("dicOption"))

const searchForm = ref({
  department: null,
  bed: null,
  bedCode: null,
})

const patientList = ref([])
async function initList() {
  const res = await getBedList(
    searchForm.value
  )
  if (res.code === 0) {
    patientList.value = res.row
  }
}
// async function handleDischarge(row) {
//   ElMessageBox.confirm('确定出院吗？', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//   }).then(async () => {
//     const res = await deleteData([row.id])
//     if (res.code === 0) {
//       ElMessage.success("出院成功")
//       initList()
//     }
//   })
// }
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
