this.mmooc=this.mmooc||{};


this.mmooc.dataporten = function() {
    var token = null;

//Production
    let request = ['email','longterm', 'openid', 'profile', 'userid-feide', 'groups', 'gk_kpas'];
    let dataportenCallback = 'https://bibsys.instructure.com/courses/234?dataportenCallback=1';
    let dataportenClientId = '823e54e4-9cb7-438f-b551-d1af9de0c2cd';
    let kpasapiurl = "https://kpas.dataporten-api.no";    

/*
//Localhost testing:
    let request = ['email','longterm', 'openid', 'profile', 'userid-feide', 'groups', 'gk_kpasbeta'];
    let dataportenCallback = 'https://localhost/courses/1?dataportenCallback=1';
    let dataportenClientId = 'fb2f6378-2d35-4354-8ae8-2e82e2af2a8f';
    let kpasapiurl = "https://kpasbeta.dataporten-api.no";    
*/        
    var client = new jso.JSO({
                providerID: "Dataporten",
                client_id: dataportenClientId,
                redirect_uri: dataportenCallback, 
                authorization: "https://auth.dataporten.no/oauth/authorization"
            });

    return {
        getClient : function() {
            return client;
        },
        updateStatus : function(s) {
            $("#dataportenStatus").html(s);
            $("#dataportenStatus").append("<span class='loading-gif'></span>");
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
        },
        display: function() {
            $("#content").html("<div id='dataportenStatus'/><div id='dataportenContent'/>");
            let dataporten_opts = {
                scopes: {request: request},
                request: {prompt: "none"},
                response_type: 'id_token token',
                redirect_uri: dataportenCallback
            };

            mmooc.dataporten.updateStatus("Sjekker forbindelse til dataporten...");
            this.token = client.checkToken(dataporten_opts);
            if(this.token) {
                console.log(this.token.access_token);
                this.tokenBelongsToLoggedInUser(function(belongs) {
                    if(belongs) {
                        mmooc.dataporten.validToken();
                    } else {
                        mmooc.dataporten.printLoginOptions();
                    }
                });  
            } else {
                mmooc.dataporten.clearStatus();
                this.printLoginOptions();
            }
        },
        validToken: function() {
            mmooc.dataporten.displayGroups();
        },
        
        //If we want to require that the account used to connect to dataporten is the same as the one used
        //to login to Canvas, we could uncomment the code below and perform some checks. The code is not
        //complete.
        tokenBelongsToLoggedInUser: function(callback) {
            callback(true);
/*
            this.getUserInfo(token, function(userInfo) {
                mmooc.api.getUserProfile(function(userProfile) {
                    var belongs = false;
                    //Must do some proper checking here.
                    if(userProfile.login_id == userInfo.user.userid_sec[0]) {
                        belongs = true;
                    }
                    callback(belongs, token);
                });
            });
*/            
        },
        printLogoutOptions : function() {
            mmooc.dataporten.appendContent("<div><button class='button' id='dataportenWipeToken'>Logg ut av dataporten</button></div>");
            $(document).on("click","#dataportenWipeToken",function(e){
                mmooc.dataporten.wipeToken();
                mmooc.dataporten.display();
            });
        },
        printLoginOptions : function() {
            var dataportenHtml = mmooc.util.renderTemplateWithData("dataporten", {});
            mmooc.dataporten.updateContent(dataportenHtml);
            $(document).off('click', "#dataportenPopupLogin");
            $(document).on ("click", "#dataportenPopupLogin",function(e) {mmooc.dataporten.authorizePopup()});
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
                        alert(errMsg);
                        console.log(errMsg);
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
            let url = kpasapiurl + "/addusertogroup.php";
            var data = "group=" + JSON.stringify(group) + "&unenrollFrom=" + JSON.stringify(unenrollmentIds);
            this._post(url, data, function(result) {
                mmooc.dataporten.displayGroups();
            });
        },
        displayOneGroup : function(courseID, unenrollmentIds, dataportenGroup, groupCategory, canvasGroups) {
            var member = mmooc.dataporten.isMemberOf(dataportenGroup, groupCategory, canvasGroups);
            var group = {
                name: dataportenGroup.displayName,
                description: dataportenGroup.id,
                membership: dataportenGroup.membership.basic,
                group_category_id: groupCategory.id,
                course_id: courseID                            
            };

            var id = "" + dataportenGroup.id;
            id = id.replace(/[-&\/\\#,+()$~%.'":*?<>{}]/g,'_');
            var dataportenGroupHtml = mmooc.util.renderTemplateWithData("dataportenGroups", {member: member, id:id, dataportenGroup:dataportenGroup});
            mmooc.dataporten.appendContent(dataportenGroupHtml);
            (function(j, k) {
                $(document).off('click', "#"+id);
                $(document).on("click","#"+id,function(e) {
                    mmooc.dataporten.clearContent();
                    mmooc.dataporten.updateStatus("Melder deg inn i gruppe...");
                    mmooc.dataporten.addUserToGroup(j,k);
                });
            })(group, unenrollmentIds);
        },        
        displayGroups: function() {
            mmooc.dataporten.clearContent();
            let url = 'https://groups-api.dataporten.no/groups/me/groups';
            mmooc.dataporten.updateStatus("Henter grupper fra dataporten...");
            this._get(url, function(dataportenGroups) {
                mmooc.dataporten.updateStatus("Henter grupper fra Canvas...");
                mmooc.api.getUserGroups(function(canvasGroups) {
                  let courseID = mmooc.api.getCurrentCourseId();
                  mmooc.dataporten.updateStatus("Henter gruppekategorier fra Canvas...");
                  mmooc.dataporten.getGroupCategoriesForCourse(courseID, function(result) {
                    var categories = result.data;
                    
                    mmooc.dataporten.updateStatus("Sjekker din gruppetilhørighet i Canvas...");
                    mmooc.api.getUsersEnrollmentsForCourse(courseID, 
                        (function(courseID, categories) {
                            return function(enrollments) {
                                var unenrollmentIds = Array();
                                for(var e = 0; e < enrollments.length; e++) {
                                    unenrollmentIds.push(enrollments[e].id)
                                }
                                for(var g = 0; g < categories.length; g++) {
                                    let groupCategory = categories[g];
                                    mmooc.dataporten.appendContent("<h1>" + groupCategory.name + "</h1>");
                        
                                    for(var i = 0; i < dataportenGroups.length; i++) {
                                        var dataportenGroup = dataportenGroups[i];
                                        mmooc.dataporten.displayOneGroup(courseID, unenrollmentIds, dataportenGroup, groupCategory, canvasGroups);
                                    }
                                }
                                mmooc.dataporten.clearStatus();
                                mmooc.dataporten.printLogoutOptions();
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

            client.setLoader(jso.Popup)
            client.getToken(opts)
                .then((token) => {
                    console.log("I got the token: " + token.access_token);
                    self.token = token;
                    self.validToken();
                })
                .catch((err) => {
                    console.error("Error from popup loader", err)
                })
        }        
    }
}();
