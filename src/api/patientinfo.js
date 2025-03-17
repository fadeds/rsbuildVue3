import request from "@/utils/request"
// 患者列表
export const getList = (params) => {
  return request.post("/app/zy/patientinfo/list", params)
}
export const info = (params) => {
  return request.post(`/app/zy/patientinfo/info/${params.id}`, params)
}
export const save = (params) => {
  return request.post("/app/zy/patientinfo/save", params)
}
export const update = (params) => {
  return request.post("/app/zy/patientinfo/update", params)
}
export const deleteData = (params) => {
  return request.post("/app/zy/patientinfo/delete", params)
}
