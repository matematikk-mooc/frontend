this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId) {
            mmooc.api.getEnrolledCourses(function(courses) {
                var html = mmooc.util.renderTemplateWithData("courselist", {courses: courses});
                document.getElementById(parentId).innerHTML = html;
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
