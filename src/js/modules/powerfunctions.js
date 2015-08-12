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

  function _renderGroupView() {
    mmooc.api.getGroupCategoriesForAccount(accountID, function(categories) {
      _render("powerfunctions/group-category",
              "Create groups",
              {categories: categories});
      _setUpSubmitHandler(_processGroupFile);
    });
  }

  function _processGroupFile(content) {
    var groups = $.csv.toObjects(content);
    var params = {
      account: accountID,
      category: document.getElementsByName("category")[0].value
    };
    _render("powerfunctions/groups-process",
            "Processing group creations",
            {groups: groups});
    for (var i = 0; i < groups.length; i++) {
      var row = $("#mmpf-group-"+i);
      params.name = groups[i].name;
      params.description = groups[i].description;
      mmooc.api.createGroup(params, _success(row), _error(row));
    }
  }

  function _renderListGroupsView() {
    mmooc.api.getGroupsForAccount(accountID, function(groups) {
      _render("powerfunctions/list-groups",
              "List groups",
              {groups: groups});
    });
  }


  function CreateNewLoginsTask() {

    function _renderView() {
        _render("powerfunctions/logins",
                "Add new logins to students",
                {});
    }

    function _processFile(content) {
      var logins = $.csv.toObjects(content);
      _render("powerfunctions/logins-process",
              "Processing new logins",
              {logins: logins});
      for (var i = 0; i < logins.length; i++) {
        _processItem(i, logins[i]);
      }
    }

    function _processItem(i, login) {
      var uid = "sis_user_id:" + encodeURIComponent(login.current_id);
      var lid = login.new_id;
      var row = $("#mmpf-logins-"+i);
      var params = {
        user_id: uid,
        login_id: lid,
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
      var assigns = $.csv.toObjects(content);
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
        _renderListGroupsView(rootId);
      });
      $("#mmooc-pf-group-btn").click(function() {
        _renderGroupView(rootId);
      });
      $("#mmooc-pf-assign-btn").click(function() {
        new AssignStudentsToGroupsTask().run();
      });
      $("#mmooc-pf-logins-btn").click(function() {
        new CreateNewLoginsTask().run();
      });
    }

    return {
      run: function() {
        _render("powerfunctions/main", {});
        _setUpClickHandlers();
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
