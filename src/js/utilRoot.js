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
        var linkToMyCourses = "/courses";
        if (this.mmooc.allCoursesFrontpageCourseID > 0) {
            linkToMyCourses = "/courses/" + this.mmooc.allCoursesFrontpageCourseID + "?myCourses=1";
        }
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

    redirectFeideAuthIfEnrollReferrer: () => {
      // Checks if we hit the /canvas/login from Feide Enroll pages
      // If we go from permitted refferer, we redirect to Feide auth
      // when page user is unauthenticated and does not provide `?normalLogin` param
      const permittedReferrers = mmooc.settingsRoot.feideEnrollRefferers;
      const hasPermittedRefferer = permittedReferrers.some(ref => document.referrer.endsWith(ref));

      if( !mmooc.utilRoot.isAuthenticated() && hasPermittedRefferer) {
        if(document.location.search == "?normalLogin") {
            $("#content > div > div > div > div > div.ic-Login-header > div.ic-Login-header__links").hide();
        }
        else {
           window.location.href = '/login/saml';
        }
      }
    },
    redirectToEnrollIfCodeParamPassed: () => {
      // If user wanted to enroll a course using Feide auth,
      // then was returned from SAML login view, we redirect to proper enrollment page
      if (document.location.search !== '') {
        const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
        const enrollCode = urlParamsObj && urlParamsObj['enroll_code'];
        const login = urlParamsObj && urlParamsObj['login'];
        if (enrollCode !== undefined) {
          window.location.href = `/enroll/${enrollCode}`;
        }
        else if (login !== undefined) {
          const linkToMyCourses = mmooc.utilRoot.getLinkToMyCourses();
          window.location.href = linkToMyCourses;
        }
      }
    }
  }
})();
