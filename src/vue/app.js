import Footer from './components/Footer.vue';
import TestHeader from './components/TestHeader.vue';
import api from '../js/api/api';
import { createApp } from 'vue/dist/vue.runtime.esm-browser.prod.js'
import settings from '../js/settings';
import util from '../js/modules/util';

try {

    api.getCoursesForAccount(138, function(courses) {
        console.log(courses);
        let footerProps =  {
            "licence": util.isMMOOCLicense(),
            "privacyLink" : settings.privacyPolicyLink,
            "homeOrg" : settings.homeOrganization,
            "contactPoint" : settings.contactPoint,
            "about" : settings.aboutThePlatform,
            "uuStatusNb" : settings.uuStatusNb,
            "uuStatusNn" : settings.uuStatusNn,
        }

        var footerComponent = createApp(Footer, footerProps);
        var footerWrapper = document.getElementById("application").appendChild(document.createElement("div"));
        footerWrapper.setAttribute("id", "footer");
        footerComponent.mount('#footer');
})

    var header = createApp(TestHeader);
    var headerwrapper = document.getElementById("application").children[0];
    headerwrapper.append(document.createElement("div"));
    headerwrapper.setAttribute("id", "test2");
    header.mount('#test2');

} catch (e) {
    console.log(e);
}

export default app;
