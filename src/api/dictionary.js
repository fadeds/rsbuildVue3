import request from "@/utils/request"
// 患者列表
export const getList = (params) => {
  return request.post("/app/zy/zd/list", params)
}
export const info = (params) => {
  return request.post(`/app/zy/zd/info/${params.id}`, params)
}
export const save = (params) => {
  return request.post("/app/zy/zd/save", params)
}
export const update = (params) => {
  return request.post("/app/zy/zd/update", params)
}
export const deleteData = (params) => {
  return request.post("/app/zy/zd/delete", params)
}