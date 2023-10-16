import '../css/loader.css';

import MyCoursesPage from "../../vue/pages/MyCoursesPage.vue";
import api from "../api/api";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
import enrollprivacypolicy from "../../templates/modules/enrollprivacypolicy.hbs";
import i18n from "../i18n";
import settings from "../settings";
import util from "./util";

export default (function () {
  return {
    listCourses(parentId, callback) {
      if (document.getElementsByClassName("reaccept_terms").length === 0) {
        let htmlLoading = `<div class='loading-gif-wrapper'><span class='loading-gif'></span></div>`;
        document.getElementById('wrapper').innerHTML = htmlLoading; //Show loader whhil loading courses'

        api.getEnrolledCourses((courses) => {
          if (courses.length == 0) {
            // TODO: Insert not assigned to any courses component
          } else {


            let wrapper = document.getElementById("application");
            try {
              if(wrapper != null){
                courses.forEach(course => {
                  course.enrolled = true;
                });
                const app = createApp(MyCoursesPage, {courses: courses});

                let myCourses = wrapper.appendChild(document.createElement("div"));
                myCourses.setAttribute("id", "my-courses-container");
                myCourses.setAttribute("style", "width: 100%; justify-content: center; display: flex;");
                let footerNode = document.getElementById("wrapper");
                footerNode.parentNode.insertBefore(myCourses, footerNode);
                document.getElementById('wrapper').innerHTML = ''
                $('#wrapper').hide();
                app.mount("#my-courses-container");

              }
            }
            catch(err) {
              console.error(err);
            }

          }
          $.isFunction(callback) && callback();
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
