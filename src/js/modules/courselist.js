this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId, callback) {
	        if (document.getElementsByClassName('reaccept_terms').length === 0) {
            	mmooc.api.getEnrolledCourses(function (courses) {
				
                    var sortedCourses = mmooc.util.arraySorted(courses, "course_code");
                    html = mmooc.util.renderTemplateWithData("courselist", {courses: sortedCourses});
                    document.getElementById(parentId).innerHTML = html;

//Additional check if course if completed. Not in use since course_progress(check implemented in template) seems to be working as expected. (Not able to reproduce errors).
/*
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
*/
                
	                if ($.isFunction(callback)) {
	                    callback();
	                }
            	});
				mmooc.api.getEnrolledCoursesProgress(function (courses) {
	                
                    var sortedCourses = mmooc.util.arraySorted(courses, "course_code");
                    
                    $(sortedCourses).each(function() {
                        var $course = $("#course_" + this.id + " .mmooc-course-list-description");
						html = mmooc.util.renderTemplateWithData("courselistprogress", {course: this});
                        $course.after(html);          
                    });					

                    var error = function(error) {
                        console.error("error calling api, skip over this course", error);
                    };

            	});
            	
            }
                   
        },
        showAddCourseButton : function() {
            // Move canvas Start new course button, since we hide its original location
            var $button = $('#right-side-wrapper #start_new_course');
            if ($button.length) {
                $('#content').append($button);
            }
        },
        isCourseCompleted: function(modules) {
	        console.log(modules);
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
