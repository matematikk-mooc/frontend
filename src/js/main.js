import "../vue/design/override-base-Canvas-elements.scss";

import accordion from './modules/accordion.js';
import announcements from './modules/announcements.js';
import api from './api/api.js';
import coursePageButtons from './modules/coursePageButtons.js';
import courselist from './modules/courselist.js';
import coursepage from './modules/coursepage.js';
import coursepagebanner from "./modules/coursepagebanner";
import coursesettings from './modules/coursesettings.js';
import dataporten from './modules/dataporten';
import discussionTopics from './modules/discussion-topics.js';
import enroll from './modules/enroll.js';
import footer from './modules/footer.js'
import greeting from './modules/greeting.js';
import groups from'./modules/groups.js'
import i18n from './i18n.js';
import infoboxes from './modules/infoboxes.js'
import kpas from './3party/kpas.js';
import login from './modules/login.js';
import menu from './modules/menu.js';
import messagehandler from './3party/messagehandler.js';
import multilanguage from '../vue/utils/previous-lang-utils.js'
import nextPrevButtons from "./modules/next-prev-buttons";
import nrk from './3party/nrk.js';
import pages from './modules/pages.js';
import { removeCanvasAnnouncementElements } from "./modules/announcements/utils";
// import privacyPolicy from './3party/privacypolicy.js';
import { renderCourseModules } from "../vue/pages/course-page/left-menu"
import { renderCourseModulesOnAnnouncementsPage } from "../vue/pages/announcements-page";
import reveal from './modules/reveal';
import routes from './modules/routes.js';
import settings from './settings.js';
import tabs from './modules/tabs.js';
import tinyMCEEditor from './modules/tinyMCEEditor';
import uob from './3party/uob7.js';
import util from './modules/util.js';
import utilRoot from './utilRoot.js';

jQuery(function($) {

  if(window.self != window.top) {
    return;
  }
  console.log(ENV);

  multilanguage.initializeCss();

  routes.addRouteForPath(/\/$/, function() {
    var parentId = 'wrapper';

    if (document.location.search === '?mmpf') {
      mmooc.powerFunctions.show(parentId);
    } else {
      window.location.href = '/courses?design=udir';
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
    menu.hideRightMenu();
    courselist.listCourses(
      'content',
      courselist.showAddCourseButton
    );
  });

  routes.addRouteForPath(/\/courses\/\d+/, function() {
    coursepagebanner.insertCourseBanner();
    let forwardTo = encodeURIComponent(window.location.href);
    let closeOption = false;
    let authenticated = util.isAuthenticated();

    if(!authenticated) {
      let registerText = "For å få fullt utbytte av denne siden må du melde deg på med";
      enroll.displayRegisterPopup(
        authenticated,
        closeOption,
        registerText,
        i18n.RegisterWithCanvas,
        util.course.self_enrollment_code,
        util.course.name,
        forwardTo);
    } else {
      api.getUsersEnrollmentsForCourse(util.course.id, function(courses) {
        if(!courses.length) {
          let registerText = "For å få fullt utbytte av denne siden må du melde deg på";
          let registerWithCanvasText = "Meld deg på";
          enroll.displayRegisterPopup(
            authenticated,
            closeOption,
            registerText,
            registerWithCanvasText,
            util.course.self_enrollment_code,
            util.course.name,
            forwardTo);
        } else {
          util.updateInformationPane();
        }
      });
    }
  });

  //The logic below should be refactored and cleaned up.
  routes.addRouteForPath(/\/courses\/\d+$/, function () {
    coursepage.hideElementsFromUsers();
    coursepagebanner.insertCourseBanner();
    nextPrevButtons.getFrontpageNextPage();
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
    // override default view and display all courses list instead
    var courseView = util.isCourseFrontpageForAllCoursesList();
    if (courseView == util.courseListEnum.allCoursesList) {
      menu.hideRightMenu();
      enroll.printAllCoursesContainer();
      enroll.printAllCourses();
      $('body').removeClass('home');

      // skips the rest of this function
      return null;
    }
    else if (courseView == util.courseListEnum.myCoursesList) {
        menu.hideRightMenu();
        courselist.listCourses(
          'content',
          courselist.showAddCourseButton
        );
        return null;
    }
    else if (courseView == util.courseListEnum.dataportenCallback) {
        if(window.opener) {
            $("#application").html('Du er nå logget inn i dataporten.<button id="dataportenLoggedIn">OK</button>');
            window.opener.popupCompleted();
            $(document).on("click","#dataportenLoggedIn",function(e) {
                window.close();
            });
        }
		return null;
    }
    else if (courseView == util.courseListEnum.uidpCallback) {
        if(window.opener) {
            $("#application").html('Du er nå logget inn i UIDP.<button id="uidpLoggedIn">OK</button>');
            window.opener.popupCompleted();
            $(document).on("click","#uidpLoggedIn",function(e) {
                window.close();
            });
        }
        console.log(document.location.href);
		return null;
    }
    //        coursepage.hideCourseInvitationsForAllUsers();

    var courseId = api.getCurrentCourseId();
    var queryString = document.location.search;
    if (queryString === '?allcanvabadges') {
      //query string = ?allcanvabadges
      var courseId = api.getCurrentCourseId();
      menu.showCourseMenu(courseId, 'Utmerkelser', 'Utmerkelser');
      //Should be refactored to use json api instead
      var canvabadgesForCurrentCourse =
        '<iframe title="canvasbadge" allowfullscreen="true" height="680" id="tool_content" mozallowfullscreen="true" name="tool_content" src="' +
        settings.CanvaBadgeProtocolAndHost +
        '/badges/course/' +
        courseId +
        '" tabindex="0" webkitallowfullscreen="true" width="100%"></iframe>';
      $('#content').append(canvabadgesForCurrentCourse);
    } else {
        var queryString = document.location.search;
        if ((queryString === '?dataportengroups=1') && settings.useDataportenGroups) {
            menu.showCourseMenu(
              courseId,
              'Grupper',
              util.getPageTitleBeforeColon()
            );
            dataporten.display();
        }
    }
    announcements.printAnnouncementsUnreadCount();
    if(coursepage.replaceUpcomingInSidebar()) {
      coursepage.printDeadlinesForCourse();
    }
   });

  routes.addRouteForPath(/\/search\/all_courses$/, function() {
    enroll.printAllCoursesContainer();
    enroll.printAllCourses();
    enroll.goToAllCourses();
  });

  routes.addRouteForPath(/\/courses\/\d+\/settings$/, function() {
    coursesettings.addSanityCheckButton();
    coursesettings.addListSectionsButton();
    coursesettings.addListUsersButton();
    coursesettings.addListGroupsButton();
    coursesettings.addListAssignmentsButton();
  });

  routes.addRouteForPath(/\/profile\/settings$/, function() {
    var elementId = document.getElementById('confirm_email_channel');
    if(!settings.displayProfileLeftMenu) {
      document.getElementById("section-tabs").style.display = "none";
    }
    var notificationButtonHTML = util.renderTemplateWithData(
      'notifications',
      {}
    );
    if(settings.displayUserMergeButton) {
      var mergeUserButtonHTML = util.renderTemplateWithData(
        'usermerge',
        {userId:api.getUser().id, userMergeLtiToolId:settings.userMergeLtiToolId}
      );
      elementId.insertAdjacentHTML('beforebegin', mergeUserButtonHTML);
    }

    elementId.insertAdjacentHTML('beforebegin', notificationButtonHTML);
  });

  routes.addRouteForPath(/\/courses\/\d+\/announcements$/, function() {
    var courseId = api.getCurrentCourseId();
    menu.showCourseMenu(
      courseId,
      'Kunngjøringer',
      util.getPageTitleBeforeColon()
    );
    api.getModulesForCurrentCourse(function(modules) {
      discussionTopics.printDiscussionUnreadCount(modules);
    });
    announcements.printAnnouncementsUnreadCount();
    announcements.setAnnouncementsListUnreadClass();
      renderCourseModulesOnAnnouncementsPage('left-side');
  });

  routes.addRouteForPath(
    /\/courses\/\d+\/discussion_topics$/,
    function() {
      var courseId = api.getCurrentCourseId();
      menu.showCourseMenu(
        courseId,
        'Diskusjoner',
        util.getPageTitleBeforeColon()
      );
      discussionTopics.setDiscussionsListUnreadClass();
      discussionTopics.insertSearchButton();
      discussionTopics.hideUnreadCountInDiscussionList();
      api.getModulesForCurrentCourse(function(modules) {
        discussionTopics.printDiscussionUnreadCount(
          modules,
          'discussionslist'
        );
      });
      announcements.printAnnouncementsUnreadCount();
    }
  );
  routes.addRouteForPath(/\/courses\/\d+\/external_tools/, function() {
    var courseId = api.getCurrentCourseId();
    menu.showCourseMenu(courseId, this.path, 'Verktøy');
  });

  routes.addRouteForPath(/\/courses\/\d+\/groups$/, function() {
    groups.interceptLinksToGroupPage();
    var courseId = api.getCurrentCourseId();
    menu.showCourseMenu(
      courseId,
      'Grupper',
      util.getPageTitleBeforeColon()
    );
    api.getModulesForCurrentCourse(function(modules) {
      discussionTopics.printDiscussionUnreadCount(modules);
    });
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
        discussionTopics.injectReplyButtonAction(userGroups);
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
      removeCanvasAnnouncementElements();
      renderCourseModulesOnAnnouncementsPage('left-side');


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
              } else {
                discussionTopics.moveSequenceLinks();
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
        discussionTopics.injectReplyButtonAction(userGroups);
      });
    }
  );

  routes.addRouteForPath([/\/groups\/\d+\/discussion_topics\/\d+/], function() {
    discussionTopics.moveSequenceLinks();
  });

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
      nextPrevButtons.getPrevAndNextItems();

      if (util.isTeacherOrAdmin()) {
        pages.addGotoModuleButton();
        pages.addStudentViewButton();
      }
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
    /\/courses\/\d+\/external_tools\/\d+$/,
    function() {
      function isBadgesafePage() {
        function extractPluginNumber(input) {
          return input.substring(input.lastIndexOf('/') + 1);
        }

        var badgesafeUrl = menu.extractBadgesLinkFromPage().url;

        if(badgesafeUrl) {
          return (
            extractPluginNumber(badgesafeUrl) ===
            extractPluginNumber(window.location.pathname)
          );
        }
        return false;
      }

      if (isBadgesafePage()) {
        var courseId = api.getCurrentCourseId();
        menu.showCourseMenu(courseId, 'Utmerkelser', 'Utmerkelser');
      }
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
    enroll.changeEnrollPage();
  });

  routes.addRouteForQueryString(/lang/, () => {
    const language = multilanguage.getLanguageParameter()
    console.log(`Language: ${language}`);
    if (multilanguage.isValidLanguage(language)) {
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
    menu.renderLeftHeaderMenu();
    menu.showUserMenu();
    menu.renderUnauthenticatedMenu();
    menu.setMenuActiveLink();
    menu.showHamburger();
    menu.showMobileMenu();
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
          util.course = course;
          //KURSP-376-multilanguage-fix
          if (course && util.isMultilangCourse(course)) {
            var langCode = multilanguage.getLanguageCode();
            multilanguage.setActiveLanguage(langCode);
          }
          routes.performHandlerForUrl(document.location);
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

  //Disabling privacy policy for now
  // privacyPolicy.init();

  try {
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
    menu.injectGroupsPage();
    groups.changeGroupListURLs(document.location.href);
     pages.removeItemsInStudentView();
    pages.updateSidebarWhenMarkedAsDone();
    pages.updateSidebarWhenContributedToDiscussion();
    menu.alterCourseLink();
  } catch (e) {
    console.log(e);
  }

  $("#application").show();
});
