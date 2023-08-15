import FooterTest from '../vue/components/FooterTest.vue';
import api from './api/api';
import { createApp } from 'vue/dist/vue.runtime.esm-browser.prod.js'

try {
    let footerProps =  {
        "name": "NameProp",
        "licence": true,
    }

    var footerComponent = createApp(FooterTest, footerProps);
    var footerWrapper = document.getElementById("wrapper").appendChild(document.createElement("div"));
    footerWrapper.setAttribute("id", "footer");
    footerComponent.mount('#footer');


    let examp2Props =  {
        "name": "NameProp",
        "licence": true,
    }

    var footerComponent2 = createApp(FooterTest, examp2Props);
    var footerWrapper2 = document.getElementById("application").children[0];
    footerWrapper2.append(document.createElement("div"));
    footerWrapper2.setAttribute("id", "test2");
    footerComponent2.mount('#test2');

} catch (e) {
    console.log(e);
}

export default app;
