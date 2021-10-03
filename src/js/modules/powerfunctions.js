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
            $(".assignment-info").html("");
          });
        });
        $('#mmpf-category-select').change(function () {
          var categoryID = $('#mmpf-category-select option:selected').val();
          mmooc.api.getGroupsInCategory(categoryID, function(groups) {
            $('.step-3').css('display', 'list-item');
            $('.step-4').css('display', 'none');
            var html = html + "<option value='' disabled>Choose groups</option>";
            for (var i = 0; i < groups.length; i++) {
              html = html + "<option value=" + groups[i].id + ">" + groups[i].name + "</option>";
            }
            $("#mmpf-group-select").html(html);
            $(".peer-review-list").html("");
            $(".assignment-info").html("");
          });
        });
        $('#mmpf-group-select').change(function () {
          var courseID = $('#mmpf-course-select option:selected').val();
          mmooc.api.getAssignmentsForCourse(courseID, function(assignments) {
            peerReviewAssignments = [];
            for (var i = 0; i < assignments.length; i++) {
              if(assignments[i].peer_reviews) {
                peerReviewAssignments.push(assignments[i])
              }
            }
            var html = "<option value=''>Choose an assignment</option>";
            for (var j = 0; j < peerReviewAssignments.length; j++) {
              html = html + "<option value=" + peerReviewAssignments[j].id + ">" + peerReviewAssignments[j].name + "</option>";
            }
            $("#mmpf-assignment-select").html(html);
            $(".peer-review-list").html("");
            $(".assignment-info").html("");
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
      var selectedGroups = [];
      $("#mmpf-group-select option:selected").each(function(){
          selectedGroups.push(this);
      });
      $(".peer-review-list").html("");
			_listPeerReviewsForGroup(selectedGroups, assignmentID);
			_showInput();
		});

      });
    }

    function _listPeerReviewsForGroup(selectedGroups, assignmentID) {
      $(".peer-review-list").html("");
      $(".progress-info").html("<p>Laster hverandrevurderinger... (Kan ta opptil 1 minutt)</p>");
	    var courseID = $('#mmpf-course-select option:selected').val();
	    var html = "";
	    var peerReviewsInGroup = [];
	    var count = 0;
	    var asyncsDone = 0;
	    var inArray = false;
	    var groupIndex = 0;
	    var groupsMembers = [];
	    var allSubmitted = [];
	    var noOfAssignedPeerReviewsForStudent = [];
	    var noOfPeerReviewersForStudent = [];
      mmooc.api.getPeerReviewsForAssignment(courseID, assignmentID, function(peerReviews) {
		    for (var i = 0; i < selectedGroups.length; i++) {
		      mmooc.api.getGroupMembers(selectedGroups[i].value, function(members) {
    		    groupsMembers.push(members);
    		    asyncsDone++;
  			    $(".progress-info").html("Laster grupper");
  			    $("#progress").show();
  			    var width = (100 / selectedGroups.length) * asyncsDone + "%";
  			    $("#bar").width(width);
  			    if (asyncsDone == selectedGroups.length) {
    			    //Sort groups array based on selected groups array
    			    var groupsMembersSorted = [];
    			    for (var i = 0; i < selectedGroups.length; i++) {
          			    for (var j = 0; j < groupsMembers.length; j++) {
            			    if (selectedGroups[i].value == groupsMembers[j][0].group_id) {
              			        groupsMembersSorted.push(groupsMembers[j]);
                                break;
            			    }
          			    }
    			    }
    			    _findSubmissionsForGroups(groupsMembersSorted);
  			    }			        			    
		      });
		    }
        function _findSubmissionsForGroups(groupsMembers) {
		      var totalMembers = 0;
		      asyncsDone = 0;
		      // Find total members
		      for (var j = 0; j < groupsMembers.length; j++) {
      		      for (var i = 0; i < groupsMembers[j].length; i++) {
        		      totalMembers++;
      		      }
		      }
		      for (var j = 0; j < groupsMembers.length; j++) {
  		      // Get submissions for users in group and push to array if workflow_state is submitted or graded
    				for (var i = 0; i < groupsMembers[j].length; i++) {
    					mmooc.api.getSingleSubmissionForUser(courseID, assignmentID, groupsMembers[j][i].id, function(submission) {
      					$(".progress-info").html("Laster besvarelser");
    						if (submission.workflow_state == "submitted" || submission.workflow_state == "graded") {
    							allSubmitted.push(submission);
    						}
    						asyncsDone++;
    						width = (100 / totalMembers) * asyncsDone + "%";
    						$("#bar").width(width);
    						// Print groups when all requests are done
    						if (asyncsDone == totalMembers) {
      						for (var i = 0; i < groupsMembers.length; i++) {
    							  _printSingleGroup(groupsMembers[i], allSubmitted);
    							}
    						}
    					});
  				    }
				}
            }
  			function _printSingleGroup(members, submitted) {
  				peerReviewsInGroup = [];
  				inArray = false;
  				count = 0;
  				for (var i = 0; i < members.length; i++) {
      				noOfPeerReviewersForStudent[members[i].id] = 0;
  				}
				for (var i = 0; i < selectedGroups.length; i++) {
					if (selectedGroups[i].value == members[0].group_id) {
						var groupName = selectedGroups[i].text;
					}
				} 
  				html = "<h3>" + groupName + "</h3><ul>";
  				// Traverse all peer reviews and group members	  	
  		    	for (var i = 0; i < peerReviews.length; i++) {
  			    	for (var j = 0; j < members.length; j++) {
  				    	// Check if object is already in array			    	
  				    	for (var k = 0; k < peerReviewsInGroup.length; k++) {
  					    	if(peerReviewsInGroup[k] === peerReviews[i]) {
  						    	inArray = true;
  					    	}
  					    }
  					    // Push object to array if assesor is member of group and object not already in array	    	
  			    		if (peerReviews[i].assessor_id == members[j].id && !inArray) {
  				    		peerReviewsInGroup[count] = peerReviews[i];
  				    		count++;
  			    		}
  			    		inArray = false;
  			    	}
  			    }
  			    inArray = false;			    			    			    
  		    	for (var i = 0; i < members.length; i++) {
      		    	var noOfAssignedPeerReviews = 0;
  			    	count = 0;
  			    	// List users and tag users without submissions
  			    	if(submitted) {
  				    	for (j = 0; j < submitted.length; j++) {
  					    	// Check if user has submission
  					    	if (submitted[j].user_id == members[i].id) {
  						    	html = html + "<li><a href='" + "/courses/" + courseID + "/assignments/" + assignmentID + "/submissions/" + members[i].id + "' target='_blank'>" + members[i].name + "</a></li><ul>";
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
  			    	for (var k = 0; k < peerReviewsInGroup.length; k++) {
  				    	if(members[i].id == peerReviewsInGroup[k].assessor_id) {
      				    	noOfAssignedPeerReviews++;
                            noOfPeerReviewersForStudent[peerReviewsInGroup[k].user.id]++;
  					    	// List user name and tag peer review as completed/not completed
  					    	if(peerReviewsInGroup[k].workflow_state == "completed") {
  					    		html = html + "<li><a href='" + "/courses/" + courseID + "/assignments/" + assignmentID + "/submissions/" + peerReviewsInGroup[k].user.id + "' target='_blank'>" + peerReviewsInGroup[k].user.display_name  + " </a><span style='color:green;'>Fullført</span></li>";
  					    	}else {
  						    	html = html + "<li><a href='" + "/courses/" + courseID + "/assignments/" + assignmentID + "/submissions/" + peerReviewsInGroup[k].user.id + "' target='_blank'>" + peerReviewsInGroup[k].user.display_name  + " </a><span style='color:red;'>Ikke fullført</span></li>";
  					    	}
  					    	count++;
  				    	}
  			    	}
  			    	html = html + "</ul>";
  			    	if(count == 0) {
  				    	html = html + "<div>Ingen tildelt</div>";
  			    	}
  			    	inArray = false;
  			    	noOfAssignedPeerReviewsForStudent[members[i].id] = noOfAssignedPeerReviews;	    			    	
  			    }
  			    $("#progress").hide();
  			    $(".peer-review-list").append(html + "</ul>");
  			    $(".progress-info").html("");
  			    $('.input-wrapper').show();
  				$('.btn-create-pr').unbind().click(function () {
  					var numOfReviews = $('.number-of-reviews').val();
  					// Create peer reviews for group after validation
  					if (!_isNormalInteger(numOfReviews) || numOfReviews < 1) {
  						alert("Antall gjennomganger må være et positivt heltall");
  					}
  					else {
  						$('.input-wrapper').hide();
              _createPeerReviewsForGroups(courseID, assignmentID, numOfReviews, allSubmitted, groupsMembers, selectedGroups, peerReviewsInGroup, noOfAssignedPeerReviewsForStudent, noOfPeerReviewersForStudent);
  					}
  				});	
  			}       
		  });
    }
    
	function _createPeerReviewsForGroups(courseID, assignmentID, numOfReviews, allSubmitted, groupsMembers, selectedGroups, peerReviewsInGroup, noOfAssignedPeerReviewsForStudent, noOfPeerReviewersForStudent) {
		$(".peer-review-list").html("");
		$("#progress").show();
		var asyncsDone = 0;
		var assigned = [];
		var assesorIndex = 0;
		var submitted = [];
		var skipped = 0;
		var width = 0;
		for (var m = 0; m < groupsMembers.length; m++) {
      		$("#bar").width('0%');
            submitted = [];
            // Get submissions for group
            $(".progress-info").html("Finner innleveringene for gruppe " + (m + 1) + " av " + groupsMembers.length);
      		for (var k = 0; k < allSubmitted.length; k++) {
        		for (var l = 0; l < groupsMembers[m].length; l++) {
                    width = (100 / (allSubmitted.length)) * k + "%";
                    $("#bar").width(width);
              		if (allSubmitted[k].user_id == groupsMembers[m][l].id) {
                		submitted.push(allSubmitted[k]);
              		}
        		}
      		}
      		// Continue if number of reviews exeeds number of groups members
      		if (numOfReviews > (submitted.length - 1)) {
        		skipped = skipped + submitted.length;   
        		alert("For mange gjennomganger i forhold til antall besvarelser for gruppe " + selectedGroups[m].text);
        		continue;
      		}
      		$(".progress-info").html("Tildeler hverandrevurderinger...");
      		$("#bar").width(0);
      		for (var j = 0; j < numOfReviews; j++) {
      			for (var i = 0; i < submitted.length; i++) {
      				assesorIndex = (i + 1) + j;
      				// Check if index exceeds array length
      				if (assesorIndex >= submitted.length) {
      					assesorIndex = assesorIndex - submitted.length;	
      				}
      				var userID = submitted[assesorIndex].user_id;
      				for (var l = 0; l < numOfReviews; l++) {
          				for (var k = 0; k < peerReviewsInGroup.length; k++) {
              				if (peerReviewsInGroup[k].assessor_id == userID && peerReviewsInGroup[k].user_id == submitted[i].user_id || userID == submitted[i].user_id) {
                  				assesorIndex++;
                  				if (assesorIndex >= submitted.length) {
                  					assesorIndex = assesorIndex - submitted.length;	
                  				}
                  				userID = submitted[assesorIndex].user_id;
              				}
          				}
      				}
      				// Check if student already has enough peer reviews or peer reviewers
      				if(noOfAssignedPeerReviewsForStudent[userID] < numOfReviews && noOfPeerReviewersForStudent[submitted[i].user_id] < numOfReviews) {
          				noOfAssignedPeerReviewsForStudent[userID]++;
                        noOfPeerReviewersForStudent[submitted[i].user_id]++;
          				mmooc.api.createPeerReview(courseID, assignmentID, submitted[i].id, userID, function(result) {				
          					asyncsDone++;
          					width = (100 / (numOfReviews * allSubmitted.length)) * asyncsDone + "%";
          					$("#bar").width(width);
          					if (asyncsDone == (allSubmitted.length * numOfReviews) - skipped) {
              					$("#progress").hide();
            					_listPeerReviewsForGroup(selectedGroups, assignmentID);
            					if (skipped > 0) {
                					alert("Klarte ikke tildele hverandrevurderinger for " + skipped + " studenter. (Studentene har allerede nok hverandrevurderinger eller hverandrevurderere.)");
            					}
          					}
          				}); //end createPeerReview async call
          		    } //end if noOfAssignedPeerReviewsForStudent < numOfReviews && noOfPeerReviewersForStudent[submitted[i].user_id] < numOfReviews
          		    else {
              		    skipped++;
      					if (asyncsDone == (allSubmitted.length * numOfReviews) - skipped) {
          					$("#progress").hide();
        					_listPeerReviewsForGroup(selectedGroups, assignmentID);
        					if (skipped > 0) {
            					alert("Klarte ikke tildele hverandrevurderinger for " + skipped + " studenter. (Studentene har allerede nok hverandrevurderinger eller hverandrevurderere.)");
        					}
      					}
          		    }
      			} //end for submitted.length
      		} //end for numOfReviews (ferdig å tildele hverandrevurderinger for en gruppe)  
		} //end for groupsMembers.length (ferdig å tildele hverandrevurderinger for alle grupper)
	}

    function _isNormalInteger(str) {
    	return /^\+?(0|[1-9]\d*)$/.test(str);
	}
    
    function _showInput() {
	    $(".peer-review-create").html("<div class='input-wrapper'><input type='text' value='" + mmooc.settings.defaultNumberOfReviews + "' style='width:25px;' class='number-of-reviews'> gjennomganger per bruker<br><input type='button' value='Tildel hverandrevurderinger' class='button btn-create-pr'></div>");
    }

    return {
      run: function() {
        _renderView();
      }
    };
  }
  function ListStudentProgressForGroups() {
    var error = function(error) {
        console.error("error calling api", error);
    };
    	
    function _renderView() {    
	  var courseId = mmooc.api.getCurrentCourseId();
      mmooc.api.getCourse(courseId, function(course) {
        _render("powerfunctions/student-progress-groups",
                "List student progress by section",
                {course: course});
		mmooc.api.getGroupCategoriesForCourse(courseID, function(categories) {
			$('.step-2').css('display', 'list-item');
			$('.step-3').css('display', 'none');
			$('.step-4').css('display', 'none');
			$(".student-progress-table").html("");
			var html = html + "<option value=''>Choose a group set</option>";
			for (var i = 0; i < categories.length; i++) {
				html = html + "<option value=" + categories[i].id + ">" + categories[i].name + "</option>";
			}
			$("#mmpf-category-select").html(html);
			});
		}
        $('#mmpf-category-select').change(function () {
			var categoryID = $('#mmpf-category-select option:selected').val();
			if(categoryID == "") {
				$('.step-3').css('display', 'none');
				$('.step-4').css('display', 'none');
				$(".student-progress-table").html("");
			} else {
				mmooc.api.getGroupsInCategory(categoryID, function(groups) {
				$('.step-3').css('display', 'list-item');
				$('.step-4').css('display', 'none');
				$(".student-progress-table").html("");
				var html = html + "<option value=''>Choose groups</option>";
				for (var i = 0; i < groups.length; i++) {
					html = html + "<option value=" + groups[i].id + ">" + groups[i].name + "</option>";
				}
				$("#mmpf-group-select").html(html);
				});
			  }
		});
        $('#mmpf-group-select').change(function () {
			var courseID = $('#mmpf-course-select option:selected').val();
			var groupId = $('#mmpf-group-select option:selected').val();
			if(groupId == "") {
				$('.step-4').css('display', 'none');
				$(".student-progress-table").html("");
			} else {
				mmooc.api.getModulesForCourseId(function(modules) {
				$('.step-4').css('display', 'list-item');
				$(".student-progress-table").html("");
				var html = html + "<option value=''>Choose a module</option>";
				for (var i = 0; i < modules.length; i++) {
					html = html + "<option value=" + modules[i].id + ">" + modules[i].name + "</option>";
				}
				$("#mmpf-module-select").html(html);
				$(".student-progress-table").html("");
				}, error, courseID);
			}
		});
	
		$('#mmpf-module-select').change(function () {
			_printStudentProgressForGroup();
			$(".student-progress-table").html("");
		});
      });
    }
    
    function _printStudentProgressForGroup() {
	    $("#progress").hide();
	    var courseID = $('#mmpf-course-select option:selected').val();
	    var moduleID = $('#mmpf-module-select option:selected').val();
	    var groupId = $('#mmpf-group-select option:selected').val();
	    var moduleParams = { per_page: 999 };
	    var html = "<table><tr><th>Navn</th>";
	    var asyncsDone = 0;
	    mmooc.api.getItemsForModuleId(function(items) {
		    for (var i = 0; i < items.length; i++) {
			    html = html + "<th>" + items[i].title + "</th>";
		    }
		    html = html + "</tr>";
			mmooc.api.getGroupMembers(groupId, function(students) {
			    if(students.length < 1) {
				    $(".student-progress-table").html("Ingen studenter funnet i gruppen");
			    }    
			    for (var j = 0; j < students.length; j++) {				    
				    moduleParams = { student_id: students[j].id, per_page: 999 };
				    mmooc.api.getItemsForModuleId(function(itemsForStudent) {
    				    for(var l = 0; l < students.length; l++) {
        				    if (students[l].id == itemsForStudent[0].student_id) {
            				    html = html + "<tr><td>" + students[l].name + "</td>";
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
					    var width = ((100 / students.length) * asyncsDone + "%");
					    $("#bar").width(width);
					    $("#progress").show();
					    if(asyncsDone == students.length) {
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
  
  function ListStudentProgressForSections() {
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
      $("#mmooc-pf-student-progress-for-sections-btn").click(function() {
        new ListStudentProgressForSections().run();
      });
      $("#mmooc-pf-student-progress-for-groups-btn").click(function() {
        new ListStudentProgressForGroups().run();
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

