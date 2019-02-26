this.mmooc=this.mmooc||{};


this.mmooc.dataporten = function() {
    var token = null;
    let request = ['email','longterm', 'openid', 'profile', 'userid-feide', 'groups', 'gk_kpas'];
    let dataportenCallback = 'https://bibsys.instructure.com/courses/234?dataportenCallback=1';
//    let dataportenCallback = 'https://localhost/courses/1?dataportenCallback=1';
    let dataportenClientId = '823e54e4-9cb7-438f-b551-d1af9de0c2cd';
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
        displayWaitIcon: function() {
            var html = "<span class='loading-gif'></span>";
            $("#content").html(html);
        },
        removeWaitIcon: function() {
            $(".loading-gif").remove();
        },
        display: function() {
            $("#content").html("");
            let dataporten_opts = {
                scopes: {request: request},
                request: {prompt: "none"},
                response_type: 'id_token token',
                redirect_uri: dataportenCallback
            };

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
            } else if (document.location.href.indexOf("access_token") > 0) {
                client.callback();
                token = client.checkToken(dataporten_opts);
                console.log(token.access_token);
                this.validToken();
            } else if (document.location.href.indexOf("error") > 0) {
                $("#content").html("Logg inn på dataporten<button id='dataportenLoginWithPrompt'>Login dataporten</button>");
                $("#dataportenLoginWithPrompt").click(function(event) {mmooc.dataporten.authorizePopup()});
            } else {
                this.printLoginOptions();
            }
        },
        validToken: function() {
//            mmooc.dataporten.printLoginOptions();
            mmooc.dataporten.printGroups();
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
            $(document).on("click","#dataportenWipeToken",function(e){mmooc.dataporten.wipeToken()});
        },
        printLoginOptions : function() {
            var dataportenHtml = mmooc.util.renderTemplateWithData("dataporten", {});
            $("#content").html(dataportenHtml);
//            $(document).on("click","#dataportenLogin",function(e) {mmooc.dataporten.kpasLoginWithoutPrompt()});
            $(document).on("click","#dataportenPopupLogin",function(e) {mmooc.dataporten.authorizePopup()});
//            $(document).on("click","#dataportenHiddenIframeLogin",function(e) {mmooc.dataporten.hiddenIframeLogin()});
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
                    console.log("Error during ajax call");
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
                }
            });
        },
        getUserInfo : function(callback) {
            let url = "https://auth.dataporten.no/userinfo";
            this._get(url, callback);
        },
        getGroupCategoriesForCourse : function(courseId, callback) {
            let url = "https://kpas.dataporten-api.no/group_categories.php?course_id=" + courseId;
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
            this.displayWaitIcon();
            let url = "https://kpas.dataporten-api.no/addusertogroup.php";
            var data = "group=" + JSON.stringify(group) + "&unenrollFrom=" + JSON.stringify(unenrollmentIds);
            this._post(url, data, function(result) {
                mmooc.dataporten.printGroups();;
            });
        },
        printGroups: function() {
            this.displayWaitIcon();
            let url = 'https://groups-api.dataporten.no/groups/me/groups';
            this._get(url, function(dataportenGroups) {
                mmooc.api.getUserGroups(function(canvasGroups) {
                  let courseID = mmooc.api.getCurrentCourseId();
                  mmooc.dataporten.getGroupCategoriesForCourse(courseID, function(result) {
                    var categories = result.data;
                    
                    mmooc.api.getUsersEnrollmentsForCourse(courseID, 
                        (function(courseID, categories) {
                            return function(enrollments) {
                                var unenrollmentIds = Array();
                                for(var e = 0; e < enrollments.length; e++) {
                                    unenrollmentIds.push(enrollments[e].id)
                                }
                                for(var g = 0; g < categories.length; g++) {
                                    let groupCategory = categories[g];
                                    $("#content").append("<h1>" + groupCategory.name + "</h1>");
                        
                                    for(var i = 0; i < dataportenGroups.length; i++) {
                                        var dataportenGroup = dataportenGroups[i];
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
                                        $("#content").append(dataportenGroupHtml);
                                        (function(j, k) {
                                            $(document).on("click","#"+id,function(e) {
                                                mmooc.dataporten.addUserToGroup(j,k);
                                            });
                                        })(group, unenrollmentIds);
                                    }
                                }
                            } //end function courses
                        })(courseID, categories)
                    );
                    mmooc.dataporten.removeWaitIcon();
                })
              });
            });
        },
        
        kpasLogin: function()  {
            let opts = {
                scopes: {
                    request: request
                },
                response_type: 'id_token token'
            }

            let token = client.getToken(opts);

            if (token !== null) {
                console.log("I got the token: " + token);
            }
        },
        kpasLoginWithoutPrompt: function()  {

            let opts = {
                scopes: {
                    request: request
                },
                request: {
                    prompt: "none"
                },
                response_type: 'id_token token'
            }

            token = client.getToken(opts);

            if (token !== null) {
                console.log("I got the token: " + token);
            }
        },


        wipeToken: function()  {
            client.wipeTokens()
        },
        hiddenIframeLogin: function()
        {
            let opts = {
                scopes: {
                    request: this.request
                },
                request: {
                    prompt: "none"
                },
                response_type: 'id_token token',
                redirect_uri: this.dataportenCallback
            }
            client.setLoader(jso.IFramePassive)
            client.getToken(opts)
                .then((token) => {
                    console.log("I got the token")
                })
                .catch((err) => {
                    console.err("Error from passive loader", err)
                })
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
                    console.error("Error from passive loader", err)
                })
        }        
    }
}();
