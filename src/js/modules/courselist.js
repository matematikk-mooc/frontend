import LoadingIndicator from "../../vue/components/loading-indicator/LoadingIndicator.vue";
import MyCoursesPage from "../../vue/pages/MyCoursesPage.vue";
import api from "../api/api";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import kpasApi from '../api/kpas-api';
import { renderPrivacyPolicyLink } from "../../vue/pages/courselist-page";
import enroll from './enroll.js';
import util from "./util";

export default (function () {
  return {
    listCourses(parentId, callback) {
      if (document.getElementsByClassName("reaccept_terms").length === 0) {
        document.getElementById('content').innerHTML = '';
        let loader = document.createElement('div');
        loader.id = 'loader';
        let header = document.getElementById("header");
        let loaderComponent = createApp(LoadingIndicator);
        header.insertAdjacentElement('afterend', loader);
        loaderComponent.mount("#loader");

        util.fetchWithSwr("frontpage_courses", enroll.fetchFrontpageCourses, function(frontpageData) {
          if (frontpageData && frontpageData.result) {
            enroll.withEnrolledCourses(enroll.setCourseEnrolledStatus, frontpageData.result, function(dataWithEnrolled) {
              let allCoursesSettings = dataWithEnrolled.settings;
              let courses = enroll.filterOnlyEnrolledCourses(dataWithEnrolled.courses);
              let myCoursesWithSettings = util.mapCourseSettings(courses, allCoursesSettings);

              if (courses.length == 0) {
                window.location.href = "/search/all_courses";
              } else {
  
  
                let wrapper = document.getElementById("application");
                try {
                  if(wrapper != null){
                    myCoursesWithSettings.forEach(course => {
                      course.enrolled = true;
                    });
                    const app = createApp(MyCoursesPage, {courses: myCoursesWithSettings});
  
                    let myCourses = wrapper.appendChild(document.createElement("div"));
                    myCourses.setAttribute("id", "my-courses-container");
                    myCourses.setAttribute("style", "width: 100%; justify-content: center; min-height: 85vh;");
                    let footerNode = document.getElementById("wrapper");
                    footerNode.parentNode.insertBefore(myCourses, footerNode);
                    document.getElementById('wrapper').innerHTML = ''
                    $('#wrapper').remove();
                    document.getElementById('loader').remove();
                    app.mount("#my-courses-container");
  
                  }
                }
                catch(err) {
                  console.error(err);
                }
  
              }
              $.isFunction(callback) && callback();
            }, true);
          }
        });
      } else {
        renderPrivacyPolicyLink('terms_of_service_link');
      }

    },
    isCourseCompleted(modules) {
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        for (let j = 0; j < module.items.length; j++) {
          const item = module.items[j];
          if (
            item.completion_requirement &&
            !item.completion_requirement.completed
          ) {
            return false;
          }
        }
      }
      return true;
    },
  };
})();
