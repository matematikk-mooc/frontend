import LoadingIndicator from "../../vue/components/loading-indicator/LoadingIndicator.vue";
import MyCoursesPage from "../../vue/pages/MyCoursesPage.vue";
// import api from "../api/api";
import { createApp } from "vue/dist/vue.runtime.esm-bundler.js";
// import kpasApi from '../api/kpas-api';
import { renderPrivacyPolicyLink } from "../../vue/pages/courselist-page";
// import util from "./util";

import store from '../../vue/store/courses-page/index'

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

        let wrapper = document.getElementById("application");

        try {
          if(wrapper != null){
            const app = createApp(MyCoursesPage);
            app.use(store);

            let myCourses = wrapper.appendChild(document.createElement("div"));
            myCourses.setAttribute("id", "my-courses-container");
            myCourses.setAttribute("style", "width: 100%; justify-content: center; display: flex; min-height: 85vh;");
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
          renderPrivacyPolicyLink('terms_of_service_link');
        }
      }
    },



        // api.getEnrolledCourses((courses) => {
        // if(false) {
        // api.getEnrolledCourses(() => {
          // kpasApi.getAllCourseSettings(function (allCoursesSettings) {
            // var myCoursesWithSettings = util.mapCourseSettings(courses, allCoursesSettings.result);


            // if (courses.length == 0) {
            // if (false) {
              // window.location.href = "/search/all_courses?design=udir";
            // } else {


              // let wrapper = document.getElementById("application");
              // try {
                // if(wrapper != null){
                  // const app = createApp(MyCoursesPage);
                  // app.use(store);

                  // let myCourses = wrapper.appendChild(document.createElement("div"));
                  // myCourses.setAttribute("id", "my-courses-container");
                  // myCourses.setAttribute("style", "width: 100%; justify-content: center; display: flex; min-height: 85vh;");
                  // let footerNode = document.getElementById("wrapper");
                  // footerNode.parentNode.insertBefore(myCourses, footerNode);
                  // document.getElementById('wrapper').innerHTML = ''
                  // $('#wrapper').remove();
                  // document.getElementById('loader').remove();
                  // app.mount("#my-courses-container");

                // }
              // }
              // catch(err) {
                // console.error(err);
              // }

            // }
            // $.isFunction(callback) && callback();
          // });
        // });
      // }
          // else {
        // renderPrivacyPolicyLink('terms_of_service_link');
      // }
     // }

    // },

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
