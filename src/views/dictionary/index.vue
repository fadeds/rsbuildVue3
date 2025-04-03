<template>
  <div class="dictionary-container">
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="字典名称">
          <el-input v-model="searchForm.name" placeholder="请输入字典名称" clearable />
        </el-form-item>
        <el-form-item label="字典类型">
          <el-input v-model="searchForm.typeName" placeholder="请输入字典类型" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="operation-bar">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="danger" :disabled="!selectedRows.length" @click="handleBatchDelete">批量删除</el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="tableData"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="字典编号"  />
      <el-table-column prop="name" label="字典名称" />
      <el-table-column prop="code" label="字典编码" />
      <el-table-column prop="typeName" label="字典类型" />
      <el-table-column prop="codeType" label="类型编码" />
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->

    <!-- 字典表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增字典' : '编辑字典'"
      width="500px"
    >
      <el-form
        ref="dictFormRef"
        :model="dictForm"
        :rules="dictRules"
        label-width="100px"
      >
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="dictForm.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典编码" prop="code">
          <el-input v-model="dictForm.code" placeholder="请输入字典编码" />
        </el-form-item>
        <el-form-item label="字典类型" prop="typeName">
          <el-input v-model="dictForm.typeName" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="类型编码" prop="codeType">
          <el-input v-model="dictForm.codeType" placeholder="请输入类型编码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {getList,save,deleteData,update,info } from '@/api/dictionary.js'
// 搜索表单
const searchForm = reactive({
  name: '',
  typeName: '',
  code:'',
  codeType:''
})

// 表格数据
const loading = ref(false)
const tableData = ref([])
const selectedRows = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 字典表单
const dialogVisible = ref(false)
const dialogType = ref('add')
const dictFormRef = ref(null)
const dictForm = reactive({
  id: '',
  name: '',
  typeName: '',
  type: '',
  status: '1',
  description: '',
  code:'',
  codeType:''
})
const dictRules = {
  name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  typeName: [{ required: true, message: '请输入字典类型', trigger: 'blur' }],
  code: [{ required: true, message: '请输入字典编码', trigger: 'blur' }],
  codeType: [{ required: true, message: '请输入类型编码', trigger: 'blur' }]
}

// 字典项相关
const itemsDialogVisible = ref(false)
const currentDict = ref({})
const dictItems = ref([])

// 字典项表单
const itemFormVisible = ref(false)
const itemDialogType = ref('add')
const itemFormRef = ref(null)
const itemForm = reactive({
  id: '',
  dictType: '',
  label: '',
  value: '',
  sort: 0,
  status: '1',
  remark: ''
})
const itemRules = {
  label: [{ required: true, message: '请输入字典标签', trigger: 'blur' }],
  value: [{ required: true, message: '请输入字典键值', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
}

// 获取字典列表
const initList = () => {
  loading.value = true
  getList({
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    name: searchForm.name,
    typeName: searchForm.typeName
  }).then(response => {
    const { result } = response
    const groupedData = result.reduce((acc, curr) => {
      const { typeName } = curr
      if (!acc[typeName]) {
        acc[typeName] = []
      }
      acc[typeName].push(curr)
      return acc
    }, {})
    localStorage.setItem('dicOption',JSON.stringify(groupedData))
    tableData.value = result
    loading.value = false
  })
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  initList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.typeName = ''
  handleSearch()
}

// 表格选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 分页大小变化
const handleSizeChange = (val) => {
  pageSize.value = val
  initList()
}

// 当前页变化
const handleCurrentChange = (val) => {
  currentPage.value = val
  initList()
}

// 新增字典
const handleAdd = () => {
  dialogType.value = 'add'
  Object.keys(dictForm).forEach(key => {
    dictForm[key] = key === 'status' ? '1' : ''
  })
  dialogVisible.value = true
}

// 编辑字典
const handleEdit = (row) => {
  dialogType.value = 'edit'
  Object.keys(dictForm).forEach(key => {
    dictForm[key] = row[key]
  })
  dialogVisible.value = true
}

// 删除字典
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除字典 ${row.name} 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里替换为实际的API调用
    deleteData([`${row.id}`]).then(()=>{
      ElMessage.success('删除成功')
      initList()
    })
  })
}

// 批量删除
const handleBatchDelete = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请至少选择一条记录')
    return
  }
  
  ElMessageBox.confirm(`确认删除选中的 ${selectedRows.value.length} 条记录吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里替换为实际的API调用
    deleteData(selectedRows.value.map(item => item.id)).then(()=>{
      ElMessage.success('批量删除成功')
      initList()
    })
  }).catch(() => {})
}

// 提交字典表单
const submitForm = () => {
  let func= dialogType.value === 'add'? save : update
  dictFormRef.value.validate((valid) => {
    if (valid) {
      // 这里替换为实际的API调用
        func(dictForm).then((res)=>{
          dialogVisible.value = false
          ElMessage.success(dialogType.value === 'add'? '新增成功' : '修改成功')
          initList()
        })
    }
  })
}
    // 页面加载时获取列表
    onMounted(() => {
      initList()
    })
  </script>
  <style scoped>
.dictionary-container {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}

.operation-bar {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.dict-items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dict-info {
  margin-right: 20px;
  font-weight: bold;
}

:deep(.el-dialog__body) {
  padding-top: 10px;
}
</style>