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
            }
        } catch(err) {
            (console.error || console.log).call(console, 'Error handling message in parent:' + err);
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
        (console.error || console.log).call(console, 'No LTI tool active.' + err);
    }
});
