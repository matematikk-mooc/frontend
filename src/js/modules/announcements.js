this.mmooc = this.mmooc || {};


this.mmooc.announcements = function () {
/////////////////////////////////////////////////////////////////////////////
// Begin of functions that fix announcement bug in Canvas
// https://community.canvaslms.com/message/22237?et=watches.email.thread#22237
/////////////////////////////////////////////////////////////////////////////
    function clearAnnouncementBugUpdateNotifications()
    {
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
            for (var i = 0; i < course.topicsIds.length; i++) {
                var discussionId = course.discussionIds[i];
                var s = '<br><div id="cdt' + courseId + discussionId + '">Markerer kunngj&oslash;ring som lest...</div>';
                $("#clearannouncements").append(s);

                var href= "/api/v1/courses/" + cid + "/discussion_topics/" + did + "/read_all.json";
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
                        alert("Status: " + textStatus); alert("Error: " + errorThrown);
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
        }

    };
}();

