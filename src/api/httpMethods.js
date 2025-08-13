import axios from "axios"
import { instance } from "./axiosInstance"

export const postRequest = (
  baseUrl,
  data,
  contentType = "application/json"
) => {
  return instance({
    method: "POST",
    url: baseUrl,
    headers: {
      "Content-Type": contentType,
    },
    data: data,
  })
}

export const getRequest = (baseUrl) => {
  return instance({
    method: "GET",
    url: baseUrl,
  })
}

export const putRequest = (baseUrl, data, contentType = "application/json") => {
  return instance({
    method: "PUT",
    url: baseUrl,
    headers: {
      "Content-Type": contentType,
    },
    data: data,
  })
}

export const patchRequest = (
  baseUrl,
  data,
  contentType = "application/json"
) => {
  return instance({
    method: "PATCH",
    url: baseUrl,
    headers: {
      "Content-Type": contentType,
    },
    data: data,
  })
}

export const deleteRequest = (baseUrl) => {
  return axios({
    method: "DELETE",
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// export const postFileData = (
//   baseUrl,
//   data,
//   token = null,
//   contentType = "multipart/form-data"
// ) => {
//   const formData = new FormData()
//   formData.append("file", data)
//   return postRequest(baseUrl, formData, (token = null), contentType)
// }
