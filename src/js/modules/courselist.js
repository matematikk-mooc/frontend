this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId, callback) {
	        if (document.getElementsByClassName('reaccept_terms').length === 0) {
            	mmooc.api.getEnrolledCourses(function (courses) {
					
					var $oldContent = $('#' + parentId).children(); //After an update the 'Add course button' is in #content including a popupform. So we need to move this to another place in the DOM so we don't overwrite it.
					$oldContent.appendTo("#right-side-wrapper #right-side");
					
					$('#' + parentId).html("<div>Laster " + mmooc.i18n.CoursePlural + "....</div>"); //overwrite the contents in parentID and display: 'Laster kurs....'
                    if (courses.length == 0) {
                      var html = "<h1>Mine studier</h1>" +
                                  "<p>Du er ikke påmeldt noen kurs enda.</p>" +
                                  "<a class='btn' href='/search/all_courses'>Se tilgjengelige studier</a>";
                    }
                    else {
                      var sortedCourses = mmooc.util.arraySorted(courses, "course_code");
                      var html = mmooc.util.renderTemplateWithData("courselist", {courses: sortedCourses});
                    }
                    document.title = "Studier";
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
	                
	                	                
	                mmooc.courseList.showFilter(sortedCourses);
	                
	                $("#filter").change(function() {
		                mmooc.courseList.applyFilter(sortedCourses);
	                });
					
					if ($.isFunction(callback)) {
	                    callback();
	                }
	                	                
            	});
				mmooc.api.getEnrolledCoursesProgress(function (courses) {
	                
                    var sortedCourses = mmooc.util.arraySorted(courses, "course_code");
                    
                    $(sortedCourses).each(function() {
                        var $course = $("#course_" + this.id + " .mmooc-course-list-description");
						html = mmooc.util.renderTemplateWithData("courselistprogress", {navname: mmooc.i18n.GoToCourse, course: this});
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
                $button.html(mmooc.i18n.AddACourse);
            }
        },
        showFilter : function(sortedCourses) {
	        // Show filter options based on first part of course code            
            var filterOptions = ["Alle"];           
            $(sortedCourses).each(function(index) {
	            var values = sortedCourses[index].course_code.split('::');    
	            if(values.length > 1) {
		            if(filterOptions.indexOf(values[0]) == -1) {
			            filterOptions.push(values[0]);
		            }		 
	        	}	        
        	});
        	filterOptions.push("Andre");
        	var options = '';
    			for(var i=0; i<filterOptions.length; i++) {
    				options += '<option value="' + filterOptions[i] + '">' + filterOptions[i] + '</option>';
    			}
    			$('#filter').append(options);                       
            },
            applyFilter : function(sortedCourses) {
    			if($("#filter").val() == 'Alle') {
    				$(sortedCourses).each(function() {
    					$("#course_" + this.id).show();
    				});
    			}				
    			else if($("#filter").val() == 'Andre') {
    				$(sortedCourses).each(function() {
    					if(this.course_code.indexOf("::") >= 0) {
    						$("#course_" + this.id).hide();
    					}
    					else {
    						$("#course_" + this.id).show();
    					}						
    				});
    			}				
			else {			
				$(sortedCourses).each(function() {
					var courseCode = this.course_code.split('::')[0];
					if($("#filter").val() == courseCode) {
						$("#course_" + this.id).show();
					}
					else {
						$("#course_" + this.id).hide();
					}						
				});				
			}
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
