this.mmooc=this.mmooc||{};


this.mmooc.discussions = function() {

    return {
        showTeacherAdminDiscussionMenu: function() {
            var roles = mmooc.api.getRoles();
            if (roles.indexOf('teacher') != -1 || roles.indexOf('admin') != -1) {
                $("#discussion-managebar").show();
            }
        }
    };
}();
