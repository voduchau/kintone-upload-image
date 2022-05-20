import { PROVIDER, KINTONE_APP_ID_DEFAULT, KINTONE_API_TOKEN_DEFAULT, KINTONE_SETTING } from "../config";

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