import axios from 'axios';
import { KINTONE_TOKEN, IMGUR_CLIENT_ID } from "../../constant"

export const getAxios = async (options: any, apiUrl: string, type: string) => {
    const config = getHeaderBeforeRequestApi(type);
    return await axios.get(apiUrl, config);
};

export const postAxios = async (options: any, apiUrl: any, type: string) => {
    const config = getHeaderBeforeRequestApi(type);
    return await axios.post(apiUrl, options, config);
};

const getHeaderBeforeRequestApi = (type: string) => {
    const config = {
      headers: {}
    } as any;
    if(type === "kintone") {
        config.headers["Authorization"] = `Bearer ${KINTONE_TOKEN}`;
        config.headers["X-Custom-Header"] = `foobar`;
        config.headers["X-Cybozu-API-Token"] = KINTONE_TOKEN;
    }
    if(type === "imgur") {
        config.headers["Authorization"] = `Client-ID ${IMGUR_CLIENT_ID}`;
        config.headers["Content-Type"] = `multipart/form-data`;
    }
    return config;
  }
