<template>
  <!-- 只读模式 -->
  <template v-if="mode === 'view'">
    <!-- 普通字段 -->
    <template v-if="!field.type || field.type === 'input' || field.type === 'inputNumber'">
      <span v-if="valueData !== undefined && valueData !== null">{{ valueData }}</span>
      <span v-else class="empty-cell">-</span>
    </template>
    
    <!-- 下拉选择框/单选 -->
    <template v-else-if="field.type === 'select' || field.type === 'radio'">
      {{ getOptionLabel(valueData, field.options) }}
    </template>
    
    <!-- 多选框 -->
    <template v-else-if="field.type === 'checkbox'">
      {{ getCheckboxLabels(valueData, field.options) }}
    </template>
    
    <!-- 日期和时间 -->
    <template v-else-if="field.type === 'datePicker' || field.type === 'timePicker'">
      {{ formatDateTime(valueData, field.valueFormat) }}
    </template>
    
    <!-- 开关 -->
    <template v-else-if="field.type === 'switch'">
      <el-tag :type="valueData === field.activeValue ? 'success' : 'info'" size="small">
        {{ valueData === field.activeValue ? (field.activeText || '是') : (field.inactiveText || '否') }}
      </el-tag>
    </template>
    
    <!-- 图片 -->
    <template v-else-if="field.type === 'image'">
      <el-image 
        :src="valueData" 
        :preview-src-list="[valueData]"
        fit="cover"
        :style="{width: field.imageWidth || '50px', height: field.imageHeight || '50px'}"
        v-if="valueData"
      />
      <span v-else class="empty-cell">-</span>
    </template>
    
    <!-- 级联选择器 -->
    <template v-else-if="field.type === 'cascader'">
      {{ getCascaderLabel(valueData, field.options) }}
    </template>
    
    <!-- 滑块 -->
    <template v-else-if="field.type === 'slider'">
      <el-progress :percentage="valueData" :stroke-width="8" />
    </template>
    
    <!-- 评分 -->
    <template v-else-if="field.type === 'rate'">
      <el-rate :model-value="valueData" disabled show-score />
    </template>
    
    <!-- 颜色选择器 -->
    <template v-else-if="field.type === 'colorPicker'">
      <div class="color-display">
        <span 
          class="color-block" 
          :style="{backgroundColor: valueData}"
        ></span>
        <span class="color-value">{{ valueData }}</span>
      </div>
    </template>
    
    <!-- 自定义格式化 -->
    <template v-else-if="field.formatter">
      {{ field.formatter(valueData) }}
    </template>
    
    <!-- 默认情况 -->
    <template v-else>
      <span v-if="valueData !== undefined && valueData !== null">{{ valueData }}</span>
      <span v-else class="empty-cell">-</span>
    </template>
  </template>
  
  <!-- 编辑模式 -->
  <template v-else>
    <!-- 输入框 -->
    <el-input 
      v-if="!field.type || field.type === 'input'" 
      v-model="modelValue"
      :placeholder="placeholder || '请输入' + field.label"
      clearable
      v-bind="fieldProps"
      @keyup.enter="$emit('enter')"
      @update:model-value="updateValue"
    />
    
    <!-- 下拉选择框 -->
    <el-select 
      v-else-if="field.type === 'select'"
      v-model="modelValue"
      :placeholder="placeholder || '请选择' + field.label"
      :filterable="field.filterable !== false"
      :multiple="field.multiple || false"
      clearable
      v-bind="fieldProps"
      @update:model-value="updateValue"
    >
      <el-option
        v-for="item in field.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    
    <!-- 日期选择器 -->
    <el-date-picker
      v-else-if="field.type === 'datePicker'"
      v-model="modelValue"
      :type="field.dateType || 'date'"
      :placeholder="placeholder || '请选择' + field.label"
      :value-format="field.valueFormat || 'YYYY-MM-DD'"
      clearable
      v-bind="fieldProps"
      @update:model-value="updateValue"
    />
    
    <!-- 时间选择器 -->
    <el-time-picker
      v-else-if="field.type === 'timePicker'"
      v-model="modelValue"
      :placeholder="placeholder || '请选择' + field.label"
      :value-format="field.valueFormat || 'HH:mm:ss'"
      clearable
      v-bind="fieldProps"
      @update:model-value="updateValue"
    />
    
    <!-- 级联选择器 -->
    <el-cascader
      v-else-if="field.type === 'cascader'"
      v-model="modelValue"
      :options="field.options"
      :props="field.props || { expandTrigger: 'hover' }"
      :placeholder="placeholder || '请选择' + field.label"
      clearable
      v-bind="fieldProps"
      @update:model-value="updateValue"
    />
    
    <!-- 数字输入框 -->
    <el-input-number
      v-else-if="field.type === 'inputNumber'"
      v-model="modelValue"
      :placeholder="placeholder || '请输入' + field.label"
      :min="field.min"
      :max="field.max"
      :step="field.step || 1"
      v-bind="fieldProps"
      @update:model-value="updateValue"
    />
    
    <!-- 滑块 -->
    <el-slider
      v-else-if="field.type === 'slider'"
      v-model="modelValue"
      :min="field.min"
      :max="field.max"
      :step="field.step || 1"
      v-bind="fieldProps"
      @update:model-value="updateValue"
    />
    
    <!-- 评分 -->
    <el-rate
      v-else-if="field.type === 'rate'"
      v-model="modelValue"
      v-bind="fieldProps"
      @update:model-value="updateValue"
    />
    
    <!-- 颜色选择器 -->
    <el-color-picker
      v-else-if="field.type === 'colorPicker'"
      v-model="modelValue"
      v-bind="fieldProps"
      @update:model-value="updateValue"
    />
    
    <!-- 开关 -->
    <el-switch
      v-else-if="field.type === 'switch'"
      v-model="modelValue"
      :active-value="field.activeValue"
      :inactive-value="field.inactiveValue"
      :active-text="field.activeText"
      :inactive-text="field.inactiveText"
      v-bind="fieldProps"
      @update:model-value="updateValue"
    />
    
    <!-- 单选框组 -->
    <el-radio-group 
      v-else-if="field.type === 'radio'" 
      v-model="modelValue"
      v-bind="fieldProps"
      @update:model-value="updateValue"
    >
      <el-radio
        v-for="item in field.options"
        :key="item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio>
    </el-radio-group>
    
    <!-- 复选框组 -->
    <el-checkbox-group 
      v-else-if="field.type === 'checkbox'" 
      v-model="modelValue"
      v-bind="fieldProps"
      @update:model-value="updateValue"
    >
      <el-checkbox
        v-for="item in field.options"
        :key="item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </template>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  value: {
    type: [String, Number, Boolean, Array, Object],
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  fieldProps: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String,
    default: 'edit', // 'edit' 或 'view'
    validator: (value) => ['edit', 'view'].includes(value)
  }
})

const emit = defineEmits(['update:value', 'enter'])

// 内部响应式状态 - 重命名以避免与 props.value 冲突
const modelValue = ref(props.value)
// 计算属性用于模板中，避免直接使用 props.value
const valueData = computed(() => props.value)

// 监听外部值变化
watch(() => props.value, (newVal) => {
  modelValue.value = newVal
})

// 同步回外部
const updateValue = (val) => {
  emit('update:value', val)
}

// 获取选项标签
const getOptionLabel = (val, options) => {
  if (!options) return val
  if (val === undefined || val === null) return '-'
  
  const option = options.find(opt => opt.value === val)
  return option ? option.label : val
}

// 获取多选项标签
const getCheckboxLabels = (vals, options) => {
  if (!options) return vals
  if (!Array.isArray(vals) || vals.length === 0) return '-'
  
  return vals
    .map(val => {
      const option = options.find(opt => opt.value === val)
      return option ? option.label : val
    })
    .join('、')
}

// 获取级联选择器标签
const getCascaderLabel = (val, options) => {
  if (!options || !val) return '-'
  
  // 简单实现，实际可能需要递归处理
  let labels = []
  
  const findLabels = (val, options, result = []) => {
    if (!Array.isArray(val)) return
    
    let currentOptions = options
    for (let i = 0; i < val.length; i++) {
      const currentValue = val[i]
      const option = currentOptions.find(opt => opt.value === currentValue)
      
      if (option) {
        result.push(option.label)
        if (option.children && i < val.length - 1) {
          currentOptions = option.children
        } else {
          break
        }
      }
    }
    
    return result
  }
  
  labels = findLabels(val, options, [])
  return labels ? labels.join(' / ') : '-'
}

// 格式化日期时间
const formatDateTime = (val, format) => {
  if (!val) return '-'
  try {
    // 简单实现，实际项目中建议使用日期库
    const date = new Date(val)
    if (isNaN(date.getTime())) return val
    
    return date.toLocaleString()
  } catch (e) {
    return val || '-'
  }
}
</script>

<style scoped>
.empty-cell {
  color: #909399;
}

.color-display {
  display: flex;
  align-items: center;
}

.color-block {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
}

.color-value {
  font-size: 12px;
  color: #606266;
}

.el-rate {
  margin-top: 2px;
}
</style>