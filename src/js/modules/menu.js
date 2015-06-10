this.mmooc=this.mmooc||{};


this.mmooc.menu = function() {

    function _renderCourseMenu(course, selectedMenuItem, title) {
        var menuItems = [];

        var courseId = course.id;

        menuItems[menuItems.length] = {"title": "Kursforside", url: "/courses/" + courseId};
        menuItems[menuItems.length] = {"title": "Kunngjøringer", url: "/courses/" + courseId + "/announcements"};
        menuItems[menuItems.length] = {"title": "Grupper", url: "/courses/" + courseId + "/groups"};
        menuItems[menuItems.length] = {"title": "Diskusjoner", url: "/courses/" + courseId + "/discussion_topics"};
        menuItems[menuItems.length] = mmooc.menu.extractBadgesLinkFromPage();

        var subtitle = course.name;
        if (title == null) {
            title = course.name;
            subtitle = "";
        }

        var html = mmooc.util.renderTemplateWithData("coursemenu", {course: course, menuItems: menuItems, selectedMenuItem: selectedMenuItem, title: title, subtitle: subtitle });
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
                $("#availability_options").show();
                $("#group_category_options").show();
                $("#editor_tabs").show();

                // Done via CSS since content is loaded using AJAX
                stylesheet.insertRule("body.pages .header-bar-outer-container { display: block }", stylesheet.cssRules.length);
                stylesheet.insertRule("#discussion-managebar { display: block }", stylesheet.cssRules.length);
            }

            if (roles != null && roles.indexOf('admin') != -1) {
                // Admin needs original canvas Course dropdown to access site admin settings
                $("#courses_menu_item").show();

                // Admin needs more profile settings
                $(".add_access_token_link").show();
                $("body.profile_settings").find("#content > table, #content > h2, #content > p").show();
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

                var msgBadge = $("#mmooc-unread-messages-count");
                if (mmooc.api.getUnreadMessageSize() === 0) {
                  msgBadge.hide();
                }
                else {
                  msgBadge.html(mmooc.api.getUnreadMessageSize());
                  msgBadge.show();
                }

                mmooc.api.getActivityStreamForUser(function(activities) {
                    var unreadNotifications = 0;
                    for (var i = 0; i < activities.length; i++) {
                        if (mmooc.menu.checkReadStateFor(activities[i])) {
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

                    document.getElementById('mmooc-activity-stream').innerHTML = mmooc.util.renderTemplateWithData("activitystream", {activities: activities});

                    var notifications = $("#mmooc-notifications").find("li");
                    if (notifications.size() == 0) {
                        $("#mmooc-notifications").hide();
                    } else {
                        $("#mmooc-notifications").show();
                    }

                    var showAllItems = $("#mmooc-notifications-showall");
                    if (notifications.size() > 10) {
                        notifications.slice(10).addClass("hidden");

                        showAllItems.click(function() {
                            notifications.removeClass("hidden");
                            showAllItems.hide();
                        });
                    } else {
                        showAllItems.hide();
                    }

                });
            }
        },

        showCourseMenu: function(courseId, selectedMenuItem, title) {
            $("body").addClass("with-course-menu");
            mmooc.api.getCourse(courseId, function(course) {
                _renderCourseMenu(course, selectedMenuItem, title);
            });
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
                    var title = mmooc.util.getPageTitleAfterColon();
                    mmooc.menu.showCourseMenu(group.course_id, "Grupper", title);

                    var headerHTML = mmooc.util.renderTemplateWithData("groupdiscussionheader", { group: group});
                    document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', headerHTML);
                });
            }
        },

        checkReadStateFor: function (activity) {
            return activity.read_state === false;
        },

        extractBadgesLinkFromPage: function () {
            var href = $('li.section:contains("BadgeSafe")').find('a').attr('href');
            return {"title": mmooc.i18n.Badgesafe, url: href};
        },
        
        injectGroupsPage: function() {
          $('#courses_menu_item').after('<li class="menu-item"><a href="/groups" class="menu-item-no-drop">Grupper</a></li>');
        }
    };
}();
