import api from "../../api/api";

export async function getAllUnreadAnnouncementsForCourse() {
  const courseId = api.getCurrentCourseId();
  let totalUnread = 0;

  try {
    const announcements = await new Promise((resolve, reject) => {
      api.getAnnouncementsForCourse(courseId, (announcements) => {
        resolve(announcements);
      }, reject);
    });

    announcements.forEach((announcement) => {
      if (announcement.read_state === 'unread' || announcement.unread_count > 0) {
        totalUnread++;
      }
    });

    return {
      url: `/courses/${courseId}/announcements`,
      count: totalUnread,
    };
  } catch (error) {
    // Handle any errors, e.g., invalid URLs or API failures
    console.error('Error:', error);
    return {
      url: '',
      count: 0,
    };
  }
}


