import FooterTest from '../templates/components/FooterTest.vue';
import { createApp } from 'vue/dist/vue.runtime.esm-browser.prod.js';

try {
    let footerProps = {
        "name": "NameProp",
        "licence": true
    }

    var footerComponent = createApp(FooterTest, footerProps);
    var footerWrapper = document.getElementById("wrapper").appendChild(document.createElement("div"));
    footerWrapper.setAttribute("id", "footer");
    footerComponent.mount('#footer');

} catch (e) {
    console.log(e);
}

export default app;
