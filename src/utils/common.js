import request from "@/utils/request"
// 患者列表
export const getPatientList=(params)=>{
  return request.post("/app/zy/patientinfo/list",params,)
}


