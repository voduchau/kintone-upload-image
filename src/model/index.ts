declare const kintone: any;
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "./index.css";
import axios from "../axios";
import { Spinner } from "spin.js";
import { KINTONE_BASE_URL, KINTONE_APP_ID, ATTACHMENT_CODE, TEXT_CODE } from "../constant"

export const renderUI = () => {
  handlePreviewImageInComment();
  ObserverWhenPostCommnet();

  const textAriaElement = document.querySelector(
    ".ocean-ui-comments-commentform-textarea"
  );
  // event editor focus
  textAriaElement.addEventListener("focus", () => {
    const check = document.querySelector(".btn-choose");
    if (check) return;

    // button choose file
    const button = document.createElement("button");
    button.innerHTML = "<i class='fa-solid fa-image'></i>";
    button.classList.add("btn-choose");
    button.addEventListener("click", () => {
      inputEl.click();
    });

    // Input file
    const inputEl = document.createElement("input");
    inputEl.setAttribute("type", "file");
    inputEl.setAttribute("hidden", "true");
    inputEl.setAttribute("accept", "image/png, image/gif, image/jpeg");

    // Event file change
    inputEl.onchange = (event: Event) => {
      const [file] = (event.target as any).files;
      if (file) {
        handlePreviewAndUploadImage(file);
      }
    };

    // Append icon chose image
    const toolBarEl = document.querySelector(".goog-toolbar-horizontal");
    toolBarEl.appendChild(inputEl);
    toolBarEl.appendChild(button);
  });
};

function handlePreviewImageInComment() {
  const imageInComment = document.querySelectorAll(
    ".user-token-gaia-ui-slideshow-thumbnail"
  );
  imageInComment.forEach((img: HTMLImageElement) => {
    img.addEventListener("click", () => {
      previewImage(img.src.replace(/&thumbnail=true/g, ""));
    });
  });
}

const handlePreviewAndUploadImage = async (file: any) => {
  var reader = new FileReader();

  reader.onload = function (event) {
    const editor = document.querySelector(".ocean-editor-seamless");
    const divWraperSpinner = document.createElement("div");
    divWraperSpinner.classList.add("spinner-wrapper");
    divWraperSpinner.style.width = "50px";
    editor.appendChild(divWraperSpinner);

    const spinner = addSpin();
    getFileKeyAfterUpload(file).then(res => {
      uploadImageToKintone(res.fileKey).then((response: any) => {
        const iframeElement = document.createElement("iframe");
        iframeElement.src = `${KINTONE_BASE_URL}/k/${KINTONE_APP_ID}/show#record=${response.data.id}`;
        iframeElement.style.display = "none";
        document.body.appendChild(iframeElement).onload = () => {
          setTimeout(() => {
            const imgEl = document
              .querySelector("iframe")
              .contentWindow.document.querySelector(
                ".file-image-container-gaia img"
              ) as HTMLImageElement;

            // Create image element and add to editor
            const imageEl = createImgElement(imgEl.src);
            const editorEl = document.querySelector(".ocean-editor-seamless");
            editorEl.appendChild(imageEl);
            spinner.stop();

            // event click preview image
            imageEl.addEventListener("click", () => {
              previewImage(reader.result);
            });
            iframeElement.remove();
          }, 2000);
        };
      });
    });
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};

function createImgElement(fileValue: string) {
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", fileValue);
  imgEl.classList.add("gaia-ui-slideshow-thumbnail");
  imgEl.style.maxWidth = "85%";

  return imgEl;
}

function previewImage(src: any) {
  const lightBoxDiv = document.querySelector(
    ".lightbox-target"
  ) as HTMLDivElement;

  // If existed -> display it with new src.
  if (lightBoxDiv) {
    lightBoxDiv.style.display = "flex";
    const imgEl = document.getElementById("img-preview") as HTMLImageElement;
    imgEl.src = src;
  } else {
    // If not -> create preview element.
    const lightBoxDiv = document.createElement("div");
    lightBoxDiv.classList.add("lightbox-target");

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-preview");
    closeBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    closeBtn.addEventListener("click", () => {
      lightBoxDiv.style.display = "none";
    });

    const imgPreviewEl = document.createElement("img");
    imgPreviewEl.id = "img-preview";
    imgPreviewEl.src = src;

    // don't close preview when click in image.
    imgPreviewEl.addEventListener("click", e => {
      e.stopPropagation();
    });

    // close preview when click outside of image.
    lightBoxDiv.addEventListener("click", () => {
      lightBoxDiv.style.display = "none";
    });

    lightBoxDiv.appendChild(imgPreviewEl);
    lightBoxDiv.appendChild(closeBtn);
    document.body.appendChild(lightBoxDiv);
  }
}

export function uploadImageToKintone(fileKey: any) {
  return new kintone.Promise((resolve: any, reject: any) => {
    // config app to storage image on kintone here
    const body = getBodyParamsUploadKintone(fileKey, TEXT_CODE, ATTACHMENT_CODE)
    axios
      .post("/k/v1/record.json", body)
      .then(function (response: any) {
        resolve(response);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });
}

function getBodyParamsUploadKintone(fileKey: string, TEXT_CODE: string, ATTACHMENT_CODE: string ) {
  let body = {
    app: KINTONE_APP_ID,
    record: {}
  } as any;
  body.record[TEXT_CODE]= {
    value: "Sample"
  };
  body.record[ATTACHMENT_CODE]= {
    value: [
      {
        contentType: "text/plain",
        fileKey: fileKey
      }
    ]
  }

  return body;
}

async function getFileKeyAfterUpload(file: File) {
  const formData = new FormData();
  formData.append("__REQUEST_TOKEN__", kintone.getRequestToken());
  formData.append("file", file, file.name);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", kintone.api.url("/k/v1/file", true));
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  const response = new Promise((resolve, reject) => {
    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = err => {
      reject(err);
    };
    xhr.send(formData);
  });
  return (await response) as Record<string, string>;
}

// BLOB TO DATA URL
function dataURLtoBlob(dataurl: any) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

//**blob to dataURL**
function blobToDataURL(blob: any, callback: any) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}

//test:
var blob = dataURLtoBlob("data:text/plain;base64,YWFhYWFhYQ==");
blobToDataURL(blob, function (dataurl: any) {
  console.log(dataurl);
});

function ObserverWhenPostCommnet() {
  var target = document.querySelector(".itemlist-gaia");
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      handlePreviewImageInComment();
    });
  });
  var config = { attributes: true, childList: true, characterData: true };
  observer.observe(target, config);
}

function addSpin() {
  var opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 0.2, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: "spinner-line-fade-quick", // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: "black", // CSS color or array of colors
    fadeColor: "transparent", // CSS color or array of colors
    top: "50%", // Top position relative to parent
    left: "50%", // Left position relative to parent
    shadow: "0 0 1px transparent", // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: "spinner", // The CSS class to assign to the spinner
    position: "absolute" // Element positioning
  };

  var target = document.querySelector(".spinner-wrapper") as HTMLElement;
  var spinner = new Spinner(opts).spin(target);

  return spinner;
}
