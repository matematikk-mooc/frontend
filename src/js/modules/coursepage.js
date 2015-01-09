this.mmooc=this.mmooc||{};


this.mmooc.coursePage = function() {
    function _renderCourseMenu(courseId, selectedMenuItem) {
        var menuItems = [];

        menuItems[menuItems.length] = {"title": "Kursforside", url: "/courses/" + courseId};
        menuItems[menuItems.length] = {"title": "Kunngjøringer", url: "/courses/" + courseId + "/announcements"};
        menuItems[menuItems.length] = {"title": "Grupper", url: "/courses/" + courseId + "/groups"};
        menuItems[menuItems.length] = {"title": "Diskusjoner", url: "/courses/" + courseId + "/discussion_topics"};

        var title = document.title.replace(":", " for ");
        var html = mmooc.util.renderTemplateWithData("coursemenu", {menuItems: menuItems, selectedMenuItem: selectedMenuItem, title: title });
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
            $("body").addClass("with-course-menu");
            _renderCourseMenu(courseId, selectedMenuItem);
        }
    };
}();
