this.mmooc = this.mmooc || {};

this.mmooc.utilRoot = (function() {
  return {
    _env: typeof ENV !== 'undefined' ? ENV : {},
    getRoles() {
      return this._env.current_user_roles;
    },
    isAuthenticated () {
      return this.getRoles() !== null;
    },
    getLinkToMyCourses: () => {
        var linkToMyCourses = "/courses" + mmooc.hrefQueryString;
        return linkToMyCourses;
    },

    urlParamsToObject: () => {
      if (document.location.search === '') return {};

      const search = location.search.substring(1);
      return JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        (key, value) => key === "" ? value : decodeURIComponent(value)
      );
    },

    isEnrollReferrer: () => {
      const permittedReferrers = mmooc.settingsRoot.feideEnrollRefferers;
      const hasPermittedRefferer = permittedReferrers.some(ref => document.referrer.endsWith(ref));

      if( !mmooc.utilRoot.isAuthenticated() && hasPermittedRefferer) {
        return true;
      }
      return false;
    },
    redirectFeideAuthIfEnrollReferrer: () => {
      // Checks if we hit the /canvas/login from Feide Enroll pages
      // If we go from permitted refferer, we redirect to Feide auth
      // when page user is unauthenticated and does not provide `?normalLogin` param
      if(mmooc.utilRoot.isEnrollReferrer()) {
        if(document.location.search == "?normalLogin=1") {
            $("#content > div > div > div > div > div.ic-Login-header > div.ic-Login-header__links").hide();
        }
        else {
           window.location.href = '/login/saml';
           return true;
        }
      }
      return false;
    },
    isEnrollCodeParamPassed: (urlParamsObj) => {
        const enrollCode = urlParamsObj && urlParamsObj['enroll_code'];
        if (enrollCode !== undefined) {
            return enrollCode;
        }
        return null;
    },
    isLoginParamPassed: (urlParamsObj) => {
        const login = urlParamsObj && urlParamsObj['login'];
        if (login !== undefined) {
            return true;
        }
        return false;    
    },
    redirectToEnrollIfCodeParamPassed: () => {
      // If user wanted to enroll a course using Feide auth,
      // then was returned from SAML login view, we redirect to proper enrollment page
      if (document.location.search !== '') {
        const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
        var enrollCode = mmooc.utilRoot.isEnrollCodeParamPassed(urlParamsObj);
        if (enrollCode) {
          window.location.href = `/enroll/${enrollCode}` + mmooc.hrefQueryString;
          return true;
        }
        if (mmooc.utilRoot.isLoginParamPassed(urlParamsObj)) {
          const linkToMyCourses = mmooc.utilRoot.getLinkToMyCourses();
          window.location.href = linkToMyCourses;
          return true;
        }
      }
      return false;
    }
  }
})();
