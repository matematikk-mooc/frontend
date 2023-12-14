import { PageFooter } from "../../../components/footer";
import { createApp, h} from "vue";

export function renderFooter(hasLicense) {
  const parentElementOfOldFooter = document.getElementById('application');
  const footerElement = parentElementOfOldFooter.appendChild(document.createElement('div'));
  footerElement.setAttribute('id', 'customFooter');
  const customFooter = createApp({
    render: () => h(PageFooter, { hasLicense }),
  });
  customFooter.component(PageFooter, { hasLicense });
  customFooter.mount('#customFooter', {
    hasLicense,
  });
}



