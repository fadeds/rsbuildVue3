import axios from "axios"
import { ElMessage } from "element-plus"

// 创建axios实例
const service = axios.create({
  // 根据环境变量设置baseURL
  // baseURL: import.meta.env.MODE === "development" ? "/api" : "/",
  timeout: 15000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
})

// 用于存储正在进行的请求
const pendingRequests = new Map()

// 生成请求的唯一key
const generateRequestKey = (config) => {
  const { url, method, params, data } = config
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&")
}

// 从响应头中获取文件名
const getFilenameFromResponse = (response) => {
  const contentDisposition = response.headers["content-disposition"]
  if (contentDisposition) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(contentDisposition)
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, "")
    }
  }
  return `download_${Date.now()}.xlsx`
}

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 如果是下载请求，不进行防抖处理
    if (config.responseType === "blob") {
      return config
    }

    // 生成请求key
    const requestKey = generateRequestKey(config)

    // 如果存在相同请求，则取消之前的请求
    if (pendingRequests.has(requestKey)) {
      const { controller } = pendingRequests.get(requestKey)
      controller.abort()
    }

    // 创建新的AbortController
    const controller = new AbortController()
    config.signal = controller.signal

    // 将请求添加到pendingRequests
    pendingRequests.set(requestKey, {
      controller,
      timestamp: Date.now(),
    })

    // 添加token到请求头
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 如果是文件下载，直接返回response
    if (response.config.responseType === "blob") {
      return response
    }

    // 请求完成后从pendingRequests中移除
    const requestKey = generateRequestKey(response.config)
    pendingRequests.delete(requestKey)

    const res = response.data

    // 根据业务状态码处理响应
    if (res.code !== 0) {
      ElMessage({
        message: res.message || "请求失败",
        type: "error",
        duration: 5 * 1000,
      })

      // 处理特定错误码
      if (res.code === 401) {
        // 未授权，可以在这里处理登出逻辑
      }

      return Promise.reject(new Error(res.message || "请求失败"))
    } else {
      return res
    }
  },
  (error) => {
    // 如果是取消请求的错误，不显示错误信息
    if (axios.isCancel(error)) {
      console.log("请求已取消:", error.message)
      return Promise.reject(error)
    }

    // 请求失败后从pendingRequests中移除
    if (error.config) {
      const requestKey = generateRequestKey(error.config)
      pendingRequests.delete(requestKey)
    }

    ElMessage({
      message: error.message || "请求失败",
      type: "error",
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

// 定期清理长时间未完成的请求（5分钟）
setInterval(() => {
  const now = Date.now()
  pendingRequests.forEach((value, key) => {
    if (now - value.timestamp > 5 * 60 * 1000) {
      value.controller.abort()
      pendingRequests.delete(key)
    }
  })
}, 60 * 1000)

// 请求方法封装
const request = {
  get(url, params, config = {}) {
    return service.get(url, { params, ...config })
  },
  post(url, data, config = {}) {
    return service.post(url, data, config)
  },
  put(url, data, config = {}) {
    return service.put(url, data, config)
  },
  delete(url, params, config = {}) {
    return service.delete(url, { params, ...config })
  },
  // 文件下载方法
  download(url, data = {}, filename = "", config = {}) {
    return service
      .post(url, data, {
        responseType: "blob",
        ...config,
      })
      .then((response) => {
        // 创建blob链接并下载
        const blob = new Blob([response.data])
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = filename || getFilenameFromResponse(response)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
        return response
      })
      .catch((error) => {
        // 处理下载错误
        if (error.response && error.response.data) {
          // 尝试解析错误信息
          const reader = new FileReader()
          reader.onload = () => {
            try {
              const errorData = JSON.parse(reader.result)
              ElMessage.error(errorData.message || "下载失败")
            } catch (e) {
              ElMessage.error("下载失败")
            }
          }
          reader.readAsText(error.response.data)
        } else {
          ElMessage.error("下载失败")
        }
        return Promise.reject(error)
      })
  },
}

export default request
