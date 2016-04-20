jQuery(function($) {

    mmooc.routes.addRouteForPath(/\/$/, function() {
        mmooc.menu.hideRightMenu();
        var parentId = 'content'
        if (document.location.search === "?mmpf") {
            mmooc.powerFunctions.show(parentId);
        } else {
            mmooc.courseList.listCourses(parentId, mmooc.courseList.showAddCourseButton);
        }
    });

    mmooc.routes.addRouteForQueryString(/invitation=/, function() {
    });

    mmooc.routes.addRouteForPath(/\/login$/, function() {
        $('#register_link').html("<i>Trenger du en konto?</i><b>Klikk her.</b>");
    });

    mmooc.routes.addRouteForPath(/\/courses$/, function() {
        mmooc.menu.hideRightMenu();
        mmooc.courseList.listCourses('content', mmooc.courseList.showAddCourseButton);
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+$/, function() {
        mmooc.coursePage.listModulesAndShowProgressBar();
        mmooc.groups.interceptLinksToGroupPage();

        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Kursforside', null);
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/announcements$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Kunngjøringer', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/discussion_topics$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Diskusjoner', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/groups$/, function() {
        mmooc.groups.interceptLinksToGroupPage();
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/users$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, '', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+\/discussion_topics$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper', mmooc.util.getPageTitleAfterColon());

        //TODO: Check whether or not courseId is undefined or not valid, only insert the group header
        //when it is.
        mmooc.groups.showGroupHeader();
    });

    mmooc.routes.addRouteForPath([/\/groups\/\d+\/discussion_topics\/\d+$/, /\/groups\/\d+\/discussion_topics\/new$/], function() {
        // mmooc.menu.showDiscussionGroupMenu();
    });

    mmooc.routes.addRouteForPath([/\/groups\/\d+\/discussion_topics\/\d+$/], function() {
      mmooc.groups.moveSequenceLinks();
    });

    mmooc.routes.addRouteForPath([/\/courses\/\d+\/discussion_topics\/\d+/, /\/courses\/\d+\/discussion_topics\/new/], function() {
        // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
        var title = mmooc.util.getPageTitleAfterColon();

        if (!mmooc.util.isTeacherOrAdmin()) {
            mmooc.menu.hideRightMenu();
        }

        // Announcements are some as type of discussions, must use a hack to determine if this is an announcement
        var courseId = mmooc.api.getCurrentCourseId();
        if (mmooc.api.currentPageIsAnnouncement()) {
            mmooc.menu.showCourseMenu(courseId, 'Kunngjøringer', title);
            mmooc.menu.showBackButton("/courses/" + courseId + "/announcements", "Tilbake til kunngjøringer");
            mmooc.announcements.addMarkAsReadButton();
        } else if (mmooc.api.getCurrentModuleItemId() == null) {
            // Only show course menu if this discussion is not a module item
            // Note detection if this is a module item is based on precense of query parameter
            mmooc.menu.showCourseMenu(courseId, 'Diskusjoner', title);
            mmooc.menu.showBackButton("/courses/" + courseId + "/discussion_topics", "Tilbake til diskusjoner");
        }
    });

    mmooc.routes.addRouteForPathOrQueryString([/\/courses\/\d+\/assignments\/\d+/, /\/courses\/\d+\/quizzes\/\d+/], /module_item_id=/, function() {
        mmooc.menu.showLeftMenu();
        mmooc.menu.listModuleItems();
        mmooc.pages.modifyMarkAsDoneButton();
        mmooc.pages.changeTranslations();
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/external_tools\/\d+$/, function() {
        function isBadgesafePage() {
            function extractPluginNumber(input) {
                 return input.substring(input.lastIndexOf('/') + 1);
            }

            var badgesafeUrl = mmooc.menu.extractBadgesLinkFromPage().url;

            return extractPluginNumber(badgesafeUrl) === extractPluginNumber(window.location.pathname);
        };

        if (isBadgesafePage()) {
            var courseId = mmooc.api.getCurrentCourseId();
            mmooc.menu.showCourseMenu(courseId, 'Utmerkelser', 'Utmerkelser');
        }
    });

    mmooc.routes.addRouteForPath([/\/pages/], function() {
        mmooc.pages.showBackLinkIfNecessary();
    });


    mmooc.routes.addRouteForQueryString(/enrolled=1/, function() {
        mmooc.enroll.changeButtonText();
    });

    try {
        mmooc.menu.renderLeftHeaderMenu();
        mmooc.menu.showUserMenu();
    } catch (e) {
        console.log(e);
    }

    try {
        mmooc.routes.performHandlerForUrl(document.location);
    } catch (e) {
        console.log(e);
    }

    try {
        mmooc.menu.injectGroupsPage();
        mmooc.groups.changeGroupListURLs(document.location.href);

        mmooc.pages.showBackToAssignmentLink(document.location.href);
        mmooc.pages.updateSidebarWhenMarkedAsDone();

        mmooc.menu.alterHomeLink();
        mmooc.menu.alterCourseLink();

        $('#announcementbug').click(function() {
            mmooc.announcements.clearAnnouncements();
        });

    } catch(e) {
      console.log(e);
    }

});
