this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId) {
            mmooc.api.getEnrolledCourses(function(courses) {
                console.log(courses);
                var html = mmooc.util.renderTemplateWithData("courselist", {courses: courses});
                document.getElementById(parentId).innerHTML = html;
            });
        }
    };
}();
