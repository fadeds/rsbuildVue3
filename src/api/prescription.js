import request from "@/utils/request"
// 患者列表
export const getList = (params) => {
  return request.post("/app/zy/cf/list", params)
}
export const info = (params) => {
  return request.post(`/app/zy/cf/info/${params.id}`, params)
}
export const deleteData = (params) => {
  return request.post("/app/zy/cf/delete", params)
}
