import  api from '../api/api.js'
import settings from "../settings";

export default (function () {
  return {
    courseListEnum: {
      normalCourse: 1,
      allCoursesList: 2,
      myCoursesList: 3,
      dataportenCallback: 4,
      uidpCallback: 5
    },

    mapCourseSettings: function (courses, courseSettings) {
      courses.forEach(course => {
        var cc = courseSettings.find(x => x.course_id === course.id)
        if(cc) {
          course.course_settings = cc
        }
      });
      return courses
    },
    mmoocLoadScript: function (mmoocScript) {
      var mmoocScriptElement = document.createElement('script');
      mmoocScriptElement.setAttribute('charset', 'UTF-8');
      mmoocScriptElement.setAttribute('src', mmoocScript);
      document.body.appendChild(mmoocScriptElement);
    },


    isMobileOrTablet: function() {
      if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
      }
      else {
            return false;
         }
    },

    getPageTitleBeforeColon: function () {
      // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
      var title = document.title;
      if (title.indexOf(':')) {
        title = title.substring(0, title.indexOf(':'));
      }
      return title;
    },

    getPageTitleAfterColon: function () {
      // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
      var title = document.title;
      if (title.indexOf(':')) {
        title = title.substring(title.indexOf(':') + 1, title.length);
      }
      return title;
    },

    filterCourse: function (course) {
      if (!settings.filterCourses) {
        return true;
      }
      return settings.filterCoursesOnAccountId.includes(course.account_id);
    },
    filterSearchAllCourse: function (course) {
      if (!settings.filterCourses) {
        return true;
      }
      return settings.filterCoursesOnAccountId.includes(course.course.account_id);
    },
    callWhenElementIsPresent: function (classId, callback) {
      var checkExist = setInterval(function () {
        var checkClassId = classId;
        if ($(checkClassId).length) {
          clearInterval(checkExist);
          callback();
        }
      }, 100);
    },

    arraySorted: function (array, elementToSort) {
      if (
        Object.prototype.toString.call(array) === '[object Array]' &&
        elementToSort
      ) {
        return array.sort(function (a, b) {
          if (
            a.hasOwnProperty(elementToSort) &&
            b.hasOwnProperty(elementToSort)
          ) {
            var field1 = a[elementToSort].toLocaleLowerCase();
            var field2 = b[elementToSort].toLocaleLowerCase();
            return field1.localeCompare(field2, 'nb', { usage: 'sort' });
          }
          return 0;
        });
      }
      return array;
    },

    goBack: function (e) {
      //http://stackoverflow.com/questions/9756159/using-javascript-how-to-create-a-go-back-link-that-takes-the-user-to-a-link-i
      var defaultLocation = SERVER;
      var oldHash = window.location.hash;

      history.back(); // Try to go back

      var newHash = window.location.hash;

      /* If the previous page hasn't been loaded in a given time (in this case
       * 1000ms) the user is redirected to the default location given above.
       * This enables you to redirect the user to another page.
       *
       * However, you should check whether there was a referrer to the current
       * site. This is a good indicator for a previous entry in the history
       * session.
       *
       * Also you should check whether the old location differs only in the hash,
       * e.g. /index.html#top --> /index.html# shouldn't redirect to the default
       * location.
       */

      if (
        newHash === oldHash &&
        (typeof document.referrer !== 'string' || document.referrer === '')
      ) {
        window.setTimeout(function () {
          // redirect to default location
          window.location.href = defaultLocation;
        }, 1000); // set timeout in ms
      }
      if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.preventPropagation) e.preventPropagation();
      }
      return false; // stop event propagation and browser default event
    },

    adaptHeightToIframeContentForId: function (containerId, frameId) {
      var scrollHeight =
        Number(
          document.getElementById(frameId).contentWindow.document.body
            .scrollHeight
        ) + 20;
      document.getElementsByClassName(containerId)[0].style.height =
        scrollHeight + 'px';
    },

    isEnrolledAsStudent: function (enrollments) {
      for (var i = 0; i < enrollments.length; i++) {
        if (enrollments[i].role == 'StudentEnrollment') {
          return true;
        }
      }
      return false;
    },
    isEnrolledAsObserver: function (enrollments) {
      for (var i = 0; i < enrollments.length; i++) {
        if (enrollments[i].role == 'ObserverEnrollment') {
          return true;
        }
      }
      return false;
    },
    enrollmentsHasRoleInCourse: function (enrollments, role) {
      for (let i = 0; i < enrollments.length; i++) {
        let enrollment = enrollments[i];
        if (enrollment["role"] == role) {
          return true;
        }
      }
      return false;
    },
    hasRoleInCourse: function (courseId, role, callback) {
      let self = this;
      return function (callback, role) {
        api.getUsersEnrollmentsForCourse(courseId, function (enrollments) {
          callback(self.enrollmentsHasRoleInCourse(enrollments, role));
        });
      }(callback, role)
    },
    isTeacherOrAdmin: function () {
      var roles = api.getRoles();
      return (
        roles != null &&
        (roles.indexOf('teacher') != -1 || roles.indexOf('admin') != -1)
      );
    },
    isAdmin: function () {
      var roles = api.getRoles();
      return (
        roles != null &&
        (roles.indexOf('admin') != -1)
      );
    },
    isObserver: function (course) {
      if (course && course.enrollments) {
        return this.isEnrolledAsObserver(course.enrollments);
      }
    },
    isEnrolledWithRole(course, role) {
      if (course && course.enrollments) {
        for (var i = 0; i < course.enrollments.length; i++) {
          if (course.enrollments[i].role == role) {
            return true;
          }
        }
      }
      return false;
    },

    isMultilangCourse() { return this.course.kpas.multilang != "NONE"},
    isNynorskCourse() { return this.course.kpas.multilang == "NN"},
    isSamiskCourse() { return this.course.kpas.multilang == "SE"},
    isPrincipal() {
      return (this.isTeacherOrAdmin() || this.isEnrolledWithRole(this.course, settings.principalRoleType));
    },
    isRoleBasedCourse() {return this.course.kpas.role_support == 1},
    isMMOOCLicense() {
      return this.course.kpas.licence == 1;
    },
    postModuleProcessing() {
      try {
        let html = '<div class="login-box" style="position: fixed">Laster diskusjonen</div>';
        $("#wrapper").append(html);
        setInterval(function () {
          console.log("postModuleProcessing intervall timer called")
          $(".login-box").append(".");
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },

    getBannerType() {
      console.log(this.course)
      if(this.course && this.course.kpas && this.course.kpas.banner_type){
        return this.course.kpas.banner_type;
      }
      return "NONE";
    },
    getAlertMsg() {
      if (this.course) {
        if(this.course.kpas.banner_type == "ALERT"){
          return this.course.kpas.banner_text;
        }
      }
      return "";
    },
    getUnmaintainedMsg() {
      if (this.course) {
        if(this.course.kpas.banner_type == "UNMAINTAINED"){
          return this.course.kpas.banner_text;
        }
      }
      return "";
    },
    getUnmaintainedSinceDate() {
      if(this.course){
        if(this.course.kpas.banner_type == "UNMAINTAINED"){
          return this.course.kpas.unmaintained_since;
        }
      }
      return null;
    },
    getNotificationMsg() {
      if (this.course) {
        if(this.course.kpas.banner_type == "NOTIFICATION"){
          return this.course.kpas.banner_text;
        }
      }
      return "";
    },
    getFeedbackMsg() {
      if (this.course) {
        if(this.course.kpas.banner_type == "FEEDBACK"){
          return this.course.kpas.banner_text;
        }
      }
      return "";
    },

    //description":"courseId:360:community:1902:940101808"
    getCountyOrCommunityNumber(groupDescription) {
      var arr = groupDescription.split(":");
      for (var i = 0; i < arr.length; i++) {
        if ((arr[i] == "community") || (arr[i] == "county")) {
          return parseInt(arr[i + 1], 10);
        }
      }
      return 0;
    },
    onEnrollPage() {
      return window.location.href.includes('/enroll/');
    },
    isMemberOfExpiredCommunity(course, callback) {
      let self = this
      if(!course) {
        return;
      }
      api.getUserGroupsForCourse(course.id, function (groups) {
        var memberOfUtgaattKommune = false;
        if (groups.length) {
          for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            var countyOrCommunityNumber = self.getCountyOrCommunityNumber(group.description);
            if (countyOrCommunityNumber) {
              if (fknr.utgaatteKommuneNr.indexOf(countyOrCommunityNumber) > -1) {
                memberOfUtgaattKommune = true;
                break;
              }
            }
          }
        }
        callback(memberOfUtgaattKommune);
      });
    },
    isActiveCourseRoleBased() {
      return this.isRoleBasedCourse(this.course);
    },
    isAuthenticated: function () {
      return api.getRoles() !== null;
    },

    getGroupsInfo(groups) {
      var groupsInfo = {};
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].description) {
          var s = groups[i].description.split(":");
          if (s[2] == "community") {
            groupsInfo.municipalityId = s[3];
          } else if (s[2] == "county") {
            groupsInfo.countyId = s[3];
          }
        }
      }
      return groupsInfo;
    },

    formattedDate: function (date) {
      var date = new Date(date);
      var month = getMonthShortName(date);
      return (
        date.getDate() +
        ' ' +
        month +
        ', ' +
        date.getFullYear() +
        ' - ' +
        date.getHours() +
        ':' +
        (date.getMinutes() < 10 ? '0' : '') +
        date.getMinutes()
      );
    },

    getWeekdayShortName: function (date) {
      var weekdays = ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'];
      return weekdays[date.getDay()];
    },

    getMonthShortName: function (date) {
      var months = [
        'jan',
        'feb',
        'mar',
        'apr',
        'mai',
        'jun',
        'jul',
        'aug',
        'sep',
        'okt',
        'nov',
        'des'
      ];
      return months[date.getMonth()];
    },
    getCourseCategories: function (courses) {
      var categorys = [];
      var hasOther = false;
      for (var i = 0; i < courses.length; i++) {
        var category = this.getCourseCategory(courses[i].course_code);
        if (categorys.indexOf(category) == -1) {
          if (category == 'Andre') {
            hasOther = true;
          } else {
            categorys.push(category);
          }
        }
      }
      //      categorys.sort();
      if (hasOther) {
        categorys.push('Andre');
      }
      return categorys;
    },
    sortCourses: function (courses) {
      return courses.sort(function (a, b) {
        var aParams = a.course_code.split("::");
        if (aParams.length < 2) {
          return 1;
        }

        var aCourseCode = aParams[aParams.length - 1];

        var bParams = b.course_code.split("::");
        if (bParams.length < 2) {
          return -1;
        }
        var bCourseCode = bParams[bParams.length - 1];

        return aCourseCode < bCourseCode ? -1 : 1;
      });
    },

    getCourseCategory: function (courseCode) {
      var category = 'Andre';
      if (courseCode && courseCode.indexOf('::') > -1) {
        category = courseCode.substring(0, courseCode.indexOf('::'));
      }
      return category;
    },

    debounce: function (func, wait, immediate) {
      var timeout;
      return function () {
        var context = this, args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    filter: function (arr, fun) {
      var len = arr.length;
      if (typeof fun != "function")
        throw new TypeError();

      var res = new Array();
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in arr) {
          var val = arr[i];
          if (fun.call(thisp, val, i, arr))
            res.push(val);
        }
      }

      return res;
    },
    urlHashToObject: () => {
      if (document.location.hash === '') return {};

      const hash = location.hash.substring(1);
      return JSON.parse(
        '{"' + hash.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        (key, value) => key === "" ? value : decodeURIComponent(value)
      );
    },
    updateRightMenuButtons: function() {
      $("#course_show_secondary > a").each(function() {
        var $this = $(this);
        var _href = $this.attr("href");
        if(_href.includes("/calendar?")){
          $this.remove();
        }
        else{
          $this.attr("href", _href);
        }
      });
    },
    removeRecentFeedback: function() {
      $(".recent_feedback").each(function() {
        var $this = $(this);
        $this.remove()
      });
    },
    getLinkToAvailableCourses: function () {
      var linkToAvailableCourses = "/search/all_courses";
      //ETH20190409 By making sure the root account loads our design, we do not need a front page.
      /*
              if (allCoursesFrontpageCourseID > 0) {
                  linkToAvailableCourses = "/courses/" + allCoursesFrontpageCourseID + "?coursesList=1";
              }
      */
      return linkToAvailableCourses;
    },
    //This function can probably be deleted now that we use ?udirDesign
    isCourseFrontpageForAllCoursesList: function () {
      return false;
    },
    tinyMceEditorIsInDOM(callback) {
      this.executeCallbackWhenObjectExists(function () {
        tinyMCE.activeEditor;
      }, callback);
    },
    executeCallbackWhenObjectExists(functionWithObjectReference, callback) {
      let counter = 0;
      let maxTries = 10;
      let success = false;
      var objectExistInterval = setInterval(function () {
        try {
          if (!success) {
            functionWithObjectReference();
            clearInterval(objectExistInterval);
            callback();
            success = true;
          }
        } catch (e) {
          counter += 1;
          if (counter >= maxTries) {
            clearInterval(objectExistInterval);
          }
        }
      }, 1000);
    },
  
    // V2: Add timeout support for revalidation, so that we can for example limit it to only call the API every 15 minutes
    fetchWithSwr: function(key, fetcher, callback) {
      //return stale content while data is revalidating in the background
      //clear cache if data is not valid json/corrupted
      let storageKey = `swr_${key}`
      let initStorageDataIsSent = false;
      let storageData = window.localStorage.getItem(storageKey);
      if (storageData != null) {
        try {
          let parsedJsonData = JSON.parse(storageData);
          callback(parsedJsonData);
          initStorageDataIsSent = true;
        } catch (error) {
          window.localStorage.removeItem(storageKey);
        }
      }

      //revalidate data when everything else has already loaded
      //execute fetch data call right away if there is no cache response in storage
      if (initStorageDataIsSent) {
        window.onload = () => {
          this.swrFetcher(storageKey, fetcher, callback, storageData, initStorageDataIsSent);
        };
      } else {
        this.swrFetcher(storageKey, fetcher, callback, storageData, initStorageDataIsSent);
      }
    },
    swrFetcher: function(key, fetcher, callback, stringData, init) {
      fetcher().then(function (res) {
        let newStorageDataString = JSON.stringify(res);
        let diffInData = stringData != newStorageDataString;

        if (!init || diffInData) {
          callback(res);
          window.localStorage.setItem(key, newStorageDataString);
        }
      });
    }
  };
})();
