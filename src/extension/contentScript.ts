declare const chrome: any;

const injectScript = () => {
  let contentScript = chrome.runtime.getURL("js/content.js");
  createScriptInject({
    src: contentScript
  });
};

const createScriptInject = (props: any) => {
  let script = document.createElement("script");
  script.id = props.id;
  script.type = "text/javascript";
  script.src = props.src;
  if (props.onload) script.onload = () => props.onload();
  document.body.appendChild(script);
};

if (window.location.href.includes("/k/")) injectScript();
