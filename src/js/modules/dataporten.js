import {JSO} from '../3party/jso'
import api from '../api/api';
import dataportenGroups from "../../templates/modules/dataportenGroups.hbs"
import util from './util';

export default (function () {
    var token = null;

// VARIABLES CHANGED BY GRUNT
    let request = ['email','longterm', 'openid', 'profile', 'userid-feide', 'groups', 'gk_netgurukpasapi'];
    let dataportenCallback = 'https://localhost/courses/1?dataportenCallback=1';
    let dataportenClientId = '823e54e4-9cb7-438f-b551-d1af9de0c2cd';
    let kpasapiurl = 'https://netgurukpasapi.dataporten-api.no';


    var opts = {
        scopes: {
            request: request
        },
        response_type: 'id_token token'
    }

    var client = new JSO({
                providerID: "Dataporten",
                client_id: dataportenClientId,
                redirect_uri: dataportenCallback,
                authorization: "https://auth.dataporten.no/oauth/authorization"
            });

    return {
        getSilentOpts : function() {
            var silent_opts = JSON.parse(JSON.stringify(opts));
            silent_opts.request = {prompt: "none"};
            return silent_opts;
        },
        getClient : function() {
            return client;
        },
        updateStatus : function(s, waitIcon = true) {
            $("#dataportenStatus").html(s);
            if(waitIcon) {
                $("#dataportenStatus").append("<span class='loading-gif'></span>");
            }
        },
        clearStatus : function() {
            $("#dataportenStatus").html("");
        },
        updateContent : function(s) {
            $("#dataportenContent").html(s);
        },
        appendContent : function(s){
            $("#dataportenContent").append(s);
        },
        clearContent : function() {
            $("#dataportenContent").html("");
            $("#dataportenUserInfo").html("");
        },
        display: function() {
            $("#course_home_content").prepend("<div id='dataportenStatus'/><div id='dataportenUserInfo'/><div id='dataportenContent'/><div id='dataportenLoginInfo'/>");
            var silent_opts = this.getSilentOpts();

            this.updateStatus("Sjekker forbindelse til dataporten...");
            this.token = client.checkToken(silent_opts);
            let self = this;
            if(this.token) {
                console.log(this.token.access_token);
                this.tokenBelongsToLoggedInUser(function(belongs, canvasUserId, dataportenUserInfo) {
                    if(belongs) {
                        self.validToken();
                    } else {
                        let waitIcon = false;
                        var html = "Du er logget inn med " + canvasUserId  + " i Canvas og " + dataportenUserInfo.user.userid;
                        if(dataportenUserInfo.user.userid_sec.length)
                        {
                            html += "/" + dataportenUserInfo.user.userid_sec[0];
                        }
                        html += " i dataporten. Du må være logget inn med samme bruker i de to systemene.";
                        self.updateStatus(html, waitIcon);

                        self.printLogoutOptions();
                    }
                });
            } else { //Try and see if we can login silently.
                this.hiddenIframeLogin();
            }
        },
        displayUserInfo : function() {
            this.getUserInfo(function(userInfo) {
                var html = "Du er logget inn på dataporten som " + userInfo.user.name;
                $("#dataportenUserInfo").html(html);
            });
        },
        validToken: function() {
            this.displayUserInfo();
            this.displayGroups();
            this.printLogoutOptions();
        },
        getFeideIdFromDataportenUserInfo(userIdSec)
        {
            let start = userIdSec.indexOf(":") + 1;
            let feideid = userIdSec.substr(start);
            return feideid;
        },
        //If we want to require that the account used to connect to dataporten is the same as the one used
        //to login to Canvas, we could call the code below and perform some checks. Right now the code
        //compares the Canvas login id with the secondary open id, i.e. Feide id.
        tokenBelongsToLoggedInUser: function(callback) {
            let self = this;
            this.getUserInfo(function(userInfo) {
                api.getUserProfile(function(userProfile) {
                    var belongs = false;
                    if(userProfile.login_id == userInfo.user.userid) {
                        belongs = true;
                    } else if (userInfo.user.userid_sec.length) {
                        let userIdSec = userInfo.user.userid_sec[0];
                        let feideId = self.getFeideIdFromDataportenUserInfo(userIdSec);
                        if(userProfile.login_id == feideId) {
                            belongs = true;
                        }
                    }
                    callback(belongs, userProfile.login_id, userInfo);
                });
            });
        },
        printLogoutOptions : function() {
            let self = this;
            var html = "<div><button class='button' id='dataportenWipeToken'>Logg ut av dataporten</button></div>";
            $("#dataportenLoginInfo").html(html);
            $(document).on("click","#dataportenWipeToken",function(e){
                self.wipeToken();
                self.clearStatus();
                self.clearContent();
                self.printLoginOptions();
            });
        },
        printLoginOptions : function() {
            let self = this;
            var dataportenHtml = util.renderTemplateWithData(dataporten, {});
            $("#dataportenLoginInfo").html(dataportenHtml);
            $(document).off('click', "#dataportenPopupLogin");
            $(document).on ("click", "#dataportenPopupLogin",function(e) {self.authorizePopup()});
        },
        _get : function(url, callback) {
            var self = this;
            $.ajax({
                    url: url,
                    beforeSend: function(xhr) {
                         xhr.setRequestHeader("Authorization", "Bearer " + self.token.access_token)
                    }, success: function(data){
                        callback(data)
                    }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                        let errMsg = 'Det oppstod en feil:' + errorThrown;
                        console.log(errMsg);
                        self.clearStatus();
                        self.wipeToken();
                        self.printLoginOptions();
                }});
        },
        _post : function(url, data, callback) {
            var self = this;
            $.ajax({
                type: "POST",
                url: url,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + self.token.access_token)
                },
                data: data,
                success: function(result) {
                    callback(result)
                },
                error(XMLHttpRequest, textStatus, errorThrown) {
                    let errMsg = 'Det oppstod en feil:' + errorThrown;
                    alert(errMsg);
                    console.log(errMsg);
                }
            });
        },
        getUserInfo : function(callback) {
            let url = "https://auth.dataporten.no/userinfo";
            this._get(url, callback);
        },
        getGroupCategoriesForCourse : function(courseId, callback) {
            let url = kpasapiurl + "/group_categories.php?course_id=" + courseId;
            this._get(url, callback);
        },
        isMemberOf : function(dataportenGroup, groupCategory, canvasGroups)
        {
            var found = false;
            for(var i = 0; i < canvasGroups.length; i++) {
                if ((canvasGroups[i].name == dataportenGroup.displayName) &&
                    (canvasGroups[i].description == dataportenGroup.id) &&
                    (canvasGroups[i].group_category_id == groupCategory.id)) {
                    found = true;
                    break;
                }
            }
            return found;
        },
        addUserToGroup : function(group, unenrollmentIds) {
            let self = this;
            let url = kpasapiurl + "/addusertogroup.php";
            var data = "group=" + JSON.stringify(group) + "&unenrollFrom={\"unenrollmentIds\":" + JSON.stringify(unenrollmentIds) + "}";
            this._post(url, data, function(result) {
                self.displayGroups();
            });
        },
        displayOneGroup : function(courseID, unenrollmentIds, dataportenGroup, groupCategory, canvasGroups) {
            let self = this;
            var member = this.isMemberOf(dataportenGroup, groupCategory, canvasGroups);
            var group = {
                name: dataportenGroup.displayName,
                description: dataportenGroup.id,
                membership: dataportenGroup.membership.basic,
                group_category_id: groupCategory.id,
                course_id: courseID
            };

            var id = "" + dataportenGroup.id;
            id = id.replace(/[-&\/\\#,+()$~%.'":*?<>{}]/g,'_');
            var dataportenGroupHtml = util.renderTemplateWithData(dataportenGroups, {member: member, id:id, dataportenGroup:dataportenGroup});
            this.appendContent(dataportenGroupHtml);
            (function(j, k) {
                $(document).off('click', "#"+id);
                $(document).on("click","#"+id,function(e) {
                    self.clearContent();
                    self.updateStatus("Melder deg inn i gruppe...");
                    self.addUserToGroup(j,k);
                });
            })(group, unenrollmentIds);
        },
        displayGroups: function() {
            this.clearContent();
            let url = 'https://groups-api.dataporten.no/groups/me/groups';
            this.updateStatus("Henter grupper fra dataporten...");
            let self = this
            this._get(url, function(dataportenGroups) {
                self.updateStatus("Henter grupper fra Canvas...");
                api.getUserGroups(function(canvasGroups) {
                  let courseID = api.getCurrentCourseId();
                  self.updateStatus("Henter gruppekategorier fra Canvas...");
                  self.getGroupCategoriesForCourse(courseID, function(result) {
                    var categories = result.data;

                    self.updateStatus("Sjekker din gruppetilhørighet i Canvas...");
                    api.getUsersEnrollmentsForCourse(courseID,
                        (function(courseID, categories) {
                            return function(enrollments) {
                                var unenrollmentIds = Array();
                                for(var e = 0; e < enrollments.length; e++) {
                                    unenrollmentIds.push(enrollments[e].id)
                                }
                                for(var g = 0; g < categories.length; g++) {
                                    let groupCategory = categories[g];
                                    self.appendContent("<h1>" + groupCategory.name + "</h1>");

                                    for(var i = 0; i < dataportenGroups.length; i++) {
                                        var dataportenGroup = dataportenGroups[i];
                                        self.displayOneGroup(courseID, unenrollmentIds, dataportenGroup, groupCategory, canvasGroups);
                                    }
                                }
                                self.clearStatus();
                            } //end function courses
                        })(courseID, categories)
                    );
                }) //end fetched Canvas group categories
              }); //end fetched Canvas groups
            }); //end fetched dataporten Groups
        },

        wipeToken: function()  {
            client.wipeTokens()
        },

        authorizePopup: function()  {
            var self = this;
            let opts = {
                scopes: {
                    request: request
                },
                response_type: 'id_token token'
            }

            client.setLoader(JSO.Popup)
            client.getToken(opts)
                .then((token) => {
                    console.log("I got the token: " + token.access_token);
                    self.token = token;
                    self.validToken();
                })
                .catch((err) => {
                    console.error("Error from popup loader", err)
                })
        },
        hiddenIframeLogin : function()
        {
//            window.loginType = "iframeLogin";
            var self = this;
            var silent_opts = this.getSilentOpts();
            client.setLoader(JSO.IFramePassive)
            client.getToken(silent_opts)
                .then((token) => {
                    console.log("I got the token: ", token)
                    self.token = token;
                    self.validToken();
                })
                .catch((err) => {
                    console.log("Error from passive loader", err)
                    self.clearStatus();
                    self.printLoginOptions();

//                    alert("iframe passive login only works if you are already logged in:" + err);
                })
        }    }
})();
