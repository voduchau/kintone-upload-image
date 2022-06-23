const axios = require("axios");
declare const kintone: any;
import { KINTONE_BASE_URL, KINTONE_TOKEN } from "../constant"

const instance = axios.create({
  baseURL: KINTONE_BASE_URL,
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    "X-Cybozu-API-Token": KINTONE_TOKEN
  }
});

instance.interceptors.request.use(function (config: any) {
  config.headers[
    "Authorization"
  ] = `Bearer ${KINTONE_TOKEN}`;
  return config;
});

export default instance;
