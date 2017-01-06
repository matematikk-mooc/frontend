this.mmooc = this.mmooc || {};


this.mmooc.announcements = function () {
    function hideMarkAsReadButton() {
        $('#markAllAsReadButton').hide();
        mmooc.menu.updateNotificationsForUser();
    }

    /////////////////////////////////////////////////////////////////////////////
    // Function that fix announcement bug in Canvas
    // https://community.canvaslms.com/message/22237?et=watches.email.thread#22237
    /////////////////////////////////////////////////////////////////////////////
    function clearAnnouncementsForCourseArrays(courses) {
        var ayncsDone = 0;
        var totalAsyncs = 0;

        for(var j = 0; j < courses.length; j++) {
            var course = courses[j];
            totalAsyncs += course.discussionIds.length;
        }

        for(var j = 0; j < courses.length; j++) {
            var course = courses[j];
            var courseId = course.courseId;
            for (var i = 0; i < course.discussionIds.length; i++) {
                var discussionId = course.discussionIds[i];
                var s = '<br><div id="cdt' + courseId + discussionId + '">Markerer kunngj&oslash;ring som lest...</div>';
                $("#clearannouncements").append(s);

                var href= "/api/v1/courses/" + courseId + "/discussion_topics/" + discussionId + "/read_all.json";
                $.ajax({
                    url: href,
                    type: 'PUT',
                    data: 'forced_read_state=true',
                    courseid: courseId,
                    discussiontopicid: discussionId,
                    success: function(response) {
                        var s = "#cdt" + this.courseid + this.discussiontopicid;
                        $(s).append("OK");
                        ayncsDone++;
                        if (totalno == ayncsDone) {
                            try {
                                mmooc.menu.updateNotificationsForUser();
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("Error marking things as done:" + textStatus);
                    }
                });
            }
        }
    }

    /*
     Disse kunngjøringene blir nullstilt:

     Kurs 0:
     https://matematikk.mooc.no/courses/18/discussion_topics/519
     https://matematikk.mooc.no/courses/18/discussion_topics/551
     https://matematikk.mooc.no/courses/18/discussion_topics/569
     https://matematikk.mooc.no/courses/18/discussion_topics/824

     Kurs 1:
     https://matematikk.mooc.no/courses/11/discussion_topics/884
     https://matematikk.mooc.no/courses/11/discussion_topics/942
     https://matematikk.mooc.no/courses/11/discussion_topics/948
     https://matematikk.mooc.no/courses/11/discussion_topics/949
     https://matematikk.mooc.no/courses/11/discussion_topics/962
     https://matematikk.mooc.no/courses/11/discussion_topics/966
     https://matematikk.mooc.no/courses/11/discussion_topics/969
     https://matematikk.mooc.no/courses/11/discussion_topics/973
     https://matematikk.mooc.no/courses/11/discussion_topics/974
     https://matematikk.mooc.no/courses/11/discussion_topics/1245
     https://matematikk.mooc.no/courses/11/discussion_topics/1246
     https://matematikk.mooc.no/courses/11/discussion_topics/1259

     Kurs 2:
     https://matematikk.mooc.no/courses/12/discussion_topics/1263
     */

    return {
        clearAnnouncements: function() {
            var courses = [ {
                    courseId: 18,
                    discussionIds: [519,551,569,824]
                },
                {
                    courseId: 11,
                    discussionIds: [884,942,948,949,962,966,969,973,974,1245,1246,1259]
                },
                {
                    courseId: 12,
                    discussionIds: [1263]
                }

            ];
            clearAnnouncementsForCourseArrays(courses);
        },

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
                mmooc.announcements.printUnreadCountInTab(totalUnread);
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

