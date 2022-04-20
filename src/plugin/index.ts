declare const kintone: any;
import "../style/css/index.css";
import { renderUI } from "../model";

(() => {
  kintone.events.on('app.record.detail.show', (event: any) => {
    renderUI();
    return event;
  });
})();
