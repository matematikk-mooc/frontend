import MyCoursesPage from "../../vue/pages/MyCoursesPage.vue";
import api from "../api/api";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import enrollprivacypolicy from "../../templates/modules/enrollprivacypolicy.hbs";
import kpasApi from '../api/kpas-api';
import settings from "../settings";
import util from "./util";

export default (function () {
  return {
    listCourses(parentId, callback) {
      if (document.getElementsByClassName("reaccept_terms").length === 0) {
        let htmlLoading = `<div class='loading-gif-wrapper'><span class='loading-gif'></span></div>`;
        document.getElementById('content').innerHTML = htmlLoading; //Show loader whhil loading courses'

        api.getEnrolledCourses((courses) => {
          kpasApi.getAllCourseSettings(function (allCoursesSettings) {
            var myCoursesWithSettings = util.mapCourseSettings(courses, allCoursesSettings.result);

            if (myCoursesWithSettings.length == 0) {
              // TODO: Insert not assigned to any courses component
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
                  myCourses.setAttribute("style", "width: 100%; justify-content: center; display: flex; min-height: 85vh;");
                  let footerNode = document.getElementById("wrapper");
                  footerNode.parentNode.insertBefore(myCourses, footerNode);
                  document.getElementById('wrapper').innerHTML = ''
                  $('#wrapper').remove();
                  app.mount("#my-courses-container");

                }
              }
              catch(err) {
                console.error(err);
              }

            }
            $.isFunction(callback) && callback();
          });
        });
      } else {
        html = util.renderTemplateWithData(enrollprivacypolicy, {
          privacypolicylink: settings.privacyPolicyLink,
        });

        $(".terms_of_service_link").html(html);
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
