$(document).ready(function() {
    mmooc.routes.addRouteForPath(/\/$/, function() {
        mmooc.menu.hideRightMenu();
        mmooc.courseList.listCourses('content');
    });

    mmooc.routes.addRouteForPath(/\/courses$/, function() {
        mmooc.menu.hideRightMenu();
        mmooc.courseList.listCourses('content');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+$/, function() {
        mmooc.coursePage.listModulesAndShowProgressBar();
        mmooc.groups.interceptLinksToGroupPage();

        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Kursforside');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/announcements$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Kunngjøringer');
    });

    /*
    mmooc.routes.addRouteForPath(/\/courses\/\d+\/announcements\/\d+$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Kunngjøringer');
        mmooc.menu.showBackButton("/courses/" + courseId + "/announcements", "Tilbake til kunngjøringer");
    });*/

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/discussion_topics$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Diskusjoner');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/discussion_topics\/\d+/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Diskusjoner');
        mmooc.menu.showBackButton("/courses/" + courseId + "/discussion_topics", "Tilbake til diskusjoner");
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/groups$/, function() {
        mmooc.groups.interceptLinksToGroupPage();
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/users$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, '');
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper');
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+\/discussion_topics$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper');
        mmooc.groups.showGroupHeader();
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+\/discussion_topics\/\d+$/, function() {
        mmooc.menu.showDiscussionGroupMenu();
    });


    mmooc.routes.addRouteForPathOrQueryString([/\/courses\/\d+\/assignments\/\d+/, /\/courses\/\d+\/discussion_topics\/\d+/, /\/courses\/\d+\/quizzes\/\d+/], /module_item_id=/, function() {
        mmooc.menu.showLeftMenu();
        mmooc.menu.listModuleItems();
        mmooc.pages.modifyMarkAsDoneButton();
    });


    mmooc.routes.addRouteForQueryString(/enrolled=1/, function() {
        mmooc.enroll.changeButtonText();
    });

    try {
        mmooc.menu.showTeacherAdminMenu();
        mmooc.menu.showUserMenu();
        mmooc.routes.performHandlerForUrl(document.location);
    } catch (e) {
        console.log(e);
    }


});


