import axios from 'axios';
import { PROVIDER, KINTONE_APP_ID_DEFAULT, KINTONE_API_TOKEN_DEFAULT, KINTONE_SETTING } from "../config";

const BASE_URL = 'https://rssnow.ga/api/aphoto/';

export const getSettingUploadInfo = (provider: string) => {
  if(provider == PROVIDER.KINTONE) return {
    provider: PROVIDER.KINTONE,
    appId: KINTONE_APP_ID_DEFAULT,
    apiToken: KINTONE_API_TOKEN_DEFAULT,
    maxFileSize: KINTONE_SETTING.MAX_FILE_SIZE.FILE,
    maxImgSize: KINTONE_SETTING.MAX_FILE_SIZE.IMG,
    allowExt: KINTONE_SETTING.ALLOW_EXT
  }
  return {
    provider: PROVIDER.IMGUR,
    clientId: "",
    clientSecret: ""
  }
}

export const getConfig = async() => {
  const resp = await axios.get(BASE_URL);
  if(!resp || !resp.data || !resp.data.setting) return null;
  return resp.data.setting;
}
