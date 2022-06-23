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

function setConfig(data) {
  localStorage.setItem('aPhotoConfig', JSON.stringify(data));
}

function getConfig() {
  const config = localStorage.getItem('aPhotoConfig');
  return JSON.parse(config)
}

function init() {
  const data = getConfig();
  if(data) {
    if(data.provider) setProvider(data.provider);
  }
}

function setProvider(provider) {
  if(!provider) return;
  $("#provider").val(provider);
}

init();