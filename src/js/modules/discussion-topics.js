this.mmooc = this.mmooc || {};

this.mmooc.discussionTopics = function () {
    return {
        setDiscussionTopicPubDate: function(discussionTopic) {
            var formattedDate = mmooc.util.formattedDate(discussionTopic.posted_at);
            var pubDate = $("<div class='publication-date'>" + formattedDate + "</div>");
            $(pubDate).prependTo('#discussion_topic .discussion-header-right');
        },

        alterDiscussionReadStateLook: function() {
            var self = this;
            $('body').on('click', '.read-unread-button', function (){
               $(this).toggleClass('read');
               $(this).closest(".entry-content").siblings(".discussion-read-state-btn").click();
               self.toggleReadUnreadButton($(this));
           });

            var checkExist = setInterval(function() {
                if ($('.discussion-read-state-btn').length) {
                  clearInterval(checkExist);
                  var readUnreadButton = $("<div class='read-unread-button'>Marker som lest</div>");
                  readUnreadButton.appendTo('.discussion_entry .entry-header');
                  self.toggleReadUnreadButton($(this).closest(".discussion_entry").find("read-unread-button"));
                }
            }, 100);
        },

        toggleReadUnreadButton: function(button) {
            $(".discussion-read-state-btn").each(function(index) {
                    var button = $(this).siblings(".entry-content").find(".read-unread-button");
                    if($(this).parent().hasClass("unread")) {
                        button.text('Marker som lest');
                        button.addClass('read');
                    }
                    else {
                        button.text('Marker som ulest');
                        button.removeClass('read');
                    }
                });
        },
        setDiscussionsListUnreadClass: function() {
          var checkExist = setInterval(function() {
            if ($("#open-discussions .ig-list .discussion").length) {
              clearInterval(checkExist);
              $("#open-discussions .ig-list .discussion").each(function() {
                var unread = $(this).find('.new-items').text();
                if(unread.indexOf('0') == -1) {
                  $(this).addClass('unread');
                }
              });
            }
          }, 100); 
        },
        insertSearchButton: function() {
          $('.index_view_filter_form').append('<button class="btn btn-discussion-search">'); 
        },
        printDiscussionUnreadCount: function(modules) {
            var discussions = mmooc.discussionTopics.getDiscussions(modules);
            var courseId = mmooc.api.getCurrentCourseId();
            var totalUnread = 0;
            var asyncsDone = 0;
            var groupDiscussions = [];
            for (var i = 0; i < discussions.length; i++) {
                var contentId = discussions[i].content_id;
                mmooc.api.getDiscussionTopic(courseId, contentId, function(discussion) {
                    if (discussion) {
                        if (discussion.group_category_id) {
                            groupDiscussions.push(discussion);
                        }
                        else {
                            if (discussion.unread_count > 0) {
                                mmooc.discussionTopics.printUnreadCountOnIcon(discussion.unread_count, discussion.id);
                                totalUnread = totalUnread + discussion.unread_count;
                            }
                        }
                    }
                    asyncsDone++;
                    if (asyncsDone == discussions.length) {
                        if (totalUnread > 0 && groupDiscussions.length == 0) {
                            mmooc.discussionTopics.printUnreadCountInTab(totalUnread);
                        }
                        else if (groupDiscussions.length > 0) {
                            mmooc.discussionTopics.printGroupDiscussionUnreadCount(courseId, groupDiscussions, totalUnread);
                        }
                        else {
                            return;
                        }
                    }
                });
            }
        },
        printGroupDiscussionUnreadCount: function(courseId, groupDiscussions, totalUnread) {
            // if teacher or admin
            if (mmooc.util.isTeacherOrAdmin()) {
                var params = { user_id: "self" };
                var asyncsDone = 0;
                var sectionNames = [];
                // get enrollments and sections for current user
                mmooc.api.getEnrollmentsForCourse(courseId, params, function(enrollments) {
                    for (var i = 0; i < enrollments.length; i++) {
                        var sectionId = enrollments[i].course_section_id;
                        mmooc.api.getSingleSection(sectionId, function(section) {
                            sectionNames.push(section.name);
                            asyncsDone++;
                            if (asyncsDone == enrollments.length) {
                                mmooc.api.getGroupsInCourse(courseId, function(groups) {
                                    var totalAsyncs = 0;
                                    var allUnreadCounts = [];
                                    asyncsDone = 0;
                                    for (var j = 0; j < groups.length; j++) {
                                        for (var k = 0; k < sectionNames.length; k++) {
                                            // check if group name equals section name then get discussion topics
                                            if (groups[j].name == sectionNames[k]) {
                                                var groupId = groups[j].id;
                                                totalAsyncs++;
                                                mmooc.api.getGroupDiscussionTopics(groupId, function(discussions) {
                                                    for (var l = 0; l < discussions.length; l++) {
                                                        for (var m = 0; m < groupDiscussions.length; m++) {
                                                            // check if group discussion is exists current course
                                                            if (discussions[l].root_topic_id == groupDiscussions[m].id) {
                                                                if (discussions[l].unread_count > 0) {
                                                                    var rootTopicUnreadCountsObj = {
                                                                        rootTopicId: discussions[l].root_topic_id,
                                                                        unreadCount: discussions[l].unread_count
                                                                    }
                                                                    allUnreadCounts.push(rootTopicUnreadCountsObj);
                                                                    totalUnread = totalUnread + discussions[l].unread_count;                                                                    
                                                                }
                                                            }
                                                        }
                                                    }
                                                    asyncsDone++;
                                                    if (asyncsDone == totalAsyncs) {
                                                        mmooc.discussionTopics.printUnreadCountInTab(totalUnread);
                                                        var unreadCountForRootTopic = 0;
                                                        var totalRootTopicUnreadCounts = [];
                                                        // add together unread counts with same root topic id
                                                        for (var n = 0; n < allUnreadCounts.length; n++) {
                                                            for (var o = 0; o < allUnreadCounts.length; o++) {
                                                                if (allUnreadCounts[n].rootTopicId == allUnreadCounts[o].rootTopicId) {
                                                                    unreadCountForRootTopic = unreadCountForRootTopic + allUnreadCounts[o].unreadCount;
                                                                }
                                                            }
                                                            var totalRootTopicUnreadCountsObj = {
                                                                rootTopicId: allUnreadCounts[n].rootTopicId,
                                                                unreadCount: unreadCountForRootTopic
                                                            }
                                                            totalRootTopicUnreadCounts.push(totalRootTopicUnreadCountsObj);
                                                            unreadCountForRootTopic = 0;
                                                        }
                                                        var used = [];
                                                        // only print unread count for unique topic ids
                                                        for (var p = 0; p < totalRootTopicUnreadCounts.length; p++) {
                                                            if (used.indexOf(totalRootTopicUnreadCounts[p].rootTopicId) == -1) {
                                                                mmooc.discussionTopics.printUnreadCountOnIcon(totalRootTopicUnreadCounts[p].unreadCount, totalRootTopicUnreadCounts[p].rootTopicId);
                                                                used.push(totalRootTopicUnreadCounts[p].rootTopicId);
                                                            }
                                                        }// en for totalRootTopicUnreadCounts.length
                                                    }// end if asyncsDone 
                                                });// end group discussion topics async call
                                            }// end if group name equals section name
                                        }// end for sectionNames.length
                                    }// end for groups.length
                                });// end for groups in course async call   
                            }// end if asyncsDone
                        });// end section async call
                    }// end for enrollments.lenth
                });// end enrollments async call
            }// end if teacher or admin
            // if student
            else {
                mmooc.api.getUserGroups(function(groups) {
                    if (groups.length == 0 && totalUnread > 0) {
                        mmooc.discussionTopics.printUnreadCountInTab(totalUnread);
                    }
                    for (var i = 0; i < groups.length; i++) {
                        for (var j = 0; j < groupDiscussions.length; j++) {
                            if (groups[i].course_id == courseId && groups[i].group_category_id == groupDiscussions[j].group_category_id) {
                                groupId = groups[i].id;
                                mmooc.api.getGroupDiscussionTopics(groupId, function(discussions) {
                                    for (var k = 0; k < discussions.length; k++) {
                                        if (discussions[k].unread_count > 0) {
                                            mmooc.discussionTopics.printUnreadCountOnIcon(discussions[k].unread_count, discussions[k].root_topic_id);
                                            totalUnread += discussions[k].unread_count;
                                        }
                                    }
                                    if (totalUnread > 0) {
                                        mmooc.discussionTopics.printUnreadCountInTab(totalUnread);
                                    }
                                }); // end group discussions async call
                            }
                            break;
                        } // end for groupDiscussions.length
                        break;    
                    } // end for groupDiscussions.length
                }); // end user groups async call
            }                   
        },
        getDiscussions: function(modules) {
            var discussions = [];
            for (var i = 0; i < modules.length; i++) {
                for (var j = 0; j < modules[i].items.length; j++) {
                    if (modules[i].items[j].type == 'Discussion') {
                        discussions.push(modules[i].items[j]);
                    }
                }
            }
            return discussions;            
        },
        printUnreadCountOnIcon: function(unread, discussionId) {
            $(".discussion-unread-tag.discussion-id-" + discussionId).html("<div class='discussion-unread-value discussion-unread-item'>" + unread + "</div>");         
        },
        printUnreadCountInTab: function(totalUnread) {
            $(".mmooc-course-tab a").each(function() {
                if ($(this).text() == "Diskusjoner") {
                    $(this).parent().append("<span class='discussion-unread-value discussion-unread-tab'>" + totalUnread + "</span>")
                }
            });           
        }
    };
}();

