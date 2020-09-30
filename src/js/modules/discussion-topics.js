this.mmooc = this.mmooc || {};

this.mmooc.discussionTopics = (function () {
    return {
        setDiscussionTopicPubDate: function (discussionTopic) {
            if (discussionTopic) {
                var formattedDate = mmooc.util.formattedDate(discussionTopic.posted_at);
                var pubDate = $(
                    "<div class='publication-date'>" + formattedDate + '</div>'
                );
                $(pubDate).prependTo('#discussion_topic .discussion-header-right');
            }
        },

        setDiscussionsListUnreadClass: function () {
            var checkExist = setInterval(function () {
                if (
                    $('body.discussions #open-discussions .ig-list .discussion').length
                ) {
                    clearInterval(checkExist);
                    $('body.discussions #open-discussions .ig-list .discussion').each(
                        function () {
                            var unread = $(this)
                                .find('.new-items')
                                .text();
                            if (unread.indexOf('0') == -1) {
                                $(this).addClass('unread');
                            }
                        }
                    );
                }
            }, 100);
        },
        insertSearchButton: function () {
            $('.index_view_filter_form').append(
                '<button class="btn btn-discussion-search">'
            );
        },
        printDiscussionUnreadCount: function (modules, context) {
            var discussionItems = mmooc.discussionTopics.getDiscussionItems(modules);
            var courseId = mmooc.api.getCurrentCourseId();
            var totalUnread = 0;
            var asyncsDone = 0;
            var groupDiscussionTopics = [];
            for (var i = 0; i < discussionItems.length; i++) {
                var contentId = discussionItems[i].content_id;
                mmooc.api.getDiscussionTopic(courseId, contentId, function (
                    discussionTopic
                ) {
                    if (discussionTopic) {
                        if (discussionTopic.group_category_id) {
                            groupDiscussionTopics.push(discussionTopic);
                        } else {
                            if (discussionTopic.unread_count > 0) {
                                if (context == 'coursepage') {
                                    mmooc.discussionTopics.printUnreadCountOnIcon(
                                        discussionTopic.unread_count,
                                        discussionTopic.id
                                    );
                                }
                                totalUnread = totalUnread + discussionTopic.unread_count;
                            }
                        }
                    }
                    asyncsDone++;
                    if (asyncsDone == discussionItems.length) {
                        if (totalUnread > 0 && groupDiscussionTopics.length == 0) {
                            mmooc.discussionTopics.printUnreadCountInTab(totalUnread);
                            if (context == 'discussionslist') {
                                return;
                            }
                        } else if (groupDiscussionTopics.length > 0) {
                            mmooc.discussionTopics.printGroupDiscussionUnreadCount(
                                courseId,
                                groupDiscussionTopics,
                                totalUnread,
                                context
                            );
                        } else {
                            return;
                        }
                    }
                });
            }
        },
        printGroupDiscussionUnreadCount: function (
            courseId,
            groupDiscussionTopics,
            totalUnread,
            context
        ) {
            // if teacher or admin
            if (mmooc.util.isTeacherOrAdmin()) {
                var params = {user_id: 'self', per_page: 999};
                var asyncsDone = 0;
                var sectionNames = [];
                // get enrollments and sections for current user
                mmooc.api.getEnrollmentsForCourse(courseId, params, function (
                    enrollments
                ) {
                    for (var i = 0; i < enrollments.length; i++) {
                        var sectionId = enrollments[i].course_section_id;
                        mmooc.api.getSingleSection(sectionId, function (section) {
                            sectionNames.push(section.name);
                            asyncsDone++;
                            if (asyncsDone == enrollments.length) {
                                mmooc.api.getGroupsInCourse(courseId, function (groups) {
                                    var totalAsyncs = 0;
                                    var allUnreadCounts = [];
                                    asyncsDone = 0;
                                    for (var j = 0; j < groups.length; j++) {
                                        for (var k = 0; k < sectionNames.length; k++) {
                                            // check if group name equals section name then get discussion topics
                                            if (groups[j].name == sectionNames[k]) {
                                                var groupId = groups[j].id;
                                                totalAsyncs++;
                                                mmooc.api.getGroupDiscussionTopics(groupId, function (
                                                    discussions
                                                ) {
                                                    for (var l = 0; l < discussions.length; l++) {
                                                        for (
                                                            var m = 0;
                                                            m < groupDiscussionTopics.length;
                                                            m++
                                                        ) {
                                                            // check if group discussion is exists current course
                                                            if (
                                                                discussions[l].root_topic_id ==
                                                                groupDiscussionTopics[m].id
                                                            ) {
                                                                if (discussions[l].unread_count > 0) {
                                                                    var rootTopicUnreadCountsObj = {
                                                                        rootTopicId: discussions[l].root_topic_id,
                                                                        unreadCount: discussions[l].unread_count
                                                                    };
                                                                    allUnreadCounts.push(
                                                                        rootTopicUnreadCountsObj
                                                                    );
                                                                    totalUnread =
                                                                        totalUnread + discussions[l].unread_count;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    asyncsDone++;
                                                    if (asyncsDone == totalAsyncs) {
                                                        mmooc.discussionTopics.printUnreadCountInTab(
                                                            totalUnread
                                                        );
                                                        if (
                                                            context == 'coursepage' ||
                                                            context == 'discussionslist'
                                                        ) {
                                                            var unreadCountForRootTopic = 0;
                                                            var totalRootTopicUnreadCounts = [];
                                                            // add together unread counts with same root topic id
                                                            for (var n = 0; n < allUnreadCounts.length; n++) {
                                                                for (
                                                                    var o = 0;
                                                                    o < allUnreadCounts.length;
                                                                    o++
                                                                ) {
                                                                    if (
                                                                        allUnreadCounts[n].rootTopicId ==
                                                                        allUnreadCounts[o].rootTopicId
                                                                    ) {
                                                                        unreadCountForRootTopic =
                                                                            unreadCountForRootTopic +
                                                                            allUnreadCounts[o].unreadCount;
                                                                    }
                                                                }
                                                                var totalRootTopicUnreadCountsObj = {
                                                                    rootTopicId: allUnreadCounts[n].rootTopicId,
                                                                    unreadCount: unreadCountForRootTopic
                                                                };
                                                                totalRootTopicUnreadCounts.push(
                                                                    totalRootTopicUnreadCountsObj
                                                                );
                                                                unreadCountForRootTopic = 0;
                                                            }
                                                            // only print unread count for unique topic ids
                                                            var uniqueTotalRootTopicUnreadCounts = [];
                                                            var used = [];
                                                            for (
                                                                var p = 0;
                                                                p < totalRootTopicUnreadCounts.length;
                                                                p++
                                                            ) {
                                                                if (
                                                                    used.indexOf(
                                                                        totalRootTopicUnreadCounts[p].rootTopicId
                                                                    ) == -1
                                                                ) {
                                                                    var totalRootTopicUnreadCountsObj = {
                                                                        rootTopicId:
                                                                        totalRootTopicUnreadCounts[p].rootTopicId,
                                                                        unreadCount:
                                                                        totalRootTopicUnreadCounts[p].unreadCount
                                                                    };
                                                                    uniqueTotalRootTopicUnreadCounts.push(
                                                                        totalRootTopicUnreadCountsObj
                                                                    );
                                                                    used.push(
                                                                        totalRootTopicUnreadCounts[p].rootTopicId
                                                                    );
                                                                }
                                                            } // end for totalRootTopicUnreadCounts.length
                                                            if (context == 'coursepage') {
                                                                for (
                                                                    var q = 0;
                                                                    q < uniqueTotalRootTopicUnreadCounts.length;
                                                                    q++
                                                                ) {
                                                                    mmooc.discussionTopics.printUnreadCountOnIcon(
                                                                        uniqueTotalRootTopicUnreadCounts[q]
                                                                            .unreadCount,
                                                                        uniqueTotalRootTopicUnreadCounts[q]
                                                                            .rootTopicId
                                                                    );
                                                                }
                                                            }
                                                            if (context == 'discussionslist') {
                                                                mmooc.discussionTopics.printUnreadCountInDiscussionsList(
                                                                    uniqueTotalRootTopicUnreadCounts
                                                                );
                                                            } // end if discussions list
                                                        } // end if coursepage or discussions list
                                                    } // end if asyncsDone
                                                }); // end group discussion topics async call
                                            } // end if group name equals section name
                                        } // end for sectionNames.length
                                    } // end for groups.length
                                }); // end for groups in course async call
                            } // end if asyncsDone
                        }); // end section async call
                    } // end for enrollments.length
                }); // end enrollments async call
            } // end if teacher or admin
            // if student
            else {
                mmooc.api.getUserGroups(function (groups) {
                    if (groups.length == 0 && totalUnread > 0) {
                        mmooc.discussionTopics.printUnreadCountInTab(totalUnread);
                    }
                    for (var i = 0; i < groups.length; i++) {
                        for (var j = 0; j < groupDiscussionTopics.length; j++) {
                            if (
                                groups[i].course_id == courseId &&
                                groups[i].group_category_id ==
                                groupDiscussionTopics[j].group_category_id
                            ) {
                                groupId = groups[i].id;
                                mmooc.api.getGroupDiscussionTopics(groupId, function (
                                    discussions
                                ) {
                                    var totalRootTopicUnreadCounts = [];
                                    for (var k = 0; k < discussions.length; k++) {
                                        if (discussions[k].unread_count > 0) {
                                            if (context == 'coursepage') {
                                                mmooc.discussionTopics.printUnreadCountOnIcon(
                                                    discussions[k].unread_count,
                                                    discussions[k].root_topic_id
                                                );
                                            }
                                            if (context == 'discussionslist') {
                                                var totalRootTopicUnreadCountsObj = {
                                                    rootTopicId: discussions[k].root_topic_id,
                                                    unreadCount: discussions[k].unread_count
                                                };
                                                totalRootTopicUnreadCounts.push(
                                                    totalRootTopicUnreadCountsObj
                                                );
                                            }
                                            totalUnread += discussions[k].unread_count;
                                        }
                                    }
                                    if (totalUnread > 0) {
                                        mmooc.discussionTopics.printUnreadCountInTab(totalUnread);
                                    }
                                    if (context == 'discussionslist') {
                                        mmooc.discussionTopics.printUnreadCountInDiscussionsList(
                                            totalRootTopicUnreadCounts
                                        );
                                    }
                                }); // end group discussions async call
                                break;
                            }
                        } // end for groupDiscussionTopics.length
                    } // end for groupDiscussionTopics.length
                }); // end user groups async call
            }
        },
        getDiscussionItems: function (modules) {
            var discussionItems = [];
            for (var i = 0; i < modules.length; i++) {
                for (var j = 0; j < modules[i].items.length; j++) {
                    if (modules[i].items[j].type == 'Discussion') {
                        discussionItems.push(modules[i].items[j]);
                    }
                }
            }
            return discussionItems;
        },
        printUnreadCountOnIcon: function (unread, discussionId) {
            $('.discussion-unread-tag.discussion-id-' + discussionId).html(
                "<div class='discussion-unread-value discussion-unread-item'>" +
                unread +
                '</div>'
            );
        },
        printUnreadCountInTab: function (totalUnread) {
            $('.mmooc-course-tab a').each(function () {
                if ($(this).text() == 'Diskusjoner') {
                    $(this)
                        .parent()
                        .append(
                            "<div class='discussion-unread-value discussion-unread-tab'>" +
                            totalUnread +
                            '</div>'
                        );
                }
            });
        },
        printUnreadCountInDiscussionsList: function (groupDiscussionsUnreadCount) {
            var checkExist = setInterval(function () {
                if ($('#open-discussions .ig-list .discussion').length) {
                    clearInterval(checkExist);
                    $('#open-discussions .ig-list .discussion').each(function () {
                        for (var i = 0; i < groupDiscussionsUnreadCount.length; i++) {
                            if (
                                $(this).attr('data-id') ==
                                groupDiscussionsUnreadCount[i].rootTopicId
                            ) {
                                $(this)
                                    .find('.new-items')
                                    .text(groupDiscussionsUnreadCount[i].unreadCount);
                                $(this).addClass('unread');
                            }
                        }
                    });
                    mmooc.discussionTopics.showUnreadCountInDiscussionList();
                }
            }, 100);
        },
        hideUnreadCountInDiscussionList: function () {
            var checkExist = setInterval(function () {
                if ($('#open-discussions .ig-list .discussion').length) {
                    clearInterval(checkExist);
                    $('#open-discussions .ig-list .discussion').each(function () {
                        $(this)
                            .find('.new-items')
                            .hide();
                        $(this)
                            .find('.new-items')
                            .parent()
                            .prepend("<span class='loading-gif loading-unread'></span>");
                    });
                }
            }, 100);
        },
        showUnreadCountInDiscussionList: function () {
            $('#open-discussions .ig-list .discussion .loading-gif').remove();
            $('#open-discussions .ig-list .discussion').each(function () {
                $(this)
                    .find('.new-items')
                    .show();
            });
        },
        injectReplyButtonAction(userGroups) {
            const action = () => mmooc.util.tinyMceEditorIsInDOM(
                    () => mmooc.tinyMCEEditor.injectGroupHashtags(userGroups)
                );

            const button = document.querySelector("#discussion_topic > div.discussion-entry-reply-area.reply-box-container.hide-if-collapsed.hide-if-replying > a");
            if (button !== null) {
                button.addEventListener("click", action);
            }

            const subReplyButtons = document.querySelectorAll('#discussion_subentries > ul > li > div.bottom-reply-with-box > div.discussion-entry-reply-area.reply-box-container.hide-if-collapsed.hide-if-replying > a');
            for (let i = 0; i<subReplyButtons.length; i++){
                const subReplyButton = subReplyButtons[i];
                subReplyButton.addEventListener("click", action)
            }
        }
    };
})();
