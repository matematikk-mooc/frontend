this.mmooc = this.mmooc || {};

this.mmooc.utilRoot = function() {
  return {
    _env: typeof ENV !== 'undefined' ? ENV : {},
    getRoles : function() {
      return this._env.current_user_roles;
    },
    isAuthenticated : function () {
      return this.getRoles() !== null;
    },
    getLinkToMyCourses: function () {
        var linkToMyCourses = "/courses" + mmooc.hrefQueryString;
        return linkToMyCourses;
    },

    //Support IE 11
    parse_query_string : function(query) {
      var vars = query.split("&");
      var query_string = {};
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
          query_string[key] = decodeURIComponent(value);
          // If second entry with this name
        } else if (typeof query_string[key] === "string") {
          var arr = [query_string[key], decodeURIComponent(value)];
          query_string[key] = arr;
          // If third or later entry with this name
        } else {
          query_string[key].push(decodeURIComponent(value));
        }
      }
      return query_string;
    },
    urlParamsToObject: function() {
      if (document.location.search === '') return {};

      const search = location.search.substring(1);
      return mmooc.utilRoot.parse_query_string(search);
    },
    checkReferrer:function(ref) {
       return document.referrer.includes(ref);
    },

    isEnrollReferrer: function() {
      const permittedReferrers = mmooc.settingsRoot.feideEnrollRefferers;
      const hasPermittedRefferer = permittedReferrers.some(mmooc.utilRoot.checkReferrer);

      if( !mmooc.utilRoot.isAuthenticated() && hasPermittedRefferer) {
        return true;
      }
      return false;
    },
    redirectFeideAuthIfEnrollReferrer: function() {
      // Checks if we hit the /canvas/login from Feide Enroll pages
      // If we go from permitted refferer, we redirect to Feide auth
      // when page user is unauthenticated and does not provide `?normalLogin` param
      if(mmooc.utilRoot.isEnrollReferrer()) {
        if(document.location.search.includes("normalLogin=1")) {
            $("#content > div > div > div > div > div.ic-Login-header > div.ic-Login-header__links").hide();
        }
        else {
           window.location.href = '/login/saml/2';
           return true;
        }
      }
      return false;
    },
    isEnrollCodeParamPassed: function(urlParamsObj) {
        const enrollCode = urlParamsObj && urlParamsObj['enroll_code'];
        if (enrollCode !== undefined) {
            return enrollCode;
        }
        return null;
    },
    isLoginParamPassed: function(urlParamsObj) {
        const login = urlParamsObj && urlParamsObj['login'];
        if (login !== undefined) {
            return true;
        }
        return false;    
    },
    triggerForgotPasswordIfParamPassed: function() {
      const params = this.urlParamsToObject();
      if (params['gp'] !== undefined) {
        $('#login_forgot_password').click();
      }
    },
    redirectToEnrollIfCodeParamPassed: function() {
      // If user wanted to enroll a course using Feide auth,
      // then was returned from SAML login view, we redirect to proper enrollment page
      if (document.location.search !== '') {
        const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
        var enrollCode = mmooc.utilRoot.isEnrollCodeParamPassed(urlParamsObj);
        if (enrollCode) {
          window.location.href = "/enroll/" + enrollCode + mmooc.hrefQueryString;
          return true;
        }
        if (mmooc.utilRoot.isLoginParamPassed(urlParamsObj)) {
          const linkToMyCourses = mmooc.utilRoot.getLinkToMyCourses();
          window.location.href = linkToMyCourses;
          return true;
        }
      }
      return false;
    },

    redirectToSamlIfUdirCourse: function(kpasApiUrl){
      try {
        if(!mmooc.utilRoot.isAuthenticated()) {
          const currentUrl = '' + window.location.pathname;
          const currentCourseId = mmooc.utilRoot.getCourseIdFromUrl(currentUrl);
          mmooc.utilRoot.isDeepLinkToUdirCourse(currentCourseId, kpasApiUrl).then( (result) => {
                if (result) {
                  window.location = "/login/saml/2";
                  return true;
                }else{
                  return false;
                }
              }
          )
        }
      } catch (e) {
        console.log(e);
      }
    },
    /*isDeepLinkToUdirCourse: async function(currentCourseId, kpasApiUrl) {

      let requestResult = undefined;

      if (currentCourseId) {
        await $.getJSON(kpasApiUrl + "course/" + currentCourseId + "/isudircourse", function(data) {
          requestResult = data.result;
        });
      } else {
        return false;
      }
      return requestResult;

    },*/
    getCourseIdFromUrl : function(currentUrl) {
      const matches = currentUrl.match(/\/courses\/(\d+)/);
      if (matches != null) {
        return parseInt(matches[1], 10);
      } else if (this._env.group) {
        // Group pages does not contain course id in URL, but is available via JavaScript variable
        return this._env.group.context_id;
      } else if ($('#discussion_container').size() > 0) {
        const tmp = $(
            '#discussion_topic div.entry-content header div div.pull-left span a'
        );
        if (tmp.length) {
          const tmpHref = tmp.attr('href');
          if (tmpHref.length) {
            const tmpHrefArr = tmpHref.split('/');
            if (tmpHrefArr.length == 3) {
              return parseInt(tmpHrefArr[2], 10);
            }
          }
        }
      }
      return null;
    }
  }
}();
