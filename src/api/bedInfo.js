import request from "@/utils/request"

export const getBedList = (params) => {
  return request.post("/app/zy/bu/bed/list", params)
}


