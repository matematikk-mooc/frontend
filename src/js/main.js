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
        mmooc.coursePage.showCourseMenu('Kursforside');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/announcements$/, function() {
        mmooc.coursePage.showCourseMenu('Kunngjøringer');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/discussion_topics$/, function() {
        mmooc.coursePage.showCourseMenu('Diskusjoner');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/discussion_topics\/\d$/, function() {
        mmooc.discussions.showTeacherAdminDiscussionMenu();
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/groups$/, function() {
        mmooc.groups.interceptLinksToGroupPage();
        mmooc.coursePage.showCourseMenu('Grupper');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/users$/, function() {
        mmooc.coursePage.showCourseMenu('');
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+$/, function() {
        mmooc.coursePage.showCourseMenu('Grupper');
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+\/discussion_topics$/, function() {
        mmooc.coursePage.showCourseMenu('Grupper');
        mmooc.groups.showGroupHeader();
    });


    mmooc.routes.addRouteForPathOrQueryString([/\/courses\/\d+\/assignments\/\d+/, /\/courses\/\d+\/discussion_topics\/\d+/, /\/courses\/\d+\/quizzes\/\d+/], /module_item_id=/, function() {
        mmooc.menu.showLeftMenu();
        mmooc.menu.listModuleItems();
        mmooc.pages.modifyMarkAsDoneButton();
    });

    mmooc.menu.showTeacherAdminMenu();
    mmooc.menu.showUserMenu();


    mmooc.routes.performHandlerForUrl(document.location);
});


