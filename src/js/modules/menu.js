this.mmooc=this.mmooc||{};


this.mmooc.menu = function() {
    return {
        listModuleItems: function() {
            mmooc.api.getCurrentModule(function(module) {
                var html = mmooc.util.renderTemplateWithData("moduleitems", module);
                document.getElementById('left-side').insertAdjacentHTML('afterbegin', html);
            });
        },
        showTeacherAdminMenu: function() {
            var roles = mmooc.api.getRoles();
            if (roles.indexIf('teacher') != -1 || roles.indexOf('admin') != -1) {
                $('#section-tabs-header').show();
                $("nav[aria-label='context']").show();

            }
        }
    };
}();
