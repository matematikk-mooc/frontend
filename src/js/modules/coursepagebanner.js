import CoursePageBanner from "../../vue/components/course-page-banner/CoursePageBanner.vue";
import api from "../api/api";
import { createApp } from "vue";
import kpasApi from "../api/kpas-api";

export default (function() {
    return {
    insertCourseBanner: function () {
        let currentCourseId  = ENV.COURSE_ID? ENV.COURSE_ID : ENV.COURSE.id;
        api.getCourse (currentCourseId, function(course) {
            kpasApi.getSettingsCurrentCourse(currentCourseId, function(settings) {

                let wrapper = document.getElementById("wrapper");
                let parent = wrapper.parentNode;

                const app = createApp(CoursePageBanner, {
                    theme: settings.course_category.category.color_code,
                    imageUrl: settings.image.path,
                    title: course.name,
                });
                let coursePageBannerWrapper = document.createElement("div");
                coursePageBannerWrapper.id =  "course-page-banner-wrapper";
                parent.insertBefore(coursePageBannerWrapper, wrapper);
                app.mount("#course-page-banner-wrapper");

            });

    });
    }
    }
})();
