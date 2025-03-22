<template>
  <ElConfigProvider :locale="zhCn">
  <router-view></router-view>
  </ElConfigProvider>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {getList,save,deleteData,update,info } from '@/api/dictionary.js'
import { onMounted } from 'vue'
onMounted(()=>{
    getList({}).then(res=>{
      const groupedData = res.result.reduce((acc, curr) => {
      const { typeName } = curr
      if (!acc[typeName]) {
        acc[typeName] = []
      }
      acc[typeName].push(curr)
      return acc
    }, {})
      localStorage.setItem('dicOption',JSON.stringify(groupedData))
    })
})
</script>

