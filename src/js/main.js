import "../vue/design/override-base-Canvas-elements.scss";
import "../vue/design/override-login-logout-Canvas-elements.scss";

import { removeCanvasAnnouncementElements, removeCanvasDiscussionElements } from "./modules/announcements/utils";

import accordion from './modules/accordion.js';
import announcements from './modules/announcements.js';
import api from './api/api.js';
import coursePageButtons from './modules/coursePageButtons.js';
import courselist from './modules/courselist.js';
import coursepage from './modules/coursepage.js';
import coursepagebanner from "./modules/coursepagebanner";
import coursesettings from './modules/coursesettings.js';
import enroll from './modules/enroll.js';
import footer from './modules/footer.js'
import greeting from './modules/greeting.js';
import groups from'./modules/groups.js'
import infoboxes from './modules/infoboxes.js'
import informationBanner from "./modules/informationBanner.js";
import kpas from './3party/kpas.js';
import kpasApi from "./api/kpas-api.js";
import login from './modules/login.js';
import menu from './modules/menu.js';
import messagehandler from './3party/messagehandler.js';
import multilanguage from '../vue/utils/previous-lang-utils.js'
import nrk from './3party/nrk.js';
import pages from './modules/pages.js';
import { renderCourseModules } from "../vue/pages/course-page/left-menu"
import { renderCourseModulesOnAnnouncementsPage } from "../vue/pages/announcements-page";
import reveal from './modules/reveal';
import routes from './modules/routes.js';
import settings from './settings.js';
import tabs from './modules/tabs.js';
import tinyMCEEditor from './modules/tinyMCEEditor';
import tooltip from "./modules/tooltip";
import uob from './3party/uob7.js';
import util from './modules/util.js';
import utilRoot from './utilRoot.js';
import uucheck from './modules/uucheck.js';

jQuery(function($) {

  if(window.self != window.top) {
    return;
  }

  multilanguage.initializeCss();

  routes.addRouteForPath(/\/$/, function() {
    var parentId = 'wrapper';

    if (document.location.search === '?mmpf') {
      mmooc.powerFunctions.show(parentId);
    } else {
      window.location.href = '/courses?design=udir';
    }
  });

  routes.addRouteForPath(/\/logout$/, function() {
    document.getElementById('wrapper').classList.add('canvas-login-page');
    let loginLogo = document.getElementsByClassName('ic-Login-header__logo');
    if (loginLogo) {
      let logo = loginLogo[0].children[0]
      logo.src  = SERVER + 'logo-white.png';
      logo.setAttribute("style", "height: 4rem;");
    }
  });

  routes.addRouteForQueryString(/invitation=/, function() {});

  routes.addRouteForPath(/\/login\/canvas$/, function() {
    utilRoot.redirectFeideAuthIfEnrollReferrer();
    utilRoot.triggerForgotPasswordIfParamPassed();
    login.addInfoMessage();
    let loginLogo = document.getElementsByClassName('ic-Login-header__logo');
    if (loginLogo) {
      loginLogo[0].children[0].src = SERVER + 'logo-white.png';
    }
    document.getElementById('wrapper').classList.add('canvas-login-page');


  });


  ////KURSP-293-RCE-mister-farge-for-redigering
  routes.addRouteForPath(/\/edit$/, function() {
    multilanguage.applyColorCodingInEditor();
  });

  routes.addRouteForPath(/\/login$/, function() {
    $('#register_link').html('<i>Trenger du en konto?</i><b>Klikk her.</b>');
  });

  routes.addRouteForPath(/\/courses$/, function() {
    utilRoot.redirectToEnrollIfCodeParamPassed();
    courselist.listCourses(
      'content',
      courselist.showAddCourseButton
    );
  });

  routes.addRouteForPath(/\/courses\/\d+/, function() {
    document.body.classList.add('course-menu-expanded');
    document.getElementById('left-side').setAttribute('display', 'block !important');
    coursepagebanner.insertCourseBanner();
    let authenticated = util.isAuthenticated();
    informationBanner.updateInformationBanner();
    if(!authenticated) {
      enroll.displayRegisterPopup(authenticated, util.course.self_enrollment_code);
    } else {
      api.getUsersEnrollmentsForCourse(util.course.id, function(courses) {
        if(!courses.length) {
          enroll.displayRegisterPopup( authenticated, util.course.self_enrollment_code);
        }
      });
    }
  });

  //The logic below should be refactored and cleaned up.
  routes.addRouteForPath(/\/courses\/\d+$/, function () {
    coursepage.hideElementsFromUsers();
    coursepagebanner.insertCourseBanner();
    renderCourseModules("left-side");
    util.updateRightMenuButtons();
    util.removeRecentFeedback();
    groups.interceptLinksToGroupPage();
    coursepage.showCourseInvitation();
    pages.removeItemsInStudentView();
    if(!util.isTeacherOrAdmin()) {
      coursepage.saveUnenrollDialog();
      document.getElementById("right-side").remove();
    }

    var courseId = api.getCurrentCourseId();
    var queryString = document.location.search;
    announcements.printAnnouncementsUnreadCount();
    if(coursepage.replaceUpcomingInSidebar()) {
      coursepage.printDeadlinesForCourse();
    }
   });

  routes.addRouteForPath(/\/search\/all_courses$/, function() {
    enroll.printAllCourses();
  });

  routes.addRouteForPath(/\/courses\/\d+\/settings$/, function() {
    coursesettings.addSanityCheckButton();
    coursesettings.addListSectionsButton();
    coursesettings.addListUsersButton();
    coursesettings.addListGroupsButton();
    coursesettings.addListAssignmentsButton();
    uucheck.addUUButton();

  });

  routes.addRouteForPath(/\/profile\/settings$/, function() {
    document.getElementById("wrapper").classList.add("user-settings-wrapper");
    document.getElementById("main").classList.add("user-settings-main");
    document.getElementById("left-side").remove();
    var elementId = document.getElementById('confirm_email_channel');
    if(!settings.displayProfileLeftMenu) {
      document.getElementById("section-tabs").style.display = "none";
    }
  });

  routes.addRouteForPath(/\/theme_editor$/, function() {
    document.getElementById("main").classList.add("theme-editor");
  });

  routes.addRouteForPath(/\/courses\/\d+\/announcements$/, function() {
    announcements.printAnnouncementsUnreadCount();
    announcements.setAnnouncementsListUnreadClass();
    renderCourseModulesOnAnnouncementsPage('left-side');
  });

  routes.addRouteForPath(
    /\/courses\/\d+\/discussion_topics$/,
    function() {

      announcements.printAnnouncementsUnreadCount();
    }
  );
  routes.addRouteForPath(/\/courses\/\d+\/groups$/, function() {
    groups.interceptLinksToGroupPage();
    var courseId = api.getCurrentCourseId();
    menu.showCourseMenu(
      courseId,
      'Grupper',
      util.getPageTitleBeforeColon()
    );
    announcements.printAnnouncementsUnreadCount();
  });
  routes.addRouteForPath(/\/courses\/\d+\/users$/, function() {
    var courseId = api.getCurrentCourseId();
    menu.showCourseMenu(
      courseId,
      '',
      util.getPageTitleBeforeColon()
    );
  });

  routes.addRouteForPath(/\/groups\/\d+$/, function() {
    var courseId = api.getCurrentCourseId();
    menu.showCourseMenu(
      courseId,
      'Grupper',
      util.getPageTitleBeforeColon()
    );
  });

  //Path for showing all dicussions, i.e. the discussion tab on the course front page.
  routes.addRouteForPath(/\/groups\/\d+\/discussion_topics$/, function() {
    var courseId = api.getCurrentCourseId();

    if (util.isTeacherOrAdmin()) {
      groups.interceptLinksToTeacherGroupPage();
    }

    if (null == courseId) {
      var groupId = api.getCurrentGroupId();
      if (null != groupId) {
        api.getGroup(groupId, function(group) {
          var courseId = group.course_id;
          menu.showCourseMenu(
            courseId,
            'Grupper',
            util.getPageTitleAfterColon()
          );
          groups.showGroupHeader(group.id, courseId);
        });
      }
    } else {
      menu.showCourseMenu(
        courseId,
        'Grupper',
        util.getPageTitleAfterColon()
      );
      groups.showGroupHeader(groupId, courseId);
    }
  });

  routes.addRouteForPath(
    [
      /\/groups\/\d+\/discussion_topics\/\d+$/,
      /\/groups\/\d+\/discussion_topics\/new$/
    ],
    function() {
      menu.showDiscussionGroupMenu();
      const courseId = api.getCurrentCourseId();
      removeCanvasAnnouncementElements();
      renderCourseModulesOnAnnouncementsPage('left-side');


      if (!util.isTeacherOrAdmin()) {
        menu.hideRightMenu();
        menu.hideSectionTabsHeader();
      } else {
        groups.interceptLinksToTeacherGroupPage();
      }

      api.getUserGroupsForCourse(courseId, (userGroups) => {
        util.tinyMceEditorIsInDOM(
          () => tinyMCEEditor.injectGroupHashtags(userGroups)
        );
      });
    }
  );

  //Disse rutene gjelder når man går inn på en diskusjon fra diskusjonslisten eller når lærer har redigert en diskusjon.
  routes.addRouteForPath(
    [
      /\/courses\/\d+\/discussion_topics\/\d+/,
      /\/courses\/\d+\/discussion_topics\/new/
    ],
    function() {
      // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
      var title = util.getPageTitleAfterColon();
      //If this is a group discussion we do not allow the user to access it because
      //he is apparantly not a member of a group.
      var courseId = api.getCurrentCourseId();
      // removeCanvasAnnouncementElements();
      removeCanvasDiscussionElements();
      if(!location.search.includes('module_item_id=')) {
        renderCourseModules('left-side');
      }
      util.hasRoleInCourse(courseId, "TeacherEnrollment", function(isTeacher) {
        if(!isTeacher) {
          var courseId = api.getCurrentCourseId();
          var contentId = api.getCurrentTypeAndContentId().contentId;
          if (contentId){
            api.isGroupDiscussion(courseId, contentId, function(result) {
              if(result) {
                  $(".discussion-section").hide();
                  $("#discussion-toolbar").hide();
                  $(".discussion-entry-reply-area").hide();
                  $("#discussion-managebar").html('<div class="uob-warning"> \
                  Dette er en gruppediskusjon, men du er ikke medlem i noen gruppe og kan derfor ikke delta.\
                    Gå tilbake til forsiden og velg fanen "Rolle og grupper".</div>');
              }
            });
          }
        }
      });

      if (!util.isTeacherOrAdmin()) {
        menu.hideRightMenu();
        var contentId = api.getCurrentTypeAndContentId().contentId;
        api.getDiscussionTopic(
          courseId,
          contentId,
          discussionTopics.setDiscussionTopicPubDate
        );
      }


      api.getUserGroupsForCourse(courseId, (userGroups) => {
        util.tinyMceEditorIsInDOM(
          () => tinyMCEEditor.injectGroupHashtags(userGroups)
        );
      });
    }
  );

  routes.addRouteForPathOrQueryString(
    [
      /\/courses\/\d+\/assignments\/\d+/,
      /\/courses\/\d+\/pages\/.*$/,
      /\/courses\/\d+\/quizzes\/\d+/
    ],
    /module_item_id=/,
    function() {
      menu.showLeftMenu();
      menu.listModuleItems();
      pages.modifyMarkAsDoneButton();

      if (util.isTeacherOrAdmin()) {
        pages.addStudentViewButton();
      }
      setTimeout(function() {
        coursepage.resizeH5p();
      }, 500)
    }
  );

  // example route: /courses/54/assignments/369 - assignment which may be a peer review (hverandrevurdering)
  routes.addRouteForPath(/\/courses\/\d+\/assignments\/\d+/, function() {
    pages.redesignAssignmentPage();
    util.setGlobalPeerReviewButtonState();
  });

  // Assignment submission which might be your own or someone else's: Peer review (hverandrevurdering)
  routes.addRouteForPath(
    /\/courses\/\d+\/assignments\/\d+\/submissions\/\d+/,
    function() {
      pages.redesignPeerReviewAndOwnSubmissionDetailsPage();
    }
  );


  routes.addRouteForPath(
    /\/courses\/\d+\/modules\/items\/\d+$/,
    function() {
      //Canva Badges uses this route for instance
      menu.showLeftMenu();
      menu.listModuleItems();
    }
  );

  routes.addRouteForPath([/\/pages/], function() {
    util.callWhenElementIsPresent(
      '.sikt-diploma-button',
      greeting.enableGreetingButtonIfNecessary
    );
    util.callWhenElementIsPresent(
      ".new-sikt-diploma-button",
      greeting.enableNewGreetingButtonIfNecessary);

    util.callWhenElementIsPresent(
      ".download-diploma-button",
      greeting.enableDownloadDiplomaButtonIfNecessary); //This is the newest method which should replace the two old ones.

    var courseId = api.getCurrentCourseId();
    coursePageButtons.replaceMarkAsDone();

    if ($("#kpas-lti-info").length ||
        $(".kpas-lti-info").length ||
        $("#kommune-statistikk").length ||
        $("#fylke-statistikk").length) {
      const error = error => console.error('error calling api', error);
      api.getUserGroupsForCourse(courseId, function(groups) {
        var isTeacherOrAdmin = util.isTeacherOrAdmin();
        kpas.showInfo(groups);
        var groupsInfo = util.getGroupsInfo(groups);
        kpas.createDiagram("kommune-statistikk", isTeacherOrAdmin, courseId, groupsInfo);
        kpas.createDiagram("fylke-statistikk", isTeacherOrAdmin, courseId, groupsInfo);
      }, error);
    }
  });

  routes.addRouteForPath(/enroll\/[0-9A-Z]+/, function() {
    if(!util.isAuthenticated()){
      let loginLogo = document.getElementsByClassName('ic-Login-confirmation__logo')[0];
      loginLogo.src = SERVER + 'logo-black.svg';
      loginLogo.setAttribute("style", "height: 4rem !important; width: auto !important");
    }
    enroll.changeEnrollPage();
  });

  routes.addRouteForQueryString(/lang/, () => {
    const language = multilanguage.getLanguageParameter()
    if (language === 'se' || language === 'nn') {
      multilanguage.setActiveLanguage(language);
    } else {
      multilanguage.setActiveLanguage('nb');
    }
  });

  try {
    const urlParamsObj = utilRoot.urlParamsToObject();
    if(!util.onEnrollPage()) {
      let forwardTo = urlParamsObj && urlParamsObj['forwardTo'];
      if(forwardTo) {
        window.location.href = decodeURIComponent(forwardTo);
        return;
      }
    }
    footer.changeFooter();
    menu.renderUnauthenticatedMenu();
  } catch (e) {
    console.log(e);
  }

  //Try to get course information and store it such that routes can use it.
  //Otherwise just handle the route.
  try {
    var courseId = api.getCurrentCourseId();
    if(courseId) {
      api.getCourse(
        courseId,
        function(course) {
          kpasApi.getSettingsCurrentCourse(courseId, function (courseSettings) {
            course ={ ...course, kpas: { ...courseSettings}}
            util.course = course;
            //KURSP-376-multilanguage-fix
            if (course && util.isMultilangCourse(course)) {
              var langCode = multilanguage.getLanguageCode();
              multilanguage.setActiveLanguage(langCode);
            }
            routes.performHandlerForUrl(document.location);
        });
        },
        function(error) {
          console.error(
            'error calling api.getCourse(' + courseId + ')',
            error
          );
        }
      );
    } else {
      routes.performHandlerForUrl(document.location);
    }
  } catch (e) {
    console.log(e);
  }

  try {
    tooltip.init();
    messagehandler.init();
    uob.init();
    infoboxes.init();
    nrk.init();
    tabs.init();
    reveal.init();
    accordion.init();

  } catch (e) {
    console.log(e);
  }

  try {
    groups.changeGroupListURLs(document.location.href);
    pages.removeItemsInStudentView();
  } catch (e) {
    console.log(e);
  }

  $("#application").show();
});
