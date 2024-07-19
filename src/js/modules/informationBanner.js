import InformationBanner from "../../vue/components/information-banner/InformationBanner.vue";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import util from "./util";

export default (function() {
    function updateInformationBanner() {
        let bannerType = util.getBannerType();
        let bannerText = "";
        let bannerDate = "";
        if(bannerType == "NONE" || bannerType == undefined) return;

        if(bannerType == "FEEDBACK") {
            bannerText = util.getFeedbackMsg();
        } else if(bannerType == "UNMAINTAINED") {
            bannerText = util.getUnmaintainedMsg();
            bannerDate = util.getUnmaintainedSinceDate();
        } else if (bannerType == "ALERT") {
            bannerText = util.getAlertMsg();
        } else if(bannerType == "NOTIFICATION") {
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

    function handleCloseQuizWarning() {
        var fixedContainer = document.getElementById("fixed_bottom");
        if (fixedContainer) {
            var hideQuizWarning = localStorage.getItem("hideQuizWarning") === "true";
            if (hideQuizWarning) {
                var warnings = fixedContainer.querySelectorAll(".fixed_warning");
                warnings.forEach(function(warning) {
                    var targetTitleElement = warning.querySelector("b");
                    if (targetTitleElement && targetTitleElement.textContent == "Quizinstallasjon av Canvas") {
                        warning.style.display = "none";
                    }
                });
            }

            var toggleButton = document.querySelector("#fixed_bottom button.element_toggler");
            var handleButtonClickOrKeydown = function(event) {
                if (event.type == "click" || event.type == "keydown" && event.key == "Enter") {
                    var warning = event.target.closest('.fixed_warning');
                    var targetTitleElement = warning.querySelector("b");

                    if (targetTitleElement && targetTitleElement.textContent === "Quizinstallasjon av Canvas") {
                        localStorage.setItem("hideQuizWarning", "true");
                    }
                }
            };

            toggleButton.addEventListener("click", handleButtonClickOrKeydown);
            toggleButton.addEventListener("keydown", handleButtonClickOrKeydown);
        }
    }

    return {
        updateInformationBanner: updateInformationBanner,
        handleCloseQuizWarning: handleCloseQuizWarning
    }
})();
