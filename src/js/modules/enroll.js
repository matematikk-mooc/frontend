import EnrollToCourse from "../../vue/components/enroll/EnrollToCourse.vue";
import LoadingIndicator from "../../vue/components/loading-indicator/LoadingIndicator.vue";
import LoggedInLandingPage from "../../vue/pages/LoggedInLandingPage.vue";
import NotLoggedInPage from "../../vue/pages/NotLoggedInPage.vue";
import api from "../api/api";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import kpasApi from "../api/kpas-api";
import settings from "../settings";
import util from "./util";
import utilRoot from "../utilRoot";

export default (function () {

  return {

    displayRegisterPopup: function(authenticated, selfRegisterCode) {
      let wrapper = document.getElementById("wrapper");
      let enrollPopup = document.createElement("div");
      enrollPopup.setAttribute("id", "enrollPopup");
      let enrollPopupComponent = createApp(EnrollToCourse, {authenticated: authenticated, selfEnrollmentCode: selfRegisterCode});
      wrapper.appendChild(enrollPopup);
      enrollPopupComponent.mount("#enrollPopup");

    },
    changeEnrollInformationPolicyLink: function () {
      var informationPolicy = $('.ic-Self-enrollment-footer__Secondary > a');
      if(informationPolicy) {
        informationPolicy.attr("href", settings.privacyPolicyLink);
      }

      var termsOfService = $('#create_user_info > div.ic-Checkbox-group > div > label');
      if(termsOfService) {
        termsOfService.html("Jeg er enig i personvernspolitikken.");
      }
    },
    addForgotPasswordLink: function () {
      const buttonId = 'selfEnrollmentForgotPassword';
      const forgotPasswordButtonHtml =
        '<button id="' + buttonId + '" class="btn btn-primary" style="display: none;" type="submit">' +
        'Glemt passord?</button>';

      const parentDiv = $('.ic-Self-enrollment-footer__Primary');
      parentDiv.prepend(forgotPasswordButtonHtml);

      const forgotPasswordButton = $(`#${buttonId}`);
      forgotPasswordButton.on(
        'click', _ => window.location = '/login/canvas?normalLogin=1&design=udir&gp'
      );

      const alreadyHasUserButton = $('#selfEnrollmentAuthRegLogin');
      alreadyHasUserButton.on('click', _ => forgotPasswordButton.show());

      const newUserButton = $('#selfEnrollmentAuthRegCreate');
      newUserButton.on('click', _ => forgotPasswordButton.hide());
    },
    updateGotoDashboardButton: function() {
      $(".ic-Self-enrollment-footer__Primary > a").each(function() {
        var $this = $(this);
        if ($this.hasClass('btn-primary')){
          var _href = $this.attr("href");
        }else {
          var _href = $this.attr("href");
        }

        const urlParamsObj = utilRoot.urlParamsToObject();

        let forwardTo = urlParamsObj && urlParamsObj['forwardTo'];
        if(forwardTo) {
          _href += "&forwardTo=" + encodeURIComponent(forwardTo);
        }
        $this.attr("href", _href);
     });
    },
    changeEnrollPage: function () {
      this.changeEnrollInformationPolicyLink();
      this.addForgotPasswordLink();
      this.updateGotoDashboardButton();
    },
    setCourseEnrolledStatus: function (allCourses, enrolledCourses, merge = false) {
      var allCoursesWithStatus = [];
      for (var i = 0; i < allCourses.length; i++) {
        allCourses[i].course.enrolled = false;
        allCourses[i].course.enrolled_status = null;
        for (var j = 0; j < enrolledCourses.length; j++) {
          let foundCourse = allCourses[i].course.id == enrolledCourses[j].id;
          if (foundCourse) {
            allCourses[i].course.enrolled_status = enrolledCourses[j].enrollments[0]?.enrollment_state;
            allCourses[i].course.enrolled = true;
          }
        }

        allCoursesWithStatus.push(allCourses[i].course);
      }

      //merge courses from enrolled that does not exist in the public all courses listing
      if (merge) {
        for (var j = 0; j < enrolledCourses.length; j++) {
          let enrolledCourseItem = enrolledCourses[j];
          let courseAlreadyExists = false;

          for (var i = 0; i < allCoursesWithStatus.length; i++) {
            let allCoursesWithStatusItem = allCoursesWithStatus[i];
            if (enrolledCourseItem.id == allCoursesWithStatusItem.id) {
              courseAlreadyExists = true;
            }
          }

          if (!courseAlreadyExists) {
            enrolledCourseItem.enrolled = true;
            enrolledCourseItem.enrolled_status = enrolledCourseItem.enrollments[0]?.enrollment_state;
            allCoursesWithStatus.unshift(enrolledCourseItem);
          }
        }
      }

      return allCoursesWithStatus;
    },
    filterOnlyEnrolledCourses: function(courses) {
      let enrolledCourses = [];
      for (var j = 0; j < courses.length; j++) {
        let courseItem = courses[j];
        let isEnrolled = courseItem.enrolled == true;

        if (isEnrolled) {
          enrolledCourses.push(courseItem);
        }
      }

      return enrolledCourses;
    },
    withEnrolledCourses: function(setCourseEnrolledStatus, frontpageData, callback, merge = false) {
      let isAuthenticated = util.isAuthenticated();
      if (!isAuthenticated) {
        frontpageData.courses = setCourseEnrolledStatus(frontpageData.courses, [], merge);
        callback(frontpageData);
      } else {
        api.getEnrolledCourses(function (enrolledCourses) {
          frontpageData.courses = setCourseEnrolledStatus(frontpageData.courses, enrolledCourses, merge);
          callback(frontpageData);
        });
      }
    },
    fetchFrontpageCourses: function() {
      return new Promise(async (resolve, reject) => {
        kpasApi.getCoursesForFrontpage(function (result, error) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    },
    printAllCourses: async function () {
      let withEnrolledCourses = this.withEnrolledCourses;
      let setCourseEnrolledStatus = this.setCourseEnrolledStatus;

      document.getElementById('content').innerHTML = "";
      let loader = document.createElement('div');
      loader.id = 'loader';
      let header = document.getElementById("header");
      let loaderComponent = createApp(LoadingIndicator);
      header.insertAdjacentElement('afterend', loader);
      loaderComponent.mount("#loader");

      util.fetchWithSwr("frontpage_courses", this.fetchFrontpageCourses, function(frontpageData) {
        if (frontpageData && frontpageData.result) {
          withEnrolledCourses(setCourseEnrolledStatus, frontpageData.result, function(dataWithEnrolled) {
            let courses = dataWithEnrolled.courses;
            let settings = dataWithEnrolled.settings;
            let filters = dataWithEnrolled.filters;
            let highlightedCourseId =  dataWithEnrolled.highligthed != null ? dataWithEnrolled.highligthed.course_id : null;
  
            var allCoursesWithSettings = util.mapCourseSettings(courses, settings);
            allCoursesWithSettings = allCoursesWithSettings.reverse(); //Reverse list to show newest courses first
            var isAuthenticated = util.isAuthenticated();
            let wrapper = document.getElementById("content");
  
            if(wrapper != null){
              if (isAuthenticated) {
                try {
                    document.getElementById('content').innerHTML = "";
                    const customContent = document.createElement("div");
                    var mobiletablet = util.isMobileOrTablet();
                    let props = {
                      courses : allCoursesWithSettings,
                      filterData : filters,
                      mobiletablet : mobiletablet
                    };
                    let page = createApp(LoggedInLandingPage, props);
                    customContent.setAttribute("id", "loggedInLandingPage");
                    customContent.setAttribute("style", "width: 100%; justify-content: center; display: flex;");
                    let footerNode = document.getElementById("wrapper");
                    footerNode.parentNode.insertBefore(customContent, footerNode)
                    document.getElementById('wrapper').innerHTML = '';
                    $('#wrapper').remove();
                    document.getElementById('loader').remove();
                    page.mount("#loggedInLandingPage");
                } catch (e) {
                  console.log(e);
                }
              } else {
                try {
                    const customContent = document.createElement("div");
                    var highlightedCourse = allCoursesWithSettings.find(course => course.id == highlightedCourseId);
                    if(highlightedCourse == null || highlightedCourse == undefined) {
                      highlightedCourse = allCoursesWithSettings[0];
                    }
                    var mobiletablet = util.isMobileOrTablet();
                    let props = {
                      courses : allCoursesWithSettings,
                      filterData : filters,
                      highlightedCourse : highlightedCourse,
                      mobiletablet : mobiletablet
                    };
                    let page = createApp(NotLoggedInPage, props);
                    customContent.setAttribute("id", "notLoggedInPage");
                    customContent.setAttribute("style", "width: 100%; justify-content: center; display: flex;");
                    let footerNode = document.getElementById("wrapper");
                    footerNode.parentNode.insertBefore(customContent, footerNode)
                    document.getElementById('wrapper').innerHTML = '';
                    $('#wrapper').remove();
                    document.getElementById('loader').remove();
                    page.mount("#notLoggedInPage");
                } catch (e) {
                  console.log(e);
                }
              }
            }
          });
        }
      });
    },
  };
})();
