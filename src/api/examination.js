import request from "@/utils/request"
// 患者列表
export const getList = (params) => {
  return request.post("/app/zy/treatment/list", params)
}
export const info = (params) => {
  return request.post(`/app/zy/treatment/info/${params.id}`, params)
}
export const save = (params) => {
  return request.post("/app/zy/treatment/save", params)
}
export const update = (params) => {
  return request.post("/app/zy/treatment/update", params)
}
export const deleteData = (params) => {
  return request.post("/app/zy/treatment/delete", params)
}