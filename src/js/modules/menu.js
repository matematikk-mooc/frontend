this.mmooc=this.mmooc||{};


this.mmooc.menu = function() {
    function createStyleSheet () {
        var style = document.createElement("style");

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        document.head.appendChild(style);

        return style.sheet;
    }

    var stylesheet = createStyleSheet();

    return {
        listModuleItems: function() {
            mmooc.api.getCurrentModule(function(module) {
                var courseId = mmooc.api.getCurrentCourseId();
                var html = mmooc.util.renderTemplateWithData("moduleitems", {module: module, courseId: courseId});
                document.getElementById('left-side').insertAdjacentHTML('afterbegin', html);
            });
        },
        showLeftMenu: function() {
            stylesheet.insertRule("body.with-left-side #main { margin-left: 305px }", stylesheet.cssRules.length);
            stylesheet.insertRule(".with-left-side #left-side { display: block }", stylesheet.cssRules.length);
        },

        showTeacherAdminMenu: function() {
            var roles = mmooc.api.getRoles();
            if (roles != null && (roles.indexOf('teacher') != -1 || roles.indexOf('admin') != -1)) {
                this.showLeftMenu();

                $("#section-tabs-header").show();
                $("nav[aria-label='context']").show();

                // Done via CSS since content is loaded using AJAX
                stylesheet.insertRule("body.pages .header-bar-outer-container { display: block }", stylesheet.cssRules.length);
                stylesheet.insertRule("#discussion-managebar { display: block }", stylesheet.cssRules.length);
            }
        },

        hideRightMenu: function() {
            $("#right-side").hide();
            $("body").removeClass('with-right-side');
        },

        showUserMenu: function() {
            var menu = document.getElementById('menu');
            if (menu !=  null) {
                var html = mmooc.util.renderTemplateWithData("usermenu", {user: mmooc.api.getUser()});
                menu.insertAdjacentHTML('afterend', html);

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
        }

    };
}();
