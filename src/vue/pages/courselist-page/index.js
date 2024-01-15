import PrivacyPolicyLink from '../../components/privacy-policy-link/PrivacyPolicyLink.vue'
import { createApp } from 'vue'


export function renderPrivacyPolicyLink(className) {
  // Get the parent element
  const appContainer= document.getElementsByClassName(className)[0]

  // Create a Vue app instance for The privacyPolicyLink
  const privacyPolicyLink = createApp(PrivacyPolicyLink)
  // mount the element
  privacyPolicyLink.mount(appContainer)

}
