import request from "@/utils/request"
// 患者列表
export const getList = (params) => {
  return request.post("/app/zy/adviceinfo/list", params)
}

// 获取医嘱号
export const getAdviceNo = () => {
  return request.post("/app/zy/adviceinfo/getAdviceNo")
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
// 医嘱执行
export const druglist = (params) => {
  return request.post("/app/zy/drugMedical/druglist", params)
}
export const getId = (params) => {
  return request.post("/app/zy/bu/getId", params)
}
