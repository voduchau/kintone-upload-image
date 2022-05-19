declare const kintone: any;
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "./index.css";
import axios from "../axios";

export const renderUI = () => {
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

const handlePreviewAndUploadImage = async (file: any) => {
  var reader = new FileReader();
  reader.onload = function (event) {
    var fileValue = event.target.result.toString();
    const imageEl = createImgElement(fileValue);
    const editorEl = document.querySelector(".ocean-editor-seamless");
    editorEl.appendChild(imageEl);

    // event click preview image
    imageEl.addEventListener("click", () => {
      previewImage(fileValue);
    });
    getFileKeyAfterUpload(file).then(res => {
      uploadImageToKintone(res.fileKey);
    });
  };
  reader.readAsDataURL(file);
};

function createImgElement(fileValue: string) {
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", fileValue);
  imgEl.classList.add("gaia-ui-slideshow-thumbnail");
  imgEl.style.maxWidth = "85%";

  return imgEl;
}

function previewImage(src: string) {
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
    document.body.appendChild(lightBoxDiv);
  }
}

function getDataImage(event: Event) {
  let reader;
  let dataImg;
  if ((event.target as any).files && (event.target as any).files[0]) {
    reader = new FileReader();

    reader.onload = function (e) {
      dataImg = e.target.result;
    };

    reader.readAsDataURL((event.target as any).files[0]);
  }
  return dataImg;
}

export function uploadImageToKintone(fileKey: any) {
  return new kintone.Promise((resolve: any, reject: any) => {
    // config app to storage image on kintone here
    var body = {
      app: 25,
      record: {
        Text: {
          value: "Sample"
        },
        Attachment: {
          value: [
            {
              contentType: "text/plain",
              fileKey: fileKey
            }
          ]
        }
      }
    };

    axios
      .post("/k/v1/record.json", body)
      .then(function (response: any) {
        console.log(response, "res");
      })
      .catch(function (error: any) {
        console.log(error);
      });
  });
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
