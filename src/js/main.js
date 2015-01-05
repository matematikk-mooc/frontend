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

    });

    mmooc.routes.addRouteForQueryString(/module_item_id=/, function() {
        mmooc.menu.showTeacherAdminMenu();
        mmooc.menu.listModuleItems();
    });

    mmooc.routes.performHandlerForUrl(document.location);
});
