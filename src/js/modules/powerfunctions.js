this.mmooc=this.mmooc||{};

this.mmooc.powerFunctions = function() {
  var rootId = undefined;
  var accountID = undefined;

  function _render(template, heading, data) {
    var html =
          mmooc.util.renderTemplateWithData('powerfunctions/head', {heading: heading}) +
          mmooc.util.renderTemplateWithData(template, data) +
          mmooc.util.renderTemplateWithData('powerfunctions/tail', {});
      document.getElementById(rootId).innerHTML = html;
    }

  function _readFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function(event){
      callback(event.target.result);
    };
    reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
    reader.readAsText(file);
  }

  function _success(row) {
    return function () {
      $("td.status", row).removeClass("waiting").addClass("ok").text("OK");
    };
  }

  function _error(row) {
    return function (jqXHR, textStatus, errorThrown ) {
      $("td.status", row).removeClass("waiting").addClass("failed").
        text("Failed: " + errorThrown + ": " + JSON.parse(jqXHR.responseText).errors[0].message);
    };
  }

  function _setUpSubmitHandler(callback) {
    $('input[type="submit"]').click(function() {
      var file = $('input:file')[0].files.item(0);
      _readFile(file, function(content) {
        callback(content);
      });
      return false;
    });
  }

  function _parseCSV(content) {
    try {
      return $.csv.toObjects(content);
    }
    catch (e) {
      alert(e.message);
      console.log(e);
      throw e;
    }
  }

  function CreateGroupsTask() {

    function _renderView() {
      mmooc.api.getGroupCategoriesForAccount(accountID, function(categories) {
        _render("powerfunctions/group-category",
                "Create account groups",
                {categories: categories});
        _setUpSubmitHandler(_processFile);
      });
    }

    function _processFile(content) {
      var groups = _parseCSV(content);
      var params = {
        account: accountID,
        category: document.getElementsByName("category")[0].value
      };
      _render("powerfunctions/groups-process",
              "Processing group creations",
              {groups: groups});
      for (var i = 0; i < groups.length; i++) {
        _processItem(params, i, groups[i]);
      }
    }

    function _processItem(params, i, group) {
      var row = $("#mmpf-group-"+i);
      params.name = group.name;
      params.description = group.description;
      mmooc.api.createGroup(params, _success(row), _error(row));
    }

    return {
      run: function() {
        _renderView();
      }
    };
  }


  function CreateCourseGroupsTask() {

    function _renderView() {
      console.log("Here");
      mmooc.api.getCoursesForAccount(accountID, function(courses) {
        _render("powerfunctions/course-groups",
                "Create course groups",
                {courses: courses});
        $('#mmpf-course-select').change(function () {
          var courseID = $('#mmpf-course-select option:selected').val();
          mmooc.api.getGroupCategoriesForCourse(courseID, function(categories) {
            $('.step-2').css('display', 'list-item');
            var html = html + "<option value=''>Choose a group set</option>";
            for (var i = 0; i < categories.length; i++) {
              html = html + "<option value=" + categories[i].id + ">" + categories[i].name + "</option>";
            }
            $("select[name='category']").html(html);
            _setUpSubmitHandler(_processFile);
          });
        });
      });
    }

    function _processFile(content) {
      var groups = _parseCSV(content);
      var params = {
        category: $("select[name='category'] option:selected").val()
      };
      _render("powerfunctions/groups-process",
              "Processing group creations",
              {groups: groups});
      for (var i = 0; i < groups.length; i++) {
        _processItem(params, i, groups[i]);
      }
    }

    function _processItem(params, i, group) {
      var row = $("#mmpf-group-"+i);
      params.name = group.name;
      params.description = group.description;
      mmooc.api.createGroup(params, _success(row), _error(row));
    }

    return {
      run: function() {
        _renderView();
      }
    };
  }


  function ListGroupsTask() {
    function _renderView() {
      mmooc.api.getGroupsForAccount(accountID, function(groups) {
        _render("powerfunctions/list-groups",
                "List groups",
                {groups: groups});
      });
    }

    return {
      run: function() {
        _renderView();
      }
    };
  }


  function CreateNewLoginsTask() {

    function _renderView() {
        _render("powerfunctions/logins",
                "Add new logins to students",
                {});
    }

    function _processFile(content) {
      var logins = _parseCSV(content);
      _render("powerfunctions/logins-process",
              "Processing new logins",
              {logins: logins});
      for (var i = 0; i < logins.length; i++) {
        _processItem(i, logins[i]);
      }
    }

    function _processItem(i, login) {
      var uid = "sis_user_id:" + login.current_id;
      var nid = login.new_id;
      var row = $("#mmpf-logins-"+i);
      var params = {
        'user[id]': uid,
        'login[unique_id]': nid,
        'login[sis_user_id]': nid,
        account_id: accountID
      };
      mmooc.api.createUserLogin(params, _success(row), _error(row));
    }

    return {
      run: function() {
        _renderView();
        _setUpSubmitHandler(_processFile);
      }
    };
  }


  function AssignStudentsToGroupsTask() {

    function _renderView() {
      _render("powerfunctions/assign",
              "Assign students to groups",
              {});
    }

    function _processFile(content) {
      var assigns = _parseCSV(content);
      _render("powerfunctions/assign-process",
              "Processing assigning student to groups",
              {assigns: assigns});
      for (var i = 0; i < assigns.length; i++) {
        _processItem(i, assigns[i]);
      }
    }

    function _processItem(i, assignment) {
      var gid = assignment.group_id;
      // According to the API documentation the SIS params should be
      // encoded, but this fails. Was:
      // encodeURIComponent(assignment.user_id);
      var uid = "sis_user_id:" + assignment.user_id;
      var row = $("#mmpf-assign-"+i);
      mmooc.api.createGroupMembership(gid, uid, _success(row), _error(row));
    }

    return {
      run: function() {
        _renderView();
        _setUpSubmitHandler(_processFile);
      }
    };
  }
  
  function AssignPeerReviewsForGroup() {

    function _renderView() {
      mmooc.api.getCoursesForAccount(accountID, function(courses) {
        _render("powerfunctions/peer-review",
                "Assign peer reviews by group",
                {courses: courses});
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
            $('.step-4').css('display', 'list-item');
            var html = html + "<option value=''>Choose an assignment</option>";
            for (var i = 0; i < assignments.length; i++) {
              html = html + "<option value=" + assignments[i].id + ">" + assignments[i].name + "</option>";
            }
            $("#mmpf-assignment-select").html(html);
            $(".peer-review-list").html("");
          });
        });
		$('#mmpf-assignment-select').change(function () {
			_listPeerReviewsForGroup();
			_showInput();
		});

      });
    }

    function _listPeerReviewsForGroup() {
	    $(".peer-review-list").html("<p>Laster hverandrevurderinger...</p>");
	    $("#progress").show();
	    $("#bar").width('0%');
	    var courseID = $('#mmpf-course-select option:selected').val();
	    var groupID = $('#mmpf-group-select option:selected').val();
	    var assignmentID = $('#mmpf-assignment-select option:selected').val();
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
					    		peerReivewsInGroup[count] = peerReviews[i];
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
				    	for (var k = 0; k < peerReivewsInGroup.length; k++) {
					    	if(members[i].id == peerReivewsInGroup[k].assessor_id) {
						    	// List user name and tag peer review as completed/not completed
						    	if(peerReivewsInGroup[k].workflow_state == "completed") {
						    		html = html + "<li>" + peerReivewsInGroup[k].user.display_name  + " <span style='color:green;'>Fullført</span></li>";
						    	}else {
							    	html = html + "<li>" + peerReivewsInGroup[k].user.display_name  + " <span style='color:red;'>Ikke fullført</span></li>";
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

  function AccountPicker() {
    function _setAccountID() {
      accountID = $('select[name="account"] option:selected').val();
    }

    return {
      run: function(params) {
        mmooc.api.getAccounts(function(accounts) {
          _render("powerfunctions/account-picker",
                  "Choose account",
                  {accounts: accounts});
          $('select[name="account"]').change(function() {
            _setAccountID();
            params.nextStep();
          });
        });
      }
    };
  }

  function Menu() {
    function _setUpClickHandlers() {
      $("#mmooc-pf-list-group-btn").click(function() {
        new ListGroupsTask().run();
      });
      $("#mmooc-pf-course-group-btn").click(function() {
        new CreateCourseGroupsTask().run();
      });
      $("#mmooc-pf-group-btn").click(function() {
        new CreateGroupsTask().run();
      });
      $("#mmooc-pf-assign-btn").click(function() {
        new AssignStudentsToGroupsTask().run();
      });
      $("#mmooc-pf-logins-btn").click(function() {
        new CreateNewLoginsTask().run();
      });
      $("#mmooc-pf-peer-review-btn").click(function() {
        new AssignPeerReviewsForGroup().run();
      });
    }

    return {
      run: function() {
        try {
          _render("powerfunctions/main", {});
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
      new AccountPicker().run({nextStep: function () {
        new Menu().run();
      }});
    }
  };
}();
