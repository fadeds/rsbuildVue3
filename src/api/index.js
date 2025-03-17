import request from "@/utils/request"
// 药品列表
export const getdrugMedical = (params) => {
  return request.post("/app/zy/drugMedical/druglist", params)
}
// 诊疗项目
export const getMedicallist = (params) => {
  return request.post("/app/zy/drugMedical/medicallist", params)
}
// 住院登记
export const inHospital = (params) => {
  return request.post("/app/zy/bu/inHospital", params)
}
// 医嘱执行
export const exeNursing = (params) => {
  return request.post("/app/zy/bu/exe", params)
}
