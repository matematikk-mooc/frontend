this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId) {
            var courses = [{
                    title: "Kurs 1",
                    url: "/courses/18"
                },
                {
                    title: "Kurs 2",
                    url: "/courses/18"
                }];

            var html = mmooc.util.renderTemplateWithData("courselist", {courses: courses});
            document.getElementById(parentId).innerHTML = html;
        }
    };

}();

