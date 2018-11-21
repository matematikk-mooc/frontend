this.mmooc = this.mmooc || {};

this.mmooc.courseList = (function() {
  return {
    listCourses: function(parentId, callback) {
      if (document.getElementsByClassName('reaccept_terms').length === 0) {
        mmooc.api.getEnrolledCourses(function(courses) {
          var $oldContent = $('#' + parentId).children(); //After an update the 'Add course button' is in #content including a popupform. So we need to move this to another place in the DOM so we don't overwrite it.
          $oldContent.appendTo('#right-side-wrapper #right-side');

          $('#' + parentId).html(
            '<div>Laster ' +
              mmooc.i18n.CoursePlural.toLowerCase() +
              '....</div>'
          ); //overwrite the contents in parentID and display: 'Laster kurs....'

          var html = '';

          if (courses.length == 0) {
            html =
              '<h1>Mine ' +
              mmooc.i18n.CoursePlural.toLowerCase() +
              '</h1>' +
              '<p>' +
              mmooc.i18n.NoEnrollments +
              '</p>' +
              "<a class='btn' href='/search/all_courses'>Se tilgjengelige " +
              mmooc.i18n.CoursePlural.toLowerCase() +
              '</a>';
            $('#' + parentId).html(html);
          } else {
            html = mmooc.util.renderTemplateWithData('courselistcontainer', {
              courseLabel: mmooc.i18n.CoursePlural.toLowerCase()
            });
            $('#' + parentId).html(html);

            var sortedCourses = mmooc.util.arraySorted(courses, 'course_code');

            var categorys = mmooc.util.getCourseCategories(sortedCourses);

            var coursesCategorized = mmooc.util.getCoursesCategorized(
              sortedCourses,
              categorys
            );

            for (var i = 0; i < coursesCategorized.length; i++) {
              html = mmooc.util.renderTemplateWithData('courselist', {
                title: coursesCategorized[i].title,
                courses: coursesCategorized[i].courses,
                courseLabel: mmooc.i18n.Course.toLowerCase()
              });
              $('.mmooc-course-list-container').append(html);
            }
          }
          document.title = mmooc.i18n.CoursePlural;

          if ($.isFunction(callback)) {
            callback();
          }
        });
      }
    },
    showAddCourseButton: function() {
      // Move canvas Start new course button, since we hide its original location
      var $button = $('#start_new_course');
      if ($button.length) {
        $('#content').append($button);
        $button.html(mmooc.i18n.AddACourse);
      }
    },
    showFilter: function(sortedCourses) {
      // Show filter options based on first part of course code
      var filterOptions = ['Alle'];
      $(sortedCourses).each(function(index) {
        var values = sortedCourses[index].course_code.split('::');
        if (values.length > 1) {
          if (filterOptions.indexOf(values[0]) == -1) {
            filterOptions.push(values[0]);
          }
        }
      });
      filterOptions.push('Andre');
      var options = '';
      for (var i = 0; i < filterOptions.length; i++) {
        options +=
          '<option value="' +
          filterOptions[i] +
          '">' +
          filterOptions[i] +
          '</option>';
      }
      $('#filter').append(options);
    },
    applyFilter: function(sortedCourses) {
      if ($('#filter').val() == 'Alle') {
        $(sortedCourses).each(function() {
          $('#course_' + this.id).show();
        });
      } else if ($('#filter').val() == 'Andre') {
        $(sortedCourses).each(function() {
          if (this.course_code.indexOf('::') >= 0) {
            $('#course_' + this.id).hide();
          } else {
            $('#course_' + this.id).show();
          }
        });
      } else {
        $(sortedCourses).each(function() {
          var courseCode = this.course_code.split('::')[0];
          if ($('#filter').val() == courseCode) {
            $('#course_' + this.id).show();
          } else {
            $('#course_' + this.id).hide();
          }
        });
      }
    },
    isCourseCompleted: function(modules) {
      for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        for (var j = 0; j < module.items.length; j++) {
          var item = module.items[j];
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
