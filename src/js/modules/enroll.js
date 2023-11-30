import EnrollToCourse from "../../vue/components/enroll/EnrollToCourse.vue";
import LoggedInLandingPage from "../../vue/pages/LoggedInLandingPage.vue";
import NotLoggedInPage from "../../vue/pages/NotLoggedInPage.vue";
import allcoursescontainer from '../../templates/modules/allcoursescontainer.hbs'
import api from "../api/api";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import { hrefQueryString } from "../settingsRoot";
import i18n from "../i18n";
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
    printAllCoursesContainer: function () {
      if(util.isAuthenticated()) {
      var label = i18n.CoursePlural
      var html = util.renderTemplateWithData(allcoursescontainer, {
        courseLabel: label.toLowerCase(),
        allAvailableCoursesIngress: i18n.AllAvailableCoursesIngress,
        linkToMyCourses: utilRoot.getLinkToMyCourses(),
        isAuthenticated: util.isAuthenticated(),
        isMobileOrTablet: util.isMobileOrTablet()
      });
      document.title = 'Tilgjengelige ' + label.toLowerCase();
      document.getElementById('content').innerHTML = html;
    }
    },
    goToAllCourses() {
      $('#mmooc-all-courses-btn').click(function () {
        const linkToMyCourses = utilRoot.getLinkToMyCourses();
        window.location.href = linkToMyCourses;
      })
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
      var html = "<div class='loading-gif-wrapper'><span class='loading-gif'></span></div>";
      document.getElementById('content').innerHTML = html; //Show loader whhil loading courses'
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

            var isAuthenticated = util.isAuthenticated();
            if (isAuthenticated) {
              document.getElementById('content').innerHTML = "";
              let wrapper = document.getElementById("content");
              try {
                if(wrapper != null){
                    const customContent = document.createElement("div");
                    let props = {
                      courses : allCoursesWithSettings,
                      filterData : allFiltersList,
                    };
                    let page = createApp(LoggedInLandingPage, props);
                    customContent.setAttribute("id", "loggedInLandingPage");
                    customContent.setAttribute("style", "width: 100%; justify-content: center; display: flex;");
                    let footerNode = document.getElementById("wrapper");
                    footerNode.parentNode.insertBefore(customContent, footerNode)
                    document.getElementById('wrapper').innerHTML = '';
                    $('#wrapper').remove();
                    page.mount("#loggedInLandingPage");
                }
              } catch (e) {
                console.log(e);
              }
            }
            else {
              try {
                if(wrapper != null){
                    var allFiltersList = allFilters.result;
                    var allCoursesWithSettings = util.mapCourseSettings(allCoursesWithStatus, allCoursesSettings.result);
                    const customContent = document.createElement("div");
                    let props = {
                      courses : allCoursesWithSettings,
                      filterData : allFiltersList,
                    };
                    let page = createApp(NotLoggedInPage, props);
                    customContent.setAttribute("id", "notLoggedInPage");
                    customContent.setAttribute("style", "width: 100%; justify-content: center; display: flex;");
                    let footerNode = document.getElementById("wrapper");
                    footerNode.parentNode.insertBefore(customContent, footerNode)
                    document.getElementById('wrapper').innerHTML = '';
                    $('#wrapper').remove();
                    page.mount("#notLoggedInPage");
                }
              } catch (e) {
                console.log(e);
              }
            }
          });
        });

          self.insertModalAndOverlay();
          self.setClickHandlers();

          // TODO: move if there is a better place for this code - it handles course list UI
          // accordion UI
          $('.mmooc-accordion-header').click(event => {
            let accordionIndex = event.target.getAttribute('index');

            if (
              $(`#mmooc-accordion-header-${accordionIndex}`).hasClass(
                'mmooc-accordion-header-active'
              )
            ) {
              $(`#mmooc-accordion-header-${accordionIndex}`).toggleClass(
                'mmooc-accordion-header-active'
              );
            } else {
              $('.mmooc-accordion-header-active').removeClass(
                'mmooc-accordion-header-active'
              );

              $(`#mmooc-accordion-header-${accordionIndex}`).addClass(
                'mmooc-accordion-header-active'
              );
            }

            // remove active tabs when new accordion element is clicked
            $('.mmooc-tab-head').removeClass('mmooc-tab-head-active');
            $('.mmooc-tab-content').removeClass('mmooc-tab-content-active');
            $('.mmooc-tabs-mobile-header-active').removeClass(
              'mmooc-tabs-mobile-header-active'
            );
            $('.mmooc-tabs-mobile-content-active').removeClass(
              'mmooc-tabs-mobile-content-active'
            );

            // add active class to first tab when the accordion element is opened
            $('.mmooc-tab-head-0').addClass('mmooc-tab-head-active');
            $('.mmooc-tab-content-0').addClass('mmooc-tab-content-active');
          });

          // tabs
          $('.mmooc-tab-head').click(event => {
            let tabIndex = event.target.getAttribute('index');

            $('.mmooc-tab-head').removeClass('mmooc-tab-head-active');
            $(`#mmooc-tab-head-${tabIndex}`).addClass('mmooc-tab-head-active');

            $('.mmooc-tab-content').removeClass('mmooc-tab-content-active');
            $(`#mmooc-tab-content-${tabIndex}`).addClass(
              'mmooc-tab-content-active'
            );
          });

          // tabs-mobile

          $('.mmooc-tabs-mobile-header').click(event => {
            let mobileTabIndex = event.target.getAttribute('index');

            if (
              $(`#mmooc-tabs-mobile-header-${mobileTabIndex}`).hasClass(
                'mmooc-tabs-mobile-header-active'
              )
            ) {
              $(`#mmooc-tabs-mobile-header-${mobileTabIndex}`).toggleClass(
                'mmooc-tabs-mobile-header-active'
              );
              $(`#mmooc-tabs-mobile-content-${mobileTabIndex}`).toggleClass(
                'mmooc-tabs-mobile-content-active'
              );
            } else {
              $('.mmooc-tabs-mobile-header-active').removeClass(
                'mmooc-tabs-mobile-header-active'
              );
              $('.mmooc-tabs-mobile-content-active').removeClass(
                'mmooc-tabs-mobile-content-active'
              );

              $(`#mmooc-tabs-mobile-header-${mobileTabIndex}`).addClass(
                'mmooc-tabs-mobile-header-active'
              );
              $(`#mmooc-tabs-mobile-content-${mobileTabIndex}`).addClass(
                'mmooc-tabs-mobile-content-active'
              );
            }
          });

          self.createHashTags();
          self.scrollToCourse();
        });
      });
    },

    createHashTags: function () {
      $('span').click(function (e) {
        if ($(this).filter("[data-name='course']")) {
          var hashTag = $(e.currentTarget).attr("class")
          window.location.hash = hashTag;
        }
      });

      $("button[data-title]").click(function (e) {
        var firstCourseId = $(this).siblings().find('span').eq(0).attr('class');
        var hashTag = firstCourseId;
        window.location.hash = hashTag;
      })
    },
    scrollToCourse: function () {
      var currentHash = window.location.hash.split('#');
      var courses = $('span').filter("[data-name='course']");

      courses.each(function (i, el) {
        var currentElementId = $(el).attr('class');
        if (currentHash[1] === currentElementId) {
          var categoryElement = $(el).closest('section').find('button').eq(0);
          categoryElement.trigger("click");

          var mobileViewport = window.matchMedia("(max-width: 650px)");

          if (mobileViewport.matches) {
            $([document.documentElement, document.body]).animate({
              scrollTop: $(el).find('button').offset().top - 200
            }, 500);
          } else {
            $([document.documentElement, document.body]).animate({
              scrollTop: $("." + currentElementId).offset().top - 200
            }, 500);
          }
          var courseTab = $(el).find('button');
          courseTab.trigger("click");
        }
      })
    },
    insertModalAndOverlay: function () {
      $('body').append("<div class='mmooc-modal-overlay'></div>");
      $('body').append("<div class='mmooc-modal'></div>");
    },
    handleEnrollClick: function (e, html) {
      $('.mmooc-modal').html(html);
      $('.mmooc-modal-overlay').show();
      $('.mmooc-modal').show();
      $('.mmooc-modal .modal-back').click(function (e) {
        e.preventDefault();
        $('.mmooc-modal-overlay').hide();
        $('.mmooc-modal').hide();
      });
    },
    setClickHandlers: function () {
      let self = this
      $('.notenrolled').click(function (e) {
        e.preventDefault();
        var html = $(this)
          .next()
          .html();
        self.handleEnrollClick(e, html);
      });
      $('.all-courses-show-modal').click(function (e) {
        e.preventDefault();
        var html = $(this)
          .parent()
          .next()
          .html();
        self.handleEnrollClick(e, html);
      });
      $('.mmooc-modal-overlay').click(function (e) {
        e.preventDefault();
        $('.mmooc-modal-overlay').hide();
        $('.mmooc-modal').hide();
      });
      $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
          $('.mmooc-modal-overlay').hide();
          $('.mmooc-modal').hide();
        }
      });
    }
  };
})();
