declare const chrome: any;
declare const kintone: any;

import { permisstion } from "../../config";
import { handleUploadImage } from "../model";

let check = false;
let count = 0;

const onBeforeRequestListener = (details: any) => {};

// const renderPortal = () => {
//   let calendarScript = chrome.runtime.getURL("js/contentScript.js");
//   createScriptInject({
//     src: calendarScript
//   });
// };

// const createScriptInject = (props: any) => {
//   let script = document.createElement("script");
//   script.id = props.id;
//   script.type = "text/javascript";
//   script.src = props.src;
//   if (props.onload) script.onload = () => props.onload();
//   document.body.appendChild(script);
// };

// if (window.location.href.includes("/k/#")) renderPortal();

const onBeforeSendHeadersListener = (details: any) => {
  // console.log("onBeforeSendHeadersListener", details);
  // if (count === 0) {
  //   alert(JSON.stringify(kintone));
  //   count++;
  // }
  // kintone.events.on("app.record.detail.show", function (event: any) {
  //   if (check === false) {
  //     alert("hello");
  //     handleUploadImage();
  //     check = true;
  //   }
  //   return event;
  // });
};

chrome.tabs.onUpdated.addListener(function () {
  // let hasAccessDomain = checkAccessDomain(tab);
  // if (changeInfo.status === "complete" && hasAccessDomain) {
  //   injectExtensionToDomain();
  //   chrome.pageAction.show(tabId);
  //   return;
  // }
  // chrome.pageAction.show(tabId);
  console.log("456");
  console.log(kintone);

  if (count === 0) {
    alert(JSON.stringify(kintone));
    count++;
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  onBeforeSendHeadersListener,
  {
    urls: permisstion.urls
  },
  permisstion.request_header
);

chrome.webRequest.onBeforeRequest.addListener(
  onBeforeRequestListener,
  {
    urls: permisstion.urls
  },
  permisstion.before_send
);
