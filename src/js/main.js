$(document).ready(function() {
    mmooc.routes.addRouteForPath(/\/$/, function() {
        mmooc.menu.hideRightMenu();
        mmooc.courseList.listCourses('content');
    });

    mmooc.routes.addRouteForPath(/\/courses$/, function() {
        mmooc.menu.hideRightMenu();
        mmooc.courseList.listCourses('content');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d$/, function() {
        mmooc.menu.showTeacherAdminMenu();
        mmooc.coursePage.listModulesAndShowProgressBar();
        mmooc.coursePage.showCourseMenu('Kursforside');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d\/announcements$/, function() {
        mmooc.menu.showTeacherAdminMenu();
        mmooc.coursePage.showCourseMenu('Kunngjøringer');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d\/discussion_topics$/, function() {
        mmooc.menu.showTeacherAdminMenu();
        mmooc.coursePage.showCourseMenu('Kursdiskusjoner');
    });


    mmooc.routes.addRouteForQueryString(/module_item_id=/, function() {
        mmooc.menu.showTeacherAdminMenu();
        mmooc.menu.listModuleItems();
    });

    mmooc.routes.performHandlerForUrl(document.location);
});
