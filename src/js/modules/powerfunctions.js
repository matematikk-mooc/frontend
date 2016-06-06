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
            var html = html + "<option value=''>Choose a group set</option>";
            for (var i = 0; i < categories.length; i++) {
              html = html + "<option value=" + categories[i].id + ">" + categories[i].name + "</option>";
            }
            $("#mmpf-category-select").html(html);
          });
        });
        $('#mmpf-category-select').change(function () {
          var categoryID = $('#mmpf-category-select option:selected').val();
          mmooc.api.getGroupsInCategory(categoryID, function(groups) {
            $('.step-3').css('display', 'list-item');
            var html = html + "<option value=''>Choose a group</option>";
            for (var i = 0; i < groups.length; i++) {
              html = html + "<option value=" + groups[i].id + ">" + groups[i].name + "</option>";
            }
            $("#mmpf-group-select").html(html);
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
          });
        });
		$('#mmpf-assignment-select').change(function () {
			_listPeerReviewsForGroup();
			_showButton();
		});

      });
    }

    function _listPeerReviewsForGroup() {
	    var courseID = $('#mmpf-course-select option:selected').val();
	    var groupID = $('#mmpf-group-select option:selected').val();
	    var assignmentID = $('#mmpf-assignment-select option:selected').val();
	    var html = "<ul>";
	    var peerReivewsInGroup = [];
	    var count = 0;
	    var inArray = false;
	    mmooc.api.getGroupMembers(groupID, function(members) {
		    mmooc.api.getPeerReviewsForAssignment(courseID, assignmentID, function(peerReviews) {	  	
		    	for (var i = 0; i < peerReviews.length; i++) {
			    	for (var j = 0; j < members.length; j++) {			    	
				    	for (var k = 0; k < peerReivewsInGroup.length; k++) {
					    	if(peerReivewsInGroup[k] === peerReviews[i]) {
						    	inArray = true;
					    	}
					    }			    	
			    		if (peerReviews.assessor_id == members.id && !inArray) {
				    		peerReivewsInGroup[count] = peerReviews[i];
				    		count++;
			    		}
			    		inArray = false;
			    	}
			    }			    			    			    
		    	for (var i = 0; i < members.length; i++) {
			    	count = 0;
			    	html = html + "<li>" + members[i].name + "</li><ul>";			    	
			    	for (var k = 0; k < peerReivewsInGroup.length; k++) {
				    	if(members[i].id == peerReivewsInGroup[k].assessor_id) {
					    	html = html + "<li>" + peerReivewsInGroup[k].user.display_name  + "</li>";
					    	count++;
				    	}
			    	}
			    	html = html + "</ul>";
			    	if(count == 0) {
				    	html = html + "<div>Ingen tildelt</div>";
			    	}	    			    	
			    }
			    $(".peer-review-list").html(html + "</ul>");
				$('.btn-create-pr').click(function () {
					_findSubmittedInGroup(members, courseID, assignmentID);	
				});			        			    
		    });       
		});	
    }
    
    function _showButton() {
	    $(".peer-review-create").html("<input type='button' value='Tildel hverandrevurderinger' class='button btn-create-pr'>");
    }

    function _findSubmittedInGroup(members, courseID, assignmentID) {
	    var submitted = [];
	    var asyncsDone = 0;
		for (var i = 0; i < members.length; i++) {
			mmooc.api.getSingleSubmissionForUser(courseID, assignmentID, members[i].id, function(submission) {
				if (submission.workflow_state == "submitted") {
					submitted.push(submission);
				}
				asyncsDone++;
				if (asyncsDone == members.length) {
					_createPeerReviewsForGroup();
				}
			});
		}
		
		function _createPeerReviewsForGroup() {
			asyncsDone = 0;
			for (var i = 0; i < submitted.length; i++) {
				if (i == submitted.length - 1) {
					var userID = submitted[0].user_id; 
				}else {
					nextMember = i + 1;
					var userID = submitted[nextMember].user_id;
				}						
				mmooc.api.createPeerReview(courseID, assignmentID, submitted[i].id, userID, function(result) {					
					asyncsDone++;
					if (asyncsDone == submitted.length) {
						_listPeerReviewsForGroup();	
					}
				});		
			}			
		}
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
