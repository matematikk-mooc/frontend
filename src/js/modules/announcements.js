this.mmooc = this.mmooc || {};


this.mmooc.announcements = function () {
    function hideMarkAsReadButton() {
        $('#markAllAsReadButton').hide();
        mmooc.menu.updateNotificationsForUser();
    }


    return {
        addMarkAsReadButton: function() {
            var contentId = mmooc.api.getCurrentTypeAndContentId().contentId;
            var courseId = mmooc.api.getCurrentCourseId();

            mmooc.api.getDiscussionTopic(courseId, contentId, function(discussionTopic) {
                if (discussionTopic.read_state !== "read") {
                    var buttonHTML = mmooc.util.renderTemplateWithData("actionbutton", {id: "markAllAsReadButton", title: "Marker som lest"});
                    document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', buttonHTML);

                    $('#markAllAsReadButton').click(function() {
                        mmooc.api.markDiscussionTopicAsRead(courseId, contentId, hideMarkAsReadButton);
                    });
                }
            });

        },
        printAnnouncementsUnreadCount: function() {
            var courseId = mmooc.api.getCurrentCourseId();
            mmooc.api.getAnnouncementsForCourse(courseId, function(announcements) {
                var totalUnread = 0;
                for (var i = 0; i < announcements.length; i++) {
                    if (announcements[i].read_state == "unread" || announcements[i].unread_count > 0) {
                        totalUnread++;
                    }
                }
                if (totalUnread > 0) {
                    mmooc.announcements.printUnreadCountInTab(totalUnread);
                }
            });

        },
        printUnreadCountInTab: function(totalUnread) {
            $(".mmooc-course-tab a").each(function() {
                if ($(this).text() == "Kunngjøringer") {
                    $(this).parent().append("<span class='discussion-unread-value discussion-unread-tab'>" + totalUnread + "</span>")
                }
            });           
        },
        setAnnouncementsListUnreadClass: function() {
          var checkExist = setInterval(function() {
            if ($("body.announcements .discussionTopicIndexList .discussion-topic").length) {
              clearInterval(checkExist);
              $("body.announcements .discussionTopicIndexList .discussion-topic").each(function() {
                var unread = $(this).find('.new-items').attr("title");
                if(unread.indexOf('Ingen uleste svar.') == -1) {
                  $(this).addClass('unread');
                  $(this).removeClass('read');
                }
              });
            }
          }, 100); 
        }
    };
}();

