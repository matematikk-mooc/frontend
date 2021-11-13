this.mmooc = this.mmooc || {};
this.mmooc.messageHandler = (function() {
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
                const error = error => console.error('error calling api', error);
                try {
                    if(e.origin.includes("vimeo")) {
                        if((e.data.method == undefined) && (e.data.event == undefined)) {
                            var message = JSON.parse(e.data);
                            if(message.event == "ready") {
                                mmooc.vimeo.init();
                            }
                        }
                    } else {
                        var message = JSON.parse(e.data);
                        if(message.subject == "kpas-lti.connect") {
                            const connectedMsg = {
                                subject: 'kpas-lti.ltiparentready'
                            }
                            var sendMsg = JSON.stringify(connectedMsg);
                            e.source.postMessage(sendMsg, e.origin);
                        } else if(message.subject == "kpas-lti.getusergroups") {
                            mmooc.api.getUserGroups(function(groups) {
                                const usergroupsmsg = {
                                    subject: 'kpas-lti.usergroups',
                                    groups: groups
                                }
                                var sendMsg = JSON.stringify(usergroupsmsg);
                                e.source.postMessage(sendMsg, e.origin);
                            }, error);
                        } else if(message.subject == "kpas-lti.update") {
                            mmooc.util.updateInformationPane();

                            var courseId = mmooc.api.getCurrentCourseId();

                            mmooc.api.getUserGroupsForCourse(courseId, function(groups) {
                                var isTeacherOrAdmin = mmooc.util.isTeacherOrAdmin();
                                mmooc.kpas.showInfo(isTeacherOrAdmin, groups);
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
                    }
                } catch(err) {
                    console.log.call(console, 'KPAS LTI: skip message:' +err);
                }
            }, false);
        }
    }
})();
