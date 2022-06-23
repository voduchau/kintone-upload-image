import { KINTONE_BASE_URL, KINTONE_TOKEN, IMGUR_BASE_URL } from "../constant"
import { getAxios, postAxios } from "./base";

export const postImgToKintone = async (url: string, options: any) => {
  const apiUrl = `${KINTONE_BASE_URL}${url}`
  return postAxios(options, apiUrl, "kintone");
}

export const postImgToImgUr = async (options: any) => {
  return postAxios(options, IMGUR_BASE_URL, "imgur");
}
