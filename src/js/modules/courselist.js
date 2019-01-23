this.mmooc = this.mmooc || {};

this.mmooc.courseList = (() => {
  return {
    listCourses(parentId, callback) {
      if (document.getElementsByClassName('reaccept_terms').length === 0) {
        mmooc.api.getEnrolledCourses(courses => {
          const $oldContent = $(`#${parentId}`).children(); //After an update the 'Add course button' is in #content including a popupform. So we need to move this to another place in the DOM so we don't overwrite it.
          $oldContent.appendTo('#right-side-wrapper #right-side');
          $(`#${parentId}`).html(
            `<div>Laster ${mmooc.i18n.CoursePlural.toLowerCase()}....</div>`
          ); //overwrite the contents in parentID and display: 'Laster kurs....'
          let html = '';
          let linkToAvailableCourses = mmooc.util.getLinkToAvailableCourses(); 
          if (courses.length == 0) {
            html = `<h1>Mine ${mmooc.i18n.CoursePlural.toLowerCase()}</h1><p>${
              mmooc.i18n.NoEnrollments
            }</p><a class='btn' href='${linkToAvailableCourses}'>Se tilgjengelige ${mmooc.i18n.CoursePlural.toLowerCase()}</a>`;
            $(`#${parentId}`).html(html);
          } else {
            html = mmooc.util.renderTemplateWithData('courselistcontainer', {
              courseLabel: mmooc.i18n.CoursePlural.toLowerCase()
            });
            $(`#${parentId}`).html(html);
            const sortedCourses = mmooc.util.arraySorted(
              courses,
              'course_code'
            );
            const categorys = mmooc.util.getCourseCategories(sortedCourses);
            const coursesCategorized = mmooc.util.getCoursesCategorized(
              sortedCourses,
              categorys
            );

            coursesCategorized.forEach(course => {
              html = mmooc.util.renderTemplateWithData('courselist', {
                title: course.title,
                courses: course.courses,
                courseLabel: mmooc.i18n.Course.toLowerCase()
              });
              $('.mmooc-course-list-container').append(html);
            });
          }
          document.title = mmooc.i18n.CoursePlural;

          $.isFunction(callback) && callback();
        });
      }
    },
    showAddCourseButton() {
      // Move canvas Start new course button, since we hide its original location
      const $button = $('#start_new_course');
      if ($button.length) {
        $('#content').append($button);
        $button.html(mmooc.i18n.AddACourse);
      }
    },
    showFilter(sortedCourses) {
      // Show filter options based on first part of course code
      const filterOptions = ['Alle'];
      $(sortedCourses).each(index => {
        const values = sortedCourses[index].course_code.split('::');
        if (values.length > 1) {
          if (filterOptions.indexOf(values[0]) == -1)
            filterOptions.push(values[0]);
        }
      });
      filterOptions.push('Andre');
      const options = '';
      filterOptions.forEach(option => {
        options += `<option value="${option}">${option}</option>`;
      });
      $('#filter').append(options);
    },
    applyFilter(sortedCourses) {
      if ($('#filter').val() == 'Alle') {
        $(sortedCourses).each(function() {
          $(`#course_${this.id}`).show();
        });
      } else if ($('#filter').val() == 'Andre') {
        $(sortedCourses).each(() => {
          if (this.course_code.indexOf('::') >= 0) {
            $(`#course_${this.id}`).hide();
          } else {
            $(`#course_${this.id}`).show();
          }
        });
      } else {
        $(sortedCourses).each(() => {
          const courseCode = this.course_code.split('::')[0];
          if ($('#filter').val() == courseCode) {
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
    }
  };
})();
