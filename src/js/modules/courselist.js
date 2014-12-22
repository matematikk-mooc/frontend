this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId) {
            mmooc.api.getEnrolledCourses(function(courses) {
                var url = mmooc.api.getCurr
                var html = mmooc.util.renderTemplateWithData("courselist", {courses: courses, courseurl: url});
                document.getElementById(parentId).innerHTML = html;
            });
        }
    };
}();
