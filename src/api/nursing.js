import request from "@/utils/request"
// 患者列表
export const getList = (params) => {
  return request.post("/app/zy/adviceinfo/list", params)
}
export const info = (params) => {
  return request.post(`/app/zy/adviceinfo/info/${params.id}`, params)
}
export const save = (params) => {
  return request.post("/app/zy/adviceinfo/save", params)
}
export const update = (params) => {
  return request.post("/app/zy/adviceinfo/update", params)
}
export const deleteData = (params) => {
  return request.post("/app/zy/adviceinfo/delete", params)
}