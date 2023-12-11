
import { hrefAmpQueryString, hrefQueryString } from "../settingsRoot";

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


    //Kilde: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    isMobileOrTablet: function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
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
      for (i = 0; i < enrollments.length; i++) {
        let enrollment = enrollments[i];
        if (enrollment["role"] == role) {
          return true;
        }
      }
      return false;
    },
    hasRoleInCourse: function (courseId, role, callback) {
      return function (callback, role) {
        api.getUsersEnrollmentsForCourse(courseId, function (enrollments) {
          callback(enrollmentsHasRoleInCourse(enrollments, role));
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
    postModuleCoursePageProcessing() {
      try {
        $(".mmooc-module-items-icons-Discussion").click(function () {
          postModuleProcessing()
        });
      } catch (e) {
        console.log(e);
      }
    },



    isAlertMsg(course) {
      if (course) {
        var arr = course.course_code.split("::");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == "ALERTMSG") {
            return arr[i + 1];
          }
        }
      }
      return "";
    },
    isUnmaintained(course) {
      if (course) {
        var arr = course.course_code.split("::");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == "UNMAINTAINED") {
            return arr[i + 1];
          }
        }
      }
      return "";
    },
    isNotificationToUser(course) {
      if (course) {
        var arr = course.course_code.split("::");
        for (var i =0; i < arr.length; i++) {
          if (arr[i] == "notificationtouser"){
            return true ;
          }
        }
      }
      return "";
    },
    isFeedback(course) {
      if (course) {
        var arr = course.course_code.split("::");
        for (var i =0; i < arr.length; i++) {
          if (arr[i] == "feedback"){
            return true ;
          }
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
      if(!course) {
        return;
      }
      api.getUserGroupsForCourse(course.id, function (groups) {
        var memberOfUtgaattKommune = false;
        if (groups.length) {
          for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            var countyOrCommunityNumber = getCountyOrCommunityNumber(group.description);
            if (countyOrCommunityNumber) {
              if (utgaatteKommuneNr.indexOf(countyOrCommunityNumber) > -1) {
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
    firstIncompleteItemHtmlUrl: function (items, bIncludeIndentedItems) {
      var firstHtmlUrl = null;
      var firstItem = null;
      if (items != null && items != undefined && items.length > 0) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (!firstHtmlUrl && item.html_url) {
            firstHtmlUrl = item.html_url;
          }
          if (item.completion_requirement && !(item.indent && !bIncludeIndentedItems)) {
            if (!firstItem) {
              firstItem = item;
            }
            if (!item.completion_requirement.completed) {
              return item.html_url;
            }
          }
        }
      }
      if (firstItem) {
        return firstItem.html_url;
      }
      return firstHtmlUrl;
    },

    percentageProgress: function (modules, bIncludeIndentedItems) {
      var total = 0;
      var completed = 0;

      for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        for (var j = 0; j < module.items.length; j++) {
          var item = module.items[j];
          if (!(item.indent && !bIncludeIndentedItems)) {
            if (item.completion_requirement) {
              total++;
              if (item.completion_requirement.completed) {
                completed++;
              }
            }
          }
        }
      }
      return Math.round((completed * 100) / total);
    },
    updateProgressForRoleBasedCourses: function (courses) {
      const error = error => console.error('error calling api', error);
      let self = this;
      for (var i = 0; i < courses.length; i++) {
        var course = courses[i];
        if (this.isRoleBasedCourse(course) && !this.isEnrolledWithRole(course, settings.principalRoleType)) {
          api.listModulesForCourse(
            (function (courseId) {
              return function (modules) {
                var bIncludeIndentedItems = false;
                var p = self.percentageProgress(modules, bIncludeIndentedItems);
                var divId = "#course_" + courseId + "> div > div.mmooc-course-list-progress > div ";
                $(divId + " > div").attr("style", "width:" + p + "%; -webkit-transition: width 2s; transition: width 2s;");
                if (p == 100) {
                  $(divId).addClass("mmooc-progress-bar-done");
                }
              };
            })(course.id)
            , error, course.id);
        }
      }
    },
    setGlobalPeerReviewButtonState: function () {
      if (settings.disablePeerReviewButton == true) {
        $('.assignments #right-side :submit').prop('disabled', true);
      }
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
    getCoursesCategorized: function (courses, categorys) {
      var coursesCategorized = [];
      for (var i = 0; i < categorys.length; i++) {
        var categoryCourses = [];
        var noOfRoleBasedCourses = 0;
        var noOfPersonalBasedCourses = 0;
        for (var j = 0; j < courses.length; j++) {
          var course = courses[j];
          var category = this.getCourseCategory(course.course_code);
          if (categorys[i] == category) {
            course.roleBasedCourse = this.isRoleBasedCourse(course);
            if(course.roleBasedCourse) {
              noOfRoleBasedCourses++;
            } else {
              noOfPersonalBasedCourses++;
            }
            categoryCourses.push(course);
          }
        }
        /*        categoryCourses.sort(function(a, b) {
                  return a.course_code > b.course_code;
                });
        */
        var categoryObj = {
          title: categorys[i],
          noOfRoleBasedCourses: noOfRoleBasedCourses,
          noOfPersonalBasedCourses: noOfPersonalBasedCourses,
          courses: categoryCourses
        };
        coursesCategorized.push(categoryObj);
      }
      return coursesCategorized;
    },
    getCourseCategory: function (courseCode) {
      var category = 'Andre';
      if (courseCode && courseCode.indexOf('::') > -1) {
        category = courseCode.substring(0, courseCode.indexOf('::'));
      }
      return category;
    },
    getToolsInLeftMenu: function (path) {
      var modulesFound = false;
      var toolList = [];
      var activeToolName = 'Verktøy';
      var activeToolPath = '';

      $('#section-tabs .section > a').each(function () {
        var currentClass = $(this).attr('class');
        if (modulesFound && currentClass != 'settings') {
          var href = $(this).attr('href');
          var title = $(this).html();
          var activeTool = false;
          if (href == path) {
            activeTool = true;
            activeToolName = title;
            activeToolPath = href;
          }
          toolList.push({
            activeTool: activeTool,
            href: href,
            title: title
          });
        } else if (currentClass == 'modules') {
          modulesFound = true;
        }
      });
      return {
        activeToolName: activeToolName,
        activeToolPath: activeToolPath,
        toolList: toolList
      };
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
          $this.attr("href", _href + hrefAmpQueryString);
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
      var linkToAvailableCourses = "/search/all_courses" + hrefQueryString;
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
      executeCallbackWhenObjectExists(function () {
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
    }
  };
})();
