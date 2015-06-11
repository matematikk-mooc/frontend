this.mmooc=this.mmooc||{};


this.mmooc.coursePage = function() {

    return {

        listModulesAndShowProgressBar: function() {
            mmooc.api.getModulesForCurrentCourse(function(modules) {
                var progressHTML = mmooc.util.renderTemplateWithData("courseprogress", {modules: modules});
                document.getElementById('course_home_content').insertAdjacentHTML('beforebegin', progressHTML);

                var modulesHTML = mmooc.util.renderTemplateWithData("modules", {modules: modules});
                document.getElementById('course_home_content').insertAdjacentHTML('beforebegin', modulesHTML);
            });
        }

    };
}();
