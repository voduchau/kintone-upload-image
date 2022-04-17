declare const kintone: any;
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "./index.css";
import image from "./assets/images/logo.png";

(() => {
  kintone.events.on("app.record.detail.show", function (event: any) {
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
        img.setAttribute("src", image);
        const editorEl = document.querySelector(".ocean-editor-seamless");
        editorEl.appendChild(img);
      };

      const toolBarEl = document.querySelector(".goog-toolbar-horizontal");
      toolBarEl.appendChild(inputEl);
      toolBarEl.appendChild(button);
    });

    return event;
  });
})();
