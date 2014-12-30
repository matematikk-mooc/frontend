$(document).ready(function() {
    mmooc.routes.addRouteForPath(/\/$/, function() {
        mmooc.courseList.listCourses('content');
    });

    mmooc.routes.addRouteForPath(/\/courses$/, function() {
        mmooc.courseList.listCourses('content');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d$/, function() {
        mmooc.coursePage.listModulesAndShowProgressBar();
    });

    mmooc.routes.addRouteForQueryString(/module_item_id=/, function() {
        mmooc.menu.listModuleItems();
        mmooc.menu.showTeacherAdminMenu();

    });

    mmooc.routes.performHandlerForUrl(document.location);
});
