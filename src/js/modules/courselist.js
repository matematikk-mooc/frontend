this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId) {
            mmooc.api.getEnrolledCourses(function(courses) {
              if (document.getElementsByClassName('reaccept_terms').length === 0) {
                var sortedCourses = mmooc.util.arraySorted(courses, "course_code"),
                    html = mmooc.util.renderTemplateWithData("courselist", {courses: sortedCourses});
                document.getElementById(parentId).innerHTML = html;
              }
            });
        },
        showAddCourseButton : function() {
            $(document).ajaxSuccess(function () {
                // Move canvas Start new course button, since we hide its original location
                var button = $('#start_new_course');
                if (button.size() > 0) {
                    $('#content').append(button);
                }
            });
        }
    };
}();
