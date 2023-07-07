import actionbutton from "../../templates/modules/actionbutton.hbs"
import api from "../api/api";
import menu from "./menu";
import util from "./util";

export default (function() {
  const hideMarkAsReadButton = () => {
    $('#markAllAsReadButton').hide();
    menu.updateNotificationsForUser();
  };

  const elem = document.getElementById("keyboard-shortcut-modal-info");
  if (elem != null) {
    elem.removeAttribute("tabindex");
  }

  return {
    addMarkAsReadButton() {
      const contentId = api.getCurrentTypeAndContentId().contentId;
      const courseId = api.getCurrentCourseId();
      api.getDiscussionTopic(courseId, contentId, discussionTopic => {
        if (discussionTopic.read_state !== 'read') {
          const buttonHTML = util.renderTemplateWithData(actionbutton, {
            id: 'markAllAsReadButton',
            title: 'Marker som lest'
          });
          document
            .getElementById('content-wrapper')
            .insertAdjacentHTML('afterbegin', buttonHTML);
          $('#markAllAsReadButton').click(() => {
            api.markDiscussionTopicAsRead(
              courseId,
              contentId,
              hideMarkAsReadButton
            );
          });
        }
      });
    },
    printAnnouncementsUnreadCount() {
      const courseId = api.getCurrentCourseId();
      api.getAnnouncementsForCourse(courseId, announcements => {
        let totalUnread = 0;
        announcements.forEach(announcement => {
          if (
            announcement.read_state == 'unread' ||
            announcement.unread_count > 0
          )
            totalUnread++;
        });
        totalUnread > 0 &&
          this.printUnreadCountInTab(totalUnread);
      });
    },
    printUnreadCountInTab(totalUnread) {
      $('.mmooc-course-tab a').each(function() {
        $(this).text() == 'Kunngjøringer' &&
          $(this)
            .parent()
            .append(
              `<span class='discussion-unread-value discussion-unread-tab'>${totalUnread}</span>`
            );
        }
      );
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
