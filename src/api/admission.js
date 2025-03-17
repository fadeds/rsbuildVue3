import request from "@/utils/request"
// 患者列表
export const inHospital = (params) => {
  return request.post("/app/zy/bu/inHospital", params)
}
