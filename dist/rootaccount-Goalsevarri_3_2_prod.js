this.mmooc = this.mmooc || {};

this.mmooc.hrefQueryString = "?design=udir";
this.mmooc.hrefAmpQueryString = "&design=udir";

this.mmooc.settingsRoot = {
    feideEnrollRefferers: [
      "design=udir",
      "enroll_code",
      "kslaring.no"
    ],
    kpasApiUrl: 'https://kpas-lti.azurewebsites.net/api'
};


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

        var design = urlParamsObj && urlParamsObj['design'];

        var newHref = null;

        var enrollCode = mmooc.utilRoot.isEnrollCodeParamPassed(urlParamsObj);
        if (enrollCode) {
          newHref = "/enroll/" + enrollCode;  // + mmooc.hrefQueryString;
          if(design) {
            newHref += "?design=" + design; 
          }
        } 

        var forwardTo = urlParamsObj && urlParamsObj['forwardTo'];
        if(forwardTo) {
          if(design) {
            newHref += "&";
          } else {
            newHref += "?";
          }
          newHref += "forwardTo=" + encodeURIComponent(forwardTo); 
        }

        if(newHref) {
          window.location.href = newHref;
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

// Replace the normal jQuery getScript function with one that supports
// debugging and which references the script files as external resources
// rather than inline.
function getScript(url, callback) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = url;

  // Handle Script loading
  {
    var done = false;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
      if (
        !done &&
        (!this.readyState ||
          this.readyState == 'loaded' ||
          this.readyState == 'complete')
      ) {
        done = true;
        if (callback) callback();

        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null;
      }
    };
  }

  head.appendChild(script);

  // We handle everything using the script element injection
  return undefined;
}

function showCanvasLogin() {
  $('.login-box, .overlay').remove(); 
  $('.ic-Login').show();
  $("#f1_container").show(); //Small screens
}
//Redirect if necessary
var redirected = false;
//If this is a Feide self enrollment link, forward to a page that requires authentication. It will redirect to the Canvas login page
//which will pick up that there is an enrollment code in the link and forward to Feide.
if(document.location.pathname == "/search/all_courses" && document.location.search.includes('?enroll_code')) {
  window.location.href = '/courses' + document.location.search;
  redirected = true;
} else if(document.location.pathname == "/login/canvas") {
  if (document.referrer.endsWith("/logout" + mmooc.hrefQueryString)) {
    window.location.href = '/search/all_courses' + mmooc.hrefQueryString;
    redirected = true;
  } else if(!document.referrer.includes("/login/canvas")) {
    $(".ic-Login").hide();
    $("#f1_container").hide(); //Small screens
    redirected = mmooc.utilRoot.redirectFeideAuthIfEnrollReferrer();
    if(!redirected) {
      if(!document.location.search.includes("normalLogin=1")) {
        let html = `
        <div class="login-box frontPageLoginBox">
          <div class="login-box__upper">
            <div class="login-box__text">
              <div class="unitHeading">Canvas innlogging for åpne nettkurs og kompetansepakker</div>
              <div class="unitSubHeading">-for fleksibel og livslang læring</div>
            </div>
          </div>
          <div class="loginText"><b>Logg på med</b></div>
          <div class="login-box__lower">
            <a class="feide-button mmooc-button mmooc-button-primary" onclick="window.location.href=\'/login/saml/2\'">
              </a>
              <a class="icon-question unit-help-login" target="_blank" href="https://bibsys.instructure.com/courses/553"></a>
              <a class="mmooc-button mmooc-button-secondary" onclick="showCanvasLogin();">Ikke Feide</a>
          </div>
          <div class="unitPartners">
            <a href="https://udir.no" target="_blank"><img class="unitPartnersUdirLogo unitPartnersLogo" src="https://kompetanseudirno.azureedge.net/udirdesign/bitmaps/udirlogo50px.png"/></a>
            <a href="https://ntnu.no" target="_blank"><img class="unitPartnersSmallLogo" src="https://kompetanseudirno.azureedge.net/udirdesign/bitmaps/logo_ntnu.png"/></a>
            <a href="https://unit.no" target="_blank"><img class="unitPartnersUnitLogo" src="https://kompetanseudirno.azureedge.net/udirdesign/bitmaps/unit-logo-farge.svg"/></a>
          </div>
        </div>
        `;
        var feidLoginBoxPosition = document.getElementById('wrapper');
        if(!feidLoginBoxPosition) {
          feidLoginBoxPosition = document.getElementById('f1_container');
        }
        feidLoginBoxPosition.insertAdjacentHTML('afterend', html);
        $('#application').before(`<div class="overlay"></div>`);
      }
      else {
        $(".ic-Login").show();
        $("#f1_container").show(); //Small screens
      }
    }
  }
} else if (document.location.pathname == "/courses") {
  redirected = mmooc.utilRoot.redirectToEnrollIfCodeParamPassed();
} else if (document.location.pathname == "/") {
  setTimeout(function() {
    if(!$(".ic-DashboardCard__header_hero").length) {
      let html = `
      <div class="card card-body">
      <h3>Er det tomt her?</h3>
        <p>Dersom du har valgt å logge inn med Feide og ikke finner innholdet ditt kan det hende det er fordi du 
        vanligvis har logget på med en annen bruker ved å bruke epost og passord. Logg ut og inn igjen ved å benytte "Ikke Feide" - knappen.
        </p>
        <img src="https://kompetanseudirno.azureedge.net/udirdesign/bitmaps/nyinnlogging.png" width="70%" alt="Ny innloggingsskjerm"/>
      </div>
      `;
      document.getElementById('dashboard-activity').insertAdjacentHTML('beforebegin', html);
    }
  }, 1000)  
}


if(!redirected) {
  const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
  const design = urlParamsObj && urlParamsObj['design'];
  if (design !== undefined && design=="udir") {
      if(this.udirDesignLoaded === undefined)
      {
          this.udirDesignLoaded = true;
          console.log("Root account:Loading udir design.");

          var filename = 'https://kompetanseudirno.azureedge.net/udirdesign/mmooc-min-Goalsevarri_3_2_prod.css';

          var fileref=document.createElement("link")
          fileref.setAttribute("rel", "stylesheet")
          fileref.setAttribute("type", "text/css")
          fileref.setAttribute("href", filename)
          fileref.onload = (_) => {
            $.getScript('https://kompetanseudirno.azureedge.net/udirdesign/mmooc-min-Goalsevarri_3_2_prod.js');
          }
          document.getElementsByTagName("head")[0].appendChild(fileref)
      } else {
          console.log("Root account:Udir design already loaded.");
      }
  } else {
      console.log("Root account:Not loading any special design.");
  }
}

//# sourceMappingURL=rootaccount-Goalsevarri_3_2_prod.js.map