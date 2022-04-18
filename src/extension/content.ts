declare const kintone: any;
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "../style/css/index.css";
import { renderUI } from "../model";

(() => {
  kintone.events.on("app.record.detail.show", function (event: any) {
    renderUI();
    return event;
  });
})();
