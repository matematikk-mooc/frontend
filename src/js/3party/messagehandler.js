
window.addEventListener('message', receiveMmoocMessage, false);

const error = error => console.error('error calling api', error);

function receiveMmoocMessage(e) {
    try {
        var message = JSON.parse(e.data);
        if(message.subject == "kpas-lti.getusergroups") {
        mmooc.api.getUserGroups(function(groups) {
            const usergroupsmsg = {
                subject: 'kpas-lti.usergroups',
                groups: groups
              }
            e.source.postMessage(JSON.stringify(usergroupsmsg), e.origin);
        }, error);
        }
    } catch(err) {
        (console.error || console.log).call(console, 'Could not handle message:' + e.data);
    }
}
