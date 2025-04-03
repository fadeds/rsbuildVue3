<template>
  <query-table
    ref="tableRef"
    :columns="columns"
    :fetch-data="fetchTableData"
    :show-action-column="false"
    :show-pagination="false"
    :row-key="'zyh'"
    :table-height="'calc(100vh - 180px)'"
    :view-only="true"
    :show-mode-toggle="false"
    @row-click="onRowClick"
  >
    <!-- 工具栏左侧插槽 -->
    <template #toolbar-left>
      <!-- 如果需要其他工具栏按钮可以在这里添加 -->
    </template>
  </query-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import queryTable from './queryTable.vue'
import { getHospitalList } from '@/api/patientinfo.js'

const dicOption = JSON.parse(localStorage.getItem("dicOption"))

// 定义属性
const props = defineProps({
  inHospital: {
    type: Boolean,
    default: false
  }
})

// 定义表格列配置 - 保持原有配置
const columns = [
  {
    prop: 'patientName',
    label: '姓名',
    width: 100,
    type: 'input' // 搜索表单显示为输入框
  },
  {
    prop: 'zyh',
    label: '档案号',
    width: 100,
    hideForm: true // 不在搜索表单显示
  },
  {
    prop: 'cardNo',
    label: '证件号',
    width: 100,
    hideForm: true
  },
  {
    prop: 'bedNo',
    label: '床位号',
    width: 100,
    hideForm: true
  },
  {
    prop: 'department',
    label: '科室',
    hideForm: true,
    formatter: (row) => {
      return dicOption.科室?.find(item => item.code === row.department)?.name || row.department
    }
  }
]

// 表格引用
const tableRef = ref(null)

// 获取表格数据的方法 - 保持不变
const fetchTableData = async (params) => {
  try {
    const searchParams = {
      ...params,
      isIn: props.inHospital ? '1' : undefined
    }
    
    const response = await getHospitalList(searchParams)
    
    return {
      data: response.row || [],
      total: response.row?.length || 0 // 因为不分页，total 设为数组长度
    }
  } catch (error) {
    console.error('获取患者列表失败:', error)
    return {
      data: [],
      total: 0
    }
  }
}

// 行点击事件 - 保持不变
const emit = defineEmits(['selectPatient'])
const onRowClick = (row) => {
  emit('selectPatient', row)
}

// 初始化方法 - 保持不变
const initList = () => {
  tableRef.value?.fetchTableData()
}

// 组件挂载时加载数据
onMounted(() => {
  initList()
})

// 暴露方法和数据 - 保持不变
defineExpose({
  patientList: tableRef,
  getList: initList
})
</script>

<style scoped>
:deep(.query-table-container) {
  padding: 20px;
  box-sizing: border-box;
}

/* 不需要手动设置表格高度，由组件的 table-height 属性控制 */
</style>