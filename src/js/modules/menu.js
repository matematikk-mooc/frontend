this.mmooc=this.mmooc||{};


this.mmooc.menu = function() {
    function _renderCourseMenu(courseId, selectedMenuItem, customTitle) {
        var menuItems = [];

        menuItems[menuItems.length] = {"title": "Kursforside", url: "/courses/" + courseId};
        menuItems[menuItems.length] = {"title": "Kunngjøringer", url: "/courses/" + courseId + "/announcements"};
        menuItems[menuItems.length] = {"title": "Grupper", url: "/courses/" + courseId + "/groups"};
        menuItems[menuItems.length] = {"title": "Diskusjoner", url: "/courses/" + courseId + "/discussion_topics"};

        var title = typeof customTitle !== "undefined" ? customTitle : document.title.replace(":", " for ");
        var html = mmooc.util.renderTemplateWithData("coursemenu", {menuItems: menuItems, selectedMenuItem: selectedMenuItem, title: title });
        document.getElementById('header').insertAdjacentHTML('afterend', html);
    }


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
            stylesheet.insertRule("body.with-left-side #main { margin-left: 305px !important }", stylesheet.cssRules.length);
            stylesheet.insertRule(".with-left-side #left-side { display: block !important }", stylesheet.cssRules.length);
        },

        showTeacherAdminMenu: function() {
            var roles = mmooc.api.getRoles();
            if (roles != null && (roles.indexOf('teacher') != -1 || roles.indexOf('admin') != -1)) {
                this.showLeftMenu();

                $("#section-tabs-header").show();
                $("nav[aria-label='context']").show();
                $("#edit_discussions_settings").show();
                $("#editor_tabs");

                // Done via CSS since content is loaded using AJAX
                stylesheet.insertRule("body.pages .header-bar-outer-container { display: block }", stylesheet.cssRules.length);
                stylesheet.insertRule("#discussion-managebar { display: block }", stylesheet.cssRules.length);
            }

            if (roles != null && roles.indexOf('admin') != -1) {
                $("#courses_menu_item").show();
            } else {
                document.getElementById('menu').insertAdjacentHTML('afterbegin', '<li class="menu-item"><a href="/" class="menu-item-no-drop">Kurs</a></li>');
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
        },

        showCourseMenu: function(courseId, selectedMenuItem, customTitle) {
            $("body").addClass("with-course-menu");
            _renderCourseMenu(courseId, selectedMenuItem, customTitle);
        },

        showBackButton: function(url, title) {
            var buttonHTML = mmooc.util.renderTemplateWithData("backbutton", {url: url, title: title});
            document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', buttonHTML);
        },

        showGroupHeader: function() {
            var groupId = mmooc.api.getCurrentGroupId();
            var groupHeaderHTML = mmooc.util.renderTemplateWithData("backbutton", {groupId: groupId});
            document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', groupHeaderHTML);
        },

        showDiscussionGroupMenu: function() {
            var groupId = mmooc.api.getCurrentGroupId();
            if (groupId != null) {
                mmooc.api.getGroup(groupId, function(group) {
                    // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
                    var title = mmooc.util.getPageTitleByRemovingColon();

                    mmooc.menu.showCourseMenu(group.course_id, "Grupper", title);
                    mmooc.menu.showBackButton("/groups/" + group.id + "/discussion_topics", "Tilbake til " + group.name);
                });
            }
        }
    };
}();
