this.mmooc=this.mmooc||{};


this.mmooc.coursePage = function() {
    return {
        listModulesAndShowProgressBar: function() {
            mmooc.api.getModulesForCurrentCourse(function(modules) {
                var modulesHTML = mmooc.util.renderTemplateWithData("modules", {modules: modules});
                document.getElementById('content').insertAdjacentHTML('afterbegin', modulesHTML);

                var progressHTML = mmooc.util.renderTemplateWithData("courseprogress", {modules: modules});
                document.getElementById('content').insertAdjacentHTML('afterbegin', progressHTML);

            });
        }
    };
}();
