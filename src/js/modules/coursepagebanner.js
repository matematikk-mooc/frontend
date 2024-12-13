import CoursePageBanner from '../../vue/components/course-page-banner/CoursePageBanner.vue';
import api from '../api/api';
import coursepage from './coursepage';
import { createApp } from 'vue';
import kpasApi from '../api/kpas-api';

export default (function () {
  return {
    insertCourseBanner: function (courseId, courseUnenrollmentUuid) {
      let currentCourseId = ENV.COURSE_ID
        ? ENV.COURSE_ID
        : ENV.course_id
          ? ENV.course_id
          : ENV.COURSE.id;
      let isEnrolled = ENV.current_user_is_student
        ? ENV.current_user_is_student || ENV.COURSE.is_student
        : false;
      let isFrontPage = false;
      if (window.location.pathname == '/courses/' + currentCourseId) {
        isFrontPage = true;
      }
      api.getCourse(currentCourseId, function (course) {
        kpasApi.getSettingsCurrentCourse(currentCourseId, function (settings) {
          console.log(
            'Course settings',
            course?.image_download_url,
            settings.image.path,
          );

          let wrapper = document.getElementById('wrapper');
          let parent = wrapper.parentNode;

          const app = createApp(CoursePageBanner, {
            theme: settings.course_category.category.color_code,
            imageUrl:
              course?.image_download_url != null
                ? course?.image_download_url
                : settings.image.path,
            title: course.name,
            isEnrolled: isEnrolled,
            isFrontPage: isFrontPage,
            languages: settings.multilang.toLowerCase(),
            courseId: courseId,
            unenrollmentUuid: courseUnenrollmentUuid,
          });
          let coursePageBannerWrapper = document.createElement('div');
          coursePageBannerWrapper.id = 'course-page-banner-wrapper';
          parent.insertBefore(coursePageBannerWrapper, wrapper);
          app.mount('#course-page-banner-wrapper');
          coursepage.overrideUnregisterDialog();
        });
      });
    },
  };
})();
