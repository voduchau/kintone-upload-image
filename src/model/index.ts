declare const kintone: any;
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "./index.css";

const imgUrl = "https://www.w3schools.com/tags/img_girl.jpg";

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
    inputEl.onchange = (event: any) => {
      const img = document.createElement("img");
      img.setAttribute("src", imgUrl);
      img.classList.add("gaia-ui-slideshow-thumbnail");
      img.style.maxWidth = "85%";
      const editorEl = document.querySelector(".ocean-editor-seamless");
      editorEl.appendChild(img);

      // event click preview image
      img.addEventListener("click", () => {
        previewImage();
      });
    };

    const toolBarEl = document.querySelector(".goog-toolbar-horizontal");
    toolBarEl.appendChild(inputEl);
    toolBarEl.appendChild(button);
  });
};

function previewImage() {
  const lightBoxDiv = document.querySelector(
    ".lightbox-target"
  ) as HTMLDivElement;

  // If existed -> display it with new src.
  if (lightBoxDiv) {
    lightBoxDiv.style.display = "flex";
    const imgEl = document.getElementById("img-preview") as HTMLImageElement;
    imgEl.src = imgUrl;
  } else {
    // If not -> create preview element.
    const lightBoxDiv = document.createElement("div");
    lightBoxDiv.classList.add("lightbox-target");

    const imgPreviewEl = document.createElement("img");
    imgPreviewEl.id = "img-preview";
    imgPreviewEl.src = imgUrl;

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
