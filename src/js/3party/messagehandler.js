import api from "../api/api";
import kpas from "./kpas";
import multilanguage from "../../vue/utils/previous-lang-utils";
import uob from "./uob7";
import util from "../modules/util";

export default (function() {
    var findDomForWindow = function(sourceWindow) {
        const iframes = document.getElementsByTagName('IFRAME');
        for (let i = 0; i < iframes.length; i += 1) {
          if (iframes[i].contentWindow === sourceWindow) {
            return iframes[i];
          }
        }
        return null;
    }

    return {
        init: function() {
            window.addEventListener('message', function(e) {
                console.log("FRONTEND_LTI_MESSAGE_RECEIVED", e)

                const error = error => console.error('error calling api', error);
                try {
                    if(e.origin.includes("vimeo")) {
                        if((e.data.method == undefined) && (e.data.event == undefined)) {
                            var message = JSON.parse(e.data);
                            if(message.event == "ready") {
                                uob.setVimeoPlayerReady();
                            }
                        }
                    } else {
                        var ignoreMessage = e.data != null && typeof e.data == 'string' && e.data?.toLowerCase()?.includes("webpack");
                        var messageIsObject = e.data !== null && typeof e.data === 'object' && !Array.isArray(e.data);

                        var message = {};
                        if (messageIsObject) {
                            message = e.data;
                        } else if (!ignoreMessage) {
                            message = JSON.parse(e.data);
                        }

                        console.log("FRONTEND_LTI_MESSAGE_DATA", message)
                        if(message.subject == "kpas-lti.connect") {
                            const connectedMsg = {
                                subject: 'kpas-lti.ltiparentready'
                            }
                            var sendMsg = JSON.stringify(connectedMsg);
                            e.source.postMessage(sendMsg, e.origin);
                        } else if(message.subject == "kpas-lti.getusergroups") {
                            api.getUserGroups(function(groups) {
                                const usergroupsmsg = {
                                    subject: 'kpas-lti.usergroups',
                                    groups: groups
                                }
                                var sendMsg = JSON.stringify(usergroupsmsg);
                                e.source.postMessage(sendMsg, e.origin);
                            }, error);
                        } else if(message.subject == "kpas-lti.update") {
                            var courseId = api.getCurrentCourseId();

                            api.getUserGroupsForCourse(courseId, function(groups) {
                                kpas.showInfo(groups);
                            }, error);
                        } else if(message.subject == "kpas-lti.getBgColor") {
                            var dom = findDomForWindow(e.source);
                            if(dom) {
                                var elem = dom.parentElement;
                                var bgColor = window.getComputedStyle(elem, null).getPropertyValue("background-color");
                                const bgColorMessage = {
                                    subject: 'kpas-lti.ltibgcolor',
                                    bgColor: bgColor
                                }
                                var sendMsg = JSON.stringify(bgColorMessage);
                                e.source.postMessage(sendMsg, e.origin);
                            }
                        } else if(message.subject == "kpas-lti.3pcookiesupported") {
                        } else if(message.subject == "kpas-lti.3pcookienotsupported") {
                            var kpasCheckElement = $("#kpas-lti-cookie-check");
                            kpasCheckElement.html("En automatisk sjekk har funnet at \
                            du har slått av informasjonskapsler fra tredjepartsnettsteder. \
                            Du vil ikke kunne velge hvilken rolle eller hvilke grupper du skal delta i.\
                            <p>Kontakt din IT-avdeling eller les om hvordan du\
                            <a class='alert-link' target='_blank' href='https://nettvett.no/slik-administrer-du-informasjonskapsler/'>\
                            aktiverer informasjonskapsler fra tredjeparter.</a>");
                            kpasCheckElement.show();
                            console.error("Din nettleser støtter IKKE cookies fra tredjeparter. Rolle og gruppeverktøyet krever cookies fra tredjepart.");
                        }
                        else if(message.subject == "kpas-lti.getcurrentuserroles") {
                            let userroles = api.getRoles();
                            let currentPath = window.location.pathname;
                            const roles = {
                                subject: 'kpas-lti.rolesofuser',
                                roles: userroles,
                                path: currentPath

                            }
                            e.source.postMessage(roles, e.origin);
                        }

                        else if(message.subject == "kpas-lti.getcurrentlang"){
                            let lang = "nb";
                            let isMultiLang = util.isMultilangCourse();

                            if (isMultiLang) {
                                lang = multilanguage.getLanguageCode();
                            }
                            const langmsg = {
                                subject: 'kpas-lti.lang',
                                isMultiLang: isMultiLang,
                                lang: lang,
                            }
                            e.source.postMessage(JSON.stringify(langmsg), e.origin);
                        }
                    }
                } catch(err) {
                    console.log.call(console, 'KPAS LTI: skip message:' +err);
                }
            }, false);
        }
    }
})();
