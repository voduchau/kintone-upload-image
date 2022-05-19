const axios = require("axios");
declare const kintone: any;

const instance = axios.create({
  baseURL: "https://vo-hau.kintone.com",
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
    "X-Cybozu-API-Token": "WpMBzvt2AdRb6aoVgZhNan99kcQuCP6599zFdvH9"
  }
});

instance.interceptors.request.use(function (config: any) {
  config.headers[
    "Authorization"
  ] = `Bearer WpMBzvt2AdRb6aoVgZhNan99kcQuCP6599zFdvH9`;
  return config;
});

export default instance;
