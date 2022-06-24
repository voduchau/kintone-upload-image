import axios from 'axios';
const BASE_URL = 'https://rssnow.ga/api/aphoto/';

$("#btnSave").click(function() {
  $(".alert.alert-success").show();

  const apiToken = $("#apiToken").val();
  const clientSecret = $("#clientSecret").val();
  if(apiToken.length > 0 && apiToken.indexOf(".........") === -1) {
    const apiKey = formatKeySecret(apiToken);
    $("#apiToken").val(apiKey);
  }

  if(clientSecret.length > 0 && clientSecret.indexOf(".........") === -1) {
    const clientSecretKey = formatKeySecret(clientSecret);
    $("#clientSecret").val(clientSecretKey);
  }

  const provider = $("#provider").val();
  setConfig({provider: provider});

  setTimeout(function (){$(".alert.alert-success").hide();}, 2000);
})

function formatKeySecret(str) {
  if(!str) return "";
  if(str.length < 12) return str;
  const firstChar = str.substring(0, 6);
  const lastChar = str.slice(-6);
  return `${firstChar}.........${lastChar}`;
}

async function setConfig(data) {
  const url = `${BASE_URL}set_setting`;
  const resp = await axios.post(url, {setting: data});
  if(!resp || !resp.data || !resp.data.error) return false;
  return true;
}

async function getConfig() {
  const resp = await axios.get(BASE_URL);
  if(!resp || !resp.data || !resp.data.setting) return null;
  return resp.data.setting;
}

async function init() {
  const data = await getConfig();

  if(data) {
    if(data.provider) setProvider(data.provider);
  }
}

function setProvider(provider) {
  if(!provider) return;
  $("#provider").val(provider);
}

init();
