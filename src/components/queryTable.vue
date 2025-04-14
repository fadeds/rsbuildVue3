<template>
  <div class="query-table-container">
    <!-- 工具栏 -->
    <div class="table-toolbar" v-if="showToolbar">
      <div class="left-actions">
        <slot name="toolbar-left"></slot>
      </div>
      
      <!-- 搜索表单 -->
      <el-card v-if="showSearch" class="search-form">
        <el-form
          ref="searchFormRef"
          :model="searchForm"
          inline
          size="default"
        >
          <!-- 常显搜索项 -->
          <template v-for="col in visibleSearchColumns" :key="col.prop">
            <el-form-item
              :label="col.label"
              :prop="col.prop"
            >
              <form-field-renderer
                :field="col"
                :value="searchForm[col.prop]"
                @update:value="val => searchForm[col.prop] = val"
                @enter="handleSearch"
              />
            </el-form-item>
          </template>
          
          <!-- 展开的搜索项 -->
          <template v-if="expandedSearch">
            <template v-for="col in hiddenSearchColumns" :key="col.prop">
              <el-form-item
                :label="col.label"
                :prop="col.prop"
              >
                <form-field-renderer
                  :field="col"
                  :value="searchForm[col.prop]"
                  @update:value="val => searchForm[col.prop] = val"
                  @enter="handleSearch"
                />
              </el-form-item>
            </template>
          </template>
          
          <!-- 操作按钮 -->
          <el-form-item>
            <el-button type="primary" @click="handleSearch" :loading="loading">
              <el-icon><Search /></el-icon> 查询
            </el-button>
            <el-button @click="resetSearch">
              <el-icon><Refresh /></el-icon> 重置
            </el-button>
            <el-button 
              type="text" 
              @click="expandedSearch = !expandedSearch"
              v-if="hiddenSearchColumns.length > 0"
            >
              {{ expandedSearch ? '收起' : '展开' }}
              <el-icon>
                <component :is="expandedSearch ? 'ArrowUp' : 'ArrowDown'" />
              </el-icon>
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      
      <div class="right-actions">
        <!-- 添加编辑/只读切换按钮 -->
        <el-button-group v-if="showModeToggle">
          <el-button 
            :type="viewOnly ? 'primary' : ''" 
            @click="toggleViewMode(true)"
            :disabled="loading"
          >
            <el-icon><View /></el-icon> 只读模式
          </el-button>
          <el-button 
            :type="!viewOnly ? 'primary' : ''" 
            @click="toggleViewMode(false)"
            :disabled="loading"
          >
            <el-icon><Edit /></el-icon> 编辑模式
          </el-button>
        </el-button-group>
        <slot name="toolbar-right"></slot>
      </div>
    </div>

    <div class="table-wrapper">
      <!-- 表格 -->
      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="tableData"
        :height="tableHeight"
        border
        stripe
        highlight-current-row
        :row-key="rowKey"
        :row-class-name="rowClassName"
        :default-sort="defaultSort"
        @row-click="onRowClick"
        @selection-change="onSelectionChange"
        @sort-change="onSortChange"
      >
        <!-- 选择列 -->
        <el-table-column 
          v-if="showSelection" 
          type="selection" 
          width="55" 
          fixed="left"
        />
        
        <!-- 索引列 -->
        <el-table-column 
          v-if="showIndex" 
          type="index" 
          label="序号" 
          width="60" 
          fixed="left"
        />
        
        <!-- 动态列 -->
        <template v-for="col in tableColumns" :key="col.prop">
          <el-table-column
            :prop="col.prop"
            :label="col.label"
            :width="col.width"
            :min-width="col.minWidth"
            :fixed="col.fixed"
            :sortable="col.sortable"
            :show-overflow-tooltip="col.showOverflowTooltip !== false"
            :align="col.align || 'left'"
          >
            <template #header>
              <div class="custom-header">
                {{ col.label }}
                <el-tooltip 
                  v-if="col.tooltip" 
                  :content="col.tooltip" 
                  placement="top"
                >
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            
            <template #default="scope">
              <!-- 使用插槽 -->
              <template v-if="col.slot">
                <slot 
                  :name="col.slot" 
                  :row="scope.row" 
                  :index="scope.$index" 
                  :viewOnly="viewOnly"
                ></slot>
              </template>
              
              <!-- 使用表单渲染器，根据行编辑状态和模式确定显示方式 -->
              <template v-else>
                <!-- 如果在编辑模式且当前行处于编辑状态 -->
                <template v-if="!viewOnly && isEditing(scope.row)">
                  <el-form-item
                    :prop="'row.' + scope.$index + '.' + col.prop"
                    :rules="formRules?.[col.prop]"
                    :style="{margin: '0'}"
                  >
                    <form-field-renderer
                      :field="col"
                      :value="scope.row[col.prop]"
                      mode="edit"
                      @update:value="val => scope.row[col.prop] = val"
                    />
                  </el-form-item>
                </template>
                <!-- 否则使用只读模式 -->
                <template v-else>
                  <form-field-renderer
                    :field="col"
                    :value="scope.row[col.prop]"
                    mode="view"
                  />
                </template>
              </template>
            </template>
          </el-table-column>
        </template>

        <!-- 操作列 -->
        <el-table-column 
          v-if="showActionColumn" 
          :label="actionColumnLabel" 
          :width="actionColumnWidth" 
          :fixed="actionColumnFixed"
          align="center"
        >
          <template #default="scope">
            <!-- 编辑状态下的操作 -->
            <template v-if="!viewOnly && isEditing(scope.row)">
              <el-button
                link
                type="primary"
                size="small"
                @click="saveRow(scope.row)"
              >
                <el-icon><Check /></el-icon> 保存
              </el-button>
              <el-button
                link
                type="danger"
                size="small"
                @click="cancelEdit(scope.row)"
              >
                <el-icon><Close /></el-icon> 取消
              </el-button>
            </template>
            
            <!-- 非编辑状态下使用插槽 -->
            <template v-else>
              <slot 
                name="action" 
                :row="scope.row" 
                :index="scope.$index"
                :edit="() => editRow(scope.row)"
                :delete="() => handleDelete(scope.row)"
                :viewOnly="viewOnly"
              >
                <!-- 编辑模式下默认操作 -->
                <template v-if="!viewOnly">
                  <el-button
                    v-if="showEdit"
                    link
                    type="primary"
                    size="small"
                    @click.stop="editRow(scope.row)"
                  >
                    <el-icon><Edit /></el-icon> 编辑
                  </el-button>
                  <el-popconfirm
                    v-if="showDelete"
                    :title="deleteConfirmText"
                    @confirm="handleDelete(scope.row)"
                  >
                    <template #reference>
                      <el-button link type="danger" size="small" @click.stop>
                        <el-icon><Delete /></el-icon> 删除
                      </el-button>
                    </template>
                  </el-popconfirm>
                </template>
                
                <!-- 只读模式下默认操作 -->
                <template v-else>
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click.stop="viewDetails(scope.row)"
                  >
                    <el-icon><View /></el-icon> 查看详情
                  </el-button>
                </template>
              </slot>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 空状态 -->
      <div class="empty-placeholder" v-if="!loading && tableData.length === 0">
        <slot name="empty">
          <el-empty description="暂无数据"></el-empty>
        </slot>
      </div>

      <!-- 分页 -->
      <div class="pagination-container" v-if="showPagination && total > 0">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="pageSizes"
          :layout="paginationLayout"
          :small="small"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { 
  Search, Refresh, ArrowUp, ArrowDown, Edit, Delete, Check, Close, 
  QuestionFilled, View 
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import FormFieldRenderer from './FormFieldRenderer.vue'

const props = defineProps({
  // 基础配置
  columns: {
    type: Array,
    required: true
  },
  fetchData: {
    type: Function,
    required: true
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  // 数据操作
  onDelete: {
    type: Function,
    default: null
  },
  onSave: {
    type: Function,
    default: null
  },
  formRules: {
    type: Object,
    default: () => ({})
  },
  // 搜索配置
  showSearch: {
    type: Boolean,
    default: true
  },
  // 表格配置
  showSelection: {
    type: Boolean,
    default: false
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  showToolbar: {
    type: Boolean,
    default: true
  },
  defaultSort: {
    type: Object,
    default: null
  },
  tableHeight: {
    type: [String, Number],
    default: '100%'
  },
  small: {
    type: Boolean,
    default: false
  },
  rowClassName: {
    type: Function,
    default: null
  },
  autoLoad: {
    type: Boolean,
    default: true
  },
  // 处理钩子
  beforeSearch: {
    type: Function,
    default: null
  },
  afterSearch: {
    type: Function,
    default: null
  },
  // 分页配置
  showPagination: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  defaultPageSize: {
    type: Number,
    default: 10
  },
  // 操作列配置
  showActionColumn: {
    type: Boolean,
    default: true
  },
  actionColumnLabel: {
    type: String,
    default: '操作'
  },
  actionColumnWidth: {
    type: [String, Number],
    default: 200
  },
  actionColumnFixed: {
    type: String,
    default: 'right'
  },
  showEdit: {
    type: Boolean,
    default: true
  },
  showDelete: {
    type: Boolean,
    default: true
  },
  deleteConfirmText: {
    type: String,
    default: '确认删除该条数据吗？'
  },
  // 搜索表单配置
  maxVisibleSearchColumns: {
    type: Number,
    default: 3
  },
  // 模式切换
  viewOnly: {
    type: Boolean,
    default: false
  },
  showModeToggle: {
    type: Boolean,
    default: false
  }
})

// 事件
const emit = defineEmits([
  'row-click', 
  'selection-change', 
  'sort-change',
  'delete-success',
  'save-success',
  'search-change',
  'update:viewOnly',
  'view-details'
])

// DOM引用
const tableRef = ref(null)
const searchFormRef = ref(null)

// 内部状态
const loading = ref(false)
const tableData = ref([])
const searchForm = ref({})
const currentPage = ref(1)
const pageSize = ref(props.defaultPageSize)
const total = ref(0)
const editingId = ref('')
const expandedSearch = ref(false)
const selectedRows = ref([])
const sortInfo = ref(null)
const internalViewOnly = ref(props.viewOnly)

// 计算属性
const searchColumns = computed(() => props.columns.filter(col => !col.hideForm))
const visibleSearchColumns = computed(() => {
  return searchColumns.value.slice(0, props.maxVisibleSearchColumns)
})
const hiddenSearchColumns = computed(() => {
  return searchColumns.value.slice(props.maxVisibleSearchColumns)
})
const tableColumns = computed(() => props.columns.filter(col => !col.hideTable))

// 获取数据方法
const fetchTableData = async (params = {}, suppressLoading = false) => {
  if (!suppressLoading) {
    loading.value = true
  }
  
  try {
    // 合并搜索参数和分页参数
    const searchParams = {
      ...searchForm.value,
      ...params,
      page: currentPage.value,
      pageSize: pageSize.value
    }
    
    // 添加排序信息
    if (sortInfo.value) {
      searchParams.sort = sortInfo.value.prop
      searchParams.order = sortInfo.value.order
    }

    // 查询前处理
    const processedParams = props.beforeSearch
      ? props.beforeSearch(searchParams)
      : searchParams

    // 发起请求
    const response = await props.fetchData(processedParams)
    
    if (!response) {
      throw new Error('获取数据失败：返回结果为空')
    }
    
    const { data, total: totalCount } = response
    
    // 验证返回数据格式
    if (!Array.isArray(data)) {
      throw new Error('获取数据失败：返回数据格式不正确')
    }
    
    // 查询后处理
    const processedData = props.afterSearch
      ? props.afterSearch(data)
      : data

    tableData.value = processedData
    total.value = totalCount || 0
    
    // 清空选择
    if (tableRef.value && props.showSelection) {
      tableRef.value.clearSelection()
    }
    
    // 向上通知搜索条件变化
    emit('search-change', processedParams)
    
    return processedData
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error(`获取数据失败: ${error.message}`)
    tableData.value = []
    total.value = 0
    return []
  } finally {
    if (!suppressLoading) {
      loading.value = false
    }
  }
}

// 查询处理
const handleSearch = () => {
  currentPage.value = 1
  fetchTableData()
}

// 重置查询
const resetSearch = () => {
  if (searchFormRef.value) {
    searchFormRef.value.resetFields()
  }
  currentPage.value = 1
  sortInfo.value = null
  handleSearch()
}

// 分页大小变化
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchTableData()
}

// 当前页变化
const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchTableData()
}

// 编辑状态判断
const isEditing = (row) => row[props.rowKey] === editingId.value

// 开始编辑
const editRow = (row) => {
  if (internalViewOnly.value) return
  editingId.value = row[props.rowKey]
}

// 取消编辑
const cancelEdit = () => {
  editingId.value = ''
  fetchTableData(null, true)
}

// 保存编辑
const saveRow = async (row) => {
  try {
    if (props.onSave) {
      loading.value = true
      await props.onSave(row)
      emit('save-success', row)
    }
    
    editingId.value = ''
    await fetchTableData(null, true)
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error(`保存失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}

// 删除处理
const handleDelete = async (row) => {
  if (props.onDelete) {
    try {
      loading.value = true
      await props.onDelete(row)
      ElMessage.success('删除成功')
      emit('delete-success', row)
      
      // 如果删除后当前页没有数据了，且不是第一页，则跳转到前一页
      if (tableData.value.length === 1 && currentPage.value > 1) {
        currentPage.value--
      }
      
      await fetchTableData(null, true)
    } catch (error) {
      console.error('删除失败:', error)
      ElMessage.error(`删除失败: ${error.message}`)
    } finally {
      loading.value = false
    }
  }
}

// 查看详情
const viewDetails = (row) => {
  emit('view-details', row)
}

// 切换查看模式
const toggleViewMode = (isView) => {
  // 如果从编辑模式切换到只读模式，取消所有编辑状态
  if (!internalViewOnly.value && isView) {
    editingId.value = ''
  }
  
  internalViewOnly.value = isView
  emit('update:viewOnly', isView)
}

// 行点击事件
const onRowClick = (row, column, event) => {
  emit('row-click', row, column, event)
}

// 多选事件
const onSelectionChange = (selections) => {
  selectedRows.value = selections
  emit('selection-change', selections)
}

// 排序事件
const onSortChange = ({ column, prop, order }) => {
  sortInfo.value = prop ? { prop, order } : null
  emit('sort-change', { column, prop, order })
  fetchTableData()
}

// 初始化搜索表单
watch(() => props.columns, () => {
  const newSearchForm = {}
  props.columns.forEach(col => {
    if (!col.hideForm) {
      if (col.defaultValue !== undefined) {
        newSearchForm[col.prop] = col.defaultValue
      } else {
        newSearchForm[col.prop] = col.multiple ? [] : undefined
      }
    }
  })
  searchForm.value = newSearchForm
}, { immediate: true })

// 监听外部viewOnly变化
watch(() => props.viewOnly, (val) => {
  internalViewOnly.value = val
})

// 暴露方法
defineExpose({
  fetchTableData,
  resetSearch,
  handleSearch,
  searchForm,
  tableData,
  currentPage,
  pageSize,
  total,
  selectedRows,
  editRow,
  saveRow,
  cancelEdit,
  handleDelete,
  tableRef,
  toggleViewMode
})

// 自动加载数据
onMounted(() => {
  if (props.autoLoad) {
    fetchTableData()
  }
})
</script>

<style scoped>
.query-table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  position: relative;
}

.table-toolbar {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;
}

.left-actions {
  margin-right: auto;
  margin-bottom: 8px;
}

.right-actions {
  margin-left: auto;
  margin-bottom: 8px;
}

.search-form {
  flex: 1;
  margin-bottom: 16px;
  width: 100%;
}

.table-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

:deep(.el-table) {
  flex: 1;
}

:deep(.el-table__body-wrapper) {
  overflow-y: auto;
}

.custom-header {
  display: flex;
  align-items: center;
}

.custom-header .el-icon {
  margin-left: 4px;
  font-size: 14px;
  color: #909399;
}

.pagination-container {
  flex-shrink: 0;
  padding: 16px 0;
  text-align: right;
}

.empty-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}
</style>