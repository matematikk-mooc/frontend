import InformationBanner from "../../vue/components/information-banner/InformationBanner.vue";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import util from "./util";

export default (function() {
    function updateInformationBanner() {
        console.log("Updating information banner");
        let bannerType = util.getBannerType();
        console.log("Banner type: " + bannerType);
        let bannerText = "";
        let bannerDate = "";
        if(bannerType == "NONE"){
            return;
        }
        else if(bannerType == "FEEDBACK")
        {
            console.log("Found feedback banner")
            bannerText = util.getFeedbackMsg();
            console.log("Banner text: " + bannerText);
        }
        else if(bannerType == "UNMAINTAINED") {
            bannerText = util.getUnmaintainedMsg();
            bannerDate = util.getUnmaintainedSinceDate();
        }
        else if (bannerType == "ALERT") {
            bannerText = util.getAlertMsg();
        }
        else if(bannerType == "NOTIFICATION") {
            bannerText = util.getNotificationMsg();
        }
        let fixed_bottom = document.createElement("div")
        fixed_bottom.setAttribute("class", "fixed-bottom");
        let wrapper = document.getElementById("application")
        let informationBanner = document.createElement("div");
        informationBanner.setAttribute("id", "informationBanner");
        let informationBannerComponent = createApp(InformationBanner, {type: bannerType, text: bannerText, date: bannerDate});
        fixed_bottom.appendChild(informationBanner);
        wrapper.appendChild(fixed_bottom);
        informationBannerComponent.mount("#informationBanner");



    }
    return {
        updateInformationBanner: updateInformationBanner
    }
})();
