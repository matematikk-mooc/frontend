import EnrollToCourse from "../../vue/components/enroll/EnrollToCourse.vue";
import LoadingIndicator from "../../vue/components/loading-indicator/LoadingIndicator.vue";
import LoggedInLandingPage from "../../vue/pages/LoggedInLandingPage.vue";
import NotLoggedInPage from "../../vue/pages/NotLoggedInPage.vue";
import api from "../api/api";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import { hrefQueryString } from "../settingsRoot";
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
          var _href = $this.attr("href") + hrefQueryString;
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
    setCourseEnrolledStatus: function (allCourses, enrolledCourses) {
      var allCoursesWithStatus = [];
      for (var i = 0; i < allCourses.length; i++) {
        allCourses[i].course.enrolled = false;
        for (var j = 0; j < enrolledCourses.length; j++) {
          if (allCourses[i].course.id == enrolledCourses[j].id) {
            allCourses[i].course.enrolled = true;
          }
        }
        allCoursesWithStatus.push(allCourses[i].course);
      }
      return allCoursesWithStatus;
    },
    printAllCourses: function () {
      var self = this;
      document.getElementById('content').innerHTML = "";
      let loader = document.createElement('div');
      loader.id = 'loader';
      let header = document.getElementById("header");
      let loaderComponent = createApp(LoadingIndicator);
      header.insertAdjacentElement('afterend', loader);
      loaderComponent.mount("#loader");

      api.getAllPublicCourses(function (allCourses) {
        api.getEnrolledCourses(function (enrolledCourses) {
          var allCoursesWithStatus = self.setCourseEnrolledStatus(
            allCourses,
            enrolledCourses
          );

          kpasApi.getAllCourseSettings(function (allCoursesSettings) {
            kpasApi.getAllFilters(function (allFilters) {
              var allFiltersList = allFilters.result;
              var allCoursesWithSettings = util.mapCourseSettings(allCoursesWithStatus, allCoursesSettings.result);
              //Reverse list to show newest courses first
              allCoursesWithSettings = allCoursesWithSettings.reverse();
              var isAuthenticated = util.isAuthenticated();
              if (isAuthenticated) {
                document.getElementById('content').innerHTML = "";
                let wrapper = document.getElementById("content");
                try {
                  if(wrapper != null){
                      const customContent = document.createElement("div");
                      var mobiletablet = util.isMobileOrTablet();
                      let props = {
                        courses : allCoursesWithSettings,
                        filterData : allFiltersList,
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
                  }
                } catch (e) {
                  console.log(e);
                }
              }
              else {
                try {
                  if(wrapper != null){
                    kpasApi.getHighlightedCourse(function (highlightedCourse) {
                      var highlightedCourseId = highlightedCourse.result.course_id;
                      var allFiltersList = allFilters.result;
                      var allCoursesWithSettings = util.mapCourseSettings(allCoursesWithStatus, allCoursesSettings.result);

                      const customContent = document.createElement("div");
                      var highlightedCourse = allCoursesWithSettings.find(course => course.id == highlightedCourseId);
                      if(highlightedCourse == null || highlightedCourse == undefined) {
                        highlightedCourse = allCoursesWithSettings[0];
                      }
                      var mobiletablet = util.isMobileOrTablet();
                      let props = {
                        courses : allCoursesWithSettings,
                        filterData : allFiltersList,
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
                    });
                  }
                } catch (e) {
                  console.log(e);
                }
              }
            });
          });
        });
      });
    },
  };
})();
