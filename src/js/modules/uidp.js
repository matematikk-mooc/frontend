this.mmooc=this.mmooc||{};


this.mmooc.uidp = function() {
    var token = null;

    let request = ['openid','profile'];
    let uidpCallback = 'https://localhost/courses/1';
    let uidpClientId = 'udir.kompetanseportalen-local';
    
    var opts = {
        scopes: {
            request: request
        },
        response_type: 'id_token token'
    }
        
    var client = new jso.JSO({
                providerID: "UIDP",
                client_id: uidpClientId,
                redirect_uri: uidpCallback, 
                authorization: "https://uidp-dev.udir.no/connect/authorize"
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
            $("#uidpStatus").html(s);
            if(waitIcon) {
                $("#uidpStatus").append("<span class='loading-gif'></span>");
            }
        },
        clearStatus : function() {
            $("#uidpStatus").html("");
        },
        updateContent : function(s) {
            $("#uidpContent").html(s);
        },
        appendContent : function(s){
            $("#uidpContent").append(s);
        },
        clearContent : function() {
            $("#uidpContent").html("");
            $("#uidpUserInfo").html("");
        },
        display: function() {
            $("#course_home_content").prepend("<div id='uidpStatus'/><div id='uidpUserInfo'/><div id='uidpContent'/><div id='uidpLoginInfo'/>");
            var silent_opts = this.getSilentOpts();

            mmooc.uidp.updateStatus("Sjekker forbindelse til uidp...");
            this.token = client.checkToken(silent_opts);
            if(this.token) {
                console.log(this.token.access_token);
                this.tokenBelongsToLoggedInUser(function(belongs, canvasUserId, uidpUserInfo) {
                    if(belongs) {
                        mmooc.uidp.validToken();
                    } else {
                        let waitIcon = false;
                        var html = "Du er logget inn med " + canvasUserId  + " i Canvas og " + uidpUserInfo.user.userid;
                        if(uidpUserInfo.user.userid_sec.length)
                        {
                            html += "/" + uidpUserInfo.user.userid_sec[0];
                        }
                        html += " i uidp. Du må være logget inn med samme bruker i de to systemene.";
                        mmooc.uidp.updateStatus(html, waitIcon);

                        mmooc.uidp.printLogoutOptions();
                    }
                });  
            } else { //Try and see if we can login silently.
                this.hiddenIframeLogin();
            }
        },
        displayUserInfo : function() {
/*
            mmooc.uidp.getUserInfo(function(userInfo) {
                var html = "Du er logget inn på uidp som " + userInfo.user.name;
                $("#uidpUserInfo").html(html);
            });
*/        
        },
        validToken: function() {
            mmooc.uidp.displayUserInfo();
            mmooc.uidp.printLogoutOptions();
        },
        getFeideIdFromuidpUserInfo(userIdSec)
        {
            let start = userIdSec.indexOf(":") + 1;
            let feideid = userIdSec.substr(start);
            return feideid;
        },
        //If we want to require that the account used to connect to uidp is the same as the one used
        //to login to Canvas, we could call the code below and perform some checks. Right now the code
        //compares the Canvas login id with the secondary open id, i.e. Feide id. 
        tokenBelongsToLoggedInUser: function(callback) {
            this.getUserInfo(function(userInfo) {
                mmooc.api.getUserProfile(function(userProfile) {
                    var belongs = false;
                    if(userProfile.login_id == userInfo.user.userid) {
                        belongs = true;
                    } else if (userInfo.user.userid_sec.length) {
                        let userIdSec = userInfo.user.userid_sec[0];
                        let feideId = mmooc.uidp.getFeideIdFromuidpUserInfo(userIdSec);
                        if(userProfile.login_id == feideId) {
                            belongs = true;
                        }
                    }
                    callback(belongs, userProfile.login_id, userInfo);
                });
            });
        },
        printLogoutOptions : function() {
            var html = "<div><button class='button' id='uidpWipeToken'>Logg ut av uidp</button></div>";
            $("#uidpLoginInfo").html(html);
            $(document).on("click","#uidpWipeToken",function(e){
                mmooc.uidp.wipeToken();
                mmooc.uidp.clearStatus();
                mmooc.uidp.clearContent();
                mmooc.uidp.printLoginOptions();
            });
        },
        printLoginOptions : function() {
            var uidpHtml = mmooc.util.renderTemplateWithData("uidp", {});
            $("#uidpLoginInfo").html(uidpHtml);
            $(document).off('click', "#uidpPopupLogin");
            $(document).on ("click", "#uidpPopupLogin",function(e) {mmooc.uidp.authorizePopup()});
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
                        mmooc.uidp.clearStatus();
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
            let url = "https://uidp-api-dev.udir.no/Account";
            this._get(url, callback);
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
                    console.log("I got the idtoken: " + token.id_token);
                    self.token = token;
                    self.validToken();
                })
                .catch((err) => {
                    console.error("Error from popup loader", err)
                })
        },        
        login : function() {
            window.loginType = "login";
            let token = client.getToken(opts);
            client.setLoader(jso.HTTPRedirect)
            client.getToken(opts)
                .then((token) => {
                    dashboard.dataporten.valideToken();
                    console.log("I got the token: ", token)
                    console.log("I got the idtoken: " + token.id_token);
                })
        },
        hiddenIframeLogin : function()
        {
//            window.loginType = "iframeLogin";
            var self = this;
            var silent_opts = this.getSilentOpts();
            client.setLoader(jso.IFramePassive)
            client.getToken(silent_opts)
                .then((token) => {
                    console.log("I got the token: ", token)
                    console.log("I got the idtoken: " + token.id_token);
                    self.token = token;
                    self.validToken();
                })
                .catch((err) => {
                    console.log("Error from passive loader", err)
                    mmooc.uidp.clearStatus();
                    self.printLoginOptions();

//                    alert("iframe passive login only works if you are already logged in:" + err);
                })
        }    }
}();
