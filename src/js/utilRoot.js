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
        if (allCoursesFrontpageCourseID > 0) {
            linkToMyCourses = "/courses/" + allCoursesFrontpageCourseID + "?myCourses=1";
        }
        return linkToMyCourses;
    },

    urlParamsToObject: () => {
      // conver url params string "?abc=foo&def=%5Basf%5D&xyz=5&foo=b%3Dar"
      // to {abc: "foo", def: "[asf]", xyz: "5", foo: "b=ar"}

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

      if( document.location.search !== "?normalLogin" &&
          !mmooc.utilRoot.isAuthenticated() &&
          hasPermittedRefferer
      ) {
        window.location.href = '/login/saml';
      }
    },
    redirectToEnrollIfCodeParamPassed: () => {
      // if user wanted to enroll a course using Feide auth,
      // then was returned from SAML login view, we redirect to proper enrollment page
      if (document.location.search !== '') {

        // fetch the string '?param1=x&param2=y'
        // to obj { param1: 'x', param2: 'y'}
        const urlParamsObj = mmooc.utilRoot.urlParamsToObject();

        // get the value of  'enroll_code' 
        const enrollCode = urlParamsObj && urlParamsObj['enroll_code'];

        // get the value of  'login' 
        const login = urlParamsObj && urlParamsObj['login'];


        // if enroll_code param was passed
        if (enrollCode !== undefined) {
          window.location.href = `/enroll/${enrollCode}`;
        }
        else if (login !== undefined)
        {
          const linkToMyCourses = mmooc.utilRoot.getLinkToMyCourses();
          window.location.href = linkToMyCourses;
        }
      }
    }
  }
})();
