this.mmooc = this.mmooc || {};

this.mmooc.announcements = (() => {
  const hideMarkAsReadButton = () => {
    $('#markAllAsReadButton').hide();
    mmooc.menu.updateNotificationsForUser();
  };

  return {
    addMarkAsReadButton() {
      const contentId = mmooc.api.getCurrentTypeAndContentId().contentId;
      const courseId = mmooc.api.getCurrentCourseId();
      mmooc.api.getDiscussionTopic(courseId, contentId, discussionTopic => {
        if (discussionTopic.read_state !== 'read') {
          const buttonHTML = mmooc.util.renderTemplateWithData('actionbutton', {
            id: 'markAllAsReadButton',
            title: 'Marker som lest'
          });
          document
            .getElementById('content-wrapper')
            .insertAdjacentHTML('afterbegin', buttonHTML);
          $('#markAllAsReadButton').click(() => {
            mmooc.api.markDiscussionTopicAsRead(
              courseId,
              contentId,
              hideMarkAsReadButton
            );
          });
        }
      });
    },
    printAnnouncementsUnreadCount() {
      const courseId = mmooc.api.getCurrentCourseId();
      mmooc.api.getAnnouncementsForCourse(courseId, announcements => {
        let totalUnread = 0;
        announcements.forEach(announcement => {
          if (
            announcement.read_state == 'unread' ||
            announcement.unread_count > 0
          )
            totalUnread++;
        });
        totalUnread > 0 &&
          mmooc.announcements.printUnreadCountInTab(totalUnread);
      });
    },
    printUnreadCountInTab(totalUnread) {
      $('.mmooc-course-tab a').each(() => {
        $(this).text() == 'Kunngjøringer' &&
          $(this)
            .parent()
            .append(
              `<span class='discussion-unread-value discussion-unread-tab'>${totalUnread}</span>`
            );
      });
    },
    setAnnouncementsListUnreadClass() {
      const checkExist = setInterval(() => {
        if (
          $('body.announcements .discussionTopicIndexList .discussion-topic')
            .length
        ) {
          clearInterval(checkExist);
          $(
            'body.announcements .discussionTopicIndexList .discussion-topic'
          ).each(() => {
            const unread = $(this)
              .find('.new-items')
              .attr('title');
            if (unread.indexOf('Ingen uleste svar.') == -1) {
              $(this).addClass('unread');
              $(this).removeClass('read');
            }
          });
        }
      }, 100);
    }
  };
})();
