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
        showLeftMenu: function() {
            if ($("body").hasClass("with-left-side")) {
                $("#main").css('margin-left', '305px');
                $("#left-side").show();
            }
        },

        showTeacherAdminMenu: function() {
            var roles = mmooc.api.getRoles();
            if (roles != null && (roles.indexOf('teacher') != -1 || roles.indexOf('admin') != -1)) {
                $('#section-tabs-header').show();
                $("nav[aria-label='context']").show();
                this.showLeftMenu();
            }
        },
        hideRightMenu: function() {
            $("#right-side").hide();
            $("body").removeClass('with-right-side');
        },

        showUserMenu: function() {
            var html = mmooc.util.renderTemplateWithData("usermenu", {user: mmooc.api.getUser()});
            document.getElementById('menu').insertAdjacentHTML('afterend', html);

            mmooc.api.getActivityStreamForUser(function(activities) {
                var unreadNotifications = 0;
                for (var i = 0; i < activities.length; i++) {
                    if (activities[i].read_state == false) {
                        unreadNotifications++;
                    }
                }

                var badge = $("#mmooc-notification-count");
                if (unreadNotifications == 0) {
                    badge.hide();
                } else {
                    badge.html(unreadNotifications);
                    badge.show();
                }

                var activityHTML = mmooc.util.renderTemplateWithData("activitystream", {activities: activities});
                document.getElementById('mmooc-activity-stream').innerHTML = activityHTML;
            });
        }

    };
}();
