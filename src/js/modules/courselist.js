this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId) {
            mmooc.api.getEnrolledCourses(function (courses) {
                if (document.getElementsByClassName('reaccept_terms').length === 0) {

                    var sortedCourses = mmooc.util.arraySorted(courses, "course_code"),
                        html = mmooc.util.renderTemplateWithData("courselist", {courses: sortedCourses});
                    document.getElementById(parentId).innerHTML = html;

                    var createCallBackForId = function(id) {
                        return function(modules) {
                            if (mmooc.courseList.isCourseCompleted(modules)) {
                                var $course = $("#course_" + id);
                                $course.find('.mmooc-course-list-button .btn').addClass('btn-done');
                                $course.find('.mmooc-progress-bar').addClass('mmooc-progress-bar-done');
                            }
                        };
                    };

                    var error = function(error) {
                        console.error("error calling api, skip over this course", error);
                    };

                    $(sortedCourses).each(function() {
                        var success =  createCallBackForId(this.id);
                        mmooc.api.getModulesForCourseId(success, error, this.id);
                    });
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
        },
        isCourseCompleted: function(modules) {
            for (var i = 0; i < modules.length; i++) {
                var module = modules[i];
                for (var j = 0; j < module.items.length; j++) {
                    var item = module.items[j];
                    if (item.completion_requirement && !item.completion_requirement.completed) {
                        return false;
                    }
                }
            }
            return true;
        }
    };
}();
