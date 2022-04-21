declare const kintone: any;
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "./index.css";

const imgUrl = "https://haula.kintone.com/k/api/record/download.do/-/code.png?app=254&thumbnail=false&field=6366029&detectType=true&record=2&row=24232&id=20873&hash=190f3738bf118a0d7c7f9a595e12f083e1f6a8ba&revision=2&.png&w=150&h=150&flag=SHRINK";

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
    };

    const toolBarEl = document.querySelector(".goog-toolbar-horizontal");
    toolBarEl.appendChild(inputEl);
    toolBarEl.appendChild(button);
  });
};
