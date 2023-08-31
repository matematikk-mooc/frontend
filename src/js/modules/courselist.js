import NotLoggedInPage from "../../vue/pages/NotLoggedInPage.vue";
import api from "../api/api";
import courselist from "../../templates/modules/courselist.hbs";
import courselistcontainer from "../../templates/modules/courselistcontainer.hbs";
import { createApp } from "vue/dist/vue.runtime.esm-browser.prod.js";
import enrollprivacypolicy from "../../templates/modules/enrollprivacypolicy.hbs";
import { hrefQueryString } from "../settingsRoot";
import i18n from "../i18n";
import settings from "../settings";
import util from "./util";

export default (function () {
  return {
    listCourses(parentId, callback) {
      if (document.getElementsByClassName("reaccept_terms").length === 0) {
        let htmlLoading = `<div class='mmooc-loader-wrapper'><span class='loading-gif'></span></div>`;
        $(`#${parentId}`).html(htmlLoading); //overwrite the contents in parentID and display: 'Laster kurs....'

        api.getEnrolledCourses((courses) => {
          $(".mmooc-loader-wrapper").remove();

          const $oldContent = $(`#${parentId}`).children(); //After an update the 'Add course button' is in #content including a popupform. So we need to move this to another place in the DOM so we don't overwrite it.
          $oldContent.appendTo("#right-side-wrapper #right-side");
          let html = "";
          let linkToAvailableCourses = util.getLinkToAvailableCourses();
          // if (courses.length == 0) {
          //   html = `<h1>Mine ${i18n.CoursePlural.toLowerCase()}</h1><p>${
          //     i18n.NoEnrollments
          //   }</p><a class='btn' href='${linkToAvailableCourses}'>Se tilgjengelige ${i18n.CoursePlural.toLowerCase()}</a>`;
          //   $(`#${parentId}`).html(html);
          // } else {
            // html = util.renderTemplateWithData(courselistcontainer, {
            //   courseLabel: i18n.CoursePlural.toLowerCase(),
            //   queryString: hrefQueryString
            // });
            // $(document).ready(function() {
            let id = document
              .getElementById("wrapper")
              .appendChild(document.createElement("div"));
            let page = createApp(NotLoggedInPage);
            console.error(id);
            console.error(page);
            id.setAttribute("id", "notLoggedInPage");
            id.setAttribute("style", "height: 100vh");
            page.mount("#notLoggedInPage");
            // });
            /*
            const sortedCourses = util.arraySorted(
              courses,
              'course_code'
            );
            */
            // const sortedCourses = util.sortCourses(courses);
            // const categorys = util.getCourseCategories(sortedCourses);
            // const coursesCategorized = util.getCoursesCategorized(
            //   sortedCourses,
            //   categorys
            // );

            // coursesCategorized.forEach((course) => {
            //   html = util.renderTemplateWithData(courselist, {
            //     title: course.title,
            //     courses: course.courses,
            //     courseLabel: i18n.Course.toLowerCase(),
            //   });
            //   $(".mmooc-course-list-container").append(html);
            // });
            // util.updateProgressForRoleBasedCourses(courses);
          // }
          document.title = i18n.CoursePlural;

          $.isFunction(callback) && callback();
        });
      } else {
        html = util.renderTemplateWithData(enrollprivacypolicy, {
          privacypolicylink: settings.privacyPolicyLink,
        });

        $(".terms_of_service_link").html(html);
      }

    },
    showAddCourseButton() {
      // Move canvas Start new course button, since we hide its original location
      const $button = $("#start_new_course");
      if ($button.length) {
        $("#content").append($button);
        $button.html(i18n.AddACourse);
      }
    },
    showFilter(sortedCourses) {
      // Show filter options based on first part of course code
      const filterOptions = ["Alle"];
      $(sortedCourses).each((index) => {
        const values = sortedCourses[index].course_code.split("::");
        if (values.length > 1) {
          if (filterOptions.indexOf(values[0]) == -1)
            filterOptions.push(values[0]);
        }
      });
      filterOptions.push("Andre");
      const options = "";
      filterOptions.forEach((option) => {
        options += `<option value="${option}">${option}</option>`;
      });
      $("#filter").append(options);
    },
    applyFilter(sortedCourses) {
      if ($("#filter").val() == "Alle") {
        $(sortedCourses).each(function () {
          $(`#course_${this.id}`).show();
        });
      } else if ($("#filter").val() == "Andre") {
        $(sortedCourses).each(() => {
          if (this.course_code.indexOf("::") >= 0) {
            $(`#course_${this.id}`).hide();
          } else {
            $(`#course_${this.id}`).show();
          }
        });
      } else {
        $(sortedCourses).each(() => {
          const courseCode = this.course_code.split("::")[0];
          if ($("#filter").val() == courseCode) {
            $(`#course_${this.id}`).show();
          } else {
            $(`#course_${this.id}`).hide();
          }
        });
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
