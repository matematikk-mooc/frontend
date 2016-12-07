this.mmooc=this.mmooc||{};

this.mmooc.powerFunctions = function() {
  var rootId = undefined;

  function _render(template, heading, data) {
    var html =
          mmooc.util.renderTemplateWithData('powerfunctions/head', {heading: heading}) +
          mmooc.util.renderTemplateWithData(template, data) +
          mmooc.util.renderTemplateWithData('powerfunctions/tail', {});
      document.getElementById(rootId).innerHTML = html;
    }
  
  function AssignPeerReviewsForGroup() {

    function _renderView() {
      mmooc.api.getCoursesForUser(function(courses) {
        _render("powerfunctions/peer-review",
                "Assign peer reviews by group",
                {courses: courses});
        var peerReviewAssignments = [];
        $('#mmpf-course-select').change(function () {
          var courseID = $('#mmpf-course-select option:selected').val();
          mmooc.api.getGroupCategoriesForCourse(courseID, function(categories) {
            $('.step-2').css('display', 'list-item');
            $('.step-3').css('display', 'none');
            $('.step-4').css('display', 'none');
            var html = html + "<option value=''>Choose a group set</option>";
            for (var i = 0; i < categories.length; i++) {
              html = html + "<option value=" + categories[i].id + ">" + categories[i].name + "</option>";
            }
            $("#mmpf-category-select").html(html);
            $(".peer-review-list").html("");
          });
        });
        $('#mmpf-category-select').change(function () {
          var categoryID = $('#mmpf-category-select option:selected').val();
          mmooc.api.getGroupsInCategory(categoryID, function(groups) {
            $('.step-3').css('display', 'list-item');
            $('.step-4').css('display', 'none');
            var html = html + "<option value=''>Choose a group</option>";
            for (var i = 0; i < groups.length; i++) {
              html = html + "<option value=" + groups[i].id + ">" + groups[i].name + "</option>";
            }
            $("#mmpf-group-select").html(html);
            $(".peer-review-list").html("");
          });
        });
        $('#mmpf-group-select').change(function () {
          var courseID = $('#mmpf-course-select option:selected').val();
          mmooc.api.getAssignmentsForCourse(courseID, function(assignments) {
            for (var i = 0; i < assignments.length; i++) {
              if(assignments[i].peer_reviews) {
                peerReviewAssignments.push(assignments[i])
              }
            }
            var html = html + "<option value=''>Choose an assignment</option>";
            for (var j = 0; j < peerReviewAssignments.length; j++) {
              html = html + "<option value=" + peerReviewAssignments[j].id + ">" + peerReviewAssignments[j].name + "</option>";
            }
            $("#mmpf-assignment-select").html(html);
            $(".peer-review-list").html("");
            $('.step-4').css('display', 'list-item');
          });
        });
		$('#mmpf-assignment-select').change(function () {
  		var assignmentID = $('#mmpf-assignment-select option:selected').val();
  		for (var i = 0; i < peerReviewAssignments.length; i++) {
    		if(peerReviewAssignments[i].id == assignmentID) {
      		var activeAssignment = peerReviewAssignments[i];
    		}
  		}
  		var assignmentDue = new Date(activeAssignment.due_at);
  		if(typeof activeAssignment.peer_reviews_assign_at !== 'undefined') {
    		var peerReviewDue = new Date(activeAssignment.peer_reviews_assign_at);
    		peerReviewDue = ("0" + peerReviewDue.getDate()).slice(-2) + "." + ("0" + peerReviewDue.getMonth()).slice(-2) + "." + peerReviewDue.getFullYear();
  		}
  		else {
    		peerReviewDue = "Ikke satt";
  		}
  		assignmentDue = ("0" + assignmentDue.getDate()).slice(-2) + "." + ("0" + assignmentDue.getMonth()).slice(-2) + "." + assignmentDue.getFullYear();
  		var html = "<h3>" + activeAssignment.name + "</h3>" +
  		"<p><span class='bold'>Innleveringsfrist: </span>" + assignmentDue + 
  		"<br><span class='bold'>Hverandrevurderingsfrist: </span>" + peerReviewDue + "</p>";
  		$(".assignment-info").html(html);
			_listPeerReviewsForGroup(assignmentID);
			_showInput();
		});

      });
    }

    function _listPeerReviewsForGroup(assignmentID) {
	    $(".peer-review-list").html("<p>Laster hverandrevurderinger...</p>");
	    $("#progress").show();
	    $("#bar").width('0%');
	    var courseID = $('#mmpf-course-select option:selected').val();
	    var groupID = $('#mmpf-group-select option:selected').val();
	    var html = "<ul>";
	    var peerReveiwsInGroup = [];
	    var submitted = [];
	    var count = 0;
	    var asyncsDone = 0;
	    var inArray = false;
	    mmooc.api.getGroupMembers(groupID, function(members) {
		    $("#bar").width('50%');
		    mmooc.api.getPeerReviewsForAssignment(courseID, assignmentID, function(peerReviews) {
			    $("#bar").width('100%');
			    $(".peer-review-list").html("Laster besvarelser...");
			    $("#progress").show();
			    $("#bar").width('0%');
			    // Get submissions for users in group and push to array if workflow_state is submitted or graded
				for (var i = 0; i < members.length; i++) {
					mmooc.api.getSingleSubmissionForUser(courseID, assignmentID, members[i].id, function(submission) {
						if (submission.workflow_state == "submitted" || submission.workflow_state == "graded") {
							submitted.push(submission);
						}
						asyncsDone++;
						var width = (100 / members.length) * asyncsDone + "%";
						$("#bar").width(width);
						if (asyncsDone == members.length) {
							_renderList();
						}
					});
				}
				function _renderList() {
					// Traverse all peer reviews and group members	  	
			    	for (var i = 0; i < peerReviews.length; i++) {
				    	for (var j = 0; j < members.length; j++) {
					    	// Check if object is already in array			    	
					    	for (var k = 0; k < peerReveiwsInGroup.length; k++) {
						    	if(peerReveiwsInGroup[k] === peerReviews[i]) {
							    	inArray = true;
						    	}
						    }
						    // Push object to array if assesor is member of group and object not already in array	    	
				    		if (peerReviews.assessor_id == members.id && !inArray) {
					    		peerReveiwsInGroup[count] = peerReviews[i];
					    		count++;
				    		}
				    		inArray = false;
				    	}
				    }
				    inArray = false;			    			    			    
			    	for (var i = 0; i < members.length; i++) {
				    	count = 0;
				    	// List users and tag users without submissions
				    	if(submitted) {
					    	for (j = 0; j < submitted.length; j++) {
						    	// Check if user has submission
						    	if (submitted[j].user_id == members[i].id) {
							    	html = html + "<li>" + members[i].name + "</li><ul>";
							    	inArray = true;
							    	break;
						    	}
					    	}
							if (!inArray) {
							  	html = html + "<li>" + members[i].name + " <span class='no-submission'>Ikke levert besvarelse</span></li><ul>";
							}
				    	}else {
					    	html = html + "<li>" + members[i].name + "</li><ul>";
				    	}		    	
				    	for (var k = 0; k < peerReveiwsInGroup.length; k++) {
					    	if(members[i].id == peerReveiwsInGroup[k].assessor_id) {
						    	// List user name and tag peer review as completed/not completed
						    	if(peerReveiwsInGroup[k].workflow_state == "completed") {
						    		html = html + "<li>" + peerReveiwsInGroup[k].user.display_name  + " <span style='color:green;'>Fullført</span></li>";
						    	}else {
							    	html = html + "<li>" + peerReveiwsInGroup[k].user.display_name  + " <span style='color:red;'>Ikke fullført</span></li>";
						    	}
						    	count++;
					    	}
				    	}
				    	html = html + "</ul>";
				    	if(count == 0) {
					    	html = html + "<div>Ingen tildelt</div>";
				    	}
				    	inArray = false;	    			    	
				    }
				    $("#progress").hide();
				    $(".peer-review-list").html(html + "</ul>");
				    $('.input-wrapper').show();
					$('.btn-create-pr').click(function () {
						var numOfReviews = $('.number-of-reviews').val();
						// Create peer reviews for group after valitadion
						if (!_isNormalInteger(numOfReviews) || numOfReviews < 1) {
							alert("Antall gjennomganger må være et positivt heltall");
						}else if (numOfReviews > (submitted.length - 1)) {
							alert("For mange gjennomganger i forhold til antall besvarelser");
						}else {
							$('.input-wrapper').hide();
							_createPeerReviewsForGroup(courseID, assignmentID, numOfReviews, submitted);
						}	
					});	
				}			        			    
		    });       
		});	
    }
    
	function _createPeerReviewsForGroup(courseID, assignmentID, numOfReviews, submitted) {
		$(".peer-review-list").html("<p>Tildeler hverandrevurderinger...</p>");
		$("#progress").show();
		$("#bar").width('0%');
		asyncsDone = 0;
		var assigned = [];
		var assesorIndex;
		for (var j = 0; j < numOfReviews; j++) {
			for (var i = 0; i < submitted.length; i++) {				
				assesorIndex = (i + 1) + j;
				// Check if index exceeds array length
				if (assesorIndex >= submitted.length) {
					assesorIndex = assesorIndex - submitted.length;	
				}
				userID = submitted[assesorIndex].user_id;					
				mmooc.api.createPeerReview(courseID, assignmentID, submitted[i].id, userID, function(result) {					
					asyncsDone++;
					var width = (100 / (numOfReviews * submitted.length)) * asyncsDone + "%";
					$("#bar").width(width);
					if (asyncsDone == (submitted.length * numOfReviews)) {
						_listPeerReviewsForGroup();
					}
				});		
			}
		}			
	}
    
    function _isNormalInteger(str) {
    	return /^\+?(0|[1-9]\d*)$/.test(str);
	}
    
    function _showInput() {
	    $(".peer-review-create").html("<div class='input-wrapper'><input type='text' value='1' style='width:25px;' class='number-of-reviews'> gjennomganger per bruker<br><input type='button' value='Tildel hverandrevurderinger' class='button btn-create-pr'></div>");
    }

    return {
      run: function() {
        _renderView();
      }
    };
  }
  
  function ListStudentProgress() {
    var error = function(error) {
        console.error("error calling api", error);
    };
    	
    function _renderView() {    
      mmooc.api.getCoursesForUser(function(courses) {
        _render("powerfunctions/student-progress",
                "List student progress by section",
                {courses: courses});
        $('#mmpf-course-select').change(function () {
          var courseID = $('#mmpf-course-select option:selected').val();
          var params = { per_page: 999 };
          mmooc.api.getSectionsForCourse(courseID, params, function(sections) {
            $('.step-2').css('display', 'list-item');
            $('.step-3').css('display', 'none');
            var html = html + "<option value=''>Choose a section</option>";
            for (var i = 0; i < sections.length; i++) {
              html = html + "<option value=" + i + ">" + sections[i].name + "</option>";
            }
            $("#mmpf-section-select").html(html);
            $(".student-progress-table").html("");
          });
        });
        $('#mmpf-section-select').change(function () {
	      var courseID = $('#mmpf-course-select option:selected').val();
          mmooc.api.getModulesForCourseId(function(modules) {
            $('.step-3').css('display', 'list-item');
            var html = html + "<option value=''>Choose a module</option>";
            for (var i = 0; i < modules.length; i++) {
              html = html + "<option value=" + modules[i].id + ">" + modules[i].name + "</option>";
            }
            $("#mmpf-module-select").html(html);
            $(".student-progress-table").html("");
          }, error, courseID);
        });
		$('#mmpf-module-select').change(function () {
			_printStudentProgressForSection();
			$(".student-progress-table").html("");
		});

      });
    }
    
    function _printStudentProgressForSection() {
	    $("#progress").hide();
	    var courseID = $('#mmpf-course-select option:selected').val();
	    var moduleID = $('#mmpf-module-select option:selected').val();
	    var sectionIndex = $('#mmpf-section-select option:selected').val();
	    var sectionParams = { per_page: 999, "include": ["students"] };
	    var moduleParams = { per_page: 999 };
	    var html = "<table><tr><th>Navn</th>";
	    var asyncsDone = 0;
	    mmooc.api.getItemsForModuleId(function(items) {
		    for (var i = 0; i < items.length; i++) {
			    html = html + "<th>" + items[i].title + "</th>";
		    }
		    html = html + "</tr>";
		    mmooc.api.getSectionsForCourse(courseID, sectionParams, function(sections) {		
			    if(sections[sectionIndex].students.length < 1) {
				    $(".student-progress-table").html("Ingen studenter funnet i klasse " + sections[sectionIndex].name);
			    }    
			    for (var j = 0; j < sections[sectionIndex].students.length; j++) {				    
				    moduleParams = { student_id: sections[sectionIndex].students[j].id, per_page: 999 };
				    mmooc.api.getItemsForModuleId(function(itemsForStudent) {
    				    for(var l = 0; l < sections[sectionIndex].students.length; l++) {
        				    if (sections[sectionIndex].students[l].id == itemsForStudent[0].student_id) {
            				    html = html + "<tr><td>" + sections[sectionIndex].students[l].name + "</td>";
        				    }
    				    }
					    if(itemsForStudent.length < 1) {
						    html = html + "<td>Ingen krav</td>";
					    }
					    for (var k = 0; k < itemsForStudent.length; k++) {
						    if("completion_requirement" in itemsForStudent[k]) {
							    if(itemsForStudent[k].completion_requirement.completed) {
							    	html = html + "<td class='ok' />";
							    }else {
								    html = html + "<td class='nok' />";
							    }
						    }else {
							    html = html + "<td>Ingen krav</td>";
						    }
					    }
					    asyncsDone++;
					    var width = ((100 / sections[sectionIndex].students.length) * asyncsDone + "%");
					    $("#bar").width(width);
					    $("#progress").show();
					    if(asyncsDone == sections[sectionIndex].students.length) {
						    $("#progress").hide();
						    $(".student-progress-table").html(html + "</table>");
					    }
				    }, error, courseID, moduleID, moduleParams);
				    html = html + "</tr>";
			    }
			    
		    });
	    }, error, courseID, moduleID, moduleParams);
    }
  
    return {
      run: function() {
        _renderView();
      }
    };
  }  

  function Menu() {
    function _setUpClickHandlers() {
      $("#mmooc-pf-peer-review-btn").click(function() {
        new AssignPeerReviewsForGroup().run();
      });
      $("#mmooc-pf-student-progress-btn").click(function() {
        new ListStudentProgress().run();
      });
    }

    return {
      run: function() {
        try {
          _render("powerfunctions/mainteacher", "Choose function");
          _setUpClickHandlers();
        }
        catch (e) {
          alert (e.message);
          console.log(e);
        }
      }
    };
  }

  return {
    show: function(parentId) {
      rootId = parentId;
      new Menu().run();
    }
  };
}();

