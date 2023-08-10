import FooterTest from '../templates/components/FooterTest.vue';
import {createApp} from 'vue/dist/vue.runtime.esm-browser.js';

try {
var footerComponent = createApp(FooterTest)
var footerWrapper = document.getElementById("wrapper").appendChild(document.createElement("div"))
footerWrapper.setAttribute("id", "footer")
footerComponent.mount('#footer');

} catch (e) {
    console.log(e);
}

console.log("in app.js");

export default app;
