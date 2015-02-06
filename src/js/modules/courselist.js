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
            var button = $('#start_new_course');
            if (button.size() > 0) {
                $('#content').append(button);
            }
        }
    };
}();
