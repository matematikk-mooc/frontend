this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId) {
            console.log("HERE");
            mmooc.api.getEnrolledCourses(function(foo) {
                console.log(foo);
                //var courses = foo;
                //var html = mmooc.util.renderTemplateWithData("courselist", {courses: courses});
                //document.getElementById(parentId).innerHTML = html;
            });
        }
    };
}();
