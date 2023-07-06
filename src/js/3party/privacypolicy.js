import api from "../api/api";
import privacyPolicyChanged from  "../../templates/modules/privacyPolicyChanged.hbs";
import settings from "../settings";
import util from "../modules/util";

export default (function() {
    var currentPrivacyPolicyVersion = "";
    var displayPrivacyPolicyDialog = function() {
        var html = util.renderTemplateWithData(privacyPolicyChanged, {
            privacyPolicyLink:settings.privacyPolicyLink
        });
        var privacyPolicyBoxPosition = document.getElementById('wrapper');
        if(!privacyPolicyBoxPosition) {
            privacyPolicyBoxPosition = document.getElementById('f1_container');
        }
        privacyPolicyBoxPosition.insertAdjacentHTML('afterend', html);
        $('#application').before(`<div class="overlay"></div>`);

        document.getElementById("kompetansePortalPrivacyPolicy").onclick = function() {
            var privacyPolicyCheckbox = document.getElementById('kompetansePortalPrivacyPolicy');
            if (privacyPolicyCheckbox.checked) {
                document.getElementById('kompetansePortalPrivacyPolicyButton').disabled = !privacyPolicyCheckbox.checked;
            }
        };
        document.getElementById("kompetansePortalPrivacyPolicyButton").onclick = function() {
            api.saveUserPrivacyPolicyVersion(currentPrivacyPolicyVersion, function(data) {
                console.log("Privacy policy accepted saved.");
                $('.privacyPolicyBox, .overlay').remove();
            });
        };
    }
    return {
        init: function() {
            if(!util.isAuthenticated()) {
                return;
            }
            var error = function(error) {
                displayPrivacyPolicyDialog();
            };
            var url = KPASAPIURL + "/kpasinfo";
            $.getJSON(url, function(kpasinfo) {
                currentPrivacyPolicyVersion = kpasinfo.result.privacyPolicyVersion;
                api.loadUserPrivacyPolicyVersion(function(userData) {
                    if(!userData.data || !userData.data.privacyPolicyVersion || (userData.data.privacyPolicyVersion != currentPrivacyPolicyVersion)) {
                        displayPrivacyPolicyDialog();
                    }
                }, error);
            });
        }
    }
})();
