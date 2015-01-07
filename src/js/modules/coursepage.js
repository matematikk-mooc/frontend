this.mmooc=this.mmooc||{};


this.mmooc.coursePage = function() {
    function _renderCourseMenu(courseId, selectedMenuItem, groupUrl) {
        var menuItems = [];

        menuItems[menuItems.length] = {"title": "Kursforside", url: "/courses/" + courseId};
        if (groupUrl != null) {
            menuItems[menuItems.length] = {"title": "Din gruppe", url: groupUrl};
        }
        menuItems[menuItems.length] = {"title": "Kunngjøringer", url: "/courses/" + courseId + "/announcements"};
        menuItems[menuItems.length] = {"title": "Kursdiskusjoner", url: "/courses/" + courseId + "/discussion_topics"};

        var html = mmooc.util.renderTemplateWithData("coursemenu", {menuItems: menuItems, selectedMenuItem: selectedMenuItem, title: document.title });
        document.getElementById('header').insertAdjacentHTML('afterend', html);
    }

    return {

        listModulesAndShowProgressBar: function() {
            mmooc.api.getModulesForCurrentCourse(function(modules) {
                var modulesHTML = mmooc.util.renderTemplateWithData("modules", {modules: modules});
                document.getElementById('content').insertAdjacentHTML('afterbegin', modulesHTML);

                var progressHTML = mmooc.util.renderTemplateWithData("courseprogress", {modules: modules});
                document.getElementById('content').insertAdjacentHTML('afterbegin', progressHTML);
            });
        },

        showCourseMenu: function(selectedMenuItem) {
            var courseId = mmooc.api.getCurrentCourseId();

            mmooc.api.getGroupsForCurrentUser(function(groups) {
                // TODO: Plukk ut grupper
                _renderCourseMenu(courseId, selectedMenuItem, null);
            }, function() {
                _renderCourseMenu(courseId, selectedMenuItem, null);
            });
        }
    };
}();
