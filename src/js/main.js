jQuery(function($) {
  //Multilanguage KURSP-279 Css must be present before javascript is run.
  mmooc.multilanguage.insertCss();

  mmooc.routes.addRouteForPath(/\/$/, function() {
    var parentId = 'wrapper';

    if (document.location.search === '?mmpf') {
      mmooc.powerFunctions.show(parentId);
    } else {
      window.location.href = '/courses?design=udir';
    }
  });

  mmooc.routes.addRouteForQueryString(/invitation=/, function() {});

  mmooc.routes.addRouteForPath(/\/login\/canvas$/, function() {
    mmooc.utilRoot.redirectFeideAuthIfEnrollReferrer();
    mmooc.utilRoot.triggerForgotPasswordIfParamPassed();
  });

  mmooc.routes.addRouteForPath(/\/login$/, function() {
    $('#register_link').html('<i>Trenger du en konto?</i><b>Klikk her.</b>');
  });

  mmooc.routes.addRouteForPath(/\/courses$/, function() {
    mmooc.utilRoot.redirectToEnrollIfCodeParamPassed();
    mmooc.menu.hideRightMenu();
    mmooc.courseList.listCourses(
      'content',
      mmooc.courseList.showAddCourseButton
    );
  });

  mmooc.routes.addRouteForPath(/\/courses\/\d+/, function() {
    mmooc.util.updateInformationPane();
  });

  //The logic below should be refactored and cleaned up.
  mmooc.routes.addRouteForPath(/\/courses\/\d+$/, function() {
    mmooc.groups.interceptLinksToGroupPage();
    mmooc.coursePage.showCourseInvitation();
    // override default view and display all courses list instead
    var courseView = mmooc.util.isCourseFrontpageForAllCoursesList();
    if (courseView == mmooc.util.courseListEnum.allCoursesList) {
      mmooc.menu.hideRightMenu();
      mmooc.enroll.printAllCoursesContainer();
      mmooc.enroll.printAllCourses();
      $('body').removeClass('home');

      // skips the rest of this function
      return null;
    }
    else if (courseView == mmooc.util.courseListEnum.myCoursesList) {
        mmooc.menu.hideRightMenu();
        mmooc.courseList.listCourses(
          'content',
          mmooc.courseList.showAddCourseButton
        );
        return null;
    }
    else if (courseView == mmooc.util.courseListEnum.dataportenCallback) {
        if(window.opener) {
            $("#application").html('Du er nå logget inn i dataporten.<button id="dataportenLoggedIn">OK</button>');
            window.opener.popupCompleted();
            $(document).on("click","#dataportenLoggedIn",function(e) {
                window.close();
            });
        }
        console.log(document.location.href);
		return null;
    }
    else if (courseView == mmooc.util.courseListEnum.uidpCallback) {
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
    //        mmooc.coursePage.hideCourseInvitationsForAllUsers();

    var courseId = mmooc.api.getCurrentCourseId();
    var queryString = document.location.search;
    if (queryString === '?allcanvabadges') {
      //query string = ?allcanvabadges
      var courseId = mmooc.api.getCurrentCourseId();
      mmooc.menu.showCourseMenu(courseId, 'Utmerkelser', 'Utmerkelser');
      //Should be refactored to use json api instead
      var canvabadgesForCurrentCourse =
        '<iframe allowfullscreen="true" height="680" id="tool_content" mozallowfullscreen="true" name="tool_content" src="' +
        mmooc.settings.CanvaBadgeProtocolAndHost +
        '/badges/course/' +
        courseId +
        '" tabindex="0" webkitallowfullscreen="true" width="100%"></iframe>';
      $('#content').append(canvabadgesForCurrentCourse);
    } else {
        var queryString = document.location.search;
        if ((queryString === '?dataportengroups=1') && mmooc.settings.useDataportenGroups) {
            mmooc.menu.showCourseMenu(
              courseId,
              'Grupper',
              mmooc.util.getPageTitleBeforeColon()
            );
            mmooc.dataporten.display();
        } else {
          mmooc.menu.showCourseMenu(courseId, 'Forside', null);


          //20180822ETH If the user has chosen to use a wikipage as front page and the logged in user is teacher, we display that page.
          //            Otherwise we list the modules.
          if (mmooc.api.usesFrontPage()) {
            if (!mmooc.util.isTeacherOrAdmin()) {
              var frontPage = $('#wiki_page_show');
              if (frontPage.length) {
                frontPage.hide();
              }
              mmooc.coursePage.listModulesAndShowProgressBar();
            }
          } //Hvis det ikke er wiki som forside så lister vi ut modulene på vanlig måte.
          else {
            mmooc.coursePage.listModulesAndShowProgressBar();
          }
        }
    }
    mmooc.announcements.printAnnouncementsUnreadCount();
    if(mmooc.coursePage.replaceUpcomingInSidebar()) {
      mmooc.coursePage.printDeadlinesForCourse();
    }
    mmooc.coursePage.overrideUnregisterDialog();
  });

  mmooc.routes.addRouteForPath(/\/search\/all_courses$/, function() {
    mmooc.enroll.printAllCoursesContainer();
    mmooc.enroll.printAllCourses();
    mmooc.enroll.goToAllCourses();
  });

  mmooc.routes.addRouteForPath(/\/courses\/\d+\/settings$/, function() {
    mmooc.coursesettings.addSanityCheckButton();
    mmooc.coursesettings.addListSectionsButton();
    mmooc.coursesettings.addListUsersButton();
    mmooc.coursesettings.addListGroupsButton();
    mmooc.coursesettings.addListAssignmentsButton();
  });

  mmooc.routes.addRouteForPath(/\/profile\/settings$/, function() {
    var notificationButtonHTML = mmooc.util.renderTemplateWithData(
      'notifications',
      {}
    );
    mmooc.menu.showLeftMenu();
    document
      .getElementById('confirm_email_channel')
      .insertAdjacentHTML('beforebegin', notificationButtonHTML);
  });

  mmooc.routes.addRouteForPath(/\/courses\/\d+\/announcements$/, function() {
    var courseId = mmooc.api.getCurrentCourseId();
    mmooc.menu.showCourseMenu(
      courseId,
      'Kunngjøringer',
      mmooc.util.getPageTitleBeforeColon()
    );
    mmooc.api.getModulesForCurrentCourse(function(modules) {
      mmooc.discussionTopics.printDiscussionUnreadCount(modules);
    });
    mmooc.announcements.printAnnouncementsUnreadCount();
    mmooc.announcements.setAnnouncementsListUnreadClass();
  });

  mmooc.routes.addRouteForPath(
    /\/courses\/\d+\/discussion_topics$/,
    function() {
      var courseId = mmooc.api.getCurrentCourseId();
      mmooc.menu.showCourseMenu(
        courseId,
        'Diskusjoner',
        mmooc.util.getPageTitleBeforeColon()
      );
      mmooc.discussionTopics.setDiscussionsListUnreadClass();
      mmooc.discussionTopics.insertSearchButton();
      mmooc.discussionTopics.hideUnreadCountInDiscussionList();
      mmooc.api.getModulesForCurrentCourse(function(modules) {
        mmooc.discussionTopics.printDiscussionUnreadCount(
          modules,
          'discussionslist'
        );
      });
      mmooc.announcements.printAnnouncementsUnreadCount();
    }
  );
  mmooc.routes.addRouteForPath(/\/courses\/\d+\/external_tools/, function() {
    var courseId = mmooc.api.getCurrentCourseId();
    mmooc.menu.showCourseMenu(courseId, this.path, 'Verktøy');
  });

  mmooc.routes.addRouteForPath(/\/courses\/\d+\/groups$/, function() {
    mmooc.groups.interceptLinksToGroupPage();
    var courseId = mmooc.api.getCurrentCourseId();
    mmooc.menu.showCourseMenu(
      courseId,
      'Grupper',
      mmooc.util.getPageTitleBeforeColon()
    );
    mmooc.api.getModulesForCurrentCourse(function(modules) {
      mmooc.discussionTopics.printDiscussionUnreadCount(modules);
    });
    mmooc.announcements.printAnnouncementsUnreadCount();
  });
  mmooc.routes.addRouteForPath(/\/courses\/\d+\/users$/, function() {
    var courseId = mmooc.api.getCurrentCourseId();
    mmooc.menu.showCourseMenu(
      courseId,
      '',
      mmooc.util.getPageTitleBeforeColon()
    );
  });

  mmooc.routes.addRouteForPath(/\/groups\/\d+$/, function() {
    var courseId = mmooc.api.getCurrentCourseId();
    mmooc.menu.showCourseMenu(
      courseId,
      'Grupper',
      mmooc.util.getPageTitleBeforeColon()
    );
  });

  //Path for showing all dicussions, i.e. the discussion tab on the course front page.
  mmooc.routes.addRouteForPath(/\/groups\/\d+\/discussion_topics$/, function() {
    var courseId = mmooc.api.getCurrentCourseId();

    if (mmooc.util.isTeacherOrAdmin()) {
      mmooc.groups.interceptLinksToTeacherGroupPage();
    }

    if (null == courseId) {
      var groupId = mmooc.api.getCurrentGroupId();
      if (null != groupId) {
        mmooc.api.getGroup(groupId, function(group) {
          var courseId = group.course_id;
          mmooc.menu.showCourseMenu(
            courseId,
            'Grupper',
            mmooc.util.getPageTitleAfterColon()
          );
          mmooc.groups.showGroupHeader(group.id, courseId);
        });
      }
    } else {
      mmooc.menu.showCourseMenu(
        courseId,
        'Grupper',
        mmooc.util.getPageTitleAfterColon()
      );
      mmooc.groups.showGroupHeader(groupId, courseId);
    }
  });

  //Path for showing a group discussion or creating a new discussion
  //20180821ETH Some functionality moved to new path below and to module_item_id path below
  /*
    mmooc.routes.addRouteForPath([/\/groups\/\d+\/discussion_topics\/\d+$/, /\/groups\/\d+\/discussion_topics\/new$/], function() {
        mmooc.menu.showLeftMenu();
        mmooc.menu.listModuleItems();
        mmooc.menu.showDiscussionGroupMenu();

        if (!mmooc.util.isTeacherOrAdmin()) {
        	mmooc.menu.hideSectionTabsHeader();
        }
    });

    mmooc.routes.addRouteForPath([/\/groups\/\d+\/discussion_topics\/\d+$/], function() {
        mmooc.groups.moveSequenceLinks();
        if (!mmooc.util.isTeacherOrAdmin()) {
            mmooc.menu.hideRightMenu();
        }
    });
*/
  mmooc.routes.addRouteForPath(
    [
      /\/groups\/\d+\/discussion_topics\/\d+$/,
      /\/groups\/\d+\/discussion_topics\/new$/
    ],
    function() {
      mmooc.menu.showDiscussionGroupMenu();
      const courseId = mmooc.api.getCurrentCourseId();

      //20180911ETH Need to know if I got here from the discussion list or from the module
      //            navigation.
      if (!this.hasQueryString) {
        //If courseId was found, it is a group discussion created by a teacher.
        if (courseId) {
          mmooc.menu.showBackButton(
            '/courses/' + courseId + '/discussion_topics',
            'Tilbake til diskusjoner'
          );
        } else {
          var groupId = mmooc.api.getCurrentGroupId();
          if (null != groupId) {
            mmooc.api.getGroup(groupId, function(group) {
              var courseId = group.course_id;
              mmooc.menu.showBackButton(
                '/groups/' + group.id + '/discussion_topics',
                'Tilbake til gruppeside'
              );
            });
          }
        }
      }

      if (!mmooc.util.isTeacherOrAdmin()) {
        mmooc.menu.hideRightMenu();
        mmooc.menu.hideSectionTabsHeader();
      } else {
        mmooc.groups.interceptLinksToTeacherGroupPage();
      }

      mmooc.api.getUserGroupsForCourse(courseId, (userGroups) => {
        mmooc.util.tinyMceEditorIsInDOM(
          () => mmooc.tinyMCEEditor.injectGroupHashtags(userGroups)
        );
        mmooc.discussionTopics.injectReplyButtonAction(userGroups);
      });
    }
  );

  //Disse rutene gjelder når man går inn på en diskusjon fra diskusjonslisten eller når lærer har redigert en diskusjon.
  mmooc.routes.addRouteForPath(
    [
      /\/courses\/\d+\/discussion_topics\/\d+/,
      /\/courses\/\d+\/discussion_topics\/new/
    ],
    function() {
      // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
      var title = mmooc.util.getPageTitleAfterColon();
      //If this is a group discussion we do not allow the user to access it because
      //he is apparantly not a member of a group.
      var courseId = mmooc.api.getCurrentCourseId();

      mmooc.util.hasRoleInCourse(courseId, "TeacherEnrollment", function(isTeacher) {
        if(!isTeacher) {
          var courseId = mmooc.api.getCurrentCourseId();
          var contentId = mmooc.api.getCurrentTypeAndContentId().contentId;
          if (contentId){
          mmooc.api.isGroupDiscussion(courseId, contentId, function(result) {
            if(result) {
                $(".discussion-section").hide();
                $("#discussion-toolbar").hide();
                $(".discussion-entry-reply-area").hide();
                $("#discussion-managebar").html('<div class="uob-warning"> \
                Dette er en gruppediskusjon, men du er ikke medlem i noen gruppe og kan derfor ikke delta.\
                  Gå tilbake til forsiden og velg fanen "Rolle og grupper".</div>');
            }
          });}
        }
      });

      if (!mmooc.util.isTeacherOrAdmin()) {
        mmooc.menu.hideRightMenu();
        var contentId = mmooc.api.getCurrentTypeAndContentId().contentId;
        mmooc.api.getDiscussionTopic(
          courseId,
          contentId,
          mmooc.discussionTopics.setDiscussionTopicPubDate
        );
      }

      // Announcements are some as type of discussions, must use a hack to determine if this is an announcement
      if (mmooc.api.currentPageIsAnnouncement()) {
        mmooc.menu.showCourseMenu(courseId, 'Kunngjøringer', title);
        mmooc.menu.showBackButton(
          '/courses/' + courseId + '/announcements',
          'Tilbake til kunngjøringer'
        );
        mmooc.announcements.addMarkAsReadButton();
      } else if (mmooc.api.getCurrentModuleItemId() == null) {
        // Only show course menu if this discussion is not a module item
        // Note detection if this is a module item is based on precense of query parameter
        //            mmooc.menu.showCourseMenu(courseId, 'Diskusjoner', title);
        mmooc.menu.showBackButton(
          '/courses/' + courseId + '/discussion_topics',
          'Tilbake til diskusjoner'
        );
      }

      mmooc.api.getUserGroupsForCourse(courseId, (userGroups) => {
        mmooc.util.tinyMceEditorIsInDOM(
          () => mmooc.tinyMCEEditor.injectGroupHashtags(userGroups)
        );
        mmooc.discussionTopics.injectReplyButtonAction(userGroups);
      });
    }
  );

  mmooc.routes.addRouteForPathOrQueryString(
    [
      /\/courses\/\d+\/assignments\/\d+/,
      /\/courses\/\d+\/pages\/.*$/,
      /\/courses\/\d+\/quizzes\/\d+/
    ],
    /module_item_id=/,
    function() {
      mmooc.menu.showLeftMenu();
      mmooc.menu.listModuleItems();
      mmooc.pages.modifyMarkAsDoneButton();
      mmooc.pages.duplicateMarkedAsDoneButton();
      //20180911ETH showDiscussionGroupMenu is handled by group discussion path above.
      //        mmooc.menu.showDiscussionGroupMenu();
      mmooc.groups.moveSequenceLinks();

      // mmooc.pages.changeTranslations();

      if (mmooc.util.isTeacherOrAdmin()) {
        mmooc.pages.addGotoModuleButton();
        mmooc.pages.addStudentViewButton();
      }
    }
  );

  // example route: /courses/54/assignments/369 - assignment which may be a peer review (hverandrevurdering)
  mmooc.routes.addRouteForPath(/\/courses\/\d+\/assignments\/\d+/, function() {
    mmooc.pages.redesignAssignmentPage();
    mmooc.util.setGlobalPeerReviewButtonState();
  });

  // Assignment submission which might be your own or someone else's: Peer review (hverandrevurdering)
  mmooc.routes.addRouteForPath(
    /\/courses\/\d+\/assignments\/\d+\/submissions\/\d+/,
    function() {
      mmooc.pages.redesignPeerReviewAndOwnSubmissionDetailsPage();
    }
  );

  mmooc.routes.addRouteForPath(
    /\/courses\/\d+\/external_tools\/\d+$/,
    function() {
      function isBadgesafePage() {
        function extractPluginNumber(input) {
          return input.substring(input.lastIndexOf('/') + 1);
        }

        var badgesafeUrl = mmooc.menu.extractBadgesLinkFromPage().url;

        if(badgesafeUrl) {
          return (
            extractPluginNumber(badgesafeUrl) ===
            extractPluginNumber(window.location.pathname)
          );
        }
        return false;
      }

      if (isBadgesafePage()) {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Utmerkelser', 'Utmerkelser');
      }
    }
  );

  mmooc.routes.addRouteForPath(
    /\/courses\/\d+\/modules\/items\/\d+$/,
    function() {
      //Canva Badges uses this route for instance
      mmooc.menu.showLeftMenu();
      mmooc.menu.listModuleItems();
    }
  );

  mmooc.routes.addRouteForPath([/\/pages/], function() {
//    mmooc.pages.showBackLinkIfNecessary();
    mmooc.util.callWhenElementIsPresent(
      '.sikt-diploma-button',
      mmooc.greeting.enableGreetingButtonIfNecessary
    );
    mmooc.util.callWhenElementIsPresent(
      ".new-sikt-diploma-button",
      mmooc.greeting.enableNewGreetingButtonIfNecessary);

    mmooc.util.callWhenElementIsPresent(
      ".download-diploma-button", 
      mmooc.greeting.enableDownloadDiplomaButtonIfNecessary); //This is the newest method which should replace the two old ones.
  
    var courseId = mmooc.api.getCurrentCourseId();

    if ($("#kpas-lti-info").length ||
        $("#kommune-statistikk").length ||
        $("#fylke-statistikk").length) {
      const error = error => console.error('error calling api', error);
      mmooc.api.getUserGroupsForCourse(courseId, function(groups) {
        var isTeacherOrAdmin = mmooc.util.isTeacherOrAdmin();
        mmooc.kpas.showInfo(isTeacherOrAdmin, groups);
        var groupsInfo = mmooc.util.getGroupsInfo(groups);
        mmooc.kpas.createDiagram("kommune-statistikk", isTeacherOrAdmin, courseId, groupsInfo);
        mmooc.kpas.createDiagram("fylke-statistikk", isTeacherOrAdmin, courseId, groupsInfo);
      }, error);
    }
  });

  //Change "Gå til dashboard" button.
  mmooc.routes.addRouteForQueryString(/enrolled=1/, function() {
    $(".ic-Self-enrollment-footer__Primary > a").each(function() {
      var $this = $(this);
      var _href = $this.attr("href");
      $this.attr("href", _href + mmooc.hrefQueryString);
   });
  });

  mmooc.routes.addRouteForPath(/enroll\/[0-9A-Z]+/, function() {
    mmooc.enroll.changeEnrollPage();
  });

  mmooc.routes.addRouteForQueryString(/lang/, () => {
    const language = MultilangUtils.getLanguageParameter()
    console.log(`Language: ${language}`);
    MultilangUtils.setActiveLanguage(language);
  });

  try {
    mmooc.footer.changeFooter();
    mmooc.menu.renderLeftHeaderMenu();
    mmooc.menu.showUserMenu();
    mmooc.menu.renderUnauthenticatedMenu();
    mmooc.menu.setMenuActiveLink();
    mmooc.menu.showHamburger();
    mmooc.menu.showMobileMenu();
  } catch (e) {
    console.log(e);
  }

  //Try to get course information and store it such that routes can use it.
  //Otherwise just handle the route.
  try {
    if(mmooc.util.isAuthenticated()) {
      var courseId = mmooc.api.getCurrentCourseId();
      if(courseId) {
        mmooc.api.getCourse(
          courseId,
          function(course) {
            mmooc.util.course = course;
            mmooc.routes.performHandlerForUrl(document.location);
          },
          function(error) {
            console.error(
              'error calling mmooc.api.getCourse(' + courseId + ')',
              error
            );
          }
        );
      } else {
        mmooc.routes.performHandlerForUrl(document.location);
      }
    } else {
      mmooc.routes.performHandlerForUrl(document.location);
    }
  } catch (e) {
    console.log(e);
  }

  try {
    mmooc.nrk.init();
  } catch (e) {
    console.log(e);
  }

  try {
    mmooc.menu.injectGroupsPage();
    //mmooc.multilanguage.displayLanguageSelector();
    mmooc.groups.changeGroupListURLs(document.location.href);

    mmooc.pages.updateSidebarWhenMarkedAsDone();
    mmooc.pages.updateSidebarWhenContributedToDiscussion();
//    mmooc.menu.alterHomeLink();
    mmooc.menu.alterCourseLink();
  } catch (e) {
    console.log(e);
  }

  $("#application").show();
});