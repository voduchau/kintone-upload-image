export const KINTONE_APP_ID_DEFAULT = 48;
export const KINTONE_API_TOKEN_DEFAULT = "";

export const PROVIDER = {
  KINTONE: "KINTONE",
  IMGUR: "IMGUR"
}

export const permisstion = {
  urls: ["https://*.kintone.com/*"],
  request_header: ["requestHeaders", "blocking"],
  before_send: ["requestBody", "blocking"]
}

export const KINTONE_SETTING = {
  MAX_FILE_SIZE: {
    FILE: 1024,
    IMG: 1024,
  },
  ALLOW_EXT: [".png", ".jpg", ".jpeg", ".pdf", ".doc", ".docx"],
}

export const IMGUR_SETTING = {
  MAX_FILE_SIZE: {
    IMG: 1024,
  },
  ALLOW_EXT: [".png", ".jpg", ".jpeg"],
}
