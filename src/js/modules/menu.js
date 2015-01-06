this.mmooc=this.mmooc||{};


this.mmooc.menu = function() {
    return {
        listModuleItems: function() {
            mmooc.api.getCurrentModule(function(module) {
                var courseId = mmooc.api.getCurrentCourseId();
                var html = mmooc.util.renderTemplateWithData("moduleitems", {module: module, courseId: courseId});
                document.getElementById('left-side').insertAdjacentHTML('afterbegin', html);
            });
        },
        showTeacherAdminMenu: function() {
            var roles = mmooc.api.getRoles();
            if (roles.indexOf('teacher') != -1 || roles.indexOf('admin') != -1) {
                $('#section-tabs-header').show();
                $("nav[aria-label='context']").show();
                $("#main").css('margin-left', '305px');
                $("#left-side").show();
            }
        },
        hideRightMenu: function() {
            $("#right-side").hide();
            $("body").removeClass('with-right-side');
        }

    };
}();
