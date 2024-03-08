import { createApp, h } from "vue";

import PageNavigationButtonLinks from "./PageNavigationButtonLinks.vue";

export function renderPreviousAndNextButton(previousUrl, nextUrl) {
  setTimeout(() => {
    removeCanvasButtons();
    let parentElement = document.getElementsByClassName("module-sequence-footer-content")[0];
    parentElement.id= "custom-footer-content"
    let buttonWrapper = document.createElement("div");
    buttonWrapper.setAttribute('class', "custom-button-navigation-wrapper")
    buttonWrapper.id = 'custom-button-navigation';
    parentElement.appendChild(buttonWrapper);
    parentElement.classList.remove('module-sequence-footer-content')
    parentElement.classList.add('module-sequence-custom-footer-content')
    const customPageNavigationButtonLinks = createApp({
      render: () => h(PageNavigationButtonLinks, { previousUrl, nextUrl}),
    });
    customPageNavigationButtonLinks.component(PageNavigationButtonLinks, { previousUrl, nextUrl});
    customPageNavigationButtonLinks.mount('#custom-button-navigation',{ previousUrl, nextUrl});
  }, 250)
}

function removeCanvasButtons() {
let currentPrev = document.querySelector(".module-sequence-footer-button--previous");
if (currentPrev) {
  currentPrev.remove();
}

let currentNext = document.querySelector(".module-sequence-footer-button--next");
if (currentNext) {
  currentNext.remove();
}

}
