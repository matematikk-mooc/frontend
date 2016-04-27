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
	                
	                mmooc.courseList.showFilter(sortedCourses);
	                
	                $("#filter").change(function() {
		                mmooc.courseList.applyFilter(sortedCourses);
	                });
	                	                
            	});
				mmooc.api.getEnrolledCoursesProgress(function (courses) {
	                
                    var sortedCourses = mmooc.util.arraySorted(courses, "course_code");
                    
                    $(sortedCourses).each(function() {
                        var $course = $("#course_" + this.id + " .mmooc-course-list-description");
						html = mmooc.util.renderTemplateWithData("courselistprogress", {course: this});
                        $course.after(html);          
                    });					

            	});
            	
            }
                   
        },
        showAddCourseButton : function() {
            // Move canvas Start new course button, since we hide its original location
            var $button = $('#start_new_course');
            if ($button.length) {
                $('#content').append($button);
            }
        },
        showFilter : function(sortedCourses) {
	        // Show filter options based on first part of course code            
            var filterOptions = ["Alle"];           
            $(sortedCourses).each(function(index) {
	            var values = sortedCourses[index].course_code.split('-');    
	            if(values.length > 1) {
		            if(filterOptions.indexOf(values[0]) == -1) {
			            filterOptions.push(values[0]);
		            }		 
	        	}	        
        	});
        	filterOptions.push("Andre");
        	var selectList = "<select id='filter'></select>";
        	$('.mmooc-course-list h1').after(selectList);
        	
        	var option = '';
			for(var i=0; i<filterOptions.length; i++) {
				option += '<option value="' + filterOptions[i] + '">' + filterOptions[i] + '</option>';
			}
			$('#filter').append(option);                       
        },
        applyFilter : function(sortedCourses) {
			if($("#filter").val() == 'Alle') {
				$(sortedCourses).each(function() {
					$("#course_" + this.id).show();
				});
			}				
			else if($("#filter").val() == 'Andre') {
				$(sortedCourses).each(function() {
					if(this.course_code.indexOf("-") >= 0) {
						$("#course_" + this.id).hide();
					}
					else {
						$("#course_" + this.id).show();
					}						
				});
			}				
			else {			
				$(sortedCourses).each(function() {
					var courseCode = this.course_code.split('-')[0];
					if($("#filter").val() == courseCode) {
						$("#course_" + this.id).show();
					}
					else {
						$("#course_" + this.id).hide();
					}						
				});				
			}
        }        
/*
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
*/
    };
}();
