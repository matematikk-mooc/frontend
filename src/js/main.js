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
        mmooc.coursePage.listModulesAndShowProgressBar();
        mmooc.coursePage.showCourseMenu('Kursforside');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d\/announcements$/, function() {
        mmooc.coursePage.showCourseMenu('Kunngjøringer');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d\/discussion_topics$/, function() {
        mmooc.coursePage.showCourseMenu('Kursdiskusjoner');
    });


    mmooc.routes.addRouteForQueryString(/module_item_id=/, function() {
        mmooc.menu.showLeftMenu();
        mmooc.menu.listModuleItems();
    });

    mmooc.menu.showTeacherAdminMenu();

    mmooc.routes.performHandlerForUrl(document.location);
});
