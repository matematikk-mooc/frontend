$(document).ready(function() {
    console.log("Listening for KPAS-LTI requests.");

    window.addEventListener('message', function(e) {
        const error = error => console.error('error calling api', error);
        try {
            var message = JSON.parse(e.data);
            console.log("Parent received message " + e.data);
            if(message.subject == "kpas-lti.getusergroups") {
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
            } else if(message.subject == "kpas.frameResize") {
                console.log("Resize kpas");
                $("#kpas")[0].height = message.height;
            } else if(message.subject == "kpas-lti.3pcookiesupported") {
                console.log("Din nettleser støtter cookies fra tredjeparter, noe som trengs for å bruke KPAS");
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
        } catch(err) {
            console.log.call(console, 'KPAS LTI: skip message');
        }
    }, false);
    try {
        $("#tool_content").ready(function() {
            console.log("LTI iframe ready. Informing it parent is also ready.");
            const ltiparentready = {
                subject: 'kpas-lti.ltiparentready'
            }
            var LTI = document.getElementById("tool_content");
            if(LTI) {
                LTI.contentWindow.postMessage(JSON.stringify(ltiparentready),"*");
            }
        });
    } catch(err) {
        console.log.call(console, 'No LTI tool active.' + err);
    }
});
