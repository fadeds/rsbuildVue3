import request from "@/utils/request"
// 患者列表
export const getList = (params) => {
  return request.post("/app/zy/inhospital/list", params)
}
export const info = (params) => {
  return request.post(`/app/zy/inhospital/info/${params.id}`, params)
}
export const save = (params) => {
  return request.post("/app/zy/inhospital/save", params)
}
export const update = (params) => {
  return request.post("/app/zy/inhospital/update", params)
}
export const deleteData = (params) => {
  return request.post("/app/zy/inhospital/delete", params)
}