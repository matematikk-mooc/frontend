import { PageFooter } from "../../../components/footer";
import { createApp, h} from "vue";

export function renderFooter(hasLicense) {
const targetId = document.getElementById('application') ? 'application' : document.getElementById('f1_container') ? 'f1_container' : null || document.getElementById('main') ? 'main' : null;
if (targetId) {
  const parent = document.getElementById(targetId);
  const footerElement = parent.appendChild(document.createElement('div'));
  footerElement.id = 'customFooter';

  const customFooter = createApp({
    render: () => h(PageFooter, { hasLicense }),
  });

  customFooter.component(PageFooter, { hasLicense });
  customFooter.mount('#customFooter', { hasLicense });
}
}